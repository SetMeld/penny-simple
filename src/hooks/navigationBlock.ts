import { useBeforeUnload } from "./beforeUnload";
import { useL10n } from "./l10n";

export function useNavigationBlock(messageOrToggle: string | boolean) {
  const l10n = useL10n();

  const beforeUnloadHandler: EventListener | undefined =
    messageOrToggle !== false
      ? (event) => {
          event.preventDefault();
          if (typeof messageOrToggle === "string") {
            return l10n.getString(messageOrToggle);
          }
        }
      : undefined;

  return useBeforeUnload(beforeUnloadHandler);
}
