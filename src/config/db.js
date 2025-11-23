import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Banco de dados conectado!");
  } catch (error) {
    console.error("Erro ao conectar com banco de dados!", error);
  }
};
