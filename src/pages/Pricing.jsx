import { useEffect, useMemo, useRef, useState } from "react";
import Cursor from "../components/Cursor";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

/* ─── SHARED DATA ───────────────────────────────────────── */
const TRUST_BADGES = [
  { icon: "✦", label: "14-day free trial" },
  { icon: "⚡", label: "Instant account access" },
  { icon: "🔒", label: "Safe & secure checkout" },
];

const REVIEWS = [
  {
    initials: "A",
    color: "#7c6fcd",
    name: "Arpit T.",
    date: "Dec 19, 2025",
    text: "Linkziy completely transformed how I show up on LinkedIn. My post engagement tripled in the first month — the AI really does nail my voice.",
  },
  {
    initials: "D",
    color: "#4a90d9",
    name: "Don E.",
    date: "Dec 10, 2025",
    text: "The competitor tracking alone is worth the price. I can see exactly what's working in my niche and reverse-engineer winning content.",
  },
  {
    initials: "J",
    color: "#c0392b",
    name: "Jelle H.",
    date: "Dec 8, 2025",
    text: "Setup took under 10 minutes and I had my first week of posts scheduled before lunch. Incredibly smooth onboarding experience.",
  },
  {
    initials: "A",
    color: "#888",
    name: "Alastair M.",
    date: "Dec 4, 2025",
    text: "The annual plan made it an easy decision. Priced fairly for what you get, and the analytics dashboard gives me data I actually use every week.",
  },
  {
    initials: "M",
    color: "#27ae60",
    name: "Michael S.",
    date: "Dec 1, 2025",
    text: "Switched from a competitor and haven't looked back. The AI reply assistant saves me at least 2 hours a week on comment engagement alone.",
  },
];

const PROMISES = [
  {
    title: "14-day free trial",
    body: "Try every feature of Linkziy completely free for 14 days. No credit card required. If you don't love it, you simply walk away — no charges, no questions.",
  },
  {
    title: "Cancel anytime",
    body: "There are no long-term contracts or lock-ins. Cancel your subscription at any time directly from your dashboard and you'll never be charged again.",
  },
  {
    title: "Safe & secure payments",
    body: "All transactions are protected by SSL encryption. We accept all major credit cards and never store your payment details on our servers.",
  },
];

const FAQS = [
  {
    q: "Can I switch plans anytime?",
    a: "Yes — upgrade or downgrade at any time. Changes take effect at your next billing cycle with automatic proration.",
  },
  {
    q: 'What counts as a "LinkedIn profile"?',
    a: "Each connected LinkedIn account is one profile. You connect via OAuth — Linkziy never stores your credentials.",
  },
  {
    q: "Is the AI content detectable?",
    a: "Our AI is trained on your personal tone samples. The output is highly natural and passes major AI-detection tools.",
  },
  {
    q: "Do you offer refunds?",
    a: "Full refund within 7 days of your first paid charge if you're not satisfied — no questions asked.",
  },
  {
    q: "What payment methods are accepted?",
    a: "All major credit cards (Visa, Mastercard, Amex). Annual Agency plans also support invoice-based payment.",
  },
  {
    q: "Discounts for students or non-profits?",
    a: "Yes — 50% off for verified students and registered non-profits. Contact our support team to apply.",
  },
];

/* ─── PLAN DATA ─────────────────────────────────────────── */
const TABS = [
  { id: "outreach", label: "Outreach Automation" },
  { id: "scheduling", label: "LinkedIn Scheduling" },
  { id: "bundle", label: "All-in-One Bundle" },
  { id: "addons", label: "Add-Ons" },
];

