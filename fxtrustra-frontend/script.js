const API_URL = 'http://localhost:3000/api';

function showSection(section) {
  document.querySelectorAll('.section').forEach(s => s.style.display = 'none');
  document.getElementById(section).style.display = 'block';
  if (section === 'dashboard' || section === 'admin') checkAuth();
}

window.onload = () => {
  const token = localStorage.getItem('token');
  const user = JSON.parse(localStorage.getItem('user') || 'null');
  if (token && user) {
    document.getElementById('logout-link').style.display = 'inline';
    document.getElementById('user-info').textContent = `Welcome, \( {user.username} ( \){user.role})`;
    showSection(user.role === 'admin' ? 'admin' : 'dashboard');
  } else {
    showSection('login');
  }
};

document.getElementById('register-form').addEventListener('submit', async (e) => {
  e.preventDefault();
  const data = {
    username: document.getElementById('reg-username').value,
    email: document.getElementById('reg-email').value,
    password: document.getElementById('reg-password').value
  };
  try {
    const res = await fetch(`${API_URL}/register`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) });
    const json = await res.json();
    document.getElementById('register-message').textContent = json.message;
    if (res.ok) { document.getElementById('register-form').reset(); showSection('login'); }
  } catch { document.getElementById('register-message').textContent = 'Server error'; }
});

document.getElementById('login-form').addEventListener('submit', async (e) => {
  e.preventDefault();
  const data = { username: document.getElementById('login-username').value, password: document.getElementById('login-password').value };
  try {
    const res = await fetch(`${API_URL}/login`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) });
    const json = await res.json();
    document.getElementById('login-message').textContent = json.message;
    if (res.ok) {
      localStorage.setItem('token', json.token);
      localStorage.setItem('user', JSON.stringify(json.user));
      document.getElementById('logout-link').style.display = 'inline';
      document.getElementById('user-info').textContent = `Welcome, \( {json.user.username} ( \){json.user.role})`;
      showSection(json.user.role === 'admin' ? 'admin' : 'dashboard');
    }
  } catch { document.getElementById('login-message').textContent = 'Server error'; }
});

function logout() {
  localStorage.clear();
  document.getElementById('logout-link').style.display = 'none';
  document.getElementById('user-info').textContent = '';
  showSection('login');
}

async function loadDashboard() {
  try {
    const res = await fetch(`\( {API_URL}/dashboard`, { headers: { Authorization: `Bearer \){localStorage.getItem('token')}` } });
    const data = await res.json();
    document.getElementById('dashboard-message').textContent = data.message || 'Welcome to your dashboard!';
  } catch { logout(); }
}

async function loadAdmin() {
  try {
    const res = await fetch(`\( {API_URL}/admin/users`, { headers: { Authorization: `Bearer \){localStorage.getItem('token')}` } });
    if (res.ok) {
      const users = await res.json();
      const list = document.getElementById('users-list');
      list.innerHTML = users.map(u => `<li><strong>\( {u.username}</strong> ( \){u.email}) - Role: ${u.role}</li>`).join('');
    } else { alert('Admin only'); logout(); }
  } catch { alert('Error'); }
}

function checkAuth() {
  const user = JSON.parse(localStorage.getItem('user') || 'null');
  user?.role === 'admin' ? loadAdmin() : loadDashboard();
}
