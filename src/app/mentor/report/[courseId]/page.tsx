import React from "react";
import Report, { DataItem } from "@/components/Report";
import { generateReport } from "@/actions/report";
import { getAllCourses } from "@/actions/courses";
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
      isMentor={true}
      courseId={courseId}
    />
  );
};

export default page;
