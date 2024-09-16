"use client";

import { useState } from "react";
import Link from "next/link";
import { FaSearch } from "react-icons/fa";

export default function StudentsInfoForMentor({
  currentUser,
  mstudents,
  mentorUsername,
  courseId,
}: {
  currentUser: any;
  mstudents: any;
  mentorUsername: any;
  courseId: any;
}) {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredStudents = mstudents.filter(
    (student: any) =>
      student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.username.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <div className="mx-3">
      <div className="relative mb-3 flex w-full items-center justify-end">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="mb-4 rounded-xl border bg-primary-900 p-2"
        />
        <FaSearch className="absolute -bottom-5 right-3 top-[10px] h-5 w-5 cursor-pointer text-gray-50" />
      </div>
      <div className="flex flex-wrap justify-center gap-8 max-sm:flex-col">
        {filteredStudents.map((student: any, index: any) => (
          <Link
            key={index}
            href={
              currentUser?.role === "INSTRUCTOR"
                ? `/instructor/statistics/${courseId}/mentor/${mentorUsername}/student/${student.username}`
                : `/mentor/statistics/${courseId}/student/${student.username}`
            }
            className="rounded-xl p-2 shadow-sm shadow-blue-500 md:w-1/4"
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
