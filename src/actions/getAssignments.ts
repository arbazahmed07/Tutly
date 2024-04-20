import { db } from "@/lib/db";
import getCurrentUser from "./getCurrentUser";

export const getAllAssignedAssignments = async () => {
  const currentUser = await getCurrentUser();
  if (!currentUser) {
    return null;
  }

  const assignments = await db.userAssignment.findMany({
    where: {
      userId: currentUser.id,
      assignment: {
        attachmentType: "ASSIGNMENT",
      },
    },
    include: {
      assignment: true,
      points: true,
      assignedUser: {
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
  return assignments;
};

export const getAssignmentById = async (id: string) => {
  const currentUser = await getCurrentUser();
  if (!currentUser) {
    return null;
  }

  const assignment = await db.userAssignment.findFirst({
    where: {
      id,
      userId: currentUser.id,
    },
    include: {
      assignment: true,
      points: true,
      assignedUser: {
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