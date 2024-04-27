"use client";
import Image from "next/image";
import {  useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";

function MentorAssignmentBoard({ courses, points, students, role }: any) {
  const [currentCourse, setCurrentCourse] = useState<string>(courses[0]?.id);
  const [isMounted, setIsMounted] = useState(false);
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [Unreviewed, setUnreviewed] = useState<boolean>(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  const filteredStudents = students.filter((student: any) =>
    student.enrolledUsers?.some((x: any) => x.courseId === currentCourse) &&
    (student.name.toLowerCase().includes(searchQuery.toLowerCase())||student.username.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const filteredStudentsWithPoints = Unreviewed ? filteredStudents.filter((student: any) =>
    !points.sortedSubmissions.some((submission: any) => submission.enrolledUser.user.id === student.id && submission.totalPoints > 0)
  ) : filteredStudents;

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
        <div hidden>
          <div className="flex items-center">
            <input
              type="radio"
              id="unreviewed"
              name="reviewStatus"
              checked={Unreviewed}
              onChange={() => setUnreviewed(true)}
              className="hidden"
            />
            <label
              htmlFor="unreviewed"
              className={`cursor-pointer p-2 bg-primary-600 rounded-lg hover:bg-primary-700 ${
                Unreviewed && "bg-primary-700"
              }`}
            >
              Unreviewed
            </label>
            <input
              type="radio"
              id="all"
              name="reviewStatus"
              checked={!Unreviewed}
              onChange={() => setUnreviewed(false)}
              className="hidden"
            />
            <label
              htmlFor="all"
              className={`cursor-pointer p-2 bg-primary-600 rounded-lg hover:bg-primary-700 ${
                !Unreviewed && "bg-primary-700"
              }`}
            >
              All
            </label>
          </div>
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
      filteredStudentsWithPoints.length > 0 ? (
        filteredStudentsWithPoints
            .filter((student: any) =>
            student.enrolledUsers?.find((x: any) => x.courseId === currentCourse)
          ).map((student: any, index: number) => (
          <div
            hidden = {student.role==='INSTRUCTOR' || student.role==='MENTOR'}
            key={index}
            className={`${index < filteredStudentsWithPoints.length - 1 && "border-b pb-3"}`}
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
                student?.role==='STUDENT' &&
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
              }
            </div>
          </div>
        ))
      ) : (
        <div className="text-sm font-medium">No students found</div>
      )}
    </div>
  );
}

export default MentorAssignmentBoard;
