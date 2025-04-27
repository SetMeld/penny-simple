import { login } from "@inrupt/solid-client-authn-browser";
import { removeItem, setItem } from "./localStorage";

const PRE_REDIRECT_URI = "PRE_REDIRECT_URI";

export async function connect(issuer: string) {
  try {
    const clientId = getClientIdFor(issuer);
    return await login({
      oidcIssuer: issuer,
      clientName: "Solid App",
    });
  } catch (e) {
    removeItem(PRE_REDIRECT_URI);
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
