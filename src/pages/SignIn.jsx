import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../components/Logo";

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);
  const [showPass, setShowPass] = useState(false);
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    navigate("/dashboard");
  }

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Barlow:wght@400;500;600;700;800&display=swap');
        *, *::before, *::after { box-sizing: border-box; }
        body { font-family: 'Barlow', sans-serif; overflow-x: hidden; cursor: auto !important; }

        .auth-layout {
          display: grid;
          grid-template-columns: 44% 1fr;
          min-height: 100vh;
        }

        /* LEFT PANEL */
        .auth-left {
          background: #0a0a0a;
          color: #fff;
          padding: 0;
          display: flex;
          flex-direction: column;
          position: sticky;
          top: 0;
          height: 100vh;
          overflow: hidden;
        }

        .auth-left-inner {
          display: flex;
          flex-direction: column;
          height: 100%;
          padding: 40px 48px 36px;
        }

        .auth-logo-wrap { margin-bottom: 48px; }

        .auth-left-content { flex: 1; display: flex; flex-direction: column; justify-content: center; }

        .auth-left h2 {
          font-family: 'Bebas Neue', sans-serif;
          font-size: clamp(40px, 4.2vw, 60px);
          line-height: 0.94;
          letter-spacing: 0.5px;
          margin-bottom: 20px;
        }
        .auth-left h2 em { font-style: normal; color: #c8f000; }

        .auth-left-desc {
          font-size: 14.5px;
          color: rgba(255,255,255,0.45);
          line-height: 1.75;
          margin-bottom: 36px;
          max-width: 360px;
        }

        .auth-perks { display: flex; flex-direction: column; gap: 9px; }
        .auth-perk {
          display: flex;
          align-items: center;
          gap: 12px;
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.07);
          border-radius: 10px;
          padding: 12px 15px;
          font-size: 13.5px;
          color: rgba(255,255,255,0.65);
          transition: background 0.18s, border-color 0.18s;
        }
        .auth-perk:hover { background: rgba(255,255,255,0.07); border-color: rgba(255,255,255,0.12); }
        .perk-dot {
          width: 26px; height: 26px;
          background: rgba(200,240,0,0.12);
          border-radius: 50%;
          display: flex; align-items: center; justify-content: center;
          flex-shrink: 0; color: #c8f000; font-size: 12px; font-weight: 700;
        }

        .auth-left-footer {
          margin-top: 36px;
          padding-top: 24px;
          border-top: 1px solid rgba(255,255,255,0.06);
        }
        .auth-testimonial {
          font-size: 13px;
          color: rgba(255,255,255,0.35);
          line-height: 1.6;
          font-style: italic;
        }
        .auth-testimonial-author {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-top: 12px;
        }
        .testimonial-avatar {
          width: 30px; height: 30px;
          background: rgba(200,240,0,0.15);
          border-radius: 50%;
          display: flex; align-items: center; justify-content: center;
          font-size: 11px; color: #c8f000; font-weight: 800;
        }
        .testimonial-name { font-size: 12px; font-weight: 700; color: rgba(255,255,255,0.45); font-style: normal; }
        .testimonial-role { font-size: 11px; color: rgba(255,255,255,0.22); font-style: normal; }

        /* RIGHT PANEL */
        .auth-right {
          background: #fafaf8;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 60px 48px;
          overflow-y: auto;
        }

        .auth-form-wrap { width: 100%; max-width: 400px; }

        .auth-badge {
          display: inline-flex;
          align-items: center;
          gap: 7px;
          background: rgba(200,240,0,0.1);
          border: 1px solid rgba(200,240,0,0.25);
          color: #666;
          padding: 5px 12px;
          border-radius: 100px;
          font-size: 11.5px;
          font-weight: 700;
          margin-bottom: 22px;
          letter-spacing: 0.02em;
        }
        .auth-badge-dot { width: 6px; height: 6px; background: #c8f000; border-radius: 50%; }

        .auth-form-title { font-size: 26px; font-weight: 800; color: #0a0a0a; margin-bottom: 6px; letter-spacing: -0.3px; }
        .auth-form-sub { font-size: 14px; color: #aaa; margin-bottom: 30px; line-height: 1.5; }

        .form-group { margin-bottom: 18px; }
        .form-label {
          display: flex;
          align-items: center;
          justify-content: space-between;
          font-size: 12.5px;
          font-weight: 700;
          color: #444;
          margin-bottom: 7px;
          text-transform: uppercase;
          letter-spacing: 0.04em;
        }
        .form-label a { font-size: 12px; font-weight: 600; color: #aaa; text-decoration: none; text-transform: none; letter-spacing: 0; }
        .form-label a:hover { color: #0a0a0a; }

        .input-wrap { position: relative; }
        .form-input {
          width: 100%;
          padding: 12px 16px;
          border: 1.5px solid #e8e5de;
          border-radius: 9px;
          font-size: 14.5px;
          color: #0a0a0a;
          background: #fff;
          font-family: 'Barlow', sans-serif;
          transition: border-color 0.2s, box-shadow 0.2s;
          outline: none;
        }
        .form-input:focus { border-color: #c8f000; box-shadow: 0 0 0 3px rgba(200,240,0,0.1); }
        .form-input::placeholder { color: #ccc; }
        .form-input.has-icon { padding-right: 44px; }

        .input-icon-btn {
          position: absolute; right: 13px; top: 50%; transform: translateY(-50%);
          background: none; border: none; cursor: pointer;
          color: #bbb; font-size: 16px; line-height: 1; padding: 2px;
          transition: color 0.18s;
        }
        .input-icon-btn:hover { color: #555; }

        .form-row {
          display: flex; align-items: center; justify-content: space-between;
          margin-bottom: 22px;
        }
        .remember-label {
          display: flex; align-items: center; gap: 8px;
          font-size: 13px; color: #666; cursor: pointer; user-select: none;
        }
        .remember-label input { accent-color: #c8f000; width: 15px; height: 15px; cursor: pointer; }

        .btn-submit {
          width: 100%;
          padding: 13px;
          background: #0a0a0a;
          color: #fff;
          border: none;
          border-radius: 9px;
          font-size: 15px;
          font-weight: 800;
          font-family: 'Barlow', sans-serif;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          transition: background 0.2s, transform 0.15s;
          letter-spacing: 0.3px;
          margin-bottom: 18px;
        }
        .btn-submit:hover { background: #1a1a1a; transform: translateY(-1px); }
        .btn-submit:active { transform: translateY(0); }

        .auth-divider {
          display: flex; align-items: center; gap: 12px;
          margin-bottom: 18px;
          color: #ccc; font-size: 12px;
        }
        .auth-divider::before, .auth-divider::after {
          content: ''; flex: 1; height: 1px; background: #ebe8e0;
        }

        .btn-social {
          width: 100%;
          padding: 11px;
          background: #fff;
          color: #333;
          border: 1.5px solid #e8e5de;
          border-radius: 9px;
          font-size: 14px;
          font-weight: 600;
          font-family: 'Barlow', sans-serif;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          transition: border-color 0.2s, box-shadow 0.2s;
          margin-bottom: 22px;
        }
        .btn-social:hover { border-color: #0a0a0a; box-shadow: 0 2px 8px rgba(0,0,0,0.06); }

        .auth-switch { text-align: center; font-size: 13.5px; color: #aaa; margin-bottom: 14px; }
        .auth-switch a { color: #0a0a0a; font-weight: 800; text-decoration: none; }
        .auth-switch a:hover { color: #6a9500; }

        .back-link {
          display: flex; align-items: center; justify-content: center; gap: 5px;
          font-size: 12.5px; color: #ccc; text-decoration: none; transition: color 0.2s;
        }
        .back-link:hover { color: #888; }

        @media (max-width: 860px) {
          .auth-layout { grid-template-columns: 1fr; }
          .auth-left { display: none; }
          .auth-right { padding: 40px 24px; background: #fff; }
        }
      `}</style>

      <div className="auth-layout">
        {/* LEFT */}
        <div className="auth-left">
          <div className="auth-left-inner">
            <div className="auth-logo-wrap"><Logo variant="dark" /></div>

            <div className="auth-left-content">
              <h2>Build <em>Predictable</em> Growth With A Smarter Outreach System.</h2>
              <p className="auth-left-desc">Unified lead intelligence, messaging, and follow-up control in one platform crafted for modern teams.</p>

              <div className="auth-perks">
                {[
                  "Smart lead workflows with less manual effort",
                  "Cleaner outreach pipeline with higher consistency",
                  "Built for scale, clarity, and daily productivity",
                  "Secure and reliable by design",
                ].map(text => (
                  <div className="auth-perk" key={text}>
                    <div className="perk-dot">✓</div>
                    {text}
                  </div>
                ))}
              </div>
            </div>

            <div className="auth-left-footer">
              <p className="auth-testimonial">"Linkziy helped us triple our reply rate in under 3 weeks. The sequencing is incredibly smart."</p>
              <div className="auth-testimonial-author">
                <div className="testimonial-avatar">JR</div>
                <div>
                  <div className="testimonial-name">James R.</div>
                  <div className="testimonial-role">Head of Growth · Venture Studio</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT */}
        <div className="auth-right">
          <div className="auth-form-wrap">
            <div className="auth-badge"><span className="auth-badge-dot" /> Sign in to dashboard</div>

            <div className="auth-form-title">Welcome back</div>
            <p className="auth-form-sub">Access your campaigns, analytics, and automation from one place.</p>

            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <div className="form-label">Email Address</div>
                <input
                  className="form-input"
                  type="email"
                  placeholder="you@company.com"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  required
                />
              </div>

              <div className="form-group">
                <div className="form-label">
                  Password
                  <a href="#">Forgot password?</a>
                </div>
                <div className="input-wrap">
                  <input
                    className="form-input has-icon"
                    type={showPass ? "text" : "password"}
                    placeholder="••••••••"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    required
                  />
                  <button type="button" className="input-icon-btn" onClick={() => setShowPass(!showPass)}>
                    {showPass ? "🙈" : "👁"}
                  </button>
                </div>
              </div>

              <div className="form-row">
                <label className="remember-label">
                  <input type="checkbox" checked={remember} onChange={e => setRemember(e.target.checked)} />
                  Remember me for 30 days
                </label>
              </div>

              <button type="submit" className="btn-submit">
                Sign in to Linkziy →
              </button>
            </form>

            <div className="auth-divider">or continue with</div>

            <button className="btn-social">
              <svg width="18" height="18" viewBox="0 0 48 48"><path fill="#4285F4" d="M44.5 20H24v8.5h11.8C34.4 33.6 29.8 37 24 37c-7.2 0-13-5.8-13-13s5.8-13 13-13c3.2 0 6.1 1.2 8.3 3.2l6-6C34.8 5.5 29.7 3 24 3 12.4 3 3 12.4 3 24s9.4 21 21 21c11.6 0 20.5-8.1 20.5-21 0-1.3-.2-2.7-.5-4z"/></svg>
              Continue with Google
            </button>

            <div className="auth-switch">
              Don&apos;t have an account? <Link to="/signup">Create one free</Link>
            </div>

            <Link to="/" className="back-link">← Back to home</Link>
          </div>
        </div>
      </div>
    </>
  );
}
