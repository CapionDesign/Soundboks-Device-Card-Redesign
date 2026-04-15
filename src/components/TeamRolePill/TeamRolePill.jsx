import styles from './TeamRolePill.module.css'

export default function TeamRolePill({ role }) {
  const label = role ? role.charAt(0).toUpperCase() + role.slice(1) : 'Solo'
  return <span className={styles.pill}>{label}</span>
}
