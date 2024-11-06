import { defineAction } from "astro:actions";
import { z } from "zod";
import db from "@/lib/db";
import { getCurrentUser } from "@/lib/getCurrentUser";
import { idSchema } from "@/lib/schemas";

export const getMentors = defineAction({
  input: z.object({}),
  async handler(_, { locals }) {
    const currentUser = getCurrentUser(locals);
    if (!currentUser) {
      return { error: "Unauthorized" };
    }

    const mentors = await db.user.findMany({
      where: {
        role: "MENTOR",
      },
    });

    return {
      success: true,
      data: mentors
    };
  }
});

export const getMentorNameById = defineAction({
  input: idSchema,
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
      data: mentor?.name
    };
  }
});
