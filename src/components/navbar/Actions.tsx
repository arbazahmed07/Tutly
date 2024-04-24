"use client"

import React, { useEffect } from 'react'
import SubmitAssignment from './NavBarActions/SubmitAssignment'
import { usePathname, useSearchParams } from 'next/navigation'

const Actions = ({
  currentUser
}: {
  currentUser: any
}) => {

  const pathname = usePathname();
  const params = useSearchParams();
  const assignmentId = params.get('assignmentId');

  useEffect(() => {
    if (!assignmentId) return;
  }, [assignmentId]);

  return (
    <div>
      {assignmentId && pathname.startsWith('/playground/') && currentUser?.role === 'STUDENT' && (<SubmitAssignment currentUser={currentUser} assignmentId={assignmentId} />)}
    </div>
  )
}

export default Actions


