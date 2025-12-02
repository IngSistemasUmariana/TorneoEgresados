// controllers/pdf.controller.js
import PDFDocument from "pdfkit";
import fs from "fs";
import path from "path";
import { Team } from "../models/team.model.js";

export const generatePlayersPDF = async (req, res) => {
  try {
    const teams = await Team.find().populate("sport");

    // MAPA ORDENADO POR DEPORTE
    const sportsMap = {};

    teams.forEach(team => {
      const sportName = team.sport?.name || "Sin Deporte";

      if (!sportsMap[sportName]) {
        sportsMap[sportName] = [];
      }

      // QUITAR DUPLICADOS DE CÉDULAS
      const seenCed = new Set();
      const uniquePlayers = team.players.filter(p => {
        if (seenCed.has(p.idNumber)) return false;
        seenCed.add(p.idNumber);
        return true;
      });

      // EVITAR REPETICIÓN DE EQUIPOS
      if (!sportsMap[sportName].some(t => t.teamId === team._id.toString())) {
        sportsMap[sportName].push({
          teamId: team._id.toString(),
          teamName: team.teamName,
          players: uniquePlayers
        });
      }
    });

    // ============================
    // CREAR PDF
    // ============================
    const doc = new PDFDocument({ margin: 50 });

    const fileName = `jugadores_${Date.now()}.pdf`;
    const filePath = `./pdf/${fileName}`;
    if (!fs.existsSync("./pdf")) fs.mkdirSync("./pdf");
    const stream = fs.createWriteStream(filePath);
    doc.pipe(stream);

    // ============================
    // LOGO
    // ============================
    const logoPath = path.resolve("public/logo_torneo.png");

    if (fs.existsSync(logoPath)) {
      doc.image(logoPath, 210, 20, { width: 180 });
      doc.moveDown(5);
    }

    // ============================
    // TÍTULOS INSTITUCIONALES
    // ============================
    doc.fillColor("#003B99");

    doc
      .fontSize(24)
      .font("Helvetica-Bold")
      .text("MUNDIAL DE LEYENDAS UMariana 2025", { align: "center" });

    doc.moveDown(0.3);

    doc
      .fontSize(18)
      .font("Helvetica")
      .fillColor("#555")
      .text("Lista Oficial de Jugadores Inscritos", { align: "center" });

    doc.moveDown(1.2);

    doc
      .lineWidth(2)
      .strokeColor("#003B99")
      .moveTo(50, doc.y)
      .lineTo(550, doc.y)
      .stroke();

    doc.moveDown(1.5);

    // ============================
    // LISTA FORMAL POR DEPORTE
    // ============================
    Object.keys(sportsMap).forEach(sportName => {
      doc
        .fontSize(18)
        .font("Helvetica-Bold")
        .fillColor("#003B99")
        .text(sportName.toUpperCase());

      doc.moveDown(0.4);

      doc
        .lineWidth(1.2)
        .strokeColor("#003B99")
        .moveTo(50, doc.y)
        .lineTo(550, doc.y)
        .stroke();

      doc.moveDown(1);

      sportsMap[sportName].forEach(team => {
        doc
          .fontSize(15)
          .font("Helvetica-Bold")
          .fillColor("#222")
          .text(`Equipo: ${team.teamName}`);

        doc.moveDown(0.5);

        team.players.forEach(player => {
          doc
            .fontSize(13)
            .font("Helvetica")
            .fillColor("#444")
            .text(`${player.idNumber}   —   ${player.name}`, {
              indent: 20
            });
        });

        doc.moveDown(1.2);
      });

      doc.moveDown(1.5);
    });

    // ============================
    // FOOTER ELEGANTE
    // ============================
    doc
      .moveDown(2)
      .fontSize(11)
      .fillColor("#777")
      .text("Documento generado automáticamente por el Sistema del Torneo UMariana.", {
        align: "center"
      });

    doc.end();

    stream.on("finish", () => {
      res.download(filePath, fileName, () => fs.unlinkSync(filePath));
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({ ok: false, message: error.message });
  }
};
