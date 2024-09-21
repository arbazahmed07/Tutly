import { getMentorStudents } from "@/actions/courses";
import getCurrentUser from "@/actions/getCurrentUser";
import { getAllEnrolledUsers } from "@/actions/users";
import { type NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const { courseId } = (await request.json()) as { courseId: string };

  try {
    const currentUser = await getCurrentUser();
    if (!currentUser || currentUser.role === "STUDENT") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 400 });
    }
    const users =
      currentUser.role === "MENTOR"
        ? await getMentorStudents(courseId)
        : await getAllEnrolledUsers(courseId);
    return NextResponse.json(users);
  } catch {
    return NextResponse.json(
      { error: "Error getting students" },
      { status: 400 },
    );
  }
}
