import { CachedDataset, useDataset } from "./dataset";
import { useSessionInfo } from "./sessionInfo";

export function useProfileDoc(): CachedDataset | null {
  const sessionInfo = useSessionInfo();
  const profileDoc = useDataset(sessionInfo?.webId ?? null);

  return profileDoc;
}
