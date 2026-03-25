export default function Header() {
  return (
    <header className="bg-gray-900 border-b border-gray-700/50">
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center gap-3">
        <div className="w-8 h-8 bg-indigo-500 rounded-lg flex items-center justify-center text-white font-bold text-sm">
          OT
        </div>
        <h1 className="text-xl font-semibold text-white tracking-tight">Options Tracker</h1>
      </div>
    </header>
  )
}
