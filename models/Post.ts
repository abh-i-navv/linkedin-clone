import mongoose, { model, models, Schema } from "mongoose";

export interface Post{
    content: string;
    author: {
        name: string;
        _id: string;
    };
    createdAt: Date;
    _id: string;
}

const postSchema = new Schema<Post>({
    content: { type: String, required: true },
    author: {type: mongoose.Schema.Types.ObjectId, ref: "User", required: true}
},{timestamps: true})

const Post = models?.Post || model<Post>("Post", postSchema)
export default Post