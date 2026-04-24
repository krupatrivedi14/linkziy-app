import { useEffect, useRef } from 'react'
import styles from './Hero.module.css'

/* ── Orbital rings background ── */
function OrbitRings() {
  return (
    <div className={styles.orbitWrap} aria-hidden="true">
      {/* Three concentric rings */}
      <div className={`${styles.orbitRing} ${styles.ring1}`} />
      <div className={`${styles.orbitRing} ${styles.ring2}`} />
      <div className={`${styles.orbitRing} ${styles.ring3}`} />

      {/* Spinning arm 1 — outline dot (outer ring) */}
      <div className={`${styles.orbitArm} ${styles.arm1}`}>
        <div className={`${styles.orbitDot} ${styles.dotOutline}`} />
      </div>

      {/* Spinning arm 2 — lime dot (middle ring) */}
      <div className={`${styles.orbitArm} ${styles.arm2}`}>
        <div className={`${styles.orbitDot} ${styles.dotLime}`} />
      </div>

      {/* Spinning arm 3 — small outline dot (inner ring) */}
      <div className={`${styles.orbitArm} ${styles.arm3}`}>
        <div className={`${styles.orbitDot} ${styles.dotOutline}`} />
      </div>

      {/* Static floating blobs */}
      <div className={`${styles.blob} ${styles.blob1}`} />
      <div className={`${styles.blob} ${styles.blob2}`} />
    </div>
  )
}

/* ── Stats strip ── */
const STATS = [
  { value: '2,4', suffix: 'K+', label: 'Active Users' },
  { value: '41',  suffix: '%',  label: 'Avg Accept Rate' },
  { value: '80',  suffix: 'K',  label: 'Monthly Impressions' },
  { value: '14',  suffix: 'D',  label: 'Free Trial' },
]

export default function Hero() {
  const sectionRef = useRef(null)

  /* Trigger reveal on mount */
  useEffect(() => {
    const els = sectionRef.current?.querySelectorAll('.reveal')
    const timer = setTimeout(() => {
      els?.forEach((el) => el.classList.add('visible'))
    }, 80)
    return () => clearTimeout(timer)
  }, [])

  return (
    <section id="hero" className={styles.hero} ref={sectionRef}>
      {/* Grid background */}
      <div className={styles.grid} aria-hidden="true" />

      {/* Orbital rings — right side */}
      <OrbitRings />

      {/* ── Badge row ── */}
      <div className={`${styles.badgeRow} reveal`}>
        <span className={styles.badge}>Now live</span>
        <span className={styles.badgeTxt}>AI-powered LinkedIn growth</span>
      </div>

      {/* ── Main headline ── */}
      {/*
        Screenshot analysis:
        Line 1 "OUTREACH." — OUTLINED (hollow text, -webkit-text-stroke)
        Line 2 "CONTENT."  — SOLID black, bold
        Line 3 "LINKED."   — Solid lime green
      */}
      <h1 className={`${styles.headline} reveal reveal-d1`}>
        <span className={styles.lineOutline}>Turn LinkedIn.</span>
        <span className={styles.lineSolid}>into your.</span>
        <span className={styles.lineLime}>#1 pipeline —</span>
      </h1>

      {/* Dashed separator line */}
      <div className={`${styles.dash} reveal reveal-d2`} aria-hidden="true" />

      {/* ── Description + CTAs ── */}
      {/* ── Description + CTAs ── */}
<div className={`${styles.row} reveal reveal-d2`}>
  <p className={styles.desc}>
    Linkziy finds qualified leads, runs personalized outreach, and 
    grows your personal brand — so you book more meetings without 
    spending your day on LinkedIn.
  </p>

  <div className={styles.ctas}>
    
    {/* Primary CTA */}
    <button
      className={styles.btnCta}
      onClick={() => window.location.href = '/signup'}
    >
      <span className={styles.arrow}>→</span>
      Start Free Trial
    </button>

    {/* 🔥 Updated Watch Demo */}
    <button
  className={styles.btnGhost}
  onClick={() => window.location.href = '/demo'}
>
  Watch Demo
</button>

  </div>
</div>

      {/* ── Stats strip ── */}
      <div className={`${styles.statsStrip} reveal reveal-d3`} role="list">
        {STATS.map(({ value, suffix, label }) => (
          <div key={label} className={styles.stat} role="listitem">
            <div className={styles.statVal}>
              {value}<em>{suffix}</em>
            </div>
            <div className={styles.statLbl}>{label}</div>
          </div>
        ))}
      </div>
    </section>
  )
}
