import { getAllCourses } from "@/actions/courses";
import CourseTabs from "@/components/courseTabs";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const courses = await getAllCourses();
  return (
    <div>
      <CourseTabs courses={courses} role="STUDENT" />
      {children}
    </div>
  );
}
