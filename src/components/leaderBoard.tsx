"use client";
import Image from "next/image";
import { useState } from "react";

export default function Leaderboard({ submissions, courses } : any) {

  const [currentCourse, setCurrentCourse] = useState<string>(courses[0].id);
  return (
    <div className="mx-2 md:mx-14 mt-4 flex flex-col gap-4">
      <h1 className="border text-center p-2">Leaderboard</h1>
      <div className="flex gap-3">
        {courses?.map((course: any) => {
          return (
            <button
              onClick={() => setCurrentCourse(course.id)}
              className={`rounded p-2 w-20 sm:w-auto ${
                currentCourse === course.id && "border"
              }`}
              key={course.id}
            >
              <h1 className="truncate max-w-xs">{course.title}</h1>
            </button>
          );
        })}
      </div>
      <div className="flex flex-col gap-2">
        {submissions.map((x: any, index: any) => {
          if (x.assignment.class.course.id === currentCourse) {
            return (
              <div
                className="flex justify-between items-center p-2 px-4 border rounded hover:bg-primary-900"
                key={index}
              >
                <div className="flex gap-3 md:gap-10 items-center">
                  <h1>{index + 1}</h1>
                  <Image
                    src={x.enrolledUser.user.image}
                    alt={x.enrolledUser.user.name}
                    width={40}
                    height={40}
                    className="w-10 h-10 rounded-full"
                  />
                  <div className="py-2">
                    <h1 className="text-sm font-mediun">{x.enrolledUser.user.name}</h1>
                    <h1 className="text-xs">@{x.enrolledUser.user.username}</h1>
                  </div>
                </div>
                <h1>
                  {x.totalPoints}
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
