// import NextAuth, {type DefaultSession } from "next-auth";
import { JWT } from "next-auth/jwt";

export type NextAuthUser = {
  username: string;
} & DefaultSession["user"];

declare module "next-auth" {
  interface Session {
    user: NextAuthUser;
  }

  interface JWT {
    user: {
      username: string;
    };
  }

  interface User {
    username: string;
  }
}