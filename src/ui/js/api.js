/* const API_URL = "http://localhost:3000/inspetor";  */
const api = {

    // ==============================
    // ===      INSPETORES       ===
    // ==============================

    // Cadastrar novo inspetor
    async criarInspetor(dados) {
        try {
            const res = await fetch("http://localhost:3000/inspetor", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(dados)
            });
            return await res.json();
        } catch (error) {
            console.log("ARQUIVO: API - Erro ao salvar Inspetor!");
            throw error;
        }
    },

    // Buscar todos os inspetores
    async buscarInspetores() {
        try {
            const res = await fetch("http://localhost:3000/inspetor");
            return await res.json();
        } catch (error) {
            console.log("ARQUIVO: API - Erro ao mostrar Inspetores!");
            throw error;
        }
    },

    // Deletar inspetor
    async deletarInspetor(id) {
        try {
            const response = await fetch(`http://localhost:3000/inspetor/${id}`, {
                method: "DELETE"
            });
            return await response.json();
        } catch (error) {
            console.log("Erro ao Deletar Inspetor!");
            throw error;
        }
    },


    // ==============================
    // ===       RELATÓRIOS      ===
    // ==============================
// Criar relatório
    async criarRelatorio(dados) {
        try {
            const res = await fetch("http://localhost:3000/relatorio", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(dados)
            });

            if (!res.ok) {
                throw new Error(`API -Erro ao criar relatório: ${res.status}`);
            }

            return await res.json();
        } catch (error) {
            console.error("API - Erro ao salvar Relatório!", error);
            throw error;
        }
    },

    // Buscar todos os relatórios
    async buscarRelatorios() {
        try {
            const res = await fetch("http://localhost:3000/relatorio");

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
            const res = await fetch(`http://localhost:3000/relatorio/${id}`, {
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
    }
};


export default api;
