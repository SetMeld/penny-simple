import { UrlString } from "@inrupt/solid-client";
import React, { FC, FormEventHandler, lazy, Suspense, useState } from "react";
import { MdCheck } from "react-icons/md";
import { VscLink } from "react-icons/vsc";
import { useL10n } from "../../hooks/l10n";
import { ClientLocalized } from "../ClientLocalized";

const NamespaceDatalist = lazy(() =>
  import("./NamespaceDatalist").then((module) => ({
    default: module.NamespaceDatalist,
  })),
);

interface Props {
  onSubmit: (predicate: UrlString) => void;
}

export const PredicateForm: FC<Props> = (props) => {
  const [newPredicate, setNewPredicate] = useState("");
  const l10n = useL10n();

  const onSubmit: FormEventHandler = (event) => {
    event.preventDefault();
    props.onSubmit(newPredicate);
    setNewPredicate("");
  };
  return (
    <form onSubmit={onSubmit} className="flex items-center space-x-2">
      <Suspense fallback={null}>
        <NamespaceDatalist id="knownPredicates" />
      </Suspense>
      <label className="w-10 p-2 text-gray-500" htmlFor="newPredicate">
        <VscLink aria-label={l10n.getString("predicate-add-url-label")} />
      </label>
      <ClientLocalized
        id="predicate-add-url-input"
        attrs={{ placeholder: true, title: true }}
      >
        <input
          type="url"
          className="flex-grow rounded p-2 focus:outline-none focus:ring-2 focus:ring-gray-700"
          placeholder="https://…"
          name="newPredicate"
          id="newPredicate"
          required={true}
          list="knownPredicates"
          value={newPredicate}
          onChange={(e) => {
            e.preventDefault();
            setNewPredicate(e.target.value);
          }}
          autoFocus={true}
        />
      </ClientLocalized>
      <button
        type="submit"
        aria-label={l10n.getString("predicate-add-url-submit")}
        className="rounded p-3 focus:outline-none focus:ring-2 focus:ring-gray-700"
      >
        <MdCheck />
      </button>
    </form>
  );
};
