import { db } from "@/lib/db";

// get all mentors
export const getMentors = async () => {
  const mentors = await db.user.findMany({
    where: {
      role: "MENTOR",
    },
  });
  return mentors;
};
