import { create } from 'zustand'

const useAppStore = create((set) => ({
  user: null,
  rates: null,
  cryptoRates: null,
  btcChart: null,      // ← New
  ethChart: null,      // ← New
  eurUsdChart: null,   // ← New
  loading: false,
  error: null,
  login: (userData) => set({ user: userData }),
  logout: () => set({ user: null, rates: null, cryptoRates: null, btcChart: null, ethChart: null, eurUsdChart: null }),
  setRates: (newRates) => set({ rates: newRates }),
  setCryptoRates: (newCrypto) => set({ cryptoRates: newCrypto }),
  setBtcChart: (data) => set({ btcChart: data }),
  setEthChart: (data) => set({ ethChart: data }),
  setEurUsdChart: (data) => set({ eurUsdChart: data }),
  setLoading: (isLoading) => set({ loading: isLoading }),
  setError: (err) => set({ error: err }),
}))

export default useAppStore
