import getCurrentUser from "@/actions/getCurrentUser";
import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest, { params }: { params: {id: string }}) {
    try{
        const currentUser = await getCurrentUser();
        if(!currentUser){
            return NextResponse.json({ error: "User not found" }, { status: 400 });
        }
        if(currentUser.role === "STUDENT"){
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }
        const attendance = await db.attendance.findMany({
            where:{
                classId:params.id
            }
        })
        return NextResponse.json({attendance:attendance});
    }catch(e:any){
        return NextResponse.json({ error: e.message }, { status: 400 });
    }
}