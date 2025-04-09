import NextAuth from "next-auth";

import { authConfig } from "./config";
import generateRandomPassword from "./utils";

export type { Session } from "next-auth";

const { handlers, auth, signIn, signOut } = NextAuth(authConfig);

export { handlers, auth, signIn, signOut };

export {
  invalidateSessionToken,
  validateToken,
  isSecureContext,
} from "./config";

export { generateRandomPassword };
