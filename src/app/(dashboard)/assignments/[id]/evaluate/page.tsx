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
  const submissionId = searchParams?.submissionId 

  const submissions = await getAssignmentSubmissions(assignmentId)

  if (!submissions) return (<div>Unauthorized</div>)

  const submission = submissions.find((submission) => submission.id == submissionId)

  return (
    <div className='flex w-full'>
      <div className='w-36 max-h-[90vh] m-1 overflow-y-scroll'>
        {
          Array.isArray(submissions) && submissions.map((submission) => {
            const id = submission.id
            return (
              <div
                key={submission.id}
                className={`p-2 border-b cursor-pointer hover:bg-gray-100 hover:text-blue-500
              ${id == searchParams?.submissionId && 'bg-gray-100 text-blue-500'}
              `}>
                <Link href={`/assignments/${assignmentId}/evaluate?submissionId=${id}`}>
                  {submission.enrolledUser.username}
                </Link>
              </div>
            )
          })
        }
      </div>
      <div className='flex-1'>
        <PlaygroundPage submission={submission}/>
      </div>
    </div>
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
