import api from "../js/api.js";
import ui from "../js/ui.js";

document.addEventListener("DOMContentLoaded", () => {

    /* === RENDERIZAÇÕES === */
    ui.renderizarInspetor();
    ui.renderizarInspetorCadastro();
    ui.renderizarRelatorios();
    ui.entrarEdicaoInline();
    ui.cadastrarInspetor();
    ui.cadastrarRelatorio();

    document.querySelector(".btn.delete")?.addEventListener("click", () => {
        ui.deletarInspetores();
    });


    /* ================================
       VARIÁVEIS PRINCIPAIS
    ==================================*/
    const menu = document.getElementById("menu_lateral");
    const page = document.getElementById("corpo");
    const topo = document.getElementById("header");
    const toggleMenu = document.getElementById("toggleMenu");


    /* ================================
       TROCAR O ÍCONE NO MOBILE
    ==================================*/
    function atualizarIconeMenu() {
        if (window.innerWidth <= 768) {
            toggleMenu.src = "../images/menuHamburger.jpeg";
        } else {
            toggleMenu.src = "../images/CLOSE-MENU.png";
        }
    }
    atualizarIconeMenu();
    window.addEventListener("resize", atualizarIconeMenu);


    /* ================================
       ABRIR/FECHAR MENU
    ==================================*/
    toggleMenu?.addEventListener("click", () => {

        if (window.innerWidth <= 768) {
            // MOBILE
            menu.classList.toggle("ativo"); // desliza
        } else {
            // DESKTOP
            menu.classList.toggle("mini");
            page.classList.toggle("corpo_mini");
            topo.classList.toggle("header_mini");
        }
    });


    /* ================================
       CLIQUE FORA DO MENU (MOBILE)
    ==================================*/
    document.addEventListener("click", (e) => {
        if (window.innerWidth <= 768) {
            const clicouFora = !menu.contains(e.target) && e.target !== toggleMenu;
            if (clicouFora) {
                menu.classList.remove("ativo");
            }
        }
    });


    /* ================================
       CLIQUE FORA DO MENU (DESKTOP)
    ==================================*/
    document.addEventListener("click", (e) => {
        if (window.innerWidth > 768) {
            const clicouForaDoMenu = !menu.contains(e.target);
            const clicouForaDoBotao = e.target !== toggleMenu;

            // Fecha apenas se não estiver mini
            if (clicouForaDoMenu && clicouForaDoBotao && !menu.classList.contains("mini")) {
                menu.classList.add("mini");
                page.classList.add("corpo_mini");
                topo.classList.add("header_mini");
            }
        }
    });


    /* ================================
       MODAL — CADASTRAR RELATÓRIO
    ==================================*/
    const modal = document.getElementById("modalCadastro");
    const btnAbrir = document.getElementById("btnCadastrarRelatorio");
    const btnFechar = document.getElementById("fecharModal");

    btnAbrir?.addEventListener("click", () => (modal.style.display = "flex"));
    btnFechar?.addEventListener("click", () => (modal.style.display = "none"));

    window.addEventListener("click", (event) => {
        if (event.target === modal) modal.style.display = "none";
    });


    /* ================================
       MODAL — CADASTRAR INSPETOR
    ==================================*/
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