import React, { Suspense } from 'react'
const Playground = dynamic(() => import('./Playground'))
import getCurrentUser from '@/actions/getCurrentUser'
import dynamic from 'next/dynamic'

const page = async ({
  searchParams
}: {
  searchParams?: { [key: string]: string | string[] | undefined };
}) => {
  const currentUser = await getCurrentUser();
  const assignmentId = searchParams?.assignmentId as string;
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Playground currentUser={currentUser} assignmentId={assignmentId} />
    </Suspense>
  )
}

export default page