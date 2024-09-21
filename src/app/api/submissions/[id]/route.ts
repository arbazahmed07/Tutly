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
  } catch {
    return NextResponse.json(
      { error: "Error deleting submission" },
      { status: 400 },
    );
  }
}
