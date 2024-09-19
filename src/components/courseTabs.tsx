"use client"
import Link from 'next/link'
import { usePathname } from 'next/navigation';
import React from 'react'

function CourseTabs({courses,currentUser}:any) {
    const pathname = usePathname();
  return (
    <div className='flex gap-3 m-8'>
        {
            courses?.map((course:any) => {
                return <Link key={course?.id} href={currentUser?.role==="MENTOR" ? `/mentor/statistics/${course?.id}` : currentUser?.role==="INSTRUCTOR" ? `/instructor/statistics/${course?.id}` : `/statistics/${course?.id}`} className={`p-1 px-2 rounded  ${pathname.includes(course?.id) ? "bg-blue-500" : "hover:bg-blue-500/75"}`}>{course?.title}</Link>
            })
        }
    </div>
  )
}

export default CourseTabs;