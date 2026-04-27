import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../components/Logo";

export default function SignUp() {
  const [form, setForm] = useState({ name: "", company: "", email: "", password: "" });
  const [agreed, setAgreed] = useState(false);
  const [showPass, setShowPass] = useState(false);
  const [step, setStep] = useState(1);
  const navigate = useNavigate();

  const update = (field) => (e) => setForm(prev => ({ ...prev, [field]: e.target.value }));

  function handleSubmit(e) {
    e.preventDefault();
    navigate("/dashboard");
  }

  const passwordStrength = () => {
    const p = form.password;
    if (!p) return 0;
    let score = 0;
    if (p.length >= 8) score++;
    if (/[A-Z]/.test(p)) score++;
    if (/[0-9]/.test(p)) score++;
    if (/[^A-Za-z0-9]/.test(p)) score++;
    return score;
  };
  const strength = passwordStrength();
  const strengthLabel = ['', 'Weak', 'Fair', 'Good', 'Strong'][strength];
  const strengthColor = ['', '#ef4444', '#f59e0b', '#3b82f6', '#22c55e'][strength];

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

        /* LEFT */
        .auth-left {
          background: #0a0a0a;
          color: #fff;
          display: flex;
          flex-direction: column;
          position: sticky;
          top: 0;
          height: 100vh;
          overflow: hidden;
        }
        .auth-left-inner {
          display: flex; flex-direction: column; height: 100%;
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

        /* Steps */
        .signup-steps {
          display: flex;
          flex-direction: column;
          gap: 0;
          margin-bottom: 0;
        }
        .signup-step {
          display: flex;
          align-items: flex-start;
          gap: 14px;
          padding: 14px 0;
          position: relative;
        }
        .signup-step:not(:last-child)::after {
          content: '';
          position: absolute;
          left: 13px;
          top: 42px;
          width: 1px;
          height: calc(100% - 14px);
          background: rgba(255,255,255,0.08);
        }
        .step-num {
          width: 28px; height: 28px;
          border-radius: 50%;
          display: flex; align-items: center; justify-content: center;
          font-size: 12px; font-weight: 800;
          flex-shrink: 0;
          position: relative;
          z-index: 1;
        }
        .step-num.done { background: #c8f000; color: #0a0a0a; }
        .step-num.active { background: rgba(200,240,0,0.15); color: #c8f000; border: 1.5px solid rgba(200,240,0,0.3); }
        .step-num.pending { background: rgba(255,255,255,0.06); color: rgba(255,255,255,0.2); }
        .step-info { padding-top: 4px; }
        .step-label { font-size: 13px; font-weight: 700; color: rgba(255,255,255,0.5); margin-bottom: 1px; }
        .step-label.active { color: rgba(255,255,255,0.88); }
        .step-label.done { color: rgba(255,255,255,0.4); }
        .step-sub { font-size: 11.5px; color: rgba(255,255,255,0.22); }

        .auth-left-footer {
          margin-top: 36px;
          padding-top: 24px;
          border-top: 1px solid rgba(255,255,255,0.06);
        }
        .trust-items { display: flex; gap: 20px; }
        .trust-item { display: flex; align-items: center; gap: 7px; font-size: 12px; color: rgba(255,255,255,0.3); }
        .trust-icon { font-size: 14px; }

        /* RIGHT */
        .auth-right {
          background: #fafaf8;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 60px 48px;
          overflow-y: auto;
        }
        .auth-form-wrap { width: 100%; max-width: 400px; }

        .auth-form-title { font-size: 26px; font-weight: 800; color: #0a0a0a; margin-bottom: 6px; letter-spacing: -0.3px; }
        .auth-form-sub { font-size: 14px; color: #aaa; margin-bottom: 28px; line-height: 1.5; }

        /* Progress bar */
        .form-progress { margin-bottom: 28px; }
        .form-progress-bar {
          height: 3px; background: #e8e5de; border-radius: 2px;
          overflow: hidden; margin-bottom: 8px;
        }
        .form-progress-fill {
          height: 100%;
          background: linear-gradient(90deg, #c8f000, #8ab000);
          border-radius: 2px;
          transition: width 0.4s ease;
        }
        .form-progress-label { font-size: 11.5px; color: #aaa; font-weight: 600; }

        .form-group { margin-bottom: 16px; }
        .form-label {
          display: block;
          font-size: 12px;
          font-weight: 700;
          color: #555;
          margin-bottom: 7px;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }
        .form-label span { font-weight: 500; color: #bbb; text-transform: none; letter-spacing: 0; }

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
          color: #bbb; font-size: 15px; line-height: 1; padding: 2px;
          transition: color 0.18s;
        }
        .input-icon-btn:hover { color: #555; }

        /* Password strength */
        .password-strength { margin-top: 8px; }
        .strength-bar { display: flex; gap: 4px; margin-bottom: 5px; }
        .strength-seg {
          flex: 1; height: 3px; border-radius: 2px;
          background: #e8e5de;
          transition: background 0.25s;
        }
        .strength-label { font-size: 11.5px; font-weight: 700; }

        .form-row-2 { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }

        .terms-row {
          display: flex; align-items: flex-start; gap: 10px;
          margin-bottom: 20px;
          padding: 14px;
          background: #fff;
          border: 1.5px solid #e8e5de;
          border-radius: 9px;
        }
        .terms-row input { accent-color: #c8f000; width: 15px; height: 15px; margin-top: 1px; flex-shrink: 0; cursor: pointer; }
        .terms-row label { font-size: 13px; color: #666; line-height: 1.55; cursor: pointer; }
        .terms-row a { color: #0a0a0a; font-weight: 700; text-decoration: none; }
        .terms-row a:hover { color: #6a9500; }

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
          display: flex; align-items: center; justify-content: center; gap: 8px;
          transition: background 0.2s, transform 0.15s;
          letter-spacing: 0.3px;
          margin-bottom: 18px;
        }
        .btn-submit:hover { background: #1a1a1a; transform: translateY(-1px); }
        .btn-submit:disabled { opacity: 0.4; cursor: not-allowed; transform: none; }

        .auth-divider {
          display: flex; align-items: center; gap: 12px;
          margin-bottom: 18px; color: #ccc; font-size: 12px;
        }
        .auth-divider::before, .auth-divider::after { content: ''; flex: 1; height: 1px; background: #ebe8e0; }

        .btn-social {
          width: 100%; padding: 11px; background: #fff; color: #333;
          border: 1.5px solid #e8e5de; border-radius: 9px; font-size: 14px;
          font-weight: 600; font-family: 'Barlow', sans-serif; cursor: pointer;
          display: flex; align-items: center; justify-content: center; gap: 10px;
          transition: border-color 0.2s, box-shadow 0.2s;
          margin-bottom: 22px;
        }
        .btn-social:hover { border-color: #0a0a0a; box-shadow: 0 2px 8px rgba(0,0,0,0.06); }

        .auth-switch { text-align: center; font-size: 13.5px; color: #aaa; margin-bottom: 14px; }
        .auth-switch a { color: #0a0a0a; font-weight: 800; text-decoration: none; }
        .auth-switch a:hover { color: #6a9500; }
        .back-link { display: flex; align-items: center; justify-content: center; gap: 5px; font-size: 12.5px; color: #ccc; text-decoration: none; transition: color 0.2s; }
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
              <h2>Start Growing With <em>Smarter</em> LinkedIn Outreach.</h2>
              <p className="auth-left-desc">Join hundreds of teams using Linkziy to automate their outreach, manage leads, and close deals faster.</p>

              <div className="signup-steps">
                {[
                  { label: 'Create your account', sub: 'Name, email and password' },
                  { label: 'Connect LinkedIn', sub: 'Sync your profile in one click' },
                  { label: 'Launch your first campaign', sub: 'Automated in minutes' },
                ].map((s, i) => {
                  const state = i + 1 < step ? 'done' : i + 1 === step ? 'active' : 'pending';
                  return (
                    <div className="signup-step" key={i}>
                      <div className={`step-num ${state}`}>
                        {state === 'done' ? '✓' : i + 1}
                      </div>
                      <div className="step-info">
                        <div className={`step-label ${state}`}>{s.label}</div>
                        <div className="step-sub">{s.sub}</div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="auth-left-footer">
              <div className="trust-items">
                <div className="trust-item"><span className="trust-icon">🔒</span> SOC2 Ready</div>
                <div className="trust-item"><span className="trust-icon">🚀</span> 5-min setup</div>
                <div className="trust-item"><span className="trust-icon">💳</span> No card needed</div>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT */}
        <div className="auth-right">
          <div className="auth-form-wrap">
            <div className="auth-form-title">Let's get started</div>
            <p className="auth-form-sub">Set up your profile and start your growth workflow in minutes. Free, no credit card needed.</p>

            <div className="form-progress">
              <div className="form-progress-bar">
                <div className="form-progress-fill" style={{ width: `${(step / 3) * 100}%` }} />
              </div>
              <div className="form-progress-label">Step {step} of 3 — {['Account details', 'Workspace', 'Confirm'][step - 1]}</div>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="form-row-2">
                <div className="form-group">
                  <label className="form-label">Full Name</label>
                  <input className="form-input" type="text" placeholder="Jane Smith" value={form.name} onChange={update("name")} required />
                </div>
                <div className="form-group">
                  <label className="form-label">Company <span>(optional)</span></label>
                  <input className="form-input" type="text" placeholder="Acme Corp" value={form.company} onChange={update("company")} />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Email Address</label>
                <input className="form-input" type="email" placeholder="you@company.com" value={form.email} onChange={update("email")} required />
              </div>

              <div className="form-group">
                <label className="form-label">Password</label>
                <div className="input-wrap">
                  <input
                    className="form-input has-icon"
                    type={showPass ? "text" : "password"}
                    placeholder="Min. 8 characters"
                    value={form.password}
                    onChange={update("password")}
                    required minLength={8}
                  />
                  <button type="button" className="input-icon-btn" onClick={() => setShowPass(!showPass)}>
                    {showPass ? "🙈" : "👁"}
                  </button>
                </div>
                {form.password && (
                  <div className="password-strength">
                    <div className="strength-bar">
                      {[1, 2, 3, 4].map(i => (
                        <div key={i} className="strength-seg" style={{ background: i <= strength ? strengthColor : '#e8e5de' }} />
                      ))}
                    </div>
                    <div className="strength-label" style={{ color: strengthColor }}>{strengthLabel}</div>
                  </div>
                )}
              </div>

              <div className="terms-row">
                <input type="checkbox" id="terms" checked={agreed} onChange={e => setAgreed(e.target.checked)} required />
                <label htmlFor="terms">
                  I agree to the <a href="#">Terms of Service</a> and <a href="#">Privacy Policy</a>. No spam, ever.
                </label>
              </div>

              <button type="submit" className="btn-submit" disabled={!agreed}>
                Create free account →
              </button>
            </form>

            <div className="auth-divider">or sign up with</div>

            <button className="btn-social">
              <svg width="18" height="18" viewBox="0 0 48 48"><path fill="#4285F4" d="M44.5 20H24v8.5h11.8C34.4 33.6 29.8 37 24 37c-7.2 0-13-5.8-13-13s5.8-13 13-13c3.2 0 6.1 1.2 8.3 3.2l6-6C34.8 5.5 29.7 3 24 3 12.4 3 3 12.4 3 24s9.4 21 21 21c11.6 0 20.5-8.1 20.5-21 0-1.3-.2-2.7-.5-4z"/></svg>
              Continue with Google
            </button>

            <div className="auth-switch">
              Already have an account? <Link to="/login">Sign in</Link>
            </div>

            <Link to="/" className="back-link">← Back to home</Link>
          </div>
        </div>
      </div>
    </>
  );
}
