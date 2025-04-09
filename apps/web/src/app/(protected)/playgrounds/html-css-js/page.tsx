import { getServerSessionOrRedirect } from "@/lib/auth/session";
import { db } from "@tutly/db";
import Playground from "../_components/Playground";

type SandpackFile = {
  code: string;
  hidden?: boolean;
  active?: boolean;
  readOnly?: boolean;
};

type SandpackFiles = {
  [key: string]: SandpackFile;
};

export default async function HtmlCssJsPlaygroundPage({
  searchParams,
}: {
  searchParams: Promise<{ assignmentId?: string; submissionId?: string }>;
}) {
  const session = await getServerSessionOrRedirect();
  const currentUser = session?.user;
  const { assignmentId, submissionId } = await searchParams;


  let initialFiles: SandpackFiles | undefined;

  if (submissionId) {
    const submission = await db.submission.findUnique({
      where: { id: submissionId },
      include: {
        enrolledUser: true,
        points: true,
      },
    });

    if (submission?.data) {
      initialFiles = submission.data as SandpackFiles;
    }

    const studentAccess =
      currentUser?.role === "STUDENT" && submission?.enrolledUser.username === currentUser.username;
    const mentorAccess =
      currentUser?.role === "MENTOR" && submission?.enrolledUser.mentorUsername === currentUser.username;
    const instructorAccess = currentUser?.role === "INSTRUCTOR";

    if (!studentAccess && !mentorAccess && !instructorAccess) {
      return <div>Access Denied</div>;
    }
  }

  return (
    <Playground
      currentUser={currentUser}
      assignmentId={assignmentId || ""}
      initialFiles={initialFiles}
      template="static"
    />
  );
}
