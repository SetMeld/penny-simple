import { ReactNode } from "react";
import { isIntegrated } from "../../functions/integrate";

export const Integrated = (props: { children: ReactNode }) => {
  if (isIntegrated()) {
    return <>{props.children}</>;
  }
  return null;
};
