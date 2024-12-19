import { AUTH_STATE_COOKIE, providers } from "@lib/auth";
import type { APIRoute } from "astro";

export const GET: APIRoute = async ({ params, url, cookies, redirect }) => {
  const providerName = params.provider as keyof typeof providers;

  if (providerName === "credentials") {
    return redirect("/sign-in");
  }

  if (!providerName || !(providerName in providers)) {
    return new Response("Invalid provider", { status: 400 });
  }

  const provider = providers[providerName];
  const { state, codeVerifier, redirectUrl } = provider.createAuthorizationURL(url);
  const fromUrl = url.searchParams.get("from");

  cookies.set(
    AUTH_STATE_COOKIE,
    JSON.stringify({
      state,
      codeVerifier,
      from: fromUrl,
    }),
    {
      secure: import.meta.env.PROD,
      httpOnly: true,
      maxAge: 60 * 10, // 10 minutes
      path: "/",
      sameSite: "lax",
    }
  );

  return redirect(redirectUrl.toString());
};
