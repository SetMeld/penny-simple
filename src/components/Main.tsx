import { ReactNode } from "react";

export const Main = (props: { children: ReactNode }) => {
  return <div className="px-5 pt-5">{props.children}</div>;
};
