import { getCreatedCourses, getMentorCourses } from "@/actions/courses";
import getCurrentUser from "@/actions/getCurrentUser";
import AttendanceClient from "@/components/Attendancefilters";

async function Filters() {
  const courses = await getMentorCourses();
  const currentUser = await getCurrentUser()
  if(!currentUser) return null
  return <AttendanceClient courses={courses} role={currentUser.role} />;
}

export default Filters;
