import {
  getAllStudents,
  getMentorCourses,
  getMentorStudents,
} from "@/actions/courses";
import MentorAssignmentBoard from "@/components/mentorAssignmentBoard";
import NoDataFound from "@/components/NoDataFound";
import Image from "next/image";
import Link from "next/link";
export default async function mentorAssignments() {
  const students = await getAllStudents();
  const courses = await getMentorCourses();
  if (!courses || !students)
    return <div className="text-center">Sign in to view assignments!</div>;

  return (
    <div className="flex flex-col gap-4 py-2 md:mx-14 md:px-8">
      <div>
        <h1 className="m-2 rounded-lg bg-gradient-to-r from-blue-600 to-sky-500 py-2 text-center text-xl font-semibold">
          Students
        </h1>
        {courses && courses.length > 0 ? (
          <>
            <div className="flex justify-end px-2">
              <Link
                href={"/mentor/assignments/getbyassignment"}
                className="text-sm font-semibold italic text-secondary-500"
              >
                Get by assignment?
              </Link>
            </div>
            <MentorAssignmentBoard students={students} courses={courses} />
          </>
        ) : (
          <NoDataFound message="No students found!" />
        )}
      </div>
    </div>
  );
}
