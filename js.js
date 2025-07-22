function sendMessage() {
    const input = document.getElementById("userInput");
    const chatBox = document.getElementById("chatBox");
    const message = input.value.trim();

    if (message === "") return;

    const userMsg = document.createElement("div");
    userMsg.className = "message user";
    userMsg.textContent = message;
    chatBox.appendChild(userMsg);
    input.value = "";

    setTimeout(() => {
        const botMsg = document.createElement("div");
        botMsg.className = "message bot";
        botMsg.textContent = getBotResponse(message);
        chatBox.appendChild(botMsg);
        chatBox.scrollTop = chatBox.scrollHeight;
    }, 500);
}

function getBotResponse(userText) {
    const text = userText.toLowerCase();

    const intents = [
        {
            tag: "saudacao",
            keywords: ["bom dia, me chamo Guilherme sou atendente do itau em que posso ajudar?", "olá", "bom dia", "boa tarde", "boa noite", "eae", "fala"],
            response: "Oi, tudo certo. Eu vi uma cobrança de R$ 59,90 na minha conta e não entendi do que se trata. Pode me explicar?"
        },
        {
            tag: "despedida",
            keywords: ["tchau", "adeus", "até logo", "falou", "até mais"],
            response: "Tchau! Volte sempre que quiser."
        },
        {
            tag: "adiantamento",
            keywords: ["Claro! Essa cobrança de R$ 59,90 provavelmente se refere ao Adiantamento a Depositante, também conhecido como AD. É um serviço emergencial que o banco oferece para cobrir transações quando você não tem saldo suficiente na conta e já utilizou todo o limite do cheque especial (LIS).", "ad", "cobrança de 59", "r\\$?\\s?59[,.]?90", "cobrança 59,90"],
            response: "Mas eu não pedi isso... por que cobraram?"
        },
        {
            tag: "depositante",
            keywords: ["Entendo sua preocupação. Esse serviço pode estar ativo em sua conta e é acionado automaticamente em situações específicas. Por exemplo: se você tentou fazer um pagamento ou transferência e não tinha saldo nem limite disponível, o banco fez uma análise emergencial e adiantou o valor para que a transação não fosse recusada. ativo", "acionado automaticamente", "sem saldo", "banco adiantou", "não tinha limite"],
            response: "E essa cobrança acontece todo mês?"
        },
        {
            tag: "educacao",
            keywords: ["como estudar", "dica de estudo", "melhor forma de aprender", "estudar melhor"],
            response: "Tente estudar com técnicas como pomodoro, resumos e prática ativa!"
        },
        {
            tag: "agradecimento",
            keywords: ["obrigado", "valeu", "agradeço", "muito obrigado", "obrigada"],
            response: "De nada! Fico feliz em ajudar 😊"
        }
    ];

    for (const intent of intents) {
        for (const keyword of intent.keywords) {
            const pattern = new RegExp("\\b" + keyword + "\\b", "i"); // palavra completa (case-insensitive)
            if (pattern.test(text)) {
                return intent.response;
            }
        }
    }

    return "Hmm... ainda estou aprendendo. Pode explicar de outra forma?";
}

document.getElementById("userInput").addEventListener("keydown", function(e) {
    if (e.key === "Enter") sendMessage();
});
