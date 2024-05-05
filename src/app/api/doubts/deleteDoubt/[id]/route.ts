import { deleteAnyDoubt } from "@/actions/doubts";
import getCurrentUser from "@/actions/getCurrentUser";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(request: NextRequest,{params}:{
  params: { id: string }
}) {
  const { id } = params;

  try {
    const currentUser = await getCurrentUser();
    if (!currentUser || currentUser.role === "STUDENT") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 400 });
    }
    await deleteAnyDoubt(id);
    return NextResponse.json({ id });
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 400 });
  }
}
