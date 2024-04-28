import { getCreatedCourses, getEnrolledStudents } from '@/actions/courses'
import getCurrentUser from '@/actions/getCurrentUser';
import Loader from '@/components/Loader';
import MentorAssignmentBoard from '@/components/mentorAssignmentBoard';
import React, { Suspense } from 'react'
import { getInstructorLeaderboardData } from '@/actions/getLeaderboard';

 async function instructorAssignments() {
  const courses = await getCreatedCourses();
  const students = await getEnrolledStudents();
  const currentUser = await getCurrentUser();
  const points = await getInstructorLeaderboardData();
  if(!currentUser || !courses || !students ) return <div className="text-center">Sign in to view assignments!</div>

  return (
    <div className="mx-2 md:mx-14 px-2 md:px-8 py-2 flex flex-col gap-4">
      <h1 className="text-center text-xl font-bold py-2">ASSIGNMENTS</h1>
      {
        courses===null||courses.length===0 ? <div className="text-center">No courses created yet!</div> :
          <Suspense fallback={<Loader />}>
            <MentorAssignmentBoard courses={courses} points = {points} students={students} role={currentUser.role} />
            <div className=' grid grid-cols-2 gap-2'>
              <div>
                <pre>
                  {/* {JSON.stringify(courses, null, 2)} */}
                </pre>
              </div>
              <div>
                <pre>
                  {JSON.stringify(points, null, 2)}
                </pre>
              </div>
            </div>
          </Suspense>
      }
    </div>
  )
}

export default instructorAssignments