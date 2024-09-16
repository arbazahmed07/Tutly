import { updateClass } from "@/actions/classes";
import getCurrentUser from "@/actions/getCurrentUser";
import { type NextRequest, NextResponse } from "next/server";

export async function PUT(request: NextRequest) {
  const data = await request.json();
  try {
    const courseId = data.courseId;
    const currentUser = await getCurrentUser();
    const isCourseAdmin = currentUser?.adminForCourses?.some(
      (course) => course.id === courseId,
    );

    const haveAccess =
      currentUser && (currentUser.role === "INSTRUCTOR" ?? isCourseAdmin);

    if (!haveAccess) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const myClass = await updateClass(data);
    return NextResponse.json(myClass);
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 400 });
  }
}
