import { getAttendanceForLeaderbaord } from "@/actions/attendance";
import { totalNumberOfClasses } from "@/actions/classes";
import getCurrentUser from "@/actions/getCurrentUser";
import { getInstructorLeaderboardData, getSubmissionsCountOfAllStudents } from "@/actions/getLeaderboard";
import { getMentors } from "@/actions/mentors";
import Leaderboard from "@/components/leaderBoard";

export default async function instructorLeaderboard() {
  const data = await getInstructorLeaderboardData();
  const currentUser = await getCurrentUser();
  const mentors = await getMentors();
  const noOfSubmissions = await getSubmissionsCountOfAllStudents();
  const attendance = await getAttendanceForLeaderbaord();
  const totalClasses = await totalNumberOfClasses();
  if (data && data.sortedSubmissions && data.createdCourses) {
    const { sortedSubmissions, createdCourses } = data;

    return (
      <Leaderboard
        submissions={sortedSubmissions}
        courses={createdCourses}
        currentUser={currentUser}
        mentors={mentors}
        noOfSubmissions={noOfSubmissions}
        attendance={attendance}
        totalClasses={totalClasses} 
      />
    );
  } else {
    return null;
  }
}
