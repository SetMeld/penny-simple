import { FetchError } from "@inrupt/solid-client";
import { FC } from "react";
import { useL10n } from "../../hooks/l10n";
import { ConnectForm } from "../session/ConnectForm";
import { LoggedOut } from "../session/LoggedOut";

interface Props {
  error?: Error;
}

export const FetchErrorViewer: FC<Props> = (props) => {
  const l10n = useL10n();

  if (!props.error) {
    return null;
  }

  if (!(props.error instanceof FetchError)) {
    return <>An unknown error occurred.</>;
  }

  if (props.error.statusCode === 401 || props.error.statusCode === 403) {
    return (
      <>
        <div className="rounded border-2 border-red-600 bg-red-100 p-5">
          {l10n.getString("fetcherror-no-permission")}
        </div>
        <LoggedOut>
          <div className="pt-10">
            <div className="p-5 shadow">
              <ConnectForm />
            </div>
          </div>
        </LoggedOut>
      </>
    );
  }

  if (props.error.statusCode === 404) {
    return (
      <>
        <div className="rounded border-2 border-red-600 bg-red-100 p-5">
          {l10n.getString("fetcherror-does-not-exist")}
        </div>
      </>
    );
  }

  return (
    <>
      {l10n.getString("fetcherror-unknown", {
        statusCode: props.error.statusCode,
      })}
    </>
  );
};
