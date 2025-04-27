import {
  getDefaultSession,
  handleIncomingRedirect,
  onLogout,
  onSessionRestore,
} from "@inrupt/solid-client-authn-browser";
import { AppProps } from "next/app";
import { useRouter } from "next/router";
import React, { FC, useEffect, useState } from "react";
import Modal from "react-modal";
import { ToastContainer, cssTransition, Slide } from "react-toastify";
import { MdClose } from "react-icons/md";

import { SessionContext, SessionInfo } from "../contexts/session";
import "../../styles/globals.css";
import "react-toastify/dist/ReactToastify.css";
import * as storage from "../functions/localStorage";
import { LocalizationProvider } from "@fluent/react";
import { getL10n } from "../functions/getL10n";

const PRE_REDIRECT_URI = "PRE_REDIRECT_URI";

if (typeof document === "object") {
  const appElement = document.querySelector(
    "#appWrapper > *:first-child",
  ) as HTMLElement;
  Modal.setAppElement(appElement);
}

const ToastCloseButton = <MdClose className="flex-shrink" aria-label="Close" />;
const motionMediaQueryList = process.browser
  ? window.matchMedia("(prefers-reduced-motion)")
  : undefined;
const Transition = motionMediaQueryList?.matches
  ? cssTransition({
      enter: "none",
      exit: "none",
    })
  : Slide;

export const MyApp: FC<AppProps> = ({ Component, pageProps }) => {
  const [sessionInfo, setSessionInfo] = useState<
    SessionInfo | null | undefined
  >(null);
  const router = useRouter();

  useEffect(() => {
    setSessionInfo(undefined);
    handleIncomingRedirect({
      restorePreviousSession: false,
      useEssSession: false,
    }).then((info) => {
      if (info && info.isLoggedIn) {
        const lastAttemptedIdp = storage.getItem("last-attempted-idp");
        if (typeof lastAttemptedIdp === "string") {
          storage.setItem("last-successful-idp", lastAttemptedIdp);
        }
        setSessionInfo(info as SessionInfo);
        const redirectUrl = storage.getItem(PRE_REDIRECT_URI);
        if (typeof redirectUrl === "string") {
          storage.removeItem(PRE_REDIRECT_URI);
          router.replace(redirectUrl);
        }
      } else {
        setSessionInfo(null);
      }
    });
    const defaultSession = getDefaultSession();
    const logoutListener = () => setSessionInfo(null);
    const sessionRestoreListener = (currentUrl: string) => {
      router.replace(currentUrl);
    };
    onLogout(logoutListener);
    onSessionRestore(sessionRestoreListener);

    return () => {
      // Note: this is assuming SCAB doesn't change the event names. They are
      //       currently defined at
      //       https://github.com/inrupt/solid-client-authn-js/blob/22db704dfa433428a0d9966e7a5ba8cd733a871f/packages/core/src/constant.ts#L38-L42
      defaultSession.removeListener("logout", logoutListener);
      defaultSession.removeListener("sessionRestore", sessionRestoreListener);
    };
  }, [router]);

  return (
    <SessionContext.Provider value={sessionInfo}>
      <LocalizationProvider l10n={getL10n()}>
        <>
          <Component {...pageProps} />
          <ToastContainer
            bodyClassName={() => "font-white block p-3 flex-grow leading-5"}
            position="bottom-left"
            closeButton={false}
            autoClose={5000}
            transition={Transition}
            icon={false}
            theme="dark"
          />
        </>
      </LocalizationProvider>
    </SessionContext.Provider>
  );
};

export default MyApp;
