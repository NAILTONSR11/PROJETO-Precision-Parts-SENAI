import express from "express";
import { 
    cadastrarRelatorio, 
    listarRelatorios, 
    deletarRelatorio,
    atualizarRelatorio
} from "../controllers/relatorioController.js";

const router = express.Router();

// ROTAS DE RELATÓRIO
router.get("/", listarRelatorios);        // Listar todos
router.post("/", cadastrarRelatorio);     // Criar
router.put("/:id", atualizarRelatorio);   // Atualizar
router.delete("/:id", deletarRelatorio);  // Deletar

export default router;
