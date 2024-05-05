import { postAttendance } from "@/actions/attendance";
import getCurrentUser from "@/actions/getCurrentUser";
import { getAllEnrolledUsers } from "@/actions/users";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    const {courseId} = await request.json();

    try {
        const currentUser = await getCurrentUser();
        if(!currentUser || currentUser.role !== "STUDENT") {
            return NextResponse.json({ error: "Unauthorized" }, { status: 400 });
        }
        const users = await getAllEnrolledUsers(courseId);
        return NextResponse.json(users);
    } catch (e :any) {
        return NextResponse.json({ error: e.message }, { status: 400 });
    }
}
