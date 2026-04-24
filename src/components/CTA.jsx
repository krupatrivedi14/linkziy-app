import useReveal from '../hooks/useReveal'
import styles from './CTA.module.css'

export default function CTA() {
  const ref = useReveal()

  return (
    <section id="cta" className={styles.section} ref={ref}>
      <div className={styles.glow} aria-hidden="true" />
      <div className={styles.label}>
        <span className="sec-label-dot" /> Ready to grow?
      </div>
      <div className={`${styles.h1} reveal`}>START TODAY.</div>
      <div className={`${styles.h2} reveal`}>RESULTS BY NEXT WEEK.</div>
      <div className={`${styles.btns} reveal reveal-d1`}>
        <button
          className={styles.btnCta}
          onClick={() => window.location.href = '/signup'}
        >
          → Start Free Trial
        </button>
        <button
          className={styles.btnOutline}
          onClick={() => window.location.href = '/demo'}
        >
          Book a Demo
        </button>
      </div>
      <p className={styles.fine}>14-day free trial · No credit card · Cancel anytime</p>
    </section>
  )
}
