import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Logo from "../components/Logo";

const TOUR_SLIDES = [
  { label: 'Prospect Intelligence', title: 'Build Targeted Outreach Lists', desc: 'Import leads from LinkedIn and organize them into smart lists for precise targeting.', bullets: ['Filter and segment by industry', 'Track status per prospect', 'Sync with active campaigns'], cta: 'Go to Prospects', ctaView: 'prospects', icon: '👥' },
  { label: 'Post Generator', title: 'Write High-Quality LinkedIn Posts Faster', desc: 'Generate content in your tone with structured formats, then refine it into a publish-ready draft.', bullets: ['Guided + manual post creation', 'Consistent tone & structure', 'Drafts you can reuse and iterate on'], cta: 'Go to Post Generator', ctaView: null, icon: '✍️' },
  { label: 'Campaign Sequences', title: 'Automate Your Outreach Sequences', desc: 'Build multi-step campaigns with connection requests, messages, and timed follow-ups — all automated.', bullets: ['Drag & drop sequence builder', 'Smart personalization', 'Auto-schedule based on limits'], cta: 'Go to Sequences', ctaView: 'campaigns', icon: '🚀' },
  { label: 'Campaign Analytics', title: 'Track Every Touchpoint In Real Time', desc: 'Real-time dashboards for your active sequences — monitor replies, engagement, and daily action usage.', bullets: ['Live sequence monitoring', 'Engagement rate tracking', 'Daily action usage meter'], cta: 'View Analytics', ctaView: 'analytics', icon: '📊' },
]

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
    { id: 'settings', label: 'Settings', icon: '⚙️' },
    { id: 'pricing-dash', label: 'Pricing', icon: '💳' },
  ],
}

function Toggle({ on, onClick }) {
  return (
    <div className={`toggle-switch ${on ? 'on' : ''}`} onClick={onClick}>
      <div className="toggle-knob" />
    </div>
  )
}

