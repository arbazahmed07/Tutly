import { Google, OAuth2Tokens, generateCodeVerifier, generateState } from "arctic";

import type { OAuthUser } from ".";
import { envOrThrow } from "../utils";

const googleClientId = envOrThrow("GOOGLE_CLIENT_ID");
const googleClientSecret = envOrThrow("GOOGLE_CLIENT_SECRET");

// Create a more robust state management
type StateStore = {
  state: string;
  codeVerifier: string;
  timestamp: number;
};

// Use Map to store multiple states with cleanup
const stateStore = new Map<string, StateStore>();

// Add cleanup function
const cleanupStaleStates = () => {
  const now = Date.now();
  for (const [state, data] of stateStore.entries()) {
    // Remove states older than 10 minutes
    if (now - data.timestamp > 10 * 60 * 1000) {
      stateStore.delete(state);
    }
  }
};

const google = (url?: URL) => {
  // If no URL is provided, try to use environment variable, fallback to localhost
  const baseUrl = import.meta.env.SITE ?? "http://localhost:4321";
  url ??= new URL(baseUrl);
  
  const callbackUrl = new URL("/api/auth/callback/google", url.origin);

  return new Google(googleClientId, googleClientSecret, callbackUrl.toString());
}

export function createAuthorizationURL(url?: URL) {
  cleanupStaleStates(); // Cleanup old states

  const state = generateState();
  const codeVerifier = generateCodeVerifier();
  const scopes = ["email", "profile", "openid"];

  const g = google(url);
  const redirectUrl = g.createAuthorizationURL(state, codeVerifier, scopes);

  // Store state with timestamp
  stateStore.set(state, {
    state,
    codeVerifier,
    timestamp: Date.now(),
  });

  return {
    state,
    codeVerifier,
    redirectUrl,
  };
}

export function getCodeVerifierByState(state: string): string | undefined {
  const stateData = stateStore.get(state);
  if (stateData) {
    stateStore.delete(state); // Use once and delete
    return stateData.codeVerifier;
  }
  return undefined;
}

export function getLastCodeVerifier() {
  return undefined; // Deprecate this in favor of getCodeVerifierByState
}

export function validateAuthorizationCode(code: string, codeVerifier: string, url?: URL) {
  const g = google(url);
  return g.validateAuthorizationCode(code, codeVerifier);
}

export function refreshAccessToken(refreshToken: string) {
  const g = google();
  return g.refreshAccessToken(refreshToken);
}

export function revokeAccessToken(accessToken: string) {
  const g = google();
  return g.revokeToken(accessToken);
}

type GoogleUser = {
  id: string;
  email: string;
  verified_email: boolean;
  name: string;
  picture: string;
};

export async function fetchUser(tokens: OAuth2Tokens): Promise<OAuthUser | null> {
  const res = await fetch("https://www.googleapis.com/oauth2/v1/userinfo", {
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
    providerAccountId: res.id,
  };
}
