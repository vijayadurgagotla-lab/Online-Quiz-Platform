const API_BASE = 'http://localhost:3000/api/auth';

function showMessage(text, type = 'error') {
  const el = document.getElementById('message');
  el.textContent = text;
  el.className = `message ${type}`;
}

const loginForm = document.getElementById('loginForm');
if (loginForm) {
  loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    try {
      const res = await fetch(`${API_BASE}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ email, password })
      });
      const data = await res.json();

      if (!res.ok) {
        showMessage(data.message || 'Login failed', 'error');
        return;
      }

      localStorage.setItem('user', JSON.stringify(data.user));
      showMessage('Login successful. Redirecting...', 'success');
      setTimeout(() => window.location.href = 'quizzes.html', 800);
    } catch (err) {
      showMessage('Could not reach the server. Is the backend running?', 'error');
    }
  });
}

const registerForm = document.getElementById('registerForm');
if (registerForm) {
  registerForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    try {
      const res = await fetch(`${API_BASE}/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password })
      });
      const data = await res.json();

      if (!res.ok) {
        showMessage(data.message || 'Registration failed', 'error');
        return;
      }

      showMessage('Account created. You can log in now.', 'success');
      setTimeout(() => window.location.href = 'login.html', 800);
    } catch (err) {
      showMessage('Could not reach the server. Is the backend running?', 'error');
    }
  });
}