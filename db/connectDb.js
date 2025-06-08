import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI
const connectDB = async () => {
    try {

  await mongoose.connect(MONGODB_URI)
    

    } catch (error) {
        console.error('failed to connect to db ', error);
        process.exit(1)

    }
}

export default connectDB;