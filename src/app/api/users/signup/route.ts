import connect from "@/dbconfig/dnConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
connect();
export async function POST(request: NextRequest){
    try {
        const reqBody = await request.json()
        const {username, email, password} = reqBody
        console.log(reqBody);
        const user = await User.findOne({email})
        const hashedPassword = await bcryptjs.hash(password, 5)
        if(user){
            return NextResponse.json({error: "User already exists"}, {status: 400})
        }
        const newUser = new User({
            username,
            email,
            password: hashedPassword
        })

        const savedUser = await newUser.save()
        console.log(savedUser);

        //send verification email

        return NextResponse.json({
            message: "User created successfully",
            success: true,
            savedUser
        })
    } catch (error: any) {
        return NextResponse.json({error: error.message}, {status: 500})

    }
}

export async function GET(request:Request){
    try {
        const All_users = await User.find();
        return NextResponse.json(
            All_users,
            {status:200}
        )
    } catch (error) {
        return NextResponse.json("wrong", {status:500})
    }
}

//npm i --save-dev @types/bcryptjs