

import {getEnrolledCoursesDoubts} from "@/actions/doubts";
import CommunityForum from "@/components/Community";
import getCurrentUser from "@/actions/getCurrentUser";

const CommunityPage = async () => {

  const allDoubts = await getEnrolledCoursesDoubts();
  const currentuser = await getCurrentUser();

  return (
    <main className="flex flex-col mt-5 items-center justify-center">
      <CommunityForum allDoubts={allDoubts}  currentUser={currentuser}  />
    </main>
  );
}

export default CommunityPage
