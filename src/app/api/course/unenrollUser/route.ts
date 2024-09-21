import { unenrollStudentFromCourse } from "@/actions/courses";
import { type NextRequest, NextResponse } from "next/server";

interface UnenrollUserType {
  courseId: string;
  username: string;
}

export async function POST(request: NextRequest) {
  const { courseId, username } = (await request.json()) as UnenrollUserType;

  try {
    const user = await unenrollStudentFromCourse(courseId, username);

    return NextResponse.json(user);
  } catch {
    return NextResponse.json(
      { error: "Error unenrolling user" },
      { status: 400 },
    );
  }
}
