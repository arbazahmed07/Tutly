import { AUTH_SESSION_COOKIE, getSession } from "@lib/auth";
import { type Profile, type User } from "@prisma/client";
import { defineMiddleware } from "astro:middleware";

export const auth = defineMiddleware(
  async ({ cookies, locals, url }, next) => {
    const sessionId = cookies.get(AUTH_SESSION_COOKIE)?.value;
    let user: User | undefined;
    if (sessionId) {
      const session = await getSession(sessionId);
      if (session) {
        user = session.user;
        // @ts-ignore
        locals.session = session;
        locals.user = session.user as User & { profile: Profile };
      } else {
        cookies.delete(AUTH_SESSION_COOKIE, {
          httpOnly: true,
          secure: import.meta.env.PROD,
          path: "/",
        });
      }
    }

    if (url.pathname.startsWith("/_action")) return next();
    if (url.pathname.startsWith("/auth")) return next();

    if (url.pathname.startsWith("/instructor") && user?.role !== "INSTRUCTOR") {
      return new Response("Not Found", { status: 404 });
    }

    const res = await next();
    locals.user = null;
    return res;
  },
);
