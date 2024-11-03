import mongoose from "mongoose";

export async function dbConnect() {
    try {
        await mongoose.connect('mongodb://localhost:27017/hacktober')
    } catch(err) {
        console.log("db not connected")
    }
}