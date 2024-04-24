'use client'
import Image from "next/image";
import  { useState } from 'react'
import { FaAngleDown } from "react-icons/fa";
import { FaAngleUp } from "react-icons/fa";
import Accordion from "./accordion";

export default function CommunityForum({ allDoubts, currentUser }: any) {
  const [currentCourse, setCurrentCourse] = useState<string>(allDoubts[0]?.id);
  const [showReplies, setShowReplies] = useState<any>(false);
  const filteredallDoubts = allDoubts.filter(
    (x: any) => x.id === currentCourse
  );

  
  console.log(filteredallDoubts);
  

  return (
    <div className="mx-2 md:mx-14 mt-4 flex flex-col gap-4 w-full px-3">
      <h1 className="border-b-2 text-center p-2 font-semibold text-lg">Community Forum</h1>
      <div className="flex gap-3">
        {allDoubts?.map((course: any) => (
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
      <div className="flex flex-col gap-2 mb-6 min-h-screen">
        {filteredallDoubts.length === 0 ? (
          <div className="p-4 border rounded text-center">
            No doubts are rised in this course
          </div>
        ) : (
           <Accordion currentUser={currentUser} doubts={filteredallDoubts[0].doubts} />   
        )}
      </div>
    </div>
  );
}
