import { AuthOptions } from "next-auth";
import bcrypt from "bcrypt";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import prisma from "@/lib/db";

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
    GoogleProvider({
      clientId: process.env.NEXTAUTH_GOOGLE_ID as string,
      clientSecret: process.env.NEXTAUTH_GOOGLE_SECRET as string,
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

        const user = await prisma.user.findUnique({
          where: {
            username: username.toUpperCase(),
          },
        });

        if (!user) {
          throw new Error("No user found");
        }

        if (!user.password) {
          throw new Error("User has not set a password");
        }

        const valid = await bcrypt.compare(password, user.password);

        if (!valid) {
          throw new Error("Invalid username or password");
        }

        return user as any;
      },
    }),
  ],
  callbacks: {
    async signIn({ user, account }) {
      try {
        if (account?.provider === "google") {
          const existingUser = await prisma.user.findUnique({
            where: {
              username: user.email?.split("@")[0].toUpperCase(),
            },
            include: {
              account: true,
            },
          });

          if (existingUser) {
            // If user exists, check if there's no associated account
            if (existingUser.account.length === 0) {
              await prisma.account.create({
                data: {
                  type: "oauth",
                  provider: account.provider,
                  providerAccountId: account.id as string, // Make sure providerAccountId is provided
                  user: {
                    connect: {
                      id: existingUser.id,
                    },
                  },
                },
              });
            }
            return true; // User exists and has an account
          } else {
            // Create a new user and link the account
            await prisma.user.create({
              data: {
                username: user.email?.split("@")[0].toUpperCase(),
                email: user.email,
                name: user.name,
                image: user.image,
                emailVerified: new Date(),
                account: {
                  create: {
                    type: "oauth",
                    provider: account.provider,
                    providerAccountId: account.id as string, // Make sure providerAccountId is provided
                  },
                },
              },
            });
            return true; // New user created and account linked
          }
        }
      } catch (error) {
        console.error("Error occurred during sign-in:", error);
        return false; // Sign-in failed
      }

      return false; // Default case: sign-in failed
    },
    async jwt({ token, user, account, profile }) {
      if (user) {
        token.username = user.username;
      }
      return token;
    },
    async session({ session, token }) {
      if (session?.user) {
        session.user.username = token.username;
      }
      return session;
    },
  },
};

export default authOptions;
