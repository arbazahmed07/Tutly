import { getAttendanceOfAllStudents } from "@/actions/attendance";
import { getMentorCourses } from "@/actions/courses";
import getCurrentUser from "@/actions/getCurrentUser";
import AttendanceClient from "@/components/Attendancefilters";
import AttendanceTable from "@/components/AttendanceTable";

async function Filters() {
  const courses = await getMentorCourses();
  const currentUser = await getCurrentUser();
  const attendance = await getAttendanceOfAllStudents();
  if (!currentUser) return null;
  return (
    <div>
      <AttendanceClient courses={courses} role={currentUser.role} />
      <AttendanceTable studentsAttendance={attendance} />
    </div>
  );
}
export default Filters;
