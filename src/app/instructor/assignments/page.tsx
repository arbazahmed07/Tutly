import { getCreatedCourses, getEnrolledStudents } from '@/actions/courses'
import getCurrentUser from '@/actions/getCurrentUser';
import Loader from '@/components/Loader';
import MentorAssignmentBoard from '@/components/mentorAssignmentBoard';
import Link from 'next/link';
import React, { Suspense } from 'react'

async function instructorAssignments() {
  const courses = await getCreatedCourses();
  const students = await getEnrolledStudents();
  const currentUser = await getCurrentUser();
  if(!currentUser || !courses || !students ) return <div className="text-center">Sign in to view assignments!</div>

  return (
    <div className="mx-2 md:mx-14 px-2 md:px-8 py-2 flex flex-col gap-4">
      <h1 className="text-center mt-4 text-xl font-bold py-2">ASSIGNMENTS</h1>
      {
        courses===null||courses.length===0 ? <div className="text-center">No courses created yet!</div> :
          <Suspense fallback={<Loader />}>
            <div className='flex justify-end'><Link href={"/instructor/assignments/getByAssignment"} className='text-gray-500 font-bold italic cursor-pointer'>Get by assignment?</Link></div>
            <MentorAssignmentBoard courses={courses} students={students} role={currentUser.role} />
          </Suspense>
      }
    </div>
  )
}

export default instructorAssignments