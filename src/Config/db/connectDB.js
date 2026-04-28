import mongoose from "mongoose";

// ─────────────────────────────────────────
// Database connection fn
// ─────────────────────────────────────────
export const connectDB = async () => {
  try {
    const dbName = "Task-board";
    const connUri = process.env.MONGODB_URI;

    if (!connUri) {
      throw new Error(
        "MONGODB_URI is not defined in the environment variables.",
      );
    }
    await mongoose.connect(connUri);
    console.log(`Database Connected Successfully: ${mongoose.connection.host}`);
  } catch (error) {
    console.error(`Database Connected Faild: ${error.message}`);
    process.exit(1);
  }
};
