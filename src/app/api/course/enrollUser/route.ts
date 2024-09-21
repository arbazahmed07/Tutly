import { enrollStudentToCourse } from "@/actions/courses";
import { type NextRequest, NextResponse } from "next/server";

interface EnrollUserType {
  courseId: string;
  username: string;
}

export async function POST(request: NextRequest) {
  const { courseId, username } = (await request.json()) as EnrollUserType;

  try {
    const user = await enrollStudentToCourse(courseId, username);
    return NextResponse.json(user);
  } catch {
    return NextResponse.json(
      { error: "Error enrolling user" },
      { status: 400 },
    );
  }
}
