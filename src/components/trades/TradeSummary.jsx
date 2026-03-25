import StatCard from '../common/StatCard'
import { formatCurrencySigned, pnlColorClass } from '../../utils/formatters'

export default function TradeSummary({ stats }) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 mb-6">
      <StatCard
        label="Realized P&L"
        value={formatCurrencySigned(stats.totalRealizedPnL)}
        valueClassName={pnlColorClass(stats.totalRealizedPnL)}
      />
      <StatCard
        label="Win Rate"
        value={stats.closedTrades > 0 ? `${(stats.winRate * 100).toFixed(1)}%` : '--'}
      />
      <StatCard label="Total Trades" value={stats.totalTrades} />
      <StatCard label="Open" value={stats.openTrades} />
      <StatCard
        label="Avg Win"
        value={stats.winCount > 0 ? formatCurrencySigned(stats.avgWin) : '--'}
        valueClassName="text-green-500"
      />
      <StatCard
        label="Avg Loss"
        value={stats.lossCount > 0 ? formatCurrencySigned(stats.avgLoss) : '--'}
        valueClassName="text-red-500"
      />
    </div>
  )
}
