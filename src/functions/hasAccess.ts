import { getEffectiveAccess } from "@inrupt/solid-client";

export function hasAccess(
  resource: Parameters<typeof getEffectiveAccess>[0],
  access: Array<keyof ReturnType<typeof getEffectiveAccess>["user"]>,
): boolean {
  const actualAccess = getEffectiveAccess(resource);
  const hasRequiredAccess = access.every(
    (requiredAccess) => actualAccess.user[requiredAccess] === true,
  );
  return hasRequiredAccess;
}
