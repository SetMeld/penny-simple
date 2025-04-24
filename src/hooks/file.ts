import { SolidDataset, UrlString } from "@inrupt/solid-client";
import { CachedResource, FileData, isFileData, useResource } from "./resource";

export type CachedFileData = CachedResource & {
  data: Exclude<CachedResource["data"], SolidDataset>;
} & { save: (file: Blob) => Promise<void> };

export type LoadedCachedFileData = CachedFileData & {
  data: Exclude<CachedFileData["data"], undefined>;
};

export function isLoadedFileData(
  dataset: CachedResource,
): dataset is LoadedCachedFileData {
  return typeof dataset.error === "undefined" && isFileData(dataset.data);
}

export function useFile(url: UrlString | null): CachedFileData {
  const resource = useResource(url);

  const fileData =
    resource?.data && isFileData(resource.data) ? resource.data : undefined;

  return {
    ...resource,
    data: fileData,
  };
}
