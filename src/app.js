import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import inspetorRoute from "./routes/inspetorRoutes.js";
import relatorioRoute from "./routes/relatorioRoutes.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

connectDB();

app.use('/inspetor', inspetorRoute);
app.use("/relatorio", relatorioRoute);
app.get("/teste", (req, res) => {
  res.send("rota funcionando!");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () =>{
  console.log(`Servidor rodando da porta ${PORT}, 
    http://localhost:${PORT}` )
})