const PLANS_BY_TAB = {
  outreach: [
    {
      id: "outreach-starter",
      name: "Outreach Starter",
      tier: "Starter",
      badge: null,
      badgeStyle: "starter",
      desc: "Ideal for solo founders starting LinkedIn outreach with safe daily automation, unlimited sequences, and one sender account.",
      monthly: 19,
      annual: 13,
      btnLabel: "Get Started",
      category: "OUTREACH AUTOMATION",
      subtitle: "Core platform pricing based on sender accounts.",
      features: [
        "outreach_automation",
        "1 Sender account",
        "0 LinkedIn accounts",
        "Unlimited campaigns",
        "Custom outreach flow builder",
        "Automated follow-ups",
        "Campaign analytics",
        "Safe automation controls",
      ],
    },
    {
      id: "outreach-growth",
      name: "Outreach Growth",
      tier: "Pro",
      badge: "POPULAR",
      badgeStyle: "popular",
      desc: "Built for growing teams that need higher daily automation capacity, multiple sender accounts, and scalable campaign execution.",
      monthly: 49,
      annual: 34,
      btnLabel: "Start Free Trial",
      category: "OUTREACH AUTOMATION",
      subtitle: "Core platform pricing based on sender accounts.",
      features: [
        "outreach_automation",
        "3 Sender accounts",
        "0 LinkedIn accounts",
        "Unlimited campaigns",
        "Custom outreach flow builder",
        "Automated follow-ups",
        "Campaign analytics",
        "Safe automation controls",
      ],
    },
    {
      id: "outreach-agency",
      name: "Outreach Agency",
      tier: "Agency",
      badge: "AGENCY",
      badgeStyle: "agency",
      desc: "Designed for agencies and high-volume teams managing multi-client outreach with maximum sender capacity and advanced scale limits.",
      monthly: 149,
      annual: 104,
      btnLabel: "Contact Sales",
      category: "OUTREACH AUTOMATION",
      subtitle: "Core platform pricing based on sender accounts.",
      features: [
        "outreach_automation",
        "Unlimited sender accounts",
        "0 LinkedIn accounts",
        "Unlimited campaigns",
        "Custom outreach flow builder",
        "Automated follow-ups",
        "Campaign analytics",
        "Safe automation controls",
        "White-label reports",
        "Priority support & onboarding",
      ],
    },
  ],
  scheduling: [
    {
      id: "sched-creator",
      name: "Scheduling Creator",
      tier: "Starter",
      badge: null,
      badgeStyle: "starter",
      desc: "Perfect for individual creators to plan, schedule, and publish LinkedIn content consistently from one account.",
      monthly: 9,
      annual: 6,
      btnLabel: "Get Started",
      category: "LINKEDIN SCHEDULING",
      subtitle: "Pricing based on LinkedIn accounts connected.",
      features: [
        "linkedin_scheduling",
        "0 Sender accounts",
        "1 LinkedIn account",
        "Unlimited post scheduling",
        "Content calendar",
        "Post analytics",
        "Multi-account publishing",
      ],
    },
    {
      id: "sched-growth",
      name: "Scheduling Growth",
      tier: "Pro",
      badge: "POPULAR",
      badgeStyle: "popular",
      desc: "Best for small teams managing content across multiple LinkedIn accounts with centralized planning and publishing.",
      monthly: 15,
      annual: 10,
      btnLabel: "Start Free Trial",
      category: "LINKEDIN SCHEDULING",
      subtitle: "Pricing based on LinkedIn accounts connected.",
      features: [
        "linkedin_scheduling",
        "0 Sender accounts",
        "3 LinkedIn accounts",
        "Unlimited post scheduling",
        "Content calendar",
        "Post analytics",
        "Multi-account publishing",
        "Team collaboration",
      ],
    },
    {
      id: "sched-agency",
      name: "Scheduling Agency",
      tier: "Agency",
      badge: "AGENCY",
      badgeStyle: "agency",
      desc: "Built for agencies handling content operations across many LinkedIn accounts with streamlined scheduling workflows.",
      monthly: 35,
      annual: 24,
      btnLabel: "Contact Sales",
      category: "LINKEDIN SCHEDULING",
      subtitle: "Pricing based on LinkedIn accounts connected.",
      features: [
        "linkedin_scheduling",
        "0 Sender accounts",
        "Unlimited LinkedIn accounts",
        "Unlimited post scheduling",
        "Content calendar",
        "Post analytics",
        "Multi-account publishing",
        "White-label reports",
      ],
    },
  ],
  bundle: [
    {
      id: "bundle-pro",
      name: "Linkziy Pro Suite",
      tier: "Pro",
      badge: "PRO",
      badgeStyle: "pro",
      desc: "All-in-one bundle combining outreach automation, scheduling, leads, and AI assistance for complete LinkedIn growth operations.",
      monthly: 59,
      annual: 41,
      btnLabel: "Start Free Trial",
      category: "ALL-IN-ONE BUNDLE",
      subtitle: "Everything in one plan for the complete Linkziy stack.",
      features: [
        "ai_assistant",
        "outreach_automation",
        "linkedin_scheduling",
        "1 LinkedIn sender account",
        "Scheduling for 1 LinkedIn account",
        "600 lead credits per month",
        "300 AI credits",
        "Campaign analytics",
      ],
    },
  ],
  addons: [
    {
      id: "addon-wlr",
      name: "White Label Reports",
      tier: "Add-On",
      badge: "ADD-ON",
      badgeStyle: "addon",
      desc: "Agency-focused add-on enabling branded client reporting, and professional performance presentation.",
      monthly: 29,
      annual: 29,
      btnLabel: "Add to Plan",
      category: "ADD-ONS",
      subtitle: "Scale sender capacity and unlock agency-ready reporting.",
      features: [
        "Upgrade without switching plans",
        "Pay only for what you need",
        "Instant scalability for teams",
      ],
    },
    {
      id: "addon-leads1000",
      name: "Extra Leads 1000",
      tier: "Add-On",
      badge: "ADD-ON",
      badgeStyle: "addon",
      desc: "Top-up add-on for 1000 additional verified leads. Best value pack for high-volume prospecting.",
      monthly: 17,
      annual: 17,
      btnLabel: "Add to Plan",
      category: "ADD-ONS",
      subtitle: "Top up your lead credits instantly.",
      features: [
        "1000 verified lead credits",
        "Instant activation",
        "No plan change required",
        "Use across all campaigns",
      ],
    },
    {
      id: "addon-leads500",
      name: "Extra Leads 500",
      tier: "Add-On",
      badge: "ADD-ON",
      badgeStyle: "addon",
      desc: "Top-up add-on for 500 additional verified leads. One-time credit pack to scale campaigns instantly.",
      monthly: 11,
      annual: 11,
      btnLabel: "Add to Plan",
      category: "ADD-ONS",
      subtitle: "Top up your lead credits instantly.",
      features: [
        "500 verified lead credits",
        "Instant activation",
        "No plan change required",
        "Use across all campaigns",
      ],
    },
    {
      id: "addon-senders10",
      name: "Additional Senders +10",
      tier: "Add-On",
      badge: "ADD-ON",
      badgeStyle: "addon",
      desc: "Adds 10 extra LinkedIn sender accounts for agencies and high-volume outreach operations.",
      monthly: 135,
      annual: 135,
      btnLabel: "Add to Plan",
      category: "ADD-ONS",
      subtitle: "Expand your outreach sender capacity.",
      features: [
        "10 additional sender accounts",
        "Upgrade without switching plans",
        "Instant scalability for teams",
        "Full automation controls",
      ],
    },
    {
      id: "addon-senders5",
      name: "Additional Senders +5",
      tier: "Add-On",
      badge: "ADD-ON",
      badgeStyle: "addon",
      desc: "Adds 5 extra LinkedIn sender accounts for growing teams running multi-account outreach.",
      monthly: 75,
      annual: 75,
      btnLabel: "Add to Plan",
      category: "ADD-ONS",
      subtitle: "Expand your outreach sender capacity.",
      features: [
        "5 additional sender accounts",
        "Upgrade without switching plans",
        "Instant scalability for teams",
        "Full automation controls",
      ],
    },
    {
      id: "addon-sender1",
      name: "Additional Sender +1",
      tier: "Add-On",
      badge: "ADD-ON",
      badgeStyle: "addon",
      desc: "Adds 1 extra LinkedIn sender account to your workspace for expanded outreach capacity.",
      monthly: 17,
      annual: 17,
      btnLabel: "Add to Plan",
      category: "ADD-ONS",
      subtitle: "Expand your outreach sender capacity.",
      features: [
        "1 additional sender account",
        "Upgrade without switching plans",
        "Instant scalability for teams",
        "Full automation controls",
      ],
    },
  ],
};

