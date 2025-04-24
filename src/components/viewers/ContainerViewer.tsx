import {
  getContainedResourceUrlAll,
  getSourceUrl,
  isContainer,
  UrlString,
} from "@inrupt/solid-client";
import React, { FC } from "react";
import Link from "next/link";
import { SectionHeading } from "../ui/headings";
import { ResourceAdder } from "../adders/ResourceAdder";
import { LoggedOut } from "../session/LoggedOut";
import { getExplorePath } from "../../functions/integrate";
import { LoadedCachedDataset } from "../../hooks/dataset";
import { ZipRetriever } from "../retrievers/ZipRetriever";
import { useL10n } from "../../hooks/l10n";

interface Props {
  dataset: LoadedCachedDataset;
}

export const ContainerViewer: FC<Props> = (props) => {
  const l10n = useL10n();
  let containedResources = getContainedResourceUrlAll(props.dataset.data)
    .sort(compareResourceUrls)
    .map((resourceUrl) => {
      const name = resourceUrl.substring(
        getSourceUrl(props.dataset.data).length,
      );
      return (
        <Link
          key={resourceUrl + "_containerChild"}
          href={getExplorePath(resourceUrl)}
          className="block rounded bg-gray-700 p-5 text-white hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-700 focus:ring-opacity-50 focus:ring-offset-2"
        >
          {decodeURIComponent(name)}
        </Link>
      );
    });

  // There's an "Add Resource" button when you're logged in,
  // so no need to display the warning if so:
  const emptyWarning =
    containedResources.length === 0 ? (
      <LoggedOut>
        <div className="rounded bg-yellow-200 p-5">
          {l10n.getString("container-empty-warning")}
        </div>
      </LoggedOut>
    ) : null;

  return (
    <>
      <SectionHeading action={<ZipRetriever container={props.dataset} />}>
        {l10n.getString("container-children-heading")}
      </SectionHeading>
      <div className="pb-10">
        <div className="grid gap-5 pb-5 sm:grid-cols-2">
          {containedResources}
        </div>
        {emptyWarning}
        <div className="pb-5">
          <ResourceAdder container={props.dataset} />
        </div>
      </div>
    </>
  );
};

function compareResourceUrls(a: UrlString, b: UrlString): number {
  if (isContainer(a) && !isContainer(b)) {
    return -1;
  }
  if (!isContainer(a) && isContainer(b)) {
    return 1;
  }

  return a.localeCompare(b);
}
