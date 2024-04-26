"use client";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

function MentorAssignmentBoard({ courses, students, role }: any) {
  const [currentCourse, setCurrentCourse] = useState<string>(courses[0].id);
  const [isMounted, setIsMounted] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  useEffect(() => {
    setIsMounted(true);
  }, []);
  
  if (!isMounted) {
    return;
  }
  return (
    <div className="flex flex-col gap-4 pt-5">
      <div className="flex gap-3">
        {courses?.map((course: any) => {
          return (
            <button
              onClick={() => setCurrentCourse(course.id)}
              className={`rounded p-2 w-20 sm:w-auto ${
                currentCourse === course.id && "border rounded"
              }`}
              key={course.id}
            >
              <h1 className="truncate max-w-xs text-sm font-medium">
                {course.title}
              </h1>
            </button>
          );
        })}
      </div>
      {students &&
        students.map((student: any, index: number) => {
          let flag;
          if (pathname.startsWith("/instructor/") ||pathname.startsWith("/mentor/") ) flag = true;
          else flag = student.course.find((x: any) => x.id === currentCourse);
          if (flag) {
            return (
              <div
                key={index}
                className={`${index < students.length - 1 && "border-b pb-3"}`}
              >
                <div className="p-1 flex justify-between items-center">
                  <div className="flex gap-5 items-center">
                    <Image
                      src={student?.image || "/images/placeholder.jpg"}
                      height={40}
                      width={40}
                      alt=""
                      className="rounded-full"
                    />
                    <div>
                      <h1 className="text-sm font-medium">{student.name}</h1>
                      <h1 className="text-xs font-medium">
                        {student.username}
                      </h1>
                    </div>
                  </div>
                  <div
                    onClick={() => router.push(`${role==="INSTRUCTOR"?`/instructor/assignments/${student.id}`:`/mentor/assignments/${student.id}`}`)}
                    className="bg-primary-700 p-2 text-sm font-medium rounded-lg cursor-pointer"
                  >
                    Assignments
                  </div>
                </div>
              </div>
            );
          }
        })}
    </div>
  );
}

export default MentorAssignmentBoard;
