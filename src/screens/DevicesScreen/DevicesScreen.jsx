import styles from './DevicesScreen.module.css'
import { useDevices } from '../../context/DeviceContext'
import DeviceCard from '../../components/DeviceCard/DeviceCard'

function PlusIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
      <line x1="12" y1="5" x2="12" y2="19" />
      <line x1="5" y1="12" x2="19" y2="12" />
    </svg>
  )
}

export default function DevicesScreen() {
  const { devices } = useDevices()

  return (
    <div className={styles.screen}>
      <header className={styles.header}>
        <h1 className={styles.title}>Devices</h1>
        <button
          className={styles.addBtn}
          onClick={() => alert('Connect device — coming soon')}
          aria-label="Connect device"
        >
          <PlusIcon />
        </button>
      </header>

      <div className={styles.cardList}>
        {devices.map(device => (
          <DeviceCard key={device.id} device={device} />
        ))}
      </div>
    </div>
  )
}
