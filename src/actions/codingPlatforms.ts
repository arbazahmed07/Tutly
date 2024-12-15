import { defineAction } from "astro:actions";
import { z } from "zod";

import { getPlatformScores, validatePlatformHandles } from "@/coding-platforms";
import db from "@/lib/db";

export const validatePlatformHandlesAction = defineAction({
  input: z.object({
    handles: z.record(z.string(), z.string()),
  }),
  handler: async ({ handles }) => {
    return await validatePlatformHandles(handles);
  },
});

export const getPlatformScoresAction = defineAction({
  handler: async (_, { locals }) => {
    const profile = await db.profile.findUnique({
      where: {
        userId: locals.user!.id,
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
      }).filter(([_, value]) => value !== undefined) as [string, string][]
    );

    const result = await getPlatformScores(platformHandles);
    return result;
  },
});
