import {
  createThing,
  getSourceUrl,
  ThingPersisted,
} from "@inrupt/solid-client";
import React, { FC, FormEventHandler, useState } from "react";
import { MdAdd, MdCheck } from "react-icons/md";
import { LoadedCachedDataset } from "../../hooks/dataset";
import { useL10n } from "../../hooks/l10n";
import { useNavigationBlock } from "../../hooks/navigationBlock";
import { ClientLocalized } from "../ClientLocalized";
import { ThingViewer } from "../viewers/ThingViewer";

interface Props {
  dataset: LoadedCachedDataset;
  onUpdate: (previousThing: ThingPersisted) => void;
}

export const ThingAdder: FC<Props> = (props) => {
  const [thingUrl, setThingUrl] = useState(
    getSourceUrl(props.dataset.data) + `#${Date.now()}`,
  );
  const [phase, setPhase] = useState<
    "initial" | "setThingUrl" | "addPredicate"
  >("initial");
  const l10n = useL10n();

  useNavigationBlock(phase !== "initial");

  if (phase === "addPredicate") {
    const onSetPredicate = (updatedThing: ThingPersisted) => {
      setThingUrl(getSourceUrl(props.dataset.data) + `#${Date.now()}`);
      setPhase("initial");
      props.onUpdate(updatedThing);
    };
    return (
      <ThingViewer
        dataset={props.dataset}
        thing={createThing({ url: thingUrl })}
        onUpdate={onSetPredicate}
        collapsed={false}
      />
    );
  }

  if (phase === "setThingUrl") {
    const onSubmit: FormEventHandler = (event) => {
      event.preventDefault();
      setPhase("addPredicate");
    };
    return (
      <div className="rounded-xl bg-gray-700 p-5 text-2xl font-bold text-white">
        <form onSubmit={onSubmit} className="flex items-center space-x-2">
          <ClientLocalized id="thing-add-url-label">
            <label className="sr-only" htmlFor="newThingUrl">
              Thing URL:
            </label>
          </ClientLocalized>
          <ClientLocalized
            id="thing-add-url-input"
            attrs={{ placeholder: true, title: true }}
          >
            <input
              type="url"
              className="flex-grow rounded bg-white p-2 text-lg text-gray-900 focus:outline-none focus:ring-4 focus:ring-blue-500"
              placeholder="https://…"
              name="newThingUrl"
              id="newThingUrl"
              required={true}
              value={thingUrl}
              onChange={(e) => {
                e.preventDefault();
                setThingUrl(e.target.value);
              }}
              autoFocus={true}
            />
          </ClientLocalized>
          <button
            type="submit"
            aria-label={l10n.getString("thing-add-url-submit")}
            className="rounded border-2 border-gray-700 p-2 hover:border-white hover:bg-white hover:text-gray-900 focus:border-white focus:outline-none"
          >
            <MdCheck />
          </button>
        </form>
      </div>
    );
  }

  return (
    <>
      <button
        className="flex w-full items-center space-x-2 rounded border-2 border-dashed border-gray-200 p-2 text-gray-500 hover:border-solid hover:border-gray-900 hover:text-gray-900 focus:border-solid focus:border-gray-900 focus:text-gray-900 focus:outline-none"
        onClick={(e) => {
          e.preventDefault();
          setPhase("setThingUrl");
        }}
      >
        <MdAdd aria-hidden={true} />{" "}
        <ClientLocalized id="thing-add-button">
          <span>New Thing</span>
        </ClientLocalized>
      </button>
    </>
  );
};
