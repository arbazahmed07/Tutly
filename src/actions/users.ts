import { db } from "@/lib/db"

export const getAllEnrolledUsers = async(courseId:string) => {
    const x = await db.user.findMany({
        where:{
            enrolledUsers:{
                some:{
                    courseId:courseId,
                }
            }
        },
        select:{
            id:true,
            image:true,
            username:true,
            name:true,
            email:true,
        }
    });
    return x;
}