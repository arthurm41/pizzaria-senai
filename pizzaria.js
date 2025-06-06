let pizzas = [];
let pizzaParaAlterar = null;
let vendas = [];

function mostrarSecao(secao) {
    const secoes = ["cadastro", "consulta", "alterar", "pedido", "venda", "relatorio-vendas"];
    secoes.forEach(id => document.getElementById(id).classList.add("hidden"));
    document.getElementById(secao).classList.remove("hidden");
    exibirMensagem("");
    if (secao === "venda") atualizarSelectPizzas(); // atualizar select quando for pra venda
}

function exibirMensagem(texto, tipo = "info") {
    const msg = document.getElementById("mensagem");
    msg.textContent = texto;
    msg.style.color = tipo === "erro" ? "red" : "green";
}

function adicionarPizza() {
    const nome = document.getElementById("nome").value.trim();
    const ingredientes = document.getElementById("ingredientes").value.trim();
    const preco = parseFloat(document.getElementById("preco").value);

    if (nome && ingredientes && !isNaN(preco)) {
        pizzas.push({ nome, ingredientes, preco });
        document.getElementById("nome").value = "";
        document.getElementById("ingredientes").value = "";
        document.getElementById("preco").value = "";
        atualizarLista();
        atualizarSelectPizzas(); // atualiza também o select
        exibirMensagem("Pizza adicionada com sucesso!");
    } else {
        exibirMensagem("Preencha todos os campos corretamente.", "erro");
    }
}

function atualizarSelectPizzas() {
    const select = document.getElementById("venda-pizza");
    if (!select) return;

    select.innerHTML = `<option value="">Selecione uma pizza</option>`;
    pizzas.forEach((pizza, index) => {
        const option = document.createElement("option");
        option.value = index;
        option.textContent = `${pizza.nome} - R$ ${pizza.preco.toFixed(2)}`;
        select.appendChild(option);
    });
}

function buscarPizza() {
    const busca = document.getElementById("busca").value.toLowerCase();
    const resultados = pizzas.filter(p => p.nome.toLowerCase().includes(busca));
    atualizarLista(resultados);
}

function atualizarLista(lista = pizzas) {
    const tabela = document.getElementById("lista-pizzas");
    tabela.innerHTML = "";
    lista.forEach(p => {
        const linha = document.createElement("tr");
        linha.innerHTML = `
            <td>${p.nome}</td>
            <td>${p.ingredientes}</td>
            <td>R$ ${p.preco.toFixed(2)}</td>
        `;
        tabela.appendChild(linha);
    });
}

function buscarPizzaAlterar() {
    const busca = document.getElementById("buscar-alterar").value.toLowerCase();
    pizzaParaAlterar = pizzas.find(p => p.nome.toLowerCase().includes(busca));

    if (pizzaParaAlterar) {
        document.getElementById("form-alterar").classList.remove("hidden");
        document.getElementById("novo-nome").value = pizzaParaAlterar.nome;
        document.getElementById("novo-ingredientes").value = pizzaParaAlterar.ingredientes;
        document.getElementById("novo-preco").value = pizzaParaAlterar.preco;
        exibirMensagem("");
    } else {
        document.getElementById("form-alterar").classList.add("hidden");
        exibirMensagem("Pizza não encontrada para alterar.", "erro");
    }
}

function alterarPizza() {
    if (pizzaParaAlterar) {
        const novoNome = document.getElementById("novo-nome").value.trim();
        const novoIngredientes = document.getElementById("novo-ingredientes").value.trim();
        const novoPreco = parseFloat(document.getElementById("novo-preco").value);

        if (novoNome && novoIngredientes && !isNaN(novoPreco)) {
            pizzaParaAlterar.nome = novoNome;
            pizzaParaAlterar.ingredientes = novoIngredientes;
            pizzaParaAlterar.preco = novoPreco;
            atualizarLista();
            atualizarSelectPizzas();
            document.getElementById("form-alterar").classList.add("hidden");
            exibirMensagem("Pizza alterada com sucesso!");
        } else {
            exibirMensagem("Preencha todos os campos corretamente para alterar.", "erro");
        }
    }
}

function pedirPizza() {
    const nomePizza = document.getElementById("pedido-nome").value.toLowerCase();
    const pizzaEncontrada = pizzas.find(p => p.nome.toLowerCase() === nomePizza);

    if (pizzaEncontrada) {
        pizzas = pizzas.filter(p => p !== pizzaEncontrada);
        atualizarLista();
        atualizarSelectPizzas();
        exibirMensagem(`Pedido realizado: ${pizzaEncontrada.nome} - R$ ${pizzaEncontrada.preco.toFixed(2)}`);
    } else {
        exibirMensagem("Pizza não encontrada para pedido.", "erro");
    }
}

function registrarVenda() {
    const select = document.getElementById("venda-pizza");
    const index = select.value;
    const cliente = document.getElementById("venda-cliente").value.trim();

    if (index === "" || !cliente) {
        exibirMensagem("Selecione uma pizza e informe o nome do cliente.", "erro");
        return;
    }

    const pizzaSelecionada = pizzas[index];
    vendas.push({ nome: pizzaSelecionada.nome, preco: pizzaSelecionada.preco, cliente });

    const item = document.createElement("li");
    item.textContent = `Pizza: ${pizzaSelecionada.nome} | R$${pizzaSelecionada.preco.toFixed(2)} | Cliente: ${cliente}`;
    document.getElementById("lista-vendas").appendChild(item);

    document.getElementById("venda-pizza").value = "";
    document.getElementById("venda-cliente").value = "";

    exibirMensagem("Venda registrada com sucesso!");
}

function gerarRelatorioVendas() {
    const tabela = document.getElementById("relatorio-tabela");
    tabela.innerHTML = "";

    if (vendas.length === 0) {
        exibirMensagem("Nenhuma venda registrada.", "erro");
        return;
    }

    let total = 0;
    vendas.forEach(v => {
        const linha = document.createElement("tr");
        linha.innerHTML = `
            <td>${v.nome}</td>
            <td>R$ ${parseFloat(v.preco).toFixed(2)}</td>
            <td>${v.cliente}</td>
        `;
        tabela.appendChild(linha);
        total += parseFloat(v.preco);
    });

    const linhaTotal = document.createElement("tr");
    linhaTotal.innerHTML = `
        <td><strong>Total</strong></td>
        <td><strong>R$ ${total.toFixed(2)}</strong></td>
        <td></td>
    `;
    tabela.appendChild(linhaTotal);
    mostrarSecao("relatorio-vendas");
}

function voltarAoLogin() {
    window.location.href = "login.html";
}
