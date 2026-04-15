import styles from './ActionButton.module.css'

export default function ActionButton({ icon, label, onPress, disabled, className }) {
  return (
    <button
      className={`${styles.btn}${className ? ` ${className}` : ''}`}
      onClick={onPress}
      disabled={disabled}
    >
      <span className={styles.icon}>{icon}</span>
      <span className={styles.label}>{label}</span>
    </button>
  )
}
