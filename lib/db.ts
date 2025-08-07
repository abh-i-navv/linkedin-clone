import mongoose from "mongoose";

type ConnectionObject = {
    isConnected?: number
}

const connection:ConnectionObject = {}

export async function connectToDatabase(): Promise<void>{
    if(connection.isConnected){
        console.log("already connected to db")
        return
    }

    try{
        const db =await mongoose.connect(process.env.MONGODB_URI || '', {})

        connection.isConnected = db.connections[0].readyState
    } catch (error){
        console.log("db connection failed", error)
        process.exit(1)
    }
}