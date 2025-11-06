import express from "express";
import {
  createTeam,
  getTeams,
  getTeam,
  updateTeam,
  deleteTeam,
  autoEnroll
} from "../controllers/team.controller.js";

const router = express.Router();

/**
 * @swagger
 * /api/teams:
 *   get:
 *     summary: Listar equipos
 *   post:
 *     summary: Crear equipo
 */
router.post("/", createTeam);
router.get("/", getTeams);
router.get("/:id", getTeam);
router.put("/:id", updateTeam);
router.delete("/:id", deleteTeam);
router.post("/auto-enroll", autoEnroll);

export default router;
