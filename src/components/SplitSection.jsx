import useReveal from '../hooks/useReveal'
import styles from './SplitSection.module.css'

const OUTREACH_ITEMS = [
  'Book qualified calls from LinkedIn every week.',
  'Cut outreach from hours to minutes a day.',
  'Post weekly without staring at a blank page.',
  'Turn LinkedIn into lead-gen, not a time sink.',
  ]

const CONTENT_ITEMS = [
  'Founders : Closing your first 100 customers ',
  'Sales teams : Hitting quota every month',
  'Freelancers : Landing premium clients',
  'Recruiters : Sourcing top talent faster',
  'Agencies : Scaling client delivery',
]

export default function SplitSection() {
  const ref = useReveal()

  return (
    <div id="split" className={styles.wrap} ref={ref}>
      {/* Left — Outreach */}
      <div className={`${styles.left} reveal`}>
        <div className={styles.tagOut}>🚀 Outreach</div>
        <h2 className={styles.heading}>OUTCOMES.<br />What changes when you use Linkziy.</h2>
        <p className={styles.desc}>
          The results you actually care about.
          
        </p>
        <ul className={styles.list}>
          {OUTREACH_ITEMS.map((item) => (
            <li key={item}><span className={styles.check}>✓</span>{item}</li>
          ))}
        </ul>
        <a href="/features/outreach" className={styles.link}>Explore Outreach Features →</a>
        <div className={styles.bgNum} aria-hidden="true">01</div>
      </div>

      {/* Right — Content */}
      <div className={`${styles.right} reveal`}>
        <div className={styles.tagCont}>✨ Content</div>
        <h2 className={styles.headingLight}>BUILT FOR<br />PEOPLE WHO SCALE.</h2>
        <p className={styles.descLight}>
          Whoever lives in LinkedIn DMs
        </p>
        <ul className={styles.listLight}>
          {CONTENT_ITEMS.map((item) => (
            <li key={item}><span className={styles.check}>✓</span>{item}</li>
          ))}
        </ul>
        <a href="/features/content" className={styles.linkLight}>Explore Content Features →</a>
        <div className={styles.bgNum} aria-hidden="true">02</div>
      </div>
    </div>
  )
}
