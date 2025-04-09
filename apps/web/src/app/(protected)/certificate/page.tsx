import { redirect } from "next/navigation";
import { getServerSession } from "@/lib/auth/session";
import { db } from "@/server/db";
import StudentCertificate from "./_components/StudentCertificate";

interface Course {
  courseId: string;
  courseTitle: string;
  assignmentsSubmitted: number;
  totalPoints: number;
  totalAssignments: number;
}

interface DashboardData {
  courses: Course[];
  currentUser: {
    name: string;
    username: string;
  };
}

export default async function CertificatePage() {
  const session = await getServerSession();
  if (!session?.user) {
    redirect("/sign-in");
  }

  if (session.user.role !== "STUDENT") {
    redirect("/dashboard");
  }

  const enrolledCourses = await db.enrolledUsers.findMany({
    where: {
      username: session.user.username,
      user: {
        organizationId: session.user.organizationId,
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
                    username: session.user.username,
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

  const dashboardData: DashboardData = {
    courses: enrolledCourses.map((enrolledCourse) => {
      if (!enrolledCourse.course?.id || !enrolledCourse.course?.title) {
        throw new Error("Course ID or title is missing");
      }

      const courseAssignments = enrolledCourse.course.attachments || [];
      const submissions = courseAssignments.flatMap((a) => a.submissions);

      const totalPoints = submissions.reduce(
        (acc, curr) => acc + curr.points.reduce((acc, curr) => acc + curr.score, 0),
        0
      );

      return {
        courseId: enrolledCourse.course.id,
        courseTitle: enrolledCourse.course.title,
        assignments: courseAssignments,
        assignmentsSubmitted: submissions.length,
        totalPoints,
        totalAssignments: courseAssignments.length,
      };
    }),
    currentUser: {
      name: session.user.name,
      username: session.user.username,
    },
  };

  return (
    <div>
      <StudentCertificate user={dashboardData.currentUser} data={dashboardData} />
    </div>
  );
} 