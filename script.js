// script.js
let currentQuestion = 0;
let score = 0;

const questions = [
    {
        question: "O que significa a palavra 'Deepfake'?",
        options: [
            "Um tipo de filtro do Instagram",
            "Vídeos ou áudios manipulados por IA",
            "Uma rede social nova",
            "Um vírus de computador"
        ],
        answer: 1
    },
    {
        question: "Qual é uma das principais formas de identificar deepfakes?",
        options: [
            "Olhar apenas para a roupa da pessoa",
            "Observar piscadas irregulares e iluminação inconsistente",
            "Aumentar o volume do áudio",
            "Confiar sempre no título do vídeo"
        ],
        answer: 1
    },
    {
        question: "Por que as deepfakes são perigosas em períodos eleitorais?",
        options: [
            "Porque elas são muito engraçadas",
            "Podem manipular a opinião pública com discursos falsos",
            "Porque elas consomem muita internet",
            "Não são perigosas"
        ],
        answer: 1
    },
    {
        question: "O que você deve fazer ao receber uma notícia chocante?",
        options: [
            "Compartilhar imediatamente",
            "Verificar em sites de fact-checking antes de compartilhar",
            "Acreditar porque veio de um amigo",
            "Ignorar completamente"
        ],
        answer: 1
    }
];

function loadQuestion() {
    const q = questions[currentQuestion];
    document.getElementById('question').innerHTML = `<strong>${currentQuestion + 1}.</strong> ${q.question}`;
    
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
        if (i === q.answer) {
            btn.style.borderColor = '#22c55e';
            btn.style.backgroundColor = '#f0fdf4';
        }
    });
    
    if (selected === q.answer) {
        score++;
        feedback.innerHTML = `<span style="color: #22c55e;">✅ Correto!</span>`;
    } else {
        feedback.innerHTML = `<span style="color: #ef4444;">❌ Incorreto. A resposta certa era: ${q.options[q.answer]}</span>`;
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
    
    let message = '';
    const percentage = Math.round((score / questions.length) * 100);
    
    if (percentage === 100) message = "🎉 Excelente! Você domina o tema!";
    else if (percentage >= 75) message = "👏 Muito bom! Continue estudando.";
    else if (percentage >= 50) message = "🙂 Bom esforço! Revise os conceitos.";
    else message = "📚 Vamos estudar mais sobre Cidadania Digital!";
    
    document.getElementById('score-text').innerHTML = `
        Você acertou <strong>${score}</strong> de <strong>${questions.length}</strong> perguntas.<br>
        <span style="font-size: 1.4rem;">${percentage}%</span><br><br>
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
const toggle = document.getElementById('darkModeToggle');
toggle.addEventListener('click', () => {
    document.body.classList.toggle('dark');
    if (document.body.classList.contains('dark')) {
        toggle.textContent = '☀️';
    } else {
        toggle.textContent = '🌙';
    }
});

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    loadQuestion();
    
    // Smooth scroll
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            if (this.getAttribute('href') !== '#') {
                e.preventDefault();
                document.querySelector(this.getAttribute('href')).scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
});