/* ─── COMPARISON TABLE DATA ─────────────────────────────── */
const COMPARISON_BY_TAB = {
  outreach: {
    rows: [
      { label: "Monthly price", starter: "$19/mo", pro: "$49/mo", agency: "$149/mo" },
      { label: "Annual price", starter: "$13/mo", pro: "$34/mo", agency: "$104/mo" },
      { label: "Sender accounts", starter: "1", pro: "3", agency: "Unlimited" },
      { label: "LinkedIn accounts", starter: "0", pro: "0", agency: "0" },
      { label: "Campaigns", starter: "Unlimited", pro: "Unlimited", agency: "Unlimited" },
      { label: "Outreach automation", starter: true, pro: true, agency: true },
      { label: "Custom flow builder", starter: true, pro: true, agency: true },
      { label: "Automated follow-ups", starter: true, pro: true, agency: true },
      { label: "Campaign analytics", starter: true, pro: true, agency: true },
      { label: "Safe automation controls", starter: true, pro: true, agency: true },
      { label: "White-label reports", starter: false, pro: false, agency: true },
      { label: "Priority support & onboarding", starter: false, pro: false, agency: true },
    ],
    cols: ["Starter", "Pro", "Agency"],
  },
  scheduling: {
    rows: [
      { label: "Monthly price", starter: "$9/mo", pro: "$15/mo", agency: "$35/mo" },
      { label: "Annual price", starter: "$6/mo", pro: "$10/mo", agency: "$24/mo" },
      { label: "LinkedIn accounts", starter: "1", pro: "3", agency: "Unlimited" },
      { label: "Post scheduling", starter: "Unlimited", pro: "Unlimited", agency: "Unlimited" },
      { label: "Content calendar", starter: true, pro: true, agency: true },
      { label: "Post analytics", starter: true, pro: true, agency: true },
      { label: "Multi-account publishing", starter: true, pro: true, agency: true },
      { label: "Team collaboration", starter: false, pro: true, agency: true },
      { label: "White-label reports", starter: false, pro: false, agency: true },
    ],
    cols: ["Creator", "Growth", "Agency"],
  },
  bundle: {
    rows: [
      { label: "Monthly price", starter: "$59/mo", pro: null, agency: null },
      { label: "Annual price", starter: "$41/mo", pro: null, agency: null },
      { label: "LinkedIn sender account", starter: "1", pro: null, agency: null },
      { label: "Scheduling accounts", starter: "1", pro: null, agency: null },
      { label: "Lead credits / month", starter: "600", pro: null, agency: null },
      { label: "AI credits", starter: "300", pro: null, agency: null },
      { label: "Outreach automation", starter: true, pro: null, agency: null },
      { label: "LinkedIn scheduling", starter: true, pro: null, agency: null },
      { label: "AI assistant", starter: true, pro: null, agency: null },
      { label: "Campaign analytics", starter: true, pro: null, agency: null },
    ],
    cols: ["Pro Suite"],
  },
  addons: {
    rows: [
      { label: "White Label Reports", starter: "$29/mo", pro: null, agency: null, extra1: null, extra2: null, extra3: null },
      { label: "Extra Leads 1000", starter: "$17 one-time", pro: null, agency: null, extra1: null, extra2: null, extra3: null },
      { label: "Extra Leads 500", starter: "$11 one-time", pro: null, agency: null, extra1: null, extra2: null, extra3: null },
      { label: "Additional Senders +10", starter: "$135/mo", pro: null, agency: null, extra1: null, extra2: null, extra3: null },
      { label: "Additional Senders +5", starter: "$75/mo", pro: null, agency: null, extra1: null, extra2: null, extra3: null },
      { label: "Additional Sender +1", starter: "$17/mo", pro: null, agency: null, extra1: null, extra2: null, extra3: null },
      { label: "Instant activation", starter: true, pro: null, agency: null, extra1: null, extra2: null, extra3: null },
      { label: "No plan change required", starter: true, pro: null, agency: null, extra1: null, extra2: null, extra3: null },
    ],
    cols: ["Add-On"],
  },
};

/* ─── UI COMPONENTS ─────────────────────────────────────── */
function BillingToggle({ annual, onToggle }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16, flexWrap: "wrap" }}>
      <span style={{ fontSize: 12, fontWeight: 700, letterSpacing: "0.8px", textTransform: "uppercase", color: !annual ? "#0a0a0a" : "#999" }}>
        Monthly
      </span>
      <label style={{ position: "relative", width: 46, height: 25, cursor: "pointer", display: "inline-block", flexShrink: 0 }}>
        <input type="checkbox" checked={annual} onChange={onToggle} style={{ opacity: 0, width: 0, height: 0 }} />
        <span style={{ position: "absolute", inset: 0, background: annual ? "#c8f000" : "#ccc", borderRadius: 100, transition: "background .3s" }}>
          <span style={{ position: "absolute", width: 19, height: 19, left: 3, top: 3, background: "#0a0a0a", borderRadius: "50%", transform: annual ? "translateX(21px)" : "none", transition: "transform .3s" }} />
        </span>
      </label>
      <span style={{ fontSize: 12, fontWeight: 700, letterSpacing: "0.8px", textTransform: "uppercase", color: annual ? "#0a0a0a" : "#999" }}>
        Annual
      </span>
      <span style={{ fontSize: 10, fontWeight: 800, letterSpacing: "0.8px", textTransform: "uppercase", background: "#0a0a0a", color: "#c8f000", padding: "3px 8px", borderRadius: 4 }}>
        Save 30%
      </span>
    </div>
  );
}

