import React, { Suspense } from 'react'
import NewCoursePage from './_components/NewAttachmentPage'

const page = async () => {

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <NewCoursePage />
    </Suspense>
  )
}

export default page