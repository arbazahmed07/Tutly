import { NextResponse, type NextRequest } from "next/server";
import { updateMentor } from "@/actions/courses";

interface UpdateMentorType {
  courseId: string;
  username: string;
  mentorUsername: string;
}

export async function POST(request: NextRequest) {
  const { courseId, username, mentorUsername } =
    (await request.json()) as UpdateMentorType;

  try {
    const user = await updateMentor(courseId, username, mentorUsername);

    return NextResponse.json(user);
  } catch {
    return NextResponse.json(
      { error: "Error updating mentor" },
      { status: 400 },
    );
  }
}
