import { useEffect } from 'react'
import useAppStore from '../stores/appStore'
import { fetchForexRates, fetchCryptoRates } from '../services/api'

export default function Dashboard() {
  const { rates, setRates, cryptoRates, setCryptoRates, loading, setLoading, error, setError } = useAppStore()

  const loadRates = async () => {
    setLoading(true)
    setError(null)
    try {
      const [forexData, cryptoData] = await Promise.all([
        fetchForexRates(),
        fetchCryptoRates()
      ])
      setRates(forexData)
      setCryptoRates(cryptoData)
    } catch (err) {
      setError('Failed to load rates')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadRates()
  }, [])

  return (
    <div style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto', color: '#e0e0e0' }}>
      <h1 style={{ fontSize: '3rem', color: '#00ff9d' }}>FXTrustra Dashboard</h1>
      <p style={{ fontSize: '1.5rem', margin: '2rem 0' }}>
        Demo Balance: <strong>$100,000.00</strong>
      </p>

      <button
        onClick={loadRates}
        disabled={loading}
        style={{
          padding: '1rem 2rem',
          background: '#00ff9d',
          color: '#0f2027',
          border: 'none',
          borderRadius: '8px',
          fontWeight: 'bold'
        }}
      >
        {loading ? 'Refreshing...' : 'Refresh Live Rates'}
      </button>

      {error && <p style={{ color: '#ff5555' }}>{error}</p>}

      {/* Forex Table */}
      {rates && (
        <div style={{ marginTop: '3rem' }}>
          <h2 style={{ color: '#00ff9d' }}>Forex Pairs (USD Base)</h2>
          <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '1rem' }}>
            <thead>
              <tr style={{ borderBottom: '2px solid #00ff9d' }}>
                <th style={{ padding: '1rem', textAlign: 'left' }}>Pair</th>
                <th style={{ padding: '1rem', textAlign: 'right' }}>Rate</th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(rates).map(([curr, rate]) => (
                <tr key={curr}>
                  <td style={{ padding: '1rem' }}>USD/{curr}</td>
                  <td style={{ padding: '1rem', textAlign: 'right' }}>{rate.toFixed(5)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Crypto Table */}
      {cryptoRates && (
        <div style={{ marginTop: '4rem' }}>
          <h2 style={{ color: '#00ff9d' }}>Crypto Prices (USD)</h2>
          <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '1rem' }}>
            <thead>
              <tr style={{ borderBottom: '2px solid #00ff9d' }}>
                <th style={{ padding: '1rem', textAlign: 'left' }}>Asset</th>
                <th style={{ padding: '1rem', textAlign: 'right' }}>Price</th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(cryptoRates).map(([symbol, price]) => (
                <tr key={symbol}>
                  <td style={{ padding: '1rem' }}>{symbol}/USD</td>
                  <td style={{ padding: '1rem', textAlign: 'right' }}>${Number(price).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
