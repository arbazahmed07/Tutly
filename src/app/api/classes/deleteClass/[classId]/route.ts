import { NextResponse, type NextRequest } from "next/server";
import { deleteClass } from "@/actions/classes";
import getCurrentUser from "@/actions/getCurrentUser";

export async function DELETE(
  req: NextRequest,
  { params }: { params: { classId: string } },
) {
  try {
    const courseId = req.nextUrl.searchParams.get("courseId");
    const currentUser = await getCurrentUser();
    const isCourseAdmin = currentUser?.adminForCourses?.some(
      (course) => course.id === courseId,
    );

    const haveAccess =
      currentUser && (currentUser.role === "INSTRUCTOR" ?? isCourseAdmin);

    if (!haveAccess) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const res = await deleteClass(params.classId);

    if (res.success)
      return NextResponse.json({ message: "Class deleted successfully" });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
