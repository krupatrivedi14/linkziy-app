import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../components/Logo";

export default function Signup() {
  const [form, setForm] = useState({
    name: "",
    company: "",
    email: "",
    password: "",
  });

  const [agreed, setAgreed] = useState(false);
  const navigate = useNavigate();

  const update = (field) => (e) =>
    setForm((prev) => ({ ...prev, [field]: e.target.value }));

  function handleSubmit(e) {
    e.preventDefault();
    navigate("/dashboard");
  }

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Barlow:wght@400;500;600;700;800&display=swap');

        *, *::before, *::after { box-sizing: border-box; }

        body {
          font-family: 'Barlow', sans-serif;
          overflow-x: hidden;
        }

        .auth-layout {
          display: grid;
          grid-template-columns: 45% 1fr;
          min-height: 100vh;
        }

        .auth-left {
          background: #0a0a0a;
          color: #fff;
          padding: 48px 52px;
          display: flex;
          flex-direction: column;
          justify-content: center;
          position: sticky;
          top: 0;
          height: 100vh;
        }

        .logo-wrap {
          margin-bottom: 56px;
        }

        .auth-left h2 {
          font-family: 'Bebas Neue', sans-serif;
          font-size: clamp(38px, 4vw, 56px);
          line-height: 0.95;
          letter-spacing: 0.5px;
          margin-bottom: 20px;
        }

        .auth-left h2 em {
          font-style: normal;
          color: #c8f000;
        }

        .auth-left > p {
          font-size: 15px;
          color: rgba(255,255,255,0.5);
          line-height: 1.7;
          margin-bottom: 40px;
          max-width: 400px;
        }

        .auth-perks {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .auth-perk {
          display: flex;
          align-items: center;
          gap: 12px;
          background: rgba(255,255,255,0.05);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 10px;
          padding: 13px 16px;
          font-size: 14px;
          color: rgba(255,255,255,0.7);
        }

        .perk-dot {
          width: 28px;
          height: 28px;
          background: rgba(200,240,0,0.12);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          color: #c8f000;
          font-size: 13px;
        }

        .auth-right {
          background: #fff;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 60px 48px;
          overflow-y: auto;
        }

        .auth-form-wrap {
          width: 100%;
          max-width: 420px;
        }

        .auth-form-wrap h2 {
          font-size: 28px;
          font-weight: 800;
          color: #0a0a0a;
          margin-bottom: 8px;
        }

        .auth-form-wrap > p {
          font-size: 14px;
          color: #888;
          margin-bottom: 32px;
          line-height: 1.6;
        }

        .form-group {
          margin-bottom: 18px;
        }

        .form-group label {
          display: block;
          font-size: 13px;
          font-weight: 700;
          color: #333;
          margin-bottom: 7px;
        }

        .form-group label span {
          font-weight: 400;
          color: #aaa;
        }

        .form-group input {
          width: 100%;
          padding: 13px 16px;
          border: 1.5px solid #e5e5e0;
          border-radius: 9px;
          font-size: 15px;
          color: #0a0a0a;
          background: #fafaf7;
          font-family: 'Barlow', sans-serif;
          transition: border-color 0.2s, background 0.2s;
          outline: none;
        }

        .form-group input:focus {
          border-color: #c8f000;
          background: #fff;
        }

        .form-group input::placeholder {
          color: #bbb;
        }

        .terms-row {
          display: flex;
          align-items: flex-start;
          gap: 10px;
          margin-bottom: 22px;
        }

        .terms-row input {
          accent-color: #c8f000;
          width: 15px;
          height: 15px;
          margin-top: 2px;
          flex-shrink: 0;
        }

        .terms-row label {
          font-size: 13px;
          color: #666;
          line-height: 1.5;
          cursor: pointer;
        }

        .terms-row a {
          color: #0a0a0a;
          font-weight: 700;
          text-decoration: none;
        }

        .btn-signup {
          width: 100%;
          padding: 14px;
          background: #0a0a0a;
          color: #fff;
          border: none;
          border-radius: 9px;
          font-size: 16px;
          font-weight: 700;
          font-family: 'Barlow', sans-serif;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          transition: background 0.2s, transform 0.15s;
          letter-spacing: 0.3px;
        }

        .btn-signup:hover {
          background: #222;
          transform: translateY(-1px);
        }

        .auth-switch {
          text-align: center;
          margin-top: 22px;
          font-size: 14px;
          color: #888;
        }

        .auth-switch a {
          color: #0a0a0a;
          font-weight: 700;
          text-decoration: none;
        }

        .auth-switch a:hover {
          color: #6a9500;
        }

        .back-link {
          display: block;
          text-align: center;
          margin-top: 18px;
          font-size: 13px;
          color: #bbb;
          text-decoration: none;
          transition: color 0.2s;
        }

        .back-link:hover {
          color: #666;
        }

        @media (max-width: 768px) {
          .auth-layout {
            grid-template-columns: 1fr;
          }

          .auth-left {
            display: none;
          }

          .auth-right {
            padding: 40px 24px;
          }
        }
      `}</style>

      <div className="auth-layout">
        <div className="auth-left">
          <div className="logo-wrap">
            <Logo variant="dark" />
          </div>

          <h2>
            Build <em>Predictable</em> Growth With A Cleaner, Smarter Outreach System.
          </h2>

          <p>
            Unified lead intelligence, messaging, and follow-up control in one platform
            crafted for modern teams.
          </p>

          <div className="auth-perks">
            {[
              "Smart lead workflows with less manual effort",
              "Cleaner outreach pipeline with higher consistency",
              "Built for scale, clarity, and daily productivity",
            ].map((text) => (
              <div className="auth-perk" key={text}>
                <div className="perk-dot">✓</div>
                {text}
              </div>
            ))}
          </div>
        </div>

        <div className="auth-right">
          <div className="auth-form-wrap">
            <h2>Let&apos;s get started</h2>
            <p>Set up your profile and start your growth workflow in minutes.</p>

            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Full Name</label>
                <input
                  type="text"
                  placeholder="John Smith"
                  value={form.name}
                  onChange={update("name")}
                  required
                />
              </div>

              <div className="form-group">
                <label>
                  Company Name <span>(optional)</span>
                </label>
                <input
                  type="text"
                  placeholder="Acme Corp"
                  value={form.company}
                  onChange={update("company")}
                />
              </div>

              <div className="form-group">
                <label>Email Address</label>
                <input
                  type="email"
                  placeholder="you@company.com"
                  value={form.email}
                  onChange={update("email")}
                  required
                />
              </div>

              <div className="form-group">
                <label>Password</label>
                <input
                  type="password"
                  placeholder="••••••••"
                  value={form.password}
                  onChange={update("password")}
                  required
                  minLength={6}
                />
              </div>

              <div className="terms-row">
                <input
                  type="checkbox"
                  id="terms"
                  checked={agreed}
                  onChange={(e) => setAgreed(e.target.checked)}
                  required
                />
                <label htmlFor="terms">
                  I agree to the <a href="#">Terms and Conditions</a>
                </label>
              </div>

              <button type="submit" className="btn-signup">
                Create account →
              </button>
            </form>

            <div className="auth-switch">
              Already have an account? <Link to="/login">Sign in</Link>
            </div>

            <Link to="/" className="back-link">
              ← Back to home
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}