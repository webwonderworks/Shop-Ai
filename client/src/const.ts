export { COOKIE_NAME, ONE_YEAR_MS } from "@shared/const";

// Generate login URL at runtime so redirect URI reflects the current origin.
export const getLoginUrl = () => {
  const oauthPortalUrl = import.meta.env.VITE_OAUTH_PORTAL_URL || "https://oauth.manus.im";
  const appId = import.meta.env.VITE_APP_ID || "manus";
  const redirectUri = `${window.location.origin}/api/oauth/callback`;
  const state = btoa(redirectUri);

  // For local development, use window.location.origin as the OAuth portal
  const isLocalDev = window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1";
  const finalOauthUrl = isLocalDev ? window.location.origin : oauthPortalUrl;

  const url = new URL(`${finalOauthUrl}/app-auth`);
  url.searchParams.set("appId", appId);
  url.searchParams.set("redirectUri", redirectUri);
  url.searchParams.set("state", state);
  url.searchParams.set("type", "signIn");

  return url.toString();
};
