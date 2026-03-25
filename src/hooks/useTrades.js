import { useMemo, useCallback } from 'react'
import { useLocalStorage } from './useLocalStorage'
import { STORAGE_KEYS } from '../data/constants'
import { calculateSummaryStats } from '../utils/calculations'

export function useTrades() {
  const [trades, setTrades] = useLocalStorage(STORAGE_KEYS.TRADES, [])

  const addTrade = useCallback((trade) => {
    setTrades((prev) => [
      ...prev,
      {
        ...trade,
        id: crypto.randomUUID(),
        ticker: trade.ticker.toUpperCase().trim(),
        createdAt: new Date().toISOString(),
      },
    ])
  }, [setTrades])

  const updateTrade = useCallback((id, updates) => {
    setTrades((prev) =>
      prev.map((t) =>
        t.id === id
          ? { ...t, ...updates, ticker: (updates.ticker || t.ticker).toUpperCase().trim() }
          : t
      )
    )
  }, [setTrades])

  const deleteTrade = useCallback((id) => {
    setTrades((prev) => prev.filter((t) => t.id !== id))
  }, [setTrades])

  const summaryStats = useMemo(() => calculateSummaryStats(trades), [trades])

  return { trades, addTrade, updateTrade, deleteTrade, summaryStats }
}
