// routes/pdf.routes.js
import { Router } from "express";
import { generatePlayersPDF } from "../controllers/pdf.controller.js";

const router = Router();

router.get("/players/pdf", generatePlayersPDF);

export default router;
