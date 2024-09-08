'use client'
import { useState } from 'react'
import Accordion from "./accordion";
import Image from 'next/image';
import NoDataFound from './NoDataFound';

export default function CommunityForum({ allDoubts, currentUser }: any) {
  const [currentCourse, setCurrentCourse] = useState<string>(allDoubts[0]?.id);
  const filteredallDoubts = allDoubts.filter(
    (x: any) => x.id === currentCourse
  );


  if (!currentUser) return <div className="text-center">Sign in to view doubts!</div>
  if (filteredallDoubts?.length === 0) return (
    <div className="flex flex-col gap-4 w-full">
      <h1 className="text-center py-8 text-4xl font-bold  bg-gradient-to-r from-purple-700 to-pink-700 rounded-lg text-white">Community Forum</h1>
      <NoDataFound message="No doubts found!" />
    </div>
  )
  return (
    <div className="flex flex-col gap-4 w-full">
      <h1 className="text-center py-8 text-4xl font-bold  bg-gradient-to-r from-blue-500 to-teal-500 rounded-lg text-white">Community Forum</h1>
      <div className="flex gap-3">
        {allDoubts?.map((course: any) => (
          course.isPublished === true &&
          <button
            onClick={() => setCurrentCourse(course.id)}
            className={`rounded p-2 w-20 sm:w-auto ${currentCourse === course?.id && "border rounded"
              }`}
            key={course?.id}
          >
            <h1 className="truncate max-w-xs text-sm font-medium">{course.title}</h1>
          </button>
        ))}
      </div>
      <div className="flex flex-col gap-2">
        {filteredallDoubts && (
          <Accordion currentCourseId={currentCourse} currentUser={currentUser} doubts={filteredallDoubts[0]?.doubts} />
        )}
      </div>
    </div>
  );
}
