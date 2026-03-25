const MULTIPLIER = 100

export function calculateTradePnL(trade) {
  if (trade.closingPrice == null || trade.closingPrice === '') {
    return { pnl: null, pnlPercent: null, isRealized: false }
  }

  const closingPrice = Number(trade.closingPrice)
  const premium = Number(trade.premium)
  const quantity = Number(trade.quantity)

  let pnl
  if (trade.side === 'BUY') {
    pnl = (closingPrice - premium) * quantity * MULTIPLIER
  } else {
    pnl = (premium - closingPrice) * quantity * MULTIPLIER
  }

  const pnlPercent = premium !== 0
    ? (trade.side === 'BUY' ? (closingPrice - premium) / premium : (premium - closingPrice) / premium)
    : 0

  return { pnl, pnlPercent, isRealized: true }
}

export function calculateSummaryStats(trades) {
  const closedTrades = trades.filter(t => t.closingPrice != null && t.closingPrice !== '')
  const pnls = closedTrades.map(t => calculateTradePnL(t).pnl)

  const totalRealizedPnL = pnls.reduce((sum, p) => sum + p, 0)
  const wins = pnls.filter(p => p > 0)
  const losses = pnls.filter(p => p <= 0)

  const winRate = closedTrades.length > 0 ? wins.length / closedTrades.length : 0
  const avgWin = wins.length > 0 ? wins.reduce((s, w) => s + w, 0) / wins.length : 0
  const avgLoss = losses.length > 0 ? losses.reduce((s, l) => s + l, 0) / losses.length : 0

  const grossWins = wins.reduce((s, w) => s + w, 0)
  const grossLosses = Math.abs(losses.reduce((s, l) => s + l, 0))
  const profitFactor = grossLosses > 0 ? grossWins / grossLosses : grossWins > 0 ? Infinity : 0

  return {
    totalRealizedPnL,
    totalTrades: trades.length,
    openTrades: trades.length - closedTrades.length,
    closedTrades: closedTrades.length,
    winCount: wins.length,
    lossCount: losses.length,
    winRate,
    avgWin,
    avgLoss,
    profitFactor,
  }
}
