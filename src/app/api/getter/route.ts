
import { NextResponse } from "next/server";
import connect from "@/dbconfig/dnConfig";
import User from "@/models/userModel";

connect();

export const POST = async (request:NextResponse) => {

    try {
        const reqBody = await request.json()
        const {email} = reqBody;
        console.log(reqBody);
        const user = await User.find({email:email})
        return NextResponse.json(user)
    } catch (error) {
        return new NextResponse("err")
    } 
    
}