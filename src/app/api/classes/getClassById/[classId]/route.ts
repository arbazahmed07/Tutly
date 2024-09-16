import { getClassDetails } from "@/actions/courses";
import getCurrentUser from "@/actions/getCurrentUser";
import { NextResponse, type NextRequest } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: { classId: string } },
) {
  try {
    const courseId = request.nextUrl.searchParams.get("courseId");
    const currentUser = await getCurrentUser();
    const isCourseAdmin = currentUser?.adminForCourses?.some(
      (course) => course.id === courseId,
    );

    const haveAccess =
      currentUser && (currentUser.role === "INSTRUCTOR" ?? isCourseAdmin);

    if (!haveAccess) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const myClass = await getClassDetails(params.classId);
    return NextResponse.json(myClass);
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 400 });
  }
}
