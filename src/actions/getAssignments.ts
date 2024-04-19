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
      AssignedUser: {
        select: {
          Course: {
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
