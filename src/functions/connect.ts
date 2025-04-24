import { login } from "@inrupt/solid-client-authn-browser";
import { removeItem, setItem } from "./localStorage";

export async function connect(issuer: string) {
  try {
    const clientId = getClientIdFor(issuer);
    if (clientId === null) {
      return await login({
        oidcIssuer: issuer,
        clientName: "Penny",
      });
    } else {
      setItem("redirect-url", document.location.href);
      return await login({
        oidcIssuer: issuer,
        clientId: clientId,
        redirectUrl: document.location.origin,
      });
    }
  } catch (e) {
    removeItem("redirect-url");
    throw e;
  }
}

export function getClientIdFor(issuer: string): string | null {
  if (
    typeof process.env.NEXT_PUBLIC_CLIENT_ID !== "string" ||
    process.env.NEXT_PUBLIC_CLIENT_ID.length === 0
  ) {
    return null;
  }
  // We don't have a stable long-term location for our ClientID yet,
  // so to limit our risk if e.g. our Client ID host goes down, only use the
  // client ID at a set of explicitly allowlisted IDPs:
  const idpsWithClientIdEnabled = [
    "https://login.inrupt.com",
    "https://idp.use.id",
  ];
  return idpsWithClientIdEnabled.includes(
    issuer.endsWith("/") ? issuer.substring(0, issuer.length - 1) : issuer,
  )
    ? process.env.NEXT_PUBLIC_CLIENT_ID
    : null;
}
