import Link from "next/link";

export default function StudentsInfoForMentor({ currentUser, mstudents }: any) {
  return (
    <div className="flex flex-wrap gap-8 justify-center">
      {mstudents.map((student: any, index: number) => {
        return (
          <Link key={index} href={`${currentUser?.role === "INSTRUCTOR" ? `/instructor/mentor/student/${student.username}` : `/mentor/student/${student.username}`}`} className="rounded-xl shadow-blue-500 shadow-sm p-2 w-full lg:w-1/4">
            <div className="py-2 ">
              <h1 className="text-sm font-medium mb-2">{student.name}</h1>
              <h1 className="text-xs">@{student.username}</h1>
            </div>
          </Link>
        );
      })}
    </div>
  );
}
