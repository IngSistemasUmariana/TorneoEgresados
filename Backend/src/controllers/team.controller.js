import { Team } from "../models/team.model.js";
import { Sport } from "../models/sport.model.js";
import { sendMail, teamRegisteredTemplate, newPlayerTemplate } from "../services/mailer.js";

export const createTeam = async (req, res) => {
  try {
    const { sport, sportName, teamName, captainName, captainId, phone, email, players } = req.body;
    let sportId = sport;
    if (!sportId && sportName) {
      const s = await Sport.findOne({ name: new RegExp(`^${sportName}$`, "i") });
      if (!s) return res.status(400).json({ message: "Deporte no válido (por nombre)" });
      sportId = s._id;
    }
    const sportFound = await Sport.findById(sportId);
    if (!sportFound) return res.status(400).json({ message: "Deporte no válido" });

    const team = await Team.create({
      sport: sportFound._id,
      teamName,
      captainName,
      captainId,
      phone,
      email,
      players
    });

    console.log("🟢 Equipo CREADO:", {
      id: team._id.toString(),
      teamName,
      sport: sportFound.name,
      captain: captainName,
      email
    });

    const html = teamRegisteredTemplate(team.toObject(), sportFound.toObject());
    const mailInfo = await sendMail(email, "🏆 Registro Exitoso - Egresado Leyendas", html);

    return res.status(201).json({
      ok: true,
      team,
      mail: {
        to: email,
        messageId: mailInfo?.messageId,
        accepted: mailInfo?.accepted,
        rejected: mailInfo?.rejected
      }
    });
  } catch (error) {
    console.error("❌ Error CREATE TEAM:", error?.message || error);
    return res.status(400).json({ ok: false, message: error.message });
  }
};

export const getTeams = async (_req, res) => {
  const teams = await Team.find().populate("sport").sort({ createdAt: -1 });
  res.json(teams);
};

export const getTeam = async (req, res) => {
  const team = await Team.findById(req.params.id).populate("sport");
  if (!team) return res.status(404).json({ message: "Equipo no encontrado" });
  res.json(team);
};

export const updateTeam = async (req, res) => {
  const team = await Team.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(team);
};

export const deleteTeam = async (req, res) => {
  await Team.findByIdAndDelete(req.params.id);
  res.json({ message: "Equipo eliminado correctamente" });
};

export const autoEnroll = async (req, res) => {
  try {
    const { name, idNumber, program, sport, sportName, email } = req.body;
    if (!name || !idNumber || !program)
      return res.status(400).json({ message: "name, idNumber y program son obligatorios" });

    let sportId = sport;
    if (!sportId && sportName) {
      const s = await Sport.findOne({ name: new RegExp(`^${sportName}$`, "i") });
      if (!s) return res.status(400).json({ message: "Deporte no válido (por nombre)" });
      sportId = s._id;
    }
    const sportFound = await Sport.findById(sportId);
    if (!sportFound) return res.status(400).json({ message: "Deporte no válido" });

    const candidates = await Team.aggregate([
      { $match: { sport: sportFound._id } },
      { $addFields: { playersCount: { $size: { $ifNull: ["$players", []] } } } },
      { $match: { playersCount: { $lt: 8 } } },
      { $project: { teamName: 1, captainName: 1, email: 1, playersCount: 1 } }
    ]);

    if (!candidates.length)
      return res.status(409).json({ message: "No hay equipos con cupo para este deporte" });

    const randomIndex = Math.floor(Math.random() * candidates.length);
    const selected = candidates[randomIndex];

    const team = await Team.findById(selected._id);
    const newPlayer = { name, idNumber, program, email: email || null };
    team.players.push(newPlayer);
    await team.save();

    console.log("🟦 AUTO-MATRÍCULA:", {
      player: newPlayer,
      team: { id: team._id.toString(), teamName: team.teamName, sport: sportFound.name },
      playersCount: team.players.length
    });

    // Correos
    const htmlNotify = newPlayerTemplate(team.toObject(), newPlayer, sportFound.toObject());
    if (team.email) await sendMail(team.email, "👤 Nuevo Jugador en tu Equipo - Egresado Leyendas", htmlNotify);
    if (email) await sendMail(email, "✅ Confirmación de Auto-Matrícula", htmlNotify);

    return res.status(200).json({
      ok: true,
      teamId: team._id,
      teamName: team.teamName,
      sport: sportFound.name,
      player: newPlayer
    });
  } catch (error) {
    console.error("❌ Error AUTO-ENROLL:", error?.message || error);
    return res.status(400).json({ ok: false, message: error.message });
  }
};
