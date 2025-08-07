import { connectToDatabase } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import Post from "@/models/Post";

export async function POST(request: NextRequest){
    try {
        await connectToDatabase();

        const body = await request.json()

        const {content} = body;

        const token = await getToken({req: request});

        if(!token || !token.id){
            return NextResponse.json({error: "Unauthorized", status: 401})
        }

        if(!content){
            return NextResponse.json({error: "Content is required", status: 400})
        }

        const newPost = await Post.create({
            content,
            author: token.id
        });
        
        if(newPost){
            return NextResponse.json(
                {message: newPost},
                {status:200}
            )
        }

    } catch (error) {
         return NextResponse.json(
                {error: error},
                {status:400}
            )
    }
}