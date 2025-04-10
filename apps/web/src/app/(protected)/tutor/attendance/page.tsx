import { getServerSessionOrRedirect } from "@tutly/auth";
import { redirect } from "next/navigation";
import { db } from "@tutly/db";
import type { Course, Class } from "@prisma/client";
import AttendanceClient from "./_components/Attendancefilters";
import { api } from "@/trpc/server";

export default async function AttendancePage() {
  const session = await getServerSessionOrRedirect();

  if (!session?.user) {
    redirect("/auth/signin");
  }

  const currentUser = session.user;

  const { data: attendance } = await api.attendances.getAttendanceOfAllStudents();

  let courses = await db.course.findMany({
    where: {
      enrolledUsers: {
        some: {
          username: currentUser?.username || "",
        },
      },
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
  });

  courses.forEach((course: Course & { classes: Class[] }) => {
    course.classes.sort((a: any, b: any) => {
      return Number(a.createdAt) - Number(b.createdAt);
    });
  });

  if (currentUser?.role !== "INSTRUCTOR") {
    const publishedCourses = courses.filter((course) => course.isPublished);
    courses = publishedCourses;
  }

  return (
    <div>
      <AttendanceClient
        attendance={attendance ?? ""}
        courses={courses}
        role={currentUser?.role ?? ""}
      />
    </div>
  );
}