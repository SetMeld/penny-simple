import { ReactNode } from "react";
import { useSessionInfo } from "../../hooks/sessionInfo";
import { ConnectForm } from "./ConnectForm";

export const SessionGate = (props: { children: ReactNode }) => {
  const sessionInfo = useSessionInfo();

  if (sessionInfo) {
    return <>{props.children}</>;
  }

  return (
    <>
      <div className="py-5">
        <ConnectForm />
      </div>
    </>
  );
};
