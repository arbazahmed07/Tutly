import { generateReport } from "@/actions/report";
import { type NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { courseId } = await req.json();

    const report = await generateReport(courseId);

    return NextResponse.json(report, { status: 200 });
  } catch (e: any) {
    return NextResponse.json({ message: e.message }, { status: 500 });
  }
}
