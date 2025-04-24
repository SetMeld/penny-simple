import { ReactNode } from "react";
import { isIntegrated } from "../../functions/integrate";

export const NotIntegrated = (props: { children: ReactNode }) => {
  if (isIntegrated()) {
    return null;
  }
  return <>{props.children}</>;
};
