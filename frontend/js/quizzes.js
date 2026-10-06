const API_BASE = 'http://localhost:3000/api';

const user = JSON.parse(localStorage.getItem('user') || 'null');
if (!user) {
  window.location.href = 'login.html';
}

document.getElementById('welcomeMsg').textContent = `Hi, ${user.name}`;
document.getElementById('logoutLink').addEventListener('click', (e) => {
  e.preventDefault();
  localStorage.removeItem('user');
  window.location.href = 'login.html';
});

const quizListEl = document.getElementById('quizList');
const quizItemsEl = document.getElementById('quizItems');
const quizAreaEl = document.getElementById('quizArea');
const quizFormEl = document.getElementById('quizForm');
const quizTitleEl = document.getElementById('quizTitle');
const resultBoxEl = document.getElementById('resultBox');
const scoreTextEl = document.getElementById('scoreText');

let currentQuiz = null;
let currentQuestions = [];

async function loadQuizzes() {
  try {
    const res = await fetch(`${API_BASE}/quizzes`);
    const quizzes = await res.json();
    quizItemsEl.innerHTML = '';
    quizzes.forEach(q => {
      const card = document.createElement('div');
      card.className = 'quiz-card';
      card.innerHTML = `<h3>${q.title}</h3>`;
      const btn = document.createElement('button');
      btn.textContent = 'Start';
      btn.addEventListener('click', () => startQuiz(q));
      card.appendChild(btn);
      quizItemsEl.appendChild(card);
    });
  } catch (err) {
    quizItemsEl.innerHTML = '<p>Could not load quizzes.</p>';
  }
}

async function startQuiz(quiz) {
  currentQuiz = quiz;
  const res = await fetch(`${API_BASE}/quizzes/${quiz.quiz_id}/questions`);
  currentQuestions = await res.json();

  quizTitleEl.textContent = quiz.title;
  quizFormEl.innerHTML = '';

  currentQuestions.forEach((q, i) => {
    const block = document.createElement('div');
    block.className = 'question-block';
    block.innerHTML = `<p>${i + 1}. ${q.question_text}</p>`;

    ['A', 'B', 'C', 'D'].forEach(opt => {
      const optionText = q[`option_${opt.toLowerCase()}`];
      if (!optionText) return;
      const row = document.createElement('label');
      row.className = 'option-row';
      row.innerHTML = `
        <input type="radio" name="q_${q.question_id}" value="${opt}" required>
        <span>${optionText}</span>
      `;
      block.appendChild(row);
    });

    quizFormEl.appendChild(block);
  });

  quizListEl.style.display = 'none';
  quizAreaEl.style.display = 'block';
}

quizFormEl.addEventListener('submit', async (e) => {
  e.preventDefault();

  let score = 0;
  currentQuestions.forEach(q => {
    const selected = quizFormEl.querySelector(`input[name="q_${q.question_id}"]:checked`);
    if (selected && selected.value === q.correct_answer) {
      score++;
    }
  });

  try {
    await fetch(`${API_BASE}/results`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        user_id: user.id,
        quiz_id: currentQuiz.quiz_id,
        score,
        total_questions: currentQuestions.length
      })
    });
  } catch (err) {
    console.error('Could not save result:', err);
  }

  scoreTextEl.textContent = `You scored ${score} out of ${currentQuestions.length}`;
  quizAreaEl.style.display = 'none';
  resultBoxEl.style.display = 'block';
});

document.getElementById('backToList').addEventListener('click', () => {
  resultBoxEl.style.display = 'none';
  quizListEl.style.display = 'block';
});

loadQuizzes();