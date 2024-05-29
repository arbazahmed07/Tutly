import getCurrentUser from "@/actions/getCurrentUser";
import  { getInstructorLeaderboardData } from "@/actions/getLeaderboard";
import Leaderboard from "@/components/leaderBoard";

export default async function instructorLeaderboard() {
  const data = await getInstructorLeaderboardData();
  const currentUser = await getCurrentUser();
  if (data && data.sortedSubmissions && data.createdCourses) {

    const { sortedSubmissions, createdCourses } = data;

    return (
      <Leaderboard submissions={sortedSubmissions} courses={createdCourses} currentUser={currentUser}/>
    );

  } else {
    return null;
  }
}
