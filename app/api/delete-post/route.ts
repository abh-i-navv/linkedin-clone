import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db";
import Post from "@/models/Post";

export async function DELETE(req: NextRequest) {
  await connectToDatabase();

  try {
    const body = await req.json(); 
    const { id } = body;

    if (!id) {
      return NextResponse.json({ message: "Post ID is required" }, { status: 400 });
    }

    const deletedPost = await Post.findByIdAndDelete(id);

    if (!deletedPost) {
      return NextResponse.json({ message: "Post not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Post deleted successfully" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Error deleting post", error }, { status: 500 });
  }
}
