import { ReactNode, type JSX } from "react";

interface Props {
  children: ReactNode;
  type?: JSX.Element;
  options?: Array<{
    element: JSX.Element;
    callback: () => void;
    when?: boolean;
  }>;
}

export const ObjectViewer = (props: Props) => {
  const type = props.type ? (
    <div className="flex flex-shrink flex-col justify-center">
      <div className="mr-1 w-10 p-2 text-gray-500">{props.type}</div>
    </div>
  ) : null;

  const options = props.options ? (
    <ul className="flex flex-shrink">
      {props.options
        .filter((option) => typeof option.when === "undefined" || option.when)
        .map((option, i) => (
          <li key={`objectOption${i}`}>
            <button
              onClick={(e) => {
                e.preventDefault();
                option.callback();
              }}
              className="ml-1 block rounded-lg border-2 border-gray-50 p-3 hover:bg-gray-700 hover:text-white focus:border-gray-700 focus:outline-none"
            >
              {option.element}
            </button>
          </li>
        ))}
    </ul>
  ) : null;

  return (
    <div className="flex p-2">
      {type}
      <div className="w-0 flex-grow overflow-x-auto rounded-lg bg-white p-2">
        {props.children}
      </div>
      {options}
    </div>
  );
};
