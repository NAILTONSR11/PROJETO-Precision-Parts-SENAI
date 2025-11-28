import api from "./api.js";

const ui = {

  // ============================
  // COLETA DE SELECIONADOS
  // ============================
  coletarSelecionados() {
    const selecionados = [...document.querySelectorAll(".checkInspetor:checked")];
    return selecionados.map(chk => chk.dataset.id);
  },

  // ============================
  // SELECT ALL DE INSPETORES
  // ============================
  configurarCheckTodos() {
    const checkTodos = document.getElementById("checkTodos");
    const lista = document.getElementById("listaInspetores");

    if (!checkTodos || !lista) return;

    checkTodos.addEventListener("change", () => {
      const checks = lista.querySelectorAll(".checkInspetor");
      checks.forEach(c => (c.checked = checkTodos.checked));
    });
  },

  // ============================
  // RENDERIZAR LISTA DE INSPETORES
  // ============================
  async renderizarInspetor() {
    try {
      const inspetores = await api.buscarInspetores();
      const lista = document.querySelector("#listaInspetores");
      lista.innerHTML = "";

      inspetores.forEach(insp => {
        const tr = document.createElement("tr");
        tr.innerHTML = `
          <td><input type="checkbox" class="checkInspetor" data-id="${insp._id}"></td>
          <td>${insp.nome}</td>
          <td>${insp.setor}</td>
          <td>${insp.email}</td>
        `;
        lista.appendChild(tr);
      });

      this.configurarCheckTodos();

    } catch (error) {
      console.error("UI ERRO: falha ao renderizar inspetores.", error);
    }
  },

  // ============================
  // CADASTRAR INSPETOR
  // ============================
  cadastrarInspetor() {
    const form = document.getElementById("formInspetor");
    if (!form) return;

    form.addEventListener("submit", async (event) => {
      event.preventDefault();

      const nome = document.getElementById("nome").value;
      const setor = document.getElementById("setor").value;
      const email = document.getElementById("email").value;
      const btnSalvar = document.querySelector("#add");

      try {
        btnSalvar.textContent = "Salvando...";
        const criado = await api.criarInspetor({ nome, setor, email });

        alert(`Inspetor ${criado.nome} cadastrado com sucesso!`);
        form.reset();
        await ui.renderizarInspetor();

      } catch (error) {
        alert("Erro ao cadastrar inspetor.");
        console.error(error);
      } finally {
        btnSalvar.textContent = "Cadastrar";
      }
    });
  },

  // ============================
  // EXCLUIR INSPETORES
  // ============================
  async deletarInspetores() {
    console.log("→ deletarInspetores() chamado");

    const ids = this.coletarSelecionados();
    console.log("Selecionados:", ids);

    if (ids.length === 0) {
      alert("Selecione ao menos 1 inspetor.");
      return;
    }

    const confirmar = confirm(`Deseja excluir ${ids.length} inspetor(es)?`);
    if (!confirmar) return;

    try {
      for (const id of ids) {
        await api.deletarInspetor(id);
      }

      alert("Inspetores excluídos com sucesso!");
      await this.renderizarInspetor();

    } catch (error) {
      console.error("Erro ao excluir inspetores:", error);
      alert("Erro ao excluir inspetores.");
    }
  },

  // ============================
  // RENDERIZAR SELECT DE INSPETORES NO RELATÓRIO
  // ============================
  async renderizarInspetorCadastro() {
    try {
      const inspetores = await api.buscarInspetores();
      const select = document.getElementById("Inspetor");

      if (!select) return;

      select.innerHTML = '<option value="">-- Selecione --</option>';

      inspetores.forEach(i => {
        select.innerHTML += `<option value="${i._id}">${i.nome}</option>`;
      });

    } catch (error) {
      console.error("ERRO ao carregar inspetores no select:", error);
    }
  },

  // ============================
  // RENDERIZAR RELATÓRIOS
  // ============================
  async renderizarRelatorios() {
    try {
      const relatorios = await api.buscarRelatorios();
      const tabela = document.querySelector(".tabelaRelatorios tbody");
      tabela.innerHTML = "";

      relatorios.forEach(rel => {
        const inspectorNome = rel.inspetor?.nome || "—";

        const tr = document.createElement("tr");
        tr.innerHTML = `
          <td><img src="/src/ui/images/RELATO.png"></td>
          <td>${inspectorNome}</td>
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

      // Delegação de eventos (NÃO DUPLICA LISTENERS)
      tabela.removeEventListener?.("click", tabela._handlerRelatorios);

      tabela._handlerRelatorios = (event) => {
        const btn = event.target.closest("button");
        if (!btn) return;

        const id = btn.dataset.id;

        if (btn.classList.contains("deletar")) {
          ui.deletarRelatorio(id);
        }
        if (btn.classList.contains("editar")) {
          console.log("Editar relatório:", id);
        }
      };

      tabela.addEventListener("click", tabela._handlerRelatorios);

    } catch (error) {
      console.error("Erro ao renderizar relatórios:", error);
    }
  },

  // ============================
  // DELETAR RELATÓRIO
  // ============================
  async deletarRelatorio(id) {
    if (!id) return;

    const confirmar = confirm("Deseja excluir este relatório?");
    if (!confirmar) return;

    try {
      await api.deletarRelatorio(id);
      alert("Relatório excluído!");
      await this.renderizarRelatorios();

    } catch (error) {
      console.error("ERRO ao deletar relatório:", error);
      alert("Erro ao deletar relatório.");
    }
  },

  // ============================
  // CADASTRAR RELATÓRIO
  // ============================
  cadastrarRelatorio() {
    const btn = document.getElementById("salvarRelatorio");
    if (!btn) return;

    btn.addEventListener("click", async () => {
      const inspetor = document.getElementById("Inspetor").value;
      const status = document.getElementById("status").value;
      const data = document.getElementById("dataRelatorio").value;
      const naoConformidade = document.getElementById("naoConformidade").value;

      if (!inspetor) return alert("Selecione um inspetor.");
      if (!status) return alert("Selecione um status.");
      if (!naoConformidade) return alert("Preencha a não conformidade.");

      const novoRelatorio = { inspetor, status, naoConformidade, data };

      try {
        btn.textContent = "Salvando...";
        await api.criarRelatorio(novoRelatorio);
        alert("Relatório criado!");
        await this.renderizarRelatorios();

      } catch (error) {
        console.error("Erro ao salvar relatório:", error);
        alert("Erro ao cadastrar relatório.");

      } finally {
        btn.textContent = "Salvar";
      }
    });
  }
};

export default ui;
