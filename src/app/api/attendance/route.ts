import { postAttendance } from "@/actions/attendance";
import getCurrentUser from "@/actions/getCurrentUser";
import { type NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const { classId, data, maxInstructionDuration } = await request.json();
  try {
    const currentUser = await getCurrentUser();
    if (!currentUser) {
      return NextResponse.json({ error: "User not found" }, { status: 400 });
    }
    if (currentUser.role === "STUDENT") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const res = await postAttendance({
      classId,
      data,
      maxInstructionDuration,
    });

    return NextResponse.json({ message: "Attendance uploaded successfully!" });
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 400 });
  }
}
