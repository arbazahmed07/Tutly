import { unenrollStudentFromCourse } from "@/actions/courses";
import { type NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const { courseId, username } = await request.json();

  try {
    const user = await unenrollStudentFromCourse(courseId, username);

    return NextResponse.json(user);
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 400 });
  }
}
