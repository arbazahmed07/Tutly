import { editAttachment } from "@/actions/attachments";
import getCurrentUser from "@/actions/getCurrentUser";
import { type NextRequest, NextResponse } from "next/server";

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } },
) {
  try {
    const data = await request.json();
    const currentUser = await getCurrentUser();
    const isCourseAdmin = currentUser?.adminForCourses?.some(
      (course) => course.id === data.courseId,
    );
    const haveAccess =
      currentUser && (currentUser.role === "INSTRUCTOR" ?? isCourseAdmin);

    if (!haveAccess) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const assignment = await editAttachment(params.id, data);
    return NextResponse.json({ assignment });
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 400 });
  }
}
