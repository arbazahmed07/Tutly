import "server-only";

import { createHydrationHelpers } from "@trpc/react-query/rsc";
import { headers } from "next/headers";
import { cache } from "react";
import { cookies } from "next/headers";

import { createCaller, type AppRouter } from "@/server/api/root";
import { createTRPCContext } from "@/server/api/trpc";
import { createQueryClient } from "./query-client";
import { validateSessionToken } from "@/lib/auth/session";
import { AUTH_COOKIE_NAME } from "@/lib/constants";

/**
 * This wraps the `createTRPCContext` helper and provides the required context for the tRPC API when
 * handling a tRPC call from a React Server Component.
 */
const createContext = cache(async () => {
  const heads = new Headers(await headers());
  heads.set("x-trpc-source", "rsc");

  const cookieStore = await cookies();
  const sessionId = cookieStore.get(AUTH_COOKIE_NAME)?.value;
  let session = null;
  let user = null;

  if (sessionId) {
    const result = await validateSessionToken(sessionId);
    session = result.session;
    user = result.user;
  }

  return createTRPCContext({
    session,
    user,
    headers: heads,
  });
});

const getQueryClient = cache(createQueryClient);
const caller = createCaller(createContext);

export const { trpc: api, HydrateClient } = createHydrationHelpers<AppRouter>(
  caller,
  getQueryClient,
);
