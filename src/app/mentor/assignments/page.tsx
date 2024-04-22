import { getEnrolledCourses, getMentorCourses, getMentorStudents } from "@/actions/courses";
import { getAllAssignedAssignments, getAllAssignedAssignmentsByUserId, getAllMentorAssignments } from "@/actions/getAssignments";
import AssignmentBoard from "@/components/assignmentBoard";
import Link from "next/link";


export default async function mentorAssignments(a) {
  const students = await getMentorStudents();

  return (
    <div className="mx-14 px-8 py-2 flex flex-col gap-4">
      <h1 className="text-center text-xl font-bold border py-2">Students</h1>
      {
        students?.map((student)=>{
          return(
            <div>
              <h1>{student.name}</h1>
              <Link href={`./assignments/${student.id}`}>Link</Link>
            </div>
          )
        })
      }
    </div>
  );
}
