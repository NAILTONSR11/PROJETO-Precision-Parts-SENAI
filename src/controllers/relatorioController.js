import Relatorio from "../models/relatorio.js";

// Cadastrar relatório
export const cadastrarRelatorio = async (req, res) => {
    try {
        const novoRelatorio = await Relatorio.create(req.body);

        return res.status(201).json({
            message: "Relatório criado com sucesso",
            relatorio: novoRelatorio
        });
    } catch (error) {
        console.error("Erro ao cadastrar relatório:", error);
        return res.status(500).json({ error: "Erro interno ao cadastrar relatório" });
    }
};

// Listar relatórios
export const listarRelatorios = async (req, res) => {
    try {
        const relatorios = await Relatorio.find().populate("inspetor");

        return res.status(200).json(relatorios);
    } catch (error) {
        console.error("Erro ao listar relatórios:", error);
        return res.status(500).json({ error: "Erro interno ao listar relatatórios" });
    }
};

// Deletar relatório
export const deletarRelatorio = async (req, res) => {
    try {
        const { id } = req.params;

        const relatorio = await Relatorio.findByIdAndDelete(id);

        if (!relatorio) {
            return res.status(404).json({ error: "Relatório não encontrado" });
        }

        return res.status(200).json({
            message: "Relatório deletado com sucesso"
        });
    } catch (error) {
        console.error("Erro ao deletar relatório:", error);
        return res.status(500).json({ error: "Erro interno ao deletar relatório" });
    }
};
