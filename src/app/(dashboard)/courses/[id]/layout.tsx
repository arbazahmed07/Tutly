import { getCourseByCourseId, getCourseClasses } from "@/actions/courses";
import getCurrentUser from "@/actions/getCurrentUser";
import ClassSidebar from "@/components/classSidebar";
import "@/styles/globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Classes",
};

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: any;
}>) {
  const classes = await getCourseClasses(params.id);
  const currentUser = await getCurrentUser();
  const course = await getCourseByCourseId(params.id);
  if (!currentUser || !course) return null;

  const isCourseAdmin =
    currentUser?.adminForCourses?.some((course) => course.id === params.id) ||
    false;

  return (
    <>
      <div className="flex w-full">
        <ClassSidebar
          params={params}
          currentUser={currentUser}
          title={course?.title}
          classes={classes}
          isCourseAdmin={isCourseAdmin}
        />
        <div className="flex-1">{children}</div>
      </div>
    </>
  );
}
