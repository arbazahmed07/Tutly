import { db } from "@/lib/db";

export const getAllCourses=async()=>{
    try {
        const courses = await db.course.findMany();
        return courses;
    } catch(e) {
        console.log("error while fetching courses :",e);
    }
}

export const getCourseClasses=async({id}:any)=>{
    const classes = await db.class.findMany({
        where:{
            courseId:id as string
        }
    })
    return classes;
}