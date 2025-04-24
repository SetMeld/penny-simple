import { UrlString } from "@inrupt/solid-client";
import { FC, Fragment } from "react";
import Link from "next/link";
import { MdEdit } from "react-icons/md";
import { getExplorePath } from "../functions/integrate";
import { NotIntegrated } from "./integrated/NotIntegrated";

interface Props {
  location: UrlString;
  onEdit: () => void;
}

export const LocationBar: FC<Props> = (props) => {
  const url = new URL(props.location);
  const locationUrl = new URL(props.location);
  const queryParams = locationUrl.search;
  locationUrl.search = "";
  locationUrl.hash = "";

  const trailingSlash = locationUrl.href.endsWith("/") ? (
    <span className={queryParams.length === 0 ? "mx-1" : ""}>/</span>
  ) : null;
  const pathParts = url.pathname.split("/");
  const pathElements = pathParts
    .map((resourceName, i) => {
      let pathUrl = url.origin + pathParts.slice(0, i + 1).join("/");
      if (pathUrl.length < props.location.length) {
        pathUrl += "/";
      }
      const isCurrent =
        pathUrl === locationUrl.href || pathUrl === locationUrl.href + "/";
      const activeSeparatorClass = isCurrent ? "" : "hidden lg:inline";
      const displayName = isCurrent ? (
        <span className="font-bold">
          {decodeURIComponent(resourceName)}
          {trailingSlash}
          {queryParams}
        </span>
      ) : (
        <Link
          key={pathUrl + "_breadcrumb"}
          href={getExplorePath(pathUrl)}
          className="hidden break-words focus:text-gray-700 focus:underline focus:outline-none lg:inline"
        >
          {decodeURIComponent(resourceName)}
        </Link>
      );
      return (
        <Fragment key={pathUrl + "_fragment"}>
          <span
            key={pathUrl + "_separator"}
            className={`mx-1 ${activeSeparatorClass}`}
          >
            /
          </span>
          <wbr key={pathUrl + "_lineBreakOpportinity"} />
          {displayName}
        </Fragment>
      );
    })
    .slice(
      1,
      url.pathname.endsWith("/") ? pathParts.length - 1 : pathParts.length,
    );

  let parentPath = url.pathname.endsWith("/")
    ? url.pathname.substring(
        0,
        url.pathname.substring(0, url.pathname.length - 1).lastIndexOf("/") + 1,
      )
    : url.pathname.substring(0, url.pathname.lastIndexOf("/") + 1);
  if (parentPath === "/") {
    // The origin does not have a trailing slash to indicate that it's a Container:
    parentPath = "";
  }

  // On small screens, we display a "go to parent" link rather than the full path,
  // unless we're at the origin, of course.
  const parentNavigatorClass =
    pathElements.length >= 1 ? "lg:hidden" : "hidden";
  const originClass =
    pathElements.length >= 1 ? "hidden lg:inline" : "font-bold";

  return (
    <>
      <div className="flex items-center space-x-2">
        <span className="flex items-center py-2">
          <Link
            href={getExplorePath(url.origin + parentPath)}
            className={`${parentNavigatorClass} break-words hover:underline focus:text-gray-700 focus:underline focus:outline-none`}
            aria-hidden="true"
          >
            ..
          </Link>
          <Link
            key={url.origin + "_breadcrumb"}
            href={getExplorePath(url.origin)}
            className={`${originClass} hover:underline focus:text-gray-700 focus:underline focus:outline-none`}
          >
            {url.host}
          </Link>
          {pathElements}
          <NotIntegrated>
            <button
              onClick={(e) => {
                e.preventDefault();
                props.onEdit();
              }}
              title="View another Resource"
              className="rounded p-2 text-gray-400 hover:text-gray-700 focus:text-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-700"
            >
              <MdEdit aria-label="Change Resource URL" />
            </button>
          </NotIntegrated>
        </span>
      </div>
    </>
  );
};
