import { Sport } from "../models/sport.model.js";

export const createSport = async (req, res) => {
  try {
    const sport = await Sport.create(req.body);
    res.status(201).json(sport);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const getSports = async (_req, res) => {
  const sports = await Sport.find().sort({ name: 1 });
  res.json(sports);
};

export const getSport = async (req, res) => {
  const sport = await Sport.findById(req.params.id);
  if (!sport) return res.status(404).json({ message: "No encontrado" });
  res.json(sport);
};

export const updateSport = async (req, res) => {
  const sport = await Sport.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(sport);
};

export const deleteSport = async (req, res) => {
  await Sport.findByIdAndDelete(req.params.id);
  res.json({ message: "Eliminado correctamente" });
};
