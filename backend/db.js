import mongoose from "mongoose";

async function connectDB() {
    await mongoose.connect(process.env.MONGODB);
    console.log("Database connected");
}


export default connectDB;