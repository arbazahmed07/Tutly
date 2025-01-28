import type { APIContext } from "astro";

import db from "@/lib/db";

const checkUserExists = async ({ email, providerId }: { email: string; providerId: string }) => {
  const userExists = await db.user.findFirst({
    where: {
      email,
    },
    select: {
      id: true,
      email: true,
      account: {
        where: {
          provider: "google",
          providerAccountId: providerId,
        },
      },
    },
  });

  const accountExists = await db.account.findFirst({
    where: {
      provider: "google",
      providerAccountId: providerId,
    },
    include: {
      user: {
        select: {
          id: true,
          email: true,
        },
      },
    },
  });

  return { userExists, accountExists };
};

export async function GET({ request, clientAddress, cookies }: APIContext) {
  const code = new URL(request.url).searchParams?.get("code");
  const state = new URL(request.url).searchParams?.get("state");
  const storedState = cookies.get("google_oauth_state")?.value;
  const codeVerifier = cookies.get("google_code_challenge")?.value;

  if (storedState !== state || !codeVerifier || !code) {
    cookies.delete("google_oauth_state");
    cookies.delete("google_code_challenge");
    return new Response(null, {
      status: 302,
      headers: {
        Location: "/login?error=Server+Error",
      },
    });
  }

  try {
    const tokenUrl = "https://www.googleapis.com/oauth2/v4/token";
    const formData = new URLSearchParams();

    formData.append("grant_type", "authorization_code");
    formData.append("client_id", import.meta.env.GOOGLE_CLIENT_ID);
    formData.append("client_secret", import.meta.env.GOOGLE_CLIENT_SECRET);
    formData.append(
      "redirect_uri",
      `${import.meta.env.SITE ?? "http://localhost:4321"}/api/auth/callback/google`
    );
    formData.append("code", code);
    formData.append("code_verifier", codeVerifier);

    const fetchToken = await fetch(tokenUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: formData,
    });

    const fetchTokenRes = await fetchToken.json();

    const fetchUser = await fetch("https://www.googleapis.com/oauth2/v2/userinfo", {
      headers: { Authorization: `Bearer ${fetchTokenRes.access_token}` },
    });
    const fetchUserRes = await fetchUser.json();

    const { userExists, accountExists } = await checkUserExists({
      email: fetchUserRes.email,
      providerId: fetchUserRes.id,
    });

    if (!userExists) {
      return new Response(null, {
        status: 302,
        headers: {
          Location: "/sign-in?error=User+Not+Found",
        },
      });
    } else if (userExists && !accountExists) {
      await db.account.create({
        data: {
          provider: "google",
          type: "oauth",
          providerAccountId: fetchUserRes.id,
          userId: userExists.id,
          access_token: fetchTokenRes.access_token,
          refresh_token: fetchTokenRes.refresh_token ?? null,
          expires_at: Math.floor(Date.now() / 1000 + fetchTokenRes.expires_in),
          token_type: "Bearer",
        },
      });
    }

    cookies.delete("google_oauth_state", { path: "/" });
    cookies.delete("google_code_challenge", { path: "/" });

    const session = await db.session.create({
      data: {
        userId: userExists.id,
        expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30), // 30 days
        ipAddress: clientAddress,
        userAgent: request.headers.get("user-agent"),
      },
    });

    cookies.set("app_auth_token", session.id, {
      path: "/",
      httpOnly: true,
      expires: session.expiresAt,
      secure: import.meta.env.PROD,
      sameSite: "lax",
    });

    return new Response(null, {
      status: 302,
      headers: {
        Location: "/",
      },
    });
  } catch (error) {
    cookies.delete("google_oauth_state", { path: "/" });
    cookies.delete("google_code_challenge", { path: "/" });
    return new Response(null, {
      status: 302,
      headers: {
        Location: "/login?error=Server+Error",
      },
    });
  }
}
