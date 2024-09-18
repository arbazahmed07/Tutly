import getCurrentUser from "@/actions/getCurrentUser";
import { getInstructorLeaderboardData } from "@/actions/getLeaderboard";
import { getMentors } from "@/actions/mentors";
import Leaderboard from "@/components/leaderBoard";

export default async function instructorLeaderboard() {
  const data:any = await getInstructorLeaderboardData();
  const currentUser:any= await getCurrentUser();
  const mentors = await getMentors();
  if (data && data.sortedSubmissions && data.enrolledCourses) {
    const { sortedSubmissions, enrolledCourses } = data;

    return (
      <Leaderboard
        submissions={sortedSubmissions}
        courses={enrolledCourses}
        currentUser={currentUser}
        mentors={mentors}
      />
    );
  } else {
    return null;
  }
}
