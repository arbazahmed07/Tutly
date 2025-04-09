import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";
import { db } from "@tutly/db";

export const mentorsRouter = createTRPCRouter({
  getMentors: protectedProcedure
    .input(
      z.object({
        courseId: z.string(),
      }),
    )
    .query(async ({ ctx, input }) => {
      const currentUser = ctx.session?.user;
      if (!currentUser?.organizationId) {
        return { error: "Unauthorized" };
      }

      const mentors = await db.user.findMany({
        where: {
          role: "MENTOR",
          enrolledUsers: {
            some: {
              courseId: input.courseId,
            },
          },
          organizationId: currentUser.organizationId,
        },
        include: {
          enrolledUsers: true,
        },
      });

      return {
        success: true,
        data: mentors,
      };
    }),

  getMentorNameById: protectedProcedure
    .input(
      z.object({
        id: z.string(),
      }),
    )
    .query(async ({ ctx, input }) => {
      const currentUser = ctx.session?.user;
      if (!currentUser?.organizationId) {
        return { error: "Unauthorized" };
      }

      const mentor = await db.user.findUnique({
        where: {
          username: input.id,
        },
      });

      return {
        success: true,
        data: mentor?.name,
      };
    }),
});
