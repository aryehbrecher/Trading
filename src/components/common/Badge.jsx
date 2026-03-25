const variants = {
  CALL: 'bg-blue-600/20 text-blue-400',
  PUT: 'bg-purple-600/20 text-purple-400',
  BUY: 'bg-green-600/20 text-green-400',
  SELL: 'bg-red-600/20 text-red-400',
  ACTIVE: 'bg-indigo-600/20 text-indigo-400',
  TRIGGERED: 'bg-green-600/20 text-green-400',
  EXPIRED: 'bg-gray-600/20 text-gray-400',
}

export default function Badge({ label }) {
  return (
    <span className={`inline-block px-2 py-0.5 rounded text-xs font-medium ${variants[label] || 'bg-gray-600/20 text-gray-400'}`}>
      {label}
    </span>
  )
}
