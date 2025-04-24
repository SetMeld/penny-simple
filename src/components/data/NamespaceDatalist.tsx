import { UrlString } from "@inrupt/solid-client";
import * as knownPredicates from "rdf-namespaces";
import { FC } from "react";

interface Props {
  id: string;
}
type PredicateParts = readonly [string, string, UrlString];
const allKnownPredicates: PredicateParts[] = Array.from(
  new Set(
    Object.entries(knownPredicates)
      .map(([namespace, namespaceContents]) =>
        Object.entries(namespaceContents).map(
          ([abbr, url]) => [namespace, abbr, url] as const,
        ),
      )
      .flat(),
  ),
);

export const NamespaceDatalist: FC<Props> = (props) => {
  return (
    <datalist id={props.id}>
      {allKnownPredicates.map(([namespace, abbr, predicate]) => (
        <option
          key={namespace + abbr + "_knownPredicate"}
          value={predicate}
          label={`${namespace}:${abbr}`}
        />
      ))}
    </datalist>
  );
};