function PlanListCard({ plan, annual, selected, onClick, compact = false }) {
  const price = annual ? plan.annual : plan.monthly;

  return (
    <div
      onClick={onClick}
      className={`plan-row ${compact ? "compact-plan-row" : ""}`}
      style={{
        display: "grid",
        gridTemplateColumns: "54px minmax(0, 1fr) auto",
        alignItems: "start",
        gap: 16,
        background: selected ? "#f7fae5" : "#fff",
        border: `1.5px solid ${selected ? "#c8f000" : "#e8e5de"}`,
        borderRadius: 16,
        padding: compact ? "16px 18px" : "20px 20px",
        cursor: "pointer",
        transition: "all .18s",
        boxShadow: selected ? "0 0 0 2px rgba(200,240,0,0.18)" : "none",
        minHeight: compact ? 112 : 132,
      }}
    >
      <div
        style={{
          width: 54,
          height: 54,
          borderRadius: 14,
          background: selected ? "#d4f04a" : "#eef6c4",
          flexShrink: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 18,
          color: "#6a9500",
          transition: "background .18s",
        }}
      >
        ✦
      </div>

      <div style={{ minWidth: 0, paddingTop: 2 }}>
        <div
          style={{
            fontWeight: 800,
            fontSize: compact ? 14.5 : 15.5,
            color: "#0a0a0a",
            marginBottom: 8,
            display: "flex",
            alignItems: "center",
            gap: 8,
            flexWrap: "wrap",
            lineHeight: 1.25,
          }}
        >
          <span>{plan.name}</span>

          {plan.badge && (
            <span
              style={{
                display: "inline-flex",
                alignItems: "center",
                fontSize: 9,
                fontWeight: 800,
                letterSpacing: "1px",
                textTransform: "uppercase",
                padding: "3px 8px",
                borderRadius: 999,
                background: "#0a0a0a",
                color: plan.badgeStyle === "addon" ? "#c8f000" : "#fff",
                lineHeight: 1,
              }}
            >
              {plan.badge}
            </span>
          )}
        </div>

        <p
          style={{
            fontSize: compact ? 12.25 : 12.8,
            color: "#666",
            lineHeight: 1.65,
            margin: 0,
            maxWidth: "95%",
          }}
        >
          {plan.desc}
        </p>
      </div>

      <div
        style={{
          textAlign: "right",
          flexShrink: 0,
          minWidth: 92,
          paddingTop: 2,
        }}
      >
        <div
          style={{
            fontFamily: "'Bebas Neue', sans-serif",
            fontSize: compact ? 38 : 42,
            lineHeight: 0.95,
            color: "#0a0a0a",
            whiteSpace: "nowrap",
          }}
        >
          ${price}
        </div>
        <div
          style={{
            fontSize: 9.5,
            color: "#aaa",
            fontWeight: 700,
            letterSpacing: "0.6px",
            textTransform: "uppercase",
            marginTop: 4,
          }}
        >
          Per Month
        </div>
      </div>
    </div>
  );
}

function DetailPanel({ plan, annual }) {
  if (!plan) return null;
  const price = annual ? plan.annual : plan.monthly;

  return (
    <div style={{ background: "#fff", border: "1.5px solid #e8e5de", borderRadius: 14, padding: "20px 18px" }}>
      <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: 12 }}>
        <span style={{ fontSize: 9, fontWeight: 800, letterSpacing: "1.2px", textTransform: "uppercase", background: "#f4f2e8", color: "#666", border: "1.5px solid #e0ddd5", padding: "3px 10px", borderRadius: 100 }}>
          {plan.category}
        </span>
      </div>

      <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 24, color: "#0a0a0a", letterSpacing: 0.5, marginBottom: 4 }}>
        {plan.name}
      </div>

      <p style={{ fontSize: 12, color: "#777", lineHeight: 1.5, marginBottom: 16 }}>
        {plan.subtitle}
      </p>

      <ul style={{ listStyle: "none", padding: 0, margin: "0 0 18px", display: "flex", flexDirection: "column", gap: 8 }}>
        {plan.features.map((f) => (
          <li key={f} style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <span style={{ width: 17, height: 17, borderRadius: "50%", background: "#eef6c4", border: "1.5px solid #b8e000", flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <svg width="7" height="6" viewBox="0 0 9 7" fill="none">
                <path d="M1 3.5l2 2L8 1" stroke="#5a8a00" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
            <span style={{ fontSize: 12.5, fontWeight: 600, color: "#222" }}>{f}</span>
          </li>
        ))}
      </ul>

      <div style={{ borderTop: "1.5px dashed #e8e5de", paddingTop: 14 }}>
        <div style={{ marginBottom: 10 }}>
          <div style={{ fontSize: 9.5, fontWeight: 700, letterSpacing: "0.8px", textTransform: "uppercase", color: "#aaa", marginBottom: 2 }}>
            No credit card required
          </div>
          <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 22, color: "#0a0a0a", lineHeight: 1 }}>
            ${price}/month
          </div>
        </div>

        <a
          href="#"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "#c8f000",
            color: "#0a0a0a",
            fontWeight: 800,
            fontSize: 11,
            letterSpacing: "1px",
            textTransform: "uppercase",
            padding: "10px 0",
            borderRadius: 8,
            textDecoration: "none",
          }}
        >
          {plan.btnLabel} →
        </a>
      </div>
    </div>
  );
}

