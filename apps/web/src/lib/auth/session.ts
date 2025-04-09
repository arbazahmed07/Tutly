import type { Course, Organization, Role, Session, User } from "@prisma/client";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import { db } from "@/server/db";
import { AUTH_COOKIE_NAME } from "@/lib/constants";

export type SessionUser = Omit<User, "password" | "oneTimePassword"> & {
  organization: Organization | null;
  role: Role;
  adminForCourses: Course[];
};

export type SessionWithUser = Session & {
  user: SessionUser;
};

export type SessionValidationResult = {
  session: SessionWithUser | null;
  user: SessionUser | null;
};

export async function validateSessionToken(
  token: string,
): Promise<SessionValidationResult> {
  try {
    const session = await db.session.findUnique({
      where: { id: token },
      include: {
        user: {
          include: {
            organization: true,
            profile: true,
            adminForCourses: true,
          },
        },
      },
    });

    if (!session?.user) {
      return { session: null, user: null };
    }

    await db.user.update({
      where: { id: session.user.id },
      data: { lastSeen: new Date() },
    });

    if (Date.now() >= session.expiresAt.getTime()) {
      await db.session.delete({ where: { id: token } });
      return { session: null, user: null };
    }

    return {
      session: session as SessionWithUser,
      user: session.user as SessionUser,
    };
  } catch (error) {
    console.error("[Session] Error validating session:", error);
    return { session: null, user: null };
  }
}

export async function getServerSession() {
  const cookieStore = await cookies();
  const sessionId = cookieStore.get(AUTH_COOKIE_NAME)?.value;

  if (!sessionId) {
    return null;
  }

  const { session, user } = await validateSessionToken(sessionId);
  return { session, user };
}

export async function getServerSessionOrRedirect(
  redirectTo = "/sign-in",
): Promise<{ session: SessionWithUser; user: SessionUser }> {
  const result = await getServerSession();

  if (!result?.user) {
    redirect(redirectTo);
  }

  return result as { session: SessionWithUser; user: SessionUser };
}
