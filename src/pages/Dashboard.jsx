import { useState, useMemo } from 'react'
import Logo from '../components/Logo'
import { Link } from 'react-router-dom'
import PageHeader from "../components/PageHeader"

function getUser() {
  try {
    const raw = sessionStorage.getItem('lz_user')
    if (raw) return JSON.parse(raw)
  } catch (_) {}
  return { name: 'User', email: 'user@linkziy.com', company: '' }
}

function initials(name = '') {
  return name.trim().split(/\s+/).map(w => w[0]?.toUpperCase() || '').slice(0, 2).join('')
}
function firstName(name = '') {
  return name.trim().split(/\s+/)[0] || name
}

const TOUR_SLIDES = [
  { tag: 'PROSPECTS', title: 'IMPORT, CLEAN, AND MANAGE YOUR LEADS', desc: 'Bring prospects into Linkziy, keep lists organized, and prepare them for sequences, without messy data.', bullets: ['Import prospects into lists', 'Detect duplicates & keep data clean', 'Bulk-assign to sequences'], cta: 'Go to Prospects', ctaView: 'prospects' },
  { tag: 'SEQUENCES', title: 'AUTOMATE YOUR OUTREACH SEQUENCES', desc: 'Build multi-step campaigns with connection requests, messages, and timed follow-ups — all automated.', bullets: ['Drag & drop sequence builder', 'Smart personalization tokens', 'Auto-schedule based on daily limits'], cta: 'Go to Sequences', ctaView: 'campaigns' },
  { tag: 'ANALYTICS', title: 'TRACK EVERY TOUCHPOINT IN REAL TIME', desc: 'Real-time dashboards for your active sequences — monitor replies, engagement, and daily action usage.', bullets: ['Live sequence monitoring', 'Engagement rate tracking', 'Daily action usage meter'], cta: 'View Analytics', ctaView: 'workspace_analytics' },
  { tag: 'CONTENT', title: 'GENERATE & SCHEDULE LINKEDIN POSTS', desc: 'Write in your voice, schedule a full month of content, and track what drives engagement.', bullets: ['AI post generation in your tone', 'Content calendar & scheduler', 'Post analytics dashboard'], cta: 'Explore Content', ctaView: null },
]

const WELCOME_STEPS = [
  { title: 'Welcome to your Dashboard', desc: 'This page is your control center for outreach. It brings together live LinkedIn metrics, campaign status, limits, and your top prospects.' },
  { title: 'Check LinkedIn Outreach', desc: 'Track messages sent, replies received, and your response rate in the live outreach banner.' },
  { title: 'Review Your Profile', desc: 'Confirm your workspace name, profile details, and LinkedIn-style identity card.' },
  { title: 'Monitor Performance', desc: 'Use the performance cards to understand requests, replies, campaigns, and daily actions.' },
  { title: 'Follow the Trend Chart', desc: 'See request patterns over time so you can understand consistency and growth.' },
  { title: 'Watch Quotas Safely', desc: 'Stay inside safe daily limits for connections, messages, profile visits, and engagement.' },
  { title: 'Customize Widgets', desc: 'Show or hide dashboard widgets based on the information you care about most.' },
  { title: 'Explore Workspace Tools', desc: 'Use the sidebar to open prospects, sequences, analytics, safety, settings, and pricing.' },
]

// SVG path data for icons
const IC = {
  dash:      'M3 3h7v7H3z M14 3h7v7h-7z M3 14h7v7H3z M14 14h7v7h-7z',
  inbox:     'M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z M22 6l-10 7L2 6',
  prospects: 'M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2 M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8',
  seqs:      'M22 2 11 13 M22 2l-7 20-4-9-9-4 20-7z',
  cmpAnl:    'M22 12h-4l-3 9L9 3l-3 9H2',
  profMgr:   'M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2 M12 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8',
  postGen:   'M12 20h9 M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4 12.5-12.5z',
  upcoming:  'M8 6h13 M8 12h13 M8 18h13 M3 6h.01 M3 12h.01 M3 18h.01',
  postAnl:   'M18 20V10 M12 20V4 M6 20v-6',
  analytics: 'M3 3v18h18 M8 17V9 M13 17V5 M18 17v-7',
  safety:    'M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z',
  audit:     'M9 12h6 M9 16h4 M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z M14 2v6h6',
  settings:  'M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6z M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z',
  pricing:   'M12 1v22 M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6',
  bell:      'M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9 M13.73 21a2 2 0 0 1-3.46 0',
  chevD:     'M6 9l6 6 6-6',
  send:      'M22 2 11 13 M22 2l-7 20-4-9-9-4 20-7z',
  msg:       'M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z',
  trend:     'M23 6l-9.5 9.5-5-5L1 18 M17 6h6v6',
  star:      'M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z',
  target:    'M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z M12 18a6 6 0 1 0 0-12 6 6 0 0 0 0 12z M12 14a2 2 0 1 0 0-4 2 2 0 0 0 0 4z',
  zap:       'M13 2L3 14h9l-1 8 10-12h-9l1-8z',
  cal:       'M8 2v4 M16 2v4 M3 8h18 M3 4a1 1 0 0 0-1 1v14a1 1 0 0 0 1 1h18a1 1 0 0 0 1-1V5a1 1 0 0 0-1-1H3z',
  users2:    'M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2 M23 21v-2a4 4 0 0 0-3-3.87 M16 3.13a4 4 0 0 1 0 7.75',
  eye:       'M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z M12 9a3 3 0 1 0 0 6 3 3 0 0 0 0-6z',
  lock:      'M19 11H5a2 2 0 0 0-2 2v7a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7a2 2 0 0 0-2-2z M7 11V7a5 5 0 0 1 10 0v4',
  refresh:   'M23 4v6h-6 M1 20v-6h6 M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15',
  clock:     'M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z M12 6v6l4 2',
  thumbUp:   'M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3H14z M7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3',
  filter:    'M22 3H2l8 9.46V19l4 2V12.46L22 3z',
  download:  'M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4 M7 10l5 5 5-5 M12 15V3',
  search:    'M11 19a8 8 0 1 0 0-16 8 8 0 0 0 0 16z M21 21l-4.35-4.35',
  check:     'M20 6L9 17l-5-5',
  x:         'M18 6L6 18 M6 6l12 12',
  liIcon:    'M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z M2 9h4v12H2z M4 6a2 2 0 1 0 0-4 2 2 0 0 0 0 4z',
}

function Ic({ d, s = 16, stroke = 'currentColor' }) {
  return (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d={d} />
    </svg>
  )
}

function Toggle({ on, onClick }) {
  return (
    <div onClick={onClick} style={{ width: 44, height: 24, background: on ? '#c8f000' : '#d1d5db', borderRadius: 100, position: 'relative', cursor: 'pointer', transition: 'background 0.2s', flexShrink: 0 }}>
      <div style={{ position: 'absolute', top: 3, left: on ? 23 : 3, width: 18, height: 18, background: '#fff', borderRadius: '50%', transition: 'left 0.2s', boxShadow: '0 1px 4px rgba(0,0,0,0.2)' }} />
    </div>
  )
}


