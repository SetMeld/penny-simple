import { useEffect, useState } from "react";
import { isIntegrated } from "../functions/integrate";

export const useIntegratedIssuer = (): undefined | string => {
  const [integratedIssuer, setIntegratedIssuer] = useState<string>();

  useEffect(() => {
    if (!isIntegrated()) {
      return;
    }

    const origin = document?.location.origin;
    if (!origin) {
      return;
    }

    const openIdConfigUrl = new URL(origin);
    openIdConfigUrl.pathname = ".well-known/openid-configuration";

    fetch(openIdConfigUrl).then(async (response) => {
      if (!response.ok) {
        return;
      }
      const json = await response.json();
      console.log({ json });
      if (typeof json.issuer !== "string" || json.issuer.length === 0) {
        return;
      }
      const issuerUrl = new URL(json.issuer);
      const allowedProtocols = ["https:"];
      if (
        !allowedProtocols.includes(issuerUrl.protocol) &&
        !(issuerUrl.protocol === "http:" && issuerUrl.hostname === "localhost")
      ) {
        return;
      }
      setIntegratedIssuer(issuerUrl.href);
    });
  });

  return integratedIssuer;
};
