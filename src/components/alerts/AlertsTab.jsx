import { useState, useEffect, useCallback } from 'react'
import { useLocalStorage } from '../../hooks/useLocalStorage'
import { STORAGE_KEYS } from '../../data/constants'
import AlertTable from './AlertTable'
import AlertForm from './AlertForm'
import Modal from '../common/Modal'
import ConfirmDialog from '../common/ConfirmDialog'
import EmptyState from '../common/EmptyState'
import Badge from '../common/Badge'

export default function AlertsTab() {
  const [alerts, setAlerts] = useLocalStorage(STORAGE_KEYS.ALERTS, [])
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [editingAlert, setEditingAlert] = useState(null)
  const [deleteId, setDeleteId] = useState(null)

  // Auto-expire alerts past their expiration date
  useEffect(() => {
    const today = new Date().toISOString().slice(0, 10)
    const updated = alerts.map(a =>
      a.status === 'ACTIVE' && a.expirationDate && a.expirationDate < today
        ? { ...a, status: 'EXPIRED' }
        : a
    )
    if (JSON.stringify(updated) !== JSON.stringify(alerts)) {
      setAlerts(updated)
    }
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  const addAlert = useCallback((data) => {
    setAlerts(prev => [...prev, { ...data, id: crypto.randomUUID(), createdAt: new Date().toISOString() }])
  }, [setAlerts])

  const updateAlert = useCallback((id, data) => {
    setAlerts(prev => prev.map(a => a.id === id ? { ...a, ...data } : a))
  }, [setAlerts])

  const deleteAlert = useCallback((id) => {
    setAlerts(prev => prev.filter(a => a.id !== id))
  }, [setAlerts])

  const changeStatus = useCallback((id, status) => {
    setAlerts(prev => prev.map(a => a.id === id ? { ...a, status } : a))
  }, [setAlerts])

  const handleSubmit = (data) => {
    if (editingAlert) {
      updateAlert(editingAlert.id, data)
    } else {
      addAlert(data)
    }
    setIsFormOpen(false)
    setEditingAlert(null)
  }

  const handleEdit = (alert) => {
    setEditingAlert(alert)
    setIsFormOpen(true)
  }

  const handleClose = () => {
    setIsFormOpen(false)
    setEditingAlert(null)
  }

  const activeCount = alerts.filter(a => a.status === 'ACTIVE').length
  const triggeredCount = alerts.filter(a => a.status === 'TRIGGERED').length
  const expiredCount = alerts.filter(a => a.status === 'EXPIRED').length

  return (
    <div>
      <div className="flex flex-wrap items-center gap-3 mb-6">
        <div className="flex items-center gap-2 text-sm text-gray-400">
          <Badge label="ACTIVE" /> <span>{activeCount}</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-400">
          <Badge label="TRIGGERED" /> <span>{triggeredCount}</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-400">
          <Badge label="EXPIRED" /> <span>{expiredCount}</span>
        </div>
      </div>

      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-white">Trade Ideas & Alerts</h2>
        <button
          onClick={() => { setEditingAlert(null); setIsFormOpen(true) }}
          className="px-4 py-2 text-sm rounded-lg bg-indigo-600 text-white hover:bg-indigo-500"
        >
          + Add Alert
        </button>
      </div>

      {alerts.length === 0 ? (
        <EmptyState
          message="No alerts yet. Add trade ideas to watch."
          actionLabel="Add Your First Alert"
          onAction={() => setIsFormOpen(true)}
        />
      ) : (
        <div className="bg-gray-900/50 border border-gray-700/50 rounded-xl overflow-hidden">
          <AlertTable alerts={alerts} onEdit={handleEdit} onDelete={setDeleteId} onStatusChange={changeStatus} />
        </div>
      )}

      <Modal
        isOpen={isFormOpen}
        onClose={handleClose}
        title={editingAlert ? 'Edit Alert' : 'New Alert'}
      >
        <AlertForm
          key={editingAlert?.id || 'new'}
          alert={editingAlert}
          onSubmit={handleSubmit}
          onCancel={handleClose}
        />
      </Modal>

      <ConfirmDialog
        isOpen={deleteId !== null}
        message="Are you sure you want to delete this alert?"
        onConfirm={() => { deleteAlert(deleteId); setDeleteId(null) }}
        onCancel={() => setDeleteId(null)}
      />
    </div>
  )
}
