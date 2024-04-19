import { db } from "@/lib/db";
import getCurrentUser from "./getCurrentUser";
import { getEnrolledCourses } from "./courses";

export default async function getLeaderboardData() {
  try {
    const currentUser = await getCurrentUser();
    if (!currentUser) {
      return null;
    }

    const enrolledCourses = await getEnrolledCourses()

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
