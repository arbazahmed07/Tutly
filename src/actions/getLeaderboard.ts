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
    if(!enrolledCourses) return null;

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
      include: {
        points: true,
        assignment: {
          select: {
            Class: {
              select: {
                Course: {
                  select: {
                    id: true,
                    title: true,
                    startDate: true,
                  },
                },
              },
            },
          },
        },
      },
      orderBy: {
        assignment: {
          Class: {
            Course: {
              startDate: 'asc', 
            },
          },
        },
      },
    });
    return points

  } catch (error: any) {
    return null;
  }
}
