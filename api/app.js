import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import inspetorRoute from "./routes/inspetorRoutes.js";
import relatorioRoute from "./routes/relatorioRoutes.js";
import path from "path";
import { fileURLToPath } from "url";

dotenv.config();

const app = express(); // crie o app logo no início
app.use(cors());
app.use(express.json());

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// servir arquivos estáticos da pasta ui
app.use(express.static(path.join(__dirname, "ui")));

// rota para a página inicial
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "ui", "pages", "pagePrincipal.html"));
});

connectDB();

app.use("/inspetor", inspetorRoute);
app.use("/relatorio", relatorioRoute);
app.get("/teste", (req, res) => {
  res.send("rota funcionando!");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}, http://localhost:${PORT}`);
});
