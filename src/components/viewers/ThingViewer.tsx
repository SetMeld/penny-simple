import {
  asUrl,
  FetchError,
  getPropertyAll,
  getSourceUrl,
  isContainer,
  removeThing,
  ThingPersisted,
} from "@inrupt/solid-client";
import { FC, MouseEventHandler } from "react";
import { VscTrash } from "react-icons/vsc";
import { PredicateViewer } from "./PredicateViewer";
import { toast } from "react-toastify";
import { PredicateAdder } from "../adders/PredicateAdder";
import { MdContentCopy, MdExpandLess, MdExpandMore } from "react-icons/md";
// TODO: Memo:
import { WacControl } from "./things/WacControl";
import { HasAccess } from "../HasAccess";
import { LoadedCachedDataset } from "../../hooks/dataset";
import { useMediaQuery } from "../../hooks/mediaQuery";
import { useL10n } from "../../hooks/l10n";
import { SeeAlso } from "./things/SeeAlso";

interface Props {
  dataset: LoadedCachedDataset;
  thing: ThingPersisted;
  onUpdate: (previousThing: ThingPersisted) => void;
  collapsed: boolean;
  onCollapse?: (collapse: boolean, all: boolean) => void;
  /**
   * If this Thing is a Container's listing of one of its children,
   * we want to hide the deletion button, because the server will recreate it
   * right after deletion.
   */
  isServerManaged?: boolean;
}

