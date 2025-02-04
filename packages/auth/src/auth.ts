import type { BetterAuthOptions } from "better-auth";
import { expo } from "@better-auth/expo";
import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { oAuthProxy, organization, twoFactor } from "better-auth/plugins";

import { db } from "@tutly/db/client";
import { sendPasswordResetEmail, sendVerificationEmail } from "@tutly/emails";

import { env } from "../env";

export const config = {
  database: drizzleAdapter(db, {
    provider: "pg",
  }),
  secret: env.AUTH_SECRET,
  plugins: [oAuthProxy(), expo(), organization(), twoFactor()],
  emailVerification: {
    async sendVerificationEmail({ user, url }) {
      await sendVerificationEmail({
        email: user.email,
        username: user.name ?? user.email,
        url,
      });
    },
  },
  emailAndPassword: {
    enabled: true,
    async sendResetPassword({ user, url }) {
      await sendPasswordResetEmail({
        email: user.email,
        username: user.name ?? user.email,
        resetLink: url,
      });
    },
  },
  account: {
    accountLinking: {
      trustedProviders: ["google", "github"],
    },
  },
  socialProviders: {
    google: {
      clientId: env.AUTH_GOOGLE_ID,
      clientSecret: env.AUTH_GOOGLE_SECRET,
    },
  },
  trustedOrigins: ["exp://"],
} satisfies BetterAuthOptions;

export const auth = betterAuth(config);
export type Session = typeof auth.$Infer.Session;
