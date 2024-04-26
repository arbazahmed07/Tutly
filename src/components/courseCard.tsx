'use client'
import { useRouter } from "next/navigation";
import { IoMdBookmarks } from "react-icons/io";
import Image from "next/image";

export default function CourseCard({ course, percent, classesCompleted }: any) {
    const router = useRouter();
    return (    
        <div hidden={!course.isPublished} key={course.id} onClick={() => router.push(`/courses/${course.id}`) } className="rounded-lg border cursor-pointer m-5 max-w-[400px] sm:w-[300px]" style={{boxShadow: "rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px"}}>
            <div className="h-[150px]  relative text-secondary-700 bg-white rounded-t-lg">
                <div className="h-full w-full relative">
                    {course && course.image && (
                        <Image 
                            src={course.image} 
                            alt="course image" 
                            layout="fill" 
                            className="rounded-t-lg"
                            objectFit="cover"  
                        />
                    )}
                    {
                        !course.image && (
                            <Image 
                                src="https://i.postimg.cc/CMGSNVsg/new-course-colorful-label-sign-template-new-course-symbol-web-banner-vector.jpg" 
                                alt="Default Image" 
                                layout="fill" 
                                className="rounded-t-lg"
                                objectFit="cover"
                                />
                        )
                    }
                </div>
                <div className="absolute bottom-0 right-0 m-3 text-xs flex items-center text-secondary-950 bg-secondary-400 p-1 rounded-md">
                    <IoMdBookmarks className="mr-1"/>
                    <h1 className="text-xs font-medium">{course._count.classes} Classes</h1>
                </div>
            </div>
            <div className="h-[50px] border-t flex justify-center items-center">
                <h1 className="text-sm">{course?.title}</h1>
            </div>
        </div>
    )
}
