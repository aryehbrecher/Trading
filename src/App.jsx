import { useState } from 'react'
import Header from './components/layout/Header'
import TabBar from './components/layout/TabBar'
import TradesTab from './components/trades/TradesTab'
import AlertsTab from './components/alerts/AlertsTab'

export default function App() {
  const [activeTab, setActiveTab] = useState('trades')

  return (
    <div className="min-h-screen bg-gray-950 text-gray-200">
      <Header />
      <TabBar activeTab={activeTab} onTabChange={setActiveTab} />
      <main className="max-w-7xl mx-auto px-4 py-6">
        {activeTab === 'trades' ? <TradesTab /> : <AlertsTab />}
      </main>
    </div>
  )
}
