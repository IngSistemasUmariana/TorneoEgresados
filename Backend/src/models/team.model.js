import mongoose from "mongoose";

const playerSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  idNumber: { type: String, required: true, trim: true },
  program: { type: String, trim: true },
  email: { type: String, trim: true },
  joinedAt: { type: Date, default: Date.now }
}, { _id: false });

const teamSchema = new mongoose.Schema({
  sport: { type: mongoose.Schema.Types.ObjectId, ref: "Sport", required: true },
  teamName: { type: String, required: true, trim: true },
  captainName: { type: String, required: true, trim: true },
  captainId: { type: String, required: true, trim: true },
  phone: { type: String, required: true, trim: true },
  email: { type: String,trim: true },
  players: [playerSchema]
}, { timestamps: true });

export const Team = mongoose.model("Team", teamSchema);
