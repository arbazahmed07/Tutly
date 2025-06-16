import { BookMarkCategory } from "@prisma/client";
import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "../trpc";

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
      const currentUser = ctx.session.user;

      const existingBookmark = await ctx.db.bookMarks.findFirst({
        where: {
          category: input.category,
          objectId: input.objectId,
          userId: currentUser.id,
        },
      });

      if (existingBookmark) {
        await ctx.db.bookMarks.delete({
          where: {
            id: existingBookmark.id,
          },
        });
      } else {
        await ctx.db.bookMarks.create({
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
    .query(async ({ ctx, input }) => {
      try {
        const bookmark = await ctx.db.bookMarks.findFirst({
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
