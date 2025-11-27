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
                <option value="${inspetor._id}">${inspetor.nome}</option>
                
                `
            })
        } catch (error) {
            console.error(" ARQUIVO: UI Erro ao renderizar instrutores na escolha")
        }

    },

        async renderizarRelatorios() {
    try {
        // 1️⃣ Buscar todos os inspetores
        const inspetores = await api.buscarInspetores();

        // 2️⃣ Criar mapa _id → nome
        const mapaInspetores = {};
        inspetores.forEach(inspetor => {
            mapaInspetores[inspetor._id] = inspetor.nome;
        });

        // 3️⃣ Buscar todos os relatórios
        const relatorios = await api.buscarRelatorios();
        const tabela = document.querySelector(".tabelaRelatorios tbody");
        tabela.innerHTML = "";

        // 4️⃣ Renderizar a tabela
        relatorios.forEach(rel => {
            const nomeInspetor = mapaInspetores[rel.inspetor] || "—"; // pega nome ou mostra "—"

            const tr = document.createElement("tr");
            tr.innerHTML = `
                <td><img src="/src/ui/images/RELATO.png" alt=""></td>
                <td>${nomeInspetor}</td>
                <td><span class="status ${rel.status === "Aprovado" ? "aprovado" : "reprovado"}">${rel.status}</span></td>
                <td>${rel.naoConformidade || "—"}</td>
                <td>${new Date(rel.data).toLocaleDateString("pt-BR")}</td>
                <td class="acoes">
                    <button class="editar" data-id="${rel._id}">✏️</button>
                    <button class="deletar" data-id="${rel._id}">🗑️</button>
                </td>
            `;
            tabela.appendChild(tr);
        });

    } catch (error) {
        console.error("Erro ao renderizar relatórios:", error);
    }
},

async cadastrarRelatorio() {
    const btnSalvar = document.getElementById("salvarRelatorio");

    btnSalvar.addEventListener("click", async () => {
        const inspetor = document.getElementById("Inspetor").value;
        const status = document.getElementById("status").value;
        const data = document.getElementById("dataRelatorio").value;
        const naoConformidade = document.getElementById("naoConformidade").value;

        // Validação mínima
        if (!inspetor) {
            alert("Selecione um inspetor.");
            return;
        }
        if (!status) {
            alert("Selecione um status.");
            return;
        }
        if (!naoConformidade) {
            alert("Preencha o campo 'Não Conformidade'.");
            return;
        }

        const novoRelatorio = {
            inspetor,
            status,
            naoConformidade,
            data
        };

        try {
            btnSalvar.innerText = "Salvando...";
            await api.criarRelatorio(novoRelatorio);

            alert("Relatório criado com sucesso!");

            // Fecha modal e atualiza a lista de relatórios
            document.getElementById("modalCadastro").style.display = "none";
            ui.renderizarRelatorios();

            // Limpa os campos do formulário
            document.getElementById("Inspetor").value = "";
            document.getElementById("status").value = "Aprovado";
            document.getElementById("dataRelatorio").value = "";
            document.getElementById("naoConformidade").value = "";

        } catch (error) {
            console.error("UI - Erro ao cadastrar relatório:", error);
            alert("Erro ao cadastrar relatório. Veja o console para detalhes.");
        } finally {
            btnSalvar.innerText = "Salvar";
        }
    });
}


}
export default ui;