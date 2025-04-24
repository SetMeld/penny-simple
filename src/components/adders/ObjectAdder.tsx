import {
  addDatetime,
  addDecimal,
  addInteger,
  addStringNoLocale,
  addStringWithLocale,
  addUrl,
  asUrl,
  getUrlAll,
  setThing,
  ThingPersisted,
  UrlString,
} from "@inrupt/solid-client";
import React, {
  FC,
  FormEventHandler,
  ReactNode,
  useState,
  type JSX,
} from "react";
import {
  MdAdd,
  MdCheck,
  MdLink,
  MdTextFields,
  MdTranslate,
} from "react-icons/md";
import { VscCalendar, VscLink } from "react-icons/vsc";
import { LoadedCachedDataset } from "../../hooks/dataset";
import { useL10n } from "../../hooks/l10n";
import { useNavigationBlock } from "../../hooks/navigationBlock";
import { ClientLocalized } from "../ClientLocalized";

interface Props {
  dataset: LoadedCachedDataset;
  thing: ThingPersisted;
  predicate: UrlString;
  onUpdate: (previousThing: ThingPersisted) => void;
}

type ObjectTypes =
  | "url"
  | "stringNoLocale"
  | "stringWithLocale"
  | "boolean"
  | "datetime"
  | "decimal"
  | "integer";

