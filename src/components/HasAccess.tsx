import { getEffectiveAccess } from "@inrupt/solid-client";
import { ReactNode } from "react";
import { hasAccess } from "../functions/hasAccess";

interface Props {
  access: Array<keyof ReturnType<typeof getEffectiveAccess>["user"]>;
  resource: Parameters<typeof getEffectiveAccess>[0];
  children: ReactNode;
  fallback?: ReactNode;
}

export const HasAccess = (props: Props) => {
  const hasRequiredAccess = hasAccess(props.resource, props.access);

  if (!hasRequiredAccess) {
    return props.fallback ?? null;
  }

  return <>{props.children}</>;
};
