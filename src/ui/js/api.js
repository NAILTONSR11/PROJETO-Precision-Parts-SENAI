/* const API_URL = "http://localhost:3000/inspetor";  */
const api = {

// Cadastrar novo inspetor
async criarInspetor(dados) {
    try {
        const res = await fetch('http://localhost:3000/inspetor', {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dados)
    });
    return await res.json();
        
    } catch (error) {
        alert("  ARQUIVO: API Erro ao salvar Inspetor!"); 
        throw error;
    }
},

// Buscar todos os inspetores
async buscarInspetores() {
    try {
        const res = await fetch("http://localhost:3000/inspetor");
        return await res.json();
    } catch (error) {
            alert("  ARQUIVO: API Erro ao mostrar Inspetores!");
            throw error;
    }

},

async deletarInspetor(id) {
    try {
        const response = await fetch(`http://localhost:3000/inspetor${id}`, {
                method: "DELETE"
        });
        return await response.json();
    } catch (error) {
     alert("Erro ao Deletar Inspetor!");
        throw error;
        }
    }

}
export default api;