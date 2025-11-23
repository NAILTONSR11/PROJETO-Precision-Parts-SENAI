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