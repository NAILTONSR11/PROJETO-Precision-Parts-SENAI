import mongoose from "mongoose";

const relatorioSchema = new mongoose.Schema({
    inspetor: { type: mongoose.Schema.Types.ObjectId, ref: "Inspetor", required: true },
    status: { type: String, required: true },
    naoConformidade: { type: String, required: true },
    data: { type: Date, default: Date.now }
}, { timestamps: true });

export default mongoose.model("Relatorio", relatorioSchema);
