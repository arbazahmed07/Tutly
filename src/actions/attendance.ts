import { db } from "@/lib/db";
import getCurrentUser from "./getCurrentUser";

export const postAttendance = async ({classId,data}: {
    classId: string;
    data: { Username: string,Duration:number }[];
}) => {
    const currentUser = await getCurrentUser();
    if (!currentUser) {
        throw new Error("You must be logged in to attend a class");
    }
    const postAttendance = await db.attendance.createMany({
        data: [
            ...data.map((student:any) => ({
                classId,
                userId: student.Username,
                attendedDuration:student.Duration
            }))
        ]
    })
    return postAttendance
}