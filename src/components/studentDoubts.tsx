"use client"
import React, { useState } from "react";

function StudentDoubts({ courses }: any) {
    const [currentCourse,setCurrentCourse] = useState(courses[0].id)
  return (
    <div>
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
              <h1 className="truncate max-w-xs text-sm font-medium">
                {course.title}
              </h1>
            </button>
          );
        })}
      </div>
      <div>
        
      </div>
    </div>
  );
}

export default StudentDoubts;
