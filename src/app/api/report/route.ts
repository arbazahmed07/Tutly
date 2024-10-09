import { generateReport } from "@/actions/report";
import { type NextRequest, NextResponse } from "next/server";

interface ReportType {
  courseId: string;
}

export async function POST(req: NextRequest) {
  try {
    const { courseId } = (await req.json()) as ReportType;

    const report = await generateReport(courseId);

    return NextResponse.json(report, { status: 200 });
  } catch {
    return NextResponse.json(
      { message: "Error generating report" },
      { status: 500 },
    );
  }
}
