import {
  getAttendanceForLeaderbaord,
  getAttendanceOfStudent,
} from "@/actions/attendance";
import { totalNumberOfClasses } from "@/actions/classes";
import { getMentorCourses } from "@/actions/courses";
import {
  getMentorLeaderboardData,
  getSubmissionsCountOfAllStudents,
} from "@/actions/getLeaderboard";
import Leaderboard from "@/components/leaderBoard";

export default async function mentorLeaderboard() {
  const data = await getMentorLeaderboardData();
  const noOfSubmissions = await getSubmissionsCountOfAllStudents();
  const attendance = await getAttendanceForLeaderbaord();
  const totalClasses = await totalNumberOfClasses();
  <pre>{JSON.stringify(data, null, 2)}</pre>;
  if (data && data.sortedSubmissions && data.createdCourses) {
    const { sortedSubmissions, createdCourses } = data;

    return (
      <Leaderboard
        submissions={sortedSubmissions}
        courses={createdCourses}
        currentUser={data.currentUser}
        noOfSubmissions={noOfSubmissions}
        attendance={attendance}
        totalClasses={totalClasses}
      />
    );
  } else {
    return null;
  }
}
