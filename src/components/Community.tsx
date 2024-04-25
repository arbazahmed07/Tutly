'use client'
import  { useState } from 'react'
import Accordion from "./accordion";

export default function CommunityForum({ allDoubts, currentUser }: any) {
  const [currentCourse, setCurrentCourse] = useState<string>(allDoubts[0]?.id);
  const filteredallDoubts = allDoubts.filter(
    (x: any) => x.id === currentCourse
  );

  
  

  return (
    <div className="mx-2 md:mx-14 flex flex-col gap-4 w-full px-3">
      <h1 className="text-center py-8 text-4xl font-bold  bg-gradient-to-r from-purple-700 to-pink-700 rounded-lg">Community Forum</h1>
      <div className="flex gap-3">
        {allDoubts?.map((course: any) => (
          <button 
          onClick={() => setCurrentCourse(course.id)}
          className={`rounded p-2 w-20 sm:w-auto ${
              currentCourse === course?.id && "bg-neutral-500"
            }`}
            key={course?.id}
            >
            <h1 className="truncate max-w-xs text-sm font-medium">{course.title}</h1>
          </button>
        ))}
      </div>
      <div className="flex flex-col gap-2 mb-6 min-h-screen">
        {filteredallDoubts?.length === 0 ? (
          <div className="p-4 border rounded text-center">
            No doubts are rised in this course
          </div>
        ) : (
            <Accordion currentCourseId={currentCourse} currentUser={currentUser} doubts={filteredallDoubts[0].doubts} />   
        )}
      </div>
    </div>
  );
}
