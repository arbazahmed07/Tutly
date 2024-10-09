import { getAttendanceOfAllStudents } from "@/actions/attendance";
import { getMentorCourses } from "@/actions/courses";
import getCurrentUser from "@/actions/getCurrentUser";
import AttendanceClient from "@/components/Attendancefilters";

async function Filters() {
  const courses = await getMentorCourses();
  const currentUser = await getCurrentUser();
  const attendance = await getAttendanceOfAllStudents();
  if (!currentUser) return null;
  return (
    <div>
      <AttendanceClient
        attendance={attendance}
        courses={courses}
        role={currentUser.role}
      />
    </div>
  );
}
export default Filters;
