import express from "express";
import {
  createSport,
  getSports,
  getSport,
  updateSport,
  deleteSport
} from "../controllers/sport.controller.js";

const router = express.Router();

/**
 * @swagger
 * /api/sports:
 *   get:
 *     summary: Listar deportes
 *   post:
 *     summary: Crear deporte
 */
router.post("/", createSport);
router.get("/", getSports);
router.get("/:id", getSport);
router.put("/:id", updateSport);
router.delete("/:id", deleteSport);

export default router;
