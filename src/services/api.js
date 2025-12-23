import axios from 'axios'

// Forex rates - Frankfurter API (official ECB rates, free, no key)
export const fetchForexRates = async () => {
  const response = await axios.get('https://api.frankfurter.dev/v1/latest', {
    params: { base: 'USD' }
  })
  return response.data.rates
}

// Crypto rates - CoinGecko API (free, real-time, no key)
export const fetchCryptoRates = async () => {
  const ids = 'bitcoin,ethereum,solana,binancecoin,ripple,cardano,dogecoin,tron,toncoin,avalanche-2'
  const response = await axios.get('https://api.coingecko.com/api/v3/simple/price', {
    params: {
      ids: ids,
      vs_currencies: 'usd'
    }
  })
  const cryptoMap = {
    bitcoin: 'BTC',
    ethereum: 'ETH',
    solana: 'SOL',
    binancecoin: 'BNB',
    ripple: 'XRP',
    cardano: 'ADA',
    dogecoin: 'DOGE',
    tron: 'TRX',
    toncoin: 'TON',
    'avalanche-2': 'AVAX'
  }
  const rates = {}
  Object.entries(response.data).forEach(([id, data]) => {
    const symbol = cryptoMap[id]
    if (symbol && data.usd) rates[symbol] = data.usd
  })
  return rates
}

// Mock login & register (instant success for demo)
export const loginUser = async (credentials) => {
  return new Promise((resolve) =>
    setTimeout(() => resolve({ user: credentials.email }), 600)
  )
}

export const registerUser = async (userData) => {
  return new Promise((resolve) =>
    setTimeout(() => resolve({ user: userData.email }), 600)
  )
}
