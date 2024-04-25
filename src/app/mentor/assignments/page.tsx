import { getMentorCourses, getMentorStudents } from "@/actions/courses";
import MentorAssignmentBoard from "@/components/mentorAssignmentBoard";

export default async function mentorAssignments() {
  const students = await getMentorStudents();
  const courses = await getMentorCourses();
  if(!courses || !students ) return <div className="text-center">Sign in to view assignments!</div>

  return (
    <div className="mx-14 px-8 py-2 flex flex-col gap-4">
      <div>
      <h1 className="text-center text-xl bg-gradient-to-r from-blue-600 to-sky-500 font-semibold rounded-lg py-2">Students</h1>
      {
        courses && courses.length > 0 ? (
          <MentorAssignmentBoard students={students} courses={courses}/>
        ) : (
          <div className="text-center">No courses found!</div>
        )
      }
      </div>
    </div>
  );
}
