import { Routes, Route } from "react-router-dom";

import Cursor        from './components/Cursor'
import Navbar        from './components/Navbar'
import Hero          from './components/Hero'
import Marquee       from './components/Marquee'
import Features      from './components/Features'
import Process       from './components/Process'
import SplitSection  from './components/SplitSection'
import StatsBar      from './components/StatsBar'
import PricingSection from './components/Pricing'
import Reviews       from './components/Reviews'
import Scheduler     from './components/Scheduler'
import CTA           from './components/CTA'
import Footer        from './components/Footer'

import PricingPage   from './pages/Pricing'
import SignIn        from './pages/SignIn'
import SignUp        from './pages/SignUp'
import Dashboard     from './pages/Dashboard'

/* ─── HOME PAGE ───────────────────────── */
function Home() {
  return (
    <>
      <Cursor />
      <Navbar />
      <main>
        <Hero />
        <Marquee />
        <Features />
        <Process />
        <SplitSection />
        <StatsBar />
        <PricingSection />
        <Reviews />
        <Scheduler />
        <CTA />
      </main>
      <Footer />
    </>
  );
}

/* ─── APP ROUTES ───────────────────────── */
export default function App() {
  return (
    <Routes>
      {/* Public */}
      <Route path="/"          element={<Home />} />
      <Route path="/pricing"   element={<PricingPage />} />
      <Route path="/login"     element={<SignIn />} />
      <Route path="/signup"    element={<SignUp />} />

      {/* Protected (post-auth) */}
      <Route path="/dashboard" element={<Dashboard />} />
    </Routes>
  );
}