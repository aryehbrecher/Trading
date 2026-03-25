import { useState } from 'react'
import { OPTION_TYPES, ALERT_STATUSES } from '../../data/constants'
import { validateAlert } from '../../utils/validators'

const emptyForm = {
  ticker: '',
  optionType: 'CALL',
  strikePrice: '',
  expirationDate: '',
  entryPriceMin: '',
  entryPriceMax: '',
  targetPrice: '',
  stopLoss: '',
  thesis: '',
  status: 'ACTIVE',
}

export default function AlertForm({ alert, onSubmit, onCancel }) {
  const [form, setForm] = useState(alert ? {
    ticker: alert.ticker,
    optionType: alert.optionType,
    strikePrice: alert.strikePrice,
    expirationDate: alert.expirationDate,
    entryPriceMin: alert.entryPriceMin,
    entryPriceMax: alert.entryPriceMax,
    targetPrice: alert.targetPrice,
    stopLoss: alert.stopLoss,
    thesis: alert.thesis || '',
    status: alert.status,
  } : emptyForm)

  const [errors, setErrors] = useState({})

  const set = (field) => (e) => setForm({ ...form, [field]: e.target.value })

  const handleSubmit = (e) => {
    e.preventDefault()
    const { valid, errors: errs } = validateAlert(form)
    if (!valid) { setErrors(errs); return }
    onSubmit({
      ...form,
      ticker: form.ticker.toUpperCase().trim(),
      strikePrice: Number(form.strikePrice),
      entryPriceMin: Number(form.entryPriceMin),
      entryPriceMax: Number(form.entryPriceMax),
      targetPrice: Number(form.targetPrice),
      stopLoss: Number(form.stopLoss),
    })
  }

  const inputCls = (field) =>
    `w-full bg-gray-800 border ${errors[field] ? 'border-red-500' : 'border-gray-600'} rounded-lg px-3 py-2 text-sm text-white focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500`

  return (
    <form onSubmit={handleSubmit}>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs text-gray-400 mb-1">Ticker</label>
          <input className={inputCls('ticker')} value={form.ticker} onChange={set('ticker')} placeholder="SPY" />
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
          <label className="block text-xs text-gray-400 mb-1">Entry Price Min</label>
          <input type="number" step="0.01" min="0" className={inputCls('entryPriceMin')} value={form.entryPriceMin} onChange={set('entryPriceMin')} placeholder="2.00" />
          {errors.entryPriceMin && <p className="text-red-400 text-xs mt-1">{errors.entryPriceMin}</p>}
        </div>
        <div>
          <label className="block text-xs text-gray-400 mb-1">Entry Price Max</label>
          <input type="number" step="0.01" min="0" className={inputCls('entryPriceMax')} value={form.entryPriceMax} onChange={set('entryPriceMax')} placeholder="3.00" />
          {errors.entryPriceMax && <p className="text-red-400 text-xs mt-1">{errors.entryPriceMax}</p>}
        </div>
        <div>
          <label className="block text-xs text-gray-400 mb-1">Target Price</label>
          <input type="number" step="0.01" min="0" className={inputCls('targetPrice')} value={form.targetPrice} onChange={set('targetPrice')} placeholder="6.00" />
          {errors.targetPrice && <p className="text-red-400 text-xs mt-1">{errors.targetPrice}</p>}
        </div>
        <div>
          <label className="block text-xs text-gray-400 mb-1">Stop Loss</label>
          <input type="number" step="0.01" min="0" className={inputCls('stopLoss')} value={form.stopLoss} onChange={set('stopLoss')} placeholder="1.00" />
          {errors.stopLoss && <p className="text-red-400 text-xs mt-1">{errors.stopLoss}</p>}
        </div>
        {alert && (
          <div>
            <label className="block text-xs text-gray-400 mb-1">Status</label>
            <select className={inputCls('status')} value={form.status} onChange={set('status')}>
              {ALERT_STATUSES.map(s => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>
        )}
      </div>

      <div className="mt-4">
        <label className="block text-xs text-gray-400 mb-1">Thesis / Notes</label>
        <textarea className={inputCls('thesis')} rows={3} value={form.thesis} onChange={set('thesis')} placeholder="Why this trade idea looks good..." />
      </div>

      <div className="flex justify-end gap-3 mt-6">
        <button type="button" onClick={onCancel} className="px-4 py-2 text-sm rounded-lg bg-gray-700 text-gray-200 hover:bg-gray-600">
          Cancel
        </button>
        <button type="submit" className="px-4 py-2 text-sm rounded-lg bg-indigo-600 text-white hover:bg-indigo-500">
          {alert ? 'Update Alert' : 'Add Alert'}
        </button>
      </div>
    </form>
  )
}
