import connect from "@/dbconfig/dnConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import bcryptjs from "bcryptjs";
import { signIn } from "next-auth/react";
import jwt from "jsonwebtoken";

connect();


export async function POST(request:NextRequest){
    try {
        const reqBody = await request.json();
        const {email, password} = reqBody;

        const user = await User.findOne({email})
        // return NextResponse.json(`${email} -- ${password}` ,{status:200})

        if(!user){
            return NextResponse.json({error: "User does not exist"}, {status: 400})
        }

        const validPassword = await bcryptjs.compare(password, user.password)

        
        if(!validPassword){
            return NextResponse.json({error: "Invalid password"}, {status: 400})
        }

        const tokenData = {
            id:user._id,
            username:user.username,
            password:user.password,
        }

        const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET!,{expiresIn:"1d"});
        const response = NextResponse.json({messageL:"login true",success:true})

        response.cookies.set("token", token,{httpOnly:true});
        return response;
    } catch (error) {
        return NextResponse.json("login error", {status:400})
    }
}