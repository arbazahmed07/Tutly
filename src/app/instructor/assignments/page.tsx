import {
  getAllStudents,
  getEnrolledCourses,
  getEnrolledStudents,
} from "@/actions/courses";
import getCurrentUser from "@/actions/getCurrentUser";
import Loader from "@/components/Loader";
import MentorAssignmentBoard from "@/components/mentorAssignmentBoard";
import Link from "next/link";
import React, { Suspense } from "react";

async function instructorAssignments() {
  const courses = await getEnrolledCourses();
  const students = await getAllStudents();
  const currentUser = await getCurrentUser();
  if (!currentUser || !courses || !students)
    return <div className="text-center">Sign in to view assignments!</div>;

  return (
    <div className="mx-2 flex flex-col gap-4 px-2 py-2 md:mx-14 md:px-8">
      <h1 className="mt-4 py-2 text-center text-xl font-bold">ASSIGNMENTS</h1>
      {courses === null || courses.length === 0 ? (
        <div className="text-center">No courses created yet!</div>
      ) : (
        <Suspense fallback={<Loader />}>
          <div className="flex justify-end">
            <Link
              href={"/instructor/assignments/getByAssignment"}
              className="cursor-pointer font-bold italic text-gray-500"
            >
              Get by assignment?
            </Link>
          </div>
          <MentorAssignmentBoard
            courses={courses}
            students={students}
            role={currentUser.role}
          />
        </Suspense>
      )}
    </div>
  );
}

export default instructorAssignments;
