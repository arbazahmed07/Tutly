import { db } from "@/lib/db";
import getCurrentUser from "./getCurrentUser";
import { getEnrolledCourses } from "./courses";

export default async function getLeaderboardData() {
  try {
    const currentUser = await getCurrentUser();
    if (!currentUser) {
      return null;
    }

    const enrolledCourses = await getEnrolledCourses();
    if (!enrolledCourses) return null;
//todo:
    const submissions = await db.submission.findMany({
      where: {
        enrolledUser: {
          user: {
            course: {
              some: {
                id: {
                  in: enrolledCourses.map((course) => course.id),
                },
              },
            },
          },
        },
      },
      include: {
        points: true,
        assignment: {
          select: {
            class: {
              select: {
                course: {
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
          class: {
            course: {
              startDate: "asc",
            },
          },
        },
      },
    });
    return submissions;
  } catch (error: any) {
    return null;
  }
}
