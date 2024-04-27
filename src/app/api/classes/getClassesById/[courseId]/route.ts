import { getCourseClasses } from "@/actions/courses";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest, { params }: { params: {courseId: string }}) {
    try {
        const myClass = await getCourseClasses(params.courseId);

        const classes = myClass?.map((c) => {
            return {
                id: c.id,
                title: c.title,
                folderTitle: c.Folder?.title,
            };
        }
        );
        return NextResponse.json(classes);
    } catch (e :any) {
        return NextResponse.json({ error: e.message }, { status: 400 });
    }
}