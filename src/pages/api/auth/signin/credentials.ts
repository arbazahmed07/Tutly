import type { APIRoute } from "astro";

import { signInWithCredentials } from "@/lib/auth/credentials";

export const POST: APIRoute = async ({ request }) => {
  try {
    const { email, password } = await request.json();
    if (!email || !password) {
      return new Response(
        JSON.stringify({
          success: false,
          message: "Email/username and password are required",
        }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    const userAgent = request.headers.get("user-agent");
    const { sessionId } = await signInWithCredentials(email, password, userAgent);

    const expiresAt = new Date(Date.now() + 1000 * 60 * 60 * 24); // 1 day

    return Response.json(
      {
        success: true,
        message: "Logged In Successfully",
        redirectTo: "/dashboard",
      },
      {
        status: 200,
        headers: {
          "Set-Cookie": `app_auth_token=${sessionId}; Path=/; HttpOnly; SameSite=Lax; Expires=${expiresAt.toUTCString()}; Secure=${
            import.meta.env.PROD
          }`,
        },
      }
    );
  } catch (error: any) {
    console.error("[Credentials API] Sign in error:", error);
    return new Response(
      JSON.stringify({
        success: false,
        message: error.message || "Authentication failed",
      }),
      {
        status: 401,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
};
