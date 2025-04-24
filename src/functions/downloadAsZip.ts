import {
  FetchError,
  getLinkedResourceUrlAll,
  getResourceInfo,
  getSolidDataset,
  getSourceUrl,
  isContainer,
  SolidDataset,
  UrlString,
  WebId,
  WithResourceInfo,
} from "@inrupt/solid-client";
import { fetch } from "@inrupt/solid-client-authn-browser";
import { getContainedChildrenUrls } from "./getContainedChildrenUrls";

type DownloadAsZipOptions = {
  onItemDiscovered?: (url: UrlString) => void;
  onItemDiscoveryError?: (url: UrlString, error: unknown) => void;
  onItemDownloaded?: (url: UrlString, stats: { bytes: number }) => void;
  onItemDownloadError?: (url: UrlString, error: unknown) => void;
  // can be used to stop the zip download and immediately throw an error instead
  abortSignal?: AbortSignal;
  currentWebId?: WebId;
};

type ZipEntryResource = {
  type: "resource";
  url: UrlString;
  linkedResources: Record<UrlString | string, UrlString[]>;
};
type ZipEntryContainer = {
  // TODO: Should Containers also be added as individual Resources to the zip?
  //       Since people could add Triples to them.
  type: "container";
  url: UrlString;
  children: UrlString[];
  linkedResources: Record<UrlString | string, UrlString[]>;
};
type ZipEntry = ZipEntryResource | ZipEntryContainer;

type ZipIndex = {
  pennyContainerZipVersion: "1.0.0";
  rootUrl: UrlString;
  resources: ZipEntry[];
  downloadedBy?: WebId;
};

export async function downloadAsZip(
  dataset: SolidDataset & WithResourceInfo,
  options: DownloadAsZipOptions,
) {
  const root = getSourceUrl(dataset);
  // Dynamic import to ensure the zip library is only loaded when needed
  const { createZipper } = await import("./createZipper");
  const zipper = createZipper();

  const allResources: string[] = [];
  const resourceList = await recursiveDiscover(dataset, {
    onDiscovery: (url) => {
      allResources.push(url);
      options.onItemDiscovered?.(url);
    },
    onError: (url, error) => options.onItemDiscoveryError?.(url, error),
    abortSignal: options.abortSignal,
    root: root,
  });
  const zipIndex: ZipIndex = {
    pennyContainerZipVersion: "1.0.0",
    rootUrl: root,
    resources: resourceList,
    downloadedBy: options.currentWebId,
  };
  zipper.addFile(
    [],
    "meta.json",
    Uint8Array.from(
      JSON.stringify(zipIndex)
        .split("")
        .map((c) => c.charCodeAt(0)),
    ),
  );

  options.abortSignal?.throwIfAborted();

  const tasks = allResources.map((url) => {
    return async () => {
      try {
        const relativePath = url.substring(
          root.substring(0, root.length - 1).lastIndexOf("/"),
        );
        const segments = relativePath.split("/").filter((s) => s !== "");
        if (relativePath.endsWith("/")) {
          zipper.addFolder(segments);
        } else {
          const fileResponse = await fetch(url, {
            signal: options.abortSignal,
          });
          if (!fileResponse.ok) {
            throw new Error(
              `Could not fetch [${url}]: [${await fileResponse.text()}]`,
            );
          }
          const content = new Uint8Array(await fileResponse.arrayBuffer());
          const bytes = content.byteLength;
          zipper.addFile(
            segments.slice(0, -1),
            segments[segments.length - 1],
            content,
          );
          options.onItemDownloaded?.(url, { bytes });
        }
      } catch (e) {
        options.onItemDownloadError?.(url, e);
      }
    };
  });
  // Download at most 5 files at the same time
  // to (1) not overload the pod with hundreds simultaneous requests
  // and (2) reduce memory usage
  await executeTasksConcurrently(tasks, 5);

  options.abortSignal?.throwIfAborted();

  const promise = zipper.createZip();
  options.abortSignal?.addEventListener?.("abort", () => zipper.cancel());
  return promise;
}

type RecursiveDiscoverOptions = {
  onDiscovery: (url: UrlString) => void;
  onError?: (url: UrlString, error: FetchError | unknown) => void;
  abortSignal?: AbortSignal;
  root: UrlString;
};

