import {
  addTerm,
  asUrl,
  getSolidDataset,
  getThing,
  getUrlAll,
  ThingPersisted,
  toRdfJsDataset,
} from "@inrupt/solid-client";
import { fetch } from "@inrupt/solid-client-authn-browser";
import { useEffect, useState } from "react";
import { rdfs } from "rdf-namespaces";
import { useSessionInfo } from "./sessionInfo";
import { useProfileDoc } from "./profileDoc";

export function useProfile(): {
  data: ThingPersisted;
} | null {
  const sessionInfo = useSessionInfo();
  const profileDoc = useProfileDoc();
  const [extendedProfile, setExtendedProfile] = useState<ThingPersisted | null>(
    null,
  );

  useEffect(() => {
    if (!profileDoc?.data || typeof sessionInfo?.webId === "undefined") {
      return;
    }

    const profile = getThing(profileDoc.data, sessionInfo.webId);
    if (profile === null) {
      return;
    }

    fetchExtendedProfile(profile).then((extendedProfile) => {
      setExtendedProfile(extendedProfile);
    });
  }, [profileDoc?.data, sessionInfo?.webId]);

  if (extendedProfile === null) {
    return null;
  }

  return {
    data: extendedProfile,
  };
}

/**
 * If the given profile Thing contains rdfs:seeAlso URLs, fetch those Things and merge them into the profile Thing
 */
async function fetchExtendedProfile(
  profile: ThingPersisted,
): Promise<ThingPersisted> {
  const seeAlsoUrls = getUrlAll(profile, rdfs.seeAlso);
  if (seeAlsoUrls.length === 0) {
    return profile;
  }

  const profileUrl = asUrl(profile);
  const extendedProfileDatasets = await Promise.all(
    seeAlsoUrls.map((url) => getSolidDataset(url, { fetch: fetch })),
  );
  const extendedProfileRdfJsDatasets = extendedProfileDatasets.map((dataset) =>
    toRdfJsDataset(dataset),
  );
  const extendedProfileQuads = extendedProfileRdfJsDatasets.flatMap(
    (rdfjsDataset) => {
      return Array.from(
        rdfjsDataset.match(
          {
            termType: "NamedNode",
            value: profileUrl,
            equals: (term) =>
              term?.termType === "NamedNode" && term.value === profileUrl,
          },
          null,
          null,
        ),
      );
    },
  );

  return extendedProfileQuads.reduce((profile, quad) => {
    if (quad.predicate.termType !== "NamedNode") {
      return profile;
    }
    return addTerm(profile, quad.predicate, quad.object);
  }, profile);
}
