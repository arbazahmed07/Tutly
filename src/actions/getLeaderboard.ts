import { db } from "@/lib/db";
import getCurrentUser from "./getCurrentUser";
import { getEnrolledCourses, getMentorCourses } from "./courses";
import type { User, Course, submission } from "@prisma/client";

interface LeaderboardSubmission extends Partial<submission> {
  totalPoints: number;
  enrolledUser: {
    user: Pick<User, "id" | "name" | "username" | "image">;
  };
  assignment?: {
    class?: {
      course?: Pick<Course, "id" | "title" | "startDate"> | null;
    } | null;
  };
}

interface LeaderboardData {
  sortedSubmissions: LeaderboardSubmission[];
  currentUser: User;
  enrolledCourses: Course[];
}

export default async function getLeaderboardData(): Promise<LeaderboardData | null> {
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
          // TODO: Fix this to not use mentor[0]
          mentorUsername: mentor[0]?.mentorUsername,
        },
      },
      select: {
        id: true,
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

    const submissionsUptoLastSunday = submissions.filter((submission) => {
      const submissionDate = new Date(submission.submissionDate);
      const currentDate = new Date();
      const currentDayOfWeek = currentDate.getDay();
      const daysToLastSunday = currentDayOfWeek === 0 ? 7 : currentDayOfWeek;
      const lastSunday = new Date(currentDate);
      lastSunday.setDate(currentDate.getDate() - daysToLastSunday);
      lastSunday.setHours(12, 0, 0, 0);
      return submissionDate < lastSunday;
    });

    const totalPoints: LeaderboardSubmission[] = submissionsUptoLastSunday.map(
      (submission) => {
        const totalPoints = submission.points.reduce(
          (acc, curr) => acc + (curr.score ?? 0),
          0,
        );
        return {
          id: submission.id,
          totalPoints,
          submissionDate: submission.submissionDate,
          enrolledUser: submission.enrolledUser,
          assignment: submission.assignment,
        };
      },
    );

    const sortedSubmissions = totalPoints.sort(
      (a, b) => b.totalPoints - a.totalPoints,
    );

    return { sortedSubmissions, currentUser, enrolledCourses };
  } catch (error) {
    console.error("Error in getLeaderboardData:", error);
    return null;
  }
}

export const getLeaderboardDataForStudent = async (): Promise<
  number | null
> => {
  const currentUser = await getCurrentUser();
  if (!currentUser) return null;

  const leaderboardData = await getLeaderboardData();
  if (!leaderboardData) return null;

  const totalPoints = leaderboardData.sortedSubmissions
    .filter((submission) => submission.enrolledUser.user.id === currentUser.id)
    .reduce((total, submission) => total + submission.totalPoints, 0);
  return totalPoints;
};

export const getInstructorLeaderboardData =
  async (): Promise<LeaderboardData | null> => {
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
            course: {
              id: {
                in: enrolledCourses.map((course) => course.id),
              },
            },
          },
        },
        select: {
          id: true,
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
              mentor: {
                select: {
                  username: true,
                },
              },
            },
          },
        },
      });

      const totalPoints = submissions.map((submission) => {
        const totalPoints = submission.points.reduce(
          (acc, curr) => acc + (curr.score ?? 0),
          0,
        );
        return { ...submission, totalPoints };
      });

      const sortedSubmissions = totalPoints.sort(
        (a, b) => b.totalPoints - a.totalPoints,
      );

      return { sortedSubmissions, currentUser, enrolledCourses };
    } catch (error) {
      console.error("Error in getInstructorLeaderboardData:", error);
      return null;
    }
  };

export const getSubmissionsCountOfAllStudents = async (): Promise<Record<
  string,
  number
> | null> => {
  try {
    const submissions = await db.submission.findMany({
      select: {
        enrolledUser: {
          select: {
            username: true,
          },
        },
        points: true,
      },
      where: {
        points: {
          some: {
            score: {
              gt: 0,
            },
          },
        },
      },
    });
    const groupedSubmissions = submissions.reduce(
      (acc: Record<string, number>, curr) => {
        const username = curr.enrolledUser.username;
        acc[username] = (acc[username] ?? 0) + 1;
        return acc;
      },
      {},
    );

    return groupedSubmissions;
  } catch (error) {
    console.error("Error in getSubmissionsCountOfAllStudents:", error);
    return null;
  }
};

export const getMentorLeaderboardData =
  async (): Promise<LeaderboardData | null> => {
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
          id: true,
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

      const totalPoints = submissions.map((submission) => {
        const totalPoints = submission.points.reduce(
          (acc, curr) => acc + (curr.score ?? 0),
          0,
        );
        return { ...submission, totalPoints, rank: 0 };
      });

      const sortedSubmissions = totalPoints.sort(
        (a, b) => b.totalPoints - a.totalPoints,
      );

      sortedSubmissions.forEach((submission, index) => {
        submission.rank = index + 1;
      });

      return {
        sortedSubmissions,
        currentUser,
        enrolledCourses: createdCourses,
      };
    } catch (error) {
      console.error("Error in getMentorLeaderboardData:", error);
      return null;
    }
  };

export const getMentorLeaderboardDataForDashboard = async (): Promise<
  number | null
> => {
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
      (submission) => submission.points.length > 0,
    );
    return filteredSubmissions.length;
  } catch (error) {
    console.error("Error in getMentorLeaderboardDataForDashboard:", error);
    return null;
  }
};

export const getDashboardData = async () => {
  const leaderboardData = await getLeaderboardData();
  if (!leaderboardData) return null;

  const { currentUser, enrolledCourses, sortedSubmissions } = leaderboardData;

  const assignmentsSubmitted = sortedSubmissions.filter(
    (x) => x.enrolledUser.user.id === currentUser.id,
  ).length;

  return {
    sortedSubmissions,
    assignmentsSubmitted,
    currentUser,
    enrolledCourses,
  };
};
