import { UrlString } from "@inrupt/solid-client";
import { FC } from "react";
import Link from "next/link";
import { getExplorePath } from "../../functions/integrate";
import { useStorages } from "../../hooks/storages";

interface Props {
  url: UrlString;
  /**
   * If this URL was found in a specific Resource, passing it here will make links to Resources
   * in the same origin open in Penny as well.
   */
  sourceUrl?: UrlString;
  openInline?: boolean;
}

export const Url: FC<Props> = (props) => {
  const storages = useStorages();

  if (props.sourceUrl) {
    storages.push(new URL(props.sourceUrl).origin + "/");
  }

  const matchingOrigin = storages.find(
    (storageUrl) => props.url.substring(0, storageUrl.length) === storageUrl,
  );

  const shortUrl =
    matchingOrigin &&
    typeof props.sourceUrl === "string" &&
    props.sourceUrl.startsWith(matchingOrigin)
      ? props.url.substring(matchingOrigin.length - 1)
      : props.url;

  if (matchingOrigin || props.openInline) {
    return (
      <Link
        href={getExplorePath(props.url, encodeURIComponent(props.url))}
        className="break-words focus:text-gray-700 focus:underline focus:outline-none"
        title={props.url}
      >
        {shortUrl}
      </Link>
    );
  }

  return (
    <a
      href={props.url}
      target="_blank"
      rel="noopener noreferrer"
      className="break-words focus:text-gray-700 focus:underline focus:outline-none"
    >
      {props.url}
    </a>
  );
};
