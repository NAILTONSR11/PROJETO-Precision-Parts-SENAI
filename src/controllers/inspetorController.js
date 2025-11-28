import Inspetor from "../models/Inspetor.js";

export const cadastrarInspetor = async(req, res) =>{
    try {
        const {nome, setor, email} = req.body;
        if(!nome)
        return res.status(400).json({error:"Nome é obrigatórios!"});

        const existente = await Inspetor.findOne({nome});
        if(existente)
        return res.status(400).json({error: "Nome já cadastrado!"});

        const novoInspetor = await Inspetor.create({nome, setor, email});
        res.status(201).json(novoInspetor);
    } catch (error) {
        console.error(error);
        res.status(500).json({error: "Erro ao cadastrar Inspetor"})
    }
};

export const listarInspetores = async (req, res)=>{
    try {
        const inspetores = await Inspetor.find().sort({nome:1});
        res.json(inspetores);
    } catch (error) {
            console.error(error);
        res.status(500).json({error: "Erro ao listar Inspetores"})
    }
};

export const deletarInspetor = async (req, res) => {
    try {
        const { id } = req.params;

        // Tenta remover pelo ID
        const excluido = await Inspetor.findByIdAndDelete(id);

        // Se não encontrou
        if (!excluido) {
            return res.status(404).json({ error: "Inspetor não encontrado" });
        }

        return res.status(200).json({ message: "Inspetor deletado com sucesso" });

    } catch (error) {
        console.error("Erro ao deletar inspetor:", error);
        return res.status(500).json({ error: "Erro interno ao deletar inspetor" });
    }
}