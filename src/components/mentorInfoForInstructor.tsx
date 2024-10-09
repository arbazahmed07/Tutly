import Link from "next/link";

export default function MentorInfoForInstructor({ mstudents, courseId }: any) {
  return (
    <div className="flex flex-wrap justify-center gap-8 max-sm:flex-col">
      {mstudents.map((student: any, index: number) => {
        return (
          <Link
            key={index}
            href={`/instructor/statistics/${courseId}/mentor/${student.username}`}
            className="w-1/4 rounded-xl p-2 shadow-sm shadow-blue-500 max-sm:w-full"
          >
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
