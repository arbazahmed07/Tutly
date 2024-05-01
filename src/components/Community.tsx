'use client'
import  { useState } from 'react'
import Accordion from "./accordion";
import Image from 'next/image';

export default function CommunityForum({ allDoubts, currentUser }: any) {
  const [currentCourse, setCurrentCourse] = useState<string>(allDoubts[0]?.id);
  const filteredallDoubts = allDoubts.filter(
    (x: any) => x.id === currentCourse
  );

  
  if(!currentUser) return <div className="text-center">Sign in to view doubts!</div>  
  if(filteredallDoubts?.length === 0) return <div className="flex flex-col gap-4 w-full">
      <h1 className="text-center py-8 text-4xl font-bold  bg-gradient-to-r from-purple-700 to-pink-700 rounded-lg text-white">Community Forum</h1>
      <p className=' text-xl font-semibold mt-5 flex justify-center items-center'>
        No course is enrolled yet!
      </p>
      <Image
          src="https://i.postimg.cc/N0JMHNDw/undraw-Notify-re-65on-1-removebg-preview.png"
          height={400}
          className="m-auto "
          width={400}
          alt=""
        />
    </div>
  
  return (
    <div className="flex flex-col gap-4 w-full">
      <div className="w-full overflow-hidden">
        <div className="flex animate-marquee">  
          <p className="text-sm font-medium dark:text-white">This community forum fosters an environment where anyone can contribute insights and solutions to each other&apos;s inquiries. </p>
        </div>
      </div>
      <h1 className="text-center py-8 text-4xl font-bold  bg-gradient-to-r from-blue-500 to-teal-500 rounded-lg text-white">Community Forum</h1>
      <div className="flex gap-3">
        {allDoubts?.map((course: any) => (
          course.isPublished === true &&
          <button
          onClick={() => setCurrentCourse(course.id)}
          className={`rounded p-2 w-20 sm:w-auto ${
              currentCourse === course?.id && "border rounded"
            }`}
            key={course?.id}
            >
            <h1 className="truncate max-w-xs text-sm font-medium">{course.title}</h1>
          </button>
        ))}
      </div>
      <div className="flex flex-col gap-2 min-h-screen">
        {filteredallDoubts && (
            <Accordion currentCourseId={currentCourse} currentUser={currentUser} doubts={filteredallDoubts[0]?.doubts} />   
        )}
      </div>
    </div>
  );
}
