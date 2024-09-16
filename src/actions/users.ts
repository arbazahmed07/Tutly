import { db } from "@/lib/db";
import getCurrentUser from "./getCurrentUser";

export const getAllEnrolledUsers = async (courseId: string) => {
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
};

export const getAllUsers = async (courseId: string) => {
  const currentUser = await getCurrentUser();
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
};
