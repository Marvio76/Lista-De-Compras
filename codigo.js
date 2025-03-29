const input = document.querySelector("input#input");
const button = document.querySelector("button");
const lista = document.querySelector("#lista");

// Carregar a lista de compras do localStorage
function carregarLista() {
    const listaCompras = JSON.parse(localStorage.getItem("listaCompras")) || [];
    lista.innerHTML = ''; // Limpa a lista antes de recarregar
    listaCompras.forEach((item, index) => {
        adicionarItemNaLista(item.text, item.checked, index);
    });
}

// Adicionar item na lista (exibe e salva no localStorage)
function adicionarItemNaLista(text, checked = false, index = null) {
    const novoItem = document.createElement("li");
    const checkboxItem = document.createElement("input");
    const textItem = document.createElement("span");
    const removeButtonItem = document.createElement("button");

    textItem.textContent = text;
    checkboxItem.setAttribute("type", "checkbox");
    checkboxItem.checked = checked;
    if (checked) {
        textItem.classList.add("checked");
        checkboxItem.classList.add("checked");
    }

    // Marcar item como concluído
    checkboxItem.addEventListener("click", () => {
        if (checkboxItem.checked) {
            textItem.classList.add("checked");
            checkboxItem.classList.add("checked");
        } else {
            textItem.classList.remove("checked");
            checkboxItem.classList.remove("checked");
        }
        atualizarStorage(); // Atualiza o storage sempre que um item for alterado
    });

    removeButtonItem.textContent = "Remover";
    novoItem.appendChild(checkboxItem);
    novoItem.appendChild(textItem);
    novoItem.appendChild(removeButtonItem);

    removeButtonItem.addEventListener("click", () => {
        lista.removeChild(novoItem);
        atualizarStorage(); // Atualiza o storage após remoção
    });

    lista.appendChild(novoItem);
}

// Atualiza o localStorage com a lista atual
function atualizarStorage() {
    const listaCompras = [];
    document.querySelectorAll("#lista li").forEach((li) => {
        const text = li.querySelector("span").textContent;
        const checked = li.querySelector("input[type='checkbox']").checked;
        listaCompras.push({ text, checked });
    });
    localStorage.setItem("listaCompras", JSON.stringify(listaCompras));
}

// Evento de clique no botão de adicionar item
button.addEventListener("click", () => {
    const itemTexto = input.value.trim();
    if (itemTexto.length <= 2) {
        window.alert("O item deve ter, pelo menos, 3 letras.");
    } else {
        adicionarItemNaLista(itemTexto);
        input.value = ""; // Limpar campo de entrada
        atualizarStorage(); // Atualizar o storage sempre que um item for adicionado
    }
});

// Carregar a lista quando a página for carregada
window.onload = carregarLista;

// Criando a tag style (para estilizar a página)
const styleTag = document.createElement("style");
styleTag.innerHTML = `
body {
    background-color: #222222;
    color: #e7e7e7;
    margin: 2rem;
    width: 50%;
}
body > div {
    display: flex;
}
input#input {
    font-size: 1rem;
    height: 28px;
    border-radius: 5px;
    border: none;
    flex: 1;
}
button#add {
    font-size: 1rem;
    border: none;
    background-color: rgb(245, 179, 36);
    height: 30px;
    padding: 0 15px;
    border-radius: 5px;
    margin-left: 10px;
    cursor: pointer;
}
ul#lista {
    list-style: none;
    padding: 2rem 0;
}
li {
    padding: 0 0 1rem;
    display: flex;
    gap: 5px;
    align-items: center;
}
input[type="checkbox"] {
    height: 1.2rem;
    width: 1.2rem;
}
#lista > li > span {
    font-size: 1.2rem;
    font-weight: 500;
    flex: 1;
}
#lista > li > .checked {
    text-decoration: line-through;
    opacity: 0.6;
}
#lista > li > button {
    font-size: 0.85rem;
    border: none;
    background-color: red;
    color: white;
    padding: 4px 10px 5px;
    border-radius: 5px;
    margin-left: 10px;
    cursor: pointer;
}
`;
document.querySelector("head").appendChild(styleTag);
