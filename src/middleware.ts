import { defineMiddleware } from "astro:middleware";
import { AUTH_SESSION_COOKIE } from "@/lib/auth";
import db from "@/lib/db";

export const onRequest = defineMiddleware(async ({ request, cookies, redirect, locals }, next) => {
  const url = new URL(request.url);
  const pathname = url.pathname;

  // Public routes that don't require authentication
  const publicRoutes = ["/sign-in", "/sign-up", "/auth/callback/google", "/auth/callback/github"];
  
  // Skip auth check for API routes and auth actions
  if (pathname.startsWith("/api/") || pathname.startsWith("/_actions/auth_")) {
    return next();
  }

  const sessionId = cookies.get(AUTH_SESSION_COOKIE)?.value;
  let session = null;

  if (sessionId) {
    session = await db.session.findFirst({
      where: { 
        id: sessionId,
        expiresAt: {
          gt: new Date()
        }
      },
      include: { 
        user: {
          include: {
            profile: true,
            account: true,
            adminForCourses: true,
          }
        } 
      },
    });

    if (!session) {
      // Delete expired/invalid session
      cookies.delete(AUTH_SESSION_COOKIE, { 
        path: "/",
        secure: import.meta.env.PROD,
        httpOnly: true
      });
    }
  }

  // Set session in locals if exists
  if (session?.user) {
    // @ts-ignore
    locals.session = session;
    // @ts-ignore
    locals.user = session.user;

    // Redirect away from auth pages if already logged in
    if (publicRoutes.includes(pathname)) {
      return redirect("/dashboard");
    }
  } else if (!publicRoutes.includes(pathname)) {
    // Redirect to login if accessing protected route without session
    return redirect("/sign-in");
  }

  return next();
});
