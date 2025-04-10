import { db } from "@tutly/db";
import ResizablePanelLayout from "../../_components/ResizablePanelLayout";
import { getServerSessionOrRedirect } from "@tutly/auth";
import { redirect } from "next/navigation";

export default async function AssignmentEvaluatePage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const session = await getServerSessionOrRedirect();
  const user = session.user;

  const { id: assignmentId } = await params;
  const { submissionId, username } = await searchParams;

  if (user?.role === "STUDENT") {
    redirect(`/assignments/${assignmentId}`);
  }


  const assignment = await db.attachment.findUnique({
    where: {
      id: assignmentId,
    },
    include: {
      class: {
        include: {
          course: true,
        },
      },
    },
  });

  const assignmenttemp = await db.attachment.findUnique({
    where: {
      id: assignmentId,
    },
  });

  const submissions = await db.submission.findMany({
    where: {
      attachmentId: assignmentId,
    },
    include: {
      enrolledUser: {
        include: {
          user: true,
        },
      },
      points: true,
      assignment: true,
    },
    orderBy: {
      enrolledUser: {
        username: "asc",
      },
    },
  });

  let filteredSubmissions: any[] = [];

  if (user?.role === "INSTRUCTOR") {
    filteredSubmissions = submissions;
  }

  if (user?.role === "MENTOR") {
    filteredSubmissions = submissions.filter(
      (submission) => submission.enrolledUser.mentorUsername === user.username
    );
  }

  if (assignmenttemp?.maxSubmissions && assignmenttemp.maxSubmissions > 1) {
    const submissionCount = await db.submission.groupBy({
      by: ["enrolledUserId"],
      where: {
        attachmentId: assignmentId,
      },
      _count: {
        id: true,
      },
    });

    filteredSubmissions.forEach((submission) => {
      const submissionCountData = submissionCount.find(
        (data) => data.enrolledUserId === submission.enrolledUserId
      );
      if (submissionCountData) {
        submission.submissionCount = submissionCountData._count.id;
      }
    });

    filteredSubmissions.forEach((submission) => {
      submission.submissionIndex = 1;
      if (submission.submissionCount && submission.submissionCount > 1) {
        const submissionIndex =
          submissions
            .filter((sub) => sub.enrolledUserId === submission.enrolledUserId)
            .findIndex((sub) => sub.id === submission.id) || 0;
        submission.submissionIndex = submissionIndex + 1;
      }
    });
  }

  if (username) {
    filteredSubmissions = filteredSubmissions.filter(
      (submission: any) => submission?.enrolledUser.username === username
    );
  }

  const submission = filteredSubmissions.find(
    (submission: any) => submission?.id === submissionId
  );

  return (
    <ResizablePanelLayout
      assignmentId={assignmentId}
      assignment={assignment}
      submissions={filteredSubmissions}
      submissionId={submissionId as string}
      username={username as string}
      submission={submission}
    />
  );
} 