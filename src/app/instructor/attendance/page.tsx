import { getCreatedCourses } from "@/actions/courses";
import AttendanceClient from "@/components/Attendancefilters";

async function Filters() {
  const courses = await getCreatedCourses();
  return <AttendanceClient courses={courses} />;
}

export default Filters;
