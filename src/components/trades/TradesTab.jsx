import { useState } from 'react'
import { useTrades } from '../../hooks/useTrades'
import TradeSummary from './TradeSummary'
import TradeTable from './TradeTable'
import TradeForm from './TradeForm'
import Modal from '../common/Modal'
import ConfirmDialog from '../common/ConfirmDialog'
import EmptyState from '../common/EmptyState'

export default function TradesTab() {
  const { trades, addTrade, updateTrade, deleteTrade, summaryStats } = useTrades()
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [editingTrade, setEditingTrade] = useState(null)
  const [deleteId, setDeleteId] = useState(null)

  const handleSubmit = (data) => {
    if (editingTrade) {
      updateTrade(editingTrade.id, data)
    } else {
      addTrade(data)
    }
    setIsFormOpen(false)
    setEditingTrade(null)
  }

  const handleEdit = (trade) => {
    setEditingTrade(trade)
    setIsFormOpen(true)
  }

  const handleClose = () => {
    setIsFormOpen(false)
    setEditingTrade(null)
  }

  return (
    <div>
      <TradeSummary stats={summaryStats} />

      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-white">All Trades</h2>
        <button
          onClick={() => { setEditingTrade(null); setIsFormOpen(true) }}
          className="px-4 py-2 text-sm rounded-lg bg-indigo-600 text-white hover:bg-indigo-500"
        >
          + Add Trade
        </button>
      </div>

      {trades.length === 0 ? (
        <EmptyState
          message="No trades yet. Start tracking your options trades."
          actionLabel="Add Your First Trade"
          onAction={() => setIsFormOpen(true)}
        />
      ) : (
        <div className="bg-gray-900/50 border border-gray-700/50 rounded-xl overflow-hidden">
          <TradeTable trades={trades} onEdit={handleEdit} onDelete={setDeleteId} />
        </div>
      )}

      <Modal
        isOpen={isFormOpen}
        onClose={handleClose}
        title={editingTrade ? 'Edit Trade' : 'New Trade'}
      >
        <TradeForm
          key={editingTrade?.id || 'new'}
          trade={editingTrade}
          onSubmit={handleSubmit}
          onCancel={handleClose}
        />
      </Modal>

      <ConfirmDialog
        isOpen={deleteId !== null}
        message="Are you sure you want to delete this trade? This cannot be undone."
        onConfirm={() => { deleteTrade(deleteId); setDeleteId(null) }}
        onCancel={() => setDeleteId(null)}
      />
    </div>
  )
}
