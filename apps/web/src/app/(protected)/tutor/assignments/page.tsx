import { redirect } from "next/navigation";
import type { Course, User } from "@prisma/client";
import { getServerSessionOrRedirect } from "@/lib/auth/session";
import { db } from "@/server/db";
import AssignmentDashboard from "./_components/AssignmentDashboard";

type StudentWithRelations = User & {
  course: Course[];
  enrolledUsers: {
    courseId: string;
    mentorUsername: string;
  }[];
};

export default async function AssignmentsPage() {
  const session = await getServerSessionOrRedirect();
  const currentUser = session.user;

  if (currentUser.role === "STUDENT") {
    return redirect("/assignments");
  }

  const students = await db.user.findMany({
    where: {
      role: "STUDENT",
      organizationId: currentUser.organizationId,
      ...(currentUser.role === "MENTOR" && {
        enrolledUsers: {
          some: {
            mentorUsername: currentUser.username,
          },
        },
      }),
    },
    include: {
      course: true,
      enrolledUsers: true,
    },
  }) as StudentWithRelations[];

  const courses = await db.course.findMany({
    where: {
      ...(currentUser.role === "MENTOR"
        ? {
          enrolledUsers: {
            some: {
              mentorUsername: currentUser.username,
            },
          },
        }
        : {
          enrolledUsers: {
            some: {
              username: currentUser.username,
            },
          },
        }),
    },
    include: {
      classes: true,
      createdBy: {
        select: {
          id: true,
          username: true,
          name: true,
          image: true,
          email: true,
          role: true,
          createdAt: true,
          updatedAt: true,
        },
      },
      _count: {
        select: {
          classes: true,
        },
      },
      courseAdmins: {
        select: {
          id: true,
          username: true,
          name: true,
          image: true,
          email: true,
          role: true,
          createdAt: true,
          updatedAt: true,
        },
      },
    },
  }) ;

  courses.forEach((course) => {
    course.classes.sort((a, b) => {
      return Number(a.createdAt) - Number(b.createdAt);
    });
  });

  return (
    <AssignmentDashboard
      students={students}
      courses={courses}
      currentUser={currentUser}
    />
  );
}
