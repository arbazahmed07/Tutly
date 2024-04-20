import { getEnrolledCourses } from "@/actions/courses";
import getLeaderboardData from "@/actions/getLeaderboard";
import Leaderboard from "@/components/leaderBoard";

export default async function Page() {
  const assignments = await getLeaderboardData();
  const courses = await getEnrolledCourses();

  return (
    <div>
      <div>
        <Leaderboard assignments={assignments} courses={courses}/>
      </div>
    </div>
  );
}
