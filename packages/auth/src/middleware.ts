import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { createAuthClient } from "better-auth/client";

import { env } from "../env";

const PUBLIC_ROUTES = ["/api/auth"] as const;
const AUTH_ROUTES = ["/sign-in", "/sign-up", "/forget-password"] as const;

type AuthRoute = (typeof AUTH_ROUTES)[number];

const isPublicRoute = (path: string) => {
  return PUBLIC_ROUTES.some((route) => path.startsWith(route));
};

const isAuthRoute = (path: string): path is AuthRoute => {
  return AUTH_ROUTES.includes(path as AuthRoute);
};

const client = createAuthClient({
  baseURL: env.APPLICATION_BASE_URL,
});

export const authMiddleware = async (request: NextRequest) => {
  const { pathname } = request.nextUrl;

  try {
    // Allow access to public routes without authentication
    if (isPublicRoute(pathname)) {
      return NextResponse.next();
    }

    const { data: session } = await client.getSession({
      fetchOptions: {
        headers: {
          cookie: request.headers.get("cookie") ?? "",
        },
      },
    });

    // If user is authenticated and tries to access auth routes
    if (session && isAuthRoute(pathname)) {
      return NextResponse.redirect(
        new URL("/dashboard", request.nextUrl.origin),
      );
    }

    // Allow access to auth routes without authentication
    if (isAuthRoute(pathname)) {
      return NextResponse.next();
    }

    // If no session exists and trying to access protected routes
    if (!session) {
      const signInUrl = new URL(
        `/sign-in?callbackUrl=${encodeURIComponent(pathname)}`,
        request.nextUrl.origin,
      );
      return NextResponse.redirect(signInUrl);
    }

    // Allow access to protected routes for authenticated users
    return NextResponse.next();
  } catch (error) {
    console.error("Auth middleware error:", error);

    // On error, redirect to sign-in page
    const signInUrl = new URL("/sign-in", request.nextUrl.origin);
    return NextResponse.redirect(signInUrl);
  }
};
