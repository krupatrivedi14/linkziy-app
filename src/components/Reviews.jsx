import useReveal from '../hooks/useReveal'
import styles from './Reviews.module.css'

const REVIEWS = [
  {
    initials: 'MR',
    name: 'Marcus Reynolds',
    role: 'Head of Growth · Nexus Labs',
    text: '"Linkziy replaced HeyReach, Superpen, and Buffer for us. We went from 3 tools to 1, and our reply rate went from 8% to 24% in just 6 weeks. The ROI was immediate."',
  },
  {
    initials: 'SK',
    name: 'Sara Kim',
    role: 'Founder · ProductHive',
    text: '"The AI content writer sounds exactly like me. LinkedIn impressions went from 2K to 80K per month in 90 days. I now get 10+ inbound DMs every single week."',
  },
  {
    initials: 'JT',
    name: 'James Tran',
    role: 'Founder · LeadGen Agency',
    text: '"Running campaigns for 8 clients simultaneously. White-label dashboard is spotless, automation is bulletproof, and support responds in under 2 hours."',
  },
]

export default function Reviews() {
  const ref = useReveal()

  return (
    <section id="reviews" className={styles.section} ref={ref}>
      <div className={`${styles.header} reveal`}>
        <div className="sec-label">
          <span className="sec-label-dot" /> Reviews
        </div>
        <div className="big-h">REAL</div>
        <div className="big-h outline">RESULTS.</div>
      </div>

      <div className={styles.grid}>
        {REVIEWS.map((r, i) => (
          <article
            key={r.name}
            className={`${styles.card} reveal reveal-d${i + 1}`}
            aria-label={`Review by ${r.name}`}
          >
            <div className={styles.stars} aria-label="5 stars">
              {[...Array(5)].map((_, j) => (
                <span key={j} className={styles.star} aria-hidden="true">✦</span>
              ))}
            </div>
            <blockquote className={styles.text}>{r.text}</blockquote>
            <div className={styles.author}>
              <div className={styles.avatar} aria-hidden="true">{r.initials}</div>
              <div>
                <div className={styles.name}>{r.name}</div>
                <div className={styles.role}>{r.role}</div>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
