import { getAssignmentDetailsByUserId } from "@/actions/getAssignments";
import getCurrentUser from "@/actions/getCurrentUser";

import Link from "next/link";

export default async function SubmmitAssignment({
  params,
  searchParams
}: {
  params: { id: string };
  searchParams?: { [key: string]: string | string[] | undefined };
}) {
  const currentUser = await getCurrentUser();
  if (!currentUser) {
    return null;
  }
  const userId = searchParams?.userId as string || currentUser.id;
  const assignment = await getAssignmentDetailsByUserId(params.id,userId);

  return (
    <div className="mx-2 md:mx-10 my-2">
      <h1 className="text-center p-2 bg-gradient-to-l from-blue-500 to-blue-600 rounded text-sm md:text-lg font-medium">
        Assignment Submission : {assignment?.title}
      </h1>
      <div className="flex items-center justify-between my-4 text-xs md:text-sm font-medium">
        <p className="rounded p-1 px-2 bg-secondary-700">
          # {assignment?.class?.course?.title}
        </p>
        {assignment?.dueDate != null && <div className={`p-1 px-2 rounded bg-secondary-700 ${(new Date(assignment?.dueDate) > (new Date())) ? "bg-primary-600" : "bg-secondary-700"}`}>
          Last Date : {assignment?.dueDate.toISOString().split("T")[0]}
        </div>}
      </div>

      <div className="border p-2 my-2 rounded">Details</div>
      <div className="my-8">{`${assignment?.details === null
        ? "No details given to show"
        : assignment?.details
        }`}</div>
      <div className="flex flex-col my-4 gap-4">
        <div>
          <a target="_blank" href={`${assignment?.link}`} className="text-sm text-blue-400 fo4t-semibold break-words">{assignment?.link}</a>
        </div>
        <div>
          <Link
            hidden={currentUser?.role === "MENTOR" || currentUser?.role === "INSTRUCTOR"}
            href={`/playground/html-css-js?assignmentId=${params.id}`}
          >
            {assignment?.submissions.length === 0 ? <h1 className="bg-blue-600 inline p-2 text-sm rounded font-semibold">Submit through Playground</h1> : <h1 className="bg-primary-600 p-2 text-sm rounded font-semibold">Submit another response</h1>}
          </Link>
        </div>
        <pre className="bg-secondary-700 p-2 rounded text-wrap">
          {JSON.stringify(assignment, null, 2)}
        </pre>
      </div>
    </div>
  );
}
