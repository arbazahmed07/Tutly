import { defineAction } from "astro:actions";

import db from "@/lib/db";
// import { groupActions } from "@/lib/group";

// import * as courses from "./courses";

const getCurrentUserAction = defineAction({
  async handler(_, { cookies }) {
    const sessionId = cookies.get("sessionId")?.value;
    if (!sessionId) {
      return null;
    }

    const session = await db.session.findUnique({
      where: { id: sessionId },
      include: { user: true },
    });

    if (!session || session.expiresAt < new Date()) {
      if (session) {
        await db.session.delete({ where: { id: sessionId } });
      }
      return null;
    }

    return session.user;
  },
});

export const server = {
  getCurrentUser: getCurrentUserAction,
  // ...groupActions("courses", courses, "_"),
};
