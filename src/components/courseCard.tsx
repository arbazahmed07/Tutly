"use client"

import { useRouter } from "next/navigation";

export default function CourseCard({ course, percent, classesCompleted }: any) {
    const router = useRouter();
    return (
        <div key={course.id} onClick={course._count.Classes===0?()=>alert("No classes available!"):() => router.push(`/courses/${course.id}`)} className="w-[300px] rounded-3xl border cursor-pointer">
            <div className="h-[200px] flex relative">
                <div className="h-[5px] absolute rounded border w-[80%] bottom-5 left-[10%]">
                    <div className={`border-2 w-[${percent}%]`}></div>
                </div>
                <div className="absolute bottom-7 right-[50%] text-sm">{classesCompleted}/{course._count.Classes}</div>
            </div>
            <div className="h-[80px] border-t flex justify-center items-center">
                <h1 className="text-3xl">{course.title}</h1>
            </div>
        </div>
    )
}