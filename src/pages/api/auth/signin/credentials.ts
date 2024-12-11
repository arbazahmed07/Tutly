import type { APIRoute } from "astro";

import { AUTH_SESSION_COOKIE } from "@/lib/auth";
import { signInWithCredentials } from "@/lib/auth/credentials";

export const POST: APIRoute = async ({ request, cookies }) => {
  try {
    const { email, password } = await request.json();
    const userAgent = request.headers.get("user-agent");

    const { sessionId, user } = await signInWithCredentials(email, password, userAgent);

    cookies.set(AUTH_SESSION_COOKIE, sessionId, {
      httpOnly: true,
      path: "/",
      maxAge: 60 * 60 * 24, // 1 day
      sameSite: "lax",
      secure: import.meta.env.PROD,
    });

    return new Response(JSON.stringify({ success: true, user }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error: any) {
    return new Response(
      JSON.stringify({
        success: false,
        message: error.message || "Authentication failed",
      }),
      {
        status: 401,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }
};
