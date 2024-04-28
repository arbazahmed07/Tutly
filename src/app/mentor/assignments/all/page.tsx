import {  getAllMentorAssignments } from "@/actions/assignments";
import { getMentorCourses } from "@/actions/courses";
import AssignmentBoard from "@/components/assignmentBoard";


export default async function mentorAssignments({ params }: {
  params: {
    id: string
  }
}) {
  const courses = await getMentorCourses()
  const {coursesWithAssignments,submissions} = await getAllMentorAssignments();
  // return (
  // <pre>
  // {JSON.stringify(coursesWithAssignments, null, 2)}
  // </pre>
  //)
  return (
    <div className="md:mx-6 px-2 md:px-8 py-2 flex flex-col gap-4">
      <h1 className="text-center text-3xl font-semibold py-2">ASSIGNMENTS</h1>
      {!coursesWithAssignments ? <div className="text-center">No Attachments found!</div> : <AssignmentBoard courses={courses} assignments={coursesWithAssignments}/>}
      <pre>
        {
          JSON.stringify(coursesWithAssignments, null, 2)
        }
      </pre>  
      <pre>
        {
          JSON.stringify(submissions, null, 2)
        }
      </pre>
    </div>
  );
}
