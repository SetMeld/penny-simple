import {
  getLinkedResourceUrlAll,
  getResourceInfo,
  getSourceUrl,
  UrlString,
  WithServerResourceInfo,
} from "@inrupt/solid-client";
import { space } from "rdf-namespaces";
import { fetch } from "@inrupt/solid-client-authn-browser";
import { useEffect, useState } from "react";
import { useSessionInfo } from "./sessionInfo";

const rootCache: string[] = [];

const cacheRoot = (url: UrlString, webId?: UrlString) => {
  const prefix = (webId ?? "") + "|";
  const cacheValue = prefix + url;
  if (!rootCache.includes(cacheValue)) {
    rootCache.push(cacheValue);
  }
};
const getCachedRoot = (
  path: UrlString,
  webId?: UrlString,
): UrlString | null => {
  const prefix = (webId ?? "") + "|";

  const cachedRoot = rootCache.find((cachedRoot) => {
    return (
      cachedRoot.substring(0, prefix.length) === prefix &&
      path.startsWith(cachedRoot.substring(prefix.length))
    );
  });

  return typeof cachedRoot === "string"
    ? cachedRoot.substring(prefix.length)
    : null;
};

export function useRoot(url: null): null;
export function useRoot(
  url: UrlString | WithServerResourceInfo | null,
): UrlString | undefined | null;
export function useRoot(
  url: UrlString | WithServerResourceInfo | null,
): UrlString | undefined | null {
  const [root, setRoot] = useState<string | undefined | null>();
  const sessionInfo = useSessionInfo();

  useEffect(() => {
    if (url === null) {
      setRoot(null);
      return;
    }

    const urlString = typeof url === "string" ? url : getSourceUrl(url);
    const cachedRoot = getCachedRoot(urlString, sessionInfo?.webId);
    if (typeof cachedRoot === "string") {
      setRoot(cachedRoot);
      return;
    }

    getRoot(url).then((root) => {
      setRoot(root);
      if (root === null) {
        return;
      }
      cacheRoot(root, sessionInfo?.webId);
    });
    // We're not technically using the user's WebID, but when they log in,
    // we do want to refetch, because we might suddenly have access to Resources
    // that we did not have access to before:
  }, [url, sessionInfo?.webId]);

  return root;
}

async function getRoot(
  url: UrlString | WithServerResourceInfo,
): Promise<UrlString | null> {
  try {
    const resourceInfo =
      typeof url === "string"
        ? await getResourceInfo(url, { fetch: fetch })
        : url;
    const urlString = typeof url === "string" ? url : getSourceUrl(url);

    if (
      resourceInfo &&
      getLinkedResourceUrlAll(resourceInfo)
        ["type"]?.map((url) => url.toLowerCase())
        .includes(space.storage.toLowerCase())
    ) {
      return getSourceUrl(resourceInfo);
    }

    const parentUrl = getParentUrl(urlString);
    if (!parentUrl) {
      return null;
    }

    return getRoot(parentUrl);
  } catch {
    return null;
  }
}

function getParentUrl(url: UrlString | null): UrlString | null {
  if (url === null) {
    return null;
  }
  const urlObject = new URL(url);
  const path = urlObject.pathname;
  if (path === "/") {
    return null;
  }

  const pathWithoutTrailingSlash = path.endsWith("/")
    ? path.substring(0, path.length - 1)
    : path;
  const parentPath = pathWithoutTrailingSlash.substring(
    0,
    pathWithoutTrailingSlash.lastIndexOf("/"),
  );

  return urlObject.origin + parentPath + "/";
}
