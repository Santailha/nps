document.getElementById('arquivoCsv').addEventListener('change', function(e) {
    const leitor = new FileReader();
    leitor.onload = function(evento) {
        const linhas = evento.target.result.split('\n');
        const tabela = document.getElementById('tabela-contatos').getElementsByTagName('tbody')[0];

        for (let i = 1; i < linhas.length; i++) { // Pula a primeira linha (cabeçalho)
            const colunas = linhas[i].split(',');
            if (colunas.length >= 2) {
                const nome = colunas[0];
                const telefone = colunas[1];

                const novaLinha = tabela.insertRow();
                const celulaNome = novaLinha.insertCell();
                const celulaTelefone = novaLinha.insertCell();
                const celulaAcao = novaLinha.insertCell();

                celulaNome.innerHTML = nome;
                celulaTelefone.innerHTML = telefone;

                const mensagemNPS = `Olá ${nome}, tudo bem? Em uma escala de 0 a 10, o quanto você recomendaria a Santa Ilha para um amigo ou familiar?`;
                const linkWhatsApp = `https://api.whatsapp.com/send?phone=${telefone}&text=${encodeURIComponent(mensagemNPS)}`;

                const botaoEnviar = document.createElement('a');
                botaoEnviar.href = linkWhatsApp;
                botaoEnviar.target = '_blank';
                botaoEnviar.className = 'btn-whatsapp';
                botaoEnviar.innerText = 'Enviar WhatsApp';
                celulaAcao.appendChild(botaoEnviar);
            }
        }
    };
    leitor.readAsText(e.target.files[0]);
});
