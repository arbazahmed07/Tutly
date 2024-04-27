import { updateClass  } from "@/actions/classes";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(request: NextRequest) {
    const data = await request.json();
    try {
        const myClass = await updateClass(data);
        return NextResponse.json(myClass);
    } catch (e :any) {
        console.log(e.message);
        return NextResponse.json({ error: e.message }, { status: 400 });
        
    }
}