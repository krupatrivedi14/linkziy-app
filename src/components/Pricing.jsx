import { useState } from 'react'
import styles from './Pricing.module.css'

const ADDONS = {
  outreach: [
    { name: 'White Label Reports', desc: 'Agency-focused add-on enabling branded client reporting, and professional performance presentation.', price: '$29/mo' },
    { name: 'Additional Senders +10', desc: 'Adds 10 extra LinkedIn sender accounts for agencies and high-volume outreach operations.', price: '$135/mo' },
    { name: 'Additional Senders +5', desc: 'Adds 5 extra LinkedIn sender accounts for growing teams running multi-account outreach.', price: '$75/mo' },
    { name: 'Additional Sender +1', desc: 'Adds 1 extra LinkedIn sender account to your workspace for expanded outreach capacity.', price: '$17/mo' },
  ],
  scheduling: [
    { name: 'White Label Reports', desc: 'Agency-focused add-on enabling branded client reporting, and professional performance presentation.', price: '$29/mo' },
  ],
  leads: [
    { name: 'White Label Reports', desc: 'Agency-focused add-on enabling branded client reporting, and professional performance presentation.', price: '$29/mo' },
    { name: 'Extra Leads 1000', desc: 'Top-up add-on for 1000 additional verified leads. Best value pack for high-volume prospecting.', price: '$17/mo' },
    { name: 'Extra Leads 500', desc: 'Top-up add-on for 500 additional verified leads. One-time credit pack to scale campaigns instantly.', price: '$11/mo' },
  ],
  ai: [
    { name: 'White Label Reports', desc: 'Agency-focused add-on enabling branded client reporting, and professional performance presentation.', price: '$29/mo' },
  ],
  allInOne: [
    { name: 'White Label Reports', desc: 'Agency-focused add-on enabling branded client reporting, and professional performance presentation.', price: '$29/mo' },
    { name: 'Extra Leads 1000', desc: 'Top-up add-on for 1000 additional verified leads. Best value pack for high-volume prospecting.', price: '$17/mo' },
    { name: 'Extra Leads 500', desc: 'Top-up add-on for 500 additional verified leads. One-time credit pack to scale campaigns instantly.', price: '$11/mo' },
    { name: 'Additional Senders +10', desc: 'Adds 10 extra LinkedIn sender accounts for agencies and high-volume outreach operations.', price: '$135/mo' },
    { name: 'Additional Senders +5', desc: 'Adds 5 extra LinkedIn sender accounts for growing teams running multi-account outreach.', price: '$75/mo' },
    { name: 'Additional Sender +1', desc: 'Adds 1 extra LinkedIn sender account to your workspace for expanded outreach capacity.', price: '$17/mo' },
  ],
}

const SECTIONS = [
  {
    title: 'Outreach',
    subtitle: 'Outreach automation with safe daily actions.',
    addons: ADDONS.outreach,
    plans: [
      {
        name: 'Outreach Starter',
        desc: 'Ideal for solo founders starting LinkedIn outreach with safe daily automation, unlimited sequences, and one sender account.',
        price: '19',
        features: ['1 Sender account', '0 LinkedIn accounts', '0 Leads / month', '0 AI credits / month', '50 Daily actions', 'Up to Unlimited sequences', '1 seat'],
      },
      {
        name: 'Outreach Growth',
        desc: 'Built for growing teams that need higher daily automation capacity, multiple sender accounts, and scalable campaign execution.',
        price: '49',
        featured: true,
        features: ['3 Sender accounts', '0 LinkedIn accounts', '0 Leads / month', '0 AI credits / month', '150 Daily actions', 'Up to Unlimited sequences', '3 seats'],
      },
      {
        name: 'Outreach Agency',
        desc: 'Designed for agencies and high-volume teams managing multi-client outreach with maximum sender capacity and advanced scale limits.',
        price: '149',
        features: ['10 Sender accounts', '0 LinkedIn accounts', '0 Leads / month', '0 AI credits / month', '500 Daily actions', 'Up to Unlimited sequences', '10 seats'],
      },
    ],
  },
  {
    title: 'Scheduling',
    subtitle: 'Schedule and publish from your LinkedIn accounts.',
    addons: ADDONS.scheduling,
    plans: [
      {
        name: 'Scheduling Creator',
        desc: 'Perfect for individual creators to plan, schedule, and publish LinkedIn content consistently from one account.',
        price: '9',
        features: ['0 Sender accounts', '1 LinkedIn account', '0 Leads / month', '0 AI credits / month', '0 Daily actions', 'Up to 0 sequences', '1 seat'],
      },
      {
        name: 'Scheduling Growth',
        desc: 'Best for small teams managing content across multiple LinkedIn accounts with centralized planning and publishing.',
        price: '15',
        featured: true,
        features: ['0 Sender accounts', '3 LinkedIn accounts', '0 Leads / month', '0 AI credits / month', '0 Daily actions', 'Up to 0 sequences', '3 seats'],
      },
      {
        name: 'Scheduling Agency',
        desc: 'Built for agencies handling content operations across many LinkedIn accounts with streamlined scheduling workflows.',
        price: '35',
        features: ['0 Sender accounts', '10 LinkedIn accounts', '0 Leads / month', '0 AI credits / month', '0 Daily actions', 'Up to 0 sequences', '10 seats'],
      },
    ],
  },
  {
    title: 'Leads',
    subtitle: 'Verified leads to feed your campaigns.',
    addons: ADDONS.leads,
    plans: [
      {
        name: 'Leads Basic',
        desc: 'A starter lead package for users who want verified LinkedIn leads each month to power targeted outreach.',
        price: '12',
        features: ['0 Sender accounts', '0 LinkedIn accounts', '300 Leads / month', '0 AI credits / month', '0 Daily actions', 'Up to 0 sequences', '1 seat'],
      },
      {
        name: 'Leads Growth',
        desc: 'For teams requiring a steady lead pipeline with higher monthly lead credits for consistent campaign performance.',
        price: '22',
        featured: true,
        features: ['0 Sender accounts', '0 LinkedIn accounts', '600 Leads / month', '0 AI credits / month', '0 Daily actions', 'Up to 0 sequences', '3 seats'],
      },
      {
        name: 'Leads Pro',
        desc: 'For high-performing sales teams and agencies that need large monthly lead volumes for aggressive growth targets.',
        price: '39',
        features: ['0 Sender accounts', '0 LinkedIn accounts', '1,200 Leads / month', '0 AI credits / month', '0 Daily actions', 'Up to 0 sequences', '10 seats'],
      },
    ],
  },
  {
    title: 'AI',
    subtitle: 'AI credits for content and messaging assistance.',
    addons: ADDONS.ai,
    plans: [
      {
        name: 'AI Starter',
        desc: 'Entry-level AI credits for generating outreach messages, LinkedIn posts, hooks, and content ideas quickly.',
        price: '9',
        features: ['0 Sender accounts', '0 LinkedIn accounts', '0 Leads / month', '100 AI credits / month', '0 Daily actions', 'Up to 0 sequences', '0 seats'],
      },
      {
        name: 'AI Growth',
        desc: 'Expanded AI credit allocation for teams producing regular outreach and content at higher velocity.',
        price: '15',
        featured: true,
        features: ['0 Sender accounts', '0 LinkedIn accounts', '0 Leads / month', '300 AI credits / month', '0 Daily actions', 'Up to 0 sequences', '3 seats'],
      },
      {
        name: 'AI Pro',
        desc: 'High-capacity AI plan for advanced users and agencies creating content and outreach assets at scale.',
        price: '32',
        features: ['0 Sender accounts', '0 LinkedIn accounts', '0 Leads / month', '1,000 AI credits / month', '0 Daily actions', 'Up to 0 sequences', '10 seats'],
      },
    ],
  },
]

