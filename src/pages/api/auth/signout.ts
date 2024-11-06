import { AUTH_SESSION_COOKIE, AUTH_STATE_COOKIE } from "@lib/auth";
import db from "@/lib/db";
import type { APIRoute } from "astro";

export const GET: APIRoute = async ({ locals, cookies, redirect }) => {
  if (!locals.session) return redirect("/", 302);

  const sessionId = locals.session.id;

  // Delete the session from database
  await db.session.delete({
    where: {
      id: sessionId,
    },
  });

  // Delete both cookies to ensure complete sign-out
  cookies.delete(AUTH_SESSION_COOKIE, {
    httpOnly: true,
    path: "/",
    secure: import.meta.env.PROD,
  });

  // Delete the old cookie name if it exists
  cookies.delete(AUTH_STATE_COOKIE, {
    httpOnly: true,
    path: "/",
    secure: import.meta.env.PROD,
  });

  return redirect("/sign-in", 302);
};
