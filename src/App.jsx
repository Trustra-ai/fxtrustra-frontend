
import { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function App() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setLoading(true);

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/login`,
        { email, password }
      );

      setMessage('Login successful!');
      localStorage.setItem('isLoggedIn', 'true');
      window.location.href = '/dashboard';

      console.log('Login response:', res.data);
    } catch (err) {
      const errorMsg = err.response?.data?.message || err.message || 'Login failed';
      setMessage('Error: ' + errorMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '100px', fontFamily: 'Arial, sans-serif' }}>
      <h1>Login to FXTrustra</h1>

      <form onSubmit={handleSubmit} style={{ margin: '40px auto', maxWidth: '400px' }}>
        <div style={{ marginBottom: '20px' }}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={{
              width: '100%',
              padding: '12px',
              fontSize: '16px',
              borderRadius: '8px',
              border: '1px solid #ccc'
            }}
          />
        </div>

        <div style={{ marginBottom: '20px' }}>
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={{
              width: '100%',
              padding: '12px',
              fontSize: '16px',
              borderRadius: '8px',
              border: '1px solid #ccc'
            }}
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          style={{
            padding: '12px 30px',
            fontSize: '18px',
            backgroundColor: '#007bff',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            cursor: loading ? 'not-allowed' : 'pointer'
          }}
        >
          {loading ? 'Logging in...' : 'Login'}
        </button>
      </form>

      {message && (
        <p style={{ color: message.startsWith('Error') ? 'red' : 'green', fontWeight: 'bold' }}>
          {message}
        </p>
      )}

      <p>
        Don't have an account? <Link to="/register" style={{ color: '#007bff', textDecoration: 'none' }}>Register here</Link>
      </p>
    </div>
  );
}

export default App;
