"use client";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { MdOutlineSportsScore } from "react-icons/md";

export default function StudentWiseAssignments({
  courses,
  assignments,
  userId,
}: any) {
  const [currentCourse, setCurrentCourse] = useState<string>(courses[0]?.id);
  const [isMounted, setIsMounted] = useState(false);
  const router = useRouter();
  const [filterOption, setFilterOption] = useState<string>("all");
  const pathname = usePathname();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-wrap justify-between items-center gap-3">
        <div>
          {courses?.map((course: any) => (
            <button
              onClick={() => setCurrentCourse(course.id)}
              className={`rounded p-2 sm:w-auto ${
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
        <div className="space-x-4 text-sm font-medium m-auto sm:m-0">
          <button
            className={`focus:outline-none cursor-pointer ${
              filterOption === "all" && "border-b-2"
            } `}
            onClick={() => setFilterOption("all")}
          >
            <label>All</label>
          </button>
          <button
            className={`focus:outline-none cursor-pointer ${
              filterOption === "reviewed" && "border-b-2"
            } `}
            onClick={() => setFilterOption("reviewed")}
          >
            <label>Reviewed</label>
          </button>
          <button
            className={`focus:outline-none cursor-pointer ${
              filterOption === "unreviewed" && "border-b-2 "
            } `}
            onClick={() => setFilterOption("unreviewed")}
          >
            <label>Unreviewed</label>
          </button>
          <button
            className={`focus:outline-none cursor-pointer ${
              filterOption === "not-submitted" && "border-b-2"
            } `}
            onClick={() => setFilterOption("not-submitted")}
          >
            <label>Not Submitted</label>
          </button>
        </div>
      </div>
      {assignments.map((course: any) => {
        if (course.id !== currentCourse) return null;
        return course.classes.map((cls: any) =>
          cls.attachments
            .filter((x: any) => {
              if (filterOption == "all") {
                return true;
              } else if (filterOption == "not-submitted") {
                return x.submissions.length === 0;
              } else if (filterOption == "unreviewed") {
                return (
                  x.submissions.length > 0 &&
                  x.submissions.some((x: any) => x.points.length === 0)
                );
              } else if (filterOption == "reviewed") {
                return (
                  x.submissions.length > 0 &&
                  x.submissions.some((x: any) => x.points.length > 0)
                );
              }
              return true;
            })
            .map((assignment: any) => (
              <div key={assignment.id} className="border rounded-lg p-1 md:p-3">
                <div className="flex items-center p-2 md:p-0 md:px-4 justify-around md:justify-between flex-wrap">
                  <div className="flex md:flex-row items-center justify-between w-full flex-wrap">
                    <div className="text-sm">
                      <h2 className="flex-1 font-medium m-2">
                        {assignment.title}
                      </h2>
                    </div>
                    <div className="flex gap-3 md:gap-6 items-center text-xs font-medium text-white flex-wrap">
                      {assignment.submissions.length === 0 ? (
                        <div className="flex gap-6 itens-center">
                          <div className="rounded-full p-2.5 bg-secondary-600">
                            Not submitted
                          </div>
                        </div>
                      ) : (
                        <div className="flex gap-2 flex-wrap">
                          {assignment.submissions.map(
                            (eachSubmission: any, index: number) => {
                              if (eachSubmission.points.length === 0) {
                                if (
                                  (pathname.startsWith("/mentor/") ||
                                    pathname.startsWith("instructor/")) &&
                                  eachSubmission.submissionLink
                                ) {
                                  return (
                                    <div
                                      onClick={() =>
                                        router.push(
                                          eachSubmission.submissionLink
                                        )
                                      }
                                      className="flex gap-6 items-center"
                                      key={index}
                                    >
                                      <div className="rounded-full p-2.5 bg-yellow-600">
                                        Under review
                                      </div>
                                    </div>
                                  );
                                } else {
                                  return (
                                    <div
                                      className="flex gap-6 items-center"
                                      key={index}
                                    >
                                      <div className="rounded-full p-2.5 bg-yellow-600">
                                        Under review
                                      </div>
                                    </div>
                                  );
                                }
                              } else {
                                let total = 0;
                                eachSubmission.points.forEach((point: any) => {
                                  total += point.score;
                                });
                                if (
                                  (pathname.startsWith("/mentor/") ||
                                    pathname.startsWith("instructor/")) &&
                                  eachSubmission.submissionLink
                                ) {
                                  return (
                                    <div
                                      className="flex gap-6 items-center"
                                      onClick={() =>
                                        router.push(
                                          eachSubmission.submissionLink
                                        )
                                      }
                                      key={index}
                                    >
                                      <div className="rounded-full p-2.5 bg-green-600 flex items-center cursor-pointer">
                                        <h1>Score: {total}</h1>
                                        <MdOutlineSportsScore className="inline sm:h-5 sm:w-5" />
                                      </div>
                                    </div>
                                  );
                                } else {
                                    return (
                                        <div
                                          className="flex gap-6 items-center"
                                          key={index}
                                        >
                                          <div className="rounded-full p-2.5 bg-green-600 flex items-center">
                                            <h1>Score: {total}</h1>
                                            <MdOutlineSportsScore className="inline sm:h-5 sm:w-5" />
                                          </div>
                                        </div>
                                      );
                                }
                              }
                            }
                          )}
                        </div>
                      )}
                      <button
                        title="Details"
                        onClick={() => {
                          if (userId) {
                            router.push(
                              `/assignments/${assignment.id}?username=${userId}`
                            );
                          } else {
                            router.push(`/assignments/${assignment.id}`);
                          }
                        }}
                        className="p-2.5 bg-blue-500 rounded"
                      >
                        View Details
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
        );
      })}
    </div>
  );
}
