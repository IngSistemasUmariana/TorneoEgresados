import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      autoIndex: process.env.NODE_ENV !== "production",
      serverSelectionTimeoutMS: 10000
    });
    console.log("✅ MongoDB conectado correctamente");
  } catch (error) {
    console.error("❌ Error al conectar MongoDB:", error.message);
    process.exit(1);
  }
};
