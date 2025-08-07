import { connectToDatabase } from "@/lib/db";
import User from "@/models/User";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest){
    await connectToDatabase();      
    try {   
        
        const {searchParams} = new URL(req.url);
        const username = searchParams.get("username");

        const user = await User.findOne({name: username})

        return NextResponse.json({
            name: user.name,
            bio: user.bio
        }, {status: 200})

    } catch (error) {
        return NextResponse.json({message: error}, {status: 400})
    }

}