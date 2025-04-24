// These functions are useful for putting Penny in "integrate" mode,
// i.e. preinstalled on a Pod as its native interface.

export function isIntegrated(): boolean {
  return process.env.NEXT_PUBLIC_MODE === "integrate";
}

export function getExplorePath(url: string, hash?: string): string {
  const hashFragment = hash ? `#${hash}` : "";
  const targetUrl = new URL(url);

  // If running on the Pod, the target URL is on the app's own domain:
  if (isIntegrated()) {
    const relativeUrl = targetUrl.pathname + targetUrl.search + hashFragment;
    const allowedProtocols = ["https:"];
    if (
      !allowedProtocols.includes(targetUrl.protocol) &&
      !(targetUrl.protocol === "http:" && targetUrl.hostname === "localhost")
    ) {
      return encodeURIComponent(relativeUrl);
    }
    return relativeUrl;
  }

  // Otherwise, we have to pass the full target URL via a parameter:
  return `/explore/?url=${encodeURIComponent(url)}` + hashFragment;
}

export function getAssetLink(assetPath: string): string {
  return isIntegrated() ? `/server-ui${assetPath}` : assetPath;
}