async function recursiveDiscover(
  dataset: SolidDataset & WithResourceInfo,
  options: RecursiveDiscoverOptions,
): Promise<ZipEntry[]> {
  const containedResourceUrls = getContainedChildrenUrls(dataset);
  const abortableFetch = createAbortableFetch(options.abortSignal);
  const fetchOptions = { fetch: abortableFetch };

  const resources: ZipEntry[] = (
    await Promise.all(
      containedResourceUrls.map(async (resourceUrl) => {
        try {
          const resourceInfo = await getResourceInfo(resourceUrl, fetchOptions);
          options.onDiscovery(resourceUrl);

          const linkedResourceUrls = getLinkedResourceUrlAll(resourceInfo);
          const linkedResources = await getZipEntriesFromLinkedResourceUrls(
            linkedResourceUrls,
            abortableFetch,
            options,
          );

          if (isContainer(resourceUrl)) {
            const containedDataset = await getSolidDataset(
              resourceUrl,
              fetchOptions,
            );
            const containedEntries = await recursiveDiscover(
              containedDataset,
              options,
            );
            return [...linkedResources, ...containedEntries];
          } else {
            return [
              ...linkedResources,
              {
                type: "resource",
                url: resourceUrl,
                linkedResources: linkedResourceUrls,
              } as ZipEntryResource,
            ];
          }
        } catch (e) {
          options.onError?.(resourceUrl, e);
          return [];
        }
      }),
    )
  ).flat();
  return [
    {
      type: "container",
      url: getSourceUrl(dataset),
      children: containedResourceUrls,
      linkedResources: {},
    } as ZipEntryContainer,
    ...resources,
  ];
}

// add the abort signal to the solid-client fetch options
const createAbortableFetch: (signal?: AbortSignal) => typeof fetch =
  (signal) => (input, init) => {
    return fetch(input, { ...init, signal });
  };

type Task<T> = () => Promise<T>;

/**
 * Execute a limited amount of tasks concurrently
 * @param tasks The tasks to execute
 * @param size The number of tasks to execute concurrently
 */
const executeTasksConcurrently = async <T>(
  tasks: Task<T>[],
  maxConcurrentTasks: number,
) => {
  const queue = [...tasks];
  const getNextTask = () => queue.shift();

  const executors = Array.from({ length: maxConcurrentTasks }, () =>
    executor(getNextTask),
  );
  await Promise.all(executors);
};

// Execute tasks until getTask returns undefined
const executor = async <T>(getTask: () => Task<T> | undefined) => {
  let task = getTask();
  while (task) {
    await task();
    task = getTask();
  }
};

async function getZipEntriesFromLinkedResourceUrls(
  linkedResourceUrls: Record<UrlString | string, UrlString[]>,
  abortableFetch: typeof fetch,
  options: RecursiveDiscoverOptions,
): Promise<ZipEntry[]> {
  const { acl: aclUrls, ...otherLinkedResourceUrls } = linkedResourceUrls;
  const aclZipEntries = aclUrls
    ? await getAclZipEntries(
        // TODO: storage.inrupt.com has ACP files at a different URL. Should we try fetching those too?
        //       How about the Resources referenced in there? In other words, would people want to
        //       be able to reproduce the full access control settings from their download?
        linkedResourceUrls.acl.filter((url) => url.startsWith(options.root)),
        abortableFetch,
        options,
      )
    : [];

  const otherLinkedResourceEntries = Object.values(otherLinkedResourceUrls)
    .map((targets) => {
      const containedLinkedResourceUrls = targets.filter((target) =>
        target.startsWith(options.root),
      );
      return containedLinkedResourceUrls.map((linkedResourceUrl) => {
        options.onDiscovery(linkedResourceUrl);
        return {
          type: "resource",
          url: linkedResourceUrl,
          // TODO: Check assumption that linked Resources don't have their own linked Resources
          linkedResources: {},
        } as ZipEntryResource;
      });
    })
    .flat();

  return aclZipEntries.concat(otherLinkedResourceEntries);
}

async function getAclZipEntries(
  aclUrls: UrlString[],
  abortableFetch: typeof fetch,
  options: RecursiveDiscoverOptions,
): Promise<ZipEntry[]> {
  return (
    await Promise.all(
      aclUrls.map(async (linkedResourceUrl) => {
        // Under WAC, a Resource can point to ACL files that do not exist
        const aclResponse = await abortableFetch(linkedResourceUrl, {
          method: "HEAD",
        });
        if (aclResponse.status === 404) {
          return null;
        }
        options.onDiscovery(linkedResourceUrl);
        return {
          type: "resource",
          url: linkedResourceUrl,
          // TODO: Check assumption that linked Resources don't have their own linked Resources
          linkedResources: {},
        } as ZipEntryResource;
      }),
    )
  )
    .filter((linkedResource) => linkedResource !== null)
    .flat();
}
