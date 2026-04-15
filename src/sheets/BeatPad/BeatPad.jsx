// Stub — replaced in Group 4
export default function BeatPad({ onClose }) {
  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 300,
      background: 'var(--bg-primary)',
      display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center',
      color: 'var(--text-secondary)', gap: 16,
    }}>
      <p style={{ fontSize: 14 }}>BeatPad — coming in Group 4</p>
      <button
        onClick={onClose}
        style={{
          background: 'var(--bg-action-btn)', border: 'none',
          color: 'var(--text-primary)', padding: '10px 24px',
          borderRadius: 12, fontSize: 14, cursor: 'pointer', fontFamily: 'Inter, sans-serif',
        }}
      >
        Close
      </button>
    </div>
  )
}
