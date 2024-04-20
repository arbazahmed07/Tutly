"use client";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

export default function AssignmentBoard({ courses, assignments }: any) {
  const [currentCourse, setCurrentCourse] = useState<string>(courses[0].id);
  const router = useRouter();
  if (courses.length === 0) {
    alert("No courses enrolled!");
    return;
  }
  return (
    <div className="flex flex-col gap-4">
      <div className="flex gap-3">
        {courses?.map((course: any) => {
          return (
            <button
              onClick={() => setCurrentCourse(course.id)}
              className={`rounded p-2 ${
                currentCourse === course.id && "border"
              }`}
              key={course.id}
            >
              {course.title}
            </button>
          );
        })}
      </div>
      {assignments?.map((assignment: any) => {
        const searchCourse = assignment.assignedUser.course.find(
          (course: any) => {
            return course.id === currentCourse;
          }
        );
        if (searchCourse != undefined) {
          return (
            <div
              key={assignment.id}
              className="flex justify-between items-center p-4 border"
            >
              <div>
                {assignment.assignment.title}-{assignment.assignment.id}
              </div>
              <button
                onClick={() => router.push(`/assignments/${assignment.id}`)}
                className="p-2 bg-secondary-800 rounded-md"
              >
                Details
              </button>
            </div>
          );
        }
      })}
    </div>
  );
}

