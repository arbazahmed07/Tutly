import { getEnrolledCourses } from "@/actions/courses";
import CoursesTabs from "@/components/courseTabs";

export default async function Layout({ children }: { children: React.ReactNode }) {
  const courses = await getEnrolledCourses();
  return (
    <>
      <CoursesTabs courses={courses} role="MENTOR" />
      <div>{children}</div>
    </>
  );
}