export default function Dashboard() {
  const [view, setView] = useState('overview')
  const [tourIdx, setTourIdx] = useState(0)
  const [editProfile, setEditProfile] = useState(false)
  const [notifs, setNotifs] = useState({ email: true, campaigns: true, weekly: false })
  const navigate = useNavigate()
  const slide = TOUR_SLIDES[tourIdx]

  const viewLabels = { overview: 'Dashboard', prospects: 'Prospects', campaigns: 'Sequences', analytics: 'Analytics', 'pricing-dash': 'Pricing', settings: 'Profile & Settings' }

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Barlow+Condensed:wght@700;800;900&family=Barlow:wght@400;500;600;700&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        body { font-family: 'Barlow', sans-serif; overflow-x: hidden; cursor: auto !important; }

        .dash-layout { display: flex; min-height: 100vh; background: #f4f2e8; }

        /* SIDEBAR */
        .dash-sidebar { width: 248px; background: #0a0a0a; color: #fff; display: flex; flex-direction: column; height: 100vh; position: sticky; top: 0; flex-shrink: 0; overflow-y: auto; scrollbar-width: none; }
        .dash-sidebar::-webkit-scrollbar { display: none; }
        .sidebar-logo { padding: 20px 18px 16px; border-bottom: 1px solid rgba(255,255,255,0.06); }
        .sidebar-nav { flex: 1; padding: 10px; }
        .nav-overview { display: flex; align-items: center; gap: 9px; padding: 9px 12px; border-radius: 8px; font-size: 13.5px; font-weight: 600; color: rgba(255,255,255,0.55); cursor: pointer; transition: all 0.18s; margin-bottom: 4px; }
        .nav-overview:hover { background: rgba(255,255,255,0.06); color: rgba(255,255,255,0.9); }
        .nav-overview.active { background: rgba(200,240,0,0.12); color: #c8f000; }
        .nav-section-label { font-size: 9.5px; font-weight: 800; letter-spacing: 0.14em; text-transform: uppercase; color: rgba(255,255,255,0.22); padding: 0 12px; margin: 14px 0 5px; }
        .nav-item { display: flex; align-items: center; gap: 9px; padding: 8px 12px; border-radius: 8px; font-size: 13.5px; font-weight: 500; color: rgba(255,255,255,0.5); cursor: pointer; transition: all 0.15s; user-select: none; }
        .nav-item:hover:not(.locked) { background: rgba(255,255,255,0.06); color: rgba(255,255,255,0.88); }
        .nav-item.active { background: rgba(200,240,0,0.12); color: #c8f000; }
        .nav-item.locked { cursor: default; opacity: 0.38; }
        .nav-icon { font-size: 14px; flex-shrink: 0; width: 18px; text-align: center; }
        .lock-badge { margin-left: auto; font-size: 9px; font-weight: 800; letter-spacing: 0.06em; text-transform: uppercase; background: rgba(255,255,255,0.08); color: rgba(255,255,255,0.3); padding: 2px 6px; border-radius: 4px; }

        .sidebar-user { padding: 12px 10px; border-top: 1px solid rgba(255,255,255,0.06); }
        .sidebar-user-card { display: flex; align-items: center; gap: 10px; padding: 10px 12px; border-radius: 10px; cursor: pointer; transition: background 0.18s; }
        .sidebar-user-card:hover { background: rgba(255,255,255,0.06); }
        .sidebar-avatar { width: 34px; height: 34px; border-radius: 50%; background: linear-gradient(135deg, #c8f000 0%, #8ab000 100%); color: #0a0a0a; display: flex; align-items: center; justify-content: center; font-family: 'Bebas Neue', sans-serif; font-size: 13px; flex-shrink: 0; }
        .sidebar-user-name { font-size: 13px; font-weight: 700; color: rgba(255,255,255,0.88); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
        .sidebar-user-email { font-size: 11px; color: rgba(255,255,255,0.32); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }

        .sidebar-footer { padding: 0 10px 14px; }
        .trial-box { background: rgba(200,240,0,0.07); border: 1px solid rgba(200,240,0,0.15); border-radius: 10px; padding: 14px; }
        .trial-header { display: flex; align-items: center; justify-content: space-between; margin-bottom: 8px; }
        .trial-label { font-size: 10px; font-weight: 800; letter-spacing: 0.1em; text-transform: uppercase; color: rgba(255,255,255,0.35); }
        .trial-days-badge { font-size: 10px; font-weight: 800; color: #c8f000; background: rgba(200,240,0,0.12); padding: 2px 7px; border-radius: 100px; }
        .trial-bar { height: 3px; background: rgba(255,255,255,0.08); border-radius: 2px; margin-bottom: 12px; overflow: hidden; }
        .trial-bar-fill { height: 100%; width: 75%; background: linear-gradient(90deg, #c8f000, #b8dc00); border-radius: 2px; }
        .btn-upgrade { width: 100%; padding: 9px; background: #c8f000; color: #0a0a0a; border: none; border-radius: 7px; font-size: 12.5px; font-weight: 800; font-family: 'Barlow', sans-serif; cursor: pointer; transition: background 0.2s; }
        .btn-upgrade:hover { background: #b8dc00; }

        /* MAIN */
        .dash-main { flex: 1; overflow-y: auto; min-width: 0; display: flex; flex-direction: column; }

        .dash-topbar { background: rgba(255,255,255,0.92); backdrop-filter: blur(12px); border-bottom: 1px solid #e8e5de; padding: 0 26px; height: 56px; display: flex; align-items: center; justify-content: space-between; position: sticky; top: 0; z-index: 50; }
        .topbar-left { display: flex; align-items: center; gap: 8px; }
        .breadcrumb-item { font-size: 13px; font-weight: 500; color: #bbb; }
        .breadcrumb-item.active { color: #0a0a0a; font-weight: 700; }
        .breadcrumb-sep { color: #ddd; font-size: 11px; }
        .topbar-right { display: flex; align-items: center; gap: 8px; }
        .topbar-btn { width: 34px; height: 34px; border-radius: 8px; border: 1px solid #e8e5de; background: #fff; color: #888; display: flex; align-items: center; justify-content: center; cursor: pointer; font-size: 15px; transition: all 0.18s; position: relative; }
        .topbar-btn:hover { border-color: #0a0a0a; color: #0a0a0a; }
        .notif-dot { position: absolute; top: 7px; right: 7px; width: 6px; height: 6px; background: #c8f000; border-radius: 50%; border: 1.5px solid #fff; }
        .topbar-avatar-btn { display: flex; align-items: center; gap: 8px; padding: 5px 10px 5px 5px; border-radius: 8px; border: 1px solid #e8e5de; background: #fff; cursor: pointer; transition: border-color 0.18s; }
        .topbar-avatar-btn:hover { border-color: #0a0a0a; }
        .topbar-avatar { width: 28px; height: 28px; background: linear-gradient(135deg, #c8f000 0%, #8ab000 100%); color: #0a0a0a; border-radius: 6px; display: flex; align-items: center; justify-content: center; font-family: 'Bebas Neue', sans-serif; font-size: 12px; }
        .topbar-name { font-size: 13px; font-weight: 700; color: #0a0a0a; }

        /* CONTENT */
        .dash-content { padding: 22px 26px 60px; flex: 1; }
        .page-header { display: flex; align-items: flex-start; justify-content: space-between; margin-bottom: 20px; gap: 16px; }
        .page-eyebrow { display: inline-flex; align-items: center; gap: 6px; font-size: 10px; font-weight: 800; letter-spacing: 0.12em; text-transform: uppercase; color: #999; margin-bottom: 5px; }
        .eyebrow-dot { width: 5px; height: 5px; background: #c8f000; border-radius: 50%; display: inline-block; }
        .page-title { font-family: 'Bebas Neue', sans-serif; font-size: 30px; letter-spacing: 0.5px; color: #0a0a0a; line-height: 1; margin-bottom: 4px; }
        .page-sub { font-size: 13px; color: #999; }

        .select-wrap { position: relative; display: inline-block; }
        .select-wrap select { appearance: none; background: #fff; border: 1px solid #e8e5de; padding: 8px 32px 8px 12px; border-radius: 8px; font-size: 13px; font-family: 'Barlow', sans-serif; font-weight: 600; color: #0a0a0a; cursor: pointer; outline: none; }
        .select-wrap::after { content: '▾'; position: absolute; right: 10px; top: 50%; transform: translateY(-50%); pointer-events: none; font-size: 10px; color: #888; }

        .btn-primary { display: inline-flex; align-items: center; gap: 7px; background: #c8f000; color: #0a0a0a; padding: 9px 18px; border-radius: 8px; font-size: 13px; font-weight: 800; font-family: 'Barlow', sans-serif; border: none; cursor: pointer; transition: background 0.2s; white-space: nowrap; }
        .btn-primary:hover { background: #b8dc00; }
        .btn-outline { display: inline-flex; align-items: center; gap: 7px; background: #fff; color: #0a0a0a; padding: 9px 18px; border-radius: 8px; font-size: 13px; font-weight: 700; font-family: 'Barlow', sans-serif; border: 1.5px solid #e8e5de; cursor: pointer; transition: all 0.18s; }
        .btn-outline:hover { border-color: #0a0a0a; background: #0a0a0a; color: #fff; }

        /* METRICS */
        .metrics-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px; margin-bottom: 16px; }
        .metric-card { background: #fff; border: 1px solid #e8e5de; border-radius: 12px; padding: 20px; position: relative; overflow: hidden; transition: border-color 0.2s, box-shadow 0.2s; }
        .metric-card:hover { border-color: #c8f000; box-shadow: 0 2px 12px rgba(200,240,0,0.12); }
        .metric-card-top { display: flex; align-items: flex-start; justify-content: space-between; margin-bottom: 14px; }
        .metric-icon { width: 40px; height: 40px; border-radius: 10px; display: flex; align-items: center; justify-content: center; font-size: 18px; flex-shrink: 0; }
        .icon-dark { background: #0a0a0a; }
        .icon-lime { background: #c8f000; }
        .icon-cream { background: #f4f2e8; border: 1px solid #e8e5de; }
        .metric-badge { font-size: 9px; font-weight: 800; letter-spacing: 0.07em; text-transform: uppercase; padding: 3px 8px; border-radius: 100px; }
        .badge-live { background: rgba(34,197,94,0.1); color: #16a34a; }
        .badge-track { background: rgba(200,240,0,0.15); color: #6a9500; }
        .metric-label { font-size: 12px; color: #999; font-weight: 500; margin-bottom: 4px; }
        .metric-value { font-family: 'Bebas Neue', sans-serif; font-size: 36px; color: #0a0a0a; line-height: 1; }
        .metric-value .sub { font-size: 16px; color: #bbb; font-family: 'Barlow', sans-serif; font-weight: 400; }

        /* BOTTOM GRID */
        .bottom-grid { display: grid; grid-template-columns: 1fr 318px; gap: 14px; }
        .chart-card { background: #fff; border: 1px solid #e8e5de; border-radius: 12px; padding: 24px; }
        .chart-header { display: flex; align-items: flex-start; justify-content: space-between; margin-bottom: 20px; }
        .chart-title { font-family: 'Bebas Neue', sans-serif; font-size: 20px; letter-spacing: 0.5px; margin-bottom: 2px; }
        .chart-sub { font-size: 12px; color: #aaa; }
        .chart-stat-val { font-family: 'Bebas Neue', sans-serif; font-size: 28px; color: #0a0a0a; line-height: 1; text-align: right; }
        .chart-stat-label { font-size: 11px; color: #aaa; text-align: right; }
        .chart-bars { display: flex; align-items: flex-end; gap: 4px; height: 140px; border-bottom: 1px solid #e8e5de; }
        .chart-bar-wrap { flex: 1; display: flex; align-items: flex-end; height: 100%; }
        .chart-bar { width: 100%; background: #e8e5de; border-radius: 3px 3px 0 0; min-height: 2px; transition: opacity 0.2s; }
        .chart-days { display: flex; gap: 4px; margin-top: 8px; }
        .chart-day { flex: 1; font-size: 10.5px; color: #bbb; text-align: center; font-weight: 500; }

        /* TOUR */
        .tour-card { background: #0a0a0a; border-radius: 12px; padding: 22px; color: #fff; display: flex; flex-direction: column; }
        .tour-head { display: flex; align-items: center; justify-content: space-between; margin-bottom: 18px; }
        .tour-head-left { display: flex; align-items: center; gap: 9px; }
        .tour-star-box { width: 30px; height: 30px; background: rgba(200,240,0,0.12); border-radius: 7px; display: flex; align-items: center; justify-content: center; font-size: 13px; }
        .tour-label-top { font-family: 'Bebas Neue', sans-serif; font-size: 14px; letter-spacing: 0.5px; }
        .tour-count { font-size: 10.5px; color: rgba(255,255,255,0.3); }
        .tour-nav-btns { display: flex; gap: 6px; }
        .tour-nav-btn { width: 28px; height: 28px; border-radius: 50%; border: 1px solid rgba(255,255,255,0.12); background: transparent; color: rgba(255,255,255,0.55); font-size: 13px; cursor: pointer; display: flex; align-items: center; justify-content: center; transition: all 0.18s; }
        .tour-nav-btn:hover { background: rgba(255,255,255,0.08); color: #fff; }
        .tour-slide-icon { width: 44px; height: 44px; background: rgba(200,240,0,0.1); border-radius: 11px; display: flex; align-items: center; justify-content: center; font-size: 20px; margin-bottom: 12px; }
        .tour-feature-label { font-size: 10px; font-weight: 800; letter-spacing: 0.12em; text-transform: uppercase; color: #c8f000; margin-bottom: 6px; }
        .tour-feature-title { font-family: 'Bebas Neue', sans-serif; font-size: 20px; letter-spacing: 0.5px; margin-bottom: 8px; line-height: 1.1; }
        .tour-desc { font-size: 12px; color: rgba(255,255,255,0.45); line-height: 1.65; margin-bottom: 12px; }
        .tour-bullets { list-style: none; display: flex; flex-direction: column; gap: 6px; margin-bottom: 18px; }
        .tour-bullets li { font-size: 12px; color: rgba(255,255,255,0.45); display: flex; align-items: center; gap: 8px; }
        .tour-bullets li::before { content: '→'; color: #c8f000; font-size: 11px; }
        .btn-tour { background: #c8f000; color: #0a0a0a; border: none; padding: 9px 16px; border-radius: 7px; font-size: 12.5px; font-weight: 800; font-family: 'Barlow', sans-serif; cursor: pointer; align-self: flex-start; }
        .tour-dots { display: flex; gap: 4px; margin-top: 16px; }
        .tour-dot { height: 4px; border-radius: 100px; background: rgba(255,255,255,0.12); transition: all 0.25s; width: 16px; cursor: pointer; }
        .tour-dot.active { background: #c8f000; width: 28px; }

        /* EMPTY */
        .empty-section { background: #fff; border: 1px solid #e8e5de; border-radius: 12px; padding: 26px; }
        .empty-state { text-align: center; padding: 64px 40px; }
        .empty-icon { width: 60px; height: 60px; background: #f4f2e8; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 16px; font-size: 26px; }
        .empty-title { font-family: 'Bebas Neue', sans-serif; font-size: 24px; letter-spacing: 0.5px; margin-bottom: 7px; }
        .empty-sub { font-size: 13.5px; color: #999; margin-bottom: 22px; max-width: 300px; margin-left: auto; margin-right: auto; }

        /* PRICING */
        .pricing-dash-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 14px; }
        .price-dash-card { background: #fff; border: 1.5px solid #e8e5de; border-radius: 14px; padding: 26px; transition: transform 0.2s, box-shadow 0.2s; position: relative; overflow: hidden; }
        .price-dash-card:hover { transform: translateY(-3px); box-shadow: 0 8px 24px rgba(0,0,0,0.07); }
        .price-dash-card.featured { background: #c8f000; border-color: #c8f000; }
        .featured-badge { position: absolute; top: 14px; right: 14px; background: #0a0a0a; color: #c8f000; font-size: 9px; font-weight: 800; letter-spacing: 0.08em; text-transform: uppercase; padding: 3px 9px; border-radius: 100px; }

        /* PROFILE & SETTINGS */
        .profile-grid { display: grid; grid-template-columns: 290px 1fr; gap: 16px; align-items: start; }
        .profile-card { background: #fff; border: 1px solid #e8e5de; border-radius: 14px; overflow: hidden; position: sticky; top: 76px; }
        .profile-card-banner { height: 68px; background: linear-gradient(135deg, #0a0a0a 0%, #1c1c1c 100%); position: relative; }
        .profile-card-body { padding: 0 20px 22px; }
        .profile-avatar-wrap { margin-top: -22px; margin-bottom: 14px; position: relative; display: inline-block; }
        .profile-big-avatar { width: 52px; height: 52px; background: linear-gradient(135deg, #c8f000 0%, #8ab000 100%); color: #0a0a0a; border-radius: 14px; display: flex; align-items: center; justify-content: center; font-family: 'Bebas Neue', sans-serif; font-size: 20px; border: 3px solid #fff; box-shadow: 0 2px 8px rgba(0,0,0,0.1); }
        .profile-online-dot { position: absolute; bottom: 2px; right: -2px; width: 12px; height: 12px; background: #22c55e; border-radius: 50%; border: 2px solid #fff; }
        .profile-name { font-size: 16px; font-weight: 800; color: #0a0a0a; margin-bottom: 2px; }
        .profile-handle { font-size: 12px; color: #aaa; margin-bottom: 14px; }
        .profile-divider { height: 1px; background: #f0ede6; margin: 14px 0; }
        .profile-stat-row { display: flex; }
        .profile-stat { flex: 1; text-align: center; padding: 0 8px; }
        .profile-stat + .profile-stat { border-left: 1px solid #f0ede6; }
        .profile-stat-val { font-family: 'Bebas Neue', sans-serif; font-size: 22px; color: #0a0a0a; line-height: 1; }
        .profile-stat-label { font-size: 10px; color: #aaa; margin-top: 2px; }
        .profile-plan-box { margin-top: 16px; background: #f8f7f2; border: 1px solid #e8e5de; border-radius: 10px; padding: 14px; }
        .profile-plan-row { display: flex; align-items: center; justify-content: space-between; margin-bottom: 6px; }
        .profile-plan-name { font-size: 13px; font-weight: 800; color: #0a0a0a; }
        .plan-badge-free { font-size: 9px; font-weight: 800; letter-spacing: 0.08em; text-transform: uppercase; background: #e8e5de; color: #888; padding: 3px 8px; border-radius: 100px; }
        .profile-plan-sub { font-size: 11.5px; color: #aaa; margin-bottom: 10px; }
        .profile-plan-bar { height: 3px; background: #e8e5de; border-radius: 2px; overflow: hidden; margin-bottom: 10px; }
        .profile-plan-bar-fill { height: 100%; width: 75%; background: linear-gradient(90deg, #c8f000, #b8dc00); border-radius: 2px; }

        /* Settings */
        .settings-panels { display: flex; flex-direction: column; gap: 14px; }
        .settings-panel { background: #fff; border: 1px solid #e8e5de; border-radius: 14px; overflow: hidden; }
        .settings-panel-header { display: flex; align-items: center; justify-content: space-between; padding: 18px 22px; border-bottom: 1px solid #f0ede6; }
        .settings-panel-title { font-size: 15px; font-weight: 800; color: #0a0a0a; }
        .settings-panel-sub { font-size: 12px; color: #aaa; margin-top: 1px; }
        .btn-edit-sm { font-size: 12px; font-weight: 700; color: #555; background: #f4f2e8; border: 1px solid #e8e5de; padding: 5px 12px; border-radius: 6px; cursor: pointer; transition: all 0.18s; font-family: 'Barlow', sans-serif; }
        .btn-edit-sm:hover { background: #0a0a0a; color: #fff; border-color: #0a0a0a; }
        .settings-fields { padding: 20px 22px; display: flex; flex-direction: column; gap: 18px; }
        .field-row { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
        .field-label { font-size: 11px; font-weight: 700; color: #aaa; text-transform: uppercase; letter-spacing: 0.06em; margin-bottom: 6px; }
        .field-value { font-size: 14px; font-weight: 600; color: #0a0a0a; }
        .field-value.muted { color: #ccc; font-weight: 400; font-style: italic; }
        .field-input { width: 100%; padding: 10px 14px; border: 1.5px solid #e5e5e0; border-radius: 8px; font-size: 14px; color: #0a0a0a; background: #fafaf7; font-family: 'Barlow', sans-serif; transition: border-color 0.18s; outline: none; }
        .field-input:focus { border-color: #c8f000; background: #fff; }

        .settings-toggle-row { display: flex; align-items: center; justify-content: space-between; padding: 14px 22px; border-top: 1px solid #f4f2e8; cursor: pointer; transition: background 0.15s; }
        .settings-toggle-row:hover { background: #fafaf7; }
        .toggle-title { font-size: 13.5px; font-weight: 700; color: #0a0a0a; margin-bottom: 1px; }
        .toggle-sub { font-size: 12px; color: #aaa; }
        .toggle-switch { width: 40px; height: 22px; background: #e8e5de; border-radius: 100px; position: relative; flex-shrink: 0; transition: background 0.2s; cursor: pointer; }
        .toggle-switch.on { background: #c8f000; }
        .toggle-knob { position: absolute; top: 3px; left: 3px; width: 16px; height: 16px; background: #fff; border-radius: 50%; transition: transform 0.2s; box-shadow: 0 1px 4px rgba(0,0,0,0.15); }
        .toggle-switch.on .toggle-knob { transform: translateX(18px); }

        .danger-zone { padding: 18px 22px; }
        .danger-title { font-size: 13px; font-weight: 800; color: #dc2626; margin-bottom: 4px; }
        .danger-sub { font-size: 12px; color: #aaa; margin-bottom: 14px; }
        .btn-danger { font-size: 12.5px; font-weight: 700; color: #dc2626; background: rgba(220,38,38,0.06); border: 1px solid rgba(220,38,38,0.18); padding: 7px 14px; border-radius: 7px; cursor: pointer; font-family: 'Barlow', sans-serif; transition: all 0.18s; }
        .btn-danger:hover { background: #dc2626; color: #fff; }

        .activity-item { display: flex; align-items: flex-start; gap: 12px; padding: 12px 22px; border-bottom: 1px solid #f4f2e8; transition: background 0.15s; }
        .activity-item:last-child { border-bottom: none; }
        .activity-item:hover { background: #fafaf7; }
        .activity-dot { width: 8px; height: 8px; border-radius: 50%; margin-top: 5px; flex-shrink: 0; }
        .dot-lime { background: #c8f000; }
        .dot-gray { background: #e8e5de; }
        .activity-text { font-size: 13px; color: #555; line-height: 1.5; flex: 1; }
        .activity-text strong { color: #0a0a0a; font-weight: 700; }
        .activity-time { font-size: 11px; color: #bbb; margin-top: 2px; }

        @media (max-width: 1100px) { .profile-grid { grid-template-columns: 1fr; } .profile-card { position: static; } }
        @media (max-width: 900px) { .metrics-grid { grid-template-columns: 1fr 1fr; } .bottom-grid { grid-template-columns: 1fr; } .pricing-dash-grid { grid-template-columns: 1fr; } .field-row { grid-template-columns: 1fr; } }
        @media (max-width: 700px) { .dash-sidebar { display: none; } .dash-content { padding: 16px 16px 60px; } }
      `}</style>

      <div className="dash-layout">
        {/* SIDEBAR */}
        <aside className="dash-sidebar">
          <div className="sidebar-logo"><Logo variant="dark" /></div>
          <nav className="sidebar-nav">
            <div className={`nav-overview ${view === 'overview' ? 'active' : ''}`} onClick={() => setView('overview')}>
              <span className="nav-icon">⊞</span> Dashboard
            </div>
            <div className="nav-section-label">Outreach</div>
            {NAV_ITEMS.outreach.map(item => (
              <div key={item.id} className={`nav-item ${view === item.id ? 'active' : ''}`} onClick={() => item.id && setView(item.id)}>
                <span className="nav-icon">{item.icon}</span> {item.label}
              </div>
            ))}
            <div className="nav-section-label">Engagement</div>
            {NAV_ITEMS.engagement.map(item => (
              <div key={item.label} className="nav-item locked">
                <span className="nav-icon">{item.icon}</span> {item.label}
                <span className="lock-badge">Soon</span>
              </div>
            ))}
            <div className="nav-section-label">System</div>
            {NAV_ITEMS.system.map(item => (
              <div key={item.label} className={`nav-item ${view === item.id ? 'active' : ''}`} onClick={() => item.id && setView(item.id)}>
                <span className="nav-icon">{item.icon}</span> {item.label}
              </div>
            ))}
          </nav>
          <div className="sidebar-user">
            <div className="sidebar-user-card" onClick={() => setView('settings')}>
              <div className="sidebar-avatar">KT</div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div className="sidebar-user-name">Krupa Trivedi</div>
                <div className="sidebar-user-email">krupa@company.com</div>
              </div>
              <span style={{ color: 'rgba(255,255,255,0.2)', fontSize: 11 }}>›</span>
            </div>
          </div>
          <div className="sidebar-footer">
            <div className="trial-box">
              <div className="trial-header">
                <span className="trial-label">⏱ Free Trial</span>
                <span className="trial-days-badge">11 days left</span>
              </div>
              <div className="trial-bar"><div className="trial-bar-fill" /></div>
              <button className="btn-upgrade" onClick={() => setView('pricing-dash')}>Upgrade Plan →</button>
            </div>
          </div>
        </aside>

        {/* MAIN */}
        <div className="dash-main">
          <div className="dash-topbar">
            <div className="topbar-left">
              <span className="breadcrumb-item">Linkziy</span>
              <span className="breadcrumb-sep">›</span>
              <span className="breadcrumb-item active">{viewLabels[view] || view}</span>
            </div>
            <div className="topbar-right">
              <div className="topbar-btn">🔔<span className="notif-dot" /></div>
              <div className="topbar-avatar-btn" onClick={() => setView('settings')}>
                <div className="topbar-avatar">KT</div>
                <span className="topbar-name">Krupa</span>
              </div>
            </div>
          </div>

          {/* OVERVIEW */}
          {view === 'overview' && (
            <div className="dash-content">
              <div className="page-header">
                <div>
                  <div className="page-eyebrow"><span className="eyebrow-dot" /> Overview</div>
                  <div className="page-title">Linkziy Dashboard</div>
                  <div className="page-sub">Real-time performance for your active sequences</div>
                </div>
                <div className="select-wrap"><select><option>All Time</option><option>This Week</option><option>This Month</option></select></div>
              </div>
              <div className="metrics-grid">
                <div className="metric-card"><div className="metric-card-top"><div className="metric-icon icon-dark">👥</div><span className="metric-badge badge-live">Live</span></div><div className="metric-label">Active Prospects</div><div className="metric-value">0</div></div>
                <div className="metric-card"><div className="metric-card-top"><div className="metric-icon icon-lime">⏱</div><span className="metric-badge badge-live">Live</span></div><div className="metric-label">Pending Follow-ups</div><div className="metric-value">0</div></div>
                <div className="metric-card"><div className="metric-card-top"><div className="metric-icon icon-cream">💬</div></div><div className="metric-label">Replies Received</div><div className="metric-value">0</div></div>
                <div className="metric-card"><div className="metric-card-top"><div className="metric-icon icon-cream">👍</div></div><div className="metric-label">Positive Leads</div><div className="metric-value">0</div></div>
                <div className="metric-card"><div className="metric-card-top"><div className="metric-icon icon-dark">📊</div><span className="metric-badge badge-live">Live</span></div><div className="metric-label">Engagement Rate</div><div className="metric-value">0.0%</div></div>
                <div className="metric-card"><div className="metric-card-top"><div className="metric-icon icon-lime">⚡</div><span className="metric-badge badge-track">On Track</span></div><div className="metric-label">Daily Action Usage</div><div className="metric-value">0 <span className="sub">/ 50</span></div></div>
              </div>
              <div className="bottom-grid">
                <div className="chart-card">
                  <div className="chart-header">
                    <div><div className="chart-title">Daily Activity</div><div className="chart-sub">Successful linkziys per day this week</div></div>
                    <div><div className="chart-stat-val">0</div><div className="chart-stat-label">this week</div></div>
                  </div>
                  <div className="chart-bars">
                    {[0,0,0,0,0,0,0].map((_,i) => <div className="chart-bar-wrap" key={i}><div className="chart-bar" style={{ height: '2px' }} /></div>)}
                  </div>
                  <div className="chart-days">{['Sat','Sun','Mon','Tue','Wed','Thu','Fri'].map(d => <div className="chart-day" key={d}>{d}</div>)}</div>
                </div>
                <div className="tour-card">
                  <div className="tour-head">
                    <div className="tour-head-left">
                      <div className="tour-star-box">⭐</div>
                      <div><div className="tour-label-top">Product Tour</div><div className="tour-count">{tourIdx + 1} of {TOUR_SLIDES.length}</div></div>
                    </div>
                    <div className="tour-nav-btns">
                      <button className="tour-nav-btn" onClick={() => setTourIdx((tourIdx - 1 + TOUR_SLIDES.length) % TOUR_SLIDES.length)}>‹</button>
                      <button className="tour-nav-btn" onClick={() => setTourIdx((tourIdx + 1) % TOUR_SLIDES.length)}>›</button>
                    </div>
                  </div>
                  <div className="tour-slide-icon">{slide.icon}</div>
                  <div className="tour-feature-label">{slide.label}</div>
                  <div className="tour-feature-title">{slide.title}</div>
                  <div className="tour-desc">{slide.desc}</div>
                  <ul className="tour-bullets">{slide.bullets.map(b => <li key={b}>{b}</li>)}</ul>
                  <button className="btn-tour" onClick={() => slide.ctaView && setView(slide.ctaView)}>{slide.cta}</button>
                  <div className="tour-dots">{TOUR_SLIDES.map((_,i) => <div key={i} className={`tour-dot ${i === tourIdx ? 'active' : ''}`} onClick={() => setTourIdx(i)} />)}</div>
                </div>
              </div>
            </div>
          )}

          {/* PROSPECTS */}
          {view === 'prospects' && (
            <div className="dash-content">
              <div className="page-header">
                <div><div className="page-eyebrow"><span className="eyebrow-dot" /> Outreach</div><div className="page-title">Prospect Intelligence</div><div className="page-sub">Manage your outreach lists and target campaigns</div></div>
                <button className="btn-primary">+ Create New List</button>
              </div>
              <div className="empty-section"><div className="empty-state"><div className="empty-icon">👥</div><div className="empty-title">No Lists Yet</div><div className="empty-sub">Create your first list to start managing and targeting your prospects</div><button className="btn-outline">+ Create My First List</button></div></div>
            </div>
          )}

          {/* CAMPAIGNS */}
          {view === 'campaigns' && (
            <div className="dash-content">
              <div className="page-header">
                <div><div className="page-eyebrow"><span className="eyebrow-dot" /> Outreach</div><div className="page-title">Campaign Sequences</div><div className="page-sub">Manage your automated LinkedIn outreach sequences</div></div>
                <button className="btn-primary">+ New Campaign</button>
              </div>
              <div className="empty-section"><div className="empty-state"><div className="empty-icon">🚀</div><div className="empty-title">No Campaigns Yet</div><div className="empty-sub">Create your first campaign to start automating your outreach at scale</div><button className="btn-primary">+ New Campaign</button></div></div>
            </div>
          )}

          {/* ANALYTICS */}
          {view === 'analytics' && (
            <div className="dash-content">
              <div className="page-header">
                <div><div className="page-eyebrow"><span className="eyebrow-dot" /> Insights</div><div className="page-title">Campaign Analytics</div><div className="page-sub">Track performance across all your campaigns</div></div>
                <div className="select-wrap"><select><option>Last 30 Days</option><option>Last 7 Days</option><option>All Time</option></select></div>
              </div>
              <div className="metrics-grid" style={{ gridTemplateColumns: 'repeat(3,1fr)', marginBottom: 14 }}>
                <div className="metric-card"><div className="metric-label">Total Connections Sent</div><div className="metric-value" style={{ fontSize: 32 }}>0</div></div>
                <div className="metric-card"><div className="metric-label">Accepted Rate</div><div className="metric-value" style={{ fontSize: 32 }}>0%</div></div>
                <div className="metric-card"><div className="metric-label">Reply Rate</div><div className="metric-value" style={{ fontSize: 32 }}>0%</div></div>
              </div>
              <div className="chart-card">
                <div className="chart-header"><div><div className="chart-title">Performance Over Time</div><div className="chart-sub">Daily outreach activity and responses</div></div></div>
                <div className="chart-bars">{[0,0,0,0].map((_,i) => <div className="chart-bar-wrap" key={i}><div className="chart-bar" style={{ height:'2px' }} /></div>)}</div>
                <div className="chart-days">{['Week 1','Week 2','Week 3','Week 4'].map(d => <div className="chart-day" key={d}>{d}</div>)}</div>
              </div>
            </div>
          )}

          {/* PRICING */}
          {view === 'pricing-dash' && (
            <div className="dash-content">
              <div className="page-header">
                <div><div className="page-eyebrow"><span className="eyebrow-dot" /> Billing</div><div className="page-title">Choose Your Plan</div><div className="page-sub">Upgrade to unlock the full power of Linkziy</div></div>
                <Link to="/pricing" style={{ fontSize: 13, color: '#6a9500', fontWeight: 700, textDecoration: 'none' }}>View full pricing →</Link>
              </div>
              <div className="pricing-dash-grid">
                {[
                  { name: 'Starter', price: '$0', desc: 'Current plan · 11 days left', cta: 'Current Plan', featured: false, current: true },
                  { name: 'Growth', price: '$49', desc: 'For serious LinkedIn outreach', cta: 'Upgrade Now', featured: true },
                  { name: 'Scale', price: '$99', desc: 'For teams and agencies', cta: 'Contact Sales', featured: false },
                ].map(plan => (
                  <div key={plan.name} className={`price-dash-card ${plan.featured ? 'featured' : ''}`}>
                    {plan.featured && <div className="featured-badge">Popular</div>}
                    <div style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize: 24, marginBottom: 6 }}>{plan.name}</div>
                    <div style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize: 44, lineHeight: 1, marginBottom: 4 }}>
                      {plan.price}<span style={{ fontSize: 16, fontFamily:"'Barlow',sans-serif", fontWeight: 400, color: plan.featured ? 'rgba(0,0,0,0.5)' : '#aaa' }}>/mo</span>
                    </div>
                    <div style={{ fontSize: 13, color: plan.featured ? 'rgba(0,0,0,0.55)' : '#aaa', marginBottom: 20 }}>{plan.desc}</div>
                    <button style={{ width:'100%', padding:'10px', borderRadius:8, fontFamily:"'Barlow',sans-serif", fontSize:13.5, fontWeight:800, cursor:'pointer', border:'none',
                      background: plan.featured ? '#0a0a0a' : plan.current ? '#f4f2e8' : '#0a0a0a',
                      color: plan.featured ? '#c8f000' : plan.current ? '#999' : '#fff' }}>
                      {plan.cta}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* PROFILE & SETTINGS */}
          {view === 'settings' && (
            <div className="dash-content">
              <div className="page-header">
                <div><div className="page-eyebrow"><span className="eyebrow-dot" /> Account</div><div className="page-title">Profile & Settings</div><div className="page-sub">Manage your account, preferences, and notifications</div></div>
                <button className="btn-primary" onClick={() => setEditProfile(!editProfile)}>{editProfile ? '✓ Save Changes' : '✎ Edit Profile'}</button>
              </div>
              <div className="profile-grid">
                {/* Left Panel */}
                <div style={{ display:'flex', flexDirection:'column', gap:14 }}>
                  <div className="profile-card">
                    <div className="profile-card-banner" />
                    <div className="profile-card-body">
                      <div className="profile-avatar-wrap">
                        <div className="profile-big-avatar">KT</div>
                        <div className="profile-online-dot" />
                      </div>
                      <div className="profile-name">Krupa Trivedi</div>
                      <div className="profile-handle">@krupatrivedi · Free Plan</div>
                      <div className="profile-divider" />
                      <div className="profile-stat-row">
                        <div className="profile-stat"><div className="profile-stat-val">0</div><div className="profile-stat-label">Prospects</div></div>
                        <div className="profile-stat"><div className="profile-stat-val">0</div><div className="profile-stat-label">Campaigns</div></div>
                        <div className="profile-stat"><div className="profile-stat-val">11</div><div className="profile-stat-label">Days Left</div></div>
                      </div>
                      <div className="profile-plan-box">
                        <div className="profile-plan-row"><span className="profile-plan-name">Starter Plan</span><span className="plan-badge-free">Free</span></div>
                        <div className="profile-plan-sub">11 of 14 trial days remaining</div>
                        <div className="profile-plan-bar"><div className="profile-plan-bar-fill" /></div>
                        <button className="btn-upgrade" style={{ fontSize: 12 }} onClick={() => setView('pricing-dash')}>Upgrade to Growth →</button>
                      </div>
                    </div>
                  </div>

                  <div className="settings-panel">
                    <div className="settings-panel-header">
                      <div><div className="settings-panel-title">Recent Activity</div><div className="settings-panel-sub">Your latest account events</div></div>
                    </div>
                    {[
                      { text: <><strong>Account</strong> created successfully</>, time: '2 days ago', active: true },
                      { text: <><strong>Trial period</strong> started</>, time: '2 days ago', active: true },
                      { text: <><strong>Email</strong> verified</>, time: '2 days ago', active: false },
                    ].map((item, i) => (
                      <div className="activity-item" key={i}>
                        <div className={`activity-dot ${item.active ? 'dot-lime' : 'dot-gray'}`} />
                        <div style={{ flex: 1 }}>
                          <div className="activity-text">{item.text}</div>
                          <div className="activity-time">{item.time}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Right Panels */}
                <div className="settings-panels">
                  <div className="settings-panel">
                    <div className="settings-panel-header">
                      <div><div className="settings-panel-title">Personal Information</div><div className="settings-panel-sub">Your name, email, and contact details</div></div>
                      <button className="btn-edit-sm" onClick={() => setEditProfile(!editProfile)}>{editProfile ? 'Cancel' : 'Edit'}</button>
                    </div>
                    <div className="settings-fields">
                      <div className="field-row">
                        <div><div className="field-label">Full Name</div>{editProfile ? <input className="field-input" defaultValue="Krupa Trivedi" /> : <div className="field-value">Krupa Trivedi</div>}</div>
                        <div><div className="field-label">Username</div>{editProfile ? <input className="field-input" defaultValue="krupatrivedi" /> : <div className="field-value">krupatrivedi</div>}</div>
                      </div>
                      <div className="field-row">
                        <div><div className="field-label">Email Address</div>{editProfile ? <input className="field-input" type="email" defaultValue="krupa@company.com" /> : <div className="field-value">krupa@company.com</div>}</div>
                        <div><div className="field-label">Company</div>{editProfile ? <input className="field-input" placeholder="Your company" /> : <div className="field-value muted">Not set</div>}</div>
                      </div>
                      <div><div className="field-label">LinkedIn Profile URL</div>{editProfile ? <input className="field-input" placeholder="https://linkedin.com/in/yourprofile" /> : <div className="field-value muted">Not connected</div>}</div>
                    </div>
                  </div>

                  <div className="settings-panel">
                    <div className="settings-panel-header">
                      <div><div className="settings-panel-title">Notifications</div><div className="settings-panel-sub">Choose what you want to be notified about</div></div>
                    </div>
                    {[
                      { key: 'email', title: 'Email Notifications', sub: 'Receive updates and alerts via email' },
                      { key: 'campaigns', title: 'Campaign Activity', sub: 'Get notified when campaigns complete or need attention' },
                      { key: 'weekly', title: 'Weekly Digest', sub: 'A performance summary delivered every Monday' },
                    ].map(item => (
                      <div className="settings-toggle-row" key={item.key} onClick={() => setNotifs(n => ({ ...n, [item.key]: !n[item.key] }))}>
                        <div><div className="toggle-title">{item.title}</div><div className="toggle-sub">{item.sub}</div></div>
                        <Toggle on={notifs[item.key]} />
                      </div>
                    ))}
                  </div>

                  <div className="settings-panel">
                    <div className="settings-panel-header">
                      <div><div className="settings-panel-title">Security</div><div className="settings-panel-sub">Password and authentication settings</div></div>
                      <button className="btn-edit-sm">Change Password</button>
                    </div>
                    <div className="settings-fields">
                      <div className="field-row">
                        <div><div className="field-label">Password</div><div className="field-value">••••••••••</div></div>
                        <div><div className="field-label">Last Changed</div><div className="field-value muted">Never</div></div>
                      </div>
                    </div>
                    <div className="settings-toggle-row">
                      <div><div className="toggle-title">Two-Factor Authentication</div><div className="toggle-sub">Add an extra layer of security to your account</div></div>
                      <Toggle on={false} />
                    </div>
                  </div>

                  <div className="settings-panel">
                    <div className="settings-panel-header">
                      <div><div className="settings-panel-title" style={{ color:'#dc2626' }}>Danger Zone</div><div className="settings-panel-sub">Irreversible actions — proceed with caution</div></div>
                    </div>
                    <div className="danger-zone">
                      <div className="danger-title">Delete Account</div>
                      <div className="danger-sub">Permanently delete your account and all associated data. This cannot be undone.</div>
                      <button className="btn-danger">Delete My Account</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

        </div>
      </div>
    </>
  )
}
