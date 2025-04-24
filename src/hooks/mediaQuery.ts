import { useEffect, useState } from "react";

function useMediaQueryImp(mediaQuery: string): boolean {
  const [hasHydrated, setHasHydrated] = useState(false);

  useEffect(() => setHasHydrated(true), []);

  const [mediaQueryList, setMediaQueryList] = useState(
    window.matchMedia(mediaQuery),
  );
  useEffect(() => {
    setMediaQueryList(window.matchMedia(mediaQuery));
  }, [mediaQuery]);

  const [matches, setMatches] = useState(mediaQueryList.matches);
  useEffect(() => {
    const changeListener: Parameters<MediaQueryList["addEventListener"]>[1] = (
      _changedList,
    ) => {
      setMatches(mediaQueryList.matches);
    };
    mediaQueryList.addEventListener("change", changeListener);
    return () => {
      mediaQueryList.removeEventListener("change", changeListener);
    };
  }, [mediaQueryList]);

  return hasHydrated && matches;
}

export const useMediaQuery =
  typeof window === "undefined" || typeof window.matchMedia !== "function"
    ? () => false
    : useMediaQueryImp;
