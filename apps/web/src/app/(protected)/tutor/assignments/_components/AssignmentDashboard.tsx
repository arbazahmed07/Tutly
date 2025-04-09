"use client";

import { Suspense } from "react";
import Link from "next/link";
import type { Course, User } from "@prisma/client";

import MentorAssignmentBoard from "./MentorAssignmentBoard";
import type { SessionUser } from "@/lib/auth/session";

type CourseWithRelations = Course & {
  classes: {
    id: string;
    createdAt: Date;
  }[];
  createdBy: {
    id: string;
    username: string;
    name: string;
    image: string | null;
    email: string | null;
    role: string;
    createdAt: Date;
    updatedAt: Date;
  };
  _count: {
    classes: number;
  };
  courseAdmins: {
    id: string;
    username: string;
    name: string;
    image: string | null;
    email: string | null;
    role: string;
    createdAt: Date;
    updatedAt: Date;
  }[];
};

type StudentWithRelations = User & {
  course: Course[];
  enrolledUsers: {
    courseId: string;
    mentorUsername: string;
  }[];
};

const AssignmentDashboard = ({
  currentUser,
  courses,
  students,
}: {
  currentUser: SessionUser;
  courses: CourseWithRelations[];
  students: StudentWithRelations[];
}) => {
  if (!currentUser || !courses || !students)
    return <div className="text-center">Sign in to view assignments!</div>;

  return (
    <div className="mx-2 flex flex-col gap-4 px-2 py-2 md:mx-14 md:px-8">
      <h1 className="mt-4 py-2 text-center text-xl font-bold">ASSIGNMENTS</h1>
      {courses === null || courses.length === 0 ? (
        <div className="text-center">No courses available!</div>
      ) : (
        <Suspense fallback={<h1> Loading...</h1>}>
          <div className="flex justify-end">
            {currentUser.role !== "STUDENT" && (
              <Link
                href="/tutor/assignments/getByAssignment"
                className="cursor-pointer font-bold italic text-gray-500"
              >
                Get by assignment?
              </Link>
            )}
          </div>
          <MentorAssignmentBoard
            courses={courses}
            students={students}
            role={currentUser.role}
            currentUser={currentUser}
          />
        </Suspense>
      )}
    </div>
  );
};

export default AssignmentDashboard;
