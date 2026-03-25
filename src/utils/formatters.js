const currencyFormatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  signDisplay: 'auto',
})

const currencySignedFormatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  signDisplay: 'always',
})

export function formatCurrency(value) {
  if (value == null) return '--'
  return currencyFormatter.format(value)
}

export function formatCurrencySigned(value) {
  if (value == null) return '--'
  return currencySignedFormatter.format(value)
}

export function formatPercent(value) {
  if (value == null) return '--'
  return `${value >= 0 ? '+' : ''}${(value * 100).toFixed(1)}%`
}

export function formatDate(dateString) {
  if (!dateString) return '--'
  const [year, month, day] = dateString.split('-')
  return `${month}/${day}/${year}`
}

export function pnlColorClass(value) {
  if (value == null || value === 0) return 'text-gray-400'
  return value > 0 ? 'text-green-500' : 'text-red-500'
}
