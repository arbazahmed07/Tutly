import { createClass  } from "@/actions/createClass";
import { log } from "console";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    const data = await request.json();

    console.log(data);
    
    try {
        const myClass = await createClass(data);
        return NextResponse.json(myClass);
    } catch (e :any) {
        return NextResponse.json({ error: e.message }, { status: 400 });
    }
}