import { Link } from 'react-router-dom'
import useAppStore from '../stores/appStore'

export default function Navbar() {
  const { user, logout } = useAppStore()

  return (
    <nav style={{
      background: '#0f2027',
      color: '#e0e0e0',
      padding: '1rem 2rem',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      boxShadow: '0 2px 10px rgba(0,0,0,0.3)'
    }}>
      <Link to="/" style={{ textDecoration: 'none', color: '#00ff9d', fontSize: '1.8rem', fontWeight: 'bold' }}>
        FXTrustra
      </Link>
      <div>
        {user ? (
          <>
            <span style={{ marginRight: '1rem' }}>Welcome, {user}</span>
            <button onClick={logout} style={{ background: 'transparent', border: '1px solid #00ff9d', color: '#00ff9d', padding: '0.5rem 1rem', borderRadius: '4px' }}>
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login" style={{ marginRight: '1rem', color: '#e0e0e0', textDecoration: 'none' }}>Login</Link>
            <Link to="/register" style={{ color: '#e0e0e0', textDecoration: 'none' }}>Register</Link>
          </>
        )}
      </div>
    </nav>
  )
}
