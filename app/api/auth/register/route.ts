import { connectToDatabase } from "@/lib/db";
import User from "@/models/User";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest){
    try {
        const {email,password,name,bio} = await request.json()

        if(!email || !password){
            return NextResponse.json(
                {error: "Email and password are required"},
                {status: 400}
            )
        }

        await connectToDatabase()

        const existingUser = await User.findOne({email})
        const existingUsername = await User.findOne({name})
        if(existingUser){
            return NextResponse.json(
                {error: "User already registered"},
                {status: 400}
            )
        }
        if(existingUsername){
            return NextResponse.json(
                {error: "Username already taken"},
                {status: 400}
            )
        }

        const newUser = await User.create({
            name,
            email,
            password,
            bio
        })

        console.log("New user created:", newUser)

        if(newUser){
            return NextResponse.json(
                {message: newUser},
                {status:200}
            )
        }

    } catch (err) {
        return NextResponse.json(
                {error: err},
                {status:400}
            )
    }
}