/* ─── COMPARISON TABLE ──────────────────────────────────── */
function ComparisonTable({ activeTab, annual }) {
  const data = COMPARISON_BY_TAB[activeTab];
  if (!data) return null;

  const plans = PLANS_BY_TAB[activeTab] || [];
  const { rows, cols } = data;

  const visibleRows = rows.filter((row) => {
    const vals = ["starter", "pro", "agency"];
    return vals.some((k) => row[k] !== null && row[k] !== undefined);
  });

  const colKeys = ["starter", "pro", "agency"].slice(0, cols.length);

  const Check = () => (
    <span style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", width: 22, height: 22, borderRadius: "50%", background: "#eef6c4", border: "1.5px solid #b8e000" }}>
      <svg width="8" height="7" viewBox="0 0 9 7" fill="none">
        <path d="M1 3.5l2 2L8 1" stroke="#5a8a00" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </span>
  );

  const Cross = () => (
    <span style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", width: 22, height: 22, borderRadius: "50%", background: "#f4f2e8", border: "1.5px solid #e0ddd5", color: "#ccc", fontSize: 13, fontWeight: 700 }}>
      —
    </span>
  );

  const renderCell = (val) => {
    if (val === null || val === undefined) return <Cross />;
    if (val === true) return <Check />;
    if (val === false) return <Cross />;
    return <span style={{ fontSize: 12.5, fontWeight: 700, color: "#0a0a0a" }}>{val}</span>;
  };

  const popularIdx = plans.findIndex((p) => p.badge === "POPULAR");

  return (
    <div style={{ marginBottom: 36 }}>
      <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", marginBottom: 16, gap: 8 }}>
        <div>
          <h2 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 26, letterSpacing: 0.5, color: "#0a0a0a", lineHeight: 1, marginBottom: 4 }}>
            Compare <span style={{ color: "#c8f000" }}>Plans</span>
          </h2>
          <p style={{ fontSize: 12, color: "#999" }}>Side-by-side feature breakdown for this category.</p>
        </div>
      </div>

      <div style={{ background: "#fff", border: "1.5px solid #e8e5de", borderRadius: 14, overflow: "hidden" }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: `minmax(160px, 1.6fr) ${cols.map(() => "1fr").join(" ")}`,
            background: "#0a0a0a",
            padding: "0 0",
          }}
        >
          <div style={{ padding: "14px 20px", borderRight: "1px solid #1e1e1e" }}>
            <span style={{ fontSize: 9.5, fontWeight: 800, letterSpacing: "1.5px", textTransform: "uppercase", color: "#555" }}>Feature</span>
          </div>
          {cols.map((col, ci) => (
            <div
              key={col}
              style={{
                padding: "14px 12px",
                textAlign: "center",
                borderRight: ci < cols.length - 1 ? "1px solid #1e1e1e" : "none",
                background: ci === popularIdx ? "#1a1f0a" : "transparent",
                position: "relative",
              }}
            >
              {ci === popularIdx && (
                <div style={{ position: "absolute", top: 0, left: "50%", transform: "translateX(-50%)", background: "#c8f000", color: "#0a0a0a", fontSize: 8, fontWeight: 900, letterSpacing: "1px", textTransform: "uppercase", padding: "2px 8px", borderRadius: "0 0 5px 5px" }}>
                  Popular
                </div>
              )}
              <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 17, color: ci === popularIdx ? "#c8f000" : "#fff", letterSpacing: 0.5 }}>
                {col}
              </div>
              {plans[ci] && (
                <div style={{ fontSize: 10, color: "#666", fontWeight: 600, marginTop: 1 }}>
                  ${annual ? plans[ci].annual : plans[ci].monthly}/mo
                </div>
              )}
            </div>
          ))}
        </div>

        {visibleRows.map((row, ri) => {
          const isEven = ri % 2 === 0;
          return (
            <div
              key={row.label}
              style={{
                display: "grid",
                gridTemplateColumns: `minmax(160px, 1.6fr) ${cols.map(() => "1fr").join(" ")}`,
                background: isEven ? "#fff" : "#faf9f5",
                borderTop: "1px solid #f0ede6",
              }}
            >
              <div style={{ padding: "11px 20px", display: "flex", alignItems: "center", borderRight: "1px solid #f0ede6" }}>
                <span style={{ fontSize: 12.5, color: "#444", fontWeight: 500 }}>{row.label}</span>
              </div>
              {colKeys.map((key, ci) => (
                <div
                  key={key}
                  style={{
                    padding: "11px 12px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    borderRight: ci < cols.length - 1 ? "1px solid #f0ede6" : "none",
                    background: ci === popularIdx ? (isEven ? "#fdfff0" : "#f9fce8") : "transparent",
                  }}
                >
                  {renderCell(row[key])}
                </div>
              ))}
            </div>
          );
        })}

        <div
          style={{
            display: "grid",
            gridTemplateColumns: `minmax(160px, 1.6fr) ${cols.map(() => "1fr").join(" ")}`,
            background: "#faf9f5",
            borderTop: "1.5px solid #e8e5de",
            padding: "14px 0",
          }}
        >
          <div style={{ padding: "0 20px", display: "flex", alignItems: "center" }}>
            <span style={{ fontSize: 11, color: "#aaa", fontWeight: 600 }}>14-day free trial · No credit card</span>
          </div>
          {cols.map((col, ci) => (
            <div key={col} style={{ padding: "0 10px", display: "flex", alignItems: "center", justifyContent: "center", borderRight: ci < cols.length - 1 ? "1px solid #f0ede6" : "none" }}>
              <a
                href="#"
                style={{
                  display: "block",
                  width: "100%",
                  textAlign: "center",
                  background: ci === popularIdx ? "#c8f000" : "#0a0a0a",
                  color: ci === popularIdx ? "#0a0a0a" : "#fff",
                  fontWeight: 800,
                  fontSize: 10,
                  letterSpacing: "0.8px",
                  textTransform: "uppercase",
                  padding: "9px 0",
                  borderRadius: 7,
                  textDecoration: "none",
                }}
              >
                {plans[ci]?.btnLabel || "Get Started"} →
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function Sidebar({ annual, onToggle, selectedPlan, onSelectPlan }) {
  const price = annual ? selectedPlan.annual : selectedPlan.monthly;

  const tabKey = Object.keys(PLANS_BY_TAB).find((tab) =>
    PLANS_BY_TAB[tab].some((p) => p.id === selectedPlan.id)
  );
  const siblingPlans = PLANS_BY_TAB[tabKey] || [];

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 14, width: "100%" }}>
      <div style={{ background: "#fff", border: "1.5px solid #e0ddd5", borderRadius: 14, padding: "20px 18px" }}>
        <div style={{ marginBottom: 14 }}>
          <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: "1px", textTransform: "uppercase", color: "#aaa", marginBottom: 7 }}>
            Select Plan
          </div>

          <div style={{ display: "flex", gap: 5 }}>
            {siblingPlans.map((p) => (
              <button
                key={p.id}
                onClick={() => onSelectPlan(p.id)}
                style={{
                  flex: 1,
                  padding: "7px 2px",
                  borderRadius: 7,
                  border: `1.5px solid ${selectedPlan.id === p.id ? "#c8f000" : "#e8e5de"}`,
                  background: selectedPlan.id === p.id ? "#c8f000" : "#f9f8f4",
                  color: "#0a0a0a",
                  fontSize: 10,
                  fontWeight: 800,
                  letterSpacing: "0.5px",
                  textTransform: "uppercase",
                  cursor: "pointer",
                  transition: "all .15s",
                }}
              >
                {p.tier}
              </button>
            ))}
          </div>
        </div>

        <div style={{ borderTop: "1px solid #f0ede6", paddingTop: 14, marginBottom: 14 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 3 }}>
            <span style={{ fontSize: 13, fontWeight: 700, color: "#0a0a0a" }}>
              {selectedPlan.name}
            </span>
            <span style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 26, color: "#0a0a0a", lineHeight: 1 }}>
              ${price}
              <span style={{ fontSize: 12, fontWeight: 500, color: "#888", fontFamily: "'Barlow', sans-serif" }}>
                /mo
              </span>
            </span>
          </div>
          <div style={{ fontSize: 11, color: "#aaa" }}>
            {annual ? "Billed annually" : "Billed monthly"} · Cancel anytime
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 14, padding: "9px 11px", background: "#f9f8f4", borderRadius: 8 }}>
          <span style={{ fontSize: 10.5, fontWeight: 700, color: !annual ? "#0a0a0a" : "#aaa", textTransform: "uppercase", letterSpacing: "0.5px" }}>
            Monthly
          </span>
          <label style={{ position: "relative", width: 36, height: 20, cursor: "pointer", display: "inline-block", flexShrink: 0 }}>
            <input type="checkbox" checked={annual} onChange={onToggle} style={{ opacity: 0, width: 0, height: 0 }} />
            <span style={{ position: "absolute", inset: 0, background: annual ? "#c8f000" : "#ccc", borderRadius: 100, transition: "background .3s" }}>
              <span style={{ position: "absolute", width: 14, height: 14, left: 3, top: 3, background: "#0a0a0a", borderRadius: "50%", transform: annual ? "translateX(16px)" : "none", transition: "transform .3s" }} />
            </span>
          </label>
          <span style={{ fontSize: 10.5, fontWeight: 700, color: annual ? "#0a0a0a" : "#aaa", textTransform: "uppercase", letterSpacing: "0.5px" }}>
            Annual
          </span>
          {annual && (
            <span style={{ marginLeft: "auto", fontSize: 9, fontWeight: 800, background: "#0a0a0a", color: "#c8f000", padding: "2px 6px", borderRadius: 3, letterSpacing: "0.5px" }}>
              −30%
            </span>
          )}
        </div>

        <a href="#" style={{ display: "block", textAlign: "center", background: "#c8f000", color: "#0a0a0a", fontWeight: 800, fontSize: 11.5, letterSpacing: "1px", textTransform: "uppercase", padding: "12px 0", borderRadius: 8, textDecoration: "none", marginBottom: 8 }}>
          ▶ Start Free Trial
        </a>
        <a href="#" style={{ display: "block", textAlign: "center", background: "#0a0a0a", color: "#fff", fontWeight: 800, fontSize: 11.5, letterSpacing: "1px", textTransform: "uppercase", padding: "12px 0", borderRadius: 8, textDecoration: "none" }}>
          ▶ Get Started Now
        </a>
        <p style={{ fontSize: 10.5, color: "#bbb", textAlign: "center", marginTop: 10, lineHeight: 1.5 }}>
          14-day free trial · No credit card required
        </p>
      </div>

      <div style={{ background: "#fff", border: "1.5px solid #e0ddd5", borderRadius: 14, padding: "16px 18px", display: "flex", flexDirection: "column", gap: 12 }}>
        {TRUST_BADGES.map(({ icon, label }) => (
          <div key={label} style={{ display: "flex", alignItems: "center", gap: 11 }}>
            <span style={{ width: 36, height: 36, borderRadius: "50%", background: "#f4f2e8", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 15, flexShrink: 0 }}>
              {icon}
            </span>
            <span style={{ fontSize: 13, fontWeight: 600, color: "#333" }}>{label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function Reviews() {
  return (
    <div style={{ marginBottom: 48 }}>
      <h2 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 30, letterSpacing: 0.5, color: "#c8f000", marginBottom: 4 }}>
        What our users say
      </h2>
      <p style={{ fontSize: 13, color: "#777", marginBottom: 22 }}>
        Join 12,400+ professionals growing on LinkedIn with Linkziy.
      </p>

      <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
        {REVIEWS.map(({ initials, color, name, date, text }) => (
          <div key={name} style={{ display: "flex", gap: 14, alignItems: "flex-start" }}>
            <span style={{ width: 40, height: 40, borderRadius: "50%", background: color, flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800, fontSize: 15, color: "#fff" }}>
              {initials}
            </span>
            <div>
              <div style={{ fontSize: 13.5, color: "#333", lineHeight: 1.65, marginBottom: 5 }}>
                <span style={{ fontSize: 18, color: "#c8f000", lineHeight: 0, verticalAlign: "middle", marginRight: 3 }}>"</span>
                {text}
                <span style={{ fontSize: 18, color: "#c8f000", lineHeight: 0, verticalAlign: "middle", marginLeft: 3 }}>"</span>
              </div>
              <div style={{ fontSize: 11.5, color: "#aaa" }}>— {name}, {date}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function Promises() {
  return (
    <div style={{ marginBottom: 48 }}>
      <h2 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 30, letterSpacing: 0.5, color: "#c8f000", marginBottom: 18 }}>
        Our promise to you
      </h2>
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {PROMISES.map(({ title, body }) => (
          <div key={title} style={{ background: "#fff", border: "1.5px solid #e8e5de", borderRadius: 11, padding: "20px 22px" }}>
            <div style={{ fontWeight: 800, fontSize: 15, color: "#0a0a0a", marginBottom: 7 }}>{title}</div>
            <p style={{ fontSize: 13.5, color: "#555", lineHeight: 1.7 }}>{body}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function FaqItem({ q, a }) {
  const [open, setOpen] = useState(false);

  return (
    <div onClick={() => setOpen((o) => !o)} style={{ background: open ? "#f7fae5" : "#0a0a0a", border: `1.5px solid ${open ? "#c8f000" : "#1a1a1a"}`, borderRadius: 9, padding: "14px 16px", cursor: "pointer", transition: "background .2s, border-color .2s" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 12 }}>
        <span style={{ fontSize: 13.5, fontWeight: 700, color: open ? "#0a0a0a" : "#fff" }}>{q}</span>
        <span style={{ width: 22, height: 22, borderRadius: "50%", flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center", background: open ? "#c8f000" : "transparent", border: `1.5px solid ${open ? "#c8f000" : "#444"}`, color: open ? "#0a0a0a" : "#777", fontSize: 13, transform: open ? "rotate(45deg)" : "none", transition: "all .22s" }}>+</span>
      </div>
      {open && <p style={{ fontSize: 13.5, color: "#555", lineHeight: 1.65, marginTop: 10 }}>{a}</p>}
    </div>
  );
}

function FaqSection() {
  return (
    <div style={{ marginBottom: 48 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 16, gap: 12, flexWrap: "wrap" }}>
        <h2 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 30, letterSpacing: 0.5, color: "#c8f000" }}>FAQs</h2>
        <a href="#" style={{ fontSize: 12.5, color: "#c8f000", textDecoration: "none", fontWeight: 700 }}>See all FAQs →</a>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 7 }}>
        {FAQS.map(({ q, a }) => (
          <FaqItem key={q} q={q} a={a} />
        ))}
      </div>
    </div>
  );
}

function QuickStats() {
  const rows = [
    ["Active users", "12,400+"],
    ["Posts generated", "3.2 million"],
    ["Average rating", "4.9 / 5.0"],
    ["Free trial length", "14 days"],
    ["Credit card required", "No"],
    ["Cancellation policy", "Cancel anytime"],
  ];

  return (
    <div style={{ marginBottom: 48 }}>
      <h2 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 30, letterSpacing: 0.5, color: "#c8f000", marginBottom: 16 }}>
        Quick stats
      </h2>
      <div style={{ background: "#fff", border: "1.5px solid #e8e5de", borderRadius: 11, overflow: "hidden" }}>
        {rows.map(([label, value], i) => (
          <div key={label} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "12px 18px", borderBottom: i < rows.length - 1 ? "1px dotted #e8e5de" : "none", background: i % 2 === 0 ? "#fff" : "#faf9f5" }}>
            <span style={{ fontSize: 13.5, color: "#555" }}>{label}</span>
            <span style={{ fontSize: 13.5, fontWeight: 700, color: "#0a0a0a" }}>{value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─── PAGE ──────────────────────────────────────────────── */
export default function Pricing() {
  const [annual, setAnnual] = useState(false);
  const [activeTab, setActiveTab] = useState("outreach");
  const [selectedPlanId, setSelectedPlanId] = useState("outreach-starter");

  const currentPlans = PLANS_BY_TAB[activeTab] || [];

  const selectedPlan = useMemo(() => {
    return currentPlans.find((p) => p.id === selectedPlanId) || currentPlans[0];
  }, [currentPlans, selectedPlanId]);

  const addonsDetailRef = useRef(null);
  const [addonsDetailHeight, setAddonsDetailHeight] = useState(0);

  useEffect(() => {
    if (activeTab === "addons" && addonsDetailRef.current) {
      setAddonsDetailHeight(addonsDetailRef.current.offsetHeight);
    }
  }, [activeTab, selectedPlan, annual]);

  function handleTabChange(tabId) {
    setActiveTab(tabId);
    const first = PLANS_BY_TAB[tabId]?.[0];
    if (first) setSelectedPlanId(first.id);
  }

  return (
    <>
      <Cursor />

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Barlow+Condensed:wght@700;800;900&family=Barlow:wght@400;500;600;700&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        body { font-family: 'Barlow', sans-serif; background: #f4f2e8; color: #0a0a0a; overflow-x: hidden; }
        a:hover { opacity: 0.85; }

        .pricing-outer {
          display: grid;
          grid-template-columns: minmax(0, 1fr) 340px;
          gap: 32px;
          align-items: start;
        }

        .right-sidebar-column {
          position: relative;
          align-self: stretch;
          min-height: 100%;
        }

        .sidebar-sticky {
          position: sticky;
          top: 110px;
        }

        .sidebar-shell {
          width: 100%;
        }

        .plans-inner {
          display: flex;
          flex-direction: row;
          gap: 14px;
          align-items: flex-start;
          margin-bottom: 32px;
        }

        .plans-list-col {
          flex: 1 1 0;
          min-width: 0;
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .plans-detail-col {
          flex: 0 0 300px;
          width: 300px;
          align-self: flex-start;
        }

        .plans-detail-col.addons-detail-sticky {
          position: sticky;
          top: 110px;
        }

        .tab-pill {
          padding: 8px 15px;
          border-radius: 100px;
          border: 1.5px solid #d0ccc4;
          background: transparent;
          color: #555;
          font-size: 12px;
          font-weight: 700;
          cursor: pointer;
          transition: all .18s;
        }

        .tab-pill.active {
          background: #0a0a0a;
          color: #fff;
          border-color: #0a0a0a;
        }

        .plan-row:hover {
          border-color: #c8f000 !important;
          background: #fafde8 !important;
        }

        .plans-inner.addons-layout {
          align-items: flex-start;
        }

        .plans-list-col.addons-scroll {
          overflow-y: auto;
          padding-right: 8px;
          scrollbar-width: thin;
          scrollbar-color: #c8f000 #ece8de;
          scroll-behavior: smooth;
        }

        .plans-list-col.addons-scroll::-webkit-scrollbar {
          width: 8px;
        }

        .plans-list-col.addons-scroll::-webkit-scrollbar-track {
          background: #ece8de;
          border-radius: 999px;
        }

        .plans-list-col.addons-scroll::-webkit-scrollbar-thumb {
          background: #c8f000;
          border-radius: 999px;
        }

        .bundle-hero-card {
          background: linear-gradient(135deg, #ffffff 0%, #f7fae5 100%);
          border: 1.5px solid #dfe7b2;
          border-radius: 18px;
          padding: 24px;
          margin-bottom: 18px;
        }

        .bundle-top {
          display: grid;
          grid-template-columns: minmax(0, 1fr) 220px;
          gap: 18px;
          align-items: start;
        }

        .bundle-price-box {
          background: #0a0a0a;
          color: #fff;
          border-radius: 16px;
          padding: 18px 16px;
          text-align: center;
        }

        .bundle-mini-grid {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 12px;
          margin-top: 18px;
        }

        .bundle-mini-card {
          background: #fff;
          border: 1.5px solid #e8e5de;
          border-radius: 14px;
          padding: 14px;
        }

        .bundle-mini-label {
          font-size: 10px;
          font-weight: 800;
          letter-spacing: 0.9px;
          text-transform: uppercase;
          color: #999;
          margin-bottom: 6px;
        }

        .bundle-mini-value {
          font-size: 14px;
          font-weight: 800;
          color: #0a0a0a;
          line-height: 1.4;
        }

        @media (max-width: 1100px) {
          .plans-list-col.addons-scroll {
            max-height: none !important;
            overflow: visible !important;
            padding-right: 0 !important;
          }

          .plans-detail-col.addons-detail-sticky {
            position: static !important;
            top: auto !important;
          }

          .bundle-top {
            grid-template-columns: 1fr !important;
          }

          .bundle-mini-grid {
            grid-template-columns: 1fr !important;
          }
        }

        @media (max-width: 1100px) {
          .pricing-outer {
            grid-template-columns: 1fr !important;
          }

          .plans-inner {
            flex-direction: column !important;
          }

          .plans-detail-col {
            flex: 1 1 auto !important;
            width: 100% !important;
          }

          .right-sidebar-column {
            min-height: auto !important;
          }

          .sidebar-sticky {
            position: static !important;
            top: auto !important;
          }
        }
      `}</style>

      <div style={{ minHeight: "100vh", background: "#f4f2e8" }}>
        <Navbar />

        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "140px 32px 40px" }}>
          <div style={{ marginBottom: 24 }}>
            <h1 style={{ fontFamily: "'Bebas Neue'", fontSize: "clamp(2.8rem, 6vw, 5.5rem)" }}>
              Pick Your <span style={{ color: "#c8f000" }}>Growth</span> Plan
            </h1>
            <p style={{ color: "#666" }}>
              No hidden fees. Start free for 14 days.
            </p>
          </div>

          <div className="pricing-outer">
            <div>
              <BillingToggle annual={annual} onToggle={() => setAnnual((a) => !a)} />

              <div style={{ display: "flex", gap: 6, marginBottom: 14, flexWrap: "wrap" }}>
                {TABS.map((tab) => (
                  <button
                    key={tab.id}
                    className={`tab-pill ${activeTab === tab.id ? "active" : ""}`}
                    onClick={() => handleTabChange(tab.id)}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              {activeTab === "bundle" ? (
                <div style={{ marginBottom: 32 }}>
                  <div className="bundle-hero-card">
                    <div className="bundle-top">
                      <div>
                        <div
                          style={{
                            display: "inline-flex",
                            alignItems: "center",
                            gap: 8,
                            marginBottom: 12,
                          }}
                        >
                          <span
                            style={{
                              fontSize: 10,
                              fontWeight: 800,
                              letterSpacing: "1px",
                              textTransform: "uppercase",
                              padding: "4px 10px",
                              borderRadius: 999,
                              background: "#0a0a0a",
                              color: "#c8f000",
                            }}
                          >
                            All-in-One Bundle
                          </span>
                        </div>

                        <h3
                          style={{
                            fontFamily: "'Bebas Neue', sans-serif",
                            fontSize: 42,
                            lineHeight: 1,
                            letterSpacing: 0.5,
                            marginBottom: 10,
                            color: "#0a0a0a",
                          }}
                        >
                          {selectedPlan.name}
                        </h3>

                        <p
                          style={{
                            fontSize: 14,
                            color: "#666",
                            lineHeight: 1.75,
                            maxWidth: 620,
                          }}
                        >
                          {selectedPlan.desc}
                        </p>
                      </div>

                      <div className="bundle-price-box">
                        <div
                          style={{
                            fontSize: 10,
                            fontWeight: 800,
                            letterSpacing: "1px",
                            textTransform: "uppercase",
                            color: "#9aa08a",
                            marginBottom: 8,
                          }}
                        >
                          Starting at
                        </div>

                        <div
                          style={{
                            fontFamily: "'Bebas Neue', sans-serif",
                            fontSize: 54,
                            lineHeight: 1,
                            color: "#c8f000",
                          }}
                        >
                          ${annual ? selectedPlan.annual : selectedPlan.monthly}
                        </div>

                        <div
                          style={{
                            fontSize: 12,
                            color: "#bbb",
                            marginTop: 6,
                          }}
                        >
                          per month
                        </div>

                        <a
                          href="#"
                          style={{
                            display: "block",
                            marginTop: 16,
                            textAlign: "center",
                            background: "#c8f000",
                            color: "#0a0a0a",
                            fontWeight: 800,
                            fontSize: 11.5,
                            letterSpacing: "1px",
                            textTransform: "uppercase",
                            padding: "12px 0",
                            borderRadius: 10,
                            textDecoration: "none",
                          }}
                        >
                          Start Free Trial
                        </a>
                      </div>
                    </div>

                    <div className="bundle-mini-grid">
                      <div className="bundle-mini-card">
                        <div className="bundle-mini-label">Includes</div>
                        <div className="bundle-mini-value">Outreach + Scheduling + AI</div>
                      </div>

                      <div className="bundle-mini-card">
                        <div className="bundle-mini-label">Lead Credits</div>
                        <div className="bundle-mini-value">600 per month</div>
                      </div>

                      <div className="bundle-mini-card">
                        <div className="bundle-mini-label">AI Credits</div>
                        <div className="bundle-mini-value">300 credits included</div>
                      </div>
                    </div>
                  </div>

                  <DetailPanel plan={selectedPlan} annual={annual} />
                </div>
              ) : (
                <div className={`plans-inner ${activeTab === "addons" ? "addons-layout" : ""}`}>
                  <div
                    className={`plans-list-col ${activeTab === "addons" ? "addons-scroll" : ""}`}
                    style={
                      activeTab === "addons" && addonsDetailHeight
                        ? { maxHeight: addonsDetailHeight }
                        : {}
                    }
                  >
                    {currentPlans.map((plan) => (
                      <PlanListCard
                        key={plan.id}
                        plan={plan}
                        annual={annual}
                        selected={selectedPlan?.id === plan.id}
                        onClick={() => setSelectedPlanId(plan.id)}
                        compact={activeTab === "addons"}
                      />
                    ))}
                  </div>

                  <div
                    ref={activeTab === "addons" ? addonsDetailRef : null}
                    className={`plans-detail-col ${activeTab === "addons" ? "addons-detail-sticky" : ""}`}
                  >
                    <DetailPanel plan={selectedPlan} annual={annual} />
                  </div>
                </div>
              )}

              <ComparisonTable activeTab={activeTab} annual={annual} />

              <hr style={{ border: "none", borderTop: "1.5px dashed #d8d4cc", marginBottom: 44 }} />
              <Reviews />
              <hr style={{ border: "none", borderTop: "1.5px dashed #d8d4cc", marginBottom: 44 }} />
              <Promises />
              <hr style={{ border: "none", borderTop: "1.5px dashed #d8d4cc", marginBottom: 44 }} />
              <FaqSection />
              <hr style={{ border: "none", borderTop: "1.5px dashed #d8d4cc", marginBottom: 44 }} />
              <QuickStats />
            </div>

            <div className="right-sidebar-column">
              <div className="sidebar-sticky">
                <div className="sidebar-shell">
                  <Sidebar
                    annual={annual}
                    onToggle={() => setAnnual((a) => !a)}
                    selectedPlan={selectedPlan}
                    onSelectPlan={setSelectedPlanId}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <Footer />
      </div>
    </>
  );
}