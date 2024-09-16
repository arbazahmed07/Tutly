import Image from "next/image";
import React from "react";
import SingleAssignmentBoard from "./assignmentBoard";
import { Link } from "lucide-react";
import { getMentorCourses } from "@/actions/courses";
import { getAllAssignmentsForMentor } from "@/actions/assignments";
import NoDataFound from "@/components/NoDataFound";

async function GetByAssignment() {
  // const courses = await getMentorCourses();
  const { courses, coursesWithAssignments } =
    await getAllAssignmentsForMentor();
  return (
    <div className="flex flex-col gap-4 py-2 md:mx-14 md:px-8">
      <div>
        <h1 className="m-2 rounded-lg bg-gradient-to-r from-blue-600 to-sky-500 py-2 text-center text-xl font-semibold">
          Assignments
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
