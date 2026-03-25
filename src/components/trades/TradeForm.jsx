import { useState } from 'react'
import { OPTION_TYPES, TRADE_SIDES } from '../../data/constants'
import { validateTrade } from '../../utils/validators'

const today = () => new Date().toISOString().slice(0, 10)

const emptyForm = {
  ticker: '',
  optionType: 'CALL',
  strikePrice: '',
  expirationDate: '',
  side: 'BUY',
  quantity: '',
  premium: '',
  dateOpened: today(),
  dateClosed: '',
  closingPrice: '',
  notes: '',
}

export default function TradeForm({ trade, onSubmit, onCancel }) {
  const [form, setForm] = useState(trade ? {
    ticker: trade.ticker,
    optionType: trade.optionType,
    strikePrice: trade.strikePrice,
    expirationDate: trade.expirationDate,
    side: trade.side,
    quantity: trade.quantity,
    premium: trade.premium,
    dateOpened: trade.dateOpened,
    dateClosed: trade.dateClosed || '',
    closingPrice: trade.closingPrice ?? '',
    notes: trade.notes || '',
  } : emptyForm)

  const [errors, setErrors] = useState({})

  const set = (field) => (e) => setForm({ ...form, [field]: e.target.value })

  const handleSubmit = (e) => {
    e.preventDefault()
    const { valid, errors: errs } = validateTrade(form)
    if (!valid) { setErrors(errs); return }
    onSubmit({
      ...form,
      strikePrice: Number(form.strikePrice),
      quantity: Number(form.quantity),
      premium: Number(form.premium),
      closingPrice: form.closingPrice !== '' ? Number(form.closingPrice) : null,
      dateClosed: form.dateClosed || null,
    })
  }

  const inputCls = (field) =>
    `w-full bg-gray-800 border ${errors[field] ? 'border-red-500' : 'border-gray-600'} rounded-lg px-3 py-2 text-sm text-white focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500`

  return (
    <form onSubmit={handleSubmit}>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs text-gray-400 mb-1">Ticker</label>
          <input className={inputCls('ticker')} value={form.ticker} onChange={set('ticker')} placeholder="AAPL" />
          {errors.ticker && <p className="text-red-400 text-xs mt-1">{errors.ticker}</p>}
        </div>
        <div>
          <label className="block text-xs text-gray-400 mb-1">Option Type</label>
          <select className={inputCls('optionType')} value={form.optionType} onChange={set('optionType')}>
            {OPTION_TYPES.map(t => <option key={t} value={t}>{t}</option>)}
          </select>
        </div>
        <div>
          <label className="block text-xs text-gray-400 mb-1">Strike Price</label>
          <input type="number" step="0.01" min="0" className={inputCls('strikePrice')} value={form.strikePrice} onChange={set('strikePrice')} />
          {errors.strikePrice && <p className="text-red-400 text-xs mt-1">{errors.strikePrice}</p>}
        </div>
        <div>
          <label className="block text-xs text-gray-400 mb-1">Expiration Date</label>
          <input type="date" className={inputCls('expirationDate')} value={form.expirationDate} onChange={set('expirationDate')} />
          {errors.expirationDate && <p className="text-red-400 text-xs mt-1">{errors.expirationDate}</p>}
        </div>
        <div>
          <label className="block text-xs text-gray-400 mb-1">Side</label>
          <select className={inputCls('side')} value={form.side} onChange={set('side')}>
            {TRADE_SIDES.map(s => <option key={s} value={s}>{s}</option>)}
          </select>
        </div>
        <div>
          <label className="block text-xs text-gray-400 mb-1">Quantity (contracts)</label>
          <input type="number" min="1" className={inputCls('quantity')} value={form.quantity} onChange={set('quantity')} />
          {errors.quantity && <p className="text-red-400 text-xs mt-1">{errors.quantity}</p>}
        </div>
        <div>
          <label className="block text-xs text-gray-400 mb-1">Premium (per share)</label>
          <input type="number" step="0.01" min="0" className={inputCls('premium')} value={form.premium} onChange={set('premium')} placeholder="3.50" />
          {errors.premium && <p className="text-red-400 text-xs mt-1">{errors.premium}</p>}
        </div>
        <div>
          <label className="block text-xs text-gray-400 mb-1">Date Opened</label>
          <input type="date" className={inputCls('dateOpened')} value={form.dateOpened} onChange={set('dateOpened')} />
          {errors.dateOpened && <p className="text-red-400 text-xs mt-1">{errors.dateOpened}</p>}
        </div>

        <div className="sm:col-span-2 border-t border-gray-700/50 pt-4 mt-2">
          <p className="text-xs text-gray-500 mb-3">Leave blank if the trade is still open</p>
        </div>

        <div>
          <label className="block text-xs text-gray-400 mb-1">Date Closed</label>
          <input type="date" className={inputCls('dateClosed')} value={form.dateClosed} onChange={set('dateClosed')} />
          {errors.dateClosed && <p className="text-red-400 text-xs mt-1">{errors.dateClosed}</p>}
        </div>
        <div>
          <label className="block text-xs text-gray-400 mb-1">Closing Price (per share)</label>
          <input type="number" step="0.01" min="0" className={inputCls('closingPrice')} value={form.closingPrice} onChange={set('closingPrice')} placeholder="5.00" />
          {errors.closingPrice && <p className="text-red-400 text-xs mt-1">{errors.closingPrice}</p>}
        </div>
      </div>

      <div className="mt-4">
        <label className="block text-xs text-gray-400 mb-1">Notes</label>
        <textarea className={inputCls('notes')} rows={2} value={form.notes} onChange={set('notes')} placeholder="Trade thesis, notes..." />
      </div>

      <div className="flex justify-end gap-3 mt-6">
        <button type="button" onClick={onCancel} className="px-4 py-2 text-sm rounded-lg bg-gray-700 text-gray-200 hover:bg-gray-600">
          Cancel
        </button>
        <button type="submit" className="px-4 py-2 text-sm rounded-lg bg-indigo-600 text-white hover:bg-indigo-500">
          {trade ? 'Update Trade' : 'Add Trade'}
        </button>
      </div>
    </form>
  )
}
