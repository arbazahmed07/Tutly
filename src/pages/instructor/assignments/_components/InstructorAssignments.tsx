import { Suspense } from "react";
import Loader from "@/components/Loader";
import MentorAssignmentBoard from "@/pages/mentor/assignments/_components/MentorAssignmentBoard";



export const InstructorAssignments = ({
  currentUser,
  courses,
  students
}: {
  currentUser: any;
  courses: any;
  students: any;
}) => {
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
              <a
                href={"/instructor/assignments/getByAssignment"}
                className="cursor-pointer font-bold italic text-gray-500"
              >
                Get by assignment?
              </a>
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
  