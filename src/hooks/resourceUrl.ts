import { getUrl, UrlString } from "@inrupt/solid-client";
import { space } from "rdf-namespaces";
import { useProfile } from "./profile";

export function useResourceUrl(path: string): UrlString | null {
  const profile = useProfile();

  if (!profile) {
    return null;
  }

  const storageUrl = getUrl(profile.data, space.storage);
  if (!storageUrl) {
    return null;
  }

  const normalisedStorageUrl = storageUrl.endsWith("/")
    ? storageUrl.substring(0, storageUrl.length - 1)
    : storageUrl;
  const normalisedPath = path.startsWith("/") ? path : "/" + path;

  return normalisedStorageUrl + normalisedPath;
}
