import { redirect } from "next/navigation";
import { getServerSession, getServerSessionOrRedirect } from "@/lib/auth/session";
import { db } from "@tutly/db";
import Report from "./_components/Report";
import { api } from "@/trpc/server";

export default async function CourseReportPage({
  params,
}: {
  params: Promise<{ courseId: string }>;
}) {
  const session = await getServerSession();
  const user = session?.user;
  const { courseId } = await params;

  if (!courseId || !user || (user.role !== "INSTRUCTOR" && user.role !== "MENTOR")) {
    redirect("/404");
  }

  const enrolledCourses = await db.enrolledUsers.findMany({
    where: {
      username: user.username,
      courseId: {
        not: null,
      },
    },
    include: {
      course: true,
    },
  });

  const courses = enrolledCourses.map((enrolled) => enrolled.course);

  const { data: report } = await api.report.generateReport({ courseId });
  const sortedData = report ? [...report].sort((a, b) => a.username.localeCompare(b.username)) : [];

  const isMentor = user.role === "MENTOR";

  return (
    <Report
      isMentor={isMentor}
      intitialdata={sortedData}
      allCourses={courses}
      courseId={courseId}
    />
  );
} 