import mongoose, {Schema, model, models} from "mongoose";
import bcrypt from "bcryptjs";

export interface User{
    name: string;
    email: string;
    password: string;
    bio?: string;
    _id?: mongoose.Types.ObjectId;
    createdAt?: Date;
    updatedAt?: Date;
}

const userSchema = new Schema<User>({
    name: {type: String, required: true, unique:true},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    bio: {type: String, default: ''}},
{
    timestamps: true
})

userSchema.pre('save', async function(next) {
    if(this.isModified("password")){
        this.password = await bcrypt.hash(this.password,10)
    }
    next();
});

const User = models?.User || model<User>("User", userSchema)
export default User