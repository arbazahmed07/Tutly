import { defineAction } from "astro:actions";
import { z } from "zod";

import db from "@/lib/db";

export const getAllEnrolledUsers = defineAction({
  input: z.object({
    courseId: z.string(),
  }),
  async handler({ courseId }) {
    const enrolledUsers = await db.user.findMany({
      where: {
        role: "STUDENT",
        enrolledUsers: {
          some: {
            courseId: courseId,
          },
        },
      },
      select: {
        id: true,
        image: true,
        username: true,
        name: true,
        email: true,
      },
    });

    return enrolledUsers;
  },
});

export const getAllUsers = defineAction({
  input: z.object({
    courseId: z.string(),
  }),
  async handler({ courseId }, { locals }) {
    const currentUser = locals.user;
    if (!currentUser) return null;

    const globalUsers = await db.user.findMany({
      select: {
        id: true,
        image: true,
        username: true,
        name: true,
        email: true,
        role: true,
        enrolledUsers: {
          where: {
            courseId: courseId,
          },
          select: {
            course: {
              select: {
                id: true,
                title: true,
              },
            },
            mentorUsername: true,
          },
        },
      },
    });
    return globalUsers;
  },
});
