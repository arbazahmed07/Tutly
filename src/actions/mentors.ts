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

export const getMentorNameById = async (id: string) => {
  const mentor = await db.user.findUnique({
    where: {
      username: id,
    },
  });
  return mentor?.name;
};
