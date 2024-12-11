import { AUTH_SESSION_COOKIE, AUTH_STATE_COOKIE, deleteSession } from "@lib/auth";
import type { APIRoute } from "astro";

export const GET: APIRoute = async ({ cookies, redirect }) => {
  const sessionId = cookies.get(AUTH_SESSION_COOKIE)?.value;
  if (!sessionId) return redirect("/sign-in", 302);

  await deleteSession(sessionId);

  cookies.delete(AUTH_SESSION_COOKIE, {
    httpOnly: true,
    path: "/",
    secure: import.meta.env.PROD,
  });

  cookies.delete(AUTH_STATE_COOKIE, {
    httpOnly: true,
    path: "/",
    secure: import.meta.env.PROD,
  });

  return redirect("/sign-in", 302);
};
