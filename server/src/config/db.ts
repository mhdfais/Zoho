import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    const uri = process.env.MONGO_URI;
    if (!uri) {
      throw new Error("no uri found");
    }
    await mongoose.connect(uri);
  } catch (error) {
    console.error("db connection failed");
  }
};
