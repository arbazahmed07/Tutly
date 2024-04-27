import { getMentorCourses } from "@/actions/courses";
import AttendanceClient from "./filters";

async function Filters() {
  const courses = await getMentorCourses();
  return <AttendanceClient courses={courses} />;
}

export default Filters;
