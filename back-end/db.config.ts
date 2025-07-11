import dotenv from "dotenv";
dotenv.config();
import mongoose from "mongoose";

const databaseURI = process.env.MONGO_URI;

const connectDB = async () => {
    try {
        if (databaseURI) {
            await mongoose.connect(databaseURI, {});
        }
        console.log("MongoDB connected successfully");
    } catch (error: any) {
        console.error("MongoDB connection error:", error.message);
        // eslint-disable-next-line unicorn/no-process-exit
        process.exit(1);
    }
};

// module.exports = connectDB;
export default connectDB;
