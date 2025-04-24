import { asUrl, getUrlAll } from "@inrupt/solid-client";
import { solid, space } from "rdf-namespaces";
import { useProfile } from "./profile";
import { useRoot } from "./root";

export function useStorages() {
  const profile = useProfile();
  const webId = profile ? asUrl(profile.data) : "";

  const storages = profile
    ? Array.from(
        new Set(
          getUrlAll(profile.data, space.storage).concat(
            getUrlAll(profile.data, solid.account),
          ),
        ),
      )
    : [];
  //
  // If we could not find a `space.storage` in the user's profile (such as on
  // CSS:
  // https://github.com/CommunitySolidServer/CommunitySolidServer/issues/910),
  // try traversing up from the WebID to find a Container that advertises itself
  // as a `space.storage`:
  const webIdRoot = useRoot(
    webId.length > 0 && storages.length === 0 ? webId : null,
  );
  if (typeof webIdRoot === "string") {
    storages.push(webIdRoot);
  }

  return storages;
}
