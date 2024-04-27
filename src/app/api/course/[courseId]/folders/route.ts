import { foldersByCourseId } from "@/actions/courses";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest, { params }: { params: {courseId: string }}) {
    try {
        const folders = await foldersByCourseId(params.courseId);
        return NextResponse.json(folders);
    } catch (e :any) {
        return NextResponse.json({ error: e.message }, { status: 400 });
    }
}