import {
  AUTH_SESSION_COOKIE,
  AUTH_STATE_COOKIE,
  type AuthState,
  createSession,
  findOrCreateUser,
  linkAccounts,
  providers,
} from "@lib/auth";
import type { APIRoute } from "astro";

export const GET: APIRoute = async ({ params, url, cookies, request, redirect }) => {
  const providerName = params.provider as keyof typeof providers;
  if (!providerName || !(providerName in providers)) {
    return new Response("Invalid provider", { status: 400 });
  }
  const provider = providers[providerName];

  const code = url.searchParams.get("code");
  const state = url.searchParams.get("state");
  const storedState = cookies.get(AUTH_STATE_COOKIE)?.json() as AuthState;

  cookies.delete(AUTH_STATE_COOKIE, {
    path: "/api/auth",
  });

  if (!code || !state || state !== storedState?.state) {
    return new Response("Invalid request", { status: 400 });
  }

  try {
    // 1. Get OAuth tokens
    const tokens = await provider.validateAuthorizationCode(code, storedState.codeVerifier, url);

    // 2. Fetch user info from provider
    const oauthUser = await provider.fetchUser(tokens);
    if (!oauthUser) {
      throw new Error("Failed to fetch user info");
    }

    // Get provider-specific account ID
    let providerAccountId: string;
    if (providerName === "google") {
      const googleUser = await fetch("https://www.googleapis.com/oauth2/v1/userinfo", {
        headers: { Authorization: `Bearer ${tokens.accessToken()}` },
      }).then((res) => res.json());
      providerAccountId = googleUser.id;
    } else if (providerName === "github") {
      const githubUser = await fetch("https://api.github.com/user", {
        headers: { Authorization: `Bearer ${tokens.accessToken()}` },
      }).then((res) => res.json());
      providerAccountId = githubUser.id.toString();
    } else {
      providerAccountId = oauthUser.email; // Fallback to email for other providers
    }

    // 3. Find or create user and link account
    const user = await findOrCreateUser(providerName, oauthUser, providerAccountId);
    if (!user) {
      throw new Error("Failed to find or create user");
    }

    // 4. Link the OAuth account if not already linked
    await linkAccounts(user.id, providerName, tokens, providerAccountId);

    // 5. Create session
    const sessionId = await createSession(
      providerName,
      tokens,
      providerAccountId,
      oauthUser,
      request.headers.get("user-agent") || undefined
    );

    if (!sessionId) {
      throw new Error("Failed to create session");
    }

    // 6. Set session cookie
    cookies.set(AUTH_SESSION_COOKIE, sessionId, {
      httpOnly: true,
      secure: import.meta.env.PROD,
      path: "/",
      maxAge: 60 * 60 * 24, // 1 day
      sameSite: "lax",
    });

    // 7. Redirect to success page
    return redirect(storedState.from || "/dashboard");
  } catch (error) {
    console.error("OAuth callback error:", error);
    return redirect(
      "/sign-in?error=" +
        encodeURIComponent(error instanceof Error ? error.message : "Authentication failed")
    );
  }
};
