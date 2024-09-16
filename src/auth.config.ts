import Google from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";
import prisma from "@/lib/db";
import { v4 as uuidv4 } from "uuid";
import { type NextAuthConfig } from "next-auth";
import bcryptjs from "bcryptjs";
import { type Role } from "@prisma/client";

declare module "next-auth" {
  interface Session {
    user: {
      username: string;
      role: Role;
    };
  }

  interface JWT {
    user: {
      username: string;
    };
  }

  interface User {
    username: string;
    role: Role;
  }
}

export default {
  providers: [
    Google({
      clientId: process.env.NEXTAUTH_GOOGLE_ID!,
      clientSecret: process.env.NEXTAUTH_GOOGLE_SECRET!,
      allowDangerousEmailAccountLinking: true,
    }),
    Credentials({
      id: "credentials",
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
        tokenId: { label: "Token", type: "uuid" },
      },
      async authorize(credentials) {
        if (!credentials?.tokenId) {
          if (!credentials?.username || !credentials?.password) {
            throw new Error("Username and password are required");
          }
        }

        const { username, password, tokenId } = credentials;

        if (tokenId && !username) {
          throw new Error("Username is required");
        }

        const user = await prisma.user.findUnique({
          where: {
            username: (username as string).toUpperCase(),
          },
        });

        if (!user) {
          throw new Error("No user found");
        }

        if (tokenId) {
          if (!user.oneTimePassword) {
            throw new Error("User has not set a one time password");
          }
          const valid = user.oneTimePassword == tokenId;

          if (!valid) {
            throw new Error("Invalid token");
          }

          await prisma.user.update({
            where: {
              id: user.id,
            },
            data: {
              oneTimePassword: uuidv4(),
            },
          });

          return user;
        } else {
          if (!user.password) {
            throw new Error("User has not set a password");
          }
          const valid = await bcryptjs.compare(
            password as string,
            user.password,
          );

          if (!valid) {
            throw new Error("Invalid username or password");
          }

          await prisma.events.create({
            data: {
              eventCategory: "USER_CREDENTIAL_LOGIN",
              causedById: user.id,
            },
          });

          if (user.email?.includes("tutly.in") || user.role === "INSTRUCTOR") {
            fetch("https://learn.tutly.in/api/send", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                email: user.email,
              }),
            }).catch((error) => {
              console.error("Error occurred during fetch:", error);
            });
          }
          return user;
        }
      },
    }),
  ],
  callbacks: {
    async signIn({ user, account }) {
      try {
        if (account?.provider === "google") {
          const existingUser = await prisma.user.findUnique({
            where: {
              username: user.email?.split("@")[0]?.toUpperCase(),
            },
            include: {
              account: true,
            },
          });

          if (existingUser) {
            if (existingUser.account.length === 0) {
              await prisma.account.create({
                data: {
                  type: "oauth",
                  provider: account.provider,
                  providerAccountId: account.providerAccountId,
                  access_token: account.access_token,
                  refresh_token: account.refresh_token,
                  expires_at: account.expires_at,
                  id_token: account.id_token,
                  scope: account.scope,
                  session_state: account.session_state as string,
                  token_type: account.token_type,
                  user: {
                    connect: {
                      id: existingUser.id,
                    },
                  },
                },
              });
              await prisma.user.update({
                where: {
                  id: existingUser.id,
                },
                data: {
                  email: user.email?.toLowerCase(),
                  // name: user.name,
                  image: user.image,
                  emailVerified: new Date(),
                },
              });
            }

            await prisma.events.create({
              data: {
                eventCategory: "USER_GOOGLE_LOGIN",
                causedById: existingUser.id,
              },
            });
            return true;
          } else {
            const username = user.email?.split("@")[0]?.toUpperCase();
            if (!username) {
              return false;
            }

            const newUser = await prisma.user.create({
              data: {
                username: username,
                email: user.email?.toLowerCase(),
                name: user.name,
                image: user.image,
                emailVerified: new Date(),
                oneTimePassword: uuidv4(),
              },
            });

            await prisma.events.create({
              data: {
                eventCategory: "NEW_USER_GOOGLE_LOGIN",
                causedById: newUser.id,
              },
            });

            return true;
          }
        }
      } catch (error) {
        console.error("Error occurred during sign-in:", error);
        return false;
      }
      return true;
    },
    async jwt({ token, user }) {
      if (user) {
        token.username = user.username;
        token.role = user.role;
      }
      return token;
    },
    async session({ session, token }) {
      if (session?.user) {
        session.user.username = token.username as string;
        session.user.role = token.role as Role;
      }
      return session;
    },
  },
} satisfies NextAuthConfig;