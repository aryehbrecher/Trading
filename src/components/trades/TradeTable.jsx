import { useState, useMemo } from 'react'
import Badge from '../common/Badge'
import { calculateTradePnL } from '../../utils/calculations'
import { formatCurrency, formatCurrencySigned, formatDate, pnlColorClass } from '../../utils/formatters'

const columns = [
  { key: 'ticker', label: 'Ticker' },
  { key: 'optionType', label: 'Type' },
  { key: 'strikePrice', label: 'Strike' },
  { key: 'expirationDate', label: 'Exp' },
  { key: 'side', label: 'Side' },
  { key: 'quantity', label: 'Qty' },
  { key: 'premium', label: 'Premium' },
  { key: 'dateOpened', label: 'Opened' },
  { key: 'dateClosed', label: 'Closed' },
  { key: 'pnl', label: 'P&L (x100)' },
  { key: 'actions', label: '' },
]

export default function TradeTable({ trades, onEdit, onDelete }) {
  const [sortField, setSortField] = useState('dateOpened')
  const [sortDir, setSortDir] = useState('desc')

  const sorted = useMemo(() => {
    return [...trades].sort((a, b) => {
      let va = a[sortField]
      let vb = b[sortField]
      if (sortField === 'pnl') {
        va = calculateTradePnL(a).pnl ?? -Infinity
        vb = calculateTradePnL(b).pnl ?? -Infinity
      }
      if (typeof va === 'string') { va = va.toLowerCase(); vb = (vb || '').toLowerCase() }
      if (va < vb) return sortDir === 'asc' ? -1 : 1
      if (va > vb) return sortDir === 'asc' ? 1 : -1
      return 0
    })
  }, [trades, sortField, sortDir])

  const toggleSort = (key) => {
    if (key === 'actions') return
    if (sortField === key) setSortDir(d => d === 'asc' ? 'desc' : 'asc')
    else { setSortField(key); setSortDir('desc') }
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-gray-700/50">
            {columns.map(col => (
              <th
                key={col.key}
                onClick={() => toggleSort(col.key)}
                className={`text-left px-3 py-3 text-xs font-medium text-gray-400 uppercase tracking-wider ${col.key !== 'actions' ? 'cursor-pointer hover:text-gray-200' : ''}`}
              >
                {col.label}
                {sortField === col.key && <span className="ml-1">{sortDir === 'asc' ? '\u2191' : '\u2193'}</span>}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {sorted.map(trade => {
            const { pnl } = calculateTradePnL(trade)
            return (
              <tr key={trade.id} className="border-b border-gray-800/50 hover:bg-gray-800/30">
                <td className="px-3 py-3 font-semibold text-white">{trade.ticker}</td>
                <td className="px-3 py-3"><Badge label={trade.optionType} /></td>
                <td className="px-3 py-3">{formatCurrency(trade.strikePrice)}</td>
                <td className="px-3 py-3">{formatDate(trade.expirationDate)}</td>
                <td className="px-3 py-3"><Badge label={trade.side} /></td>
                <td className="px-3 py-3">{trade.quantity}</td>
                <td className="px-3 py-3">{formatCurrency(trade.premium)}</td>
                <td className="px-3 py-3">{formatDate(trade.dateOpened)}</td>
                <td className="px-3 py-3">{formatDate(trade.dateClosed)}</td>
                <td className={`px-3 py-3 font-medium ${pnlColorClass(pnl)}`}>
                  {pnl != null ? formatCurrencySigned(pnl) : <span className="text-gray-500">Open</span>}
                </td>
                <td className="px-3 py-3">
                  <div className="flex gap-2">
                    <button onClick={() => onEdit(trade)} className="text-gray-400 hover:text-indigo-400 text-xs">Edit</button>
                    <button onClick={() => onDelete(trade.id)} className="text-gray-400 hover:text-red-400 text-xs">Del</button>
                  </div>
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}
