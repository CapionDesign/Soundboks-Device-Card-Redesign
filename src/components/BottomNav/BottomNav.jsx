import styles from './BottomNav.module.css'

// Devices tab: bold parallelogram (Soundboks brand mark)
function DevicesIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
      <polygon points="7,4 20,4 17,20 4,20" />
    </svg>
  )
}

// Profile tab: person silhouette outline
function ProfileIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" xmlns="http://www.w3.org/2000/svg">
      <circle cx="12" cy="8" r="4" />
      <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" strokeLinecap="round" />
    </svg>
  )
}

export default function BottomNav({ activeTab = 'devices' }) {
  return (
    <nav className={styles.nav}>
      <button className={`${styles.tab} ${activeTab === 'devices' ? styles.active : ''}`}>
        <DevicesIcon />
        Devices
      </button>
      <button className={`${styles.tab} ${activeTab === 'profile' ? styles.active : ''}`}>
        <ProfileIcon />
        Profile
      </button>
    </nav>
  )
}
