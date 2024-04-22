"use client"

import { useRouter } from "next/navigation";
import { IoMdBookmarks } from "react-icons/io";

export default function CourseCard({ course, percent, classesCompleted }: any) {
    const router = useRouter();
    return (
        <div key={course.id} onClick={course._count.classes===0?()=>alert("No classes available!"):() => router.push(`/courses/${course.id}`)} className="rounded-xl border cursor-pointer m-5">
            <div className="h-[200px] flex relative">
                <div className="absolute bottom-0 right-0 m-4 text-sm flex items-center">
                    <IoMdBookmarks className="mr-2"/>
                    <h1>{course._count.classes} Classes</h1>
                </div>
            </div>
            <div className="h-[50px] border-t flex justify-center items-center">
                <h1 className="text-lg">{course.title}</h1>
            </div>
        </div>
    )
}