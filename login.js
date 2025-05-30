function validarLogin() {
    const usuario = document.getElementById("usuario").value;
    const senha = document.getElementById("senha").value;
    const mensagem = document.getElementById("mensagem");

    if (usuario === "admin" && senha === "1234") {
        mensagem.textContent = "Login realizado com sucesso!";
        mensagem.style.color = "green";
        mensagem.classList.remove("hidden");

        // Redirecionar após 1 segundo
        setTimeout(() => {
            window.location.href = "pizzaria.html";
        }, 1000);
    } else {
        mensagem.textContent = "Usuário ou senha incorretos!";
        mensagem.style.color = "red";
        mensagem.classList.remove("hidden");
    }
}
