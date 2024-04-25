import getLeaderboardData, { getInstructorLeaderboardData } from "@/actions/getLeaderboard";
import Leaderboard from "@/components/leaderBoard";

export default async function instructorLeaderboard() {
  const data = await getInstructorLeaderboardData();
  if (data && data.sortedSubmissions && data.createdCourses) {

    const { sortedSubmissions, createdCourses } = data;

    return (
      <Leaderboard submissions={sortedSubmissions} courses={createdCourses} />
    );

  } else {
    return null;
  }
}
