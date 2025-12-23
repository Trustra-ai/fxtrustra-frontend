import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import useAppStore from '../stores/appStore'
import { registerUser } from '../services/api'

export default function Register() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const { login, setLoading } = useAppStore()
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      const res = await registerUser({ email, password })
      login(res.user)
      navigate('/dashboard')
    } catch (err) {
      setError('Registration failed. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{
      maxWidth: '400px',
      margin: '5rem auto',
      padding: '2.5rem',
      background: '#203a43',
      borderRadius: '12px',
      boxShadow: '0 8px 25px rgba(0,0,0,0.4)',
      color: '#e0e0e0'
    }}>
      <h2 style={{ textAlign: 'center', fontSize: '2.2rem', color: '#00ff9d', marginBottom: '2rem' }}>
        Create FXTrustra Account
      </h2>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
        <input
          type="email"
          placeholder="Email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          style={{
            padding: '1rem',
            borderRadius: '8px',
            border: '1px solid #ccc',
            background: '#0f2027',
            color: '#e0e0e0',
            fontSize: '1rem'
          }}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          style={{
            padding: '1rem',
            borderRadius: '8px',
            border: '1px solid #ccc',
            background: '#0f2027',
            color: '#e0e0e0',
            fontSize: '1rem'
          }}
        />
        <button
          type="submit"
          style={{
            padding: '1rem',
            background: '#00ff9d',
            color: '#0f2027',
            border: 'none',
            borderRadius: '8px',
            fontSize: '1.2rem',
            fontWeight: 'bold',
            cursor: 'pointer'
          }}
        >
          Register
        </button>
      </form>
      {error && <p style={{ color: '#ff5555', textAlign: 'center', marginTop: '1.5rem' }}>{error}</p>}
      <p style={{ textAlign: 'center', marginTop: '2rem' }}>
        Already have an account? <a href="/login" style={{ color: '#00ff9d' }}>Login here</a>
      </p>
    </div>
  )
}
