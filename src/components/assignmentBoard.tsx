"use client";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

export default function AssignmentBoard({ courses, assignments, userId }: any) {
  const [currentCourse, setCurrentCourse] = useState<string>(courses[0]?.id);
  const [isMounted, setIsMounted] = useState(false);
  const router = useRouter();
  const currentTime = new Date();
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
              className={`rounded p-2 w-20 sm:w-auto ${currentCourse === course.id && "bg-neutral-500"
                }`}
              key={course.id}
            >
              <h1 className="truncate max-w-xs text-sm font-medium">{course.title}</h1>
            </button>
          );
        })}
      </div>
      {assignments.map((couse: any) => {
        if (couse.id !== currentCourse) return null;
        return couse.classes.map((cls: any) => {
          return cls.attachments.map((assignment: any) => {
            return (
              <div key={assignment.id} className="border rounded-lg p-1 md:p-3">
                <div className="flex items-center p-2 md:p-0 md:px-4 justify-around md:justify-between">
                  <div className="flex flex-col md:flex-row items-center justify-between w-full">
                    <div className="flex gap-4 items-center text-sm">
                      <h2 className="font-medium">{assignment.title}</h2>
                      <button
                        onClick={() => {
                          if (userId) {
                            router.push(`/assignments/${assignment.id}?userId=${userId}`);
                          } else {
                            router.push(`/assignments/${assignment.id}`);
                          }
                        }
                        }
                        className="p-2 px-4 bg-blue-500 rounded"
                      >
                        View Details
                      </button>
                    </div>
                    <div className="flex gap-6 items-center text-sm font-medium text-white">
                      {
                        assignment.submissions.length === 0 ?
                          <div className="flex gap-6 itens-center">
                            {
                              (assignment.dueDate && currentTime < new Date(assignment.dueDate)) ?
                                <div className="rounded-full p-2 px-3 bg-secondary-600">not submitted</div> :
                                <div className="rounded-full p-2 px-3 bg-red-600">not submitted</div>
                            }
                          </div>
                          :
                          <div>
                            {
                              assignment.submissions.map((eachSubmission: any, index: number) => {
                                if (eachSubmission.points.length === 0) {
                                  return (
                                    <div className="flex gap-6 items-center" key={index}>
                                      <a target="_blank" href={eachSubmission.submissionLink}>
                                        <div className="rounded-full p-2 px-3 bg-yellow-600 hover:bg-yellow-500">Under review</div>
                                      </a>
                                    </div>
                                  )
                                } else {
                                  return (
                                    <div className="flex gap-6 items-center" key={index}>
                                      <a target="_blank" href={eachSubmission.submissionLink}>
                                        <div className="rounded-full p-2 px-3 bg-green-600 hover:bg-green-500">Reviewed</div>
                                      </a>

                                    </div>
                                  )
                                }
                              })
                            }
                          </div>

                      }
                      {assignment.dueDate && (
                        <h1 className="rounded-full p-2 px-3 bg-secondary-600">{assignment.dueDate?.toISOString().split("T")[0]}</h1>
                      )}
                    </div>
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
