import { deleteAnyDoubt } from "@/actions/doubts";
import getCurrentUser from "@/actions/getCurrentUser";
import { type NextRequest, NextResponse } from "next/server";

export async function DELETE(
  request: NextRequest,
  {
    params,
  }: {
    params: { id: string };
  },
) {
  const { id } = params;

  try {
    const currentUser = await getCurrentUser();
    if (!currentUser || currentUser.role === "STUDENT") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 400 });
    }
    await deleteAnyDoubt(id);
    return NextResponse.json({ id });
  } catch {
    return NextResponse.json(
      { error: "Error deleting doubt" },
      { status: 400 },
    );
  }
}
