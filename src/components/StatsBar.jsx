import useReveal from '../hooks/useReveal'
import styles from './StatsBar.module.css'

const STATS = [
  { val: '2,4', suffix: '00+', label: 'Teams Growing\nWith Linkziy' },
  { val: '41',  suffix: '%',   label: 'Average Connection\nAccept Rate' },
  { val: '24',  suffix: '%',   label: 'Average Message\nReply Rate' },
  { val: '80',  suffix: 'K',   label: 'Monthly Post\nImpressions Avg.' },
  { val: '2',   suffix: 'D',   label: 'Average Time\nTo First Reply' },
]

export default function StatsBar() {
  const ref = useReveal()

  return (
    <div id="stats" className={styles.bar} ref={ref}>
      <div className={`${styles.grid} reveal`} role="list">
        {STATS.map(({ val, suffix, label }) => (
          <div key={label} className={styles.item} role="listitem">
            <div className={styles.val}>
              {val}<em>{suffix}</em>
            </div>
            <div className={styles.lbl}>
              {label.split('\n').map((line, i) => (
                <span key={i}>{line}<br /></span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
