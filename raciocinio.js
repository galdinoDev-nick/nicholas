// Configurações
const URL_PLANILHA = "https://script.google.com/macros/s/AKfycby9LT4vvm3z4ca-z0cm7ZpHkD46DJj9FkTyDlwqQKW0Ls-F3ZMafxBwav4zAr6Qi8wl/exec";

// Seleção de elementos
const formulario = document.getElementById('Formulario');
const displayStatus = document.getElementById('status-display');
const btnEnviar = formulario.querySelector('button[type="submit"]');

/**
 * Função para atualizar o status visual da mensagem
 */
function atualizarStatus(texto, corFundo, corTexto) {
    displayStatus.textContent = texto;
    displayStatus.style.background = corFundo;
    displayStatus.style.color = corTexto;
    displayStatus.style.display = 'block';
}

// Evento de envio
formulario.addEventListener('submit', function(evento) {
    evento.preventDefault(); 

    // 1. Feedback visual inicial e trava do botão
    btnEnviar.disabled = true;
    btnEnviar.textContent = "Enviando...";
    atualizarStatus("Enviando sua solicitação...", "#f0f0f0", "#333");

    // 2. Preparação dos dados
    const dadosParaEnviar = new URLSearchParams(new FormData(formulario));

    // 3. Envio via Fetch
    fetch(URL_PLANILHA, {
        method: 'POST',
        mode: 'no-cors', // Necessário para Google Apps Script
        body: dadosParaEnviar
    })
    .then(() => {
        // Sucesso
        atualizarStatus("✅ Orçamento enviado com sucesso!", "#e6ffea", "#2e7d32");
        formulario.reset(); 
        
        // Esconde a mensagem após 5 segundos
        setTimeout(() => {
            displayStatus.style.display = 'none';
        }, 5000);
    })
    .catch(erro => {
        // Erro
        atualizarStatus("❌ Erro ao enviar. Verifique sua conexão.", "#ffe6e6", "#c62828");
        console.error("Erro detalhado:", erro);
    })
    .finally(() => {
        // Restaura o botão independente de sucesso ou erro
        btnEnviar.disabled = false;
        btnEnviar.textContent = "Enviar Solicitação";
    });
});