export const ObjectAdder: FC<Props> = (props) => {
  const [objectType, setObjectType] = useState<ObjectTypes>();
  const [newUrl, setNewUrl] = useState("");
  const [newString, setNewString] = useState("");
  const [newLocale, setNewLocale] = useState("en-US");
  const [newInteger, setNewInteger] = useState("0");
  const [newDecimal, setNewDecimal] = useState("0.0");
  const [newDate, setNewDate] = useState("");
  const [newTime, setNewTime] = useState("");
  const l10n = useL10n();

  useNavigationBlock(typeof objectType !== "undefined");

  let form: JSX.Element | null = null;
  if (objectType === "url") {
    const onSubmit: FormEventHandler = async (event) => {
      event.preventDefault();
      const updatedThing = addUrl(props.thing, props.predicate, newUrl);
      const updatedDataset = setThing(props.dataset.data, updatedThing);
      setNewUrl("");
      await props.dataset.save(updatedDataset);
      props.onUpdate(props.thing);
    };
    form = (
      <form
        onSubmit={onSubmit}
        className="flex items-center space-x-2 p-2 pb-5"
      >
        <label className="w-10 p-2 text-gray-500" htmlFor="newUrl">
          <VscLink aria-label={l10n.getString("object-add-url-label")} />
        </label>
        <ClientLocalized
          id="object-add-url-input"
          attrs={{ placeholder: true, title: true }}
        >
          <input
            type="url"
            className="flex-grow rounded p-2 focus:outline-none focus:ring-2 focus:ring-gray-700"
            placeholder="https://…"
            name="newUrl"
            id="newUrl"
            required={true}
            value={newUrl}
            onChange={(e) => {
              e.preventDefault();
              setNewUrl(e.target.value);
            }}
            autoFocus={true}
          />
        </ClientLocalized>
        <button
          type="submit"
          aria-label={l10n.getString("object-add-url-submit")}
          className="rounded p-3 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-gray-700"
        >
          <MdCheck />
        </button>
      </form>
    );
  }

  if (objectType === "stringNoLocale") {
    const onSubmit: FormEventHandler = async (event) => {
      event.preventDefault();
      const updatedThing = addStringNoLocale(
        props.thing,
        props.predicate,
        newString,
      );
      const updatedDataset = setThing(props.dataset.data, updatedThing);
      setNewString("");
      await props.dataset.save(updatedDataset);
      props.onUpdate(props.thing);
    };
    form = (
      <form
        onSubmit={onSubmit}
        className="flex items-center space-x-2 p-2 pb-5"
      >
        <label className="w-10 p-2 text-gray-500" htmlFor="newStringNoLocale">
          <MdTextFields
            aria-label={l10n.getString("object-add-string-label")}
          />
        </label>
        <ClientLocalized
          id="object-add-string-input"
          attrs={{ placeholder: true, title: true }}
        >
          <input
            type="text"
            className="flex-grow rounded p-2 focus:outline-none focus:ring-2 focus:ring-gray-700"
            name="newStringNoLocale"
            id="newStringNoLocale"
            required={true}
            value={newString}
            onChange={(e) => {
              e.preventDefault();
              setNewString(e.target.value);
            }}
            autoFocus={true}
          />
        </ClientLocalized>
        <button
          onClick={() => setObjectType("stringWithLocale")}
          className="flex items-center space-x-2 rounded border-2 border-dashed border-gray-200 p-2 text-gray-500 hover:border-solid hover:border-gray-900 hover:bg-gray-100 hover:text-gray-900 focus:border-solid focus:border-gray-900 focus:text-gray-900 focus:outline-none"
          type="button"
        >
          <MdTranslate aria-hidden="true" />
          <ClientLocalized id="object-set-locale-label">
            <span>Set locale</span>
          </ClientLocalized>
        </button>
        <button
          type="submit"
          aria-label={l10n.getString("object-add-string-submit")}
          className="rounded p-3 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-gray-700"
        >
          <MdCheck />
        </button>
      </form>
    );
  }

  if (objectType === "stringWithLocale") {
    const onSubmit: FormEventHandler = async (event) => {
      event.preventDefault();
      const updatedThing = addStringWithLocale(
        props.thing,
        props.predicate,
        newString,
        newLocale,
      );
      const updatedDataset = setThing(props.dataset.data, updatedThing);
      setNewString("");
      await props.dataset.save(updatedDataset);
      props.onUpdate(props.thing);
    };
    form = (
      <form
        onSubmit={onSubmit}
        className="flex items-center space-x-2 p-2 pb-5"
      >
        <label className="w-10 p-2 text-gray-500" htmlFor="newStringWithLocale">
          <MdTextFields
            aria-label={l10n.getString("object-add-string-label")}
          />
        </label>
        <ClientLocalized
          id="object-add-string-input"
          attrs={{ placeholder: true, title: true }}
        >
          <input
            type="text"
            className="flex-grow rounded p-2 focus:outline-none focus:ring-2 focus:ring-gray-700"
            name="newStringWithLocale"
            id="newStringWithLocale"
            required={true}
            value={newString}
            onChange={(e) => {
              e.preventDefault();
              setNewString(e.target.value);
            }}
          />
        </ClientLocalized>
        <label className="w-10 p-2 text-gray-500" htmlFor="newLocale">
          <MdTranslate aria-label={l10n.getString("object-add-locale-label")} />
        </label>
        <ClientLocalized
          id="object-add-locale-input"
          attrs={{ placeholder: true, title: true }}
        >
          <input
            type="text"
            className="rounded p-2 focus:outline-none focus:ring-2 focus:ring-gray-700"
            name="newLocale"
            id="newLocale"
            required={true}
            value={newLocale}
            onChange={(e) => {
              e.preventDefault();
              setNewLocale(e.target.value);
            }}
            autoFocus={true}
          />
        </ClientLocalized>
        <button
          type="submit"
          aria-label={l10n.getString("object-add-string-submit")}
          className="rounded p-3 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-gray-700"
        >
          <MdCheck />
        </button>
      </form>
    );
  }

  if (objectType === "integer") {
    const onSubmit: FormEventHandler = async (event) => {
      event.preventDefault();
      const updatedThing = addInteger(
        props.thing,
        props.predicate,
        Number.parseInt(newInteger, 10),
      );
      const updatedDataset = setThing(props.dataset.data, updatedThing);
      setNewInteger("0");
      await props.dataset.save(updatedDataset);
      props.onUpdate(props.thing);
    };
    form = (
      <form
        onSubmit={onSubmit}
        className="flex items-center space-x-2 p-2 pb-5"
      >
        <label className="w-10 p-2 text-gray-500" htmlFor="newInteger">
          <span aria-label={l10n.getString("object-add-integer-label")}>1</span>
        </label>
        <ClientLocalized
          id="object-add-integer-input"
          attrs={{ placeholder: true, title: true }}
        >
          <input
            type="number"
            className="flex-grow rounded p-2 focus:outline-none focus:ring-2 focus:ring-gray-700"
            name="newInteger"
            id="newInteger"
            required={true}
            value={newInteger}
            onChange={(e) => {
              e.preventDefault();
              setNewInteger(e.target.value);
            }}
            autoFocus={true}
          />
        </ClientLocalized>
        <button
          type="submit"
          aria-label={l10n.getString("object-add-integer-submit")}
          className="rounded p-3 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-gray-700"
        >
          <MdCheck />
        </button>
      </form>
    );
  }

  if (objectType === "decimal") {
    const onSubmit: FormEventHandler = async (event) => {
      event.preventDefault();
      const updatedThing = addDecimal(
        props.thing,
        props.predicate,
        Number.parseFloat(newDecimal),
      );
      const updatedDataset = setThing(props.dataset.data, updatedThing);
      setNewDecimal("0.0");
      await props.dataset.save(updatedDataset);
      props.onUpdate(props.thing);
    };
    form = (
      <form
        onSubmit={onSubmit}
        className="flex items-center space-x-2 p-2 pb-5"
      >
        <label className="w-10 p-2 text-gray-500" htmlFor="newDecimal">
          <span aria-label={l10n.getString("object-add-decimal-label")}>
            1.0
          </span>
        </label>
        <ClientLocalized
          id="object-add-decimal-input"
          attrs={{ placeholder: true, title: true }}
        >
          <input
            type="number"
            step={0.1}
            className="flex-grow rounded p-2 focus:outline-none focus:ring-2 focus:ring-gray-700"
            name="newDecimal"
            id="newDecimal"
            required={true}
            value={newDecimal}
            onChange={(e) => {
              e.preventDefault();
              setNewDecimal(e.target.value);
            }}
            autoFocus={true}
          />
        </ClientLocalized>
        <button
          type="submit"
          aria-label={l10n.getString("object-add-decimal-submit")}
          className="rounded p-3 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-gray-700"
        >
          <MdCheck />
        </button>
      </form>
    );
  }

  if (objectType === "datetime") {
    const onSubmit: FormEventHandler = async (event) => {
      event.preventDefault();
      const [year, month, day] = newDate
        .split("-")
        .map((nr) => Number.parseInt(nr, 10));
      const [hour, minute] = newTime
        .split(":")
        .map((nr) => Number.parseInt(nr, 10));
      const date = new Date(year, month - 1, day, hour, minute);
      const updatedThing = addDatetime(props.thing, props.predicate, date);
      const updatedDataset = setThing(props.dataset.data, updatedThing);
      setNewDate("");
      setNewTime("");
      await props.dataset.save(updatedDataset);
      props.onUpdate(props.thing);
    };
    form = (
      <form
        onSubmit={onSubmit}
        className="flex items-center space-x-2 p-2 pb-5"
      >
        <label className="w-10 p-2 text-gray-500" htmlFor="newDate">
          <VscCalendar aria-label={l10n.getString("object-add-date-label")} />
        </label>
        <ClientLocalized
          id="object-add-date-input"
          attrs={{ placeholder: true, title: true }}
        >
          <input
            type="date"
            className="flex-grow rounded p-2 focus:outline-none focus:ring-2 focus:ring-gray-700"
            name="newDate"
            id="newDate"
            required={true}
            value={newDate}
            onChange={(e) => {
              e.preventDefault();
              setNewDate(e.target.value);
            }}
            autoFocus={true}
          />
        </ClientLocalized>
        <label className="sr-only" htmlFor="newTime">
          <VscCalendar aria-label={l10n.getString("object-add-time-label")} />
        </label>
        <ClientLocalized
          id="object-add-time-input"
          attrs={{ placeholder: true, title: true }}
        >
          <input
            type="time"
            className="flex-grow rounded p-2 focus:outline-none focus:ring-2 focus:ring-gray-700"
            name="newTime"
            id="newTime"
            required={true}
            value={newTime}
            onChange={(e) => {
              e.preventDefault();
              setNewTime(e.target.value);
            }}
          />
        </ClientLocalized>
        <button
          type="submit"
          aria-label={l10n.getString("object-add-datetime-submit")}
          className="rounded p-3 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-gray-700"
        >
          <MdCheck />
        </button>
      </form>
    );
  }

  return (
    <>
      {form}
      <div className="flex flex-wrap items-center space-x-2 space-y-2 p-2 pb-5">
        <span className="w-10 p-2 text-gray-500">
          <MdAdd aria-label={l10n.getString("object-add-label")} />
        </span>
        <ClientLocalized id="object-add-url">
          <AddButton icon={<MdLink />} onClick={() => setObjectType("url")}>
            URL
          </AddButton>
        </ClientLocalized>
        <ClientLocalized id="object-add-string-label">
          <AddButton
            icon={<MdTextFields />}
            onClick={() => setObjectType("stringNoLocale")}
          >
            String
          </AddButton>
        </ClientLocalized>
        <ClientLocalized id="object-add-integer">
          <AddButton
            icon={<span aria-hidden="true">1</span>}
            onClick={() => setObjectType("integer")}
          >
            Integer
          </AddButton>
        </ClientLocalized>
        <ClientLocalized id="object-add-decimal">
          <AddButton
            icon={<span aria-hidden="true">1.0</span>}
            onClick={() => setObjectType("decimal")}
          >
            Decimal
          </AddButton>
        </ClientLocalized>
        <ClientLocalized id="object-add-datetime">
          <AddButton
            icon={<VscCalendar />}
            onClick={() => setObjectType("datetime")}
          >
            Datetime
          </AddButton>
        </ClientLocalized>
      </div>
    </>
  );
};

interface ButtonProps {
  icon: JSX.Element;
  onClick: () => void;
  children: ReactNode;
}
const AddButton = (props: ButtonProps) => {
  return (
    <button
      className="flex items-center rounded border-2 border-dashed border-gray-200 p-1 text-gray-500 hover:border-solid hover:border-gray-900 hover:bg-gray-100 hover:text-gray-900 focus:border-solid focus:border-gray-900 focus:text-gray-900 focus:outline-none"
      onClick={(e) => {
        e.preventDefault();
        props.onClick();
      }}
    >
      <span className="px-1">{props.icon}</span>
      <span className="px-1">{props.children}</span>
    </button>
  );
};
