import  Jwt from "jsonwebtoken";
import { NextRequest, NextResponse } from "next/server";
import jwt from 'jsonwebtoken';

export async function GET(request:NextRequest){
    try {
        const token = request.cookies.get("token")?.value || "";
        const data:any = jwt.verify(token, process.env.TOKEN_SECRET!);
        if(data.id){
            return NextResponse.json(data.id, {status:200})
        }else{
            return NextResponse.json("-1", {status:200})
        }
    } catch (error) {
        return NextResponse.json("-1", {status:200})
    }
}