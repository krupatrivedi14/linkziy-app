import { useEffect, useRef } from 'react'

/**
 * useReveal — adds .visible class to elements with .reveal
 * inside the observed container when they enter the viewport.
 */
export default function useReveal(threshold = 0.15) {
  const ref = useRef(null)

  useEffect(() => {
    const container = ref.current
    if (!container) return

    const targets = container.querySelectorAll('.reveal')
    if (!targets.length) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible')
            // Animate progress bars
            entry.target.querySelectorAll('[data-bar-w]').forEach((bar) => {
              bar.style.width = bar.dataset.barW + '%'
            })
          }
        })
      },
      { threshold }
    )

    targets.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [threshold])

  return ref
}
