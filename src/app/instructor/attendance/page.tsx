import { getAttendanceOfAllStudents } from "@/actions/attendance";
import { getEnrolledCourses } from "@/actions/courses";
import getCurrentUser from "@/actions/getCurrentUser";
import AttendanceClient from "@/components/Attendancefilters";

async function Filters() {
  const courses = await getEnrolledCourses();
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
