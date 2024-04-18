import { AuthOptions } from "next-auth";
import bcrypt from "bcrypt";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
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
    GoogleProvider({
      clientId: process.env.NEXTAUTH_GOOGLE_ID as string,
      clientSecret: process.env.NEXTAUTH_GOOGLE_SECRET as string,
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

        const user = await prisma.user.findUnique({
          where: { username: username },
        });

        let userWithCookie: any = null;

        if (!user) {
          const newUser = await prisma.user.create({
            data: {
              username: username,
              password: await bcrypt.hash(password, 10),
            },
          });
          userWithCookie = { ...newUser, cookie: data.cookie };
        } else {
          const updatedUser = await prisma.user.update({
            where: { username: username },
            data: {
              password: await bcrypt.hash(password, 10),
            },
          });
          userWithCookie = { ...updatedUser, eduprimeCookie: data.cookie };
        }

        return userWithCookie;

        // if (user && (await bcrypt.compare(password, user.password!))) {
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        return {
          ...token,
          username: user.username,
          eduprimeCookie: user.eduprimeCookie,
        };
      }
      return token;
    },
    async session({ session, token }) {
      if (session?.user) {
        return {
          ...session,
          user: {
            ...session.user,
            username: token.username,
            eduprimeCookie: token.eduprimeCookie,
          },
        };
      }
      return session;
    },
  },
};

export default authOptions;
