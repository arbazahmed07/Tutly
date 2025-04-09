import type { pointCategory } from "@prisma/client";
import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";
import { db } from "@/server/db";

export const pointsRouter = createTRPCRouter({
  addPoints: protectedProcedure
    .input(
      z.object({
        submissionId: z.string(),
        marks: z.array(
          z.object({
            category: z.string().transform((val) => val as pointCategory),
            score: z.number(),
          }),
        ),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      try {
        const currentUser = ctx.session?.user;
        if (!currentUser || currentUser.role === "STUDENT") {
          return { error: "Unauthorized" };
        }

        const allCategories = await Promise.all(
          input.marks.map(async (mark) => {
            const existingPoint = await db.point.findFirst({
              where: {
                submissionId: input.submissionId,
                category: mark.category,
              },
            });

            await db.events.create({
              data: {
                eventCategory: "ASSIGNMENT_EVALUATION",
                causedById: currentUser.id,
                eventCategoryDataId: input.submissionId,
              },
            });

            if (existingPoint) {
              return await db.point.update({
                where: {
                  id: existingPoint.id,
                },
                data: {
                  score: mark.score,
                },
              });
            } else {
              return await db.point.create({
                data: {
                  submissionId: input.submissionId,
                  category: mark.category,
                  score: mark.score,
                },
              });
            }
          }),
        );

        return { success: true, data: allCategories };
      } catch (error) {
        return { error: "Error in adding points" };
      }
    }),

  deleteSubmission: protectedProcedure
    .input(
      z.object({
        submissionId: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const currentUser = ctx.session?.user;
      if (!currentUser || currentUser.role === "STUDENT") {
        return { error: "Unauthorized" };
      }

      await db.submission.delete({
        where: {
          id: input.submissionId,
        },
      });

      return { success: true };
    }),
});
