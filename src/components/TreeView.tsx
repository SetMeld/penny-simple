import { getContainedResourceUrlAll, UrlString } from "@inrupt/solid-client";
import { KeyboardEventHandler, useEffect, useRef, useState } from "react";
import { FocusScope, useFocusManager } from "react-aria";
import { MdKeyboardArrowRight } from "react-icons/md";
import { isLoadedDataset, useDataset } from "../hooks/dataset";
import { useL10n } from "../hooks/l10n";
import { Spinner } from "./ui/Spinner";

export interface Props {
  root: UrlString;
  onExplore: (url: UrlString) => void;
  currentUrl?: UrlString;
}

export const TreeView = (props: Props) => {
  // Without a re-render after first render, if you try to use keyboard
  // navigation right after opening the tree view, the call to
  // `focusManager.focusNext()` will result in the following error:
  // > TypeError: Document.createTreeWalker: Argument 1 is not an object.
  const [_hasRendered, setHasRendered] = useState(false);
  useEffect(() => {
    setHasRendered(true);
  }, []);
  const l10n = useL10n();

  return (
    <div
      role="tree"
      aria-label={l10n.getString("tree-label", { url: props.root })}
      aria-orientation="vertical"
      aria-multiselectable={false}
    >
      <FocusScope contain={false}>
        <TreeViewChildren
          path={props.root}
          onExplore={(url) => {
            props.onExplore(url);
          }}
          indent={0}
          currentUrl={props.currentUrl}
          onCollapse={() => {
            // Do nothing; we can't collapse the root.
          }}
        />
      </FocusScope>
    </div>
  );
};

interface TreeViewChildrenProps {
  path: UrlString;
  indent: number;
  onExplore: (url: UrlString) => void;
  onCollapse: () => void;
  currentUrl?: UrlString;
}

const TreeViewChildren = (props: TreeViewChildrenProps) => {
  const dataset = useDataset(props.path);
  const containedResourceUrls =
    dataset && isLoadedDataset(dataset)
      ? getContainedResourceUrlAll(dataset.data)
      : [];
  const children = containedResourceUrls.filter((childUrl) =>
    childUrl.startsWith(props.path),
  );
  let currentChild: UrlString | undefined;
  if (
    typeof props.currentUrl === "string" &&
    props.currentUrl.startsWith(props.path)
  ) {
    const postPathParts = props.currentUrl
      .substring(props.path.length)
      .split("/");
    const suffix = postPathParts.length > 1 ? "/" : "";
    currentChild = props.path + postPathParts[0] + suffix;
  }
  const [expandedChildren, setExpandedChildren] = useState<string[]>(
    currentChild ? [currentChild] : [],
  );

  if (
    !dataset ||
    (typeof dataset.error === "undefined" && !isLoadedDataset(dataset))
  ) {
    return (
      <div className={`py-2 pl-${props.indent + 1}`}>
        <Spinner />
      </div>
    );
  }

  const setExpanded = (childUrl: string, expand: boolean) => {
    const newExpandedChildren = expandedChildren.filter(
      (child) => child !== childUrl,
    );
    if (expand) {
      newExpandedChildren.push(childUrl);
    }
    setExpandedChildren(newExpandedChildren);
  };

  const isExpanded = (childUrl: string) => expandedChildren.includes(childUrl);

  return (
    <ul className={`pl-${props.indent}`}>
      {children.map((child, index) => {
        if (!child.endsWith("/")) {
          return (
            <li key={child}>
              <TreeViewResource
                index={index}
                indent={props.indent}
                onExplore={props.onExplore}
                parentPath={props.path}
                path={child}
                currentUrl={props.currentUrl}
                onCollapse={props.onCollapse}
              />
            </li>
          );
        }

        return (
          <li key={child} className="flex flex-col">
            <TreeViewContainer
              index={index}
              indent={props.indent}
              onExplore={(path) => {
                props.onExplore(path);
                if (path === child) {
                  setExpanded(child, true);
                }
              }}
              parentPath={props.path}
              path={child}
              isExpanded={isExpanded(child)}
              onExpandChange={(isExpanded) => setExpanded(child, isExpanded)}
              onExpandAllChange={(isExpanded) =>
                setExpandedChildren(isExpanded ? children : [])
              }
              currentUrl={props.currentUrl}
            />
          </li>
        );
      })}
    </ul>
  );
};

type TreeViewResourceProps = {
  path: UrlString;
  parentPath: UrlString;
  index: number;
  indent: number;
  onExplore: (path: UrlString) => void;
  onCollapse: () => void;
  currentUrl?: UrlString;
};

