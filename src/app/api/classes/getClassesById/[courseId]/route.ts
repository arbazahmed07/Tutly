import { getCourseClasses } from "@/actions/courses";
import getCurrentUser from "@/actions/getCurrentUser";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest, { params }: { params: {courseId: string }}) {
    try {
        const currentUser = await getCurrentUser();
        if(!currentUser ||currentUser.role !== "INSTRUCTOR") {
            return NextResponse.json({ error: "Unauthorized" }, { status: 400 });
        }
        const myClass = await getCourseClasses(params.courseId);

        const classes = myClass?.map((c) => {
            return {
                id: c.id,
                title: c.title,
                folderTitle: c.Folder?.title,
                createdAt : c.createdAt,
            };
        }
        );
        return NextResponse.json(classes);
    } catch (e :any) {
        return NextResponse.json({ error: e.message }, { status: 400 });
    }
}