const BUNDLE = {
  title: 'All-in-One',
  subtitle: 'One plan for the full Linkziy growth stack.',
  addons: ADDONS.allInOne,
  plan: {
    name: 'Linkziy Pro Suite',
    desc: 'All-in-one bundle combining outreach automation, scheduling, leads, and AI assistance for complete LinkedIn growth operations.',
    price: '59',
    features: ['1 Sender account', '1 LinkedIn account', '600 Leads / month', '300 AI credits / month', '50 Daily actions', 'Up to Unlimited sequences', '1 seat'],
  },
}

function AddonItem({ addon }) {
  const [checked, setChecked] = useState(false)
  return (
    <label className={`${styles.addonItem} ${checked ? styles.addonChecked : ''}`} onClick={() => setChecked(c => !c)}>
      <span className={`${styles.checkbox} ${checked ? styles.checkboxChecked : ''}`}>
        {checked && <svg width="10" height="8" viewBox="0 0 10 8" fill="none"><path d="M1 4L3.5 6.5L9 1" stroke="#050505" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/></svg>}
      </span>
      <span className={styles.addonCopy}>
        <strong>{addon.name}</strong>
        <small>{addon.desc}</small>
      </span>
      <span className={styles.addonPrice}>{addon.price}</span>
    </label>
  )
}

function PlanCard({ plan, addons }) {
  return (
    <article className={`${styles.card} ${plan.featured ? styles.featured : ''}`}>
      <div className={styles.cardContent}>
        <h3 className={styles.planName}>{plan.name}</h3>
        <p className={styles.planDesc}>{plan.desc}</p>

        <div className={styles.priceLine}>
          <span className={styles.price}>${plan.price}</span>
          <span className={styles.month}>/month</span>
        </div>

        <ul className={styles.features}>
          {plan.features.map((f) => (
            <li key={f}>
              <span className={styles.tick}>✓</span>
              <span>{f}</span>
            </li>
          ))}
        </ul>

        <div className={styles.rule} />
        <p className={styles.addonHeading}>+ Optional Add-ons</p>
        <div className={styles.addonList}>
          {addons.map((addon) => (
            <AddonItem addon={addon} key={addon.name} />
          ))}
        </div>
      </div>

      <button
        className={`${styles.upgradeBtn} ${plan.featured ? styles.primaryBtn : ''}`}
        onClick={() => { window.location.href = '/signup' }}
      >
        Upgrade
      </button>
    </article>
  )
}

export default function Pricing() {
  return (
    <section id="pricing" className={styles.pricingPage}>
      {SECTIONS.map((section) => (
        <div className={styles.pricingGroup} key={section.title}>
          <div className={styles.groupHeader}>
            <h2>{section.title}</h2>
            <p>{section.subtitle}</p>
          </div>
          <div className={styles.cardGrid}>
            {section.plans.map((plan) => (
              <PlanCard key={plan.name} plan={plan} addons={section.addons} />
            ))}
          </div>
        </div>
      ))}

      <div className={styles.pricingGroup}>
        <div className={styles.groupHeader}>
          <h2>{BUNDLE.title}</h2>
          <p>{BUNDLE.subtitle}</p>
        </div>
        <div className={styles.bundleGrid}>
          <PlanCard plan={BUNDLE.plan} addons={BUNDLE.addons} />
          <div className={styles.bundleNote}>
            <span className={styles.bestValue}>Best value</span>
            <h3>Everything together, without complicating your stack.</h3>
            <p>
              Use this plan when you want outreach, scheduling, AI, and leads in one simple workspace.
              It keeps the clean Linkziy experience while giving you room to scale.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}