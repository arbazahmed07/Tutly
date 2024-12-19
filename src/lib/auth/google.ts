import { Google, OAuth2Tokens, generateCodeVerifier, generateState } from "arctic";

import type { OAuthUser } from ".";
import { envOrThrow } from "../utils";

const googleClientId = envOrThrow("GOOGLE_CLIENT_ID");
const googleClientSecret = envOrThrow("GOOGLE_CLIENT_SECRET");

function google(url?: URL) {
  url ??= new URL("http://localhost:4321");
  const httpsUrl = new URL(url.toString());
  httpsUrl.protocol = "https:";

  const callbackUrl = import.meta.env.PROD && url.hostname !== "localhost" 
    ? new URL("/api/auth/callback/google", httpsUrl).toString()
    : new URL("/api/auth/callback/google", url).toString();

  return new Google(
    googleClientId,
    googleClientSecret,
    callbackUrl
  );
}

google.default = google();

export function createAuthorizationURL(url?: URL) {
  const state = generateState();
  const codeVerifier = generateCodeVerifier();
  const scopes = ["email", "profile"];
  const redirectUrl = google(url).createAuthorizationURL(state, codeVerifier, scopes);

  return {
    state,
    codeVerifier,
    redirectUrl,
  };
}

export function validateState(receivedState: string, storedState: string) {
  return receivedState === storedState;
}

export function validateAuthorizationCode(
  code: string, 
  codeVerifier: string,
  url?: URL
) {
  const g = url ? google(url) : google.default;
  return g.validateAuthorizationCode(code, codeVerifier);
}

export function refreshAccessToken(refreshToken: string) {
  return google.default.refreshAccessToken(refreshToken);
}

export function revokeAccessToken(accessToken: string) {
  return google.default.revokeToken(accessToken);
}

const googleUserEndpoint = "https://www.googleapis.com/oauth2/v1/userinfo";

type GoogleUser = {
  id: string;
  email: string;
  verified_email: boolean;
  name: string;
  given_name: string;
  family_name: string;
  picture: string;
  locale: string;
};

export async function fetchUser(tokens: OAuth2Tokens) {
  const res = await fetch(googleUserEndpoint, {
    headers: {
      Authorization: `Bearer ${tokens.accessToken()}`,
    },
  })
    .then((res) => res.json() as Promise<GoogleUser>)
    .catch((err) => {
      console.error("Error fetching Google user:", err);
      return null;
    });

  if (!res) return null;

  return {
    name: res.name,
    email: res.email,
    avatar_url: res.picture,
    providerAccountId: res.id
  } as OAuthUser;
}
