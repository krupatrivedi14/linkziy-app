import useReveal from '../hooks/useReveal'
import styles from './Process.module.css'

const STEPS = [
  { num: '01', title: 'Connect LinkedIn',  desc: 'Secure, one-click setup.' },
  { num: '02', title: 'Pick your goal',   desc: 'Leads, branding, or both.' },
  { num: '03', title: 'Let Linkziy run', desc: 'AI handles outreach and content.' },
  { num: '04', title: 'Track what works',       desc: 'Clear dashboards, no guesswork.' },
]

export default function Process() {
  const ref = useReveal()

  return (
    <section id="process" className={styles.section} ref={ref}>
      <div className={`${styles.header} reveal`}>
        <div className="sec-label" style={{ justifyContent: 'center' }}>
          <span className="sec-label-dot" /> Process
        </div>
        <div className="big-h" style={{ textAlign: 'center' }}>UP IN MINUTES.</div>
        <div className="big-h" style={{ textAlign: 'center' }}>RESULTS IN DAYS.</div>
      </div>

      <div className={styles.grid}>
        {STEPS.map((step, i) => (
          <article key={step.num} className={`${styles.card} reveal reveal-d${i + 1}`}>
            <div className={styles.stepNum}>{step.num}</div>
            <div className={styles.arrow}>→</div>
            <h3 className={styles.title}>{step.title}</h3>
            <p className={styles.desc}>{step.desc}</p>
          </article>
        ))}
      </div>
    </section>
  )
}
