import { asUrl, getUrlAll, ThingPersisted } from "@inrupt/solid-client";
import Link from "next/link";
import { rdfs } from "rdf-namespaces";
import React, { FC } from "react";
import { getExplorePath } from "../../../functions/integrate";
import { MdArrowForward } from "react-icons/md";
import { useL10n } from "../../../hooks/l10n";

interface Props {
  thing: ThingPersisted;
}

export const SeeAlso: FC<Props> = (props) => {
  const l10n = useL10n();
  const thingUrl = asUrl(props.thing);
  const seeAlsoUrls = getUrlAll(props.thing, rdfs.seeAlso);
  if (seeAlsoUrls.length === 0) {
    return null;
  }

  const sourceOrigin = new URL(thingUrl).origin;

  const linkListings = seeAlsoUrls.map((url) => {
    const shortUrl = url.startsWith(sourceOrigin)
      ? url.substring(sourceOrigin.length)
      : url;

    return (
      <li key={url + thingUrl}>
        <Link
          href={getExplorePath(url, encodeURIComponent(thingUrl))}
          className="flex items-center gap-2 hover:underline"
          title={url}
        >
          <MdArrowForward aria-hidden />
          {shortUrl}
        </Link>
      </li>
    );
  });

  return (
    <section className="flex flex-col gap-2 border-t-2 border-dashed border-gray-200 bg-gray-50 p-5">
      <p className="font-bold">{l10n.getString("thing-see-also-heading")}</p>
      <ul className="flex flex-col gap-2">{linkListings}</ul>
    </section>
  );
};
