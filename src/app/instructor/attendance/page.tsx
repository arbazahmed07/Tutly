import { getCreatedCourses } from "@/actions/courses";
import AttendanceClient from "./filters";

async function Filters() {
  const courses = await getCreatedCourses();
  return <AttendanceClient courses={courses} />;
}

export default Filters;
