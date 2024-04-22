import { getAssignmentDetailsById } from "@/actions/getAssignments";
import Link from "next/link";

export default async function SubmmitAssignment({
  params,
}: {
  params: { id: string };
}) {
  const assignment = await getAssignmentDetailsById(params.id);
  return (
    <div className="mx-10 my-2">
      <h1 className="text-center p-2 bg-primary-600 rounded">
        Assignment Submission : {assignment?.title}
      </h1>
      <div className="flex items-center justify-between my-4">
        <p className="rounded p-1 px-2 bg-secondary-700">
          # {assignment?.class?.course?.title}
        </p>
        {assignment?.dueDate != null && <div className={`p-1 px-2 rounded bg-secondary-700 ${(new Date(assignment?.dueDate) > (new Date())) ? "bg-primary-600" : "bg-secondary-700"}`}>
          Last Date : {assignment?.dueDate.toISOString().split("T")[0]}
        </div>}
      </div>

      <div className="border p-2 my-2 rounded">Details</div>
      <div className="min-h-[100px]">{`${assignment?.details === null
          ? "No details given to show"
          : assignment?.details
        }`}</div>
      <div className="flex flex-col my-4 gap-4">
        <div>
          <a target="_blank" href={`${assignment?.link}`} className="text-sm text-primary-700 font-semibold">{assignment?.link}</a>
        </div>
        <div>
          <Link
            href={`/playground/html-css-js?attachmentId=${params.id}`}
          >
            {assignment?.submissions.length===0?<h1 className="bg-primary-600 inline p-2 text-sm rounded font-semibold">Submit through Playground</h1>:<h1 className="bg-primary-600 p-2 text-sm rounded font-semibold">Submit another response</h1>}
          </Link>
        </div>
      </div>
    </div>
  );
}
