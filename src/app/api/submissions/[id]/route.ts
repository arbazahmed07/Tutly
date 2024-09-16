import { deleteSubmission } from "@/actions/points";
import { type NextRequest, NextResponse } from "next/server";

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } },
) {
  try {
    const submissionId = params.id;

    await deleteSubmission(submissionId);
    return NextResponse.json({ message: "Submission deleted" });
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 400 });
  }
}
