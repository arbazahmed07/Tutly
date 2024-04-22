import { getEnrolledCourses } from "@/actions/courses";
import getLeaderboardData from "@/actions/getLeaderboard";
import Leaderboard from "@/components/leaderBoard";

export default async function Page() {
  const submissions = await getLeaderboardData();
  const courses = await getEnrolledCourses();
  return (
    <div>
      <div>
        {
          !submissions || !courses ? (
            <div>
              No courses enrolled!
            </div>
          ) : <Leaderboard submissions={submissions} courses={courses} />
        }
      </div>
    </div>
  );
}
