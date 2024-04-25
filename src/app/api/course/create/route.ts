import { createCourse } from "@/actions/courses";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    const {title,isPublished,image} = await request.json();

    try {
        const course = await createCourse({title,isPublished,image})
        return NextResponse.json(course);
    } catch (e :any) {
        return NextResponse.json({ error: e.message }, { status: 400 });
    }
}