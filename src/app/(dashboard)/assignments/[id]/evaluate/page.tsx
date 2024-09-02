import { getAssignmentSubmissions } from '@/actions/submission'
import Playground from '@/app/(dashboard)/playgrounds/_components/Playground'
import Link from 'next/link'
import React from 'react'
import EvaluateSubmission from './EvaluateSubmission'
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from '@/components/ui/resizable'
import { getAssignmentDetails } from '@/actions/assignments'

const page = async ({
  params,
  searchParams
}: {
  params: { id: string },
  searchParams?: { [key: string]: string | string[] | undefined };
}) => {

  const assignmentId = params.id
  const submissionId = searchParams?.submissionId
  const username = searchParams?.username as string

  const assignment = await getAssignmentDetails(assignmentId)

  if (!assignment) return (<div>Unauthorized</div>)

  let submissions = await getAssignmentSubmissions(assignmentId)

  if (username) {
    submissions = submissions && submissions.filter((submission:any) => submission?.enrolledUser.username == username)
  }

  if (!submissions) return (<div>Unauthorized</div>)

  const submission = submissions.find((submission:any) => submission?.id == submissionId);

  return (
    <ResizablePanelGroup
      direction="horizontal"
      className='max-h-[95vh] w-full'
    >
      <ResizablePanel
        defaultSize={15}
      >
          <SubmissionList
            assignmentId={assignmentId}
            assignment={assignment}
            submissions={submissions}
            searchParams={searchParams}
            username={username}
          />
      </ResizablePanel>
      <ResizableHandle withHandle />
      <ResizablePanel
        defaultSize={85}
      >
        <PlaygroundPage submission={submission} />
      </ResizablePanel>
    </ResizablePanelGroup>
  )
}

export default page

const PlaygroundPage = async ({
  submission
}: {
  submission: any,
}) => {
  if (!submission) return (<div>No data found</div>)
  return (
    <div>
      <EvaluateSubmission
        submission={submission}
      />
      <Playground initialFiles={submission.data} />
    </div>
  )
}

const SubmissionList = ({
  assignmentId,
  assignment,
  submissions,
  searchParams,
  username
}: {
  assignmentId: string,
  assignment: any,
  submissions: any,
  searchParams: any,
  username: string
}) => {
  return (
    <div className='overflow-y-scroll max-h-[90vh]'>
      <div className='p-2 border-b'>
        <p className='text-sm font-semibold'>Submissions (max:{assignment.maxSubmissions} )</p>
        <p className='text-xs text-slate-600'>
          {submissions.filter((submission:any) => submission?.points.length == 0).length} un-evaluated / {submissions.length} total
        </p>
      </div>

      {
        Array.isArray(submissions) && submissions.map((singleSubmission: any, index) => {
          if (!singleSubmission) return null
          const hrefLink = username ? `/assignments/${assignmentId}/evaluate?username=${singleSubmission.enrolledUser.username}&submissionId=${singleSubmission.id}` : `/assignments/${assignmentId}/evaluate?submissionId=${singleSubmission.id}`
          return (
            <Link
              key={index} href={hrefLink}>
              <div
                className={`p-2 border-b cursor-pointer hover:bg-gray-100 hover:text-blue-500
              ${singleSubmission.id == searchParams?.submissionId && 'bg-gray-100 text-blue-500'}
              ${singleSubmission.points.length > 0 && 'text-green-500'}
              `}>
                <p className='text-sm'>
                  {singleSubmission.enrolledUser.username}
                  {
                    singleSubmission.submissionCount > 1 &&
                    ` (${singleSubmission.submissionIndex}/${singleSubmission.submissionCount})`
                  }
                </p>
                <p className='text-xs text-slate-600'>
                  {singleSubmission.enrolledUser.user.name}
                </p>
              </div>
            </Link>
          )
        })
      }
    </div>
  )
}