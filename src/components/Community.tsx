'use client'
import Image from "next/image";
import img from '/public/assets/nodata.jpg'
import  { useState } from 'react'

export default function CommunityForum({ allDoubts, courses }: any) {
  const [currentCourse, setCurrentCourse] = useState<string>(courses[0]?.id);

  const filteredallDoubts = allDoubts.filter(
    (x: any) => x.classId === currentCourse
  );

  console.log(filteredallDoubts);
  
  

  return (
    <div className="mx-2 md:mx-14 mt-4 flex flex-col gap-4">
      <h1 className="border text-center p-2 font-semibold text-lg">CommunityForum</h1>
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
        {filteredallDoubts.length === 0 ? (
          <div className="p-4 border rounded text-center">
            No allDoubts available for this course
          </div>
        ) : (
          filteredallDoubts.map((x: any, index: any) => (
            <div
              className="flex justify-between items-center p-2 px-4 border rounded hover:bg-primary-900"
              key={index}
            >
              <div className="flex gap-3 md:gap-10 items-center">
                <h1>{index + 1}</h1>
                <Image
                  src={x.user.image}
                  alt={x.user.name}
                  width={35}
                  height={35}
                  className="w-10 h-10 rounded-full"
                />
                <div className="py-2">
                  <h1 className="text-sm font-mediun">{x.user.name}</h1>
                  <h1 className="text-xs">@{x.user.username}</h1>
                </div>
              </div>
              <h1 className="font-medium text-xs md:text-sm">{x.user.role} points</h1>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
