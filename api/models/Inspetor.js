import mongoose from "mongoose";

const inspetorSchema = new mongoose.Schema({
    nome: { type: String, required: true },
    setor: { type: String },
    email: { type: String }
}, { timestamps: true });

export default mongoose.model("Inspetor", inspetorSchema);
