import { FC, useState } from "react";
import Modal from "react-modal";
import { LoggedIn } from "./LoggedIn";
import { LoggedOut } from "./LoggedOut";
import { ConnectForm } from "./ConnectForm";
import { MdClose } from "react-icons/md";
import Link from "next/link";
import * as storage from "../../functions/localStorage";
import { useSessionInfo } from "../../hooks/sessionInfo";
import { logout } from "@inrupt/solid-client-authn-browser";
import {
  getAssetLink,
  getExplorePath,
  isIntegrated,
} from "../../functions/integrate";
import { useL10n } from "../../hooks/l10n";

export const UserMenu: FC = () => {
  const [promptOpen, setPromptOpen] = useState(false);
  const sessionInfo = useSessionInfo();
  const l10n = useL10n();

  if (promptOpen) {
    return (
      <Modal
        isOpen={promptOpen}
        onRequestClose={() => setPromptOpen(false)}
        contentLabel={l10n.getString("connectmodal-label")}
        overlayClassName={{
          base: "transition-opacity duration-150 motion-safe:opacity-0 bg-opacity-90 bg-gray-900 p-5 md:py-20 md:px-40 lg:px-60 xl:px-96 fixed top-0 left-0 right-0 bottom-0 overscroll-contain",
          afterOpen: "motion-safe:opacity-100",
          beforeClose: "",
        }}
        className={{
          base: "mx-auto rounded bg-white p-5 shadow-lg transition-opacity duration-150 motion-safe:opacity-0 md:p-10",
          afterOpen: "motion-safe:opacity-100",
          beforeClose: "",
        }}
        closeTimeoutMS={150}
      >
        <div className="-mr-4 -mt-4 flex flex-row-reverse md:-mr-8 md:-mt-8">
          <button onClick={() => setPromptOpen(false)}>
            <MdClose aria-label={l10n.getString("connectmodal-close-label")} />
          </button>
        </div>
        <ConnectForm />
      </Modal>
    );
  }

  const profileLink =
    sessionInfo &&
    (!isIntegrated() ||
      new URL(sessionInfo.webId).origin === document.location.origin) ? (
      <Link
        href={getExplorePath(
          sessionInfo.webId,
          encodeURIComponent(sessionInfo.webId),
        )}
        className="items-center whitespace-nowrap border-b-2 border-gray-200 p-2 hover:rounded hover:border-gray-700 hover:bg-gray-700 hover:text-white focus:border-gray-700 focus:outline-none sm:hidden lg:flex"
      >
        {l10n.getString("profile-button")}
      </Link>
    ) : null;

  return (
    <>
      <LoggedOut>
        <button
          className="flex items-center whitespace-nowrap rounded-lg border-2 border-gray-200 px-1 py-1 hover:border-gray-700 hover:bg-gray-700 hover:text-white focus:border-gray-700 focus:outline-none md:px-2"
          onClick={(e) => {
            e.preventDefault();
            setPromptOpen(true);
          }}
          title={l10n.getString("connect-button-tooltip")}
        >
          <span className="w-8">
            <img
              width={352 / 10}
              height={322 / 10}
              alt=""
              src={getAssetLink("/solid-emblem.svg")}
            />
          </span>
          <span aria-hidden="true" className="px-2 sm:hidden md:inline">
            {l10n.getString("connect-button")}
          </span>
        </button>
      </LoggedOut>
      <LoggedIn>
        <div className="flex space-x-5">
          {profileLink}
          <button
            className="flex items-center whitespace-nowrap rounded-lg border-2 border-gray-200 px-1 py-1 hover:border-gray-700 hover:bg-gray-700 hover:text-white focus:border-gray-700 focus:outline-none md:px-2"
            onClick={(e) => {
              e.preventDefault();
              storage.setItem("autoconnect", "false");
              logout();
            }}
            title={l10n.getString("disconnect-button-tooltip", {
              webId: sessionInfo?.webId ?? "",
            })}
          >
            <span className="w-8">
              <img
                width={352 / 10}
                height={322 / 10}
                alt=""
                src={getAssetLink("/solid-emblem.svg")}
                aria-hidden="true"
              />
            </span>
            <span className="px-2">{l10n.getString("disconnect-button")}</span>
          </button>
        </div>
      </LoggedIn>
    </>
  );
};
