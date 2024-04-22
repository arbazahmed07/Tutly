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
    const submissions = await db.submission.findMany({
      where: {
        enrolledUser: {
          courseId: {
            in: enrolledCourses.map((course) => course.id),
          },
        },
      },
      select: {
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
        enrolledUser: {
          select: {
            user: {
              select: {
                id: true,
                name: true,
                username: true,
                image: true,
              },
            },
          },
        },
      },
    });

    const totalPoints = submissions.reduce((acc: any, curr: any) => {
      const totalPoints = curr.points.reduce(
        (acc: any, curr: any) => acc + curr.score,
        0
      );
      return [...acc, { ...curr, totalPoints }];
    }
    , []);

    const sortedSubmissions = totalPoints.sort(
      (a: any, b: any) => b.totalPoints - a.totalPoints
    );

    return {sortedSubmissions, currentUser, enrolledCourses};
  } catch (error: any) {
    return null;
  }
}


// export const getLeaderboardPoints = async () => {
//   const {sortedSubmissions, currentUser, enrolledCourses} = await getLeaderboardData();
// }
