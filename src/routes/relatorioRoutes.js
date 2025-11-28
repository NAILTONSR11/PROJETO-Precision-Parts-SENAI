import express from "express";
import { cadastrarRelatorio, listarRelatorios, deletarRelatorio } from "../controllers/relatorioController.js";

const router = express.Router();


router.get("/", listarRelatorios);
router.post("/", cadastrarRelatorio);
router.delete("/:id", deletarRelatorio);

export default router;
