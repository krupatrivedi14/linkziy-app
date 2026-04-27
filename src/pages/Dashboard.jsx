import { useState, useMemo } from 'react'
import Logo from '../components/Logo'
import { Link } from 'react-router-dom'

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
  { title: 'Welcome to your Dashboard', desc: 'This page is your control center for outreach. It brings together live LinkedIn metrics, campaign status, limits, and your top prospects — so you know what to do next.' },
  { title: 'Check LinkedIn Outreach', desc: 'Track messages sent, replies received, and your response rate in the live outreach banner.' },
  { title: 'Review Your Profile', desc: 'Confirm your workspace name, profile details, and LinkedIn-style identity card.' },
  { title: 'Monitor Performance', desc: 'Use the performance cards to understand requests, replies, campaigns, and daily actions.' },
  { title: 'Follow the Trend Chart', desc: 'See request patterns over time so you can understand consistency and growth.' },
  { title: 'Watch Quotas Safely', desc: 'Stay inside safe daily limits for connections, messages, profile visits, and engagement.' },
  { title: 'Customize Widgets', desc: 'Show or hide dashboard widgets based on the information you care about most.' },
  { title: 'Explore Workspace Tools', desc: 'Use the sidebar to open prospects, sequences, analytics, safety, settings, and pricing.' },
]

const NAV = {
  outreach: [
    { id: 'prospects', label: 'Prospects', d: 'M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2 M9 7a4 4 0 1 0 0-8 4 4 0 0 0 0 8' },
    { id: 'campaigns', label: 'Sequences', d: 'M22 2 11 13 M22 2l-7 20-4-9-9-4 20-7z' },
    { id: 'analytics', label: 'Campaign Analytics', d: 'M3 3v18h18 M8 17V9 M13 17V5 M18 17v-7' },
  ],
  engagement: [
    { label: 'Content Studio', d: 'M12 20h9 M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4 12.5-12.5z' },
    { label: 'Inbox', d: 'M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4 M7 10l5 5 5-5 M12 15V3' },
  ],
  system: [
    { id: 'workspace_analytics', label: 'Workspace Analytics', d: 'M3 13h4v8H3z M10 3h4v18h-4z M17 8h4v13h-4z' },
    { id: 'safety', label: 'Account Safety', d: 'M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z' },
    { id: 'settings', label: 'Settings', d: 'M12 15.5A3.5 3.5 0 1 0 12 8a3.5 3.5 0 0 0 0 7.5z' },
    { id: 'pricing', label: 'Pricing', d: 'M20 12V8H4v4 M4 16h16 M6 20h12 M6 4h12' },
  ],
}

function Icon({ d }) {
  return (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d={d} />
    </svg>
  )
}

function Toggle({ on, onClick }) {
  return (
    <div onClick={onClick} style={{ width:40,height:22,background:on?'#c8f000':'#e0ddd6',borderRadius:100,position:'relative',cursor:'pointer',transition:'background 0.2s',flexShrink:0 }}>
      <div style={{ position:'absolute',top:3,left:on?21:3,width:16,height:16,background:'#fff',borderRadius:'50%',transition:'left 0.2s',boxShadow:'0 1px 4px rgba(0,0,0,0.18)' }} />
    </div>
  )
}

