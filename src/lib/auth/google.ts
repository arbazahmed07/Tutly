import {
  generateCodeVerifier,
  generateState,
  Google,
  OAuth2Tokens,
} from "arctic";

import type { OAuthUser } from ".";

const googleClientId = import.meta.env.GOOGLE_CLIENT_ID;
const googleClientSecret = import.meta.env.GOOGLE_CLIENT_SECRET;

function google(url?: URL) {
  url ??= new URL("http://localhost:4321");
  if (import.meta.env.PROD && url.hostname !== "localhost") {
    url.protocol = "https:";
  }
  return new Google(
    googleClientId,
    googleClientSecret,
    new URL("/api/auth/callback/google", url).toString(),
  );
}

google.default = google();

export function createAuthorizationURL(url?: URL) {
  const state = generateState();
  const codeVerifier = generateCodeVerifier();
  const scopes = ["email", "profile"];
  const redirectUrl = google(url).createAuthorizationURL(
    state,
    codeVerifier,
    scopes,
  );

  return {
    state,
    codeVerifier,
    redirectUrl,
  };
}

export function validateAuthorizationCode(
  code: string,
  codeVerifier: string,
  url?: URL,
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
      console.error(err);
      return null;
    });

  if (!res) return null;

  return {
    name: res.name,
    email: res.email,
    avatar_url: res.picture,
  } as OAuthUser;
}
