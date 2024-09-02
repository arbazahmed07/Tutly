import Link from "next/link";

export default function MentorInfoForInstructor({ mstudents }: any) {
  return (
    <div className="flex flex-wrap gap-8 justify-center">
      {mstudents.map((student: any, index: number) => {
        return (
          <Link key={index} href={`/instructor/statistics/mentor/${student.username}`} className="rounded-xl shadow-blue-500 shadow-sm p-2 w-1/4">
            <div className="py-2">
              <h1 className="text-sm font-medium">{student.name}</h1>
              <h1 className="text-xs">@{student.username}</h1>
            </div>
          </Link>
        );
      })}
    </div>
  );
}