export const ThingViewer: FC<Props> = (props) => {
  const predicates = getPropertyAll(props.thing).sort();
  const viewers = predicates.map((predicate) => (
    <PredicateViewer
      key={predicate + "_predicate"}
      {...props}
      predicate={predicate}
      onUpdate={props.onUpdate}
    />
  ));
  const isMotionSafe = useMediaQuery("(prefers-reduced-motion: no-preference)");
  const l10n = useL10n();

  const deleteThing = async () => {
    const updatedDataset = removeThing(props.dataset.data, props.thing);
    try {
      await props.dataset.save(updatedDataset);
      props.onUpdate(props.thing);
    } catch (e) {
      if (e instanceof FetchError && e.statusCode === 403) {
        toast(l10n.getString("thing-toast-error-not-allowed"), {
          type: "error",
        });
      } else {
        throw e;
      }
    }
  };

  const resourceUrl = getSourceUrl(props.dataset.data);
  const thingUrl = asUrl(props.thing);
  const resourcePartStart = isContainer(props.dataset.data)
    ? resourceUrl.substring(0, resourceUrl.lastIndexOf("/")).lastIndexOf("/")
    : resourceUrl.lastIndexOf("/");

  let noise = "";
  let signal = thingUrl;
  // The following logic has quite a few branches, so to clarify it,
  // in the comments let's assume the following Resource URL:
  //     https://some.pod/container/resource/
  // By default, we just display the full URL of the Thing.
  // Hoever, if this Thing is in the same Container as the containing Resource
  // (though it might be inside a child Container), we display a relative URL.
  // So the Thing's URL might be:
  // - https://some.pod/container/resource/#thing, or
  // - https://some.pod/container/resource/child, or
  // - https://some.pod/container/resource/child#thing
  if (thingUrl.substring(0, resourceUrl.length) === resourceUrl) {
    const hashIndex = thingUrl.indexOf("#");
    // If this is a Thing directly in the current Resource, e.g.
    //     https://some.pod/container/resource/#thing:
    if (hashIndex === resourceUrl.length) {
      // Display the Resource name subdued...
      noise = resourceUrl.substring(resourcePartStart + 1);
      // ...and the Thing name prominently:
      signal = thingUrl.substring(thingUrl.indexOf("#"));
    } else {
      // If this is a Thing inside a child Resource, or a Thing representing this Resource itself,
      // display the path relative to the current Container
      // (i.e. starting with the current Container's name).
      // So the Thing's URL might be:
      // - https://some.pod/container/resource/child, or
      // - https://some.pod/container/resource/child#thing, or
      // - https://some.pod/container/resource/, or
      signal = thingUrl.substring(resourcePartStart + 1);
      if (new URL(resourceUrl).pathname === "/") {
        // Unless we're at the root Container, in which case `resourcePartStart` is not, in fact,
        // the last `/` before the Resource, but the first one in `https://`.
        // Thus, we explicitly cut off the origin (but keep a `/` in front) in that case.
        signal = thingUrl.substring(new URL(resourceUrl).origin.length);
      }
    }
  }
  const copyThingUrl: MouseEventHandler = async (event) => {
    event.preventDefault();
    await navigator.clipboard.writeText(asUrl(props.thing));
    toast(l10n.getString("thing-urlcopy-toast-success"), { type: "info" });
  };
  const clipboardLink = (
    <a
      href={asUrl(props.thing)}
      title={l10n.getString("thing-urlcopy-button-tooltip")}
      aria-hidden="true"
      onClick={copyThingUrl}
      className="rounded p-2 text-gray-400 hover:text-white focus:text-white focus:outline-none focus:ring-2 focus:ring-white"
    >
      <MdContentCopy className="inline-block" />
    </a>
  );
  const title = (
    <>
      <span className="flex min-w-0 shrink items-center">
        <span className="truncate" title={decodeURIComponent(noise + signal)}>
          <span className="font-normal text-gray-400">
            {decodeURIComponent(noise)}
          </span>
          {decodeURIComponent(signal)}
        </span>
        <span className="shrink-0">{clipboardLink}</span>
      </span>
    </>
  );

  const collapseHandler: MouseEventHandler = (event) => {
    event.preventDefault();

    if (props.onCollapse) {
      props.onCollapse(!props.collapsed, event.altKey);
    }
  };

  const deletionButton =
    props.isServerManaged !== true ? (
      <button
        onClick={(e) => {
          e.preventDefault();
          deleteThing();
        }}
        aria-label={l10n.getString("thing-delete-label", {
          thingUrl: asUrl(props.thing),
        })}
        title={l10n.getString("thing-delete-tooltip", {
          thingUrl: asUrl(props.thing),
        })}
        className="absolute -right-0.5 -top-0.5 -m-3 rounded-full border-4 border-gray-50 bg-white object-right-top p-1 hover:border-red-700 hover:bg-red-700 hover:text-white focus:border-red-700 focus:outline-none"
      >
        <VscTrash />
      </button>
    ) : null;

  return (
    <div
      className="relative rounded-xl rounded-t-2xl bg-gray-50 target:outline target:outline-4 target:outline-gray-700"
      id={encodeURIComponent(asUrl(props.thing))}
    >
      <h3 className="flex items-center break-words rounded-t-xl bg-gray-700 p-5 text-lg font-bold text-white md:text-xl lg:text-2xl">
        <span className="flex min-w-0 shrink flex-grow items-center">
          {title}
        </span>
        {typeof props.onCollapse === "function" && (
          <button
            aria-hidden="true"
            className="flex items-center  rounded p-2 text-gray-400 hover:bg-white hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-white"
            onClick={collapseHandler}
            title={l10n.getString(
              props.collapsed
                ? "thing-expand-tooltip"
                : "thing-collapse-tooltip",
            )}
          >
            {props.collapsed ? (
              <MdExpandMore aria-label={l10n.getString("thing-expand-label")} />
            ) : (
              <MdExpandLess aria-label={l10n.getString("thing-expand-label")} />
            )}
          </button>
        )}
      </h3>
      <div
        style={{
          // A weird workaround to be able to animate from height: 0 to auto.
          // See https://chriscoyier.net/2022/12/21/things-css-could-still-use-heading-into-2023/#animate-to-auto
          display: "grid",
          overflowY: "hidden",
          gridTemplateRows: props.collapsed ? "0fr" : "1fr",
          transition: `grid-template-rows ${
            isMotionSafe ? "200ms" : "0"
          } ease-in-out`,
        }}
      >
        <div
          style={{ minHeight: 0 }}
          key={`children-of-${encodeURIComponent(asUrl(props.thing))}`}
        >
          <WacControl
            dataset={props.dataset}
            thing={props.thing}
            onUpdate={props.onUpdate}
          />
          <div className="py-5">
            <div
              className="px-5"
              style={{ contain: "content", contentVisibility: "auto" }}
            >
              {viewers}
            </div>
            <HasAccess access={["append"]} resource={props.dataset.data}>
              <PredicateAdder {...props} />
            </HasAccess>
          </div>
          <SeeAlso thing={props.thing} />
        </div>
        <HasAccess access={["write"]} resource={props.dataset.data}>
          {deletionButton}
        </HasAccess>
      </div>
    </div>
  );
};
