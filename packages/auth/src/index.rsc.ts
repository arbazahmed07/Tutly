import { cache } from "react";

import { getServerSession, getServerSessionOrRedirect } from "./config";
import { generateRandomPassword } from "./utils";

export type {
  SessionUser,
  SessionWithUser,
  SessionValidationResult,
} from "./config";

export { AUTH_COOKIE_NAME, isSecureContext } from "./config";

// Server-only exports
export {
  validateSessionToken,
  validateCredentials,
  signInWithCredentials,
} from "./config";

export { generateRandomPassword };

export const getCachedServerSession = cache(getServerSession);
export const getCachedServerSessionOrRedirect = cache(
  getServerSessionOrRedirect,
);

export { getServerSession, getServerSessionOrRedirect };
