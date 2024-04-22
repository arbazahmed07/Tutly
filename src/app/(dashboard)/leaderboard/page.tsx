import getLeaderboardData from "@/actions/getLeaderboard";
import Leaderboard from "@/components/leaderBoard";

export default async function Page() {
  const { sortedSubmissions, enrolledCourses }: any = await getLeaderboardData();

  if (!sortedSubmissions || !enrolledCourses) {
    return (
      <div>
        No courses enrolled!
      </div>
    );
  }
  return (
    <Leaderboard submissions={sortedSubmissions} courses={enrolledCourses} />
  );
}
