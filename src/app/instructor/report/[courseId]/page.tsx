import { getAllCourses } from "@/actions/courses";
import { generateReport } from "@/actions/report";
import Report, { DataItem } from "@/components/Report";
import { Course } from "@prisma/client";

const page = async ({
  params,
}: {
  params: { courseId: string };
}) => {
  const courseId = params.courseId;
  const report = await generateReport(courseId);
  const sortedData = [...report].sort((a, b) =>
    a.username.localeCompare(b.username),
  );
  const courses = await getAllCourses();

  return (
    <Report
      intiTialdata={sortedData as DataItem[]}
      allCourses={courses as Course[]}
      courseId={courseId}
    />
  );
};

export default page;
