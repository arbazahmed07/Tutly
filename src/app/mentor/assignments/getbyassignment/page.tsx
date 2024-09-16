import Image from "next/image";
import React from "react";
import SingleAssignmentBoard from "./assignmentBoard";
import { getAllAssignmentsForMentor } from "@/actions/assignments";
import NoDataFound from "@/components/NoDataFound";


enum Role {
  Mentor = "MENTOR",
  Student = "STUDENT",
  Instructor = "INSTRUCTOR",
}



// fix the type of the response object
interface MentorCoursesResponse {
  courses: {
    id: string;
    createdBy: {
      id: string;
      name: string | null;
      username: string;
      email: string | null;
      image: string | null;
      password: string | null;
      mobile: string | null;
      role: Role;
      lastLogin: Date | null;
      emailVerified: Date | null;
      oneTimePassword: string | null;
      createdAt: Date;
      updatedAt: Date;
    };
    classes: {
      id: string;
      title: string;
      videoId: string;
      courseId: string;
      folderId: string;
      createdAt: Date;
      updatedAt: Date;
    }[];
    _count: {
      classes: number;
    };
  }[] | null;
  coursesWithAssignments: {
    id: string;
    class: {
      attachments: {
        id: string;
        title: string;
        submissions: {
          points: number;
        }[];
        createdAt: string;
      }[];
    }[];
  }[];
}




async function GetByAssignment() {
  // const courses = await getMentorCourses();
    const { courses, coursesWithAssignments }: MentorCoursesResponse = await getAllAssignmentsForMentor();
  
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
