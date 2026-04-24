import { useEffect, useRef } from 'react'
import styles from './Cursor.module.css'

export default function Cursor() {
  const ringRef = useRef(null)
  const dotRef  = useRef(null)

  useEffect(() => {
    const ring = ringRef.current
    const dot  = dotRef.current
    if (!ring || !dot) return

    let mx = 0, my = 0, rx = 0, ry = 0
    let rafId

    const onMove = (e) => {
      mx = e.clientX
      my = e.clientY
      dot.style.left = mx + 'px'
      dot.style.top  = my + 'px'
    }

    const animate = () => {
      rx += (mx - rx) * 0.11
      ry += (my - ry) * 0.11
      ring.style.left = rx + 'px'
      ring.style.top  = ry + 'px'
      rafId = requestAnimationFrame(animate)
    }

    const onEnter = () => { ring.style.opacity = '1'; dot.style.opacity = '1' }
    const onLeave = () => { ring.style.opacity = '0'; dot.style.opacity = '0' }

    document.addEventListener('mousemove', onMove)
    document.addEventListener('mouseenter', onEnter)
    document.addEventListener('mouseleave', onLeave)
    rafId = requestAnimationFrame(animate)

    // Hover expand on interactive elements
    const addHover = () => { ring.classList.add(styles.hov); dot.classList.add(styles.hovDot) }
    const remHover = () => { ring.classList.remove(styles.hov); dot.classList.remove(styles.hovDot) }

    const targets = document.querySelectorAll(
      'a, button, input, textarea, select, [role="gridcell"]'
    )
    targets.forEach(el => {
      el.addEventListener('mouseenter', addHover)
      el.addEventListener('mouseleave', remHover)
    })

    // Re-bind when DOM changes (MutationObserver)
    const mo = new MutationObserver(() => {
      document.querySelectorAll('a, button, input, textarea, select, [role="gridcell"]')
        .forEach(el => {
          el.removeEventListener('mouseenter', addHover)
          el.removeEventListener('mouseleave', remHover)
          el.addEventListener('mouseenter', addHover)
          el.addEventListener('mouseleave', remHover)
        })
    })
    mo.observe(document.body, { childList: true, subtree: true })

    return () => {
      document.removeEventListener('mousemove', onMove)
      document.removeEventListener('mouseenter', onEnter)
      document.removeEventListener('mouseleave', onLeave)
      cancelAnimationFrame(rafId)
      mo.disconnect()
    }
  }, [])

  return (
    <>
      <div ref={ringRef} className={styles.ring} aria-hidden="true" />
      <div ref={dotRef}  className={styles.dot}  aria-hidden="true" />
    </>
  )
}
