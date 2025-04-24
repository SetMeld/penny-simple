import { ThingPersisted } from "@inrupt/solid-client";
import React, { FC, useState } from "react";
import { MdAdd } from "react-icons/md";
import { PredicateForm } from "../data/PredicateForm";
import { ObjectAdder } from "./ObjectAdder";
import { PredicateUrl } from "../viewers/PredicateUrl";
import { ClientLocalized } from "../ClientLocalized";
import { LoadedCachedDataset } from "../../hooks/dataset";
import { useNavigationBlock } from "../../hooks/navigationBlock";

interface Props {
  dataset: LoadedCachedDataset;
  thing: ThingPersisted;
  onUpdate: (previousThing: ThingPersisted) => void;
}

export const PredicateAdder: FC<Props> = (props) => {
  const [predicate, setPredicate] = useState("");
  const [phase, setPhase] = useState<"initial" | "setPredicate" | "setObject">(
    "initial",
  );

  useNavigationBlock(phase !== "initial" || predicate !== "");

  if (phase === "setObject") {
    const onSetObject = (previousThing: ThingPersisted) => {
      setPhase("initial");
      props.onUpdate(previousThing);
    };
    return (
      <div className="p-5">
        <PredicateUrl url={predicate} />
        <ObjectAdder
          dataset={props.dataset}
          thing={props.thing}
          predicate={predicate}
          onUpdate={onSetObject}
        />
      </div>
    );
  }

  if (phase === "setPredicate") {
    return (
      <div className="p-5">
        <PredicateForm
          onSubmit={(predicate) => {
            setPredicate(predicate);
            setPhase("setObject");
          }}
        />
      </div>
    );
  }

  return (
    <>
      <div className="p-5">
        <button
          className="flex w-full items-center space-x-2 rounded border-2 border-dashed border-gray-200 p-2 text-gray-500 hover:border-solid hover:border-gray-900 hover:bg-gray-100 hover:text-gray-900 focus:border-solid focus:border-gray-900 focus:text-gray-900 focus:outline-none"
          onClick={(e) => {
            e.preventDefault();
            setPhase("setPredicate");
          }}
        >
          <MdAdd aria-hidden={true} />{" "}
          <ClientLocalized id="predicate-add-button">
            <span>New property</span>
          </ClientLocalized>
        </button>
      </div>
    </>
  );
};
