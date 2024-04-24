import { getMentorStudents } from "@/actions/courses";
import Link from "next/link";
import Image from "next/image";

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
        students && students.map((student:any, index:number) => {
          return (
            <div key={index} className={`${index<students.length-1&&"border-b pb-3"}`}>
                <div className="p-1 flex justify-between items-center">
                  <div className="flex gap-5 items-center">
                    <Image src={student.image} height={40} width={40} alt="" className="rounded-full"/>
                    <div>
                      <h1 className="text-sm font-medium">{student.name}</h1>
                      <h1 className="text-xs font-medium">{student.username}</h1>
                    </div>
                  </div>
                  <Link href={`./assignments/${student.id}`} className="bg-slate-500 p-2 text-sm font-medium rounded-lg">Assignments</Link>
                </div>
            </div>
          )
        })
      }
    </div>
  );
}
