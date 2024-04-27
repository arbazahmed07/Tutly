import React, { Suspense } from 'react'
import NewCoursePage from './_components/NewAttachmentPage'
import Loader from '@/components/Loader'

const page = async () => {

  return (
    <Suspense fallback ={<Loader/> }  >
      <NewCoursePage />
    </Suspense>
  )
}

export default page