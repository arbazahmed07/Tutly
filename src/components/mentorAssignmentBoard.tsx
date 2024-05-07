"use client";
import Image from "next/image";
import {  useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";

function MentorAssignmentBoard({ courses, students, role }: any) {
  const [currentCourse, setCurrentCourse] = useState<string>(courses[0]?.id);
  const [isMounted, setIsMounted] = useState(false);
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState<string>("");

  const filteredStudents = students.filter((student: any) =>
    student.enrolledUsers?.some((x: any) => x.courseId === currentCourse) &&
    (student.name.toLowerCase().includes(searchQuery.toLowerCase())||student.username.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }



  return (
    <div className="flex flex-col gap-4 p-2 md:pt-5">
      <div className="flex justify-between gap-3 flex-wrap items-center">
        <div className="flex gap-3 flex-wrap items-center">
          {courses?.map((course: any) => (
            <button 
              hidden={course.isPublished === false}
              onClick={() => setCurrentCourse(course.id)}
              className={`rounded p-2 ${
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
        <div className="flex items-center m-auto md:m-0 bg-secondary-200 border text-black rounded">
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
      filteredStudents.length > 0 ? (
        filteredStudents
            .filter((student: any) =>
            student.enrolledUsers?.find((x: any) => x.courseId === currentCourse)
          ).map((student: any, index: number) => (
          <div
            key={index}
            className={`${index < filteredStudents.length - 1 && "border-b pb-3"} ${student.role==='INSTRUCTOR' || student.role==='MENTOR'&&"hidden"}`}
          >
            <div className="p-1 flex justify-between items-center">
              <div className="flex gap-2 md:gap-5 items-center">
                <Image
                  src={student?.image || "/images/placeholder.jpg"}
                  height={40}
                  width={40}
                  alt=""
                  className="rounded-full"
                />
                <div>
                  <h1 className="text-xs md:text-sm font-medium">{student.name}</h1>
                  <h1 className="text-xs font-medium">{student.username}</h1>
                </div>
              </div>
              {
                student?.role==='STUDENT' &&
                <div
                  onClick={() =>
                    router.push(
                      `${
                        role === "INSTRUCTOR" ?
                            `/instructor/assignments/${student.id}`
                          :
                            `/mentor/assignments/${student.id}`                        
                      }`
                    )
                  }
                  className="bg-blue-600 text-white p-2 text-sm font-medium rounded-lg cursor-pointer"
                >
                  Assignments
                </div>
              }
            </div>
          </div>
        ))
      ) : (
        <div>
            <p className=' text-xl font-semibold mt-5 flex justify-center items-center'>
              No course is enrolled yet!
            </p>
            <Image
                src="https://i.postimg.cc/N0JMHNDw/undraw-Notify-re-65on-1-removebg-preview.png"
                height={400}
                className="m-auto "
                width={400}
                alt=""
              />
          </div>
      )}
    </div>
  );
}

export default MentorAssignmentBoard;
