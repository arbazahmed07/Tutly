import type { EventAttachmentType } from "@prisma/client";
import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";
import { db } from "@/server/db";

export const scheduleRouter = createTRPCRouter({
  getSchedule: protectedProcedure
    .input(
      z.object({
        date: z.string().datetime(),
      }),
    )
    .query(async ({ ctx, input }) => {
      const currentUser = ctx.session?.user;
      if (!currentUser) {
        throw new Error("Unauthorized");
      }

      // Create start and end dates for the query
      const startDate = new Date(input.date);
      startDate.setHours(0, 0, 0, 0);

      const endDate = new Date(startDate);
      endDate.setDate(endDate.getDate() + 1);
      endDate.setHours(0, 0, 0, 0);

      const events = await db.scheduleEvent.findMany({
        where: {
          AND: [
            {
              startTime: {
                gte: startDate,
              },
            },
            {
              startTime: {
                lt: endDate,
              },
            },
          ],
          course: {
            enrolledUsers: {
              some: { username: currentUser.username },
            },
          },
        },
        include: {
          attachments: {
            orderBy: {
              ordering: "asc",
            },
          },
          course: {
            select: {
              id: true,
              title: true,
            },
          },
        },
      });

      return {
        events,
      };
    }),

  createEvent: protectedProcedure
    .input(
      z.object({
        title: z.string(),
        startTime: z.string(),
        endTime: z.string(),
        courseId: z.string(),
        isPublished: z.boolean(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const currentUser = ctx.session?.user;
      if (!currentUser) {
        throw new Error("Unauthorized");
      }

      if (currentUser.role !== "INSTRUCTOR") {
        throw new Error("You are not authorized to create events");
      }

      const enrolledCourse = await db.enrolledUsers.findFirst({
        where: {
          username: currentUser.username,
          courseId: input.courseId,
        },
      });

      if (!enrolledCourse) {
        throw new Error("You do not have access to this course");
      }

      const newEvent = await db.scheduleEvent.create({
        data: {
          title: input.title,
          startTime: new Date(input.startTime),
          endTime: new Date(input.endTime),
          courseId: input.courseId,
          createdById: currentUser.id,
          isPublished: input.isPublished,
        },
        include: {
          attachments: true,
        },
      });

      return {
        event: newEvent,
      };
    }),

  updateEvent: protectedProcedure
    .input(
      z.object({
        id: z.string(),
        title: z.string(),
        startTime: z.string(),
        endTime: z.string(),
        isPublished: z.boolean(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const currentUser = ctx.session?.user;
      if (!currentUser) {
        throw new Error("Unauthorized");
      }

      if (currentUser.role !== "INSTRUCTOR") {
        throw new Error("You are not authorized to update events");
      }

      await db.eventAttachment.deleteMany({
        where: { eventId: input.id },
      });

      const updatedEvent = await db.scheduleEvent.update({
        where: { id: input.id },
        data: {
          title: input.title,
          startTime: new Date(input.startTime),
          endTime: new Date(input.endTime),
          isPublished: input.isPublished,
        },
        include: {
          attachments: true,
        },
      });

      return {
        event: updatedEvent,
      };
    }),

  deleteEvent: protectedProcedure
    .input(
      z.object({
        id: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const currentUser = ctx.session?.user;
      if (!currentUser) {
        throw new Error("Unauthorized");
      }

      const event = await db.scheduleEvent.findUnique({
        where: { id: input.id },
        include: {
          course: true,
        },
      });

      if (
        currentUser.role !== "INSTRUCTOR" &&
        event?.course?.createdById !== currentUser.id
      ) {
        throw new Error("You are not authorized to delete events");
      }

      await db.scheduleEvent.delete({
        where: { id: input.id },
      });

      return {
        success: true,
      };
    }),

  addAttachment: protectedProcedure
    .input(
      z.object({
        id: z.string(),
        title: z.string(),
        type: z.enum([
          "YOUTUBE",
          "YOUTUBE_LIVE",
          "GMEET",
          "JIOMEET",
          "TEXT",
          "VIMEO",
          "VIDEOCRYPT",
          "DOCUMENT",
          "OTHER",
        ] as const satisfies readonly EventAttachmentType[]),
        link: z.string().optional().nullable(),
        details: z.string().optional().nullable(),
        ordering: z.number().optional(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const currentUser = ctx.session?.user;
      if (!currentUser) {
        throw new Error("Unauthorized");
      }

      if (currentUser.role !== "INSTRUCTOR") {
        throw new Error("You are not authorized to add attachments");
      }

      const newAttachment = await db.eventAttachment.create({
        data: {
          title: input.title,
          type: input.type,
          eventId: input.id,
          details: input.details ?? null,
          ordering: input.ordering ?? 1,
          link: input.link ?? null,
        },
      });

      return {
        attachment: newAttachment,
      };
    }),
});
