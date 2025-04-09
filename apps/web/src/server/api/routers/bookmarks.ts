import { BookMarkCategory } from "@prisma/client";
import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";
import { db } from "@/server/db";

export const bookmarksRouter = createTRPCRouter({
  toggleBookmark: protectedProcedure
    .input(
      z.object({
        category: z.nativeEnum(BookMarkCategory),
        objectId: z.string(),
        causedObjects: z.record(z.string()).optional(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const currentUser = ctx.session?.user;
      if (!currentUser) return { error: "Unauthorized" };

      const existingBookmark = await db.bookMarks.findFirst({
        where: {
          category: input.category,
          objectId: input.objectId,
          userId: currentUser.id,
        },
      });

      if (existingBookmark) {
        await db.bookMarks.delete({
          where: {
            id: existingBookmark.id,
          },
        });
      } else {
        await db.bookMarks.create({
          data: {
            category: input.category,
            objectId: input.objectId,
            userId: currentUser.id,
            causedObjects: input.causedObjects,
          },
        });
      }

      return { success: true };
    }),

  getBookmark: protectedProcedure
    .input(
      z.object({
        userId: z.string(),
        objectId: z.string(),
      }),
    )
    .query(async ({ input }) => {
      try {
        const bookmark = await db.bookMarks.findFirst({
          where: {
            userId: input.userId,
            objectId: input.objectId,
          },
        });

        return { success: true, data: bookmark };
      } catch (error) {
        console.error("Error getting bookmark:", error);
        return { error: "Failed to get bookmark" };
      }
    }),
});
