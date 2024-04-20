import { db } from "@/lib/db";

// get all mentors for a course
export const getMentorsByCourseId = async (courseId: string) => {
  const mentors = await db.course.findUnique({
    where: {
      id: courseId,
    },
    include: {
      assignedMentors: {
        select: {
          mentor: true,
        },
      },
    },
  });
  return mentors;
};