import { postAttendance } from "@/actions/attendance";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    const {classId,data} = await request.json();
    try{
        const res  =await postAttendance({classId,data});
        return NextResponse.json(res);
    }catch(e:any){
        return NextResponse.json({ error: e.message }, { status: 400 });
    }
}