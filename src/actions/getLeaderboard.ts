import { db } from "@/lib/db";
import getCurrentUser from "./getCurrentUser";

export default async function getLeaderboardData() {
  try {
    const currentUser = await getCurrentUser();
    if (!currentUser) {
      return null;
    }

    const enrolledCourses = await db.course.findMany({
      where: {
        enrolledUsers: {
          some: {
            userId: currentUser.id,
          },
        },
      },
    });

    const points = await db.userAssignment.findMany({
      where: {
        AssignedUser: {
          Course: {
            some: {
              id: {
                in: enrolledCourses.map((course) => course.id),
              },
            },
          },
        },
      },
      select: {
        points: true,
      },
    });

    return points

  } catch (error: any) {
    return null;
  }
}
