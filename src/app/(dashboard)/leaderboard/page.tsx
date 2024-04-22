import getLeaderboardData from "@/actions/getLeaderboard";
import Leaderboard from "@/components/leaderBoard";

export default async function Page() {
  const {sortedSubmissions, enrolledCourses} = await getLeaderboardData();
  return (
    <div>
      <div>
        {
          !sortedSubmissions || !enrolledCourses ? (
            <div>
              No courses enrolled!
            </div>
          ) : <Leaderboard submissions={sortedSubmissions} courses={enrolledCourses} />
        }
      </div>
    </div>
  );
}
