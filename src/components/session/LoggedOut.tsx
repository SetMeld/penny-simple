import { ReactNode } from "react";
import { useSessionInfo } from "../../hooks/sessionInfo";

export const LoggedOut = (props: { children: ReactNode }) => {
  const sessionInfo = useSessionInfo();

  if (sessionInfo === null) {
    return <>{props.children}</>;
  }

  return null;
};
