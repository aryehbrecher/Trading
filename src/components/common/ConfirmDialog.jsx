import Modal from './Modal'

export default function ConfirmDialog({ isOpen, onConfirm, onCancel, message }) {
  return (
    <Modal isOpen={isOpen} onClose={onCancel} title="Confirm">
      <p className="text-gray-300 mb-6">{message}</p>
      <div className="flex justify-end gap-3">
        <button
          onClick={onCancel}
          className="px-4 py-2 text-sm rounded-lg bg-gray-700 text-gray-200 hover:bg-gray-600"
        >
          Cancel
        </button>
        <button
          onClick={onConfirm}
          className="px-4 py-2 text-sm rounded-lg bg-red-600 text-white hover:bg-red-500"
        >
          Delete
        </button>
      </div>
    </Modal>
  )
}
