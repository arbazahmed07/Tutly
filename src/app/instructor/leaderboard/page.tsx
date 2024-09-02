import getCurrentUser from "@/actions/getCurrentUser";
import { getInstructorLeaderboardData } from "@/actions/getLeaderboard";
import { getMentors } from "@/actions/mentors";
import Leaderboard from "@/components/leaderBoard";

export default async function instructorLeaderboard() {
  const data = await getInstructorLeaderboardData();
  const currentUser = await getCurrentUser();
  const mentors = await getMentors();
  if (data && data.sortedSubmissions && data.createdCourses) {
    const { sortedSubmissions, createdCourses } = data;

    return (
      <Leaderboard
        submissions={sortedSubmissions}
        courses={createdCourses}
        currentUser={currentUser}
        mentors={mentors}
      />
    );
  } else {
    return null;
  }
}
