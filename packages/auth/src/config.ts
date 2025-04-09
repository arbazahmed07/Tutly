import type { Course, Organization, Role } from "@prisma/client";
import type {
  DefaultSession,
  NextAuthConfig,
  Session as NextAuthSession,
  User as NextAuthUser,
} from "next-auth";
import { skipCSRFCheck } from "@auth/core";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { compare } from "bcryptjs";
import Credentials from "next-auth/providers/credentials";

import { db } from "@tutly/db/client";

import { env } from "../env";
import generateRandomPassword from "./utils";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      role: Role;
      organization: Organization | null;
      adminForCourses: Course[];
      username: string;
    } & DefaultSession["user"];
  }
}

const adapter = PrismaAdapter(db);

export const isSecureContext = env.NODE_ENV !== "development";

type ExtendedUser = NextAuthUser & {
  role: Role;
  organization: Organization | null;
  adminForCourses: Course[];
  username: string;
};

export const authConfig = {
  adapter,
  // In development, we need to skip checks to allow Expo to work
  ...(!isSecureContext
    ? { skipCSRFCheck: skipCSRFCheck, trustHost: true }
    : {}),
  secret: env.AUTH_SECRET,
  providers: [
    Credentials({
      name: "credentials",
      credentials: {
        identifier: { label: "Email or Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials.identifier || !credentials.password) {
          return null;
        }

        const identifier = credentials.identifier as string;
        const password = credentials.password as string;

        const isEmail = identifier.includes("@");
        const query = isEmail
          ? { email: identifier.toLowerCase() }
          : { username: identifier.toUpperCase() };

        const user = await db.user.findFirst({
          where: query,
          select: {
            id: true,
            email: true,
            username: true,
            password: true,
            oneTimePassword: true,
            name: true,
            image: true,
            role: true,
            organization: true,
            adminForCourses: true,
          },
        });

        if (!user) {
          return null;
        }

        if (password === user.oneTimePassword) {
          const newOneTimePassword = generateRandomPassword(10);
          await db.user.update({
            where: { id: user.id },
            data: { oneTimePassword: newOneTimePassword },
          });

          return {
            id: user.id,
            email: user.email,
            name: user.name,
            image: user.image,
            role: user.role,
            organization: user.organization,
            adminForCourses: user.adminForCourses,
            username: user.username,
          };
        }

        if (!user.password) {
          return null;
        }

        const isPasswordValid = await compare(password, user.password);
        if (!isPasswordValid) {
          return null;
        }

        return {
          id: user.id,
          email: user.email,
          name: user.name,
          image: user.image,
          role: user.role,
          organization: user.organization,
          adminForCourses: user.adminForCourses,
          username: user.username,
        };
      },
    }),
  ],
  callbacks: {
    session: (opts) => {
      if (!("user" in opts))
        throw new Error("unreachable with session strategy");

      const extendedUser = opts.user as unknown as ExtendedUser;
      return {
        ...opts.session,
        user: {
          ...opts.session.user,
          id: extendedUser.id,
          role: extendedUser.role,
          organization: extendedUser.organization,
          adminForCourses: extendedUser.adminForCourses,
          username: extendedUser.username,
        },
      };
    },
  },
} satisfies NextAuthConfig;

export const validateToken = async (
  token: string,
): Promise<NextAuthSession | null> => {
  const sessionToken = token.slice("Bearer ".length);
  const session = await adapter.getSessionAndUser?.(sessionToken);
  if (!session) return null;

  const extendedUser = session.user as unknown as ExtendedUser;
  return {
    user: {
      ...session.user,
      role: extendedUser.role,
      organization: extendedUser.organization,
      adminForCourses: extendedUser.adminForCourses,
      username: extendedUser.username,
    },
    expires: session.session.expires.toISOString(),
  };
};

export const invalidateSessionToken = async (token: string) => {
  const sessionToken = token.slice("Bearer ".length);
  await adapter.deleteSession?.(sessionToken);
};
