import { notFound, redirect } from "next/navigation";
import { getServerSessionOrRedirect } from "@/lib/auth/session";
import { db } from "@/server/db";

export default async function ReportPage() {
  const session = await getServerSessionOrRedirect();
  const user = session.user;

  if (!user || (user.role !== "INSTRUCTOR" && user.role !== "MENTOR")) {
    return notFound();
  }

  const enrolledCourses = await db.enrolledUsers.findMany({
    where: {
      username: user.username,
      courseId: {
        not: null,
      },
    },
    select: {
      courseId: true,
    },
  });

  if (!enrolledCourses?.length) {
    redirect("/instructor/no-courses");
  }

  redirect(`/tutor/report/all`);
} 