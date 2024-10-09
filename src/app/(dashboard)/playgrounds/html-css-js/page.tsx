import React, { Suspense } from "react";
import Playground from "../_components/Playground";
import getCurrentUser from "@/actions/getCurrentUser";
import { getSubmissionById } from "@/actions/submission";
import { type SandpackFiles } from "@codesandbox/sandpack-react";

const page = async ({
  searchParams,
}: {
  searchParams?: Record<string, string | string[] | undefined>;
}) => {
  const currentUser = await getCurrentUser();
  const assignmentId = searchParams?.assignmentId as string;
  const submissionId = searchParams?.submissionId as string;
  const submission = submissionId
    ? await getSubmissionById(submissionId)
    : null;
  const initialFiles = submission?.data as SandpackFiles;
  if (submissionId && !submission) {
    return <div>Submission not found</div>;
  }
  if (!currentUser) {
    return <div>Unauthorized</div>;
  }

  const studentAccess =
    currentUser.role === "STUDENT" &&
    submission?.enrolledUser.username === currentUser.username;
  const mentorAccess =
    currentUser.role === "MENTOR" &&
    submission?.enrolledUser.mentorUsername === currentUser.username;
  const instrctorAccess = currentUser.role === "INSTRUCTOR";

  if (!studentAccess && !mentorAccess && !instrctorAccess && submissionId) {
    return <div>Unauthorized</div>;
  }

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Playground
        currentUser={currentUser}
        assignmentId={assignmentId}
        initialFiles={initialFiles}
      />
    </Suspense>
  );
};

export default page;
