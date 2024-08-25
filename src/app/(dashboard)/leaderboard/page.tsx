import { getAttendanceForLeaderbaord } from "@/actions/attendance";
import { totalNumberOfClasses } from "@/actions/classes";
import getCurrentUser from "@/actions/getCurrentUser";
import getLeaderboardData, { getSubmissionsCountOfAllStudents } from "@/actions/getLeaderboard";
import Leaderboard from "@/components/leaderBoard";
import UnderMaintenance from "@/components/UnderMaintainance";

export default async function Page() {
  const data: any = await getLeaderboardData();
  const currentUser = await getCurrentUser();
  const noOfSubmissions = await getSubmissionsCountOfAllStudents();
  const attendance = await getAttendanceForLeaderbaord();
  const totalClasses = await totalNumberOfClasses();

  if (data && data.sortedSubmissions && data.enrolledCourses) {

    const { sortedSubmissions, enrolledCourses } = data;

    return (
      <UnderMaintenance />
      // <Leaderboard submissions={sortedSubmissions} courses={enrolledCourses} currentUser={currentUser} noOfSubmissions={noOfSubmissions} attendance={attendance} totalClasses={totalClasses}/>
    );

  } else {
    return null;
  }
}
