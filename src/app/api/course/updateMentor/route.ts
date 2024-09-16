import { NextResponse, type NextRequest } from "next/server";
import { updateMentor } from "@/actions/courses";

export async function POST(request: NextRequest) {
  const { courseId, username, mentorUsername } = await request.json();

  try {
    const user = await updateMentor(courseId, username, mentorUsername);

    return NextResponse.json(user);
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 400 });
  }
}
