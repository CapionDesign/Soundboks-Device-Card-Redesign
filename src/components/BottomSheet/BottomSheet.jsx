import { useState, useEffect } from 'react'
import styles from './BottomSheet.module.css'

export default function BottomSheet({ visible, onClose, title, children }) {
  const [mounted, setMounted] = useState(visible)
  const [show, setShow] = useState(false)

  useEffect(() => {
    if (visible) {
      setMounted(true)
      const raf = requestAnimationFrame(() => setShow(true))
      return () => cancelAnimationFrame(raf)
    } else {
      setShow(false)
      const t = setTimeout(() => setMounted(false), 300)
      return () => clearTimeout(t)
    }
  }, [visible])

  if (!mounted) return null

  return (
    <div className={`${styles.overlay} ${show ? styles.visible : ''}`}>
      <div className={styles.backdrop} onClick={onClose} />
      <div className={styles.sheet}>
        <div className={styles.handle} />
        {title && <div className={styles.header}>{title}</div>}
        <div className={styles.content}>{children}</div>
      </div>
    </div>
  )
}
