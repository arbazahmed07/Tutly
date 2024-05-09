import {
  getAllAssignmentDetailsBy,
  getAllAssignmentDetailsForInstructor,
  getAssignmentDetailsByUserId,
} from "@/actions/assignments";
import getCurrentUser from "@/actions/getCurrentUser";
import AssignmentPage from "./AssignmentPage";

export default async function SubmmitAssignment({
  params,
  searchParams,
}: {
  params: { id: string };
  searchParams?: { [key: string]: string | string[] | undefined };
}) {
  const currentUser = await getCurrentUser();
  if (!currentUser) {
    return null;
  }
  const userId = (searchParams?.userId as string) || currentUser.id;
  const assignment = await getAssignmentDetailsByUserId(params.id, userId);
  let assignments;
  if (currentUser.role === "INSTRUCTOR") {
    assignments = await getAllAssignmentDetailsForInstructor(params.id);
  } else {
    assignments = await getAllAssignmentDetailsBy(params.id);
  }

  return (
    <AssignmentPage
      assignment={assignment}
      currentUser={currentUser}
      params={params}
      assignments={assignments}
    />
  );
}
