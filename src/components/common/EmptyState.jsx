export default function EmptyState({ message, actionLabel, onAction }) {
  return (
    <div className="text-center py-16">
      <p className="text-gray-400 mb-4">{message}</p>
      {actionLabel && (
        <button
          onClick={onAction}
          className="px-4 py-2 text-sm rounded-lg bg-indigo-600 text-white hover:bg-indigo-500"
        >
          {actionLabel}
        </button>
      )}
    </div>
  )
}
