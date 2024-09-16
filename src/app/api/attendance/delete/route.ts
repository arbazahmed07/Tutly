import { deleteClassAttendance } from "@/actions/attendance";
import getCurrentUser from "@/actions/getCurrentUser";
import { type NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const { classId }: any = await request.json();
  const currentUser = await getCurrentUser();
  try {
    if (!currentUser || currentUser.role !== "INSTRUCTOR") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    await deleteClassAttendance(classId);
    return NextResponse.json({ message: "Attendance deleted successfully!" });
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 400 });
  }
}
