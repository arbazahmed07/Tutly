import { getAllEnrolledUsers } from "@/actions/users";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    const {courseId} = await request.json();

    try {
        const users = await getAllEnrolledUsers(courseId);
        return NextResponse.json(users);
    } catch (e :any) {
        return NextResponse.json({ error: e.message }, { status: 400 });
    }
}