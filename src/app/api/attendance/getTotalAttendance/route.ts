import { getTotalNumberOfClassesAttended } from "@/actions/attendance";
import { totalNumberOfClasses } from "@/actions/classes";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const totalAttendance = await getTotalNumberOfClassesAttended();
    const totalCount = await totalNumberOfClasses();
    

    const jsonData = Object.entries(totalAttendance).map(
      ([username, count]) => ({
        username,
        percentage: (Number(count)/totalCount)*100,
      })
    );

    return NextResponse.json(jsonData, { status: 200 });
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 400 });
  }
}
