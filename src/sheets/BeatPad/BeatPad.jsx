import { useState, useCallback } from 'react'

const EFFECTS = ['Strobe', 'Sparkle', 'Chase', 'Blackout']

function CloseIcon() {
  return (
    <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  )
}

function BeatPadButton({ label, active, onActivate, onDeactivate }) {
  const handleStart = useCallback((e) => {
    e.preventDefault()
    onActivate(label)
  }, [label, onActivate])

  const handleEnd = useCallback((e) => {
    e.preventDefault()
    onDeactivate()
  }, [onDeactivate])

  return (
    <button
      onMouseDown={handleStart}
      onMouseUp={handleEnd}
      onMouseLeave={handleEnd}
      onTouchStart={handleStart}
      onTouchEnd={handleEnd}
      onTouchCancel={handleEnd}
      style={{
        background: active ? '#ffffff' : 'var(--bg-card)',
        color: active ? '#000000' : 'var(--text-primary)',
        border: 'none',
        borderRadius: 16,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 6,
        cursor: 'pointer',
        touchAction: 'manipulation',
        WebkitTapHighlightColor: 'transparent',
        transition: 'background-color 80ms',
        fontFamily: 'Inter, sans-serif',
        userSelect: 'none',
        WebkitUserSelect: 'none',
      }}
    >
      <span style={{ fontSize: 18, fontWeight: 600, lineHeight: 1 }}>{label}</span>
      <span style={{
        fontSize: 12,
        color: active ? 'rgba(0,0,0,0.5)' : 'var(--text-secondary)',
        transition: 'color 80ms',
        lineHeight: 1,
      }}>
        Hold to activate
      </span>
    </button>
  )
}

export default function BeatPad({ onClose }) {
  const [activeEffect, setActiveEffect] = useState(null)

  const handleActivate = useCallback((label) => setActiveEffect(label), [])
  const handleDeactivate = useCallback(() => setActiveEffect(null), [])

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      zIndex: 300,
      background: 'var(--bg-primary)',
      display: 'flex',
      flexDirection: 'column',
      paddingTop: 'env(safe-area-inset-top)',
      paddingBottom: 'env(safe-area-inset-bottom)',
    }}>
      {/* Header */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        padding: '12px 16px',
        flexShrink: 0,
      }}>
        <button
          onClick={onClose}
          style={{
            background: 'none',
            border: 'none',
            color: 'var(--text-primary)',
            padding: 8,
            cursor: 'pointer',
            touchAction: 'manipulation',
            WebkitTapHighlightColor: 'transparent',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 8,
            marginLeft: -8,
          }}
          aria-label="Close BeatPad"
        >
          <CloseIcon />
        </button>
        <span style={{
          fontSize: 17,
          fontWeight: 600,
          fontFamily: 'Inter, sans-serif',
          color: 'var(--text-primary)',
          marginLeft: 8,
        }}>
          BeatPad
        </span>
      </div>

      {/* 2×2 Grid */}
      <div style={{
        flex: 1,
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gridTemplateRows: '1fr 1fr',
        gap: 12,
        padding: '8px 16px 16px',
      }}>
        {EFFECTS.map((label) => (
          <BeatPadButton
            key={label}
            label={label}
            active={activeEffect === label}
            onActivate={handleActivate}
            onDeactivate={handleDeactivate}
          />
        ))}
      </div>
    </div>
  )
}
