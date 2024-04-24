import { getMentorStudents } from "@/actions/courses";
import Link from "next/link";


export default async function mentorAssignments() {
  const students = await getMentorStudents();
  if (!students) return;

  return (
    <div className="mx-14 px-8 py-2 flex flex-col gap-4">
      <h1 className="text-center text-xl font-bold border py-2">Students</h1>
      {
        students && students.map((student, index) => {
          return (
            <div key={index}>
              <h1>{student.name}</h1>
              <Link href={`./assignments/${student.id}`}>Link</Link>
            </div>
          )
        })
      }
    </div>
  );
}