const DASHBOARD_ADDONS = {
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

const DASHBOARD_PRICING_SECTIONS = [
  {
    title: 'Outreach',
    subtitle: 'Outreach automation with safe daily actions.',
    addons: DASHBOARD_ADDONS.outreach,
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
    addons: DASHBOARD_ADDONS.scheduling,
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
    addons: DASHBOARD_ADDONS.leads,
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
    addons: DASHBOARD_ADDONS.ai,
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

const DASHBOARD_BUNDLE = {
  title: 'All-in-One',
  subtitle: 'One plan for the full Linkziy growth stack.',
  addons: DASHBOARD_ADDONS.allInOne,
  plan: {
    name: 'Linkziy Pro Suite',
    desc: 'All-in-one bundle combining outreach automation, scheduling, leads, and AI assistance for complete LinkedIn growth operations.',
    price: '59',
    features: ['1 Sender account', '1 LinkedIn account', '600 Leads / month', '300 AI credits / month', '50 Daily actions', 'Up to Unlimited sequences', '1 seat'],
  },
}

function DashboardAddonItem({ addon }) {
  const [checked, setChecked] = useState(false)

  return (
    <label
      className={`dp-addonItem${checked ? ' dp-addonChecked' : ''}`}
      onClick={() => setChecked(c => !c)}
    >
      <span className={`dp-checkbox${checked ? ' dp-checkboxChecked' : ''}`}>
        {checked && (
          <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
            <path d="M1 4L3.5 6.5L9 1" stroke="#050505" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        )}
      </span>
      <span className="dp-addonCopy">
        <strong>{addon.name}</strong>
        <small>{addon.desc}</small>
      </span>
      <span className="dp-addonPrice">{addon.price}</span>
    </label>
  )
}

function DashboardPlanCard({ plan, addons }) {
  return (
    <article className={`dp-card${plan.featured ? ' dp-featured' : ''}`}>
      <div className="dp-cardContent">
        <h3 className="dp-planName">{plan.name}</h3>
        <p className="dp-planDesc">{plan.desc}</p>

        <div className="dp-priceLine">
          <span className="dp-price">${plan.price}</span>
          <span className="dp-month">/month</span>
        </div>

        <ul className="dp-features">
          {plan.features.map((f) => (
            <li key={f}>
              <span className="dp-tick">✓</span>
              <span>{f}</span>
            </li>
          ))}
        </ul>

        <div className="dp-rule" />
        <p className="dp-addonHeading">+ Optional Add-ons</p>
        <div className="dp-addonList">
          {addons.map((addon) => (
            <DashboardAddonItem addon={addon} key={addon.name} />
          ))}
        </div>
      </div>

      <button
        className={`dp-upgradeBtn${plan.featured ? ' dp-primaryBtn' : ''}`}
        onClick={() => { window.location.href = '/signup' }}
      >
        Upgrade
      </button>
    </article>
  )
}

export default function Dashboard() {
  const user = useMemo(() => getUser(), [])
  const ui = initials(user.name)
  const uf = firstName(user.name)

  const [view, setView] = useState('overview')
  const [sidebarExpanded, setSidebarExpanded] = useState(true)
  const [hoveringSidebar, setHoveringSidebar] = useState(false)
  const [welcomeIdx, setWelcomeIdx] = useState(0)
  const [tourIdx, setTourIdx] = useState(0)
  const [timeRange, setTimeRange] = useState('Today')
  const [showRangeMenu, setShowRangeMenu] = useState(false)
  const [showWidgetModal, setShowWidgetModal] = useState(false)
  const [showWelcome, setShowWelcome] = useState(true)
  const [widgets, setWidgets] = useState({ performance: true, quota: true, streak: true, topPerformers: true })
  const [editProfile, setEditProfile] = useState(false)
  const [notifs, setNotifs] = useState({ email: true, campaigns: true, weekly: false })
  const [settingsTab, setSettingsTab] = useState('LinkedIn')
  const slide = TOUR_SLIDES[tourIdx]
  const collapsed = !sidebarExpanded && !hoveringSidebar

  const go = (v) => { setView(v); setShowRangeMenu(false); setSidebarExpanded(false) }

  // Chart data
  const DATES = ['Mar 30','Apr 1','Apr 3','Apr 5','Apr 7','Apr 9','Apr 11','Apr 13','Apr 15','Apr 17','Apr 19','Apr 21','Apr 23','Apr 25','Apr 27']

  const CSS = `
    @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Barlow:ital,wght@0,400;0,500;0,600;0,700;0,800;0,900;1,400&display=swap');
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    body { font-family: 'Barlow', sans-serif; background: #f4f1eb; }
    a { text-decoration: none; color: inherit; }

    /* ── LAYOUT ── */
    .app { display: flex; min-height: 100vh; }

    /* ── SIDEBAR ── */
    .sb {
      width: 240px; min-height: 100vh; background: #111111;
      display: flex; flex-direction: column;
      position: sticky; top: 0; height: 100vh;
      flex-shrink: 0; overflow: hidden;
      transition: width 0.25s cubic-bezier(0.4,0,0.2,1);
      z-index: 100;
    }
    .sb.col { width: 56px; }

    /* Logo */
    .sb-logo { padding: 14px 14px 12px; border-bottom: 1px solid rgba(255,255,255,0.07); display: flex; align-items: center; gap: 10px; min-height: 58px; flex-shrink: 0; }
    .sb-logo-mark { width: 32px; height: 32px; flex-shrink: 0; display: flex; align-items: center; justify-content: center; overflow: visible; }
    .sb-logo-mark svg, .sb-logo-mark img { width: 28px !important; height: 28px !important; max-width: 28px !important; max-height: 28px !important; object-fit: contain; display: block; }
    .sb-logo-text { font-family: 'Bebas Neue', sans-serif; font-size: 22px; letter-spacing: 2px; color: #475569; white-space: nowrap; transition: opacity 0.18s, width 0.18s; overflow: hidden; }
    .sb.col .sb-logo-text { opacity: 0; width: 0; }

    /* Nav */
    .sb-nav { flex: 1; padding: 10px 8px; overflow-y: auto; overflow-x: hidden; scrollbar-width: none; }
    .sb-nav::-webkit-scrollbar { display: none; }
    .sb-sec { font-size: 9.5px; font-weight: 700; letter-spacing: 0.16em; text-transform: uppercase; color: rgba(255,255,255,0.22); padding: 0 8px; margin: 18px 0 4px; white-space: nowrap; transition: opacity 0.15s; }
    .sb.col .sb-sec { opacity: 0; }
    .sb-item {
      display: flex; align-items: center; gap: 10px;
      padding: 8px 8px; border-radius: 8px;
      font-size: 13.5px; font-weight: 500;
      color: rgba(255,255,255,0.45); cursor: pointer;
      transition: all 0.15s; white-space: nowrap;
      margin-bottom: 1px; min-height: 40px; position: relative;
    }
    .sb-item:hover:not(.lk) { background: rgba(255,255,255,0.07); color: rgba(255,255,255,0.92); }
    .sb-item.on { background: rgba(200,240,0,0.12); color: #c8f000; }
    .sb-item.lk { cursor: default; opacity: 0.3; }
    .sb-ic { width: 22px; height: 22px; flex-shrink: 0; display: flex; align-items: center; justify-content: center; }
    .sb-lbl { overflow: hidden; transition: opacity 0.15s; flex: 1; }
    .sb.col .sb-lbl { opacity: 0; pointer-events: none; width: 0; }
    .sb-soon { font-size: 9px; font-weight: 700; letter-spacing: 0.04em; text-transform: uppercase; background: rgba(255,255,255,0.06); color: rgba(255,255,255,0.18); padding: 2px 6px; border-radius: 4px; flex-shrink: 0; transition: opacity 0.15s; }
    .sb.col .sb-soon { opacity: 0; }
    .sb.col .sb-item { justify-content: center; padding: 8px; }
    .sb.col .sb-item:not(.lk):hover::after {
      content: attr(data-tip); position: absolute; left: calc(100% + 8px); top: 50%; transform: translateY(-50%);
      background: #1c1c1c; color: #fff; font-size: 12px; font-weight: 600;
      padding: 5px 10px; border-radius: 7px; white-space: nowrap;
      border: 1px solid rgba(255,255,255,0.1); pointer-events: none; z-index: 999;
    }

    /* Bottom */
    .sb-bottom { flex-shrink: 0; border-top: 1px solid rgba(255,255,255,0.07); }
    .sb-user { display: flex; align-items: center; gap: 10px; padding: 12px 12px; cursor: pointer; transition: background 0.15s; overflow: hidden; }
    .sb-user:hover { background: rgba(255,255,255,0.05); }
    .sb-av { width: 34px; height: 34px; border-radius: 8px; background: #c8f000; color: #0a0a0a; font-family: 'Bebas Neue', sans-serif; font-size: 14px; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
    .sb-uinfo { flex: 1; min-width: 0; overflow: hidden; transition: opacity 0.15s; }
    .sb.col .sb-uinfo { opacity: 0; width: 0; }
    .sb-uname { font-size: 13px; font-weight: 700; color: rgba(255,255,255,0.88); overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
    .sb-urole { font-size: 10.5px; color: rgba(255,255,255,0.3); text-transform: uppercase; letter-spacing: 0.04em; }
    .trial-blk { padding: 8px 10px 12px; transition: opacity 0.15s; }
    .sb.col .trial-blk { opacity: 0; pointer-events: none; }
    .trial-inner { background: rgba(200,240,0,0.08); border: 1px solid rgba(200,240,0,0.16); border-radius: 10px; padding: 12px; }
    .trial-top { display: flex; align-items: center; justify-content: space-between; margin-bottom: 2px; }
    .trial-lbl { font-size: 10px; font-weight: 700; letter-spacing: 0.08em; text-transform: uppercase; color: rgba(255,255,255,0.3); }
    .trial-badge { font-size: 9px; font-weight: 800; color: #c8f000; background: rgba(200,240,0,0.12); padding: 2px 7px; border-radius: 100px; }
    .trial-days { font-size: 13px; font-weight: 800; color: #c8f000; margin-bottom: 6px; }
    .trial-bar { height: 3px; background: rgba(255,255,255,0.08); border-radius: 2px; margin-bottom: 10px; overflow: hidden; }
    .trial-fill { height: 100%; width: 50%; background: linear-gradient(90deg,#c8f000,#a8cc00); border-radius: 2px; }
    .btn-up { width: 100%; padding: 8px; background: #c8f000; color: #0a0a0a; border: none; border-radius: 8px; font-size: 12px; font-weight: 800; cursor: pointer; font-family: 'Barlow', sans-serif; }
    .btn-up:hover { background: #b4d800; }

    /* ── MAIN ── */
    .main { flex: 1; min-width: 0; display: flex; flex-direction: column; }

    /* ── TOPBAR ── */
    .tb { background: #fff; border-bottom: 1px solid #e5e2d9; padding: 0 24px; height: 56px; display: flex; align-items: center; justify-content: space-between; position: sticky; top: 0; z-index: 60; }
    .tb-ws { display: flex; align-items: center; gap: 8px; padding: 6px 12px; border-radius: 8px; border: 1px solid #e5e2d9; background: #faf8f3; cursor: pointer; font-size: 13.5px; font-weight: 700; color: #0a0a0a; }
    .tb-ws:hover { border-color: #c8f000; }
    .tb-ws-av { width: 22px; height: 22px; background: #c8f000; border-radius: 5px; display: flex; align-items: center; justify-content: center; font-size: 9px; font-weight: 800; color: #0a0a0a; }
    .tb-right { display: flex; align-items: center; gap: 12px; }
    .tb-info { text-align: right; }
    .tb-name { font-size: 13px; font-weight: 700; color: #0a0a0a; }
    .tb-role { font-size: 10px; color: #aaa; text-transform: uppercase; letter-spacing: 0.05em; }
    .tb-av { width: 34px; height: 34px; background: #c8f000; color: #0a0a0a; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-family: 'Bebas Neue', sans-serif; font-size: 14px; cursor: pointer; flex-shrink: 0; }
    .tb-bell { width: 34px; height: 34px; border: 1px solid #e5e2d9; border-radius: 8px; display: flex; align-items: center; justify-content: center; cursor: pointer; color: #888; position: relative; }
    .tb-bell:hover { border-color: #0a0a0a; color: #0a0a0a; }
    .bell-dot { position: absolute; top: 7px; right: 7px; width: 6px; height: 6px; background: #ef4444; border-radius: 50%; border: 1.5px solid #fff; }

    /* ── CONTENT ── */
    .dc { padding: 24px 28px 60px; flex: 1; }


    /* ── REUSABLE PAGE HEADER OVERRIDES ── */
    .dc > .pageHeaderBox {
      background: #f6f4ed;
      border: 1px solid rgba(200, 240, 0, 0.35);
      border-radius: 28px;
      padding: 34px 40px;
      margin-bottom: 24px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 24px;
      box-shadow: 0 20px 60px rgba(0,0,0,0.05), inset 0 1px 0 rgba(255,255,255,0.65);
      backdrop-filter: blur(16px);
      -webkit-backdrop-filter: blur(16px);
    }
    .dc > .pageHeaderBox .pageHeaderTag {
      display: inline-flex;
      align-items: center;
      width: fit-content;
      padding: 6px 16px;
      border-radius: 999px;
      background: rgba(200,240,0,0.18);
      border: 1px solid rgba(200,240,0,0.48);
      font-size: 12px;
      font-weight: 800;
      letter-spacing: 0.08em;
      text-transform: uppercase;
      color: #556300;
      margin-bottom: 14px;
    }
    .dc > .pageHeaderBox .pageHeaderTitle {
      font-family: 'Bebas Neue', sans-serif;
      font-size: 46px;
      line-height: 0.95;
      letter-spacing: 1px;
      color: #0a0a0a;
      margin: 0;
    }
    .dc > .pageHeaderBox .pageHeaderSub {
      margin-top: 10px;
      font-size: 15px;
      color: #858b95;
      line-height: 1.45;
    }
    .dc > .pageHeaderBox .pageHeaderAction {
      display: flex;
      align-items: center;
      gap: 10px;
      flex-shrink: 0;
      flex-wrap: wrap;
      justify-content: flex-end;
    }
    @media (max-width: 820px) {
      .dc > .pageHeaderBox { padding: 26px; flex-direction: column; align-items: flex-start; }
      .dc > .pageHeaderBox .pageHeaderTitle { font-size: 36px; }
      .dc > .pageHeaderBox .pageHeaderAction { justify-content: flex-start; }
    }

    /* Page header */
    .ph { display: flex; align-items: flex-start; justify-content: space-between; margin-bottom: 22px; gap: 16px; flex-wrap: wrap; }
    .ph-title { font-size: 30px; font-weight: 800; color: #0a0a0a; letter-spacing: -0.5px; line-height: 1.1; }
    .ph-sub { font-size: 13.5px; color: #aaa; margin-top: 2px; }
    .ph-right { display: flex; align-items: center; gap: 10px; flex-shrink: 0; }

    /* Big heading (Bebas) */
    .bh { font-family: 'Bebas Neue', sans-serif; font-size: 48px; letter-spacing: 1px; color: #0a0a0a; line-height: 1; margin-bottom: 4px; display: flex; align-items: center; gap: 14px; }
    .bh-icon { width: 52px; height: 52px; background: #f4f1eb; border: 1px solid #e5e2d9; border-radius: 12px; display: flex; align-items: center; justify-content: center; color: #555; flex-shrink: 0; }

    /* Range/buttons */
    .rw { position: relative; }
    .rbtn { display: flex; align-items: center; gap: 8px; padding: 8px 14px; background: #fff; border: 1px solid #e5e2d9; border-radius: 8px; font-size: 13.5px; font-weight: 600; color: #0a0a0a; cursor: pointer; min-width: 120px; justify-content: space-between; }
    .rbtn:hover { border-color: #c8f000; }
    .rmenu { position: absolute; top: calc(100% + 4px); right: 0; background: #fff; border: 1px solid #e5e2d9; border-radius: 10px; padding: 4px; min-width: 160px; z-index: 100; box-shadow: 0 4px 20px rgba(0,0,0,0.08); }
    .ropt { padding: 9px 12px; border-radius: 7px; font-size: 13px; cursor: pointer; display: flex; align-items: center; justify-content: space-between; color: #555; }
    .ropt:hover { background: #f4f1eb; }
    .ropt.sel { font-weight: 700; color: #0a0a0a; }
    .btn-cw { display: flex; align-items: center; gap: 6px; padding: 8px 14px; background: #fff; border: 1px solid #e5e2d9; border-radius: 8px; font-size: 13px; font-weight: 600; color: #0a0a0a; cursor: pointer; font-family: 'Barlow', sans-serif; }
    .btn-cw:hover { border-color: #c8f000; }
    .btn-p { display: inline-flex; align-items: center; gap: 6px; background: #c8f000; color: #0a0a0a; padding: 9px 18px; border-radius: 8px; font-size: 13.5px; font-weight: 800; font-family: 'Barlow', sans-serif; border: none; cursor: pointer; }
    .btn-p:hover { background: #b4d800; }
    .btn-o { display: inline-flex; align-items: center; gap: 6px; background: #fff; color: #0a0a0a; padding: 9px 18px; border-radius: 8px; font-size: 13px; font-weight: 700; font-family: 'Barlow', sans-serif; border: 1.5px solid #e5e2d9; cursor: pointer; }
    .btn-o:hover { border-color: #0a0a0a; }
    .btn-ghost { display: inline-flex; align-items: center; gap: 6px; background: transparent; color: #555; padding: 8px 14px; border-radius: 8px; font-size: 13px; font-weight: 600; font-family: 'Barlow', sans-serif; border: 1px solid #e5e2d9; cursor: pointer; }
    .btn-ghost:hover { background: #f4f1eb; }
    .btn-save { display: flex; align-items: center; gap: 6px; background: #c8f000; color: #0a0a0a; padding: 9px 18px; border-radius: 8px; font-size: 13.5px; font-weight: 800; border: none; cursor: pointer; font-family: 'Barlow', sans-serif; }
    .btn-save:hover { background: #b4d800; }

    /* ── DASHBOARD ── */

    /* LinkedIn Outreach Banner */
    .ob { background: linear-gradient(135deg, #1a6df0 0%, #1255cc 100%); border-radius: 14px; padding: 24px 28px; margin-bottom: 16px; display: flex; align-items: center; justify-content: space-between; position: relative; overflow: hidden; }
    .ob::before { content: ''; position: absolute; right: -80px; top: -80px; width: 300px; height: 300px; border-radius: 50%; border: 50px solid rgba(255,255,255,0.04); pointer-events: none; }
    .ob-left { flex: 1; }
    .ob-head { display: flex; align-items: center; gap: 8px; margin-bottom: 20px; }
    .ob-inb { background: #0077b5; color: #fff; font-size: 10px; font-weight: 800; padding: 2px 7px; border-radius: 4px; }
    .ob-title { font-size: 15px; font-weight: 700; color: rgba(255,255,255,0.9); }
    .ob-info { width: 16px; height: 16px; border-radius: 50%; border: 1.5px solid rgba(255,255,255,0.3); display: inline-flex; align-items: center; justify-content: center; font-size: 9px; color: rgba(255,255,255,0.5); }
    .ob-live { margin-left: auto; background: rgba(255,255,255,0.15); color: #fff; font-size: 10px; font-weight: 700; padding: 3px 10px; border-radius: 100px; letter-spacing: 0.05em; }
    .ob-row { display: flex; align-items: center; gap: 12px; margin-bottom: 14px; }
    .ob-row:last-child { margin-bottom: 0; }
    .ob-ic { width: 34px; height: 34px; background: rgba(255,255,255,0.14); border-radius: 8px; display: flex; align-items: center; justify-content: center; flex-shrink: 0; color: rgba(255,255,255,0.85); }
    .ob-lbl { font-size: 12.5px; color: rgba(255,255,255,0.55); margin-bottom: 2px; }
    .ob-val { font-size: 22px; font-weight: 800; color: #fff; line-height: 1; }
    .ob-circle { width: 110px; height: 110px; border-radius: 50%; border: 6px solid rgba(255,255,255,0.2); display: flex; align-items: center; justify-content: center; font-size: 24px; font-weight: 800; color: rgba(255,255,255,0.85); flex-shrink: 0; margin-left: 30px; }

    /* Grids */
    .g12 { display: grid; grid-template-columns: 1fr 2.2fr; gap: 14px; margin-bottom: 14px; }
    .g21 { display: grid; grid-template-columns: 1fr 2.2fr; gap: 14px; margin-bottom: 14px; }
    .g3 { display: grid; grid-template-columns: 1fr 2fr 1.4fr; gap: 14px; margin-bottom: 14px; }

    /* Cards */
    .cd { background: #1c1c1c; border-radius: 13px; padding: 20px; }
    .cl { background: #fff; border: 1px solid #e5e2d9; border-radius: 13px; padding: 20px; }
    .cd-hd { display: flex; align-items: center; justify-content: space-between; margin-bottom: 16px; }
    .cd-tl { display: flex; align-items: center; gap: 7px; }
    .cd-t { font-size: 14px; font-weight: 700; color: rgba(255,255,255,0.88); }
    .cd-b { font-size: 10px; font-weight: 700; color: rgba(255,255,255,0.35); background: rgba(255,255,255,0.07); padding: 3px 9px; border-radius: 6px; }
    .cd-i { width: 16px; height: 16px; border-radius: 50%; border: 1.5px solid rgba(255,255,255,0.18); display: inline-flex; align-items: center; justify-content: center; font-size: 9px; color: rgba(255,255,255,0.3); cursor: default; flex-shrink: 0; }
    .cl-t { font-size: 14px; font-weight: 700; color: #0a0a0a; }
    .cl-i { width: 15px; height: 15px; border-radius: 50%; border: 1.5px solid #ccc; display: inline-flex; align-items: center; justify-content: center; font-size: 9px; color: #aaa; cursor: default; flex-shrink: 0; }

    /* Profile card */
    .pc-wrap { display: flex; flex-direction: column; align-items: center; padding: 8px 0 4px; }
    .pc-ring { width: 76px; height: 76px; border-radius: 50%; border: 3px solid #c8f000; display: flex; align-items: center; justify-content: center; margin-bottom: 10px; position: relative; }
    .pc-inner { width: 66px; height: 66px; border-radius: 50%; background: rgba(200,240,0,0.15); display: flex; align-items: center; justify-content: center; font-family: 'Bebas Neue', sans-serif; font-size: 27px; color: #c8f000; }
    .pc-li { position: absolute; bottom: 0; right: 0; width: 19px; height: 19px; background: #0077b5; border-radius: 4px; border: 2px solid #1c1c1c; display: flex; align-items: center; justify-content: center; font-size: 8px; color: #fff; font-weight: 800; }
    .pc-name { font-size: 15px; font-weight: 800; color: #fff; margin-bottom: 2px; text-align: center; }
    .pc-role { font-size: 11.5px; color: rgba(255,255,255,0.32); margin-bottom: 16px; text-align: center; }
    .pc-stats { display: flex; width: 100%; border-top: 1px solid rgba(255,255,255,0.07); padding-top: 14px; }
    .pc-stat { flex: 1; text-align: center; }
    .pc-stat + .pc-stat { border-left: 1px solid rgba(255,255,255,0.07); }
    .pc-sv { font-family: 'Bebas Neue', sans-serif; font-size: 24px; color: #fff; }
    .pc-sl { font-size: 10.5px; color: rgba(255,255,255,0.3); }

    /* Perf grid */
    .pg { display: grid; grid-template-columns: repeat(3,1fr); gap: 10px; margin-bottom: 10px; }
    .pm { background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.07); border-radius: 10px; padding: 16px; display: flex; flex-direction: column; align-items: center; text-align: center; }
    .pm-ic { width: 46px; height: 46px; background: #c8f000; border-radius: 11px; display: flex; align-items: center; justify-content: center; margin-bottom: 12px; color: #0a0a0a; }
    .pm-v { font-size: 26px; font-weight: 800; color: #fff; line-height: 1; }
    .pm-l { font-size: 11.5px; color: rgba(255,255,255,0.4); margin-top: 4px; }
    .pm-s { font-size: 11px; color: #c8f000; margin-top: 3px; font-weight: 700; }
    .live-row { display: flex; align-items: center; justify-content: space-between; }
    .live-lbl { font-size: 11.5px; color: rgba(255,255,255,0.35); display: flex; align-items: center; gap: 6px; }
    .live-dot { width: 7px; height: 7px; border-radius: 50%; background: #22c55e; animation: pulse 2s infinite; }
    @keyframes pulse { 0%,100%{opacity:1}50%{opacity:0.4} }
    .live-r { font-size: 11.5px; color: rgba(255,255,255,0.25); }

    /* Prospect status */
    .ps-hd { display: flex; align-items: center; justify-content: space-between; margin-bottom: 14px; }
    .ps-t { font-size: 14px; font-weight: 700; color: rgba(255,255,255,0.88); display: flex; align-items: center; gap: 7px; }
    .badge-run { background: rgba(34,197,94,0.13); color: #22c55e; font-size: 11px; font-weight: 700; padding: 3px 10px; border-radius: 100px; }
    .ps-item { display: flex; align-items: center; gap: 12px; background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.07); border-radius: 9px; padding: 13px 15px; margin-bottom: 8px; }
    .ps-ic { width: 36px; height: 36px; background: #c8f000; border-radius: 9px; display: flex; align-items: center; justify-content: center; flex-shrink: 0; color: #0a0a0a; }
    .ps-v { font-size: 22px; font-weight: 800; color: #fff; flex: 1; }
    .ps-lb { font-size: 12px; color: rgba(255,255,255,0.38); }
    .ps-btn { width: 100%; padding: 11px; background: #c8f000; color: #0a0a0a; border: none; border-radius: 9px; font-size: 13.5px; font-weight: 800; cursor: pointer; font-family: 'Barlow', sans-serif; margin-top: 4px; display: flex; align-items: center; justify-content: center; gap: 8px; }
    .ps-btn:hover { background: #b4d800; }

    /* Chart */
    .ch-area { height: 130px; overflow: hidden; margin-bottom: 8px; }
    .ch-dates { display: flex; margin-top: 2px; }
    .ch-date { font-size: 10px; color: rgba(255,255,255,0.2); flex: 1; text-align: center; white-space: nowrap; overflow: hidden; }

    /* Quota */
    .qc-ic { width: 46px; height: 46px; background: #c8f000; border-radius: 11px; display: flex; align-items: center; justify-content: center; margin-bottom: 14px; color: #0a0a0a; }
    .qc-t { font-size: 13.5px; font-weight: 700; color: rgba(255,255,255,0.78); margin-bottom: 16px; display: flex; align-items: center; gap: 6px; }
    .qc-row { margin-bottom: 14px; }
    .qc-rh { display: flex; align-items: center; justify-content: space-between; margin-bottom: 6px; }
    .qc-lb { font-size: 12.5px; color: rgba(255,255,255,0.5); }
    .qc-rv { font-size: 12px; color: rgba(255,255,255,0.3); }
    .qc-bar { height: 3px; background: rgba(255,255,255,0.08); border-radius: 2px; }

    /* Streak */
    .str-badge { float: right; background: rgba(200,240,0,0.12); color: #c8f000; font-size: 10px; font-weight: 800; padding: 3px 10px; border-radius: 100px; }
    .str-ic { width: 46px; height: 46px; background: rgba(255,255,255,0.06); border-radius: 11px; display: flex; align-items: center; justify-content: center; margin-bottom: 14px; clear: both; color: #c8f000; }
    .str-t { font-size: 13.5px; font-weight: 700; color: rgba(255,255,255,0.55); margin-bottom: 6px; display: flex; align-items: center; gap: 6px; }
    .str-v { font-size: 46px; font-weight: 900; color: #fff; line-height: 1; }
    .str-u { font-size: 16px; color: rgba(255,255,255,0.35); font-weight: 400; margin-left: 4px; }
    .str-s { font-size: 11.5px; color: rgba(255,255,255,0.22); margin-top: 5px; }

    /* Product Tour */
    .tc { background: #1c1c1c; border-radius: 13px; padding: 20px; display: flex; flex-direction: column; }
    .tc-hd { display: flex; align-items: flex-start; justify-content: space-between; margin-bottom: 20px; }
    .tc-tb { display: flex; align-items: center; gap: 10px; }
    .tc-ib { width: 40px; height: 40px; background: rgba(200,240,0,0.1); border-radius: 10px; display: flex; align-items: center; justify-content: center; flex-shrink: 0; color: #c8f000; }
    .tc-tt { font-size: 15px; font-weight: 800; color: #fff; }
    .tc-ts { font-size: 11.5px; color: rgba(255,255,255,0.3); margin-top: 1px; }
    .tc-nav { display: flex; gap: 4px; flex-shrink: 0; }
    .tc-nb { width: 32px; height: 32px; border-radius: 50%; border: 1px solid rgba(255,255,255,0.12); background: transparent; color: rgba(255,255,255,0.45); font-size: 16px; cursor: pointer; display: flex; align-items: center; justify-content: center; }
    .tc-nb:hover { background: rgba(255,255,255,0.08); color: #fff; }
    .t-tag { font-size: 10.5px; font-weight: 800; letter-spacing: 0.14em; color: #c8f000; margin-bottom: 8px; }
    .t-ft { font-size: 16px; font-weight: 800; color: #fff; line-height: 1.2; margin-bottom: 10px; text-transform: uppercase; }
    .t-ds { font-size: 12.5px; color: rgba(255,255,255,0.4); line-height: 1.65; margin-bottom: 14px; }
    .t-bul { list-style: none; display: flex; flex-direction: column; gap: 8px; margin-bottom: 18px; }
    .t-bul li { font-size: 12.5px; color: rgba(255,255,255,0.5); display: flex; align-items: center; gap: 8px; }
    .tbdot { width: 6px; height: 6px; border-radius: 50%; background: #c8f000; flex-shrink: 0; }
    .btn-tour { background: #c8f000; color: #0a0a0a; border: none; padding: 12px; border-radius: 9px; font-size: 13.5px; font-weight: 800; font-family: 'Barlow', sans-serif; cursor: pointer; width: 100%; }
    .btn-tour:hover { background: #b4d800; }
    .t-dots { display: flex; gap: 4px; margin-top: 14px; justify-content: center; }
    .tdot { height: 4px; border-radius: 100px; background: rgba(255,255,255,0.1); transition: all 0.22s; cursor: pointer; width: 14px; }
    .tdot.on { background: #c8f000; width: 26px; }

    /* Top Performers */
    .tp-hd { display: flex; align-items: center; gap: 9px; margin-bottom: 16px; }
    .tp-ib { width: 40px; height: 40px; background: rgba(255,255,255,0.06); border-radius: 10px; display: flex; align-items: center; justify-content: center; color: #c8f000; }
    .tp-t { font-size: 14px; font-weight: 700; color: rgba(255,255,255,0.88); }
    .tp-empty { text-align: center; padding: 30px 20px; }
    .tp-ei { width: 54px; height: 54px; background: rgba(255,255,255,0.05); border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 10px; color: rgba(255,255,255,0.2); }
    .tp-et { font-size: 13px; color: rgba(255,255,255,0.32); }
    .tp-es { font-size: 11px; color: rgba(255,255,255,0.18); margin-top: 3px; }

    /* Left column stack */
    .lcol { display: flex; flex-direction: column; gap: 14px; }

    /* Empty state */
    .ebox { background: #fff; border: 1px solid #e5e2d9; border-radius: 13px; padding: 80px 40px; text-align: center; }
    .eic { width: 64px; height: 64px; background: #f4f1eb; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 14px; color: #aaa; }
    .et { font-size: 22px; font-weight: 800; color: #0a0a0a; margin-bottom: 8px; font-family: 'Bebas Neue', sans-serif; letter-spacing: 0.5px; }
    .es { font-size: 13.5px; color: #aaa; margin-bottom: 22px; max-width: 320px; margin-left: auto; margin-right: auto; }

    /* ── WELCOME MODAL ── */
    .wm-ov { position: fixed; inset: 0; background: rgba(0,0,0,0.65); z-index: 300; display: flex; align-items: center; justify-content: center; }
    .wm { background: #1a1a1a; border-radius: 16px; width: 660px; max-width: 93vw; display: flex; overflow: hidden; }
    .wm-l { width: 210px; flex-shrink: 0; background: rgba(200,240,0,0.04); border-right: 1px solid rgba(255,255,255,0.07); padding: 26px 20px; }
    .wm-g { display: flex; align-items: center; gap: 8px; margin-bottom: 20px; }
    .wm-gi { width: 28px; height: 28px; background: rgba(200,240,0,0.12); border-radius: 7px; display: flex; align-items: center; justify-content: center; color: #c8f000; }
    .wm-gl { font-size: 11px; font-weight: 800; letter-spacing: 0.1em; color: rgba(255,255,255,0.3); text-transform: uppercase; }
    .wm-step { display: flex; align-items: center; gap: 10px; margin-bottom: 11px; }
    .wm-sd { width: 7px; height: 7px; border-radius: 50%; background: rgba(200,240,0,0.22); flex-shrink: 0; }
    .wm-sd.on { background: #c8f000; }
    .wm-sl { font-size: 12px; color: rgba(255,255,255,0.35); }
    .wm-sl.on { color: rgba(255,255,255,0.8); }
    .wm-r { flex: 1; padding: 28px 26px; }
    .wm-tag { display: inline-flex; align-items: center; gap: 6px; background: rgba(200,240,0,0.1); color: #c8f000; font-size: 11px; font-weight: 800; padding: 4px 12px; border-radius: 100px; margin-bottom: 14px; }
    .wm-prog { display: flex; gap: 3px; margin-bottom: 5px; }
    .wm-pd { height: 3px; border-radius: 2px; flex: 1; background: rgba(255,255,255,0.08); cursor: pointer; }
    .wm-pd.on { background: #c8f000; }
    .wm-cnt { font-size: 11.5px; color: rgba(255,255,255,0.22); text-align: right; margin-bottom: 16px; }
    .wm-title { font-size: 24px; font-weight: 800; color: #fff; line-height: 1.1; margin-bottom: 10px; }
    .wm-desc { font-size: 13px; color: rgba(255,255,255,0.4); line-height: 1.65; margin-bottom: 22px; }
    .wm-acts { display: flex; align-items: center; justify-content: space-between; }
    .wm-skip { font-size: 13px; color: rgba(255,255,255,0.28); cursor: pointer; background: none; border: none; font-family: 'Barlow', sans-serif; }
    .wm-skip:hover { color: rgba(255,255,255,0.65); }
    .wm-cont { background: #c8f000; color: #0a0a0a; border: none; padding: 10px 20px; border-radius: 9px; font-size: 13.5px; font-weight: 800; font-family: 'Barlow', sans-serif; cursor: pointer; }
    .wm-cont:hover { background: #b4d800; }

    /* ── WIDGET MODAL ── */
    .wdg-ov { position: fixed; inset: 0; background: rgba(0,0,0,0.5); z-index: 200; display: flex; align-items: center; justify-content: center; }
    .wdg { background: #1a1a1a; border-radius: 16px; padding: 28px; width: 500px; max-width: 93vw; position: relative; }
    .wdg-t { font-size: 18px; font-weight: 800; color: #fff; margin-bottom: 4px; }
    .wdg-s { font-size: 13px; color: rgba(255,255,255,0.32); margin-bottom: 20px; }
    .wdg-x { position: absolute; top: 16px; right: 16px; background: none; border: none; color: rgba(255,255,255,0.4); font-size: 18px; cursor: pointer; }
    .wdg-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; }
    .wi { border-radius: 12px; padding: 16px; cursor: pointer; position: relative; border: 1.5px solid rgba(200,240,0,0.28); background: rgba(200,240,0,0.06); transition: all 0.16s; }
    .wi.off { border-color: rgba(255,255,255,0.08); background: rgba(255,255,255,0.02); }
    .wi-eye { position: absolute; top: 12px; right: 12px; color: #c8f000; }
    .wi.off .wi-eye { color: rgba(255,255,255,0.18); }
    .wi-ic { width: 32px; height: 32px; background: rgba(200,240,0,0.14); border-radius: 9px; display: flex; align-items: center; justify-content: center; margin-bottom: 8px; color: #c8f000; }
    .wi.off .wi-ic { background: rgba(255,255,255,0.06); color: rgba(255,255,255,0.3); }
    .wi-n { font-size: 13px; font-weight: 700; color: #fff; margin-bottom: 3px; }
    .wi-d { font-size: 11.5px; color: rgba(255,255,255,0.32); }

    /* ── ANALYTICS (workspace) ── */
    .met-strip { display: grid; grid-template-columns: repeat(4,1fr); gap: 12px; margin-bottom: 14px; }
    .mb { background: #fff; border: 1px solid #e5e2d9; border-radius: 11px; padding: 17px 18px; border-left: 3px solid #c8f000; }
    .mb-l { font-size: 11px; color: #999; margin-bottom: 6px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em; }
    .mb-v { font-size: 26px; font-weight: 800; color: #0a0a0a; line-height: 1; }
    .tab-strip { display: flex; gap: 2px; background: #f4f1eb; border-radius: 10px; padding: 3px; width: fit-content; margin-bottom: 18px; }
    .tab-i { padding: 8px 18px; border-radius: 8px; font-size: 13.5px; font-weight: 600; cursor: pointer; color: #888; transition: all 0.15s; }
    .tab-i.on { background: #fff; color: #0a0a0a; font-weight: 700; box-shadow: 0 1px 4px rgba(0,0,0,0.08); }

    /* ── ACCOUNT SAFETY ── */
    .srow { display: flex; align-items: center; justify-content: space-between; padding: 14px 0; border-bottom: 1px solid #f4f1eb; }
    .srow:last-child { border-bottom: none; }
    .srow-l { display: flex; align-items: center; gap: 10px; font-size: 14px; color: #444; }
    .srow-r { font-size: 14px; font-weight: 700; color: #0a0a0a; }
    .srow-bar { height: 4px; background: #f0ede8; border-radius: 2px; margin-top: 8px; }
    .srow-fill { height: 100%; border-radius: 2px; background: #22c55e; }
    .s-legend { display: flex; gap: 16px; margin-top: 12px; }
    .s-leg { display: flex; align-items: center; gap: 5px; font-size: 12px; color: #888; }
    .s-dot { width: 7px; height: 7px; border-radius: 50%; }
    .warm-box { background: #f9f8f4; border: 1px solid #e5e2d9; border-radius: 12px; padding: 20px; }
    .warm-hd { font-size: 15px; font-weight: 800; color: #0a0a0a; margin-bottom: 4px; display: flex; align-items: center; gap: 10px; }
    .warm-ic { width: 38px; height: 38px; background: #f4f1eb; border-radius: 9px; display: flex; align-items: center; justify-content: center; color: #555; }
    .warm-sub { font-size: 12.5px; color: #888; margin-bottom: 14px; }
    .warm-msg { background: rgba(200,240,0,0.08); border: 1px solid rgba(200,240,0,0.2); border-radius: 9px; padding: 14px 16px; font-size: 13px; color: #555; }
    .warm-bullet { display: flex; flex-direction: column; gap: 8px; }
    .warm-b { font-size: 12.5px; color: #555; display: flex; align-items: flex-start; gap: 8px; }
    .warm-bdot { width: 6px; height: 6px; border-radius: 50%; background: #c8f000; flex-shrink: 0; margin-top: 5px; }

    /* ── AUDIT LOGS ── */
    .astat { display: grid; grid-template-columns: repeat(3,1fr); gap: 12px; margin-bottom: 18px; }
    .astat-b { background: #fff; border: 1px solid #e5e2d9; border-radius: 12px; padding: 20px 22px; }
    .astat-l { font-size: 11px; font-weight: 800; color: #bbb; text-transform: uppercase; letter-spacing: 0.08em; margin-bottom: 8px; }
    .astat-v { font-size: 32px; font-weight: 800; color: #0a0a0a; }
    .abar { background: #fff; border: 1px solid #e5e2d9; border-radius: 11px; padding: 11px 15px; display: flex; gap: 10px; align-items: center; margin-bottom: 12px; }
    .asearch { flex: 1; border: none; outline: none; font-size: 13.5px; font-family: 'Barlow', sans-serif; color: #0a0a0a; background: transparent; }
    .asel { appearance: none; border: 1px solid #e5e2d9; border-radius: 7px; padding: 7px 10px; font-size: 13px; color: #444; font-family: 'Barlow', sans-serif; outline: none; cursor: pointer; background: #fff; }
    .btn-exp { display: flex; align-items: center; gap: 5px; padding: 7px 13px; border: 1px solid #e5e2d9; border-radius: 7px; font-size: 13px; font-weight: 700; background: #fff; color: #444; cursor: pointer; font-family: 'Barlow', sans-serif; }
    .aempty { background: #fff; border: 1px solid #e5e2d9; border-radius: 12px; padding: 60px 40px; text-align: center; color: #aaa; font-size: 14px; }
    .a-sort { font-size: 12px; color: #bbb; margin-bottom: 10px; display: flex; align-items: center; gap: 5px; }

    /* ── SETTINGS ── */
    .sg { display: grid; grid-template-columns: 280px 1fr; gap: 16px; align-items: start; }
    .sp { background: #fff; border: 1px solid #e5e2d9; border-radius: 13px; overflow: hidden; }
    .sp-hd { padding: 16px 20px; border-bottom: 1px solid #f0ede8; display: flex; align-items: center; justify-content: space-between; }
    .sp-t { font-size: 14.5px; font-weight: 800; color: #0a0a0a; }
    .sp-s { font-size: 12px; color: #aaa; margin-top: 1px; }
    .bsm { font-size: 12px; font-weight: 700; color: #555; background: #f4f1eb; border: 1px solid #e5e2d9; padding: 5px 12px; border-radius: 7px; cursor: pointer; font-family: 'Barlow', sans-serif; }
    .bsm:hover { background: #0a0a0a; color: #fff; border-color: #0a0a0a; }
    .sp-bd { padding: 18px 20px; }
    .fr { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; margin-bottom: 16px; }
    .fl { font-size: 11px; font-weight: 700; color: #bbb; text-transform: uppercase; letter-spacing: 0.07em; margin-bottom: 5px; }
    .fv { font-size: 14px; font-weight: 600; color: #0a0a0a; }
    .fv.m { color: #ccc; font-weight: 400; font-style: italic; }
    .fi { width: 100%; padding: 9px 13px; border: 1.5px solid #e5e2d9; border-radius: 8px; font-size: 14px; color: #0a0a0a; font-family: 'Barlow', sans-serif; outline: none; }
    .fi:focus { border-color: #c8f000; }
    .tr2 { display: flex; align-items: center; justify-content: space-between; padding: 13px 20px; border-top: 1px solid #f4f1eb; cursor: pointer; }
    .tr2:hover { background: #fafaf7; }
    .tr-t { font-size: 13.5px; font-weight: 700; color: #0a0a0a; }
    .tr-s { font-size: 12px; color: #aaa; }
    .dz { padding: 16px 20px; }
    .dz-t { font-size: 13px; font-weight: 800; color: #dc2626; margin-bottom: 4px; }
    .dz-s { font-size: 12px; color: #aaa; margin-bottom: 12px; }
    .btn-danger { font-size: 12px; font-weight: 700; color: #dc2626; background: rgba(220,38,38,0.06); border: 1px solid rgba(220,38,38,0.2); padding: 7px 14px; border-radius: 7px; cursor: pointer; font-family: 'Barlow', sans-serif; }
    .btn-danger:hover { background: #dc2626; color: #fff; }

    /* Settings tabs */
    .stab-strip { display: flex; gap: 0; border-bottom: 1px solid #e5e2d9; padding: 0 20px; overflow-x: auto; }
    .stab { padding: 12px 16px; font-size: 13.5px; font-weight: 600; color: #888; cursor: pointer; border-bottom: 2px solid transparent; white-space: nowrap; transition: all 0.15s; }
    .stab:hover { color: #0a0a0a; }
    .stab.on { color: #0a0a0a; border-bottom-color: #0a0a0a; font-weight: 700; }

    /* LinkedIn connection */
    .li-conn { border: 1px solid #e5e2d9; border-radius: 12px; padding: 20px; margin-bottom: 14px; }
    .li-conn-hd { display: flex; align-items: center; justify-content: space-between; margin-bottom: 16px; }
    .li-conn-t { font-size: 15px; font-weight: 800; color: #0a0a0a; }
    .li-conn-s { font-size: 12.5px; color: #aaa; }
    .li-no-conn { background: #f9f8f4; border: 1px solid #e5e2d9; border-radius: 10px; padding: 28px; display: flex; flex-direction: column; align-items: center; gap: 8px; }
    .li-no-ic { width: 52px; height: 52px; background: #0077b5; border-radius: 12px; display: flex; align-items: center; justify-content: center; color: #fff; }
    .li-no-t { font-size: 15px; font-weight: 800; color: #0a0a0a; }
    .li-no-s { font-size: 13px; color: #aaa; }

    /* Profile sidebar card */
    .prof-hd { height: 60px; background: linear-gradient(135deg,#c8f000,#8ab000); }
    .prof-bd { padding: 0 20px 20px; }
    .prof-av-wrap { margin-top: -26px; margin-bottom: 12px; }
    .prof-av { width: 54px; height: 54px; background: linear-gradient(135deg,#c8f000,#8ab000); border-radius: 50%; display: flex; align-items: center; justify-content: center; font-family: 'Bebas Neue', sans-serif; font-size: 22px; color: #0a0a0a; border: 3px solid #fff; }
    .prof-name { font-size: 16px; font-weight: 800; color: #0a0a0a; margin-bottom: 2px; }
    .prof-meta { font-size: 12px; color: #aaa; margin-bottom: 14px; }
    .prof-stats { display: flex; border-top: 1px solid #f0ede8; padding-top: 14px; }
    .prof-stat { flex: 1; text-align: center; border-right: 1px solid #f0ede8; }
    .prof-stat:last-child { border-right: none; }
    .prof-sv { font-family: 'Bebas Neue', sans-serif; font-size: 20px; }
    .prof-sl { font-size: 10.5px; color: #aaa; }
    .prof-plan { margin-top: 14px; background: #f8f7f2; border: 1px solid #e5e2d9; border-radius: 10px; padding: 14px; }
    .prof-plan-top { display: flex; align-items: center; justify-content: space-between; margin-bottom: 4px; }
    .prof-plan-t { font-size: 13px; font-weight: 800; }
    .prof-plan-badge { font-size: 9px; font-weight: 800; background: #e8e5dc; color: #888; padding: 2px 8px; border-radius: 100px; }
    .prof-plan-sub { font-size: 11.5px; color: #aaa; margin-bottom: 8px; }
    .prof-bar { height: 3px; background: #e5e2d9; border-radius: 2px; margin-bottom: 12px; }
    .prof-bar-fill { height: 100%; width: 50%; background: #c8f000; border-radius: 2px; }

    /* ── PRICING ── */
    .sec-title { font-size: 22px; font-weight: 800; color: #0a0a0a; margin-bottom: 3px; }
    .sec-sub { font-size: 13px; color: #aaa; margin-bottom: 18px; }
    .pc-cards { display: grid; grid-template-columns: repeat(3,1fr); gap: 16px; margin-bottom: 30px; }
    .pc-card { background: #fff; border: 1.5px solid #e5e2d9; border-radius: 14px; padding: 24px; display: flex; flex-direction: column; }
    .pc-card.pop { border-color: #c8f000; }
    .pc-tier { font-size: 18px; font-weight: 800; color: #0a0a0a; margin-bottom: 8px; }
    .pc-desc { font-size: 13px; color: #888; margin-bottom: 16px; line-height: 1.55; flex: 1; }
    .pc-price { font-size: 38px; font-weight: 800; color: #0a0a0a; line-height: 1; margin-bottom: 18px; }
    .pc-price span { font-size: 14px; color: #aaa; font-weight: 400; }
    .pc-feats { list-style: none; display: flex; flex-direction: column; gap: 9px; margin-bottom: 18px; }
    .pc-feats li { font-size: 13px; color: #555; display: flex; align-items: flex-start; gap: 8px; }
    .ck { color: #6a9500; flex-shrink: 0; }
    .pc-cta { width: 100%; padding: 12px; border-radius: 9px; font-size: 14px; font-weight: 800; font-family: 'Barlow', sans-serif; cursor: pointer; border: none; margin-top: auto; }
    .pc-cta.lime { background: #c8f000; color: #0a0a0a; }
    .pc-cta.lime:hover { background: #b4d800; }
    .pc-cta.dark { background: #0a0a0a; color: #fff; }
    .pc-cta.ghost { background: #f4f1eb; color: #0a0a0a; }
    .pc-cta.ghost:hover { background: #eae8dc; }
    .addons { margin-top: 14px; border-top: 1px solid #f0ede8; padding-top: 14px; }
    .addon-t { font-size: 11px; font-weight: 700; color: #aaa; text-transform: uppercase; letter-spacing: 0.07em; margin-bottom: 10px; }
    .addon-row { display: flex; align-items: flex-start; gap: 8px; margin-bottom: 8px; }
    .addon-cb { width: 14px; height: 14px; border: 1.5px solid #ccc; border-radius: 3px; flex-shrink: 0; margin-top: 2px; }
    .addon-nm { font-size: 13px; font-weight: 700; color: #0a0a0a; display: flex; justify-content: space-between; }
    .addon-pr { font-size: 12px; color: #aaa; }
    .addon-ds { font-size: 11.5px; color: #aaa; margin-top: 2px; line-height: 1.4; }

    /* Prospect intelligence */
    .pi-tag { display: inline-flex; background: rgba(200,240,0,0.15); color: #5a7000; font-size: 10.5px; font-weight: 800; padding: 3px 10px; border-radius: 100px; letter-spacing: 0.05em; margin-bottom: 4px; }
    .pi-title { font-family: 'Bebas Neue', sans-serif; font-size: 40px; letter-spacing: 1px; color: #0a0a0a; line-height: 1; margin-bottom: 4px; }
    .pi-sub { font-size: 13.5px; color: #aaa; }

    /* Campaigns */
    .camp-title { font-family: 'Bebas Neue', sans-serif; font-size: 40px; letter-spacing: 1px; color: #0a0a0a; }
    .camp-sub { font-size: 13.5px; color: #aaa; margin-top: 2px; }

    /* CampAnl */
    .ca-tag { display: inline-flex; background: rgba(200,240,0,0.15); color: #5a7000; font-size: 10px; font-weight: 800; padding: 3px 12px; border-radius: 100px; margin-bottom: 16px; }
    .ca-empty-box { background: #fff; border: 1px solid #e5e2d9; border-radius: 12px; padding: 80px 40px; text-align: center; }
    .ca-ei { width: 64px; height: 64px; background: #f4f1eb; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 14px; color: #aaa; }
    .ca-et { font-size: 16px; font-weight: 800; color: #0a0a0a; margin-bottom: 6px; }
    .ca-es { font-size: 13px; color: #aaa; max-width: 280px; margin: 0 auto 20px; }

    @media(max-width:1024px) {
      .g12,.g21,.g3 { grid-template-columns: 1fr; }
      .met-strip { grid-template-columns: 1fr 1fr; }
      .sg { grid-template-columns: 1fr; }
      .pc-cards { grid-template-columns: 1fr; }
    }
    @media(max-width:768px) {
      .sb { display: none; }
      .dc { padding: 16px 14px 60px; }
    }
    /* ── DASHBOARD PRICING UPDATED ── */
    .dp-pricingPage {
      background:
        radial-gradient(ellipse 80% 40% at 50% 0%, rgba(200, 240, 0, 0.07), transparent 55%),
        #f4f2e8;
      padding: 6px 0 40px;
      min-height: 100vh;
      font-family: 'Barlow', sans-serif;
    }
    .dp-pricingGroup { max-width: 1280px; margin: 0 auto 72px; }
    .dp-groupHeader { margin-bottom: 28px; }
    .dp-groupHeader h2 { margin: 0 0 6px; font-size: 30px; font-weight: 600; letter-spacing: -0.06em; line-height: 1; color: #050505; }
    .dp-groupHeader p { margin: 0; font-size: 15px; color: #80878f; line-height: 1.4; }
    .dp-cardGrid { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 24px; align-items: start; }
    .dp-bundleGrid { display: grid; grid-template-columns: minmax(0, 1fr) minmax(0, 1fr); gap: 24px; align-items: start; }
    .dp-bundleNote { background: rgba(255,255,255,0.75); border: 1px solid rgba(10,10,10,0.09); border-radius: 14px; padding: 36px 32px; display: flex; flex-direction: column; gap: 14px; box-shadow: 0 4px 24px rgba(10,10,10,0.04), 0 1px 4px rgba(10,10,10,0.04); }
    .dp-bestValue { display: inline-block; padding: 4px 12px; border-radius: 20px; background: rgba(200,240,0,0.3); border: 1px solid rgba(160,200,0,0.45); font-size: 13px; font-weight: 700; color: #4a5a00; width: fit-content; }
    .dp-bundleNote h3 { margin: 0; font-size: 22px; font-weight: 800; letter-spacing: -0.05em; line-height: 1.2; color: #050505; }
    .dp-bundleNote p { margin: 0; font-size: 16px; line-height: 1.6; color: #737985; }
    .dp-card { background: rgba(255,255,255,0.75); border: 1px solid rgba(10,10,10,0.09); border-radius: 14px; padding: 28px 26px 24px; display: flex; flex-direction: column; box-shadow: 0 4px 24px rgba(10,10,10,0.04), 0 1px 4px rgba(10,10,10,0.04); transition: box-shadow 0.2s ease; }
    .dp-card:hover { box-shadow: 0 8px 36px rgba(10,10,10,0.07), 0 2px 6px rgba(10,10,10,0.04); }
    .dp-card.dp-featured { border-color: rgba(200,240,0,0.9); box-shadow: 0 4px 24px rgba(200,240,0,0.12), 0 1px 4px rgba(10,10,10,0.04); }
    .dp-cardContent { flex: 1; }
    .dp-planName {
  font-size: 20px !important;
  font-weight: 700 !important;
  letter-spacing: -0.03em;
  color: #1f2933;
}
    .dp-planDesc { margin: 0 0 28px; font-size: 15px; line-height: 1.6; color: #74797f; min-height: 96px; }
    .dp-priceLine { display: flex; align-items: flex-end; gap: 2px; margin-bottom: 20px; }
    .dp-price {
      font-size: 42px !important;
      font-weight: 700 !important;
      letter-spacing: -0.04em !important;
      color: #1f2933 !important;
      line-height: 1 !important;
    }
    .dp-month {
  font-size: 13px !important;
  color: #7b8490 !important;
  margin-left: 4px;
  font-weight: 500;
}
    .dp-features { list-style: none; margin: 0 0 4px; padding: 0; display: flex; flex-direction: column; gap: 10px; min-height: 220px; }
    .dp-features li { display: flex; align-items: flex-start; gap: 10px; font-size: 15px; color: #2c3340; line-height: 1.25; }
    .dp-tick { flex-shrink: 0; font-size: 13px; font-weight: 800; color: #a8e000; margin-top: 1px; line-height: 1; }
    .dp-rule { height: 1px; background: rgba(10,10,10,0.08); margin: 22px 0 14px; }
    .dp-addonHeading { margin: 0 0 10px; font-size: 13px; font-weight: 600; color: #909299; letter-spacing: 0.01em; }
    .dp-addonList { display: flex; flex-direction: column; gap: 8px; }
    .dp-addonItem { display: grid; grid-template-columns: 18px 1fr auto; align-items: start; gap: 10px; padding: 10px 10px; border: 1px solid rgba(10,10,10,0.09); border-radius: 8px; background: rgba(255,255,255,0.5); cursor: pointer; transition: border-color 0.15s ease, background 0.15s ease; }
    .dp-addonItem:hover { border-color: rgba(10,10,10,0.16); background: rgba(255,255,255,0.7); }
    .dp-addonChecked { border-color: rgba(200,240,0,0.75) !important; background: rgba(200,240,0,0.06) !important; }
    .dp-checkbox { width: 16px; height: 16px; margin-top: 2px; border: 1.5px solid rgba(10,10,10,0.2); border-radius: 4px; background: rgba(255,255,255,0.8); display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
    .dp-checkboxChecked { border-color: #a8e000; background: #c8f000; }
    .dp-addonCopy { min-width: 0; display: flex; flex-direction: column; gap: 3px; }
    .dp-addonCopy strong { font-size: 13px; font-weight: 800; letter-spacing: -0.02em; color: #0a0a0a; line-height: 1.15; }
    .dp-addonCopy small { font-size: 12px; color: #8c929b; line-height: 1.4; }
    .dp-addonPrice { font-size: 12px; font-weight: 600; color: #5c6370; white-space: nowrap; margin-top: 2px; }
    .dp-upgradeBtn { width: 100%; min-height: 42px; margin-top: 24px; border-radius: 8px; border: 1px solid rgba(10,10,10,0.14); background: rgba(244,242,232,0.85); color: #050505; font-size: 15px; font-weight: 800; font-family: 'Barlow', sans-serif; letter-spacing: -0.01em; cursor: pointer; transition: background 0.15s ease, border-color 0.15s ease; }
    .dp-upgradeBtn:hover { background: #ffffff; border-color: rgba(10,10,10,0.22); }
    .dp-primaryBtn { border-color: #c8f000; background: #c8f000; }
    .dp-primaryBtn:hover { background: #b8dc00; border-color: #b8dc00; }
    @media (max-width: 1280px) { .dp-cardGrid { gap: 18px; } .dp-card { padding: 24px 20px 20px; } }
    @media (max-width: 1024px) { .dp-bundleGrid { grid-template-columns: 1fr; } }
    @media (max-width: 860px) { .dp-cardGrid { grid-template-columns: 1fr; gap: 16px; } .dp-planDesc, .dp-features { min-height: auto; } }
    @media (max-width: 520px) { .dp-groupHeader h2 { font-size: 24px; } .dp-planName { font-size: 20px; } .dp-price { font-size: 42px; } }

  `

  // Chart polyline points
  const pts1 = [0,0,3,2,3,0,1,3,2,3,0,1,3,2,3].map((v,i) => `${i*(600/14)},${130-v*35}`).join(' ')
  const pts2 = [1,2,1,3,1,2,3,1,3,1,2,3,1,3,1].map((v,i) => `${i*(600/14)},${130-v*22}`).join(' ')

  return (
    <>
      <style>{CSS}</style>

      {/* WELCOME MODAL */}
      {showWelcome && (
        <div className="wm-ov">
          <div className="wm">
            <div className="wm-l">
              <div className="wm-g">
                <div className="wm-gi"><Ic d={IC.star} s={13} /></div>
                <span className="wm-gl">Platform Guide</span>
              </div>
              {WELCOME_STEPS.map((step, i) => (
                <div className="wm-step" key={step.title}>
                  <div className={`wm-sd${i === welcomeIdx ? ' on' : ''}`} />
                  <span className={`wm-sl${i === welcomeIdx ? ' on' : ''}`}>{step.title}</span>
                </div>
              ))}
            </div>
            <div className="wm-r">
              <div className="wm-tag"><div style={{ width: 6, height: 6, background: '#c8f000', borderRadius: '50%' }} /> DASHBOARD TOUR</div>
              <div className="wm-prog">{WELCOME_STEPS.map((_, i) => <div key={i} className={`wm-pd${i <= welcomeIdx ? ' on' : ''}`} onClick={() => setWelcomeIdx(i)} />)}</div>
              <div className="wm-cnt">{welcomeIdx + 1} / {WELCOME_STEPS.length}</div>
              <div className="wm-title">{WELCOME_STEPS[welcomeIdx].title}</div>
              <div className="wm-desc">{WELCOME_STEPS[welcomeIdx].desc}</div>
              <div className="wm-acts">
                <button className="wm-skip" onClick={() => setShowWelcome(false)}>Skip tour</button>
                <button className="wm-cont" onClick={() => welcomeIdx < WELCOME_STEPS.length - 1 ? setWelcomeIdx(welcomeIdx + 1) : setShowWelcome(false)}>
                  {welcomeIdx < WELCOME_STEPS.length - 1 ? 'Continue →' : 'Finish tour →'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* WIDGET MODAL */}
      {showWidgetModal && (
        <div className="wdg-ov" onClick={() => setShowWidgetModal(false)}>
          <div className="wdg" onClick={e => e.stopPropagation()}>
            <button className="wdg-x" onClick={() => setShowWidgetModal(false)}>✕</button>
            <div className="wdg-t">Customize Your Dashboard</div>
            <div className="wdg-s">Show or hide widgets to personalize your dashboard experience</div>
            <div className="wdg-grid">
              {[
                { k: 'performance', ic: IC.trend, n: 'LinkedIn Performance', d: 'Track your LinkedIn metrics in real-time' },
                { k: 'quota', ic: IC.zap, n: 'Daily Quota', d: 'Monitor your daily action limits' },
                { k: 'streak', ic: IC.cal, n: 'Activity Streak', d: 'Track your consistency' },
                { k: 'topPerformers', ic: IC.target, n: 'Top Performers', d: 'Your most engaged prospects' },
              ].map(w => (
                <div key={w.k} className={`wi${!widgets[w.k] ? ' off' : ''}`} onClick={() => setWidgets(ww => ({ ...ww, [w.k]: !ww[w.k] }))}>
                  <span className="wi-eye"><Ic d={IC.eye} s={14} /></span>
                  <div className="wi-ic"><Ic d={w.ic} s={16} /></div>
                  <div className="wi-n">{w.n}</div>
                  <div className="wi-d">{w.d}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      <div className="app">
        {/* ── SIDEBAR ── */}
        <aside
          className={`sb${collapsed ? ' col' : ''}`}
          onMouseEnter={() => setHoveringSidebar(true)}
          onMouseLeave={() => setHoveringSidebar(false)}
        >
          <div className="sb-logo" onClick={() => setSidebarExpanded(!sidebarExpanded)} style={{ cursor: 'pointer' }}>
            <div className="sb-logo-mark"><Logo compact /></div>
            <div className="sb-logo-text">LINKZIY</div>
          </div>

          <nav className="sb-nav">
            <div className={`sb-item${view === 'overview' ? ' on' : ''}`} data-tip="Dashboard" onClick={() => go('overview')}>
              <span className="sb-ic"><Ic d={IC.dash} s={16} /></span>
              <span className="sb-lbl">Dashboard</span>
            </div>

            <div className="sb-sec">Inbox</div>
            <div className="sb-item lk" data-tip="LinkedIn Inbox">
              <span className="sb-ic"><Ic d={IC.inbox} s={16} /></span>
              <span className="sb-lbl">LinkedIn Inbox</span>
              <span className="sb-soon">Soon</span>
            </div>

            <div className="sb-sec">Outreach</div>
            <div className={`sb-item${view === 'prospects' ? ' on' : ''}`} data-tip="Prospects" onClick={() => go('prospects')}>
              <span className="sb-ic"><Ic d={IC.prospects} s={16} /></span>
              <span className="sb-lbl">Prospects</span>
            </div>
            <div className={`sb-item${view === 'campaigns' ? ' on' : ''}`} data-tip="Sequences" onClick={() => go('campaigns')}>
              <span className="sb-ic"><Ic d={IC.seqs} s={16} /></span>
              <span className="sb-lbl">Sequences</span>
            </div>
            <div className={`sb-item${view === 'analytics' ? ' on' : ''}`} data-tip="Campaign Analytics" onClick={() => go('analytics')}>
              <span className="sb-ic"><Ic d={IC.cmpAnl} s={16} /></span>
              <span className="sb-lbl">Campaign Analytics</span>
            </div>

            <div className="sb-sec">Engagement</div>
            <div className="sb-item lk" data-tip="Profile Manager">
              <span className="sb-ic"><Ic d={IC.profMgr} s={16} /></span>
              <span className="sb-lbl">Profile Manager</span>
              <span className="sb-soon">Soon</span>
            </div>
            <div className="sb-item lk" data-tip="Post Generator">
              <span className="sb-ic"><Ic d={IC.postGen} s={16} /></span>
              <span className="sb-lbl">Post Generator</span>
              <span className="sb-soon">Soon</span>
            </div>
            <div className="sb-item lk" data-tip="Upcoming Posts">
              <span className="sb-ic"><Ic d={IC.upcoming} s={16} /></span>
              <span className="sb-lbl">Upcoming Posts</span>
              <span className="sb-soon">Soon</span>
            </div>
            <div className="sb-item lk" data-tip="Post Analytics">
              <span className="sb-ic"><Ic d={IC.postAnl} s={16} /></span>
              <span className="sb-lbl">Post Analytics</span>
              <span className="sb-soon">Soon</span>
            </div>

            <div className="sb-sec">System</div>
            <div className={`sb-item${view === 'workspace_analytics' ? ' on' : ''}`} data-tip="Analytics" onClick={() => go('workspace_analytics')}>
              <span className="sb-ic"><Ic d={IC.analytics} s={16} /></span>
              <span className="sb-lbl">Analytics</span>
            </div>
            <div className={`sb-item${view === 'safety' ? ' on' : ''}`} data-tip="Account Safety" onClick={() => go('safety')}>
              <span className="sb-ic"><Ic d={IC.safety} s={16} /></span>
              <span className="sb-lbl">Account Safety</span>
            </div>
            <div className={`sb-item${view === 'audit' ? ' on' : ''}`} data-tip="Audit Logs" onClick={() => go('audit')}>
              <span className="sb-ic"><Ic d={IC.audit} s={16} /></span>
              <span className="sb-lbl">Audit Logs</span>
            </div>
            <div className={`sb-item${view === 'settings' ? ' on' : ''}`} data-tip="Settings" onClick={() => go('settings')}>
              <span className="sb-ic"><Ic d={IC.settings} s={16} /></span>
              <span className="sb-lbl">Settings</span>
            </div>
            <div className={`sb-item${view === 'pricing' ? ' on' : ''}`} data-tip="Pricing" onClick={() => go('pricing')}>
              <span className="sb-ic"><Ic d={IC.pricing} s={16} /></span>
              <span className="sb-lbl">Pricing</span>
            </div>
          </nav>

          <div className="sb-bottom">
            <div className="sb-user" onClick={() => go('settings')}>
              <div className="sb-av">{ui}</div>
              <div className="sb-uinfo">
                <div className="sb-uname">{user.name}</div>
                <div className="sb-urole">User</div>
              </div>
            </div>
            <div className="trial-blk">
              <div className="trial-inner">
                <div className="trial-top">
                  <span className="trial-lbl">Free Trial</span>
                  <span className="trial-badge">FREE</span>
                </div>
                <div className="trial-days">7 days left</div>
                <div className="trial-bar"><div className="trial-fill" /></div>
                <button className="btn-up" onClick={() => go('pricing')}>Upgrade Plan →</button>
              </div>
            </div>
          </div>
        </aside>

        {/* ── MAIN ── */}
        <div className="main">
          {/* TOPBAR */}
          <div className="tb">
            <div className="tb-ws" onClick={() => go('overview')}>
              <div className="tb-ws-av">{ui}</div>
              {uf}'s Workspace
              <span style={{ color: '#aaa', display: 'flex' }}><Ic d={IC.chevD} s={12} /></span>
            </div>
            <div className="tb-right">
              <div className="tb-info">
                <div className="tb-name">{user.name}</div>
                <div className="tb-role">User</div>
              </div>
              <div className="tb-av" onClick={() => go('settings')}>{ui}</div>
              <div className="tb-bell">
                <Ic d={IC.bell} s={15} />
                <span className="bell-dot" />
              </div>
            </div>
          </div>

          {/* ══ OVERVIEW ══ */}
          {view === 'overview' && (
            <div className="dc">
              <PageHeader
                tag="DASHBOARD"
                title={`HELLO ${uf.toUpperCase()},`}
                subtitle="Welcome to dashboard"
                action={
                  <>
                    <div className="rw">
                      <div className="rbtn" onClick={() => setShowRangeMenu(!showRangeMenu)}>
                        <span>{timeRange}</span>
                        <span style={{ color: '#aaa', display: 'flex' }}><Ic d={IC.chevD} s={12} /></span>
                      </div>
                      {showRangeMenu && (
                        <div className="rmenu">
                          {['Today', 'Last 7 days', 'Last 30 days', 'Last 90 days'].map(r => (
                            <div key={r} className={`ropt${r === timeRange ? ' sel' : ''}`} onClick={() => { setTimeRange(r); setShowRangeMenu(false) }}>
                              {r} {r === timeRange && <span style={{ color: '#c8f000' }}>✓</span>}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                    <button className="btn-cw" onClick={() => setShowWidgetModal(true)}>+ Customize Widgets</button>
                  </>
                }
              />

              {/* LinkedIn Outreach Banner */}
              <div className="ob">
                <div className="ob-left">
                  <div className="ob-head">
                    <span className="ob-inb">in</span>
                    <span className="ob-title">LinkedIn Outreach</span>
                    <span className="ob-info">i</span>
                    <span className="ob-live">Live</span>
                  </div>
                  <div className="ob-row">
                    <div className="ob-ic"><Ic d={IC.send} s={15} /></div>
                    <div><div className="ob-lbl">Messages sent</div><div className="ob-val">0</div></div>
                  </div>
                  <div className="ob-row">
                    <div className="ob-ic"><Ic d={IC.msg} s={15} /></div>
                    <div><div className="ob-lbl">Replies received</div><div className="ob-val">0</div></div>
                  </div>
                  <div className="ob-row">
                    <div className="ob-ic"><Ic d={IC.trend} s={15} /></div>
                    <div><div className="ob-lbl">Response rate</div><div className="ob-val">0%</div></div>
                  </div>
                </div>
                <div className="ob-circle">0%</div>
              </div>

              {/* Profile + LinkedIn Performance */}
              <div className="g12">
                <div className="cd">
                  <div className="cd-hd">
                    <div className="cd-tl">
                      <span className="cd-t">Your profile</span>
                      <span className="cd-i">i</span>
                    </div>
                  </div>
                  <div className="pc-wrap">
                    <div className="pc-ring">
                      <div className="pc-inner">{ui}</div>
                      <div className="pc-li">in</div>
                    </div>
                    <div className="pc-name">{user.name}</div>
                    <div className="pc-role">LinkedIn User</div>
                    <div className="pc-stats">
                      <div className="pc-stat"><div className="pc-sv">0</div><div className="pc-sl">Connections</div></div>
                      <div className="pc-stat"><div className="pc-sv">0</div><div className="pc-sl">Pending</div></div>
                    </div>
                  </div>
                </div>

                {widgets.performance && (
                  <div className="cd">
                    <div className="cd-hd">
                      <div className="cd-tl">
                        <span className="ob-inb" style={{ fontSize: 10 }}>in</span>
                        <span className="cd-t">LinkedIn Performance</span>
                        <span className="cd-i">i</span>
                      </div>
                      <span className="cd-b">Today</span>
                    </div>
                    <div className="pg">
                      <div className="pm">
                        <div className="pm-ic"><Ic d={IC.send} s={20} /></div>
                        <div className="pm-v">0</div>
                        <div className="pm-l">Today's Requests</div>
                      </div>
                      <div className="pm">
                        <div className="pm-ic"><Ic d={IC.msg} s={20} /></div>
                        <div className="pm-v">0</div>
                        <div className="pm-l">Replies Received</div>
                        <div className="pm-s">0% rate</div>
                      </div>
                      <div className="pm">
                        <div className="pm-ic"><Ic d={IC.cmpAnl} s={20} /></div>
                        <div className="pm-v">0</div>
                        <div className="pm-l">Active Campaigns</div>
                      </div>
                    </div>
                    <div className="live-row">
                      <div className="live-lbl"><div className="live-dot" /> Live tracking active</div>
                      <div className="live-r">0 actions today</div>
                    </div>
                  </div>
                )}
              </div>

              {/* Prospecting Status + Connection Requests Trend */}
              <div className="g21">
                <div className="cd">
                  <div className="ps-hd">
                    <div className="ps-t">Prospecting status <span className="cd-i">i</span></div>
                    <span className="badge-run">Running</span>
                  </div>
                  <div className="ps-item">
                    <div className="ps-ic"><Ic d={IC.seqs} s={16} /></div>
                    <span className="ps-v">0</span>
                    <span className="ps-lb">Active campaigns</span>
                  </div>
                  <div className="ps-item">
                    <div className="ps-ic"><Ic d={IC.users2} s={16} /></div>
                    <span className="ps-v">0</span>
                    <span className="ps-lb">Queued actions</span>
                  </div>
                  <button className="ps-btn" onClick={() => go('campaigns')}><Ic d={IC.seqs} s={14} /> See my campaigns</button>
                </div>
                <div className="cd">
                  <div className="cd-hd">
                    <div className="cd-tl">
                      <span className="cd-t">Connection Requests Trend</span>
                      <span className="cd-i">i</span>
                    </div>
                    <span className="cd-b">Today</span>
                  </div>
                  <div className="ch-area">
                    <svg width="100%" height="130" viewBox="0 0 600 130" preserveAspectRatio="none">
                      <defs>
                        <linearGradient id="g1" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="#c8f000" stopOpacity="0.15" />
                          <stop offset="100%" stopColor="#c8f000" stopOpacity="0" />
                        </linearGradient>
                      </defs>
                      {/* Y axis grid */}
                      {[0,0.5,1,1.5,2].map((v,i) => (
                        <line key={i} x1="0" y1={130 - v * 50} x2="600" y2={130 - v * 50} stroke="rgba(255,255,255,0.05)" strokeWidth="1" />
                      ))}
                      <polyline fill="none" stroke="#c8f000" strokeWidth="2" points={pts1} />
                      <polyline fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth="1.5" strokeDasharray="4,4" points={pts2} />
                    </svg>
                  </div>
                  <div className="ch-dates">{DATES.map(d => <div key={d} className="ch-date">{d}</div>)}</div>
                </div>
              </div>

              {/* Bottom row */}
              <div className="g3">
                <div className="lcol">
                  {widgets.quota && (
                    <div className="cd">
                      <div className="qc-ic"><Ic d={IC.zap} s={20} /></div>
                      <div className="qc-t">Daily Quota Usage <span className="cd-i">i</span></div>
                      <div className="qc-row">
                        <div className="qc-rh"><span className="qc-lb">Connections</span><span className="qc-rv">0 / 20</span></div>
                        <div className="qc-bar" />
                      </div>
                      <div className="qc-row">
                        <div className="qc-rh"><span className="qc-lb">Messages</span><span className="qc-rv">0 / 50</span></div>
                        <div className="qc-bar" />
                      </div>
                    </div>
                  )}
                  {widgets.streak && (
                    <div className="cd">
                      <span className="str-badge">Keep it up!</span>
                      <div className="str-ic"><Ic d={IC.cal} s={20} /></div>
                      <div className="str-t">Activity Streak <span className="cd-i">i</span></div>
                      <div className="str-v">0<span className="str-u">days</span></div>
                      <div className="str-s">Longest: 0 days</div>
                    </div>
                  )}
                </div>

                <div className="tc">
                  <div className="tc-hd">
                    <div className="tc-tb">
                      <div className="tc-ib"><Ic d={IC.star} s={18} /></div>
                      <div>
                        <div className="tc-tt">Product Tour</div>
                        <div className="tc-ts">Explore what you can do in Linkziy</div>
                      </div>
                    </div>
                    <div className="tc-nav">
                      <button className="tc-nb" onClick={() => setTourIdx((tourIdx - 1 + TOUR_SLIDES.length) % TOUR_SLIDES.length)}>‹</button>
                      <button className="tc-nb" onClick={() => setTourIdx((tourIdx + 1) % TOUR_SLIDES.length)}>›</button>
                    </div>
                  </div>
                  <div className="t-tag">{slide.tag}</div>
                  <div className="t-ft">{slide.title}</div>
                  <div className="t-ds">{slide.desc}</div>
                  <ul className="t-bul">{slide.bullets.map(b => <li key={b}><div className="tbdot" />{b}</li>)}</ul>
                  <button className="btn-tour" onClick={() => slide.ctaView && go(slide.ctaView)}>{slide.cta}</button>
                  <div className="t-dots">{TOUR_SLIDES.map((_, i) => <div key={i} className={`tdot${i === tourIdx ? ' on' : ''}`} onClick={() => setTourIdx(i)} />)}</div>
                </div>

                {widgets.topPerformers && (
                  <div className="cd">
                    <div className="tp-hd">
                      <div className="tp-ib"><Ic d={IC.target} s={18} /></div>
                      <div className="tp-t">Top Performers</div>
                      <span className="cd-i" style={{ marginLeft: 4 }}>i</span>
                    </div>
                    <div className="tp-empty">
                      <div className="tp-ei"><Ic d={IC.users2} s={22} /></div>
                      <div className="tp-et">No prospects yet</div>
                      <div className="tp-es">Add prospects to see top performers</div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* ══ PROSPECTS ══ */}
          {view === 'prospects' && (
            <div className="dc">
              <PageHeader
                tag="PROSPECTS"
                title="PROSPECT INTELLIGENCE"
                subtitle="Manage your outreach lists and target campaigns"
                action={<button className="btn-p">+ Create New List</button>}
              />
              <div className="ebox">
                <div className="eic"><Ic d={IC.users2} s={28} /></div>
                <div className="et">NO LISTS YET</div>
                <div className="es">Create your first list to start managing prospects</div>
                <button className="btn-p">+ Create My First List</button>
              </div>
            </div>
          )}

          {/* ══ SEQUENCES ══ */}
          {view === 'campaigns' && (
            <div className="dc">
              <PageHeader
                tag="SEQUENCES"
                title="CAMPAIGNS"
                subtitle="Manage your automated Linkziy sequences"
                action={<button className="btn-p">+ New Campaign</button>}
              />
              <div className="ebox">
                <div className="eic"><Ic d={IC.seqs} s={28} /></div>
                <div className="et">NO CAMPAIGNS YET</div>
                <div className="es">Create your first campaign to start automating outreach at scale</div>
                <button className="btn-p">+ New Campaign</button>
              </div>
            </div>
          )}

          {/* ══ CAMPAIGN ANALYTICS ══ */}
          {view === 'analytics' && (
            <div className="dc">
              <PageHeader
                tag="ANALYTICS"
                title="CAMPAIGN ANALYTICS"
                subtitle="Track performance for each active outreach campaign."
              />
              <div className="ca-tag">IN PROGRESS</div>
              <div className="ca-empty-box">
                <div className="ca-ei"><Ic d={IC.cmpAnl} s={26} /></div>
                <div className="ca-et">No active campaigns</div>
                <div className="ca-es">Save and activate a sequence in the campaign builder to start tracking analytics here.</div>
                <button className="btn-p" onClick={() => go('campaigns')}>+ Create Campaign</button>
              </div>
            </div>
          )}

          {/* ══ WORKSPACE ANALYTICS ══ */}
          {view === 'workspace_analytics' && (
            <div className="dc">
              <PageHeader
                tag="WORKSPACE"
                title="WORKSPACE PERFORMANCE"
                subtitle="Real-time overview of the entire team's efforts"
                action={
                  <>
                    <div style={{ padding: '7px 12px', border: '1px solid #e5e2d9', borderRadius: 8, fontSize: 13, fontWeight: 700, color: '#0a0a0a', background: '#fff', display: 'flex', alignItems: 'center', gap: 6, cursor: 'pointer' }}>
                      <Ic d={IC.prospects} s={14} /> {user.name} <Ic d={IC.chevD} s={11} />
                    </div>
                    <div style={{ padding: '7px 12px', border: '1px solid #e5e2d9', borderRadius: 8, fontSize: 13, fontWeight: 600, color: '#555', background: '#fff', display: 'flex', alignItems: 'center', gap: 6, cursor: 'pointer' }}>
                      Last 30 days <Ic d={IC.chevD} s={11} />
                    </div>
                    <button className="btn-o" style={{ fontSize: 12 }}>
                      Export Report <span style={{ background: '#c8f000', color: '#0a0a0a', fontSize: 9, padding: '2px 6px', borderRadius: 4, fontWeight: 800 }}>Add-on</span>
                    </button>
                  </>
                }
              />
              <div className="met-strip">
                {[['Invitations Sent','0'],['Total Accepted','0'],['1st Message Sent','0'],['Total Replies','0']].map(([l,v]) => (
                  <div className="mb" key={l}><div className="mb-l">{l}</div><div className="mb-v">{v}</div></div>
                ))}
              </div>
              <div className="met-strip">
                {[['Positive Leads','0'],['Prospects Engaged','0'],['Pending Actions','0'],['Acceptance Rate','0%']].map(([l,v]) => (
                  <div className="mb" key={l}><div className="mb-l">{l}</div><div className="mb-v">{v}</div></div>
                ))}
              </div>
              <div className="mb" style={{ marginBottom: 16, display: 'inline-block', minWidth: 200 }}>
                <div className="mb-l">Reply Rate</div><div className="mb-v">0%</div>
              </div>
              <div className="tab-strip">
                {['Overview','Content Performance','Outreach Performance'].map((t,i) => (
                  <div key={t} className={`tab-i${i===0?' on':''}`}>{t}</div>
                ))}
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, marginBottom: 14 }}>
                <div className="cl"><div style={{ fontWeight: 800, marginBottom: 14, fontSize: 15 }}>Linkziy Funnel</div><div style={{ fontSize: 13, color: '#aaa', textAlign: 'center', padding: '40px 20px' }}>No funnel data yet — start a campaign</div></div>
                <div className="cl">
                  <div style={{ fontWeight: 800, marginBottom: 12, fontSize: 15 }}>Status Breakdown</div>
                  <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginBottom: 10 }}>
                    {[['#0a0a0a','Connected'],['#c8f000','1st Message Sent'],['#22c55e','Follow-up'],['#888','Replied'],['#3b82f6','Positive'],['#ccc','Not Interested']].map(([c,l]) => (
                      <div key={l} style={{ display:'flex',alignItems:'center',gap:5,fontSize:11.5,color:'#666' }}><div style={{ width:8,height:8,borderRadius:'50%',background:c }}/>{l}</div>
                    ))}
                  </div>
                  <div style={{ fontSize: 13, color: '#aaa', textAlign: 'center', padding: '30px 20px' }}>No data yet</div>
                </div>
              </div>
              <div className="cl" style={{ marginBottom: 14 }}><div style={{ fontWeight: 800, marginBottom: 12, fontSize: 15 }}>Recent Activity</div><div style={{ fontSize: 13.5, color: '#aaa', fontStyle: 'italic', padding: '20px 0' }}>No recent activity found.</div></div>
              <div className="cl">
                <div style={{ fontWeight: 800, marginBottom: 14, fontSize: 15 }}>Active Sequence Performance</div>
                <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr', borderTop: '1px solid #f0ede8' }}>
                  {['SEQUENCE NAME','ACTIVE PROSPECTS','ENGAGEMENT'].map(h => (
                    <div key={h} style={{ fontSize: 11, fontWeight: 800, letterSpacing: '0.08em', color: '#bbb', padding: '10px 0', borderBottom: '1px solid #f0ede8' }}>{h}</div>
                  ))}
                </div>
                <div style={{ fontSize: 13.5, color: '#aaa', textAlign: 'center', padding: '28px 0' }}>No active sequences found.</div>
              </div>
            </div>
          )}

          {/* ══ ACCOUNT SAFETY ══ */}
          {view === 'safety' && (
            <div className="dc">
              <PageHeader
                tag="SAFETY"
                title="ACCOUNT SAFETY"
                subtitle="Daily quotas, limits, and LinkedIn warm-up protection"
                action={<button className="btn-ghost"><Ic d={IC.refresh} s={14} /> Refresh</button>}
              />

              {/* Connect notice */}
              <div style={{ background: '#fff', border: '1px solid #e5e2d9', borderRadius: 10, padding: '12px 18px', marginBottom: 14, display: 'flex', alignItems: 'center', gap: 10, fontSize: 13, color: '#555' }}>
                Connect to LinkedIn to enable this service.
                <span style={{ color: '#1a6df0', fontWeight: 700, cursor: 'pointer' }} onClick={() => go('settings')}>Go to Settings</span>
              </div>

              {/* Today's Activity Quota */}
              <div className="cl" style={{ marginBottom: 14 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 22 }}>
                  <div style={{ width: 46, height: 46, background: '#f4f1eb', borderRadius: 11, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#c8f000' }}><Ic d={IC.zap} s={20} /></div>
                  <div>
                    <div style={{ fontSize: 15, fontWeight: 800 }}>Today's Activity Quota</div>
                    <div style={{ fontSize: 12.5, color: '#aaa' }}>Real-time usage against your daily limits</div>
                  </div>
                </div>
                {[
                  ['Messages Sent', IC.msg, '0 / 50'],
                  ['Connection Requests', IC.prospects, '0 / 20'],
                  ['Profile Visits', IC.eye, '0 / 50'],
                  ['Engagement (Likes / Comments)', IC.thumbUp, '0 / 30'],
                ].map(([l,ic,v]) => (
                  <div key={l}>
                    <div className="srow">
                      <div className="srow-l"><Ic d={ic} s={15} />{l}</div>
                      <div className="srow-r">{v}</div>
                    </div>
                    <div className="srow-bar"><div className="srow-fill" style={{ width: '0%' }} /></div>
                  </div>
                ))}
                <div className="s-legend">
                  {[['#22c55e','Safe (<60%)'],['#f59e0b','Caution (60–90%)'],['#ef4444','High (≥90%)']].map(([c,l]) => (
                    <div key={l} className="s-leg"><div className="s-dot" style={{ background: c }} />{l}</div>
                  ))}
                </div>
              </div>

              {/* Customize Daily Limits */}
              <div className="cl" style={{ marginBottom: 14 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 18 }}>
                  <div style={{ width: 38, height: 38, background: '#f4f1eb', borderRadius: 9, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#555' }}><Ic d={IC.safety} s={18} /></div>
                  <div>
                    <div style={{ fontSize: 15, fontWeight: 800 }}>Customize Daily Limits</div>
                    <div style={{ fontSize: 12.5, color: '#aaa' }}>Your limits will be capped at your plan maximum and warm-up cap when applicable.</div>
                  </div>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 22, marginBottom: 18 }}>
                  {[['Daily Messages','50'],['Daily Connection Requests','20']].map(([l,v]) => (
                    <div key={l}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 7, marginBottom: 8 }}>
                        <Ic d={l.includes('Message') ? IC.msg : IC.prospects} s={15} />
                        <div className="fl" style={{ margin: 0 }}>{l}</div>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                        <input className="fi" defaultValue={v} style={{ width: 90 }} />
                        <span style={{ fontSize: 13, color: '#666' }}>Effective: <strong>{v}</strong></span>
                      </div>
                    </div>
                  ))}
                </div>
                <button className="btn-save"><Ic d={IC.check} s={14} /> Save Limits</button>
                <span style={{ fontSize: 12.5, color: '#aaa', marginLeft: 12 }}>Changes take effect immediately for all new actions.</span>
              </div>

              {/* LinkedIn Warm-Up Status */}
              <div className="cl">
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 14 }}>
                  <div className="warm-ic"><Ic d={IC.trend} s={18} /></div>
                  <div>
                    <div className="warm-hd" style={{ marginBottom: 2 }}>LinkedIn Warm-Up Status</div>
                    <div className="warm-sub" style={{ marginBottom: 0 }}>Automatically enforced based on when your LinkedIn account was connected. Keeps your account safe from LinkedIn's spam detection.</div>
                  </div>
                </div>
                <div className="warm-msg" style={{ marginBottom: 14 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }}>
                    <Ic d={IC.safety} s={15} />
                    Connect your LinkedIn account to enable automatic warm-up protection.
                  </div>
                </div>
                <div style={{ background: '#f9f8f4', border: '1px solid #e5e2d9', borderRadius: 10, padding: 16 }}>
                  <div style={{ fontSize: 12, fontWeight: 800, color: '#888', textTransform: 'uppercase', letterSpacing: '0.07em', marginBottom: 10 }}>HOW WARM-UP WORKS</div>
                  <div className="warm-bullet">
                    {[
                      'Limits are automatically computed from your LinkedIn connection date — no manual setup needed.',
                      'During Week 1, messaging is fully disabled to protect against LinkedIn\'s new-account flags.',
                      'Warm-up caps override your configured limits if they\'re lower, and reset daily at midnight.',
                    ].map(b => (
                      <div key={b} className="warm-b"><div className="warm-bdot" />{b}</div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ══ AUDIT LOGS ══ */}
          {view === 'audit' && (
            <div className="dc">
              <PageHeader
                tag="AUDIT"
                title="AUDIT LOGS"
                subtitle="Review team activity history and security events."
              />

              <div className="astat">
                {[['TOTAL EVENTS','0'],['FILTERED RESULTS','0'],['LATEST EVENT','—']].map(([l,v]) => (
                  <div className="astat-b" key={l}><div className="astat-l">{l}</div><div className="astat-v">{v}</div></div>
                ))}
              </div>
              <div className="abar">
                <span style={{ color: '#aaa', display: 'flex' }}><Ic d={IC.search} s={15} /></span>
                <input className="asearch" placeholder="Search by user, action, or details..." />
                <select className="asel"><option>All Events</option></select>
                <button className="btn-exp"><Ic d={IC.filter} s={13} /></button>
                <button className="btn-exp"><Ic d={IC.download} s={13} /> Export CSV</button>
              </div>
              <div className="a-sort"><Ic d={IC.trend} s={13} /> Sorted by newest first</div>
              <div className="aempty">No audit logs found matching your filters.</div>
            </div>
          )}

          {/* ══ SETTINGS ══ */}
          {view === 'settings' && (
            <div className="dc">
              <PageHeader
                tag="SETTINGS"
                title="SETTINGS"
                subtitle="Manage your account, limits, and persona"
                action={<button className="btn-save"><Ic d={IC.check} s={14} /> Save All Changes</button>}
              />

              <div className="sg">
                {/* Left: profile card */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                  <div className="sp">
                    <div className="prof-hd" />
                    <div className="prof-bd">
                      <div className="prof-av-wrap">
                        <div className="prof-av">{ui}</div>
                      </div>
                      <div className="prof-name">{user.name}</div>
                      <div className="prof-meta">@{user.email?.split('@')[0]} · Free Plan</div>
                      <div className="prof-stats">
                        {[['0','Prospects'],['0','Campaigns'],['7','Days Left']].map(([v,l]) => (
                          <div key={l} className="prof-stat">
                            <div className="prof-sv">{v}</div>
                            <div className="prof-sl">{l}</div>
                          </div>
                        ))}
                      </div>
                      <div className="prof-plan">
                        <div className="prof-plan-top">
                          <span className="prof-plan-t">Starter Plan</span>
                          <span className="prof-plan-badge">Free</span>
                        </div>
                        <div className="prof-plan-sub">7 of 14 trial days remaining</div>
                        <div className="prof-bar"><div className="prof-bar-fill" /></div>
                        <button className="btn-p" style={{ width: '100%', justifyContent: 'center' }} onClick={() => go('pricing')}>Upgrade Plan →</button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right: tabbed settings */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
                  <div className="sp">
                    <div className="stab-strip">
                      {['LinkedIn','Billing','Team','Persona','Integrations','Notifications','Post Generator','Account'].map(t => (
                        <div key={t} className={`stab${settingsTab === t ? ' on' : ''}`} onClick={() => setSettingsTab(t)}>{t}</div>
                      ))}
                    </div>

                    {settingsTab === 'LinkedIn' && (
                      <div style={{ padding: 20 }}>
                        {/* LinkedIn Connection */}
                        <div className="li-conn">
                          <div className="li-conn-hd">
                            <div>
                              <div className="li-conn-t">LinkedIn Connection</div>
                              <div className="li-conn-s">Manage your LinkedIn account integration</div>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                              <span style={{ fontSize: 12.5, color: '#aaa' }}>Not Connected</span>
                              <button className="btn-p">Connect LinkedIn</button>
                            </div>
                          </div>
                          <div className="li-no-conn">
                            <div className="li-no-ic"><Ic d={IC.liIcon} s={22} /></div>
                            <div className="li-no-t">No Account Connected</div>
                            <div className="li-no-s">Connect your LinkedIn account to enable automation.</div>
                          </div>
                        </div>

                        {/* Enable messaging */}
                        <div className="li-conn">
                          <div className="li-conn-hd">
                            <div>
                              <div className="li-conn-t">Enable messaging</div>
                              <div className="li-conn-s">Sign in with your LinkedIn credentials to enable inbox messaging in Linkziy.</div>
                            </div>
                            <button className="btn-p">Enable Messages</button>
                          </div>
                          <div style={{ fontSize: 13, color: '#aaa' }}>
                            Inbox messaging isn't linked yet — click <strong>Enable Messages</strong> to connect.
                          </div>
                        </div>

                        {/* Daily Action Limits */}
                        <div style={{ border: '1px solid #e5e2d9', borderRadius: 12, padding: 20 }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 18 }}>
                            <div style={{ width: 38, height: 38, background: '#f4f1eb', borderRadius: 9, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#555' }}><Ic d={IC.safety} s={18} /></div>
                            <div>
                              <div style={{ fontSize: 15, fontWeight: 800 }}>Daily Action Limits</div>
                              <div style={{ fontSize: 12.5, color: '#aaa' }}>Protect your LinkedIn account with smart rate limiting</div>
                            </div>
                          </div>
                          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 22, marginBottom: 16 }}>
                            {[['Daily connection requests','20'],['Daily messages','50']].map(([l,v]) => (
                              <div key={l}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                                  <span style={{ fontSize: 14, fontWeight: 600, color: '#444' }}>{l}</span>
                                  <span style={{ fontSize: 13, color: '#888' }}>{v} / day</span>
                                </div>
                                <input className="fi" defaultValue={v} style={{ width: 100 }} />
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}

                    {settingsTab === 'Notifications' && (
                      <div>
                        {[
                          { k:'email', t:'Email Notifications', s:'Receive updates and alerts via email' },
                          { k:'campaigns', t:'Campaign Activity', s:'Get notified when campaigns complete or need attention' },
                          { k:'weekly', t:'Weekly Digest', s:'A performance summary delivered every Monday' },
                        ].map(item => (
                          <div className="tr2" key={item.k} onClick={() => setNotifs(n => ({ ...n, [item.k]: !n[item.k] }))}>
                            <div><div className="tr-t">{item.t}</div><div className="tr-s">{item.s}</div></div>
                            <Toggle on={notifs[item.k]} />
                          </div>
                        ))}
                      </div>
                    )}

                    {settingsTab === 'Account' && (
                      <div>
                        <div className="sp-bd">
                          <div className="fr">
                            <div><div className="fl">Full Name</div>{editProfile ? <input className="fi" defaultValue={user.name}/> : <div className="fv">{user.name}</div>}</div>
                            <div><div className="fl">Email Address</div>{editProfile ? <input className="fi" type="email" defaultValue={user.email}/> : <div className="fv">{user.email}</div>}</div>
                          </div>
                        </div>
                        <div className="tr2" style={{ justifyContent: 'flex-start', gap: 12 }}>
                          <button className="bsm" onClick={() => setEditProfile(!editProfile)}>{editProfile ? 'Save Changes' : 'Edit Profile'}</button>
                          {editProfile && <button className="bsm" onClick={() => setEditProfile(false)}>Cancel</button>}
                        </div>
                        <div className="sp-hd" style={{ marginTop: 8 }}><div><div className="sp-t">Security</div><div className="sp-s">Password and authentication</div></div><button className="bsm">Change Password</button></div>
                        <div className="tr2"><div><div className="tr-t">Two-Factor Authentication</div><div className="tr-s">Add an extra layer of security</div></div><Toggle on={false} /></div>
                        <div className="dz" style={{ borderTop: '1px solid #f4f1eb', marginTop: 4 }}>
                          <div className="dz-t">Danger Zone</div>
                          <div className="dz-s">Permanently delete your account and all associated data. This cannot be undone.</div>
                          <button className="btn-danger">Delete My Account</button>
                        </div>
                      </div>
                    )}

                    {!['LinkedIn','Notifications','Account'].includes(settingsTab) && (
                      <div style={{ padding: '60px 30px', textAlign: 'center', color: '#aaa', fontSize: 14 }}>
                        <div style={{ fontSize: 32, marginBottom: 8 }}>🔧</div>
                        <div style={{ fontWeight: 700, marginBottom: 4, color: '#0a0a0a' }}>{settingsTab} Settings</div>
                        <div>This section is coming soon.</div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ══ PRICING ══ */}
          {view === 'pricing' && (
            <div className="dc">
              <PageHeader
                tag="PRICING"
                title="PRICING"
                subtitle="Choose the plan that fits your workflow"
              />

              <section className="dp-pricingPage">
                {DASHBOARD_PRICING_SECTIONS.map((section) => (
                  <div className="dp-pricingGroup" key={section.title}>
                    <div className="dp-groupHeader">
                      <h2>{section.title}</h2>
                      <p>{section.subtitle}</p>
                    </div>

                    <div className="dp-cardGrid">
                      {section.plans.map((plan) => (
                        <DashboardPlanCard key={plan.name} plan={plan} addons={section.addons} />
                      ))}
                    </div>
                  </div>
                ))}

                <div className="dp-pricingGroup">
                  <div className="dp-groupHeader">
                    <h2>{DASHBOARD_BUNDLE.title}</h2>
                    <p>{DASHBOARD_BUNDLE.subtitle}</p>
                  </div>

                  <div className="dp-bundleGrid">
                    <DashboardPlanCard plan={DASHBOARD_BUNDLE.plan} addons={DASHBOARD_BUNDLE.addons} />

                    <div className="dp-bundleNote">
                      <span className="dp-bestValue">Best value</span>
                      <h3>Everything together, without complicating your stack.</h3>
                      <p>
                        Use this plan when you want outreach, scheduling, AI, and leads in one simple workspace.
                        It keeps the clean Linkziy experience while giving you room to scale.
                      </p>
                    </div>
                  </div>
                </div>
              </section>
            </div>
          )}

        </div>
      </div>
    </>
  )
}