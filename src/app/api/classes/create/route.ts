import { createClass } from "@/actions/classes";
import getCurrentUser from "@/actions/getCurrentUser";
import { type Class } from "@prisma/client";
import { type NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const data = (await request.json()) as Class;

  try {
    const currentUser = await getCurrentUser();
    const isCourseAdmin = currentUser?.adminForCourses?.some(
      (course) => course.id === data.courseId,
    );
    const haveAccess =
      currentUser && (currentUser.role === "INSTRUCTOR" || isCourseAdmin);

    if (!haveAccess) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const myClass = await createClass(data);
    return NextResponse.json(myClass);
  } catch {
    return NextResponse.json(
      { error: "Failed to create class" },
      { status: 400 },
    );
  }
}
