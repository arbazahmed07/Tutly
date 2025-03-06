import type { pointCategory } from "@prisma/client";
import { defineAction } from "astro:actions";
import { z } from "zod";

import db from "@/lib/db";

export const addPoints = defineAction({
  input: z.object({
    submissionId: z.string(),
    marks: z.array(
      z.object({
        category: z.string().transform((val) => val as pointCategory),
        score: z.number(),
      })
    ),
  }),
  async handler({ submissionId, marks }, { locals }) {
    try {
      const currentUser = locals.user;
      if (!currentUser || currentUser.role == "STUDENT") {
        return { error: "Unauthorized" };
      }

      const allCategories = await Promise.all(
        marks.map(async (mark) => {
          const existingPoint = await db.point.findFirst({
            where: {
              submissionId,
              category: mark.category,
            },
          });

          await db.events.create({
            data: {
              eventCategory: "ASSIGNMENT_EVALUATION",
              causedById: currentUser.id,
              eventCategoryDataId: submissionId,
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
                submissionId,
                category: mark.category,
                score: mark.score,
              },
            });
          }
        })
      );

      return { success: true, data: allCategories };
    } catch (error) {
      return { error: "Error in adding points" };
    }
  },
});

export const deleteSubmission = defineAction({
  input: z.object({
    submissionId: z.string(),
  }),
  async handler({ submissionId }, { locals }) {
    const currentUser = locals.user;
    if (!currentUser || currentUser.role == "STUDENT") {
      return { error: "Unauthorized" };
    }

    await db.submission.delete({
      where: {
        id: submissionId,
      },
    });

    return { success: true };
  },
});
