import { FC } from "react";
import { VscLoading } from "react-icons/vsc";
import { useMediaQuery } from "../../hooks/mediaQuery";

export const Spinner: FC = () => {
  const isMotionSafe = useMediaQuery("(prefers-reduced-motion: no-preference)");

  if (!isMotionSafe) {
    return <>Loading…</>;
  }

  return (
    <>
      <VscLoading aria-label="Loading…" size="2em" className="animate-spin" />
    </>
  );
};
