import { getMentorCourses, getMentorStudents } from "@/actions/courses";
import MentorAssignmentBoard from "@/components/mentorAssignmentBoard";
import NoDataFound from "@/components/NoDataFound";
import Image from "next/image";
import Link from "next/link";
export default async function mentorAssignments() {
  const students = await getMentorStudents();
  const courses = await getMentorCourses();
  if (!courses || !students) return <div className="text-center">Sign in to view assignments!</div>

  return (
    <div className="md:mx-14 md:px-8 py-2 flex flex-col gap-4">
      <div>
        <h1 className="text-center text-xl bg-gradient-to-r from-blue-600 to-sky-500 font-semibold rounded-lg m-2 py-2">Students</h1>
        {
          courses && courses.length > 0 ? (
            <>
              <div className="flex justify-end px-2 gap-2 items-center">
                <Link href={"/mentor/assignments/getbyassignment"} className="text-sm text-secondary-500 font-semibold italic">Get by assignment?
                </Link>
              </div>
              <MentorAssignmentBoard students={students} courses={courses} />
            </>
          ) : (
            <NoDataFound message="No students found!" />
          )
        }
      </div>
    </div>
  );
}
