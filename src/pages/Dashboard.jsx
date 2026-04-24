import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Logo from "../components/Logo";

/* ── Tour slides data ── */
const TOUR_SLIDES = [
  {
    label: 'Prospect Intelligence',
    title: 'Build Targeted Outreach Lists',
    desc: 'Import leads from LinkedIn and organize them into smart lists for precise targeting.',
    bullets: ['Filter and segment by industry', 'Track status per prospect', 'Sync with active campaigns'],
    cta: 'Go to Prospects',
    ctaView: 'prospects',
  },
  {
    label: 'Post Generator',
    title: 'Write High-Quality LinkedIn Posts Faster',
    desc: 'Generate content in your tone with structured formats, then refine it into a publish-ready draft.',
    bullets: ['Guided + manual post creation', 'Consistent tone & structure', 'Drafts you can reuse and iterate on'],
    cta: 'Go to Post Generator',
    ctaView: null,
  },
  {
    label: 'Campaign Sequences',
    title: 'Automate Your Outreach Sequences',
    desc: 'Build multi-step campaigns with connection requests, messages, and timed follow-ups — all automated.',
    bullets: ['Drag & drop sequence builder', 'Smart personalization', 'Auto-schedule based on limits'],
    cta: 'Go to Sequences',
    ctaView: 'campaigns',
  },
  {
    label: 'Campaign Analytics',
    title: 'Track Every Touchpoint In Real Time',
    desc: 'Real-time dashboards for your active sequences — monitor replies, engagement, and daily action usage.',
    bullets: ['Live sequence monitoring', 'Engagement rate tracking', 'Daily action usage meter'],
    cta: 'View Analytics',
    ctaView: 'analytics',
  },
]

/* ── Nav items config ── */
const NAV_ITEMS = {
  outreach: [
    { id: 'prospects', label: 'Prospects', icon: '👥' },
    { id: 'campaigns', label: 'Sequences', icon: '🚀' },
    { id: 'analytics', label: 'Campaign Analytics', icon: '📊' },
  ],
  engagement: [
    { id: null, label: 'Profile Manager', icon: '👤', locked: true },
    { id: null, label: 'Post Generator', icon: '✍️', locked: true },
    { id: null, label: 'Upcoming Posts', icon: '🗓️', locked: true },
    { id: null, label: 'Post Analytics', icon: '📈', locked: true },
  ],
  system: [
    { id: null, label: 'Analytics', icon: '📉' },
    { id: null, label: 'Account Safety', icon: '🛡️' },
    { id: null, label: 'Audit Logs', icon: '📋' },
    { id: null, label: 'Settings', icon: '⚙️' },
    { id: 'pricing-dash', label: 'Pricing', icon: '💳' },
  ],
}

