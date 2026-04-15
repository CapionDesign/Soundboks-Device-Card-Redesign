import { useRef } from 'react'
import styles from './HeroArea.module.css'
import { palettes } from '../../data/palettes'

// TODO: replace with assets/sun-icon.svg
function SunIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
      <circle cx="12" cy="12" r="4" />
      <line x1="12" y1="2"  x2="12" y2="5" />
      <line x1="12" y1="19" x2="12" y2="22" />
      <line x1="2"  y1="12" x2="5"  y2="12" />
      <line x1="19" y1="12" x2="22" y2="12" />
      <line x1="4.9"  y1="4.9"  x2="7.1"  y2="7.1" />
      <line x1="16.9" y1="16.9" x2="19.1" y2="19.1" />
      <line x1="4.9"  y1="19.1" x2="7.1"  y2="16.9" />
      <line x1="16.9" y1="7.1"  x2="19.1" y2="4.9" />
    </svg>
  )
}

// TODO: replace with assets/speaker-hero-icon.svg
function SpeakerHeroIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" fill="rgba(255,255,255,0.15)" />
      <path d="M15.5 8.5a5 5 0 0 1 0 7" />
      <path d="M19 5a9 9 0 0 1 0 14" />
    </svg>
  )
}

export default function HeroArea({ device, features, onLevelChange }) {
  const palette    = palettes[device.paletteId ?? 0]
  const level      = device.level ?? 0
  const sliderRef  = useRef(null)
  const isDragging = useRef(false)

  // Soundboks: 0–11 · Lightboks: 0–10
  const maxLevel   = features.hasVolume ? 11 : 10
  const fillPct    = (level / maxLevel) * 100

  const fillStyle = features.hasColorPalette
    ? { background: `linear-gradient(to right, ${palette.colors[0]}, ${palette.colors[1]}, ${palette.colors[2]})` }
    : { background: 'var(--accent-red)' }

  function levelFromClientX(clientX) {
    const rect = sliderRef.current.getBoundingClientRect()
    const x    = Math.max(0, Math.min(clientX - rect.left, rect.width))
    return Math.round((x / rect.width) * maxLevel)
  }

  function handlePointerDown(e) {
    e.currentTarget.setPointerCapture(e.pointerId)
    isDragging.current = true
    onLevelChange(levelFromClientX(e.clientX))
  }

  function handlePointerMove(e) {
    if (!isDragging.current) return
    onLevelChange(levelFromClientX(e.clientX))
  }

  function handlePointerUp() {
    isDragging.current = false
  }

  return (
    <div
      ref={sliderRef}
      className={styles.slider}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerUp}
      role="slider"
      aria-valuenow={level}
      aria-valuemin={0}
      aria-valuemax={maxLevel}
      aria-label={features.hasVolume ? 'Volume' : 'Brightness'}
    >
      {/* Coloured fill — width driven by level */}
      <div className={styles.fill} style={{ ...fillStyle, width: `${fillPct}%` }} />

      {/* Product icon — always left */}
      <div className={styles.iconLeft}>
        {features.hasColorPalette ? <SunIcon /> : <SpeakerHeroIcon />}
      </div>

      {/* Level number — always right */}
      <span className={styles.levelNumber}>{level}</span>
    </div>
  )
}
