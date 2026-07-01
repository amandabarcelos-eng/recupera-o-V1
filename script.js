// script.js
let currentQuestion = 0;
let score = 0;

const questions = [
    {
        question: "O que significa a palavra 'Deepfake'?",
        options: [
            "Uma nova rede social",
            "Vídeo ou imagem gerada ou manipulada por Inteligência Artificial",
            "Um tipo de vírus de computador",
            "Uma ferramenta de edição de fotos"
        ],
        correct: 1
    },
    {
        question: "Qual tecnologia é principalmente usada para criar deepfakes?",
        options: [
            "HTML e CSS",
            "Redes Adversárias Generativas (GANs)",
            "Banco de dados SQL",
            "JavaScript puro"
        ],
        correct: 1
    },
    {
        question: "Qual é um bom sinal para identificar um deepfake?",
        options: [
            "Imagens em alta resolução",
            "Piscadas irregulares ou ausência delas",
            "Cores muito vibrantes",
            "Áudio em alta qualidade"
        ],
        correct: 1
    },
    {
        question: "Qual é uma consequência grave das deepfakes na política?",
        options: [
            "Aumento da participação popular",
            "Desinformação em massa que pode influenciar eleições",
            "Melhoria na qualidade dos debates",
            "Redução do custo das campanhas"
        ],
        correct: 1
    }
];

function loadQuestion() {
    const q = questions[currentQuestion];
    document.getElementById('question-text').textContent = q.question;
    
    const optionsDiv = document.getElementById('options');
    optionsDiv.innerHTML = '';
    
    q.options.forEach((option, index) => {
        const btn = document.createElement('button');
        btn.className = 'option-btn';
        btn.textContent = option;
        btn.onclick = () => checkAnswer(index);
        optionsDiv.appendChild(btn);
    });
}

function checkAnswer(selectedIndex) {
    const q = questions[currentQuestion];
    const buttons = document.querySelectorAll('.option-btn');
    
    buttons.forEach((btn, i) => {
        btn.disabled = true;
        if (i === q.correct) {
            btn.classList.add('correct');
        } else if (i === selectedIndex) {
            btn.classList.add('wrong');
        }
    });
    
    if (selectedIndex === q.correct) score++;
    
    setTimeout(() => {
        currentQuestion++;
        if (currentQuestion < questions.length) {
            loadQuestion();
        } else {
            showResult();
        }
    }, 1500);
}

function showResult() {
    document.getElementById('question-container').classList.add('hidden');
    const resultDiv = document.getElementById('quiz-result');
    resultDiv.classList.remove('hidden');
    
    const percentage = Math.round((score / questions.length) * 100);
    document.getElementById('score-text').innerHTML = `
        Você acertou <strong>${score}</strong> de <strong>${questions.length}</strong> perguntas!<br>
        <span style="font-size:1.8rem; margin-top:1rem; display:block;">${percentage}%</span>
    `;
}

function restartQuiz() {
    currentQuestion = 0;
    score = 0;
    document.getElementById('question-container').classList.remove('hidden');
    document.getElementById('quiz-result').classList.add('hidden');
    loadQuestion();
}

// Dark Mode
const toggle = document.getElementById('darkModeToggle');
toggle.addEventListener('click', () => {
    const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
    document.documentElement.setAttribute('data-theme', isDark ? 'light' : 'dark');
    toggle.innerHTML = isDark ? '<i class="fas fa-moon"></i>' : '<i class="fas fa-sun"></i>';
});

// Form
document.getElementById('reportForm').addEventListener('submit', function(e) {
    e.preventDefault();
    alert('✅ Denúncia enviada com sucesso!\n\nObrigado por contribuir com uma internet mais segura.');
    this.reset();
});

// Inicialização
document.addEventListener('DOMContentLoaded', () => {
    loadQuestion();
    
    // Scroll suave para links internos
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            if (this.getAttribute('href') !== '#') {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({ behavior: 'smooth' });
                }
            }
        });
    });
});
