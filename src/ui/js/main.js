import api from "../js/api.js";
import ui from "../js/ui.js"



document.addEventListener('DOMContentLoaded', () => {
    ui.renderizarInspetor();
    ui.cadastrarInspetor();
})

// -------- MENU RETRÁTIL --------
const menu = document.getElementById("menu_lateral");
const toggleMenu = document.getElementById("toggleMenu");

toggleMenu.addEventListener("click", () => {
    menu.classList.toggle("mini");
});

// ======== modal ========
const modal = document.getElementById("modalCadastro");
const btnAbrir = document.getElementById("btnCadastrarRelatorio");
const btnFechar = document.getElementById("fecharModal");

// ======== abrir modal ========
btnAbrir.addEventListener("click", () => {
    modal.style.display = "flex";
});

// ======== fechar modal ========
btnFechar.addEventListener("click", () => {
    modal.style.display = "none";
});

// ======== fechar ao clicar fora ========
window.addEventListener("click", (event) => {
    if (event.target === modal) {
        modal.style.display = "none";
    }
});

