// *Other files* should use <ClientLocalized>, but this file can import from Fluent:
// eslint-disable-next-line no-restricted-imports
import { Localized, LocalizedProps } from "@fluent/react";
import { useIsSSR } from "react-aria";
import { FC } from "react";

/**
 * When prerendering, we do not know the user's preferred language yet.
 * By using this component, <Localized> is only rendered when running
 * on the client, whereas during prerendering the placeholder content is
 * shown.
 * This ensures that the DOM structure during hydration doesn't mismatch
 * the prerendered structure. Only after hydration is localisation applied.
 * (If we did server-side rendering, we could determine what locale to render
 * by inspecting HTTP headers, but alas, there's no server doing rendering.)
 */
export const ClientLocalized: FC<LocalizedProps> = (props) => {
  const isSsr = useIsSSR();

  if (isSsr) {
    return <>{props.children}</>;
  }

  return <Localized {...props} />;
};
