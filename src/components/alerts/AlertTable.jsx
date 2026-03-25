import { useMemo } from 'react'
import Badge from '../common/Badge'
import { formatCurrency, formatDate } from '../../utils/formatters'

const statusOrder = { ACTIVE: 0, TRIGGERED: 1, EXPIRED: 2 }

export default function AlertTable({ alerts, onEdit, onDelete, onStatusChange }) {
  const sorted = useMemo(() => {
    return [...alerts].sort((a, b) => {
      const sa = statusOrder[a.status] ?? 9
      const sb = statusOrder[b.status] ?? 9
      if (sa !== sb) return sa - sb
      return (a.expirationDate || '').localeCompare(b.expirationDate || '')
    })
  }, [alerts])

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-gray-700/50">
            {['Ticker', 'Type', 'Strike', 'Exp', 'Entry Range', 'Target', 'Stop', 'Status', 'Thesis', ''].map(h => (
              <th key={h} className="text-left px-3 py-3 text-xs font-medium text-gray-400 uppercase tracking-wider">{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {sorted.map(alert => (
            <tr key={alert.id} className="border-b border-gray-800/50 hover:bg-gray-800/30">
              <td className="px-3 py-3 font-semibold text-white">{alert.ticker}</td>
              <td className="px-3 py-3"><Badge label={alert.optionType} /></td>
              <td className="px-3 py-3">{formatCurrency(alert.strikePrice)}</td>
              <td className="px-3 py-3">{formatDate(alert.expirationDate)}</td>
              <td className="px-3 py-3">{formatCurrency(alert.entryPriceMin)} - {formatCurrency(alert.entryPriceMax)}</td>
              <td className="px-3 py-3 text-green-400">{formatCurrency(alert.targetPrice)}</td>
              <td className="px-3 py-3 text-red-400">{formatCurrency(alert.stopLoss)}</td>
              <td className="px-3 py-3"><Badge label={alert.status} /></td>
              <td className="px-3 py-3 text-gray-400 max-w-[200px] truncate">{alert.thesis || '--'}</td>
              <td className="px-3 py-3">
                <div className="flex gap-2">
                  {alert.status === 'ACTIVE' && (
                    <button onClick={() => onStatusChange(alert.id, 'TRIGGERED')} className="text-gray-400 hover:text-green-400 text-xs">
                      Trigger
                    </button>
                  )}
                  <button onClick={() => onEdit(alert)} className="text-gray-400 hover:text-indigo-400 text-xs">Edit</button>
                  <button onClick={() => onDelete(alert.id)} className="text-gray-400 hover:text-red-400 text-xs">Del</button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
