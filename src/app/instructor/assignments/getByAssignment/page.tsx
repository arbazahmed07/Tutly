import Image from "next/image";
import React from "react";
import { getAllAssignmentsForInstructor } from "@/actions/assignments";
import SingleAssignmentBoard from "@/app/mentor/assignments/getbyassignment/assignmentBoard";
import NoDataFound from "@/components/NoDataFound";

async function GetByAssignment() {
  const { courses, coursesWithAssignments } =
    await getAllAssignmentsForInstructor();
  // return <pre>{JSON.stringify(courses)}</pre>
  return (
    <div className="md:mx-14 md:px-8 py-2 flex flex-col gap-4">
      <div>
        <h1 className="text-center text-xl bg-gradient-to-r from-blue-600 to-sky-500 font-semibold rounded-lg m-2 py-2">
          Students
        </h1>
        {courses && courses.length > 0 ? (
          <>
            <SingleAssignmentBoard
              courses={courses}
              assignments={coursesWithAssignments}
            />
          </>
        ) : (
          <NoDataFound message="No students found!" />
        )}
      </div>
    </div>
  );
}

export default GetByAssignment;
