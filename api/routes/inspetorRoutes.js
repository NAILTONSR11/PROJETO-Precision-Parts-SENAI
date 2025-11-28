import express from "express";
import { 
    cadastrarInspetor, 
    listarInspetores,
    deletarInspetor
} from "../controllers/inspetorController.js";

const router = express.Router();

// Listar todos
router.get("/", listarInspetores);

// Criar novo
router.post("/", cadastrarInspetor);

// Deletar por ID
router.delete("/:id", deletarInspetor);

export default router;
