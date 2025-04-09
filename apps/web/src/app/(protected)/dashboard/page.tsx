import { redirect } from "next/navigation";
import { Role } from "@prisma/client";
import type { DashboardData } from "./types";
import Dashboard from "./_components/dashboard";
import { db } from "@/server/db";
import { getServerSession } from "@/lib/auth/session";

export default async function DashboardPage() {
  const session = await getServerSession();
  if (!session?.user) {
    redirect("/login");
  }

  const currentUser = session.user;
  const role: Role = currentUser.role;
  let dashboardData: DashboardData | null = null;

  if (role === Role.STUDENT) {
    const enrolledCourses = await db.enrolledUsers.findMany({
      where: {
        username: currentUser.username,
        user: {
          organizationId: currentUser.organizationId,
        },
      },
      select: {
        course: {
          select: {
            id: true,
            title: true,
            attachments: {
              where: {
                attachmentType: "ASSIGNMENT",
              },
              select: {
                id: true,
                title: true,
                submissions: {
                  where: {
                    enrolledUser: {
                      username: currentUser.username,
                    },
                  },
                  select: {
                    id: true,
                    points: {
                      select: {
                        score: true,
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    dashboardData = {
      courses: enrolledCourses.map((enrolledCourse) => {
        const courseAssignments = enrolledCourse.course?.attachments ?? [];
        const submissions = courseAssignments.flatMap((a) => a.submissions);

        const totalPoints = submissions.reduce(
          (acc, curr) => acc + curr.points.reduce((acc, curr) => acc + curr.score, 0),
          0
        );

        return {
          courseId: enrolledCourse.course?.id,
          courseTitle: enrolledCourse.course?.title,
          assignments: courseAssignments,
          assignmentsSubmitted: submissions.length,
          totalPoints,
          totalAssignments: courseAssignments.length,
        };
      }),
      currentUser,
    };
  } else if (role === Role.MENTOR) {
    const mentorCourses = await db.course.findMany({
      where: {
        enrolledUsers: {
          some: {
            mentorUsername: currentUser.username,
            user: {
              organizationId: currentUser.organizationId,
            },
          },
        },
      },
      select: {
        id: true,
        title: true,
        attachments: {
          where: {
            attachmentType: "ASSIGNMENT",
          },
          select: {
            id: true,
            title: true,
          },
        },
        enrolledUsers: {
          where: {
            mentorUsername: currentUser.username,
          },
          select: {
            user: {
              select: {
                username: true,
              },
            },
            submission: {
              select: {
                id: true,
                points: {
                  select: {
                    score: true,
                  },
                },
              },
            },
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    dashboardData = {
      courses: mentorCourses.map((mentorCourse) => {
        const courseEnrollments = mentorCourse.enrolledUsers || [];
        const submissions = courseEnrollments.flatMap((e) => e.submission);
        const evaluatedSubmissions = submissions.filter((s) => s.points.some((p) => p.score > 0));

        return {
          courseId: mentorCourse.id,
          courseTitle: mentorCourse.title,
          assignments: mentorCourse.attachments || [],
          menteeCount: courseEnrollments.length,
          evaluatedAssignments: evaluatedSubmissions.length,
          totalSubmissions: submissions.length,
        };
      }),
    };
  } else if (role === Role.INSTRUCTOR) {
    const enrolledCourses = await db.enrolledUsers.findMany({
      where: {
        username: currentUser.username,
        courseId: {
          not: null,
        },
      },
      select: {
        courseId: true,
      },
    });

    const courseIds = enrolledCourses
      .map((enrolled) => enrolled.courseId)
      .filter((id): id is string => id !== null);

    const courses = await db.course.findMany({
      where: {
        id: {
          in: courseIds,
        },
      },
      select: {
        id: true,
        title: true,
        _count: {
          select: {
            classes: true,
            enrolledUsers: {
              where: {
                user: {
                  role: "STUDENT",
                },
              },
            },
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    dashboardData = {
      courses: courses.map((course) => ({
        courseId: course.id,
        courseTitle: course.title,
        classCount: course._count.classes,
        studentCount: course._count.enrolledUsers,
      })),
      totalCourses: courses.length,
    };
  }

  return <Dashboard data={dashboardData} name={currentUser.name} currentUser={currentUser} />;
} 