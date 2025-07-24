const chatBox = document.getElementById("chatBox");
const responseOptions = document.getElementById("responseOptions");

let currentStep = 0;

// Fluxo de conversa definido
const conversationFlow = [
    {
        options: ["bom dia! sou atendente do banco itau", "Bom dia. Me chamo Guilherme, sou atendente do banco Itaú. Como posso ajudar?"],
    },
    {
        bot: "Olá! Vi uma cobrança de R$ 59,90 na minha conta. Pode me explicar?",
        options: ["Essa cobrança é do Adiantamento a Depositante", "Essa cobrança é do Adiantamento a Depositante (AD). É um serviço que cobre transações quando não há saldo.", "É um serviço que cobre transações quando não há saldo."]
    },
    {
        bot: "Eu não ativei isso. E por que foi cobrado? Nunca usei esse serviço.",
        options: ["O AD pode ser ativado automaticamente quando você tenta pagar algo sem saldo ou limite. A tarifa de R$ 59,90 é aplicada nesse caso.", "O AD pode ser ativado automaticamente quando você tenta pagar algo sem saldo ou limite.", ""]
    },
    {
        bot: "É cobrado todo mês? Como evito isso? Tem como cancelar?",
        options: ["Essa cobrança só acontece se o valor adiantado não for devolvido no mesmo dia. É possível desativar esse serviço."]
    },
    {
        bot: "Nossa… e tem mais algum custo além dos R$ 59,90?",
        options: ["Pode haver sim. Além da tarifa, se o valor continuar em aberto, são cobrados: Juros proporcionais ao tempo de utilização, E o IOF, que é um imposto federal sobre operações financeiras.", "são cobrados: Juros proporcionais ao tempo de utilização, E o IOF, que é um imposto federal sobre operações financeiras."]
    },
    {
        bot: "Entendi. Posso cancelar esse serviço?",
        options: ["Claro! vou fazer o cancelamento do serviço", "Sim viu realizar o cancelamento agora mesmo."]
    },
    {
        options: ["Ainda tem algo em que eu possa ajudar?", "Ainda há alguma coisa em que eu possa ajudar?", "Diante das informações, lhe resta alguma dúvida?"]
    },
    {
        bot: "Não, obrigada. Era só isso mesmo.",
    }
];

function createMessageElement(sender, text) {
    const wrapper = document.createElement("div");
    wrapper.className = `message ${sender}`;

    const name = document.createElement("span");
    name.className = "name";
    name.textContent = sender === "user" ? "Você" : "Guilherme (Itaú)";
    wrapper.appendChild(name);

    const content = document.createElement("div");
    content.textContent = text;
    wrapper.appendChild(content);

    return wrapper;
}

function sendMessage(userChoice) {
    if (!userChoice) return;

    const userMsg = createMessageElement("user", userChoice);
    chatBox.appendChild(userMsg);
    responseOptions.innerHTML = "";
    currentStep++;

    if (currentStep < conversationFlow.length) {
        setTimeout(() => {
            showBotStep(currentStep);
        }, 500);
    }
}

function showBotStep(stepIndex) {
    const step = conversationFlow[stepIndex];
    const botMsg = createMessageElement("bot", step.bot);
    chatBox.appendChild(botMsg);
    chatBox.scrollTop = chatBox.scrollHeight;

    step.options.forEach(option => {
        const btn = document.createElement("button");
        btn.className = "response-button";
        btn.textContent = option;
        btn.onclick = () => sendMessage(option);
        responseOptions.appendChild(btn);
    });
}


// Iniciar com o primeiro passo
showBotStep(currentStep);