export default function Dashboard() {
  const user = useMemo(() => getUser(), [])
  const ui = initials(user.name)
  const uf = firstName(user.name)

  const [view, setView] = useState('overview')
  const [expanded, setExpanded] = useState(true)
  const [hoveringSidebar, setHoveringSidebar] = useState(false)
  const [welcomeIdx, setWelcomeIdx] = useState(0)
  const [tourIdx, setTourIdx] = useState(0)
  const [timeRange, setTimeRange] = useState('Last 30 days')
  const [showRangeMenu, setShowRangeMenu] = useState(false)
  const [showWidgetModal, setShowWidgetModal] = useState(false)
  const [showWelcome, setShowWelcome] = useState(true)
  const [widgets, setWidgets] = useState({ performance: true, quota: true, streak: true, topPerformers: true })
  const [editProfile, setEditProfile] = useState(false)
  const [notifs, setNotifs] = useState({ email: true, campaigns: true, weekly: false })
  const slide = TOUR_SLIDES[tourIdx]
  const navGo = (v) => {
    setView(v)
    setShowRangeMenu(false)
    setExpanded(false)
  }

  const CSS = `
    @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Barlow:wght@400;500;600;700;800&display=swap');
    *,*::before,*::after{box-sizing:border-box;margin:0;padding:0;}
    body{font-family:'Barlow',sans-serif;background:#f4f2eb;overflow-x:hidden;cursor:auto!important;}
    a{text-decoration:none;}

    /* LAYOUT */
    .dl{display:flex;min-height:100vh;}

    /* Sidebar */
    .sb{width:256px;background:#0d0d0d;display:flex;flex-direction:column;height:100vh;position:sticky;top:0;flex-shrink:0;overflow:hidden;transition:width 0.28s cubic-bezier(0.4,0,0.2,1);z-index:100}
    .sb.col{width:64px}
    .sb-logo{
      padding:17px 16px 13px;
      border-bottom:1px solid rgba(255,255,255,0.05);
      display:flex;
      align-items:center;
      gap:10px;
      min-height:60px;
      flex-shrink:0;
    }

  .sb-logo-mark{
    width:34px;
    height:34px;
    display:flex;
    align-items:center;
    justify-content:center;
    flex-shrink:0;
    overflow:visible;
    background:transparent;
    border-radius:0;
  }

.sb-logo-mark svg,
.sb-logo-mark img{
    width:30px !important;
    height:30px !important;
    max-width:30px !important;
    max-height:30px !important;
    object-fit:contain;
    display:block;
}

.sb-logo-text{
    font-family:'Bebas Neue',sans-serif;
    font-size:21px;
    letter-spacing:1.5px;
    color:#fff;
    white-space:nowrap;
    overflow:hidden;
    transition:opacity 0.2s,transform 0.2s;
  }

.sb.col .sb-logo-text{
    opacity:0;
    transform:translateX(-6px);
    pointer-events:none;
  }
    
    .sb-nav{flex:1;padding:10px 8px;overflow-y:auto;overflow-x:hidden;scrollbar-width:none}
    .sb-nav::-webkit-scrollbar{display:none}
    .sb-sec{font-size:9px;font-weight:700;letter-spacing:0.16em;text-transform:uppercase;color:rgba(255,255,255,0.18);padding:0 10px;margin:18px 0 4px;white-space:nowrap;overflow:hidden;transition:opacity 0.2s}
    .sb.col .sb-sec{opacity:0}
    .sb-item{display:flex;align-items:center;gap:10px;padding:9px 10px;border-radius:9px;font-size:13px;font-weight:500;color:rgba(255,255,255,0.45);cursor:pointer;transition:all 0.18s;position:relative;white-space:nowrap;margin-bottom:1px;min-height:40px}
    .sb-item:hover:not(.lk){background:rgba(255,255,255,0.06);color:rgba(255,255,255,0.88)}
    .sb-item.on{background:rgba(200,240,0,0.12);color:#c8f000}
    .sb-item.lk{cursor:default;opacity:0.3}
    .sb-ic{width:20px;height:20px;flex-shrink:0;display:flex;align-items:center;justify-content:center;color:inherit}
    .sb-lbl{overflow:hidden;transition:opacity 0.2s}
    .sb.col .sb-lbl{opacity:0;pointer-events:none}
    .sb-soon{margin-left:auto;font-size:9px;font-weight:700;letter-spacing:0.04em;text-transform:uppercase;background:rgba(255,255,255,0.06);color:rgba(255,255,255,0.22);padding:2px 6px;border-radius:4px;flex-shrink:0;transition:opacity 0.2s}
    .sb.col .sb-soon{opacity:0}
    .sb.col .sb-item{justify-content:center}
    .sb.col .sb-item:not(.lk):hover::after{content:attr(data-tip);position:absolute;left:calc(100% + 10px);top:50%;transform:translateY(-50%);background:#1c1c1c;color:#fff;font-size:12px;font-weight:600;padding:5px 10px;border-radius:7px;white-space:nowrap;border:1px solid rgba(255,255,255,0.08);pointer-events:none;z-index:999}
    .sb-bottom{flex-shrink:0;border-top:1px solid rgba(255,255,255,0.05)}
    .sb-user{display:flex;align-items:center;gap:10px;padding:12px;cursor:pointer;transition:background 0.18s;overflow:hidden}
    .sb-user:hover{background:rgba(255,255,255,0.05)}
    .sb-av{width:34px;height:34px;border-radius:9px;background:#c8f000;color:#0d0d0d;font-family:'Bebas Neue',sans-serif;font-size:13px;display:flex;align-items:center;justify-content:center;flex-shrink:0;font-weight:900}
    .sb-uinfo{flex:1;min-width:0;overflow:hidden;transition:opacity 0.2s}
    .sb.col .sb-uinfo{opacity:0}
    .sb-uname{font-size:13px;font-weight:700;color:rgba(255,255,255,0.88);overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
    .sb-urole{font-size:11px;color:rgba(255,255,255,0.3)}
    .trial-blk{padding:8px 10px 14px;transition:opacity 0.2s,transform 0.2s}
    .sb.col .trial-blk{opacity:0;pointer-events:none;transform:translateY(4px)}
    .trial-inner{background:rgba(200,240,0,0.07);border:1px solid rgba(200,240,0,0.12);border-radius:10px;padding:12px}
    .trial-top{display:flex;align-items:center;justify-content:space-between;margin-bottom:6px}
    .trial-lbl{font-size:10px;font-weight:700;letter-spacing:0.08em;text-transform:uppercase;color:rgba(255,255,255,0.3)}
    .trial-badge{font-size:10px;font-weight:800;color:#c8f000;background:rgba(200,240,0,0.1);padding:2px 8px;border-radius:100px}
    .trial-bar{height:3px;background:rgba(255,255,255,0.07);border-radius:2px;margin-bottom:10px;overflow:hidden}
    .trial-fill{height:100%;width:65%;background:linear-gradient(90deg,#c8f000,#a8cc00);border-radius:2px}
    .btn-up{width:100%;padding:8px;background:#c8f000;color:#0d0d0d;border:none;border-radius:8px;font-size:12px;font-weight:800;cursor:pointer;transition:background 0.18s;letter-spacing:0.01em}
    .btn-up:hover{background:#b4d800}

    /* MAIN */
    .dm{flex:1;min-width:0;display:flex;flex-direction:column;overflow-y:auto;}

    /* TOPBAR */
    .tb{background:#fff;border-bottom:1px solid #eae8e1;padding:0 26px;height:54px;display:flex;align-items:center;justify-content:space-between;position:sticky;top:0;z-index:60;}
    .tb-ws{display:flex;align-items:center;gap:7px;padding:5px 10px;border-radius:8px;border:1px solid #eae8e1;background:#f9f8f4;cursor:pointer;font-size:13px;font-weight:700;color:#0a0a0a;}
    .tb-ws:hover{border-color:#c8f000;}
    .tb-ws-ava{width:20px;height:20px;background:#c8f000;border-radius:4px;display:flex;align-items:center;justify-content:center;font-size:9px;font-weight:800;color:#0a0a0a;}
    .tb-right{display:flex;align-items:center;gap:10px;}
    .tb-name{font-size:13px;font-weight:700;color:#0a0a0a;}
    .tb-role{font-size:10px;color:#aaa;}
    .tb-ava{width:34px;height:34px;background:#c8f000;color:#0a0a0a;border-radius:50%;display:flex;align-items:center;justify-content:center;font-family:'Bebas Neue',sans-serif;font-size:13px;cursor:pointer;flex-shrink:0;}
    .tb-bell{width:34px;height:34px;border:1px solid #eae8e1;border-radius:8px;display:flex;align-items:center;justify-content:center;cursor:pointer;color:#888;position:relative;}
    .tb-bell:hover{border-color:#0a0a0a;}
    .bell-dot{position:absolute;top:7px;right:7px;width:6px;height:6px;background:#ef4444;border-radius:50%;border:1.5px solid #fff;}

    /* CONTENT */
    .dc{padding:24px 28px 60px;flex:1;}

    /* PAGE HEADER */
    .ph{display:flex;align-items:flex-start;justify-content:space-between;margin-bottom:22px;gap:16px;}
    .ph-title{font-size:27px;font-weight:800;color:#0a0a0a;letter-spacing:-0.3px;}
    .ph-sub{font-size:13.5px;color:#aaa;margin-top:3px;}
    .ph-right{display:flex;align-items:center;gap:10px;flex-shrink:0;}

    .range-btn{display:flex;align-items:center;gap:6px;padding:8px 14px;background:#fff;border:1px solid #eae8e1;border-radius:8px;font-size:13px;font-weight:600;color:#0a0a0a;cursor:pointer;position:relative;}
    .range-btn:hover{border-color:#c8f000;}
    .range-menu{position:absolute;top:calc(100% + 4px);right:0;background:#fff;border:1px solid #eae8e1;border-radius:10px;padding:4px;min-width:160px;z-index:100;box-shadow:0 4px 20px rgba(0,0,0,0.09);}
    .range-opt{padding:9px 14px;border-radius:7px;font-size:13px;cursor:pointer;display:flex;align-items:center;justify-content:space-between;color:#444;}
    .range-opt:hover{background:#f4f2eb;}
    .range-opt.sel{font-weight:700;color:#0a0a0a;}

    .btn-cw{display:flex;align-items:center;gap:7px;padding:8px 14px;background:#fff;border:1px solid #eae8e1;border-radius:8px;font-size:13px;font-weight:600;color:#0a0a0a;cursor:pointer;}
    .btn-cw:hover{border-color:#c8f000;}
    .btn-primary{display:inline-flex;align-items:center;gap:6px;background:#c8f000;color:#0a0a0a;padding:10px 18px;border-radius:8px;font-size:13px;font-weight:800;font-family:'Barlow',sans-serif;border:none;cursor:pointer;}
    .btn-primary:hover{background:#b8dc00;}
    .btn-outline{display:inline-flex;align-items:center;gap:6px;background:#fff;color:#0a0a0a;padding:10px 18px;border-radius:8px;font-size:13px;font-weight:700;font-family:'Barlow',sans-serif;border:1.5px solid #eae8e1;cursor:pointer;}
    .btn-outline:hover{border-color:#0a0a0a;}

    /* OUTREACH BANNER */
    .ob{background:linear-gradient(135deg,#1565e8,#1a4fd8);border-radius:16px;padding:26px 32px;margin-bottom:16px;display:flex;align-items:center;justify-content:space-between;}
    .ob-h3{font-size:14px;font-weight:700;color:rgba(255,255,255,0.75);display:flex;align-items:center;gap:8px;margin-bottom:18px;}
    .ob-live{background:rgba(255,255,255,0.18);color:#fff;font-size:10px;font-weight:700;padding:2px 8px;border-radius:100px;}
    .ob-row{display:flex;align-items:center;gap:10px;margin-bottom:12px;}
    .ob-icon{width:28px;height:28px;background:rgba(255,255,255,0.15);border-radius:7px;display:flex;align-items:center;justify-content:center;}
    .ob-lbl{font-size:13px;color:rgba(255,255,255,0.6);}
    .ob-val{font-size:18px;font-weight:800;color:#fff;}
    .ob-circle{width:110px;height:110px;border-radius:50%;border:5px solid rgba(255,255,255,0.2);display:flex;align-items:center;justify-content:center;font-size:26px;font-weight:800;color:rgba(255,255,255,0.8);}

    /* GRID HELPERS */
    .g2{display:grid;grid-template-columns:1fr 2fr;gap:16px;margin-bottom:16px;}
    .g2r{display:grid;grid-template-columns:2fr 1fr;gap:16px;margin-bottom:16px;}
    .g4{display:grid;grid-template-columns:repeat(4,1fr);gap:14px;margin-bottom:16px;}

    /* DARK CARD */
    .card-d{background:#1a1a1a;border-radius:14px;padding:20px;}
    /* LIGHT CARD */
    .card-l{background:#fff;border:1px solid #eae8e1;border-radius:14px;padding:22px;}

    /* PROFILE CARD (dark) */
    .pc-banner{height:60px;background:linear-gradient(135deg,#c8f000,#8ab000);border-radius:14px 14px 0 0;}
    .pc-body{padding:0 18px 20px;}
    .pc-ava-wrap{margin-top:-22px;margin-bottom:12px;position:relative;display:inline-block;}
    .pc-ava{width:50px;height:50px;background:linear-gradient(135deg,#c8f000,#8ab000);border-radius:50%;display:flex;align-items:center;justify-content:center;font-family:'Bebas Neue',sans-serif;font-size:20px;color:#0a0a0a;border:3px solid #1a1a1a;}
    .pc-li{position:absolute;bottom:0;right:-2px;width:16px;height:16px;background:#0077b5;border-radius:3px;border:2px solid #1a1a1a;display:flex;align-items:center;justify-content:center;font-size:8px;color:#fff;font-weight:800;}
    .pc-name{font-size:15px;font-weight:800;color:#fff;margin-bottom:2px;}
    .pc-sub{font-size:12px;color:rgba(255,255,255,0.38);margin-bottom:16px;}
    .pc-stats{display:flex;}
    .pc-stat{flex:1;text-align:center;}
    .pc-stat+.pc-stat{border-left:1px solid rgba(255,255,255,0.07);}
    .pc-sv{font-family:'Bebas Neue',sans-serif;font-size:22px;color:#fff;}
    .pc-sl{font-size:10px;color:rgba(255,255,255,0.3);}

    /* PERF CARD */
    .perf-head{display:flex;align-items:center;justify-content:space-between;margin-bottom:16px;}
    .perf-title{font-size:14px;font-weight:700;color:rgba(255,255,255,0.85);display:flex;align-items:center;gap:7px;}
    .tag-sm{font-size:10px;font-weight:700;color:rgba(255,255,255,0.35);background:rgba(255,255,255,0.06);padding:3px 8px;border-radius:6px;}
    .perf-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:10px;margin-bottom:14px;}
    .pm{background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.06);border-radius:10px;padding:14px;}
    .pm-icon{width:30px;height:30px;background:#c8f000;border-radius:8px;display:flex;align-items:center;justify-content:center;margin-bottom:10px;}
    .pm-val{font-size:22px;font-weight:800;color:#fff;}
    .pm-lbl{font-size:11px;color:rgba(255,255,255,0.38);}
    .pm-sub{font-size:10px;color:#c8f000;margin-top:2px;}
    .live-row{display:flex;align-items:center;justify-content:space-between;}
    .live-dot{width:7px;height:7px;border-radius:50%;background:#22c55e;animation:pulse 2s infinite;margin-right:6px;}
    @keyframes pulse{0%,100%{opacity:1}50%{opacity:0.5}}
    .live-txt{font-size:11px;color:rgba(255,255,255,0.35);display:flex;align-items:center;}
    .live-actions{font-size:11px;color:rgba(255,255,255,0.25);}

    /* TREND CHART */
    .chart-area{height:120px;overflow:hidden;}
    .chart-dates{display:flex;overflow-x:auto;margin-top:8px;gap:0;scrollbar-width:none;}
    .chart-dates::-webkit-scrollbar{display:none;}
    .chart-date{font-size:10px;color:rgba(255,255,255,0.28);white-space:nowrap;flex:1;text-align:center;}

    /* PROSPECT STATUS */
    .ps-head{display:flex;align-items:center;justify-content:space-between;margin-bottom:14px;}
    .ps-title{font-size:14px;font-weight:700;color:rgba(255,255,255,0.85);}
    .badge-running{background:rgba(34,197,94,0.15);color:#22c55e;font-size:11px;font-weight:700;padding:3px 10px;border-radius:100px;}
    .ps-item{display:flex;align-items:center;gap:12px;background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.06);border-radius:9px;padding:12px 14px;margin-bottom:8px;}
    .ps-icon{width:30px;height:30px;background:#c8f000;border-radius:8px;display:flex;align-items:center;justify-content:center;flex-shrink:0;}
    .ps-val{font-size:20px;font-weight:800;color:#fff;flex:1;}
    .ps-lbl{font-size:12px;color:rgba(255,255,255,0.4);}

    /* QUOTA CARD */
    .qc-icon{width:44px;height:44px;background:#c8f000;border-radius:11px;display:flex;align-items:center;justify-content:center;margin-bottom:14px;}
    .qc-title{font-size:13px;font-weight:700;color:rgba(255,255,255,0.7);margin-bottom:16px;}
    .qc-row{margin-bottom:12px;}
    .qc-rh{display:flex;align-items:center;justify-content:space-between;margin-bottom:5px;font-size:12.5px;color:rgba(255,255,255,0.55);}
    .qc-rv{font-size:11.5px;color:rgba(255,255,255,0.3);}
    .qc-bar{height:3px;background:rgba(255,255,255,0.07);border-radius:2px;}

    /* STREAK */
    .streak-badge{float:right;background:rgba(200,240,0,0.12);color:#c8f000;font-size:10px;font-weight:800;padding:3px 10px;border-radius:100px;}
    .streak-icon{width:44px;height:44px;background:rgba(255,255,255,0.05);border-radius:11px;display:flex;align-items:center;justify-content:center;margin-bottom:14px;clear:both;}
    .streak-lbl{font-size:13px;color:rgba(255,255,255,0.5);margin-bottom:4px;}
    .streak-val{font-size:42px;font-weight:900;color:#fff;line-height:1;}
    .streak-unit{font-size:16px;color:rgba(255,255,255,0.38);font-weight:400;margin-left:4px;}
    .streak-sub{font-size:11.5px;color:rgba(255,255,255,0.25);margin-top:4px;}

    /* TOUR CARD */
    .tour-head{display:flex;align-items:center;justify-content:space-between;margin-bottom:16px;}
    .tour-title-left{display:flex;align-items:center;gap:9px;}
    .tour-star{width:32px;height:32px;background:rgba(200,240,0,0.1);border-radius:9px;display:flex;align-items:center;justify-content:center;font-size:14px;}
    .tour-lbl{font-size:13.5px;font-weight:700;color:rgba(255,255,255,0.85);}
    .tour-count{font-size:11px;color:rgba(255,255,255,0.28);}
    .tour-nav{display:flex;gap:5px;}
    .tour-nb{width:28px;height:28px;border-radius:50%;border:1px solid rgba(255,255,255,0.1);background:transparent;color:rgba(255,255,255,0.4);font-size:14px;cursor:pointer;display:flex;align-items:center;justify-content:center;}
    .tour-nb:hover{background:rgba(255,255,255,0.07);color:#fff;}
    .tour-tag{font-size:10.5px;font-weight:800;letter-spacing:0.12em;color:#c8f000;margin-bottom:8px;}
    .tour-ft{font-size:15px;font-weight:800;color:#fff;line-height:1.2;margin-bottom:10px;text-transform:uppercase;}
    .tour-desc{font-size:12px;color:rgba(255,255,255,0.4);line-height:1.65;margin-bottom:12px;}
    .tour-bullets{list-style:none;display:flex;flex-direction:column;gap:7px;margin-bottom:16px;}
    .tour-bullets li{font-size:12px;color:rgba(255,255,255,0.48);display:flex;align-items:center;gap:8px;}
    .tbdot{width:6px;height:6px;border-radius:50%;background:#c8f000;flex-shrink:0;}
    .btn-tour{background:#c8f000;color:#0a0a0a;border:none;padding:10px;border-radius:8px;font-size:13px;font-weight:800;font-family:'Barlow',sans-serif;cursor:pointer;width:100%;}
    .tour-dots{display:flex;gap:4px;margin-top:12px;justify-content:center;}
    .tdot{height:4px;border-radius:100px;background:rgba(255,255,255,0.1);transition:all 0.25s;cursor:pointer;width:14px;}
    .tdot.on{background:#c8f000;width:24px;}

    /* TOP PERFORMERS */
    .tp-head{display:flex;align-items:center;justify-content:space-between;margin-bottom:14px;}
    .tp-title{font-size:14px;font-weight:700;color:rgba(255,255,255,0.85);display:flex;align-items:center;gap:8px;}
    .tp-icon{width:32px;height:32px;background:rgba(255,255,255,0.05);border-radius:9px;display:flex;align-items:center;justify-content:center;font-size:16px;}
    .tp-empty{text-align:center;padding:28px 20px;}
    .tp-ei{width:50px;height:50px;background:rgba(255,255,255,0.04);border-radius:50%;display:flex;align-items:center;justify-content:center;margin:0 auto 10px;font-size:22px;}
    .tp-et{font-size:13px;color:rgba(255,255,255,0.32);}
    .tp-es{font-size:11px;color:rgba(255,255,255,0.18);margin-top:3px;}

    /* WELCOME MODAL */
    .wm-overlay{position:fixed;inset:0;background:rgba(0,0,0,0.65);z-index:300;display:flex;align-items:center;justify-content:center;}
    .wm{background:#1a1a1a;border-radius:16px;width:660px;max-width:92vw;display:flex;overflow:hidden;}
    .wm-left{width:220px;flex-shrink:0;background:rgba(200,240,0,0.05);border-right:1px solid rgba(255,255,255,0.06);padding:28px 22px;}
    .wm-guide{display:flex;align-items:center;gap:8px;margin-bottom:18px;}
    .wm-guide-icon{width:26px;height:26px;background:rgba(200,240,0,0.12);border-radius:7px;display:flex;align-items:center;justify-content:center;font-size:12px;}
    .wm-guide-lbl{font-size:11px;font-weight:800;letter-spacing:0.1em;color:rgba(255,255,255,0.35);}
    .wm-step{display:flex;align-items:center;gap:10px;margin-bottom:12px;}
    .wm-sdot{width:7px;height:7px;border-radius:50%;background:rgba(200,240,0,0.25);flex-shrink:0;}
    .wm-sdot.on{background:#c8f000;}
    .wm-slbl{font-size:12px;color:rgba(255,255,255,0.38);}
    .wm-slbl.on{color:rgba(255,255,255,0.75);}
    .wm-right{flex:1;padding:30px 28px;}
    .wm-tour-tag{display:inline-flex;align-items:center;gap:6px;background:rgba(200,240,0,0.1);color:#c8f000;font-size:11px;font-weight:800;padding:4px 12px;border-radius:100px;margin-bottom:14px;}
    .wm-prog{display:flex;gap:4px;margin-bottom:6px;}
    .wm-pd{height:3px;border-radius:2px;flex:1;background:rgba(255,255,255,0.08);}
    .wm-pd.on{background:#c8f000;}
    .wm-cnt{font-size:11.5px;color:rgba(255,255,255,0.25);text-align:right;margin-bottom:16px;}
    .wm-title{font-size:26px;font-weight:800;color:#fff;line-height:1.1;margin-bottom:12px;}
    .wm-desc{font-size:13.5px;color:rgba(255,255,255,0.42);line-height:1.65;margin-bottom:24px;}
    .wm-actions{display:flex;align-items:center;justify-content:space-between;}
    .wm-skip{font-size:13px;color:rgba(255,255,255,0.3);cursor:pointer;background:none;border:none;font-family:'Barlow',sans-serif;}
    .wm-skip:hover{color:rgba(255,255,255,0.65);}
    .wm-continue{background:#c8f000;color:#0a0a0a;border:none;padding:11px 22px;border-radius:9px;font-size:14px;font-weight:800;font-family:'Barlow',sans-serif;cursor:pointer;}
    .wm-continue:hover{background:#b8dc00;}

    /* WIDGET MODAL */
    .wdg-overlay{position:fixed;inset:0;background:rgba(0,0,0,0.55);z-index:200;display:flex;align-items:center;justify-content:center;}
    .wdg{background:#1c1c1c;border-radius:16px;padding:28px;width:480px;max-width:90vw;position:relative;}
    .wdg-title{font-size:18px;font-weight:800;color:#fff;margin-bottom:4px;}
    .wdg-sub{font-size:13px;color:rgba(255,255,255,0.35);margin-bottom:20px;}
    .wdg-close{position:absolute;top:18px;right:18px;background:none;border:none;color:rgba(255,255,255,0.4);font-size:18px;cursor:pointer;}
    .wdg-grid{display:grid;grid-template-columns:1fr 1fr;gap:10px;}
    .wi{border-radius:12px;padding:14px;cursor:pointer;display:flex;flex-direction:column;gap:6px;position:relative;border:1.5px solid rgba(200,240,0,0.22);background:rgba(200,240,0,0.05);}
    .wi.off{border-color:rgba(255,255,255,0.07);background:rgba(255,255,255,0.02);}
    .wi-icon{width:28px;height:28px;background:rgba(200,240,0,0.12);border-radius:8px;display:flex;align-items:center;justify-content:center;font-size:14px;}
    .wi-name{font-size:13px;font-weight:700;color:#fff;}
    .wi-desc{font-size:11.5px;color:rgba(255,255,255,0.35);}
    .wi-eye{position:absolute;top:12px;right:12px;font-size:14px;color:rgba(200,240,0,0.7);}

    /* EMPTY STATE */
    .empty-box{background:#fff;border:1px solid #eae8e1;border-radius:14px;padding:70px 40px;text-align:center;}
    .ei{width:64px;height:64px;background:#f4f2eb;border-radius:50%;display:flex;align-items:center;justify-content:center;margin:0 auto 16px;font-size:28px;}
    .et{font-size:22px;font-weight:800;color:#0a0a0a;margin-bottom:8px;}
    .es{font-size:14px;color:#aaa;margin-bottom:22px;max-width:300px;margin-left:auto;margin-right:auto;}

    /* ANALYTICS */
    .met-strip{display:grid;grid-template-columns:repeat(4,1fr);gap:12px;margin-bottom:16px;}
    .met-box{background:#fff;border:1px solid #eae8e1;border-radius:12px;padding:18px 20px;border-left:3px solid #c8f000;}
    .mb-lbl{font-size:11.5px;color:#999;margin-bottom:6px;}
    .mb-val{font-size:24px;font-weight:800;color:#0a0a0a;}

    /* SETTINGS */
    .sg{display:grid;grid-template-columns:280px 1fr;gap:16px;align-items:start;}
    .sp{background:#fff;border:1px solid #eae8e1;border-radius:14px;overflow:hidden;}
    .sp-head{padding:16px 20px;border-bottom:1px solid #f0ede8;display:flex;align-items:center;justify-content:space-between;}
    .sp-t{font-size:14.5px;font-weight:800;color:#0a0a0a;}
    .sp-s{font-size:12px;color:#aaa;margin-top:1px;}
    .btn-sm{font-size:12px;font-weight:700;color:#555;background:#f4f2eb;border:1px solid #eae8e1;padding:5px 12px;border-radius:6px;cursor:pointer;font-family:'Barlow',sans-serif;}
    .btn-sm:hover{background:#0a0a0a;color:#fff;border-color:#0a0a0a;}
    .sp-body{padding:18px 20px;}
    .fr{display:grid;grid-template-columns:1fr 1fr;gap:14px;margin-bottom:16px;}
    .fl{font-size:11px;font-weight:700;color:#bbb;text-transform:uppercase;letter-spacing:0.06em;margin-bottom:5px;}
    .fv{font-size:14px;font-weight:600;color:#0a0a0a;}
    .fv.m{color:#ccc;font-weight:400;font-style:italic;}
    .fi{width:100%;padding:10px 14px;border:1.5px solid #e5e2db;border-radius:8px;font-size:14px;color:#0a0a0a;font-family:'Barlow',sans-serif;outline:none;}
    .fi:focus{border-color:#c8f000;}
    .tr{display:flex;align-items:center;justify-content:space-between;padding:13px 20px;border-top:1px solid #f4f2eb;cursor:pointer;}
    .tr:hover{background:#fafaf7;}
    .tr-t{font-size:13.5px;font-weight:700;color:#0a0a0a;}
    .tr-s{font-size:12px;color:#aaa;}
    .dz{padding:16px 20px;}
    .dz-t{font-size:13px;font-weight:800;color:#dc2626;margin-bottom:4px;}
    .dz-s{font-size:12px;color:#aaa;margin-bottom:12px;}
    .btn-danger{font-size:12px;font-weight:700;color:#dc2626;background:rgba(220,38,38,0.06);border:1px solid rgba(220,38,38,0.18);padding:7px 14px;border-radius:7px;cursor:pointer;font-family:'Barlow',sans-serif;}
    .btn-danger:hover{background:#dc2626;color:#fff;}

    /* SAFETY */
    .srow{display:flex;align-items:center;justify-content:space-between;padding:14px 0;border-bottom:1px solid #f4f2eb;}
    .srow:last-child{border-bottom:none;}
    .srow-l{display:flex;align-items:center;gap:10px;font-size:14px;color:#444;}
    .srow-r{font-size:14px;font-weight:700;color:#0a0a0a;}

    /* AUDIT */
    .astat{display:grid;grid-template-columns:repeat(3,1fr);gap:12px;margin-bottom:18px;}
    .astat-box{background:#fff;border:1px solid #eae8e1;border-radius:12px;padding:20px 22px;}
    .astat-l{font-size:11px;font-weight:800;color:#bbb;text-transform:uppercase;letter-spacing:0.08em;margin-bottom:6px;}
    .astat-v{font-size:32px;font-weight:800;color:#0a0a0a;}
    .abar{background:#fff;border:1px solid #eae8e1;border-radius:12px;padding:12px 16px;display:flex;gap:10px;align-items:center;margin-bottom:12px;}
    .asearch{flex:1;border:none;outline:none;font-size:13.5px;font-family:'Barlow',sans-serif;color:#0a0a0a;background:transparent;}
    .asel{appearance:none;border:1px solid #eae8e1;border-radius:7px;padding:7px 24px 7px 10px;font-size:13px;color:#444;font-family:'Barlow',sans-serif;outline:none;cursor:pointer;}
    .btn-exp{display:flex;align-items:center;gap:5px;padding:7px 14px;border:1px solid #eae8e1;border-radius:7px;font-size:13px;font-weight:700;background:#fff;color:#444;cursor:pointer;font-family:'Barlow',sans-serif;}
    .aempty{background:#fff;border:1px solid #eae8e1;border-radius:12px;padding:60px 40px;text-align:center;color:#aaa;font-size:14px;}

    /* PRICING */
    .pc-cards{display:grid;grid-template-columns:repeat(3,1fr);gap:16px;margin-bottom:28px;}
    .pc-card{background:#fff;border:1.5px solid #eae8e1;border-radius:14px;padding:24px;}
    .pc-card.pop{border-color:#c8f000;}
    .pc-tier{font-size:18px;font-weight:800;color:#0a0a0a;margin-bottom:8px;}
    .pc-desc{font-size:13px;color:#888;margin-bottom:14px;line-height:1.5;}
    .pc-price{font-size:36px;font-weight:800;color:#0a0a0a;line-height:1;margin-bottom:16px;}
    .pc-price span{font-size:14px;color:#aaa;font-weight:400;}
    .pc-feats{list-style:none;display:flex;flex-direction:column;gap:8px;margin-bottom:16px;}
    .pc-feats li{font-size:13px;color:#555;display:flex;align-items:flex-start;gap:8px;}
    .ck{color:#6a9500;flex-shrink:0;}
    .pc-cta{width:100%;padding:11px;border-radius:9px;font-size:14px;font-weight:800;font-family:'Barlow',sans-serif;cursor:pointer;border:none;margin-top:6px;}
    .pc-cta.lime{background:#c8f000;color:#0a0a0a;}
    .pc-cta.dark{background:#0a0a0a;color:#fff;}
    .pc-cta.ghost{background:#f4f2eb;color:#0a0a0a;}
    .addons{margin-top:14px;border-top:1px solid #f0ede8;padding-top:14px;}
    .addon-t{font-size:11px;font-weight:700;color:#aaa;text-transform:uppercase;letter-spacing:0.07em;margin-bottom:10px;}
    .addon-row{display:flex;align-items:flex-start;gap:8px;margin-bottom:8px;}
    .addon-cb{width:14px;height:14px;border:1.5px solid #ccc;border-radius:3px;flex-shrink:0;margin-top:2px;}
    .addon-nm{font-size:13px;font-weight:700;color:#0a0a0a;}
    .addon-pr{font-size:12px;color:#aaa;float:right;}
    .addon-ds{font-size:11.5px;color:#aaa;margin-top:2px;}

    @media(max-width:900px){.g2,.g2r,.g4{grid-template-columns:1fr;}.sg{grid-template-columns:1fr;}.met-strip{grid-template-columns:1fr 1fr;}.pc-cards{grid-template-columns:1fr;}}
    @media(max-width:700px){.sb{display:none;}.dc{padding:16px 16px 60px;}}
  `

  const CHART_DATES = ['Mar 30','Apr 1','Apr 3','Apr 5','Apr 7','Apr 9','Apr 11','Apr 13','Apr 15','Apr 17','Apr 19','Apr 21','Apr 23','Apr 25','Apr 27']
  const chartPts1 = CHART_DATES.map((_,i) => { const v=[0,0,3,2,3,0,1,3,2,3,0,1,3,2,3][i]*35; return `${i*(600/14)},${110-v}` }).join(' ')
  const chartPts2 = CHART_DATES.map((_,i) => { const v=[1,2,1,3,1,2,3,1,3,1,2,3,1,3,1][i]*22; return `${i*(600/14)},${110-v}` }).join(' ')

  return (
    <>
      <style>{CSS}</style>

      {/* WELCOME MODAL */}
      {showWelcome && (
        <div className="wm-overlay">
          <div className="wm">
            <div className="wm-left">
              <div className="wm-guide">
                <div className="wm-guide-icon">✦</div>
                <span className="wm-guide-lbl">PLATFORM GUIDE</span>
              </div>
              {WELCOME_STEPS.map((step,i) => (
                <div className="wm-step" key={step.title}>
                  <div className={`wm-sdot ${i===welcomeIdx?'on':''}`} />
                  <span className={`wm-slbl ${i===welcomeIdx?'on':''}`}>{step.title}</span>
                </div>
              ))}
            </div>
            <div className="wm-right">
              <div className="wm-tour-tag"><div style={{width:6,height:6,background:'#c8f000',borderRadius:'50%'}} /> DASHBOARD TOUR</div>
              <div className="wm-prog">{WELCOME_STEPS.map((_,i)=><div key={i} className={`wm-pd ${i<=welcomeIdx?'on':''}`} onClick={()=>setWelcomeIdx(i)} />)}</div>
              <div className="wm-cnt">{welcomeIdx + 1} / {WELCOME_STEPS.length}</div>
              <div className="wm-title">{WELCOME_STEPS[welcomeIdx].title}</div>
              <div className="wm-desc">{WELCOME_STEPS[welcomeIdx].desc}</div>
              <div className="wm-actions">
                <button className="wm-skip" onClick={()=>setShowWelcome(false)}>Skip tour</button>
                <button className="wm-continue" onClick={()=> welcomeIdx < WELCOME_STEPS.length - 1 ? setWelcomeIdx(welcomeIdx + 1) : setShowWelcome(false)}>{welcomeIdx < WELCOME_STEPS.length - 1 ? 'Continue →' : 'Finish tour →'}</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* WIDGET MODAL */}
      {showWidgetModal && (
        <div className="wdg-overlay" onClick={()=>setShowWidgetModal(false)}>
          <div className="wdg" onClick={e=>e.stopPropagation()}>
            <button className="wdg-close" onClick={()=>setShowWidgetModal(false)}>✕</button>
            <div className="wdg-title">Customize Your Dashboard</div>
            <div className="wdg-sub">Show or hide widgets to personalize your dashboard experience</div>
            <div className="wdg-grid">
              {[{k:'performance',icon:'📊',n:'LinkedIn Performance',d:'Track your LinkedIn metrics in real-time'},{k:'quota',icon:'⚡',n:'Daily Quota',d:'Monitor your daily action limits'},{k:'streak',icon:'🗓️',n:'Activity Streak',d:'Track your consistency'},{k:'topPerformers',icon:'🎯',n:'Top Performers',d:'Your most engaged prospects'}].map(w=>(
                <div key={w.k} className={`wi ${!widgets[w.k]?'off':''}`} onClick={()=>setWidgets(ww=>({...ww,[w.k]:!ww[w.k]}))}>
                  <span className="wi-eye">{widgets[w.k]?'👁':'—'}</span>
                  <div className="wi-icon">{w.icon}</div>
                  <div className="wi-name">{w.n}</div>
                  <div className="wi-desc">{w.d}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      <div className="dl">
        {/* SIDEBAR */}
      <aside className={`sb ${(!expanded && !hoveringSidebar) ? 'col' : ''}`}
        onMouseEnter={() => setHoveringSidebar(true)} 
        onMouseLeave={() => {
        setHoveringSidebar(false)
      }}
        > 
          <div className="sb-logo">
            <div className="sb-logo-mark">
              <Logo compact />
            </div>
            <div className="sb-logo-text">LINKZIY</div>
          </div>
          <nav className="sb-nav">
            <div className={`sb-item${view==='overview'?' on':''}`} data-tip="Dashboard" onClick={() => navGo('overview')}>
              <span className="sb-ic"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/></svg></span>
              <span className="sb-lbl">Dashboard</span>
            </div>

            <div className="sb-sec">Outreach</div>
            {NAV.outreach.map(n => (
              <div key={n.id} className={`sb-item${view===n.id?' on':''}`} data-tip={n.label} onClick={() => navGo(n.id)}>
                <span className="sb-ic"><Icon d={n.d}/></span>
                <span className="sb-lbl">{n.label}</span>
              </div>
            ))}

            <div className="sb-sec">Engagement</div>
            {NAV.engagement.map(n => (
              <div key={n.label} className="sb-item lk" data-tip={n.label}>
                <span className="sb-ic"><Icon d={n.d}/></span>
                <span className="sb-lbl">{n.label}</span>
                <span className="sb-soon">Soon</span>
              </div>
            ))}

            <div className="sb-sec">System</div>
            {NAV.system.map(n => (
              <div key={n.label} className={`sb-item${view===n.id?' on':''}`} data-tip={n.label} onClick={() => n.id && navGo(n.id)}>
                <span className="sb-ic"><Icon d={n.d}/></span>
                <span className="sb-lbl">{n.label}</span>
              </div>
            ))}
          </nav>

          <div className="sb-bottom">
            <div className="sb-user" onClick={() => navGo('settings')}>
              <div className="sb-av">{ui}</div>
              <div className="sb-uinfo">
                <div className="sb-uname">{user.name}</div>
                <div className="sb-urole">LinkedIn User</div>
              </div>
            </div>
            <div className="trial-blk">
              <div className="trial-inner">
                <div className="trial-top">
                  <span className="trial-lbl">Free Trial</span>
                  <span className="trial-badge">14 days left</span>
                </div>
                <div className="trial-bar"><div className="trial-fill"/></div>
                <button className="btn-up" onClick={() => navGo('pricing')}>Upgrade Plan →</button>
              </div>
            </div>
          </div>
        </aside>

        {/* MAIN */}
        <div className="dm">
          {/* TOPBAR */}
          <div className="tb">
            <div>
              <div className="tb-ws" onClick={()=>navGo('overview')}>
                <div className="tb-ws-ava">{ui}</div>
                {uf}'s Workspace <span style={{fontSize:10}}>▾</span>
              </div>
            </div>
            <div className="tb-right">
              <div>
                <div className="tb-name">{user.name}</div>
                <div className="tb-role">USER</div>
              </div>
              <div className="tb-ava" onClick={()=>navGo('settings')}>{ui}</div>
              <div className="tb-bell">
                🔔<span className="bell-dot"/>
              </div>
            </div>
          </div>

          {/* ── OVERVIEW ── */}
          {view==='overview' && (
            <div className="dc">
              <div className="ph">
                <div>
                  <div className="ph-title">Hello {uf},</div>
                  <div className="ph-sub">Welcome to dashboard</div>
                </div>
                <div className="ph-right">
                  <div style={{position:'relative'}}>
                    <div className="range-btn" onClick={()=>setShowRangeMenu(!showRangeMenu)}>
                      {timeRange} <span style={{fontSize:10}}>▾</span>
                    </div>
                    {showRangeMenu && (
                      <div className="range-menu">
                        {['Last 7 days','Last 30 days','Last 90 days','Custom range'].map(r=>(
                          <div key={r} className={`range-opt ${r===timeRange?'sel':''}`} onClick={()=>{setTimeRange(r);setShowRangeMenu(false);}}>
                            {r} {r===timeRange && <span style={{color:'#c8f000'}}>✓</span>}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                  <button className="btn-cw" onClick={()=>setShowWidgetModal(true)}>＋ Customize Widgets</button>
                </div>
              </div>

              {/* OUTREACH BANNER */}
              <div className="ob">
                <div>
                  <div className="ob-h3">
                    <span style={{background:'#0077b5',color:'#fff',fontSize:10,padding:'2px 6px',borderRadius:4,fontWeight:800}}>in</span>
                    LinkedIn Outreach <span className="ob-live">Live</span>
                  </div>
                  <div className="ob-row"><div className="ob-icon">↗</div><div><div className="ob-lbl">Messages sent</div><div className="ob-val">0</div></div></div>
                  <div className="ob-row"><div className="ob-icon">💬</div><div><div className="ob-lbl">Replies received</div><div className="ob-val">0</div></div></div>
                  <div className="ob-row"><div className="ob-icon">📊</div><div><div className="ob-lbl">Response rate</div><div className="ob-val">0%</div></div></div>
                </div>
                <div className="ob-circle">0%</div>
              </div>

              {/* PROFILE + PERFORMANCE */}
              <div className="g2">
                <div className="card-d" style={{padding:0,overflow:'hidden'}}>
                  <div className="pc-banner"/>
                  <div className="pc-body">
                    <div className="pc-ava-wrap">
                      <div className="pc-ava">{ui}<span className="pc-li">in</span></div>
                    </div>
                    <div className="pc-name">{user.name}</div>
                    <div className="pc-sub">LinkedIn User</div>
                    <div className="pc-stats">
                      <div className="pc-stat"><div className="pc-sv">0</div><div className="pc-sl">Connections</div></div>
                      <div className="pc-stat"><div className="pc-sv">0</div><div className="pc-sl">Pending</div></div>
                    </div>
                  </div>
                </div>

                {widgets.performance && (
                  <div className="card-d">
                    <div className="perf-head">
                      <div className="perf-title"><span style={{background:'#0077b5',color:'#fff',fontSize:10,padding:'2px 5px',borderRadius:3,fontWeight:800}}>in</span> LinkedIn Performance</div>
                      <span className="tag-sm">Last 30 days</span>
                    </div>
                    <div className="perf-grid">
                      <div className="pm">
                        <div className="pm-icon"><span style={{fontSize:14}}>↗</span></div>
                        <div className="pm-val">0</div>
                        <div className="pm-lbl">Today's Requests</div>
                      </div>
                      <div className="pm">
                        <div className="pm-icon"><span style={{fontSize:14}}>💬</span></div>
                        <div className="pm-val">0</div>
                        <div className="pm-lbl">Replies Received</div>
                        <div className="pm-sub">0% rate</div>
                      </div>
                      <div className="pm">
                        <div className="pm-icon"><span style={{fontSize:14}}>📊</span></div>
                        <div className="pm-val">0</div>
                        <div className="pm-lbl">Active Campaigns</div>
                      </div>
                    </div>
                    <div className="live-row">
                      <div className="live-txt"><div className="live-dot"/> Live tracking active</div>
                      <div className="live-actions">0 actions today</div>
                    </div>
                  </div>
                )}
              </div>

              {/* TREND + PROSPECT STATUS */}
              <div className="g2r">
                <div className="card-d">
                  <div className="perf-head">
                    <div className="perf-title">Connection Requests Trend</div>
                    <span className="tag-sm">Last 30 days</span>
                  </div>
                  <div className="chart-area">
                    <svg width="100%" height="110" viewBox="0 0 600 110" preserveAspectRatio="none">
                      <polyline fill="none" stroke="#c8f000" strokeWidth="2" points={chartPts1}/>
                      <polyline fill="none" stroke="rgba(255,255,255,0.25)" strokeWidth="1.5" points={chartPts2}/>
                    </svg>
                  </div>
                  <div className="chart-dates">
                    {CHART_DATES.map(d=><div key={d} className="chart-date">{d}</div>)}
                  </div>
                </div>

                <div className="card-d">
                  <div className="ps-head">
                    <div className="ps-title">Prospecting status</div>
                    <span className="badge-running">Running</span>
                  </div>
                  <div className="ps-item">
                    <div className="ps-icon"><span style={{fontSize:14}}>↗</span></div>
                    <span className="ps-val">0</span>
                    <span className="ps-lbl">Active campaigns</span>
                  </div>
                  <div className="ps-item">
                    <div className="ps-icon"><span style={{fontSize:14}}>👥</span></div>
                    <span className="ps-val">0</span>
                    <span className="ps-lbl">Queued actions</span>
                  </div>
                </div>
              </div>

              {/* QUOTA + STREAK + TOUR + TOP PERFORMERS */}
              <div className="g4">
                {widgets.quota && (
                  <div className="card-d">
                    <div className="qc-icon"><span style={{fontSize:20}}>⚡</span></div>
                    <div className="qc-title">Daily Quota Usage</div>
                    <div className="qc-row">
                      <div className="qc-rh"><span>Connections</span><span className="qc-rv">0 / 20</span></div>
                      <div className="qc-bar"/>
                    </div>
                    <div className="qc-row">
                      <div className="qc-rh"><span>Messages</span><span className="qc-rv">0 / 50</span></div>
                      <div className="qc-bar"/>
                    </div>
                  </div>
                )}

                {widgets.streak && (
                  <div className="card-d">
                    <span className="streak-badge">Keep it up!</span>
                    <div className="streak-icon">🗓️</div>
                    <div className="streak-lbl">Activity Streak</div>
                    <div className="streak-val">0<span className="streak-unit">days</span></div>
                    <div className="streak-sub">Longest: 0 days</div>
                  </div>
                )}

                <div className="card-d">
                  <div className="tour-head">
                    <div className="tour-title-left">
                      <div className="tour-star">✦</div>
                      <div>
                        <div className="tour-lbl">Product Tour</div>
                        <div className="tour-count">{tourIdx+1} of {TOUR_SLIDES.length}</div>
                      </div>
                    </div>
                    <div className="tour-nav">
                      <button className="tour-nb" onClick={()=>setTourIdx((tourIdx-1+TOUR_SLIDES.length)%TOUR_SLIDES.length)}>‹</button>
                      <button className="tour-nb" onClick={()=>setTourIdx((tourIdx+1)%TOUR_SLIDES.length)}>›</button>
                    </div>
                  </div>
                  <div className="tour-tag">{slide.tag}</div>
                  <div className="tour-ft">{slide.title}</div>
                  <div className="tour-desc">{slide.desc}</div>
                  <ul className="tour-bullets">{slide.bullets.map(b=><li key={b}><div className="tbdot"/>{b}</li>)}</ul>
                  <button className="btn-tour" onClick={()=>slide.ctaView&&navGo(slide.ctaView)}>{slide.cta}</button>
                  <div className="tour-dots">{TOUR_SLIDES.map((_,i)=><div key={i} className={`tdot ${i===tourIdx?'on':''}`} onClick={()=>setTourIdx(i)}/>)}</div>
                </div>

                {widgets.topPerformers && (
                  <div className="card-d">
                    <div className="tp-head">
                      <div className="tp-title"><div className="tp-icon">🎯</div>Top Performers</div>
                    </div>
                    <div className="tp-empty">
                      <div className="tp-ei">👤</div>
                      <div className="tp-et">No prospects yet</div>
                      <div className="tp-es">Add prospects to see top performers</div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* PROSPECTS */}
          {view==='prospects' && (
            <div className="dc">
              <div className="ph">
                <div><div className="ph-title">Prospects</div><div className="ph-sub">Manage your outreach lists and target campaigns</div></div>
                <button className="btn-primary">＋ Create New List</button>
              </div>
              <div className="empty-box"><div className="ei">👥</div><div className="et">No Lists Yet</div><div className="es">Create your first prospect list to start managing and targeting your campaigns</div><button className="btn-primary">＋ Create My First List</button></div>
            </div>
          )}

          {/* CAMPAIGNS */}
          {view==='campaigns' && (
            <div className="dc">
              <div className="ph">
                <div><div className="ph-title">Sequences</div><div className="ph-sub">Manage your automated LinkedIn outreach sequences</div></div>
                <button className="btn-primary">＋ New Campaign</button>
              </div>
              <div className="empty-box"><div className="ei">↗</div><div className="et">No Campaigns Yet</div><div className="es">Create your first campaign to start automating outreach at scale</div><button className="btn-primary">＋ New Campaign</button></div>
            </div>
          )}

          {/* CAMPAIGN ANALYTICS */}
          {view==='analytics' && (
            <div className="dc">
              <div className="ph">
                <div><div className="ph-title">Campaign Analytics</div><div className="ph-sub">Track performance across all your campaigns</div></div>
              </div>
              <div style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:12,marginBottom:16}}>
                {[['Connections Sent','0'],['Accept Rate','0%'],['Reply Rate','0%']].map(([l,v])=>(
                  <div className="met-box" key={l}><div className="mb-lbl">{l}</div><div className="mb-val">{v}</div></div>
                ))}
              </div>
              <div className="empty-box"><div className="ei">📊</div><div className="et">No Campaign Data Yet</div><div className="es">Start a campaign to see analytics here</div></div>
            </div>
          )}

          {/* WORKSPACE ANALYTICS */}
          {view==='workspace_analytics' && (
            <div className="dc">
              <div className="ph">
                <div><div className="ph-title" style={{textTransform:'uppercase',letterSpacing:1}}>Workspace Performance</div><div className="ph-sub">Real-time overview of the entire team's efforts</div></div>
                <div style={{display:'flex',gap:8,alignItems:'center'}}>
                  <div style={{padding:'6px 12px',border:'1px solid #eae8e1',borderRadius:8,fontSize:13,fontWeight:700,color:'#0a0a0a',background:'#fff',display:'flex',alignItems:'center',gap:6}}>👤 {user.name} ▾</div>
                  <div style={{padding:'6px 12px',border:'1px solid #eae8e1',borderRadius:8,fontSize:13,fontWeight:600,color:'#0a0a0a',background:'#fff'}}>Last 30 days ▾</div>
                  <button className="btn-outline" style={{fontSize:12}}>↓ Export Report <span style={{background:'#c8f000',color:'#0a0a0a',fontSize:9,padding:'2px 6px',borderRadius:4,fontWeight:800,marginLeft:4}}>Add-on</span></button>
                </div>
              </div>
              <div className="met-strip">
                {[['Invitations Sent','0'],['Total Accepted','0'],['1st Message Sent','0'],['Total Replies','0'],['Positive Leads','0'],['Prospects Engaged','0'],['Pending Actions','0'],['Acceptance Rate','0%'],['Reply Rate','0%']].map(([l,v])=>(
                  <div className="met-box" key={l}><div className="mb-lbl">{l}</div><div className="mb-val">{v}</div></div>
                ))}
              </div>
              <div style={{display:'flex',gap:4,marginBottom:16}}>
                {['Overview','Content Performance','Outreach Performance'].map((t,i)=>(
                  <div key={t} style={{padding:'9px 18px',borderRadius:9,fontSize:13.5,fontWeight:600,cursor:'pointer',background:i===0?'#fff':'transparent',border:i===0?'1.5px solid #eae8e1':'none',color:i===0?'#0a0a0a':'#888'}}>{t}</div>
                ))}
              </div>
              <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:14,marginBottom:14}}>
                <div className="card-l"><div style={{fontWeight:800,marginBottom:12}}>Linkziy Funnel</div><div style={{fontSize:13,color:'#aaa',textAlign:'center',padding:'40px 20px'}}>No funnel data yet — start a campaign</div></div>
                <div className="card-l"><div style={{fontWeight:800,marginBottom:12}}>Status Breakdown</div><div style={{display:'flex',gap:12,flexWrap:'wrap',marginBottom:8}}>{[['#0a0a0a','Connected'],['#c8f000','1st Message Sent'],['#22c55e','Follow-up'],['#888','Replied'],['#3b82f6','Positive'],['#ccc','Not Interested']].map(([c,l])=><div key={l} style={{display:'flex',alignItems:'center',gap:5,fontSize:11.5,color:'#666'}}><div style={{width:8,height:8,borderRadius:'50%',background:c}}/>{l}</div>)}</div><div style={{fontSize:13,color:'#aaa',textAlign:'center',padding:'30px 20px'}}>No data yet</div></div>
              </div>
              <div className="card-l" style={{marginBottom:14}}><div style={{fontWeight:800,marginBottom:10}}>Recent Activity</div><div style={{fontSize:13.5,color:'#aaa',fontStyle:'italic',textAlign:'center',padding:'24px 0'}}>No recent activity found.</div></div>
              <div className="card-l"><div style={{fontWeight:800,marginBottom:14}}>Active Sequence Performance</div>
                <div style={{display:'grid',gridTemplateColumns:'2fr 1fr 1fr',borderTop:'1px solid #f0ede8'}}>{['SEQUENCE NAME','ACTIVE PROSPECTS','ENGAGEMENT'].map(h=><div key={h} style={{fontSize:11,fontWeight:800,letterSpacing:'0.08em',color:'#bbb',padding:'10px 0',borderBottom:'1px solid #f0ede8'}}>{h}</div>)}</div>
                <div style={{fontSize:13.5,color:'#aaa',textAlign:'center',padding:'28px 0'}}>No active sequences found.</div>
              </div>
            </div>
          )}

          {/* ACCOUNT SAFETY */}
          {view==='safety' && (
            <div className="dc">
              <div className="ph"><div><div className="ph-title">Account Safety</div><div className="ph-sub">Monitor and control your LinkedIn activity limits</div></div></div>
              <div className="card-l" style={{marginBottom:16}}>
                <div style={{display:'flex',alignItems:'center',gap:10,marginBottom:20}}>
                  <div style={{width:40,height:40,background:'#f4f2eb',borderRadius:10,display:'flex',alignItems:'center',justifyContent:'center',fontSize:18}}>⚡</div>
                  <div><div style={{fontSize:15,fontWeight:800}}>Today's Activity Quota</div><div style={{fontSize:12.5,color:'#aaa'}}>Real-time usage against your daily limits</div></div>
                </div>
                {[['💬 Messages Sent','0 / 50'],['👥 Connection Requests','0 / 20'],['👁 Profile Visits','0 / 50'],['👍 Engagement (Likes / Comments)','0 / 30']].map(([l,v])=>(
                  <div className="srow" key={l}>
                    <div className="srow-l">{l}</div>
                    <div className="srow-r">{v}</div>
                  </div>
                ))}
                <div style={{height:3,background:'#eae8e1',borderRadius:2,marginTop:10}}/>
                <div style={{display:'flex',gap:14,marginTop:12}}>
                  {[['#22c55e','Safe (<60%)'],['#f59e0b','Caution (60–90%)'],['#ef4444','High (≥90%)']].map(([c,l])=>(
                    <div key={l} style={{display:'flex',alignItems:'center',gap:5,fontSize:12,color:'#888'}}><div style={{width:7,height:7,borderRadius:'50%',background:c}}/>{l}</div>
                  ))}
                </div>
              </div>
              <div className="card-l">
                <div style={{fontSize:15,fontWeight:800,marginBottom:4}}>Customize Daily Limits</div>
                <div style={{fontSize:12.5,color:'#aaa',marginBottom:18}}>Your limits will be capped at your plan maximum and warm-up cap when applicable.</div>
                <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:16}}>
                  {[['Daily Messages','50'],['Daily Connection Requests','20']].map(([l,v])=>(
                    <div key={l}><div className="fl">{l}</div><div style={{display:'flex',alignItems:'center',gap:10}}><input className="fi" defaultValue={v} style={{width:80}}/><span style={{fontSize:13,color:'#666'}}>Effective: <strong>{v}</strong></span></div></div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* AUDIT LOGS */}
          {view==='audit' && (
            <div className="dc">
              <div className="ph">
                <div style={{display:'flex',alignItems:'center',gap:12}}>
                  <div style={{width:44,height:44,background:'#f4f2eb',border:'1px solid #eae8e1',borderRadius:10,display:'flex',alignItems:'center',justifyContent:'center',fontSize:20}}>📋</div>
                  <div><div className="ph-title" style={{textTransform:'uppercase',letterSpacing:1}}>Audit Logs</div><div className="ph-sub">Review team activity history and security events.</div></div>
                </div>
              </div>
              <div className="astat">
                {[['TOTAL EVENTS','0'],['FILTERED RESULTS','0'],['LATEST EVENT','—']].map(([l,v])=><div className="astat-box" key={l}><div className="astat-l">{l}</div><div className="astat-v">{v}</div></div>)}
              </div>
              <div className="abar">
                <span style={{fontSize:14,color:'#aaa'}}>🔍</span>
                <input className="asearch" placeholder="Search by user, action, or details..."/>
                <select className="asel"><option>All Events</option></select>
                <span style={{fontSize:14,color:'#aaa'}}>⚙️</span>
                <button className="btn-exp">↓ Export CSV</button>
              </div>
              <div style={{fontSize:12,color:'#bbb',marginBottom:10,display:'flex',alignItems:'center',gap:5}}>↗ Sorted by newest first</div>
              <div className="aempty">No audit logs found matching your filters.</div>
            </div>
          )}

          {/* SETTINGS */}
          {view==='settings' && (
            <div className="dc">
              <div className="ph">
                <div><div className="ph-title">Settings</div><div className="ph-sub">Manage your account, preferences, and notifications</div></div>
                <button className="btn-primary" onClick={()=>setEditProfile(!editProfile)}>{editProfile?'✓ Save Changes':'✎ Edit Profile'}</button>
              </div>
              <div className="sg">
                <div style={{display:'flex',flexDirection:'column',gap:14}}>
                  <div className="sp">
                    <div style={{height:60,background:'linear-gradient(135deg,#c8f000,#8ab000)'}}/>
                    <div style={{padding:'0 20px 20px'}}>
                      <div style={{marginTop:-22,marginBottom:12}}>
                        <div style={{width:52,height:52,background:'linear-gradient(135deg,#c8f000,#8ab000)',borderRadius:'50%',display:'flex',alignItems:'center',justifyContent:'center',fontFamily:"'Bebas Neue',sans-serif",fontSize:20,color:'#0a0a0a',border:'3px solid #fff'}}>{ui}</div>
                      </div>
                      <div style={{fontSize:16,fontWeight:800,color:'#0a0a0a',marginBottom:2}}>{user.name}</div>
                      <div style={{fontSize:12,color:'#aaa',marginBottom:14}}>@{user.email?.split('@')[0]} · Free Plan</div>
                      <div style={{display:'flex',borderTop:'1px solid #f0ede8',paddingTop:14}}>
                        {[['0','Prospects'],['0','Campaigns'],['8','Days Left']].map(([v,l])=>(
                          <div key={l} style={{flex:1,textAlign:'center',borderRight:'1px solid #f0ede8'}}>
                            <div style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:20}}>{v}</div>
                            <div style={{fontSize:10.5,color:'#aaa'}}>{l}</div>
                          </div>
                        ))}
                      </div>
                      <div style={{marginTop:14,background:'#f8f7f2',border:'1px solid #eae8e1',borderRadius:10,padding:14}}>
                        <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',marginBottom:4}}>
                          <span style={{fontSize:13,fontWeight:800}}>Starter Plan</span>
                          <span style={{fontSize:9,fontWeight:800,background:'#eae8e1',color:'#888',padding:'2px 8px',borderRadius:100}}>Free</span>
                        </div>
                        <div style={{fontSize:11.5,color:'#aaa',marginBottom:8}}>8 of 14 trial days remaining</div>
                        <div style={{height:3,background:'#e8e5de',borderRadius:2,marginBottom:12}}><div style={{height:'100%',width:'57%',background:'#c8f000',borderRadius:2}}/></div>
                        <button className="btn-upgrade" onClick={()=>navGo('pricing')}>Upgrade Plan →</button>
                      </div>
                    </div>
                  </div>
                </div>

                <div style={{display:'flex',flexDirection:'column',gap:14}}>
                  <div className="sp">
                    <div className="sp-head">
                      <div><div className="sp-t">Personal Information</div><div className="sp-s">Your name, email, and contact details</div></div>
                      <button className="btn-sm" onClick={()=>setEditProfile(!editProfile)}>{editProfile?'Cancel':'Edit'}</button>
                    </div>
                    <div className="sp-body">
                      <div className="fr">
                        <div><div className="fl">Full Name</div>{editProfile?<input className="fi" defaultValue={user.name}/>:<div className="fv">{user.name}</div>}</div>
                        <div><div className="fl">Username</div>{editProfile?<input className="fi" defaultValue={user.email?.split('@')[0]}/>:<div className="fv">{user.email?.split('@')[0]}</div>}</div>
                      </div>
                      <div className="fr">
                        <div><div className="fl">Email Address</div>{editProfile?<input className="fi" type="email" defaultValue={user.email}/>:<div className="fv">{user.email}</div>}</div>
                        <div><div className="fl">Company</div>{editProfile?<input className="fi" defaultValue={user.company||''} placeholder="Your company"/>:<div className={`fv ${user.company?'':'m'}`}>{user.company||'Not set'}</div>}</div>
                      </div>
                      <div><div className="fl">LinkedIn Profile URL</div>{editProfile?<input className="fi" placeholder="https://linkedin.com/in/yourprofile"/>:<div className="fv m">Not connected</div>}</div>
                    </div>
                  </div>

                  <div className="sp">
                    <div className="sp-head"><div><div className="sp-t">Notifications</div><div className="sp-s">Choose what you want to be notified about</div></div></div>
                    {[{k:'email',t:'Email Notifications',s:'Receive updates and alerts via email'},{k:'campaigns',t:'Campaign Activity',s:'Get notified when campaigns complete or need attention'},{k:'weekly',t:'Weekly Digest',s:'A performance summary delivered every Monday'}].map(item=>(
                      <div className="tr" key={item.k} onClick={()=>setNotifs(n=>({...n,[item.k]:!n[item.k]}))}>
                        <div><div className="tr-t">{item.t}</div><div className="tr-s">{item.s}</div></div>
                        <Toggle on={notifs[item.k]}/>
                      </div>
                    ))}
                  </div>

                  <div className="sp">
                    <div className="sp-head"><div><div className="sp-t">Security</div><div className="sp-s">Password and authentication settings</div></div><button className="btn-sm">Change Password</button></div>
                    <div className="sp-body">
                      <div className="fr">
                        <div><div className="fl">Password</div><div className="fv">••••••••••</div></div>
                        <div><div className="fl">Last Changed</div><div className="fv m">Never</div></div>
                      </div>
                    </div>
                    <div className="tr"><div><div className="tr-t">Two-Factor Authentication</div><div className="tr-s">Add an extra layer of security</div></div><Toggle on={false}/></div>
                  </div>

                  <div className="sp">
                    <div className="sp-head"><div><div className="sp-t" style={{color:'#dc2626'}}>Danger Zone</div><div className="sp-s">Irreversible actions — proceed with caution</div></div></div>
                    <div className="dz">
                      <div className="dz-t">Delete Account</div>
                      <div className="dz-s">Permanently delete your account and all associated data. This cannot be undone.</div>
                      <button className="btn-danger">Delete My Account</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* PRICING */}
          {view==='pricing' && (
            <div className="dc">
              <div className="ph">
                <div><div className="ph-title">Pricing</div><div className="ph-sub">Choose the plan that fits your workflow</div></div>
                <Link to="/pricing" style={{fontSize:13,color:'#6a9500',fontWeight:700}}>View full pricing →</Link>
              </div>
              <div style={{fontSize:20,fontWeight:800,marginBottom:4}}>Outreach</div>
              <div style={{fontSize:13,color:'#aaa',marginBottom:16}}>Outreach automation with safe daily actions.</div>
              <div className="pc-cards">
                {[{tier:'Outreach Starter',desc:'Ideal for solo founders starting LinkedIn outreach.',price:'$19',feats:['1 Sender account','50 Daily actions','Unlimited sequences','1 seat'],cta:'Upgrade',cls:'ghost'},{tier:'Outreach Growth',desc:'For growing teams needing higher automation capacity.',price:'$49',feats:['3 Sender accounts','150 Daily actions','Unlimited sequences','3 seats'],cta:'Upgrade',cls:'lime',pop:true},{tier:'Outreach Agency',desc:'For agencies managing multi-client outreach at scale.',price:'$149',feats:['10 Sender accounts','500 Daily actions','Unlimited sequences','10 seats'],cta:'Upgrade',cls:'ghost'}].map(p=>(
                  <div key={p.tier} className={`pc-card ${p.pop?'pop':''}`}>
                    <div className="pc-tier">{p.tier}</div>
                    <div className="pc-desc">{p.desc}</div>
                    <div className="pc-price">{p.price}<span>/month</span></div>
                    <ul className="pc-feats">{p.feats.map(f=><li key={f}><span className="ck">✓</span>{f}</li>)}</ul>
                    <div className="addons"><div className="addon-t">+ Optional Add-ons</div>
                      <div className="addon-row"><div className="addon-cb"/><div><div className="addon-nm">White Label Reports <span className="addon-pr">$29/mo</span></div><div className="addon-ds">Agency-focused branded client reporting.</div></div></div>
                    </div>
                    <button className={`pc-cta ${p.cls}`}>{p.cta}</button>
                  </div>
                ))}
              </div>
              <div style={{fontSize:20,fontWeight:800,marginBottom:4,marginTop:8}}>Scheduling</div>
              <div style={{fontSize:13,color:'#aaa',marginBottom:16}}>Schedule and publish from your LinkedIn accounts.</div>
              <div className="pc-cards">
                {[{tier:'Scheduling Creator',price:'$9',feats:['1 LinkedIn account','1 seat'],cta:'Upgrade',cls:'ghost'},{tier:'Scheduling Growth',price:'$15',feats:['3 LinkedIn accounts','3 seats'],cta:'Upgrade',cls:'lime',pop:true},{tier:'Scheduling Agency',price:'$35',feats:['10 LinkedIn accounts','10 seats'],cta:'Upgrade',cls:'ghost'}].map(p=>(
                  <div key={p.tier} className={`pc-card ${p.pop?'pop':''}`}>
                    <div className="pc-tier">{p.tier}</div>
                    <div className="pc-price">{p.price}<span>/month</span></div>
                    <ul className="pc-feats">{p.feats.map(f=><li key={f}><span className="ck">✓</span>{f}</li>)}</ul>
                    <button className={`pc-cta ${p.cls}`}>{p.cta}</button>
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
