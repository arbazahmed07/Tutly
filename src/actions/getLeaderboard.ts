import { db } from "@/lib/db";
import getCurrentUser from "./getCurrentUser";
import { getCreatedCourses, getEnrolledCourses, getMentorCourses } from "./courses";

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
    }, []);

    const sortedSubmissions = totalPoints.sort(
      (a: any, b: any) => b.totalPoints - a.totalPoints
    ) ;

    return { sortedSubmissions, currentUser, enrolledCourses } as any;
  } catch (error: any) {
    return null;
  }
}

export const getInstructorLeaderboardData=async() => {
  try {
    const currentUser = await getCurrentUser();
    if (!currentUser) {
      return null;
    }

    const createdCourses = await getCreatedCourses();
    if (!createdCourses) return null;
    const submissions = await db.submission.findMany({
      where: {
        enrolledUser:{
          course:{
            createdById:currentUser.id
          }
        }
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
    ) ;

    return { sortedSubmissions, currentUser, createdCourses } as any;
  } catch (error: any) {
    return null;
  }
}

export const getMentorLeaderboardData=async() => {
  try {
    const currentUser = await getCurrentUser();
    if (!currentUser) {
      return null;
    }

    const createdCourses = await getMentorCourses();
    if (!createdCourses) return null;
    const submissions = await db.submission.findMany({
      where: {
        enrolledUser:{
          course:{
            id:{
              in:createdCourses.map(course=>course.id)
            }
          }
        }
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
    ) ;

    return { sortedSubmissions, currentUser, createdCourses } as any;
  } catch (error: any) {
    return null;
  }
}
export const getMentorLeaderboardDataForDashboard=async() => {
  try {
    const currentUser = await getCurrentUser();
    if (!currentUser) {
      return null;
    }

    const createdCourses = await getMentorCourses();
    if (!createdCourses) return null;
    const submissions = await db.submission.findMany({
      where: {
        enrolledUser:{
          mentorUsername:currentUser.username
        }
      },
      include:{
        points:true
      }
    });
    const filteredSubmissions = submissions.filter((submission:any)=>submission.points.length>0)
    return filteredSubmissions.length;
  } catch (error: any) {
    return null;
  }
}



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
    position:position+1,
    points,
    assignmentsSubmitted,
    // assignmentsPending,
    currentUser,
  } as any;
};