export default function Dashboard() {
  const [view, setView] = useState('overview')
  const [tourIdx, setTourIdx] = useState(0)
  const navigate = useNavigate()

  const slide = TOUR_SLIDES[tourIdx]

  function navTo(id) {
    if (id) setView(id)
  }

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Barlow+Condensed:wght@700;800;900&family=Barlow:wght@400;500;600;700&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        body { font-family: 'Barlow', sans-serif; overflow-x: hidden; cursor: auto !important; }

        .dash-layout {
          display: flex;
          min-height: 100vh;
          background: #f4f2e8;
        }

        /* SIDEBAR */
        .dash-sidebar {
          width: 260px;
          background: #0a0a0a;
          color: #fff;
          display: flex;
          flex-direction: column;
          height: 100vh;
          position: sticky;
          top: 0;
          flex-shrink: 0;
          overflow-y: auto;
        }

        

        

        .sidebar-nav { flex: 1; padding: 16px 10px; }

        .nav-section-label {
          font-size: 9.5px;
          font-weight: 800;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.28);
          padding: 0 10px;
          margin-bottom: 5px;
          margin-top: 18px;
        }

        .nav-item {
          display: flex;
          align-items: center;
          gap: 9px;
          padding: 9px 12px;
          border-radius: 8px;
          font-size: 13.5px;
          font-weight: 500;
          color: rgba(255,255,255,0.55);
          cursor: pointer;
          transition: all 0.18s;
          position: relative;
          user-select: none;
        }

        .nav-item:hover:not(.locked) {
          background: rgba(255,255,255,0.06);
          color: rgba(255,255,255,0.9);
        }

        .nav-item.active {
          background: rgba(200,240,0,0.12);
          color: #c8f000;
        }

        .nav-item.locked { cursor: default; opacity: 0.5; }

        .nav-icon { font-size: 14px; flex-shrink: 0; }

        .lock-icon {
          margin-left: auto;
          font-size: 11px;
          opacity: 0.4;
        }

        .sidebar-footer {
          padding: 14px 10px;
          border-top: 1px solid rgba(255,255,255,0.06);
        }

        .trial-box {
          background: rgba(255,255,255,0.05);
          border-radius: 10px;
          padding: 14px;
        }

        .trial-header {
          display: flex;
          align-items: center;
          gap: 7px;
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.6);
          margin-bottom: 6px;
        }

        .trial-days {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 28px;
          color: #fff;
          line-height: 1;
          margin-bottom: 8px;
        }

        .trial-days span {
          font-family: 'Barlow', sans-serif;
          font-size: 13px;
          font-weight: 400;
          color: rgba(255,255,255,0.45);
        }

        .trial-bar {
          height: 4px;
          background: rgba(255,255,255,0.1);
          border-radius: 2px;
          margin-bottom: 12px;
          overflow: hidden;
        }

        .trial-bar-fill {
          height: 100%;
          width: 75%;
          background: #c8f000;
          border-radius: 2px;
        }

        .btn-upgrade {
          width: 100%;
          padding: 9px;
          background: #c8f000;
          color: #0a0a0a;
          border: none;
          border-radius: 7px;
          font-size: 12.5px;
          font-weight: 800;
          font-family: 'Barlow', sans-serif;
          cursor: pointer;
          transition: background 0.2s;
          letter-spacing: 0.3px;
        }

        .btn-upgrade:hover { background: #b8dc00; }

        /* MAIN */
        .dash-main { flex: 1; overflow-y: auto; min-width: 0; }

        .dash-topbar {
          background: #fff;
          border-bottom: 1px solid #e8e5de;
          padding: 13px 26px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          position: sticky;
          top: 0;
          z-index: 50;
        }

        .workspace-pill {
          display: flex;
          align-items: center;
          gap: 9px;
          background: #f4f2e8;
          border: 1px solid #e0ddd5;
          border-radius: 8px;
          padding: 8px 14px;
          cursor: pointer;
          font-size: 14px;
          font-weight: 600;
          color: #0a0a0a;
          transition: border-color 0.2s;
        }

        .workspace-pill:hover { border-color: #c8f000; }

        .w-avatar {
          width: 26px;
          height: 26px;
          background: #0a0a0a;
          color: #c8f000;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: 'Bebas Neue', sans-serif;
          font-size: 11px;
        }

        .topbar-right {
          display: flex;
          align-items: center;
          gap: 14px;
        }

        .user-info { text-align: right; }
        .user-name { font-size: 14px; font-weight: 700; color: #0a0a0a; }
        .user-role { font-size: 10.5px; color: #aaa; text-transform: uppercase; letter-spacing: 0.06em; }

        .user-avatar {
          width: 36px;
          height: 36px;
          background: #0a0a0a;
          color: #c8f000;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: 'Bebas Neue', sans-serif;
          font-size: 14px;
          cursor: pointer;
        }

        .notif-btn {
          background: none;
          border: none;
          cursor: pointer;
          color: #999;
          padding: 4px;
          font-size: 18px;
          line-height: 1;
          transition: color 0.2s;
        }

        .notif-btn:hover { color: #0a0a0a; }

        /* CONTENT */
        .dash-content { padding: 24px 26px 60px; }

        .page-header {
          background: #fff;
          border: 1px solid #e8e5de;
          border-radius: 12px;
          padding: 22px 26px;
          margin-bottom: 20px;
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
        }

        .page-title {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 32px;
          letter-spacing: 0.5px;
          color: #0a0a0a;
          margin-bottom: 3px;
        }

        .page-sub { font-size: 13.5px; color: #888; }

        .page-badge {
          display: inline-block;
          background: #f0ede6;
          border: 1px solid #e0ddd5;
          color: #666;
          font-size: 10.5px;
          font-weight: 800;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          padding: 4px 10px;
          border-radius: 6px;
          margin-bottom: 10px;
        }

        /* METRICS */
        .metrics-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 14px;
          margin-bottom: 18px;
        }

        .metric-card {
          background: #fff;
          border: 1px solid #e8e5de;
          border-radius: 12px;
          padding: 22px;
          position: relative;
          overflow: hidden;
          transition: border-color 0.2s;
        }

        .metric-card:hover { border-color: #c8f000; }

        .metric-badge {
          position: absolute;
          top: 14px;
          right: 14px;
          font-size: 9.5px;
          font-weight: 800;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          padding: 3px 8px;
          border-radius: 100px;
        }

        .badge-live { background: rgba(34,197,94,0.1); color: #16a34a; }
        .badge-track { background: rgba(200,240,0,0.15); color: #6a9500; }

        .metric-icon {
          width: 46px;
          height: 46px;
          border-radius: 11px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 20px;
          margin-bottom: 18px;
        }

        .icon-dark { background: #0a0a0a; }
        .icon-lime { background: #c8f000; }
        .icon-gray { background: #f4f2e8; }

        .metric-label { font-size: 12.5px; color: #888; font-weight: 500; margin-bottom: 5px; }

        .metric-value {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 40px;
          color: #0a0a0a;
          line-height: 1;
        }

        .metric-value .sub { font-size: 18px; color: #aaa; font-family: 'Barlow', sans-serif; }

        /* BOTTOM GRID */
        .bottom-grid {
          display: grid;
          grid-template-columns: 1fr 340px;
          gap: 18px;
        }

        /* CHART */
        .chart-card {
          background: #fff;
          border: 1px solid #e8e5de;
          border-radius: 12px;
          padding: 26px;
        }

        .chart-title {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 20px;
          letter-spacing: 0.5px;
          margin-bottom: 3px;
        }

        .chart-sub { font-size: 13px; color: #888; margin-bottom: 24px; }

        .chart-bars {
          display: flex;
          align-items: flex-end;
          gap: 3px;
          height: 160px;
          position: relative;
          border-bottom: 1.5px solid #e8e5de;
        }

        .chart-bar-wrap {
          flex: 1;
          display: flex;
          align-items: flex-end;
          height: 100%;
        }

        .chart-bar {
          width: 100%;
          background: #c8f000;
          border-radius: 3px 3px 0 0;
          opacity: 0.75;
          transition: opacity 0.2s;
          min-height: 2px;
        }

        .chart-bar:hover { opacity: 1; }

        .chart-days {
          display: flex;
          gap: 3px;
          margin-top: 8px;
        }

        .chart-day {
          flex: 1;
          font-size: 11px;
          color: #aaa;
          text-align: center;
        }

        /* TOUR CARD */
        .tour-card {
          background: #0a0a0a;
          border-radius: 12px;
          padding: 24px;
          color: #fff;
        }

        .tour-head {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 20px;
        }

        .tour-head-left {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .tour-star-box {
          width: 32px;
          height: 32px;
          background: rgba(200,240,0,0.12);
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 14px;
        }

        .tour-title-text {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 16px;
          letter-spacing: 0.5px;
        }

        .tour-subtitle {
          font-size: 11px;
          color: rgba(255,255,255,0.35);
          margin-top: 1px;
        }

        .tour-nav-btns { display: flex; gap: 7px; }

        .tour-nav-btn {
          width: 30px;
          height: 30px;
          border-radius: 50%;
          border: 1px solid rgba(255,255,255,0.18);
          background: transparent;
          color: #fff;
          font-size: 14px;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: background 0.18s;
        }

        .tour-nav-btn:hover { background: rgba(255,255,255,0.1); }

        .tour-label {
          font-size: 10.5px;
          font-weight: 800;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: #c8f000;
          margin-bottom: 7px;
        }

        .tour-feature-title {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 22px;
          letter-spacing: 0.5px;
          margin-bottom: 11px;
          line-height: 1.1;
        }

        .tour-desc {
          font-size: 12.5px;
          color: rgba(255,255,255,0.55);
          line-height: 1.65;
          margin-bottom: 14px;
        }

        .tour-bullets {
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: 7px;
          margin-bottom: 20px;
        }

        .tour-bullets li {
          font-size: 12.5px;
          color: rgba(255,255,255,0.55);
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .tour-bullets li::before {
          content: '•';
          color: #c8f000;
          font-size: 14px;
        }

        .btn-tour {
          background: #c8f000;
          color: #0a0a0a;
          border: none;
          padding: 9px 18px;
          border-radius: 7px;
          font-size: 13px;
          font-weight: 800;
          font-family: 'Barlow', sans-serif;
          cursor: pointer;
          transition: background 0.18s;
        }

        .btn-tour:hover { background: #b8dc00; }

        .tour-dots {
          display: flex;
          gap: 5px;
          justify-content: center;
          margin-top: 18px;
        }

        .tour-dot {
          height: 7px;
          border-radius: 100px;
          background: rgba(255,255,255,0.18);
          transition: all 0.25s;
          width: 7px;
        }

        .tour-dot.active {
          background: #c8f000;
          width: 22px;
        }

        /* EMPTY STATES */
        .empty-section {
          background: #fff;
          border: 1px solid #e8e5de;
          border-radius: 12px;
          padding: 26px;
        }

        .empty-state {
          text-align: center;
          padding: 60px 40px;
        }

        .empty-icon {
          width: 58px;
          height: 58px;
          background: #f4f2e8;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 18px;
          font-size: 24px;
        }

        .empty-title {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 24px;
          letter-spacing: 0.5px;
          margin-bottom: 8px;
        }

        .empty-sub {
          font-size: 14px;
          color: #999;
          margin-bottom: 24px;
        }

        .btn-create {
          display: inline-flex;
          align-items: center;
          gap: 7px;
          border: 1.5px solid #0a0a0a;
          color: #0a0a0a;
          padding: 10px 22px;
          border-radius: 8px;
          font-size: 14px;
          font-weight: 700;
          font-family: 'Barlow', sans-serif;
          background: transparent;
          cursor: pointer;
          transition: all 0.2s;
        }

        .btn-create:hover { background: #0a0a0a; color: #fff; }

        .btn-create-lime {
          display: inline-flex;
          align-items: center;
          gap: 7px;
          background: #c8f000;
          color: #0a0a0a;
          padding: 10px 20px;
          border-radius: 8px;
          font-size: 14px;
          font-weight: 800;
          font-family: 'Barlow', sans-serif;
          border: none;
          cursor: pointer;
          transition: background 0.2s;
        }

        .btn-create-lime:hover { background: #b8dc00; }

        /* PRICING IN DASH */
        .pricing-dash-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 16px;
        }

        .price-dash-card {
          background: #fff;
          border: 1.5px solid #e8e5de;
          border-radius: 12px;
          padding: 28px;
          transition: transform 0.2s;
        }

        .price-dash-card:hover { transform: translateY(-3px); }

        .price-dash-card.featured {
          background: #c8f000;
          border-color: #c8f000;
        }

        .select-wrap {
          position: relative;
          display: inline-block;
        }

        .select-wrap select {
          appearance: none;
          background: #f4f2e8;
          border: 1px solid #e0ddd5;
          padding: 8px 30px 8px 12px;
          border-radius: 8px;
          font-size: 14px;
          font-family: 'Barlow', sans-serif;
          cursor: pointer;
          outline: none;
        }

        .select-wrap::after {
          content: '▾';
          position: absolute;
          right: 10px;
          top: 50%;
          transform: translateY(-50%);
          pointer-events: none;
          font-size: 11px;
          color: #666;
        }

        @media (max-width: 900px) {
          .metrics-grid { grid-template-columns: 1fr 1fr; }
          .bottom-grid { grid-template-columns: 1fr; }
          .pricing-dash-grid { grid-template-columns: 1fr; }
        }
      `}</style>

      <div className="dash-layout">
        {/* ── SIDEBAR ── */}
        <aside className="dash-sidebar">
          <div style={{ padding: "18px 16px", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
            <Logo variant="dark" />
          </div>

          <nav className="sidebar-nav">
            <div
              className={`nav-item ${view === 'overview' ? 'active' : ''}`}
              onClick={() => setView('overview')}
            >
              <span className="nav-icon">⊞</span> Dashboard
            </div>

            <div className="nav-section-label">Outreach</div>
            {NAV_ITEMS.outreach.map(item => (
              <div
                key={item.id}
                className={`nav-item ${view === item.id ? 'active' : ''}`}
                onClick={() => navTo(item.id)}
              >
                <span className="nav-icon">{item.icon}</span> {item.label}
              </div>
            ))}

            <div className="nav-section-label">Engagement</div>
            {NAV_ITEMS.engagement.map(item => (
              <div key={item.label} className="nav-item locked">
                <span className="nav-icon">{item.icon}</span>
                {item.label}
                <span className="lock-icon">🔒</span>
              </div>
            ))}

            <div className="nav-section-label">System</div>
            {NAV_ITEMS.system.map(item => (
              <div
                key={item.label}
                className={`nav-item ${view === item.id ? 'active' : ''}`}
                onClick={() => item.id && setView(item.id)}
              >
                <span className="nav-icon">{item.icon}</span> {item.label}
              </div>
            ))}
          </nav>

          <div className="sidebar-footer">
            <div className="trial-box">
              <div className="trial-header">⏱ FREE TRIAL</div>
              <div className="trial-days">11 <span>days left</span></div>
              <div className="trial-bar"><div className="trial-bar-fill" /></div>
              <button className="btn-upgrade" onClick={() => setView('pricing-dash')}>
                Upgrade Plan →
              </button>
            </div>
          </div>
        </aside>

        {/* ── MAIN ── */}
        <div className="dash-main">
          {/* TOPBAR */}
          <div className="dash-topbar">
            <div className="workspace-pill">
              <div className="w-avatar">K</div>
              Krupa Trivedi's Workspace
              <span style={{ fontSize: 11, color: '#aaa' }}>▾</span>
            </div>
            <div className="topbar-right">
              <div className="user-info">
                <div className="user-name">Krupa Trivedi</div>
                <div className="user-role">User</div>
              </div>
              <div className="user-avatar">KT</div>
              <button className="notif-btn">🔔</button>
            </div>
          </div>

          {/* ── OVERVIEW ── */}
          {view === 'overview' && (
            <div className="dash-content">
              <div className="page-header">
                <div>
                  <div className="page-title">Linkziy Overview</div>
                  <div className="page-sub">Real-time performance for your active sequences</div>
                </div>
                <div className="select-wrap">
                  <select><option>All Time</option><option>This Week</option><option>This Month</option></select>
                </div>
              </div>

              <div className="metrics-grid">
                {/* Active Prospects */}
                <div className="metric-card">
                  <div className="metric-badge badge-live">Live</div>
                  <div className="metric-icon icon-dark">👥</div>
                  <div className="metric-label">Active Prospects</div>
                  <div className="metric-value">0</div>
                </div>
                {/* Pending Follow-ups */}
                <div className="metric-card">
                  <div className="metric-badge badge-live">Live</div>
                  <div className="metric-icon icon-lime">⏱</div>
                  <div className="metric-label">Pending Follow-ups</div>
                  <div className="metric-value">0</div>
                </div>
                {/* Replies */}
                <div className="metric-card">
                  <div className="metric-icon icon-gray">💬</div>
                  <div className="metric-label">Replies Received</div>
                  <div className="metric-value">0</div>
                </div>
                {/* Positive Leads */}
                <div className="metric-card">
                  <div className="metric-icon icon-gray">👍</div>
                  <div className="metric-label">Positive Leads</div>
                  <div className="metric-value">0</div>
                </div>
                {/* Engagement Rate */}
                <div className="metric-card">
                  <div className="metric-badge badge-live">Live</div>
                  <div className="metric-icon icon-dark">📊</div>
                  <div className="metric-label">Engagement Rate</div>
                  <div className="metric-value">0.0%</div>
                </div>
                {/* Daily Action */}
                <div className="metric-card">
                  <div className="metric-badge badge-track">On Track</div>
                  <div className="metric-icon icon-lime">⚡</div>
                  <div className="metric-label">Daily Action Usage</div>
                  <div className="metric-value">0 <span className="sub">/ 50</span></div>
                </div>
              </div>

              <div className="bottom-grid">
                {/* Chart */}
                <div className="chart-card">
                  <div className="chart-title">Daily Activity</div>
                  <div className="chart-sub">Successful linkziys per day</div>
                  <div className="chart-bars">
                    {[0, 0, 0, 0, 0, 0, 0].map((h, i) => (
                      <div className="chart-bar-wrap" key={i}>
                        <div className="chart-bar" style={{ height: Math.max(h * 40, 2) + 'px' }} />
                      </div>
                    ))}
                  </div>
                  <div className="chart-days">
                    {['Sat','Sun','Mon','Tue','Wed','Thu','Fri'].map(d => (
                      <div className="chart-day" key={d}>{d}</div>
                    ))}
                  </div>
                </div>

                {/* Product Tour */}
                <div className="tour-card">
                  <div className="tour-head">
                    <div className="tour-head-left">
                      <div className="tour-star-box">⭐</div>
                      <div>
                        <div className="tour-title-text">Product Tour</div>
                        <div className="tour-subtitle">Explore what you can do in Linkziy</div>
                      </div>
                    </div>
                    <div className="tour-nav-btns">
                      <button className="tour-nav-btn" onClick={() => setTourIdx((tourIdx - 1 + TOUR_SLIDES.length) % TOUR_SLIDES.length)}>‹</button>
                      <button className="tour-nav-btn" onClick={() => setTourIdx((tourIdx + 1) % TOUR_SLIDES.length)}>›</button>
                    </div>
                  </div>

                  <div className="tour-label">{slide.label}</div>
                  <div className="tour-feature-title">{slide.title}</div>
                  <div className="tour-desc">{slide.desc}</div>
                  <ul className="tour-bullets">
                    {slide.bullets.map(b => <li key={b}>{b}</li>)}
                  </ul>
                  <button className="btn-tour" onClick={() => slide.ctaView && setView(slide.ctaView)}>
                    {slide.cta}
                  </button>

                  <div className="tour-dots">
                    {TOUR_SLIDES.map((_, i) => (
                      <div key={i} className={`tour-dot ${i === tourIdx ? 'active' : ''}`} onClick={() => setTourIdx(i)} style={{ cursor: 'pointer' }} />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ── PROSPECTS ── */}
          {view === 'prospects' && (
            <div className="dash-content">
              <div className="page-header">
                <div>
                  <div className="page-badge">Prospects</div>
                  <div className="page-title">Prospect Intelligence</div>
                  <div className="page-sub">Manage your outreach lists and target campaigns</div>
                </div>
                <button className="btn-create-lime">+ Create New List</button>
              </div>
              <div className="empty-section">
                <div className="empty-state">
                  <div className="empty-icon">👥</div>
                  <div className="empty-title">No Lists Yet</div>
                  <div className="empty-sub">Create your first list to start managing prospects</div>
                  <button className="btn-create">+ Create My First List</button>
                </div>
              </div>
            </div>
          )}

          {/* ── CAMPAIGNS ── */}
          {view === 'campaigns' && (
            <div className="dash-content">
              <div className="page-header">
                <div>
                  <div className="page-title">Campaigns</div>
                  <div className="page-sub">Manage your automated linkziy sequences</div>
                </div>
                <button className="btn-create-lime">+ New Campaign</button>
              </div>
              <div className="empty-section">
                <div className="empty-state">
                  <div className="empty-icon">🚀</div>
                  <div className="empty-title">No Campaigns Yet</div>
                  <div className="empty-sub">Create your first campaign to start automating your LinkedIn outreach</div>
                  <button className="btn-create-lime">+ New Campaign</button>
                </div>
              </div>
            </div>
          )}

          {/* ── ANALYTICS ── */}
          {view === 'analytics' && (
            <div className="dash-content">
              <div className="page-header">
                <div>
                  <div className="page-title">Campaign Analytics</div>
                  <div className="page-sub">Track performance across all your campaigns</div>
                </div>
                <div className="select-wrap">
                  <select><option>Last 30 Days</option><option>Last 7 Days</option><option>All Time</option></select>
                </div>
              </div>
              <div className="metrics-grid" style={{ marginBottom: 18 }}>
                <div className="metric-card"><div className="metric-label">Total Connections Sent</div><div className="metric-value">0</div></div>
                <div className="metric-card"><div className="metric-label">Accepted Rate</div><div className="metric-value">0%</div></div>
                <div className="metric-card"><div className="metric-label">Reply Rate</div><div className="metric-value">0%</div></div>
              </div>
              <div className="chart-card">
                <div className="chart-title">Performance Over Time</div>
                <div className="chart-sub">Daily outreach activity and responses</div>
                <div className="chart-bars">
                  {[0,0,0,0].map((h, i) => (
                    <div className="chart-bar-wrap" key={i}>
                      <div className="chart-bar" style={{ height: '2px' }} />
                    </div>
                  ))}
                </div>
                <div className="chart-days">
                  {['Week 1','Week 2','Week 3','Week 4'].map(d => (
                    <div className="chart-day" key={d}>{d}</div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ── PRICING IN DASH ── */}
          {view === 'pricing-dash' && (
            <div className="dash-content">
              <div className="page-header">
                <div>
                  <div className="page-title">Choose Your Plan</div>
                  <div className="page-sub">Upgrade to unlock the full power of Linkziy</div>
                </div>
                <Link to="/pricing" style={{ fontSize: 13, color: '#6a9500', fontWeight: 700, textDecoration: 'none' }}>
                  View full pricing page →
                </Link>
              </div>
              <div className="pricing-dash-grid">
                {[
                  { name: 'Starter', price: '$0', desc: 'Current plan • 11 days left', cta: 'Current Plan', featured: false, current: true },
                  { name: 'Growth', price: '$49', desc: 'For serious LinkedIn outreach', cta: 'Upgrade Now', featured: true, current: false },
                  { name: 'Scale', price: '$99', desc: 'For teams and agencies', cta: 'Contact Sales', featured: false, current: false },
                ].map(plan => (
                  <div key={plan.name} className={`price-dash-card ${plan.featured ? 'featured' : ''}`}>
                    <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 26, marginBottom: 6, color: plan.featured ? '#0a0a0a' : '#0a0a0a' }}>
                      {plan.name}
                    </div>
                    <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 48, lineHeight: 1, color: plan.featured ? '#0a0a0a' : '#0a0a0a', marginBottom: 6 }}>
                      {plan.price}<span style={{ fontSize: 18, fontFamily: "'Barlow', sans-serif", fontWeight: 400, color: plan.featured ? '#0a0a0a' : '#888' }}>/mo</span>
                    </div>
                    <div style={{ fontSize: 13, color: plan.featured ? 'rgba(0,0,0,0.6)' : '#999', marginBottom: 20 }}>{plan.desc}</div>
                    <button style={{
                      width: '100%', padding: '10px', borderRadius: 8, fontFamily: "'Barlow', sans-serif",
                      fontSize: 14, fontWeight: 800, cursor: 'pointer', border: 'none',
                      background: plan.featured ? '#0a0a0a' : plan.current ? '#f4f2e8' : '#0a0a0a',
                      color: plan.featured ? '#fff' : plan.current ? '#888' : '#fff',
                    }}>
                      {plan.cta}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  )
}
