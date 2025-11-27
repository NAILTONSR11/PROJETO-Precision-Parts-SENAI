import express from "express";
import { cadastrarRelatorio, listarRelatorios, deletarRelatorio } from "../controllers/relatorioController.js";

const router = express.Router();

/* router.get("/", (req, res) => res.send("rota relatorio funcionando!"));
router.post("/", (req, res) => res.send("rota POST funcionando!"));
router.delete("/:id", (req, res) => res.send("rota DELETE funcionando!")); */

router.get("/", listarRelatorios);
router.post("/", cadastrarRelatorio);
router.delete("/:id", deletarRelatorio);

export default router;
