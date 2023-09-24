import connect from "@/dbconfig/dnConfig";

import { NextRequest, NextResponse } from "next/server";
import jwt from 'jsonwebtoken';


export async function GET(request: NextRequest){
    try {
        const token = request.cookies.get("token")?.value || "";
        const decoded_data:any = jwt.verify(token, process.env.TOKEN_SECRET!);
        const id = decoded_data.id;
        const response = NextResponse.json({
            message:"logout success"
        },
        {
            status:200
        })
        response.cookies.set("token", "" ,{httpOnly:true, expires: new Date(0)});
        return response;
    } catch (error) {
        return NextResponse.json(`error`, {status:200})
    }
} 