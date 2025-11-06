import dotenv from "dotenv";
import { connectDB } from "./src/config/db.js";
import { app } from "./src/app.js";

dotenv.config();
const PORT = process.env.PORT || 4000;

await connectDB();

app.listen(PORT, () => console.log(`🚀 Servidor en puerto ${PORT} (${process.env.NODE_ENV || "dev"})`));
