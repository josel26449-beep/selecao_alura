/* ---------- ELEMENTOS DO DOM ---------- */
const cardContainer = document.querySelector(".card-container");
const campoBusca    = document.querySelector("#campoBusca");
const aviso         = document.getElementById("aviso");   // ← novo
let dados = [];
let primeiraBusca = true; // flag para controlar o aviso

/* ---------- FUNÇÃO PRINCIPAL DE BUSCA ---------- */
async function iniciarBusca() {
    /* 1º – Carrega JSON (uma única vez) */
    if (dados.length === 0) {
        try {
            const res = await fetch("data.json");
            dados = await res.json();
        } catch (erro) {
            console.error("Erro ao carregar data.json:", erro);
            return;
        }
    }

    /* 2º – Remove o aviso na primeira busca */
    if (primeiraBusca) {
        aviso.classList.add("oculto");
        primeiraBusca = false;
    }

    /* 3º – Filtro normal */
    const termo = campoBusca.value.trim().toLowerCase();
    const filtrados = dados.filter(
        item =>
            item.nome.toLowerCase().includes(termo) ||
            item.descricao.toLowerCase().includes(termo)
    );

    /* 4º – Renderiza */
    renderizarCards(filtrados);
}

/* ---------- RENDERIZAÇÃO (sem alterações) ---------- */
function renderizarCards(dados) {
    cardContainer.innerHTML = "";
    dados.forEach(item => {
        const article = document.createElement("article");
        article.className = "card";
        article.innerHTML = `
            <h2>${item.nome}</h2>
            <p>${item.descricao}</p>
            <p><strong>Para que serve:</strong> ${item.para_que_serve}</p>
            <p><strong>Orientação de uso:</strong> ${item.orientacoes_de_uso}</p>
            <p><strong>Contraindicação:</strong> ${item.contraindicacoes}</p>
            <p><strong>Efeitos colaterais:</strong> ${item.efeitos_colaterais}</p>
            <p><strong>Bula:</strong> ${item.bula}</p>
            <a href="${item.link_bula_pdf}" target="_blank">Saiba mais</a>
        `;
        cardContainer.appendChild(article);
    });
}