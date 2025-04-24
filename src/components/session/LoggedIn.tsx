import { ReactNode } from "react";
import { useSessionInfo } from "../../hooks/sessionInfo";

export const LoggedIn = (props: { children: ReactNode }) => {
  const sessionInfo = useSessionInfo();

  if (!sessionInfo) {
    return null;
  }

  return <>{props.children}</>;
};
