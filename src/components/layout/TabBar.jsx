const tabs = [
  { id: 'trades', label: 'Trades' },
  { id: 'alerts', label: 'Alerts' },
]

export default function TabBar({ activeTab, onTabChange }) {
  return (
    <div className="bg-gray-900 border-b border-gray-700/50">
      <div className="max-w-7xl mx-auto px-4">
        <nav className="flex gap-6">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`py-3 text-sm font-medium border-b-2 transition-colors ${
                activeTab === tab.id
                  ? 'border-indigo-500 text-white'
                  : 'border-transparent text-gray-400 hover:text-gray-200'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </nav>
      </div>
    </div>
  )
}
