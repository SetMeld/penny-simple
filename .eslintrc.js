module.exports = {
  extends: ["next/core-web-vitals", "prettier"],
  rules: {
    // We export to static HTML, which precludes the use of <Image>
    "@next/next/no-img-element": "off",
    "no-restricted-imports": [
      "error",
      {
        paths: [
          {
            name: "@fluent/react",
            importNames: ["useLocalization", "Localized"],
            message:
              "Please use the `useL10n` hook from `/src/hooks/l10n.ts` instead of `useLocalization` from @fluent/react.",
          },
        ],
      },
    ],
  },
};
