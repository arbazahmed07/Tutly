import { getEnrolledCoursesDoubts } from "@/actions/doubts";
import CommunityForum from "@/components/Community";
import getCurrentUser from "@/actions/getCurrentUser";

const CommunityPage = async () => {
  const allDoubts = await getEnrolledCoursesDoubts();
  const currentuser = await getCurrentUser();
  if (!currentuser)
    return <div className="text-center">Sign in to view doubts!</div>;
  if (!allDoubts) return <div className="text-center">No doubts found!</div>;

  return (
    <main className="m-2 mx-5 flex flex-col items-center justify-center">
      <CommunityForum allDoubts={allDoubts} currentUser={currentuser} />
    </main>
  );
};

export default CommunityPage;
