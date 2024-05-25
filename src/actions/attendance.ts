import { db } from "@/lib/db";
import getCurrentUser from "./getCurrentUser";

export const postAttendance = async ({classId,data}: {
    classId: string;
    data: { username: string,Duration:number }[];
}) => {
    const currentUser = await getCurrentUser();
    if (!currentUser) {
        throw new Error("You must be logged in to attend a class");
    }
    const parsedData = JSON.parse(JSON.stringify(data))
    const postAttendance = await db.attendance.createMany({
        data: [
            ...parsedData.map((student:any) => ({
                classId,
                username: student.username,
                attendedDuration:student.Duration,
                data: student?.Joins
            }))
        ]
    })
    return postAttendance
}

export const getAttendanceForMentorBarChart = async () => {
    const currentUser = await getCurrentUser();
    if (!currentUser) {
        throw new Error("You must be logged in to attend a class");
    }
    let attendance;
    if(currentUser.role==="MENTOR") {
        attendance = await db.attendance.findMany({
            where: {
                user:{
                    enrolledUsers:{
                        some:{
                            mentorUsername:currentUser.username
                        }
                    }
                },
                attended:true
            }
        })
    }else{
        attendance = await db.attendance.findMany({
            where: {
                attended:true,
            }
        })
    }
    const getAllClasses = await db.class.findMany({
        select:{
            id:true,
            createdAt:true,
        },
        orderBy:{
            createdAt:"asc"
        }
    });
    const classes = <any>[];
    const attendanceInEachClass = <any>[];
    getAllClasses.forEach((classData) => {
        classes.push(classData.createdAt.toISOString().split("T")[0]);
        const tem = attendance.filter((attendanceData) => attendanceData.classId === classData.id)
        attendanceInEachClass.push(tem.length);
    })
    return {classes,attendanceInEachClass}
}