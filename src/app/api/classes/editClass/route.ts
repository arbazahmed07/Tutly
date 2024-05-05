import { updateClass  } from "@/actions/classes";
import getCurrentUser from "@/actions/getCurrentUser";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(request: NextRequest) {
    const data = await request.json();
    try {
        const currentUser = await getCurrentUser();
        if(!currentUser) {
            return NextResponse.json({ error: "User not found" }, { status: 400 });
        }
        if(currentUser.role !== "INSTRUCTOR") {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }
        const myClass = await updateClass(data);
        return NextResponse.json(myClass);
    } catch (e :any) {
        console.log(e.message);
        return NextResponse.json({ error: e.message }, { status: 400 });
        
    }
}