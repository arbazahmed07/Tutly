import {
  getAllAssignmentSubmissions,
  getAssignmentSubmissions,
} from "@/actions/submission";
import Playground from "@/app/(dashboard)/playgrounds/_components/Playground";
import Link from "next/link";
import React from "react";
import EvaluateSubmission from "./EvaluateSubmission";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { getAllAssignments, getAssignmentDetails } from "@/actions/assignments";
import NoDataFound from "@/components/NoDataFound";
import SortBy from "./SortBy";
import FilterBy from "./FilterBy";
import type { submission, Attachment } from "@prisma/client";

const page = async ({
  searchParams,
}: {
  params: { id: string };
  searchParams?: Record<string, string | string[] | undefined>;
}) => {
  const submissionId = searchParams?.submissionId;
  const username = searchParams?.username as string;

  const assignments = await getAllAssignments();

  const assignmentId = searchParams?.assignmentId as string;

  const assignment = assignmentId
    ? await getAssignmentDetails(assignmentId)
    : null;

  let submissions = assignmentId
    ? await getAssignmentSubmissions(assignmentId)
    : await getAllAssignmentSubmissions();

  if (username) {
    submissions =
      submissions &&
      submissions.filter(
        (submission: any) => submission?.enrolledUser.username == username,
      );
  }

  if (!submissions) return <div>Unauthorized</div>;

  const submission = submissions.find(
    (submission: any) => submission?.id == submissionId,
  );

  return (
    <ResizablePanelGroup direction="horizontal" className="max-h-[95vh] w-full">
      <ResizablePanel defaultSize={15}>
        <SubmissionList
          assignmentId={assignmentId}
          assignment={assignment}
          submissions={submissions}
          searchParams={searchParams}
          username={username}
          assignments={assignments}
        />
      </ResizablePanel>
      <ResizableHandle withHandle />
      <ResizablePanel defaultSize={85}>
        <PlaygroundPage submission={submission} />
      </ResizablePanel>
    </ResizablePanelGroup>
  );
};

export default page;

const PlaygroundPage = async ({ submission }: { submission: any }) => {
  if (!submission) return <NoDataFound message="No submission found" />;
  return (
    <div>
      <EvaluateSubmission submission={submission} />
      {submission.assignment.submissionMode === "EXTERNAL_LINK" ? (
        <iframe
          src={submission.submissionLink ?? ""}
          allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
          sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
          className="h-[93vh] w-full"
        />
      ) : (
        <Playground initialFiles={submission.data} />
      )}
    </div>
  );
};

const SubmissionList = ({
  assignmentId,
  assignment,
  submissions,
  searchParams,
  username,
  assignments,
}: {
  assignmentId: string;
  assignment: any;
  submissions: submission[];
  searchParams: any;
  username: string;
  assignments: Attachment[];
}) => {
  const sortBy = searchParams?.sortBy || "username";

  submissions = submissions.sort((a: any, b: any) => {
    if (sortBy == "username") {
      return a.enrolledUser.username.localeCompare(b.enrolledUser.username);
    } else if (sortBy == "points") {
      return b.points.length - a.points.length;
    } else if (sortBy == "submissionCount") {
      return a.submissionCount - b.submissionCount;
    } else if (sortBy == "submissionIndex") {
      return a.submissionIndex - b.submissionIndex;
    } else if (sortBy == "submissionDate") {
      return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
    }
  });

  return (
    <div className="h-[93vh] overflow-y-scroll">
      <FilterBy assignments={assignments} searchParams={searchParams} />
      <SortBy searchParams={searchParams} />
      <div className="border-b p-2">
        <p className="text-sm font-semibold">
          Submissions{assignment && ` (max:${assignment?.maxSubmissions} )`}
        </p>
        <p className="text-xs text-slate-600">
          {
            submissions.filter(
              (submission: any) => submission?.points.length == 0,
            ).length
          }{" "}
          un-evaluated / {submissions.length} total
        </p>
      </div>
      <div>
        {Array.isArray(submissions) &&
          submissions.map((singleSubmission: any, index) => {
            if (!singleSubmission) return null;
            let hrefLink = username
              ? `/assignments/evaluate?username=${singleSubmission.enrolledUser.username}&submissionId=${singleSubmission.id}`
              : `/assignments/evaluate?submissionId=${singleSubmission.id}`;

            const sortBy = searchParams?.sortBy;

            if (sortBy) {
              if (username) {
                hrefLink = `/assignments/evaluate?username=${singleSubmission.enrolledUser.username}&submissionId=${singleSubmission.id}&sortBy=${sortBy}`;
              } else {
                hrefLink = `/assignments/evaluate?submissionId=${singleSubmission.id}&sortBy=${sortBy}`;
              }
            }

            if (assignmentId) {
              hrefLink = `${hrefLink}&assignmentId=${assignmentId}`;
            }

            return (
              <Link key={index} href={hrefLink}>
                <div
                  className={`cursor-pointer border-b p-2 hover:bg-gray-100 hover:text-blue-500 ${singleSubmission.id == searchParams?.submissionId && "bg-gray-100 text-blue-500"} ${singleSubmission.points.length > 0 && "text-green-500"} `}
                >
                  <p className="text-sm">
                    {singleSubmission.enrolledUser.username}
                    {singleSubmission.submissionCount > 1 &&
                      ` (${singleSubmission.submissionIndex}/${singleSubmission.submissionCount})`}
                  </p>
                  <p className="text-xs text-slate-600">
                    {singleSubmission.enrolledUser.user.name}
                  </p>
                  {!assignment && (
                    <p className="text-xs text-slate-600">
                      {singleSubmission?.assignment?.title}
                    </p>
                  )}
                </div>
              </Link>
            );
          })}
      </div>
    </div>
  );
};
