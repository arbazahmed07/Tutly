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