"use client";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

interface Props {
  courses: any;
  assignments: {
    id: string;
    classes: {
      attachments: {
        id: string;
        title: string;
        details: string;
        attachmentType: string;
        link: string;
        classId: string;
        dueDate: Date | null;
        class: { id: string; title: string; courseId: string | null; videoId: string; } | null;
        submissions: { id: string; userId: string; attachmentId: string; overallFeedback: string | null; submissionLink: string | null; submissionDate: Date; }[]
      }[];
    }[]
  }[];
}

export default function AssignmentBoard({ courses, assignments }: Props) {
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
              className={`rounded p-2 ${currentCourse === course.id && "border"
                }`}
              key={course.id}
            >
              {course.title}
            </button>
          );
        })}
      </div>
      {
        assignments.map((couse) => {
          if(couse.id !== currentCourse) return null;
          return (couse.classes.map(cls => {
            return (
              cls.attachments.map((assignment,index) => {
                return (
                  <div key={assignment.id} className="border p-4">
                    <div className="flex justify-between">
                      <h2>{assignment.title}</h2>
                      <button
                        onClick={() => router.push(`/assignments/${assignment.id}`)}
                        className="p-2 bg-blue-500 text-white rounded"
                      >
                        View
                      </button>
                    </div>
                    <p>{assignment.details}</p>
                    <p>Due Date: {assignment.dueDate?.toLocaleString()}</p>
                    <p>Submissions:</p>
                    <ul>
                      {assignment.submissions.length === 0 && <li>No submissions yet!</li>}
                      {assignment.submissions.map((submission) => {
                        return (
                          <li key={submission.id}>
                            <a href={submission.submissionLink} target="_blank">
                              {submission.submissionLink}
                            </a>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                );
              })
            );
          }));
        }
        )}

      
      <pre>{JSON.stringify(assignments, null, 2)}</pre>

    </div>
  );
}

