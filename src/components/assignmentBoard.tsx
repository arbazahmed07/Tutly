"use client";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

export default function AssignmentBoard({ courses, assignments }: any) {
  const [currentCourse, setCurrentCourse] = useState<string>(courses[0].id);
  const [isMounted, setIsMounted] = useState(false);
  const router = useRouter();
  useEffect(() => {
    setIsMounted(true);
  }, []);
  if (courses.length === 0) {
    alert("No courses enrolled!");
    return;
  }
  
  if (!isMounted) {
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
      {assignments.map((couse: any) => {
        if (couse.id !== currentCourse) return null;
        return couse.classes.map((cls: any) => {
          return cls.attachments.map((assignment: any) => {
            return (
              <div key={assignment.id} className="border p-4">
                <div className="flex items-center px-4 justify-between">
                  <h2>{assignment.title}</h2>
                  <div className="flex gap-6 items-center">
                    {assignment.dueDate && (
                      <h1 className="rounded-full p-1 px-2 bg-secondary-600">{assignment.dueDate?.toISOString().split("T")[0]}</h1>
                    )}
                    <h1 className="rounded-full p-1 px-2 bg-secondary-600">
                      {assignment.submissions.length === 0
                        ? "not submitted"
                        : "submitted"}
                    </h1>
                    <button
                      onClick={() =>
                        router.push(`/assignments/${assignment.id}`)
                      }
                      className="p-2 px-4 bg-primary-500 text-white rounded"
                    >
                      View
                    </button>
                  </div>
                </div>
              </div>
            );
          });
        });
      })}
    </div>
  );
}
