import { createCourse } from "@/actions/courses";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    const {title,isPublished,image} = await request.json();

    try {
        const course = await createCourse({title,isPublished,image})
    
        if (!course ) {
            return NextResponse.json({ error: "Failed to add newClass" }, { status: 400 });
        }
        
        return NextResponse.json(course);
    } catch (e :any) {
        return NextResponse.json({ error: e.message }, { status: 400 });
    }
}

export async function DELETE (request: NextRequest) {
    const {id} = await request.json();

    try {
        const course = await deleteCourse(id)
    
        if (!course ) {
            return NextResponse.json({ error: "Failed to delete course" }, { status: 400 });
        }
        
        return NextResponse.json(course);
    } catch (e :any) {
        return NextResponse.json({ error: e.message }, { status: 400 });
    }
}