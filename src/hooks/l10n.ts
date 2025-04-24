// Imports of `useLocalization` are forbidden because the hook in this file
// should be used instead, but of course this hook can use it just fine:
// eslint-disable-next-line no-restricted-imports
import { ReactLocalization, useLocalization } from "@fluent/react";
import { createElement, Fragment, useEffect, useState } from "react";
import { useIsSSR } from "react-aria";

/**
 * Equivalent to ReactLocalization.getString, but returns a React Fragment.
 *
 * This is useful because it allows you to replace tags in localised strings
 * with HTML elements, without needing to reach out to <Localized>.
 *
 * (This method got booted out of @fluent/react proper because it's so simple,
 * but it's pretty useful:
 * https://github.com/projectfluent/fluent.js/pull/595#discussion_r967011632)
 */
type GetFragment = (
  id: Parameters<ReactLocalization["getString"]>[0],
  args?: Parameters<ReactLocalization["getElement"]>[2],
  fallback?: Parameters<ReactLocalization["getString"]>[2],
) => ReturnType<ReactLocalization["getElement"]>;

type ExtendedReactLocalization = ReactLocalization & {
  getFragment: GetFragment;
};

export const useL10n = (): ExtendedReactLocalization => {
  const isSsr = useIsSSR();
  const { l10n } = useLocalization();

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
  const ssrSafeGetElement: typeof l10n.getElement = (
    sourceElement,
    id,
    args,
  ) => {
    if (isSsr) {
      return sourceElement;
    }

    return l10n.getElement(sourceElement, id, args);
  };

  const getFragment: GetFragment = (id, args, fallback) =>
    ssrSafeGetElement(createElement(Fragment, null, fallback ?? id), id, args);

  const extendedL10n: ExtendedReactLocalization =
    l10n as ExtendedReactLocalization;
  extendedL10n.getFragment = getFragment;

  return extendedL10n;
};
