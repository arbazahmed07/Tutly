import { NextResponse } from "next/server";
import { signInWithCredentials, AUTH_COOKIE_NAME } from "@tutly/auth";

export const POST = async (request: Request) => {
  try {
    const formData = await request.formData();
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    if (!email || !password) {
      return NextResponse.json(
        { error: "Email/username and password are required" },
        { status: 400 },
      );
    }

    const userAgent = request.headers.get("user-agent");
    const { sessionId, isPasswordSet } = await signInWithCredentials(
      email,
      password,
      userAgent,
    );

    const redirectUrl = new URL(
      isPasswordSet ? "/dashboard" : "/change-password",
      request.url,
    );
    const response = NextResponse.redirect(redirectUrl);

    response.cookies.set({
      name: AUTH_COOKIE_NAME,
      value: sessionId,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      expires: new Date(Date.now() + 1000 * 60 * 60 * 24), // 1 day
    });

    return response;
  } catch (error: unknown) {
    console.error("[Credentials API] Sign in error:", error);
    const errorMessage =
      error instanceof Error ? error.message : "Authentication failed";

    const redirectUrl = new URL("/sign-in", request.url);
    redirectUrl.searchParams.set("error", encodeURIComponent(errorMessage));
    return NextResponse.redirect(redirectUrl);
  }
};
