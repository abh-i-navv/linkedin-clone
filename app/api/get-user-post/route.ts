import { connectToDatabase } from "@/lib/db";
import Post from "@/models/Post";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest){
    await connectToDatabase();    
    try {   

        const {searchParams} = new URL(request.url);
        const username = searchParams.get("username");

        let posts
        if(username){
            posts = await Post.aggregate([
                {
                    $lookup:
                    {
                        from: "users",
                        localField: "author",
                        foreignField: "_id",
                        as: "author",
                    },
                },
                {
                    $unwind:
                    {
                        path: "$author",
                    },
                },
                {
                    $match: {
                        "author.name": username
                    }
                },
                {
                    $sort: {
                    createdAt: -1
                    }
                }
            ])

        }
        else{        
            posts = await Post.aggregate([
                {
                    $lookup:
                    {
                        from: "users",
                        localField: "author",
                        foreignField: "_id",
                        as: "author",
                    },
                },
                {
                    $unwind:
                    {
                        path: "$author",
                    },
                },
                {
                    $sort: {
                    createdAt: -1
                    }
                }
            ])
        }   
        return NextResponse.json({posts}, {status: 200})

    } catch (error) {
        return NextResponse.json({message: error}, {status: 400})
    }

}