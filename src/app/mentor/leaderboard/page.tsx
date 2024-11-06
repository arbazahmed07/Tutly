import { getMentorLeaderboardData } from "@/actions/getLeaderboard";
import Leaderboard from "@/components/leaderBoard";

export default async function mentorLeaderboard() {
  const data: any = await getMentorLeaderboardData();
  if (data?.sortedSubmissions && data.enrolledCourses) {
    const { sortedSubmissions, enrolledCourses } = data;
    
    return (
      <Leaderboard
        submissions={sortedSubmissions}
        courses={enrolledCourses}
        currentUser={data.currentUser}
      />
    );
  } else {
    return <div>No course enrolled</div>
  }
}
