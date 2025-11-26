import api from "./api.js";

const ui = {
    async renderizarInspetor(){
        try {
            const inspetores = await api.buscarInspetores();
            const lista = document.querySelector('#listaInspetores')
            lista.innerHTML = "";

            inspetores.forEach(inspetor => {
                const tr = document.createElement('tr');

                tr.innerHTML = 
                `
                        <th><input id="checkTodos" type="checkbox" onclick="selecionarTodos(this)"></th>
                        <th>${inspetor.nome}</th>
                        <th>${inspetor.setor}</th>
                        <th>${inspetor.email}</th>

                `
                lista.appendChild(tr)
            });
            
        } catch (error) {
            console.error(" ARQUIVO: UI Erro ao renderizar instrutores")
        }
    },

    async cadastrarInspetor(){
        const form = document.getElementById('formInspetor');

        form.addEventListener('submit', async (event) => {
            event.preventDefault();

            const nome = document.getElementById('nome').value;
            const setor = document.getElementById('setor').value;
            const email = document.getElementById('email').value;

            const btnSalvar = document.querySelector('#add');

            const novoInspetor = { nome, setor, email };

            try {
                btnSalvar.innerText = "Salvando...";

                const criado = await api.criarInspetor(novoInspetor);

                alert(`${criado.nome} cadastrado com sucessor!`);

                form.reset();
                
                await ui.renderizarInspetor();

            } catch (error) {
                alert("  ARQUIVO: UI Erro ao cadastrar inspetor");
            } finally {
                btnSalvar.innerText = "Cadastrar";
            }
        });
    },

    async renderizarInspetorCadastro(){
        try {
            const inspetores = await api.buscarInspetores();
            const listaEscolha = document.getElementById('Inspetor');
            listaEscolha.innerHTML = "";

            inspetores.forEach(inspetor =>{
                listaEscolha.innerHTML += 
                `
                <option value="nome">${inspetor.nome}</option>
                
                `
            })
        } catch (error) {
            console.error(" ARQUIVO: UI Erro ao renderizar instrutores na escolha")
        }

    }

}
export default ui;