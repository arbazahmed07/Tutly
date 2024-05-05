import { foldersByCourseId } from "@/actions/courses";
import getCurrentUser from "@/actions/getCurrentUser";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest, { params }: { params: {courseId: string }}) {
    try {
        const currentUser = await getCurrentUser();
        if(!currentUser || currentUser.role !== "INSTRUCTOR") {
            return NextResponse.json({ error: "Unauthorized" }, { status: 400 });
        }
        const folders = await foldersByCourseId(params.courseId);
        return NextResponse.json(folders);
    } catch (e :any) {
        return NextResponse.json({ error: e.message }, { status: 400 });
    }
}