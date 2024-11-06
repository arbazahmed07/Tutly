import { generateState, GitHub, OAuth2Tokens } from "arctic";

const ghClientId = import.meta.env.GITHUB_CLIENT_ID;
const ghClientSecret = import.meta.env.GITHUB_CLIENT_SECRET;

function github(url?: URL) {
  return new GitHub(
    ghClientId,
    ghClientSecret,
    url ? new URL("/auth/callback/github", url).toString() : null,
  );
}

github.default = github();

export function createAuthorizationURL(url?: URL) {
  const state = generateState();
  const scopes = ["user:email", "read:user"];
  const redirectUrl = github(url).createAuthorizationURL(state, scopes);

  return {
    state,
    redirectUrl,
  };
}

export function validateAuthorizationCode(code: string) {
  return github.default.validateAuthorizationCode(code);
}

export function refreshAccessToken(refreshToken: string) {
  return github.default.refreshAccessToken(refreshToken);
}

export function revokeAccessToken(_: string) {}

const githubUserEndpoint = "https://api.github.com/user";
export type GitHubUser = {
  login: string;
  name: string;
  email: string;
  avatar_url: string;
  twitter_username: string;
};

export async function fetchUser(tokens: OAuth2Tokens) {
  const res = await fetch(githubUserEndpoint, {
    headers: {
      Authorization: `token ${tokens.accessToken()}`,
    },
  })
    .then((res) => res.json())
    .catch((err) => {
      console.error(err);
      return null;
    });

  if (!res) return null;
  console.log(res);

  return res as GitHubUser;
}
