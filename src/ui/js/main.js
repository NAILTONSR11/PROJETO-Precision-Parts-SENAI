import api from "../js/api.js";
import ui from "../js/ui.js";

document.addEventListener("DOMContentLoaded", () => {

    ui.renderizarInspetor();
    ui.cadastrarInspetor();
    ui.renderizarInspetorCadastro();
    ui.cadastrarRelatorio();
    ui.renderizarRelatorios();

    /* --------------- menu retrátil ------------------ */
    const menu = document.getElementById("menu_lateral");
    const toggleMenu = document.getElementById("toggleMenu");

    toggleMenu?.addEventListener("click", () => {
        menu.classList.toggle("ativo");
    });

    // fecha o menu mobile quando clicar fora
    document.addEventListener("click", (event) => {
        if (!menu.classList.contains("ativo")) return;

        if (!menu.contains(event.target) && event.target !== toggleMenu) {
            menu.classList.remove("ativo");
        }
    });

    /* ----------- modal cadastrar relatorio -------------- */
    const modal = document.getElementById("modalCadastro");
    const btnAbrir = document.getElementById("btnCadastrarRelatorio");
    const btnFechar = document.getElementById("fecharModal");

    btnAbrir?.addEventListener("click", () => {
        modal.style.display = "flex";
    });

    btnFechar?.addEventListener("click", () => {
        modal.style.display = "none";
    });

    window.addEventListener("click", (event) => {
        if (event.target === modal) {
            modal.style.display = "none";
        }
    });

    /* ------------ modal cadstrar inspetor ------------- */
    const modalInspetor = document.getElementById("modalInspetor");
    const btnNovoInspetor = document.getElementById("btnNovoInspetor");
    const fecharInspetor = document.getElementById("fecharInspetor");

    btnNovoInspetor?.addEventListener("click", () => {
        modalInspetor.style.display = "flex";
    });

    fecharInspetor?.addEventListener("click", () => {
        modalInspetor.style.display = "none";
    });

    window.addEventListener("click", (event) => {
        if (event.target === modalInspetor) {
            modalInspetor.style.display = "none";
        }
    });
});