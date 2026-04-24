import useReveal from '../hooks/useReveal'
import styles from './Pricing.module.css'

const PLANS = [
  {
    tier: 'Starter',
    label: 'SOLO FOUNDERS',
    price: '49',
    desc: 'For solo founders and individuals building their LinkedIn presence.',
    features: [
      '1 LinkedIn account',
      '500 connection requests/mo',
      '3 active campaigns',
      '50 AI content posts/mo',
      'Basic analytics',
      'Email support',
    ],
    cta: 'Get Started',
    ctaStyle: 'outline',
    href: '/signup?plan=starter',
  },
  {
    tier: 'Pro',
    label: 'SALES TEAMS',
    price: '99',
    desc: 'For sales teams scaling outreach and building a strong LinkedIn brand.',
    features: [
      '3 LinkedIn accounts',
      '2,000 connection requests/mo',
      'Unlimited campaigns',
      'Unlimited AI content',
      'CRM integrations',
      'Team inbox',
      'Advanced analytics',
      'Priority support',
    ],
    cta: 'Start Free Trial',
    ctaStyle: 'lime',
    featured: true,
    badge: 'Most Popular',
    href: '/signup?plan=pro',
  },
  {
    tier: 'Agency',
    label: 'AGENCIES',
    price: '249',
    desc: 'For agencies managing multiple clients with white-label needs.',
    features: [
      '10 LinkedIn accounts',
      '10,000 connection requests/mo',
      'White-label dashboard',
      'Client management portal',
      'API access',
      'Custom AI voice training',
      'Dedicated account manager',
    ],
    cta: 'Contact Sales',
    ctaStyle: 'outline',
    href: '/contact',
  },
]

function CheckIcon({ featured }) {
  return (
    <span
      className={styles.checkWrap}
      style={{
        background: featured ? 'rgba(200,240,0,0.18)' : '#eef6c4',
        border: '1.5px solid ' + (featured ? 'rgba(200,240,0,0.5)' : '#b8e000'),
      }}
    >
      <svg width="8" height="7" viewBox="0 0 9 7" fill="none">
        <path
          d="M1 3.5l2 2L8 1"
          stroke={featured ? '#c8f000' : '#5a8a00'}
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </span>
  )
}

export default function Pricing() {
  const ref = useReveal()

  return (
    <section id="pricing" className={styles.section} ref={ref}>
      <div className={styles.header + ' reveal'}>
        <div className="sec-label" style={{ justifyContent: 'center' }}>
          <span className="sec-label-dot" /> Pricing
        </div>
        <div className="big-h" style={{ textAlign: 'center' }}>SIMPLE.</div>
        <div className="big-h lime" style={{ textAlign: 'center' }}>TRANSPARENT.</div>
        <p className={styles.headerSub}>
          No hidden fees. Start free for 14 days. Cancel anytime.
        </p>
      </div>

      <div className={styles.grid}>
        {PLANS.map((plan, i) => (
          <article
            key={plan.tier}
            className={styles.card + (plan.featured ? ' ' + styles.featured : '') + ' reveal reveal-d' + (i + 1)}
          >
            <div className={styles.cardTop}>
              {plan.badge
                ? <div className={styles.badge}>{plan.badge}</div>
                : <div className={styles.badgePlaceholder} />
              }
              <span className={styles.label}>{plan.label}</span>
            </div>

            <div className={styles.tier}>{plan.tier}</div>

            <div className={styles.amount}>
              <span className={styles.dollar}>$</span>
              <span className={styles.price}>{plan.price}</span>
              <div className={styles.priceRight}>
                <span className={styles.mo}>/mo</span>
                <span className={styles.billed}>billed monthly</span>
              </div>
            </div>

            <p className={styles.desc}>{plan.desc}</p>

            <div className={styles.divider} />

            <ul className={styles.features}>
              {plan.features.map((f) => (
                <li key={f}>
                  <CheckIcon featured={plan.featured} />
                  <span>{f}</span>
                </li>
              ))}
            </ul>

            <div className={styles.cardFooter}>
              <p className={styles.noCard}>14-day free trial · No credit card</p>
              <button
                className={styles.btn + ' ' + (plan.ctaStyle === 'lime' ? styles.btnLime : styles.btnOutline)}
                onClick={() => window.location.href = plan.href}
              >
                {plan.cta} →
              </button>
            </div>
          </article>
        ))}
      </div>

      <div className={'reveal reveal-d3 ' + styles.trustStrip}>
        {[
          { icon: '✦', text: '14-day free trial' },
          { icon: '⚡', text: 'Instant account access' },
          { icon: '🔒', text: 'Safe & secure checkout' },
        ].map(({ icon, text }) => (
          <div key={text} className={styles.trustItem}>
            <span className={styles.trustIcon}>{icon}</span>
            <span>{text}</span>
          </div>
        ))}
      </div>
    </section>
  )
}
