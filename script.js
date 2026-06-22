let currentQuestion = 0;
let score = 0;

const questions = [
    {
        question: "O que significa 'Deepfake'?",
        options: ["Filtro do Instagram", "Conteúdo manipulado por IA", "Um vírus", "Uma rede social"],
        answer: 1
    },
    {
        question: "Qual tecnologia é usada para criar deepfakes?",
        options: ["HTML e CSS", "Redes Neurais (GANs)", "Banco de dados", "Editores de vídeo comuns"],
        answer: 1
    },
    {
        question: "Qual é um sinal comum de deepfake?",
        options: ["Piscadas irregulares nos olhos", "Muito brilho", "Legenda grande", "Música alta"],
        answer: 0
    },
    {
        question: "Por que deepfakes são perigosas em eleições?",
        options: ["São engraçadas", "Podem influenciar eleitores com discursos falsos", "Consumem internet", "Não são perigosas"],
        answer: 1
    },
    {
        question: "Qual a melhor atitude ao receber uma notícia chocante?",
        options: ["Compartilhar imediatamente", "Verificar em sites de fact-checking", "Acreditar se veio de amigo", "Ignorar"],
        answer: 1
    },
    {
        question: "Qual ferramenta pode ajudar a detectar deepfakes?",
        options: ["Paint", "Deepware Scanner", "Calculadora", "Bloco de Notas"],
        answer: 1
    },
    {
        question: "Deepfakes podem ser usados para:",
        options: ["Apenas entretenimento", "Fraudes, chantagem e desinformação", "Melhorar qualidade de vídeo", "Apenas em filmes"],
        answer: 1
    },
    {
        question: "O que significa ser um cidadão digital responsável?",
        options: ["Postar tudo que vê", "Verificar informações antes de compartilhar", "Usar só redes sociais", "Ignorar notícias"],
        answer: 1
    }
];

function loadQuestion() {
    const q = questions[currentQuestion];
    document.getElementById('question').innerHTML = `<strong>${currentQuestion + 1}/${questions.length}</strong> ${q.question}`;
    
    const optionsDiv = document.getElementById('options');
    optionsDiv.innerHTML = '';

    q.options.forEach((option, index) => {
        const btn = document.createElement('button');
        btn.textContent = option;
        btn.onclick = () => checkAnswer(index);
        optionsDiv.appendChild(btn);
    });

    document.getElementById('next-btn').style.display = 'none';
    document.getElementById('feedback').innerHTML = '';
}

function checkAnswer(selected) {
    const q = questions[currentQuestion];
    const buttons = document.querySelectorAll('#options button');
    const feedback = document.getElementById('feedback');

    buttons.forEach((btn, i) => {
        btn.disabled = true;
        if (i === q.answer) btn.style.borderColor = '#22c55e';
    });

    if (selected === q.answer) {
        score++;
        feedback.innerHTML = `✅ Correto!`;
        feedback.style.color = '#22c55e';
    } else {
        feedback.innerHTML = `❌ Errado. A resposta certa: <strong>${q.options[q.answer]}</strong>`;
        feedback.style.color = '#ef4444';
    }

    document.getElementById('next-btn').style.display = 'block';
}

document.getElementById('next-btn').addEventListener('click', () => {
    currentQuestion++;
    if (currentQuestion < questions.length) {
        loadQuestion();
    } else {
        showResult();
    }
});

function showResult() {
    document.getElementById('quiz-container').style.display = 'none';
    const resultDiv = document.getElementById('quiz-result');
    resultDiv.style.display = 'block';

    const percentage = Math.round((score / questions.length) * 100);
    let message = '';

    if (percentage === 100) message = "🏆 Parabéns! Você é um expert em Cidadania Digital!";
    else if (percentage >= 75) message = "👏 Muito bom! Você está bem informado.";
    else if (percentage >= 50) message = "🙂 Bom esforço! Continue estudando.";
    else message = "📚 Recomendamos estudar mais sobre o tema.";

    document.getElementById('score-text').innerHTML = `
        Você acertou <strong>${score}</strong> de <strong>${questions.length}</strong> perguntas.<br>
        <span style="font-size: 2rem;">${percentage}%</span><br><br>
        ${message}
    `;
}

function restartQuiz() {
    currentQuestion = 0;
    score = 0;
    document.getElementById('quiz-container').style.display = 'block';
    document.getElementById('quiz-result').style.display = 'none';
    loadQuestion();
}

// Dark Mode
document.getElementById('darkModeToggle').addEventListener('click', () => {
    document.body.classList.toggle('dark');
    const icon = document.getElementById('darkModeToggle');
    icon.textContent = document.body.classList.contains('dark') ? '☀️' : '🌙';
});

// Inicialização
document.addEventListener('DOMContentLoaded', () => {
    loadQuestion();
    
    // Smooth Scroll
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({ behavior: 'smooth' });
        });
    });
});
