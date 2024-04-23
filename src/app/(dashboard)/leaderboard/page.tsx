import getLeaderboardData from "@/actions/getLeaderboard";
import Leaderboard from "@/components/leaderBoard";

export default async function Page() {
  const data: any = await getLeaderboardData();

  if (data && data.sortedSubmissions && data.enrolledCourses) {

    const { sortedSubmissions, enrolledCourses } = data;

    return (
      <Leaderboard submissions={sortedSubmissions} courses={enrolledCourses} />
    );

  } else {
    return null;
  }
}
