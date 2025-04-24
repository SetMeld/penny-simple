import {
  createContainerAt,
  createSolidDataset,
  getSourceUrl,
  saveSolidDatasetAt,
} from "@inrupt/solid-client";
import { fetch } from "@inrupt/solid-client-authn-browser";
import React, {
  FC,
  FocusEventHandler,
  FormEventHandler,
  useState,
} from "react";
import { MdAdd, MdCheck } from "react-icons/md";
import { toast } from "react-toastify";
import Link from "next/link";
import { useSessionInfo } from "../../hooks/sessionInfo";
import { FileAdder } from "./FileAdder";
import { getExplorePath } from "../../functions/integrate";
import { ClientLocalized } from "../ClientLocalized";
import { LoadedCachedDataset } from "../../hooks/dataset";
import { useL10n } from "../../hooks/l10n";

interface Props {
  container: LoadedCachedDataset;
}

export const ResourceAdder: FC<Props> = (props) => {
  const sessionInfo = useSessionInfo();
  const [phase, setPhase] = useState<"initial" | "chooseName">("initial");
  const [newResourceName, setNewResourceName] = useState("");
  const l10n = useL10n();

  if (!sessionInfo) {
    return null;
  }

  if (phase === "chooseName") {
    const onCancel: FocusEventHandler = (event) => {
      event.preventDefault();
      if (
        event.relatedTarget === null ||
        !event.currentTarget.contains(event.relatedTarget as Node)
      ) {
        setPhase("initial");
      }
    };

    const onSubmit: FormEventHandler = async (event) => {
      event.preventDefault();

      const justResourceName = newResourceName.endsWith("/")
        ? newResourceName.substring(0, newResourceName.length - 1)
        : newResourceName;
      const trailingSlash = newResourceName.endsWith("/") ? "/" : "";
      const sanitisedResourceName = encodeURIComponent(justResourceName);
      const newResourceUrl =
        getSourceUrl(props.container.data) +
        sanitisedResourceName +
        trailingSlash;
      const sentResource = newResourceName.endsWith("/")
        ? await createContainerAt(newResourceUrl, { fetch: fetch })
        : await saveSolidDatasetAt(newResourceUrl, createSolidDataset(), {
            fetch: fetch,
          });
      setPhase("initial");
      setNewResourceName("");
      await props.container.mutate();

      toast(
        <>
          <ClientLocalized id="resource-add-toast-success">
            Resource created.
          </ClientLocalized>
          &nbsp;
          <Link
            href={getExplorePath(getSourceUrl(sentResource))}
            className="underline hover:no-underline"
          >
            {l10n.getString("resource-add-toast-success-view-button")}
          </Link>
        </>,
        { type: "info" },
      );
    };

    return (
      <>
        <form
          onSubmit={onSubmit}
          className="flex items-center space-x-2 rounded bg-gray-700 p-3 text-white"
          onBlur={onCancel}
        >
          <ClientLocalized id="resource-add-name-label">
            <label htmlFor="resourceName" className="sr-only">
              Resource name
            </label>
          </ClientLocalized>
          <ClientLocalized
            id="resource-add-name-input"
            attrs={{ placeholder: true, title: true }}
          >
            <input
              type="text"
              name="resourceName"
              id="resourceName"
              className="flex-grow rounded p-2 text-gray-900 focus:outline-none focus:ring-4 focus:ring-blue-500"
              placeholder="e.g. resource-name or container-name/"
              required={true}
              autoFocus={true}
              value={newResourceName}
              onChange={(e) => {
                e.preventDefault();
                setNewResourceName(e.target.value);
              }}
              title="Resource name (append a `/` to create a Container)"
            />
          </ClientLocalized>
          <button
            type="submit"
            className="rounded border-2 border-gray-700 p-3 hover:border-white hover:bg-white hover:text-gray-900 focus:border-white focus:outline-none"
          >
            <MdCheck aria-label={l10n.getString("resource-add-name-submit")} />
          </button>
        </form>
      </>
    );
  }

  return (
    <>
      <div className="grid gap-5 sm:grid-cols-2">
        <button
          className="flex items-center space-x-2 rounded border-4 border-dashed border-gray-200 p-5 text-gray-500 hover:border-gray-900 hover:bg-gray-100 hover:text-gray-900 focus:border-gray-900 focus:text-gray-900 focus:outline-none"
          onClick={(e) => {
            e.preventDefault();
            setPhase("chooseName");
          }}
        >
          <MdAdd aria-hidden="true" className="text-3xl" />
          <ClientLocalized id="resource-add-button">
            <span>Add Resource</span>
          </ClientLocalized>
        </button>
        <FileAdder container={props.container} />
      </div>
    </>
  );
};
