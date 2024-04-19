import { AuthOptions } from "next-auth";
import bcrypt from "bcrypt";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import GithubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import prisma from "@/lib/db";
import eduprimeLogin from "@/actions/eduprimeLogin";

const authOptions: AuthOptions = {
  adapter: PrismaAdapter(prisma),
  pages: {
    signIn: "/signin",
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET as string,
  providers: [
    GithubProvider({
      clientId: process.env.NEXTAUTH_GITHUB_ID as string,
      clientSecret: process.env.NEXTAUTH_GITHUB_SECRET as string,
      // profile(profile) {
      //   return {
      //     id: profile.id,
      //     name: profile.name,
      //     email: profile.email,
      //     image: profile.avatar_url,
      //     username: profile.login,
      //   };
      // },
    }),
    CredentialsProvider({
      id: "credentials",
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.username || !credentials?.password) {
          throw new Error("Username and password are required");
        }

        const { username, password } = credentials;

        const data: {
          Status: boolean;
          Data: string;
          cookie: string;
        } = await eduprimeLogin(username, password);

        if (!data.Status) {
          throw new Error(data.Data);
        }

        const user = await prisma.user.upsert({
          where: { username },
          update: {
            password: bcrypt.hashSync(password, 10),
          },
          create: {
            username,
            password: bcrypt.hashSync(password, 10),
          },
        });

        return { ...user, eduprimeCookie: data.cookie } as any;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.username = user.username;
        token.eduprimeCookie = user.eduprimeCookie;
      }
      return token;
    },
    async session({ session, token }) {
      if (session?.user) {
        session.user.username = token.username;
        session.user.eduprimeCookie = token.eduprimeCookie;
      }
      return session;
    },
  },
};

export default authOptions;
