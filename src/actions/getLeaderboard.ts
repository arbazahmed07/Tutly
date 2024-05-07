import { db } from "@/lib/db";
import getCurrentUser from "./getCurrentUser";
import {
  getCreatedCourses,
  getEnrolledCourses,
  getMentorCourses,
} from "./courses";

export default async function getLeaderboardData() {
  try {
    const currentUser = await getCurrentUser();
    if (!currentUser) {
      return null;
    }
    const mentor = await db.enrolledUsers.findMany({
      where: {
        username: currentUser.username,
      },
      select: {
        mentorUsername: true,
      },
    });
    const enrolledCourses = await getEnrolledCourses();
    if (!enrolledCourses) return null;
    const submissions = await db.submission.findMany({
      where: {
        enrolledUser: {
          mentorUsername: mentor[0].mentorUsername,
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
        submissionDate: true,
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

    const submissionsUptoLastSunday = submissions.filter(submission => {
      const submissionDate = new Date(submission.submissionDate);
      const currentDate = new Date();
      const currentDayOfWeek = currentDate.getDay();
      const daysToLastSunday = currentDayOfWeek === 0 ? 7 : currentDayOfWeek;
      const lastSunday = new Date(currentDate);
      lastSunday.setDate(currentDate.getDate() - daysToLastSunday);
      lastSunday.setHours(12, 0, 0, 0);
      return submissionDate < lastSunday;
  });
  
  
    const totalPoints = submissionsUptoLastSunday.reduce(
      (acc: any, curr: any) => {
        const totalPoints = curr.points.reduce(
          (acc: any, curr: any) => acc + curr.score,
          0
        );
        return [...acc, { ...curr, totalPoints }];
      },
      []
    );

    const sortedSubmissions = totalPoints.sort(
      (a: any, b: any) => b.totalPoints - a.totalPoints
    );

    return { sortedSubmissions, currentUser, enrolledCourses } as any;
  } catch (error: any) {
    return null;
  }
}
export const getLeaderboardDataForStudent = async () => {
  const currentUser = await getCurrentUser();
  if (!currentUser) return null;

  const leaderboardData = await getLeaderboardData();
  if (!leaderboardData) return null;

  const totalPoints = leaderboardData.sortedSubmissions
    .filter(
      (submission: any) =>
        submission?.enrolledUser?.user?.id === currentUser?.id
    )
    .reduce((total: any, submission: any) => total + submission.totalPoints, 0);
  return totalPoints;
};

export const getInstructorLeaderboardData = async () => {
  try {
    const currentUser = await getCurrentUser();
    if (!currentUser) {
      return null;
    }

    const createdCourses = await getCreatedCourses();
    if (!createdCourses) return null;
    const submissions = await db.submission.findMany({
      where: {
        enrolledUser: {
          course: {
            createdById: currentUser.id,
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
    }, []);

    const sortedSubmissions = totalPoints.sort(
      (a: any, b: any) => b.totalPoints - a.totalPoints
    );

    return { sortedSubmissions, currentUser, createdCourses } as any;
  } catch (error: any) {
    return null;
  }
};

export const getMentorLeaderboardData = async () => {
  try {
    const currentUser = await getCurrentUser();
    if (!currentUser) {
      return null;
    }

    const createdCourses = await getMentorCourses();
    if (!createdCourses) return null;
    const submissions = await db.submission.findMany({
      where: {
        enrolledUser: {
          mentorUsername: currentUser.username,
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
    }, []);

    const sortedSubmissions = totalPoints.sort(
      (a: any, b: any) => b.totalPoints - a.totalPoints
    );

    return { sortedSubmissions, currentUser, createdCourses } as any;
  } catch (error: any) {
    return null;
  }
};
export const getMentorLeaderboardDataForDashboard = async () => {
  try {
    const currentUser = await getCurrentUser();
    if (!currentUser) {
      return null;
    }

    const createdCourses = await getMentorCourses();
    if (!createdCourses) return null;
    const submissions = await db.submission.findMany({
      where: {
        enrolledUser: {
          mentorUsername: currentUser.username,
        },
      },
      include: {
        points: true,
      },
    });
    const filteredSubmissions = submissions.filter(
      (submission: any) => submission.points.length > 0
    );
    return filteredSubmissions.length;
  } catch (error: any) {
    return null;
  }
};

export const getDashboardData = async () => {
  const leaderboardData = await getLeaderboardData();
  if (!leaderboardData) return null;

  const currentUser = leaderboardData.currentUser;
  const enrolledCourses = leaderboardData.enrolledCourses;
  const sortedSubmissions = leaderboardData.sortedSubmissions;

  const position = sortedSubmissions.findIndex(
    (x: any) => x.enrolledUser.user.id === currentUser.id
  );

  const points = sortedSubmissions[position]?.totalPoints;

  const assignmentsSubmitted = sortedSubmissions.filter(
    (x: any) => x.enrolledUser.user.id === currentUser.id
  ).length;
  // const assignmentsPending =

  return {
    position: position + 1,
    points,
    assignmentsSubmitted,
    // assignmentsPending,
    currentUser,
  } as any;
};
