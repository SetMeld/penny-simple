import {
  SolidDataset,
  WithResourceInfo,
  UrlString,
  isContainer,
  getSourceUrl,
  getContainedResourceUrlAll,
} from "@inrupt/solid-client";

export function getContainedChildrenUrls(
  container: SolidDataset & WithResourceInfo,
): UrlString[] {
  if (!isContainer(container)) {
    return [];
  }

  const containerUrl = getSourceUrl(container);
  function isValidChild(childUrl: UrlString | null): childUrl is UrlString {
    return childUrl !== null && childUrl.startsWith(containerUrl);
  }

  const childrenUrls = getContainedResourceUrlAll(container)
    .map((url) => {
      try {
        return new URL(url).href;
      } catch {
        return null;
      }
    })
    .filter(isValidChild);

  return childrenUrls;
}
