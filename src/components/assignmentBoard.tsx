"use client";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { MdOutlineSportsScore } from "react-icons/md";
import { IoMdArrowRoundBack } from "react-icons/io";

export default function AssignmentBoard({ reviewed, courses, assignments, userId }: any) {
  const [currentCourse, setCurrentCourse] = useState<string>(courses[0]?.id);
  const [isMounted, setIsMounted] = useState(false);
  const router = useRouter();
  
  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return;
  }

  return (
    <div className="flex flex-col gap-4">
    <div className="relative">
      <button
        onClick={() => router.back()}
        className="absolute -top-10 -left-10  p-2"
        >
        <IoMdArrowRoundBack className=" w-8 h-8" />
      </button>
    </div>

      <div className="flex flex-wrap gap-3">
        {courses?.map((course: any) => {
          return (
            <button
              onClick={() => setCurrentCourse(course.id)}
              className={`rounded p-2 sm:w-auto ${currentCourse === course.id && "border rounded"
                }`}
              key={course.id}
            >
              <h1 className="truncate max-w-xs text-sm font-medium">{course.title}</h1>
            </button>
          );
        })}
      </div>
      {assignments.map((course: any) => {
        if (course.id !== currentCourse) return null;
        return course.classes.map((cls: any) => {
          return cls.attachments.map((assignment: any,index:number) => {
            if(assignment.submissions.length === 0 ) return (
              <div hidden={index != 0}>
                <h1 className="text-2xl text-center mt-4 mb-10 text-red-600 font-medium">
                  No submissions to reviewed yet...
                </h1>
              </div>
            )
            return (
              <div key={assignment.id} className="border rounded-lg p-1 md:p-3">
                <div className="flex items-center p-2 md:p-0 md:px-4 justify-around md:justify-between flex-wrap">
                  <div className="flex md:flex-row items-center justify-between w-full flex-wrap">
                    <div className="text-sm">
                      <h2 className="flex-1 font-medium m-2">{assignment.title}</h2>
                    </div>
                    <div className="flex gap-3 md:gap-6 items-center text-sm font-medium text-white flex-wrap">
                      {
                        assignment.submissions.length > 0 &&
                          <div className="flex gap-2">
                            {
                              assignment.submissions.map((eachSubmission: any, index: number) => {
                                if (eachSubmission.points.length !== 0 && !reviewed ) {
                                  return (
                                    <div className="flex gap-6 items-center" key={index}>
                                        <div className="rounded-full p-2 px-3 bg-yellow-600 hover:bg-yellow-500">Under review</div>
                                    </div>
                                  )
                                } else if(eachSubmission.points.length !== 0 && reviewed) {
                                  let total=0
                                  return (
                                    <div className="flex gap-6 items-center" key={index}>
                                      <div className="rounded-full p-2 px-3 bg-green-600 flex items-center">
                                        {eachSubmission.points.forEach((point:any)=>{
                                          total += point.score;
                                        })}
                                        <h1>
                                          Score : {total}
                                        </h1>
                                        <MdOutlineSportsScore className="inline h-5 w-5"/>
                                      </div>
                                    </div>
                                  )
                                }
                              })
                            }
                          </div>
                      }
                      <button
                      title="btn"
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
