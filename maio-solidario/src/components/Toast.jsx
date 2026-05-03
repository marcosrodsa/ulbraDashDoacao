import { useEffect } from 'react'
import '../styles/toast.css'

export default function Toast({ type, message, onClose, duration = 5000 }) {
  useEffect(() => {
    if (!message) return
    const timer = setTimeout(onClose, duration)
    return () => clearTimeout(timer)
  }, [message, duration, onClose])

  if (!message) return null

  const icon = type === 'success' ? '✓' : '✕'

  return (
    <div className={`toast toast-${type}`}>
      <div className="toast-content">
        <span className="toast-icon">{icon}</span>
        <span className="toast-message">{message}</span>
      </div>
      <button className="toast-close" onClick={onClose}>
        ✕
      </button>
    </div>
  )
}
