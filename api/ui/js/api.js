/* const API_URL = "http://localhost:3000/inspetor";  */

const api = {

    // ==============================
    // ===      INSPETORES       ===
    // ==============================

    // Criar inspetor
    async criarInspetor(dados) {
        try {
            const res = await fetch("/inspetor", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(dados)
            });

            if (!res.ok) {
                throw new Error(`Erro ao criar inspetor: ${res.status}`);
            }

            return await res.json();
        } catch (error) {
            console.error("API - Erro ao salvar Inspetor!", error);
            throw error;
        }
    },

    // Buscar inspetores
    async buscarInspetores() {
        try {
            const res = await fetch("/inspetor");

            if (!res.ok) {
                throw new Error(`Erro ao buscar inspetores: ${res.status}`);
            }

            return await res.json();
        } catch (error) {
            console.error("API - Erro ao listar Inspetores!", error);
            throw error;
        }
    },

    // Deletar inspetor
    async deletarInspetor(id) {
        try {
            const res = await fetch(`/inspetor/${id}`, {
                method: "DELETE"
            });

            if (!res.ok) {
                throw new Error(`Erro ao deletar inspetor: ${res.status}`);
            }

            return await res.json();
        } catch (error) {
            console.error("API - Erro ao Deletar Inspetor!", error);
            throw error;
        }
    },


    // ==============================
    // ===       RELATÓRIOS      ===
    // ==============================

    // Criar relatório
    async criarRelatorio(dados) {
        try {
            const res = await fetch("/relatorio", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(dados)
            });

            if (!res.ok) {
                throw new Error(`Erro ao criar relatório: ${res.status}`);
            }

            return await res.json();
        } catch (error) {
            console.error("API - Erro ao salvar Relatório!", error);
            throw error;
        }
    },

    // Buscar relatórios
    async buscarRelatorios() {
        try {
            const res = await fetch("/relatorio");

            if (!res.ok) {
                throw new Error(`Erro ao buscar relatórios: ${res.status}`);
            }

            return await res.json();
        } catch (error) {
            console.error("API - Erro ao listar Relatórios!", error);
            throw error;
        }
    },

    // Deletar relatório
    async deletarRelatorio(id) {
        try {
            const res = await fetch(`/relatorio/${id}`, {
                method: "DELETE"
            });

            if (!res.ok) {
                throw new Error(`Erro ao deletar relatório: ${res.status}`);
            }

            return await res.json();
        } catch (error) {
            console.error("API - Erro ao Deletar Relatório!", error);
            throw error;
        }
    },

async atualizarRelatorio(id, dadosAtualizados) {
    try {
        const res = await fetch(`/relatorio/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(dadosAtualizados)
        });

        // Tenta ler JSON, mas sem quebrar caso não tenha corpo
        let json = {};
        try {
            json = await res.json();
        } catch (_) {
            json = {}; // evita erro de "Unexpected end of JSON input"
        }

        if (!res.ok) {
            throw new Error(json.error || `Erro ao atualizar relatório (${res.status})`);
        }

        return json; // retorno seguro

    } catch (error) {
        console.error("API - Erro ao atualizar Relatório!", error);
        throw error;
    }
}

};


export default api;
