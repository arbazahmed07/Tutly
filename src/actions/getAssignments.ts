import { db } from "@/lib/db";
import getCurrentUser from "./getCurrentUser";

export const getAllAssignedAssignments = async () => {
  const currentUser = await getCurrentUser();
  if (!currentUser) {
    return null;
  }

  const coursesWithAssignments = await db.course.findMany({
    where: {
      enrolledUsers: {
        some: {
          userId: currentUser.id,
        },
      },
    },
    select: {
      id: true,
      classes: {
        select: {
          attachments: {
            where: {
              attachmentType: "ASSIGNMENT",
            },
            include:{
              class: true,
              submissions: {
                where:{
                  userId: currentUser.id
                }
              },
            },
          },
        },
      },
    },
  });
  return coursesWithAssignments;
};

export const getAssignmentById = async (id: string) => {
  const currentUser = await getCurrentUser();
  if (!currentUser) {
    return null;
  }

  const assignment = await db.submission.findFirst({
    where: {
      id,
      userId: currentUser.id,
    },
    include: {
      assignment: true,
      points: true,
      user: {
        select: {
          course: {
            select: {
              id: true,
              title: true,
            },
          },
        },
      },
    },
  });
  return assignment;
};