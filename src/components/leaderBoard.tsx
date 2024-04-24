'use client'
import Image from "next/image";
import { FaCrown } from "react-icons/fa6";
import  { useState } from 'react'

export default function Leaderboard({ submissions, courses }: any) {
  const [currentCourse, setCurrentCourse] = useState<string>(courses[0].id);

  const filteredSubmissions = submissions.filter(
    (x: any) => x.assignment.class.course.id === currentCourse
  );

  return (
    <div className="mx-2 md:mx-14 mt-1 flex flex-col gap-4">
      <div className="flex flex-col text-center">
        <FaCrown className="h-20 w-20 m-auto text-yellow-400"/>
        <h1 className="text-xl font-bold">Leaderboard</h1>
      </div>
      <div className="flex gap-3">
        {courses?.map((course: any) => (
          <button
            onClick={() => setCurrentCourse(course.id)}
            className={`rounded p-2 w-20 sm:w-auto ${
              currentCourse === course.id && "border"
            }`}
            key={course.id}
          >
            <h1 className="truncate max-w-xs text-sm font-medium">{course.title}</h1>
          </button>
        ))}
      </div>
      <div className="flex flex-col gap-2">
        {filteredSubmissions.length === 0 ? (
          <div className="p-4 border rounded text-center">
            No submissions available for this course
          </div>
        ) : (
          filteredSubmissions.map((x: any, index: any) => (
            <div
              className="flex justify-between items-center p-2 px-4 rounded hover:bg-blue-500"
              key={index}
            >
              <div className="flex gap-3 md:gap-10 items-center">
                <h1>{index + 1}</h1>
                <Image
                  src={x.enrolledUser.user.image}
                  alt={x.enrolledUser.user.name}
                  width={35}
                  height={35}
                  className="w-10 h-10 rounded-full"
                />
                <div className="py-2">
                  <h1 className="text-sm font-mediun">{x.enrolledUser.user.name}</h1>
                  <h1 className="text-xs">@{x.enrolledUser.user.username}</h1>
                </div>
              </div>
              <h1 className="font-medium text-xs md:text-sm">{x.totalPoints} points</h1>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
