import { getAllCourses } from "@/actions/courses";
import getCurrentUser from "@/actions/getCurrentUser";
import CourseTabs from "@/components/courseTabs";
import "@/styles/globals.css";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const courses = await getAllCourses();
  const currentUser = await getCurrentUser();
  return (
    <div>
      <pre>{JSON.stringify(currentUser, null, 2)}</pre>
      <CourseTabs courses={courses} currentUser={currentUser} />
      {children}
    </div>
  );
}
