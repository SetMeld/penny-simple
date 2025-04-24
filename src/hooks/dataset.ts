import {
  SolidDataset,
  UrlString,
  WithServerResourceInfo,
} from "@inrupt/solid-client";
import { CachedResource, FileData, isFileData, useResource } from "./resource";

export type CachedDataset = CachedResource & {
  data: Exclude<CachedResource["data"], FileData>;
} & { save: (dataset: SolidDataset) => Promise<void> };

export type LoadedCachedDataset = CachedDataset & {
  data: Exclude<CachedDataset["data"], undefined>;
};

export function isLoadedDataset(
  dataset: CachedResource,
): dataset is LoadedCachedDataset {
  return (
    typeof dataset.error === "undefined" &&
    typeof dataset.data !== "undefined" &&
    typeof (dataset.data as FileData).blob === "undefined"
  );
}

export function useDataset(url: UrlString | null): CachedDataset {
  const resource = useResource(url);

  const solidDataset =
    resource?.data && !isFileData(resource.data) ? resource.data : undefined;

  return {
    ...resource,
    data: solidDataset,
  };
}
