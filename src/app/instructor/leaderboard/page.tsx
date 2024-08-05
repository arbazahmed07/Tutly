import getCurrentUser from "@/actions/getCurrentUser";
import { getInstructorLeaderboardData, getSubmissionsCountOfAllStudents } from "@/actions/getLeaderboard";
import { getMentors } from "@/actions/mentors";
import Leaderboard from "@/components/leaderBoard";

export default async function instructorLeaderboard() {
  const data = await getInstructorLeaderboardData();
  const currentUser = await getCurrentUser();
  const mentors = await getMentors();
  const noOfSubmissions = await getSubmissionsCountOfAllStudents();
  if (data && data.sortedSubmissions && data.createdCourses) {
    const { sortedSubmissions, createdCourses } = data;

    return (
      <Leaderboard
        submissions={sortedSubmissions}
        courses={createdCourses}
        currentUser={currentUser}
        mentors={mentors}
        noOfSubmissions={noOfSubmissions}
      />
    );
  } else {
    return null;
  }
}
