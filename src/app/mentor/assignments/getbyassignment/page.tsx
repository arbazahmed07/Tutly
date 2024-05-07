import Image from 'next/image';
import React from 'react'
import SingleAssignmentBoard from './assignmentBoard';
import { Link } from 'lucide-react';
import { getMentorCourses } from '@/actions/courses';
import { getAllAssignmentsForMentor } from '@/actions/assignments';

async function GetByAssignment() {
    // const courses = await getMentorCourses();
    const {courses,coursesWithAssignments} = await getAllAssignmentsForMentor();
  return (
    <div className="md:mx-14 md:px-8 py-2 flex flex-col gap-4">
      <div>
      <h1 className="text-center text-xl bg-gradient-to-r from-blue-600 to-sky-500 font-semibold rounded-lg m-2 py-2">Students</h1>
      {
        courses && courses.length > 0 ? (
          <>
            <SingleAssignmentBoard courses={courses} assignments={coursesWithAssignments}/>
          </>
        ) : (
          <div>
            <p className=' text-xl font-semibold mt-5 flex justify-center items-center'>
              No course is enrolled yet!
            </p>
            <Image
                src="https://i.postimg.cc/N0JMHNDw/undraw-Notify-re-65on-1-removebg-preview.png"
                height={400}
                className="m-auto"
                width={400}
                alt=""
              />
          </div>
        )
      }
      </div>
    </div>
  )
}

export default GetByAssignment;