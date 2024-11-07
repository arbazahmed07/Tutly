"use client"

import { Role } from '@prisma/client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react'

const CoursesTabs = ({ courses, role }: { courses: any, role: Role }) => {
  const pathname = usePathname()
  return (
    <div className="flex gap-3 p-8">
      {courses?.map(
        (course: any) => (
          <Link
            key={course?.id}
            href={role === "MENTOR"
              ? `/mentor/statistics/${course?.id}`
              : role === "INSTRUCTOR"
                ? `/instructor/statistics/${course?.id}`
                : `/statistics/${course?.id}`
            }
            className={`w-20 rounded p-2 sm:w-auto ${pathname.includes(course?.id)
              ? "rounded border border-blue-500"
              : ""
            }`}
          >
            <h1 className="max-w-xs truncate text-sm font-medium">
              {course?.title}
            </h1>
          </Link>
        )
      )}
    </div>
  )
}

export default CoursesTabs