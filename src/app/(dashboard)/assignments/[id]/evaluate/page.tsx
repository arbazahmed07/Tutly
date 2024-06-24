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
  const username = searchParams?.username

  let submissions = await getAssignmentSubmissions(assignmentId)

  if (username) {
    submissions = submissions && submissions.filter((submission) => submission?.enrolledUser.username == username)
  }

  if (!submissions) return (<div>Unauthorized</div>)

  const submission = submissions.find((submission) => submission?.id == submissionId)

  return (
    <div className='flex w-full'>
      <div className='w-36 max-h-[90vh] m-1 overflow-y-scroll'>
        {
          Array.isArray(submissions) && submissions.map((singleSubmission, index) => {
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
      <div className='flex-1'>
        <PlaygroundPage submission={submission} />
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