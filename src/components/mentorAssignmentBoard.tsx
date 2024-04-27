"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";

function MentorAssignmentBoard({ courses, points, students, role }: any) {
  const [currentCourse, setCurrentCourse] = useState<string>(courses[0]?.id);
  const [isMounted, setIsMounted] = useState(false);
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [Unreviewed, setUnreviewed] = useState<boolean>(false);
  const pathname = usePathname();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  const filteredStudents = students.filter((student: any) =>
    student.enrolledUsers?.some((x: any) => x.courseId === currentCourse) &&
    // student.role==="STUDENT" &&
    (student.name.toLowerCase().includes(searchQuery.toLowerCase())||student.username.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="flex flex-col gap-4 pt-5">
      <div className="flex justify-between">
        <div className="flex gap-3">
          {courses?.map((course: any) => (
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
          ))}
        </div>
        <div>
            <button onClick={()=>{setUnreviewed(true)}} className=" p-2 bg-primary-600 rounded-lg hover:bg-primary-700">
              Unreviewed
            </button>
        </div>
        <div className="flex items-center bg-secondary-200 border text-black rounded">
          <input
            title="input"
            className="p-2 outline-none text-sm font-medium rounded-l border-r border-black bg-secondary-200"
            placeholder="Search here"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <FaSearch className="h-5 w-5 m-2"/>
        </div>
      </div>
      {
        Unreviewed ? (
          filteredStudents
            .filter((student: any) =>
            student.enrolledUsers?.find((x: any) => x.courseId === currentCourse)
          ).map((student: any, index: number) => (
          <div
            
            key={index}
            className={`${index < filteredStudents.length - 1 && "border-b pb-3"}`}
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
                  <h1 className="text-xs font-medium">{student.username}</h1>
                </div>
              </div>
              <div
                onClick={() =>
                  router.push(
                    `${
                      role === "INSTRUCTOR"
                        ? `/instructor/assignments/${student.id}`
                        : `/mentor/assignments/${student.id}`
                    }`
                  )
                }
                className="bg-primary-700 p-2 text-sm font-medium rounded-lg cursor-pointer"
              >
                Assignments
              </div>
            </div>
          </div>
        ))
        ) :
      filteredStudents.length > 0 ? (
        filteredStudents
            .filter((student: any) =>
            student.enrolledUsers?.find((x: any) => x.courseId === currentCourse)
          ).map((student: any, index: number) => (
          <div
            
            key={index}
            className={`${index < filteredStudents.length - 1 && "border-b pb-3"}`}
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
                  <h1 className="text-xs font-medium">{student.username}</h1>
                </div>
              </div>
              {
                student?.role==='STUDENT'?
                <div
                  onClick={() =>
                    router.push(
                      `${
                        role === "INSTRUCTOR"
                          ? `/instructor/assignments/${student.id}`
                          : `/mentor/assignments/${student.id}`
                      }`
                    )
                  }
                  className="bg-primary-700 p-2 text-sm font-medium rounded-lg cursor-pointer"
                >
                  Assignments
                </div>:
                <div className="text-sm font-medium">
                  {student?.role}
                </div>

              }
            </div>
          </div>
        ))
      ) : (
        <div className="text-sm font-medium">No students found</div>
      )}

      {/* <div>{JSON.stringify(points,null,2)}</div> */}
    </div>
  );
}

export default MentorAssignmentBoard;
