import styles from './FirmwareBanner.module.css'

function InfoIcon() {
  return (
    // TODO: replace with assets/info-icon.svg
    <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
      <circle cx="10" cy="10" r="8" />
      <line x1="10" y1="9" x2="10" y2="14" />
      <circle cx="10" cy="6.5" r="0.75" fill="currentColor" stroke="none" />
    </svg>
  )
}

export default function FirmwareBanner() {
  return (
    <div className={styles.banner}>
      <div className={styles.left}>
        <InfoIcon />
        <span>New firmware upgrade available</span>
      </div>
      <button
        className={styles.upgrade}
        onClick={() => alert('Firmware upgrade — coming soon')}
      >
        Upgrade
      </button>
    </div>
  )
}
