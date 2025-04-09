import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";
import { db } from "@/server/db";

export const holidaysRouter = createTRPCRouter({
  addHoliday: protectedProcedure
    .input(
      z.object({
        reason: z.string(),
        description: z.string().optional(),
        startDate: z.string().transform((str) => new Date(str)),
        endDate: z.string().transform((str) => new Date(str)),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const currentUser = ctx.session?.user;
      if (!currentUser) throw new Error("Unauthorized");

      try {
        const holiday = await db.holidays.create({
          data: {
            reason: input.reason,
            description: input.description ?? null,
            startDate: input.startDate,
            endDate: input.endDate,
          },
        });
        return { success: true, data: holiday };
      } catch (error) {
        console.error("Database error:", error);
        throw new Error("Failed to add holiday");
      }
    }),

  deleteHoliday: protectedProcedure
    .input(
      z.object({
        id: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const currentUser = ctx.session?.user;
      if (!currentUser) throw new Error("Unauthorized");

      try {
        const holiday = await db.holidays.delete({
          where: { id: input.id },
        });
        return { success: true, data: holiday };
      } catch (error) {
        console.error("Database error:", error);
        throw new Error("Failed to delete holiday");
      }
    }),

  getAllHolidays: protectedProcedure.query(async ({ ctx }) => {
    const currentUser = ctx.session?.user;
    if (!currentUser) throw new Error("Unauthorized");

    try {
      const holidays = await db.holidays.findMany();
      return { success: true, data: holidays };
    } catch (error) {
      console.error("Database error:", error);
      throw new Error("Failed to fetch holidays");
    }
  }),

  editHolidays: protectedProcedure
    .input(
      z.object({
        id: z.string(),
        reason: z.string(),
        description: z.string().optional(),
        startDate: z.string().transform((str) => new Date(str)),
        endDate: z.string().transform((str) => new Date(str)),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const currentUser = ctx.session?.user;
      if (!currentUser) throw new Error("Unauthorized");

      try {
        const holiday = await db.holidays.update({
          where: { id: input.id },
          data: {
            reason: input.reason,
            description: input.description ?? null,
            startDate: input.startDate,
            endDate: input.endDate,
          },
        });
        return { success: true, data: holiday };
      } catch (error) {
        console.error("Database error:", error);
        throw new Error("Failed to update holiday");
      }
    }),
});
