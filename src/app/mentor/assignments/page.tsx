import { getMentorStudents } from "@/actions/courses";
import Link from "next/link";


export default async function mentorAssignments() {
  const students = await getMentorStudents();
  if (!students) return;

  return (
    <div className="mx-14 px-8 py-2 flex flex-col gap-4">
      <div>
      <h1 className="text-center text-xl bg-gradient-to-r from-blue-600 to-sky-500 font-semibold rounded-lg py-2">Students</h1>
      {/* <h1>Search bar comes here</h1> */}
      </div>
      {
        students && students.map((student, index) => {
          return (
            <div key={index} className={`${index<students.length-1&&"border-b pb-3"}`}>
                <div className="p-2 flex justify-between items-center">
                  <div>
                    <h1>{student.name}</h1>
                    <h1 className="text-sm font-medium">{student.username}</h1>
                  </div>
                  <Link href={`./assignments/${student.id}`} className="bg-slate-500 p-2 rounded-lg">Assignments</Link>
                </div>
            </div>
          )
        })
      }
    </div>
  );
}