const TreeViewResource = (props: TreeViewResourceProps) => {
  const focusManager = useFocusManager();
  if (!focusManager) {
    throw new Error("<TreeViewResource> is not within a <FocusScope>");
  }
  const onKeyDown: KeyboardEventHandler = (e) => {
    switch (e.key) {
      case "Tab":
        if (e.shiftKey) {
          focusManager.focusFirst();
        } else {
          focusManager.focusLast();
        }
        break;
      case "ArrowLeft":
        e.preventDefault();
        props.onCollapse();
        break;
      case "ArrowDown":
        e.preventDefault();
        focusManager.focusNext({ wrap: false });
        break;
      case "ArrowUp":
        e.preventDefault();
        focusManager.focusPrevious({ wrap: false });
        break;
      case "Enter":
        e.preventDefault();
        props.onExplore(props.path);
        break;
      case "Space":
        e.preventDefault();
        props.onExplore(props.path);
        break;
    }
  };

  return (
    <span
      onClick={() => props.onExplore(props.path)}
      tabIndex={0}
      onKeyDown={onKeyDown}
      role="treeitem"
      aria-selected={props.currentUrl === props.path}
      className={`mx-2 flex cursor-pointer items-center rounded-md px-2 py-1 hover:bg-gray-700 hover:text-white ${
        props.currentUrl === props.path ? "font-bold" : ""
      }`}
    >
      <span
        className="shrink-0"
        style={{
          // Width of <MdKeyboardArrowRight>, used in <TreeViewContainer>:
          width: "16px",
          textAlign: "center",
          fontSize: "18px",
          fontWeight: "bold",
          lineHeight: "16px",
        }}
      >
        ·
      </span>
      <span className="shrink truncate">
        {props.path.substring(props.parentPath.length)}
      </span>
    </span>
  );
};

type TreeViewContainerProps = {
  path: UrlString;
  parentPath: UrlString;
  index: number;
  indent: number;
  onExplore: (path: UrlString) => void;
  isExpanded: boolean;
  onExpandChange: (isExpanded: boolean) => void;
  onExpandAllChange: (isExpanded: boolean) => void;
  currentUrl?: UrlString;
};

const TreeViewContainer = (props: TreeViewContainerProps) => {
  const focusManager = useFocusManager();

  if (!focusManager) {
    throw new Error("<TreeViewContainer> is not within a <FocusScope>");
  }

  const onKeyDown: KeyboardEventHandler = (e) => {
    switch (e.key) {
      case "Tab":
        if (e.shiftKey) {
          focusManager.focusFirst();
        } else {
          focusManager.focusLast();
        }
        break;
      case "Home":
        focusManager.focusFirst();
        break;
      case "End":
        focusManager.focusFirst();
        break;
      case "ArrowRight":
        e.preventDefault();
        if (props.isExpanded) {
          focusManager.focusNext({ wrap: false });
        } else {
          props.onExpandChange(true);
        }
        break;
      case "ArrowLeft":
        e.preventDefault();
        if (!props.isExpanded) {
          focusManager.focusPrevious({ wrap: false });
        } else {
          props.onExpandChange(false);
        }
        break;
      case "ArrowDown":
        e.preventDefault();
        focusManager.focusNext({ wrap: false });
        break;
      case "ArrowUp":
        e.preventDefault();
        focusManager.focusPrevious({ wrap: false });
        break;
      case "Enter":
        e.preventDefault();
        props.onExplore(props.path);
        break;
      case "Space":
        e.preventDefault();
        props.onExplore(props.path);
        break;
      case "*":
        e.preventDefault();
        props.onExpandAllChange(true);
        break;
    }
  };

  const focusableRef = useRef<HTMLSpanElement>(null);

  return (
    <>
      <span
        ref={focusableRef}
        role="treeitem"
        aria-expanded={props.isExpanded}
        onClick={(event) => {
          // When clicking the arrow icon specifically, only expand/collapse,
          // i.e. don't open the Container Resource:
          if (event.target instanceof SVGElement) {
            if (event.altKey) {
              props.onExpandAllChange(!props.isExpanded);
            } else {
              props.onExpandChange(!props.isExpanded);
            }
          } else {
            if (event.altKey) {
              props.onExpandAllChange(!props.isExpanded);
            } else {
              // When clicking the currently-shown Resource, expand/collapse
              if (props.currentUrl === props.path) {
                props.onExpandChange(!props.isExpanded);
              } else {
                // Otherwise, visit that Resource and expand it
                props.onExplore(props.path);
              }
            }
          }
        }}
        tabIndex={0}
        onKeyDown={onKeyDown}
        className={`mx-2 flex cursor-pointer items-center rounded-md px-2 py-1 hover:bg-gray-700 hover:text-white ${
          props.currentUrl === props.path ? "font-bold" : ""
        }`}
      >
        <MdKeyboardArrowRight
          className={`shrink-0 ${props.isExpanded ? "rotate-90" : ""}`}
        />
        <span className="shrink truncate">
          {props.path.substring(props.parentPath.length)}
        </span>
      </span>
      {props.isExpanded && (
        <TreeViewChildren
          path={props.path}
          indent={props.indent + 1}
          onExplore={props.onExplore}
          currentUrl={props.currentUrl}
          onCollapse={() => {
            props.onExpandChange(false);
            focusableRef.current?.focus();
          }}
        />
      )}
    </>
  );
};
