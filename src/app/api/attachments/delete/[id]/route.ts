import { deleteAttachment } from "@/actions/attachments";
import getCurrentUser from "@/actions/getCurrentUser";
import { type NextRequest, NextResponse } from "next/server";

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } },
) {
  try {
    const currentUser = await getCurrentUser();
    if (!currentUser) {
      return NextResponse.json({ error: "User not found" }, { status: 400 });
    }
    if (currentUser.role !== "INSTRUCTOR") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const assignment = await deleteAttachment(params.id);
    return NextResponse.json({ assignment });
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 400 });
  }
}
