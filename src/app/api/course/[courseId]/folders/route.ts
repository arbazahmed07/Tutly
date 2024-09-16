import { foldersByCourseId } from "@/actions/courses";
import getCurrentUser from "@/actions/getCurrentUser";
import { type NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: { courseId: string } },
) {
  try {
    const currentUser = await getCurrentUser();

    const isCourseAdmin = currentUser?.adminForCourses?.some(
      (course) => course.id === params.courseId,
    );

    const haveAccess =
      currentUser && (currentUser.role === "INSTRUCTOR" ?? isCourseAdmin);

    if (!haveAccess) {
      return NextResponse.json(
        { error: "You do not have access to this course", isCourseAdmin },
        { status: 403 },
      );
    }
    const folders = await foldersByCourseId(params.courseId);
    return NextResponse.json(folders);
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 400 });
  }
}
