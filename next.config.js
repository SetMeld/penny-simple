/* eslint-env node */
/** @type {import('next').NextConfig} */
module.exports = {
  output: "export",
  trailingSlash: true,
  reactStrictMode: true,
  productionBrowserSourceMaps: true,
  assetPrefix:
    process.env.NEXT_PUBLIC_MODE === "integrate" ? "/server-ui" : undefined,
  webpack: (config, options) => {
    config.module.rules.push({
      test: /\.ftl/,
      type: "asset/source",
    });

    return config;
  },
  // This should allow us to view both Container and non-Container Resources
  // in integrated mode.
  // See https://github.com/vercel/next.js/discussions/23988#discussioncomment-4213430
  // and https://gitlab.com/vincenttunru/penny/-/issues/17
  skipTrailingSlashRedirect: true,
};
