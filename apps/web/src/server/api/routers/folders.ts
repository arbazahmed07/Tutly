import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";
import { db } from "@tutly/db";

export const foldersRouter = createTRPCRouter({
  updateFolder: protectedProcedure
    .input(
      z.object({
        id: z.string(),
        title: z.string(),
      }),
    )
    .mutation(async ({ input }) => {
      try {
        const updatedFolder = await db.folder.update({
          where: { id: input.id },
          data: { title: input.title },
        });
        return { success: true, data: updatedFolder };
      } catch (error) {
        console.error("Error updating folder:", error);
        return { error: "Failed to update folder" };
      }
    }),
});
