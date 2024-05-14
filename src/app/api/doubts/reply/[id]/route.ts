import { deleteResponse } from "@/actions/doubts";
import getCurrentUser from "@/actions/getCurrentUser";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(request: NextRequest,{params}:{
  params: { id: string }
}) {
  const { id } = params;

  try {
    const currentUser = await getCurrentUser();
    if(!currentUser) {  
      return NextResponse.json({ error: "User not found"},{ status: 400 });
    }
    await deleteResponse(id);
    return NextResponse.json({ id });
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 400 });
  }
}
