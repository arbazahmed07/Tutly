import { getEnrolledCourses, getMentorCourses, getMentorStudents } from "@/actions/courses";
import { getAllAssignedAssignments, getAllAssignedAssignmentsByUserId, getAllMentorAssignments } from "@/actions/getAssignments";
import AssignmentBoard from "@/components/assignmentBoard";


export default async function mentorAssignments({params}:{
  params:{
    id:string
  }
}) {
  const {courses,coursesWithAssignments} = await getAllAssignedAssignmentsByUserId(params.id)
  return (
    <div className="mx-6 px-8 py-2 flex flex-col gap-4">
      <h1></h1>
      <h1 className="text-center text-xl font-bold py-2">ASSIGNMENTS</h1>
      {!coursesWithAssignments ? <div className="text-center">No Attachments found!</div> : <AssignmentBoard courses={courses} assignments={coursesWithAssignments} />}
    </div>
  );
}
