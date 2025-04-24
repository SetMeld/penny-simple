import {
  getSolidDataset,
  getThing,
  getUrlAll,
  UrlString,
} from "@inrupt/solid-client";
import { solid } from "rdf-namespaces";

export async function fetchIdps(webId: UrlString): Promise<UrlString[]> {
  try {
    const webIdDoc = await getSolidDataset(webId);
    const webIdThing = getThing(webIdDoc, webId);
    if (webIdThing) {
      return getUrlAll(webIdThing, solid.oidcIssuer);
    }
    return [];
  } catch (_e) {
    return [];
  }
}
