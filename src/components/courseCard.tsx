"use client"
import { useRouter } from "next/navigation";
import { IoMdBookmarks } from "react-icons/io";

export default function CourseCard({ course, percent, classesCompleted }: any) {
    const router = useRouter();
    return (
        <div hidden={!course.isPublished} key={course.id} onClick={() => router.push(`/courses/${course.id}`) } className="rounded-lg border cursor-pointer m-5" style={{boxShadow: "rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px"}}>
            <div className="h-[150px] flex relative text-secondary-700 bg-white rounded-t-lg">
                <div className="absolute bottom-0 right-0 m-3 text-sm flex items-center">
                    <IoMdBookmarks className="mr-2"/>
                    <h1 className="text-sm font-medium">{course._count.classes} Classes</h1>
                </div>
            </div>
            <div className="h-[50px] border-t flex justify-center items-center">
                <h1 className="text-sm">{course.title}</h1>
            </div>
        </div>
    )
}