import { postAttendance } from "@/actions/attendance";
import { getMentorStudents } from "@/actions/courses";
import getCurrentUser from "@/actions/getCurrentUser";
import { getAllEnrolledUsers } from "@/actions/users";
import { type NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const { courseId } = await request.json();

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
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 400 });
  }
}
