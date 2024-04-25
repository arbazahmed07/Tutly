import { getCreatedCourses, getEnrolledStudents } from '@/actions/courses'
import getCurrentUser from '@/actions/getCurrentUser';
import MentorAssignmentBoard from '@/components/mentorAssignmentBoard';
import { Loader } from 'lucide-react'
import React, { Suspense } from 'react'

 async function instructorAssignments() {
  const courses = await getCreatedCourses();
  const students = await getEnrolledStudents();
  const currentUser = await getCurrentUser();
  if(!currentUser) return null;

  return (
    <div className="mx-2 md:mx-14 px-2 md:px-8 py-2 flex flex-col gap-4">
      <h1 className="text-center text-xl font-bold py-2">ASSIGNMENTS</h1>
      {
        !courses ? <div className="text-center">No courses created yet!</div> :
          <Suspense fallback={<Loader />}>
            <MentorAssignmentBoard courses={courses} students={students} role={currentUser.role} />
          </Suspense>
      }
    </div>
  )
}

export default instructorAssignments