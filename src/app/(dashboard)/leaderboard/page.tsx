import getCurrentUser from "@/actions/getCurrentUser";
import getLeaderboardData from "@/actions/getLeaderboard";
import Leaderboard from "@/components/leaderBoard";
import UnderMaintenance from "@/components/UnderMaintainance";

export default async function Page() {
  return <UnderMaintenance />;

  const data: any = await getLeaderboardData();
  const currentUser = await getCurrentUser();

  if (data?.sortedSubmissions && data.enrolledCourses) {
    const { sortedSubmissions, enrolledCourses } = data;

    return (
      <Leaderboard
        submissions={sortedSubmissions}
        courses={enrolledCourses}
        currentUser={currentUser}
      />
    );
  } else {
    return null;
  }
}
