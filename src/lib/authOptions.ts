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
      authorization: {
        params: { scope: "public_repo" },
      },
      allowDangerousEmailAccountLinking: true,
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
          include: {
            account: {
              select: {
                provider: true,
                providerAccountId: true,
                access_token: true,
                refresh_token: true,
                expires_at: true,
              },
            },
          },
        });

        return { ...user, eduprimeCookie: data.cookie } as any;
      },
    }),
  ],
  callbacks: {
    async signIn({ user, account }) {
      try {
        if (account?.provider === "github") {
          const existingUser = await prisma.account.findFirst({
            where: {
              providerAccountId: account.providerAccountId,
            },
          });
          if (existingUser) {
            await prisma.account.update({
              where: {
                id: existingUser.id,
              },
              data: {
                access_token: account.access_token,
                refresh_token: account.refresh_token,
                expires_at: account.expires_at,
              },
            });
            return true;
          }
          await prisma.account.create({
            data: {
              type: "account",
              userId: user.id,
              provider: account.provider,
              providerAccountId: account.providerAccountId,
              access_token: account.access_token,
              refresh_token: account.refresh_token,
              expires_at: account.expires_at,
            },
          });
        }
      } catch (e) {
        console.log(e);
      }

      return true;
    },

    async jwt({ token, user, account, profile }) {
      if (user) {
        token.username = user.username;
        token.eduprimeCookie = user.eduprimeCookie;
      }
      if (account) {
        token.provider = account.provider;
        token.providerAccountId = account.providerAccountId;
        token.githubTokenType = account.token_type;
        token.githubToken = account.access_token;
        token.githubTokenScope = account.scope;
      }
      if (profile) {
        // @ts-ignore
        token.githubUsername = profile.login;
        token.githubEmail = profile.email;
      }
      return token;
    },
    async session({ session, token }) {
      if (session?.user) {
        session.user.username = token.username;
        session.user.eduprimeCookie = token.eduprimeCookie;
        session.user.provider = token.provider;
        session.user.providerAccountId = token.providerAccountId;
        session.user.githubUsername = token.githubUsername;
        session.user.githubToken = token.githubToken;
        session.user.githubTokenType = token.githubTokenType;
        session.user.githubTokenScope = token.githubTokenScope;
      }
      return session;
    },
  },
};

export default authOptions;
