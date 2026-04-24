import { useEffect, useRef, useState } from 'react'
import useReveal from '../hooks/useReveal'
import styles from './Features.module.css'

/* ── Mini calendar for card 06 ── */
function MiniCal() {
  const today      = new Date()
  const t          = today.getDate()
  const firstDay   = (new Date(today.getFullYear(), today.getMonth(), 1).getDay() + 6) % 7
  const daysInMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0).getDate()
  const highlights = [2, 5, 8, 9, 12, 15, 16, 19, 22, 23, 26]
  const days = []
  for (let i = 0; i < firstDay; i++) days.push({ n: null })
  for (let d = 1; d <= daysInMonth; d++) {
    days.push({ n: d, today: d === t, active: highlights.includes(d) })
  }
  return (
    <div className={styles.miniCal}>
      <div className={styles.calNames}>
        {['M','T','W','T','F','S','S'].map((d, i) => (
          <div key={i} className={styles.calDn}>{d}</div>
        ))}
      </div>
      <div className={styles.calGrid}>
        {days.map((d, i) => (
          <div
            key={i}
            className={`${styles.calD} ${d.today ? styles.calToday : ''} ${d.active && !d.today ? styles.calActive : ''}`}
          >
            {d.n}
          </div>
        ))}
      </div>
    </div>
  )
}

/* ── Animated donut SVG ── */
function Donut({ pct = 82 }) {
  const r     = 40
  const circ  = 2 * Math.PI * r
  const circRef = useRef(null)

  useEffect(() => {
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && circRef.current) {
        circRef.current.style.strokeDasharray = `${(pct / 100) * circ} ${circ}`
      }
    }, { threshold: 0.3 })
    if (circRef.current) obs.observe(circRef.current)
    return () => obs.disconnect()
  }, [pct, circ])

  return (
    <div className={styles.donutWrap}>
      <svg className={styles.donut} width="110" height="110" viewBox="0 0 110 110">
        <circle className={styles.donutTrack} cx="55" cy="55" r={r} />
        <circle
          ref={circRef}
          className={styles.donutProg}
          cx="55" cy="55" r={r}
          transform="rotate(-90 55 55)"
          style={{ strokeDasharray: '0 251' }}
        />
        <text x="55" y="52" textAnchor="middle" fontFamily="Bebas Neue,sans-serif" fontSize="16" fill="#0a0a0a">SAFE</text>
        <text x="55" y="66" textAnchor="middle" fontFamily="Barlow,sans-serif" fontSize="10" fill="#888" fontWeight="700">100%</text>
      </svg>
    </div>
  )
}

/* ── Animated progress bar ── */
function Bar({ label, pct }) {
  const fillRef = useRef(null)

  useEffect(() => {
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && fillRef.current) {
        fillRef.current.style.width = pct + '%'
      }
    }, { threshold: 0.3 })
    if (fillRef.current) obs.observe(fillRef.current)
    return () => obs.disconnect()
  }, [pct])

  return (
    <div className={styles.barRow}>
      <span className={styles.barLbl}>{label}</span>
      <div className={styles.barTrack}>
        <div ref={fillRef} className={styles.barFill} style={{ width: 0 }} />
      </div>
      <span className={styles.barPct}>{pct}%</span>
    </div>
  )
}

/* ── Feature card data ── */
const CARDS = [
  {
    num: '01',
    icon: '🎯',
    iconBg: 'lime',
    title: 'Smart Outreach Campaigns',
    desc: 'Personalized connection requests, follow-ups, and InMails — without getting flagged.',
    extra: 'bars',
  },
  {
    num: '02',
    icon: '🛡️',
    iconBg: 'dark',
    title: 'LinkedIn-Safe Automation',
    desc: 'Human-like delays, rate limiting, and randomized patterns. Your account stays protected.',
    extra: 'donut',
  },
  {
    num: '03',
    icon: '📊',
    iconBg: 'dark',
    title: 'Daily growth plan',
    desc: 'Open the app, get your 15-minute LinkedIn checklist. Done.',
    extra: 'live',
  },
  {
    num: '04',
    icon: '🔁',
    iconBg: 'dark',
    title: 'Personalization at Scale',
    desc: 'AI icebreakers from live profile data. Every message feels hand-written.',
    extra: 'bignum',
  },
  {
    num: '05',
    icon: '✍️',
    iconBg: 'lime',
    title: 'White-label reports',
    desc: 'Send clients polished LinkedIn growth reports with your logo — not ours.',
    extra: 'quote',
    limeCard: true,
  },
  {
    num: '06',
    icon: '🗓️',
    iconBg: 'dark',
    title: 'Content Scheduler',
    desc: 'Generate posts in your voice and schedule a full month in under 10 minutes.',
    extra: 'calendar',
  },
]

export default function Features() {
  const ref = useReveal()

  return (
    <section id="features" className={styles.section} ref={ref}>
      {/* Header */}
      <div className={`${styles.header} reveal`}>
        <div>
          <div className="big-h">FEATURES.</div>
          <div className="big-h outline">Everything you need to win on LinkedIn.</div>
        </div>
        <p className={styles.headerSub}>
          One platform replaces your outreach tool, post scheduler, and reporting spreadsheet.
        </p>
      </div>

      {/* Grid */}
      <div className={styles.grid}>
        {CARDS.map((card, i) => (
          <article
            key={card.num}
            className={`${styles.card} ${card.limeCard ? styles.limeCard : ''} reveal reveal-d${(i % 3) + 1}`}
          >
            <span className={styles.cardNum} aria-hidden="true">{card.num}</span>
            <div className={`${styles.cardIcon} ${card.iconBg === 'lime' ? styles.iconLime : styles.iconDark}`}>
              {card.icon}
            </div>
            <h3 className={styles.cardTitle}>{card.title}</h3>
            <p className={styles.cardDesc}>{card.desc}</p>

            {/* Card-specific extras */}
            {card.extra === 'bars' && (
              <>
                <Bar label="SaaS Founders" pct={78} />
                <Bar label="CTO Europe"    pct={61} />
                <Bar label="Investors US"  pct={44} />
              </>
            )}
            {card.extra === 'donut' && <Donut pct={82} />}
            {card.extra === 'live' && (
              <div className={styles.liveBadge}>
                <span className={styles.liveDot} />
                Live data, always fresh
              </div>
            )}
            {card.extra === 'bignum' && (
              <>
                <div className={styles.bigNum}>100%</div>
                <div className={styles.bigLbl}>Personalised Messages</div>
              </>
            )}
            {card.extra === 'quote' && (
              <blockquote className={styles.quote}>
                "Everyone said cold outreach was dead. They were wrong.
                It fails when it's generic — not when it's cold."
              </blockquote>
            )}
            {card.extra === 'calendar' && <MiniCal />}
          </article>
        ))}
      </div>
    </section>
  )
}
