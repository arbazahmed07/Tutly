"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Leaderboard({ assignments, courses }: any) {
  const [users, setUsers] = useState([]);
  const [currentCourse, setCurrentCourse] = useState<string>(courses[0].id);
  const router = useRouter();
  if (courses.length === 0) {
    alert("No courses enrolled!");
    return;
  }

  return (
    <div className="mx-14 mt-4 flex flex-col gap-4">
      <h1 className="border text-center p-2">Leaderboard</h1>
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
      <div className="flex flex-col gap-2">
        {assignments.map((x: any, index: any) => {
          if (x.assignment.class.course.id === currentCourse) {
            return (
              <div className="flex justify-between p-2 px-4 border rounded hover:bg-primary-900" key={index}>
                <div className="flex gap-4 items-center">
                  <h1>{index + 1}</h1>
                  <h1>{x.userId}</h1>
                </div>
                <h1>
                  {x.points.reduce(
                    (acc: any, curr: any) => acc + curr.score,0
                  )}
                  points
                </h1>
              </div>
            );
          }
        })}
      </div>
    </div>
  );
}