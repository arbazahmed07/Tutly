import { getSubmission } from '@/actions/getCode'
import { getAssignmentSubmissions } from '@/actions/submission'
import Playground from '@/app/(dashboard)/playground/multi-file/Playground'
import Link from 'next/link'
import React from 'react'
import EvaluateSubmission from './EvaluateSubmission'

const page = async ({
  params,
  searchParams
}: {
  params: { id: string },
  searchParams?: { [key: string]: string | string[] | undefined };

}) => {

  const assignmentId = params.id
  const prNumber = parseInt(searchParams?.prNumber as string)

  const submissions = await getAssignmentSubmissions(assignmentId)

  if (!submissions) return (<div>Unauthorized</div>)

  return (
    <div className='flex w-full'>
      <div className='w-36 max-h-[90vh] m-1 overflow-y-scroll'>
        {
          Array.isArray(submissions) && submissions.map((submission) => {
            if (!submission?.submissionLink) return null
            const prNumber = submission.submissionLink.split('/').pop()
            return (
              <div
                key={submission.id}
                className={`p-2 border-b cursor-pointer hover:bg-gray-100 hover:text-blue-500
              ${prNumber == searchParams?.prNumber && 'bg-gray-100 text-blue-500'}
              `}>
                <Link href={`/assignments/${assignmentId}/evaluate?prNumber=${prNumber}`}>
                  {submission.enrolledUser.username}
                </Link>
              </div>
            )
          })
        }
      </div>
      <div className='flex-1'>
        <PlaygroundPage submissions={submissions} prNumber={prNumber} />
      </div>
    </div>
  )
}

export default page

const PlaygroundPage = async ({
  submissions,
  prNumber
}: {
  submissions: any,
  prNumber: number
}) => {
  if (!prNumber) return (<div>Invalid PR Number</div>)
  const data = await getSubmission(prNumber)

  return (
    <div>
      <EvaluateSubmission
        submission={submissions.find((submission: any) => submission?.submissionLink && (parseInt(submission?.submissionLink.split('/').pop() || "") == prNumber))}
      />
      <Playground initialFiles={data} />
    </div>
  )
}
