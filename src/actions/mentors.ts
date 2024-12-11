import { defineAction } from "astro:actions";
import { z } from "zod";

import db from "@/lib/db";
import { getCurrentUser } from "@/lib/getCurrentUser";

export const getMentors = defineAction({
  input: z.object({
    courseId: z.string(),
  }),
  async handler({ courseId }, { locals }) {
    const currentUser = getCurrentUser(locals);
    if (!currentUser) {
      return { error: "Unauthorized" };
    }

    const mentors = await db.user.findMany({
      where: {
        role: "MENTOR",
        enrolledUsers: {
          some: {
            courseId: courseId,
          },
        },
      },
      include: {
        enrolledUsers: true,
      },
    });

    return {
      success: true,
      data: mentors,
    };
  },
});

export const getMentorNameById = defineAction({
  input: z.object({
    id: z.string(),
  }),
  async handler({ id }, { locals }) {
    const currentUser = getCurrentUser(locals);
    if (!currentUser) {
      return { error: "Unauthorized" };
    }

    const mentor = await db.user.findUnique({
      where: {
        username: id,
      },
    });

    return {
      success: true,
      data: mentor?.name,
    };
  },
});
