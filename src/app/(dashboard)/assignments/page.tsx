import { getEnrolledCourses } from "@/actions/courses";
import { getAllAssignedAssignments } from "@/actions/getAssignments";
import AssignmentBoard from "@/components/assignmentBoard";

export default async function Assignments() {
  const assignments = await getAllAssignedAssignments();
  const courses = await getEnrolledCourses();

  return (
    <div className="mx-14 px-8 py-2 flex flex-col gap-4">
      <h1 className="text-center text-xl font-bold border py-2">ASSIGNMENTS</h1>
      {!assignments ? <div className="text-center">No Attachments found!</div> : <AssignmentBoard courses={courses} assignments={assignments} />}
    </div>
  );
}
