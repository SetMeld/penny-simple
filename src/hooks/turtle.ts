import {
  getContentType,
  responseToResourceInfo,
  UrlString,
  WithServerResourceInfo,
} from "@inrupt/solid-client";
import { fetch } from "@inrupt/solid-client-authn-browser";
import { useCallback } from "react";
import useSwr, { SWRResponse } from "swr";
import { useSessionInfo } from "./sessionInfo";

type TurtleResponse = WithServerResourceInfo & { content: string };

const fetcher = async ([url, _webId]: [
  UrlString,
  UrlString?,
]): Promise<TurtleResponse> => {
  const response = await fetch(url, { headers: { Accept: "text/turtle" } });
  const resourceInfo = responseToResourceInfo(response);
  const contentType = getContentType(resourceInfo);
  if (
    typeof contentType === "string" &&
    contentType.substring(0, "text/turtle".length) !== "text/turtle"
  ) {
    throw new Error(
      `The server could not produce Turtle for the Resource at ${url}.`,
    );
  }
  const content = await response.text();
  return {
    ...resourceInfo,
    content: content,
  };
};

export type CachedTurtle = SWRResponse<TurtleResponse, Error> & {
  save: (content: string) => Promise<void>;
};

export function useTurtle(url: UrlString): CachedTurtle;
export function useTurtle(url: null): null;
export function useTurtle(url: UrlString | null): CachedTurtle | null;
export function useTurtle(url: UrlString | null): CachedTurtle | null {
  const resourceUrl = url ? getResourceUrl(url) : null;
  const sessionInfo = useSessionInfo();
  const resource = useSwr(
    resourceUrl ? [resourceUrl, sessionInfo?.webId] : null,
    fetcher,
  );

  const update = useCallback(
    async (newTurtle: string) => {
      if (resourceUrl === null) {
        return;
      }
      try {
        if (typeof resource.data === "undefined") {
          return;
        }
        const response = await fetch(resourceUrl, {
          method: "PUT",
          body: newTurtle,
          headers: {
            "Content-Type": "text/turtle",
          },
        });
        if (!response.ok) {
          throw new Error(`${response.statusText} (${response.status})`);
        }
        const newData = {
          ...resource.data,
          content: newTurtle,
        };
        resource.mutate(newData, false);
      } catch (e) {
        await resource.mutate();
        throw e;
      }
    },
    [resourceUrl, resource],
  );

  const cached: CachedTurtle = {
    ...resource,
    save: update,
  };

  return cached;
}

function getResourceUrl(url: UrlString): UrlString {
  const resourceUrl = new URL(url);
  resourceUrl.hash = "";
  return resourceUrl.href;
}
