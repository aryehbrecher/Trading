export default function StatCard({ label, value, valueClassName = 'text-white' }) {
  return (
    <div className="bg-gray-800/50 border border-gray-700/50 rounded-lg p-4">
      <div className="text-xs text-gray-400 uppercase tracking-wider mb-1">{label}</div>
      <div className={`text-lg font-semibold ${valueClassName}`}>{value}</div>
    </div>
  )
}
