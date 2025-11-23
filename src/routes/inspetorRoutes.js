import express from "express";
import { cadastrarInspetor, listarInspetores } from "../controllers/inspetorController.js";
const router = express.Router();

router.get("/", listarInspetores);
router.post("/", cadastrarInspetor);

export default router;