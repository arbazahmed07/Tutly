"use client";

import { useState } from "react";
import Link from "next/link";
import { FaSearch } from "react-icons/fa";

export default function StudentsInfoForMentor({ currentUser, mstudents ,mentorUsername, courseId}: {
  currentUser: any;
  mstudents: any;
  mentorUsername: any;
  courseId: any
}) {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredStudents = mstudents.filter(
    (student: any) =>
      student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.username.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="mx-3">
      <div className="w-full flex items-center justify-end mb-3 relative">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="mb-4 p-2 border rounded-xl bg-primary-900 "
        />
        <FaSearch className="w-5 h-5 cursor-pointer absolute top-[10px] -bottom-5 right-3 text-gray-50" />
      </div>
      <div className="flex flex-wrap gap-8 justify-center">
        {filteredStudents.map((student: any, index: any) => (
          <Link
            key={index}
            href={
              currentUser?.role === "INSTRUCTOR"
                ? `/instructor/statistics/${courseId}/mentor/${mentorUsername}/student/${student.username}`
                : `/mentor/statistics/student/${student.username}`
            }
            className="rounded-xl shadow-blue-500 shadow-sm p-2 w-1/4"
          >
            <div className="py-2">
              <h1 className="text-sm font-medium">{student.name}</h1>
              <h1 className="text-xs">@{student.username}</h1>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
