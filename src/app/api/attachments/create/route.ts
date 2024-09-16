import { createAttachment } from "@/actions/attachments";
import getCurrentUser from "@/actions/getCurrentUser";
import { type NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const data = await request.json();
  try {
    const currentUser = await getCurrentUser();
    const isCourseAdmin = currentUser?.adminForCourses?.some(
      (course) => course.id === data.courseId,
    );
    const haveAccess =
      currentUser && (currentUser.role === "INSTRUCTOR" ?? isCourseAdmin);
    if (!haveAccess) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const attachment = await createAttachment(data);
    return NextResponse.json(attachment);
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 400 });
  }
}
