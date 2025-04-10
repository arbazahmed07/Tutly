import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { AUTH_COOKIE_NAME } from "@tutly/auth";
import { db } from "@tutly/db";

export const GET = async (request: Request) => {
  const cookieStore = await cookies();
  const sessionId = cookieStore.get(AUTH_COOKIE_NAME)?.value;

  if (sessionId) {
    await db.session.delete({
      where: {
        id: sessionId,
      },
    });
  }

  const response = NextResponse.redirect(new URL("/sign-in", request.url));
  response.cookies.delete(AUTH_COOKIE_NAME);
  return response;
};
