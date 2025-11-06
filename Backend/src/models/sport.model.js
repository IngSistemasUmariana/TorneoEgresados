import mongoose from "mongoose";

const sportSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true, trim: true },
  description: String,
  color: { type: String, default: "#2563eb" },
  icon: { type: String }
}, { timestamps: true });

export const Sport = mongoose.model("Sport", sportSchema);
