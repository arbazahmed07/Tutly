import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";
import {
  getPlatformScores,
  validatePlatformHandles,
} from "@/lib/coding-platforms";
import { db } from "@/server/db";

export const codingPlatformsRouter = createTRPCRouter({
  validatePlatformHandles: protectedProcedure
    .input(
      z.object({
        handles: z.record(z.string(), z.string()),
      }),
    )
    .mutation(async ({ input }) => {
      return await validatePlatformHandles(input.handles);
    }),

  getPlatformScores: protectedProcedure.query(async ({ ctx }) => {
    const currentUser = ctx.session?.user;
    if (!currentUser) return { error: "Unauthorized" };

    const profile = await db.profile.findUnique({
      where: {
        userId: currentUser.id,
      },
    });

    const { codechef, leetcode, codeforces, hackerrank, interviewbit } =
      (profile?.professionalProfiles as Record<string, string>) || {};

    const platformHandles: Record<string, string> = Object.fromEntries(
      Object.entries({
        codechef,
        leetcode,
        codeforces,
        hackerrank,
        interviewbit,
      }).filter(([_, value]) => value !== undefined) as [string, string][],
    );

    const result = await getPlatformScores(platformHandles);
    return { success: true, data: result };
  }),
});
