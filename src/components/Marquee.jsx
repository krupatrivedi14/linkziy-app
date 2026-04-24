import styles from './Marquee.module.css'

const items = [
  'LINKEDIN OUTREACH',
  'AI CONTENT GENERATION',
  'SMART SEQUENCES',
  'WHITE LABEL AGENCY',
  'CRM INTEGRATION',
  'VIRAL HOOK GENERATOR',
  'LINKEDIN SAFE AUTOMATION',
]

export default function Marquee() {
  const loopItems = [...items, ...items]

  return (
    <div className={styles.marqueeWrap}>
      <div className={styles.marqueeTrack}>
        {loopItems.map((item, index) => (
          <div key={index} className={styles.marqueeItem}>
            <span className={styles.star}>✦</span>
            <span>{item}</span>
          </div>
        ))}
      </div>
    </div>
  )
}