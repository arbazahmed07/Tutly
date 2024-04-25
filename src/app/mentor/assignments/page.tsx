import { getMentorCourses, getMentorStudents } from "@/actions/courses";
import MentorAssignmentBoard from "@/components/mentorAssignmentBoard";

export default async function mentorAssignments() {
  const students = await getMentorStudents();
  const courses = await getMentorCourses();
  if (!students) return;

  return (
    <div className="mx-14 px-8 py-2 flex flex-col gap-4">
      <div>
      <h1 className="text-center text-xl bg-gradient-to-r from-blue-600 to-sky-500 font-semibold rounded-lg py-2">Students</h1>
      {/* <h1>Search bar comes here</h1> */}
      </div>
      <MentorAssignmentBoard students={students} courses={courses}/>
    </div>
  );
}
