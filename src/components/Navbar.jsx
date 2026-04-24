import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import styles from './Navbar.module.css'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <nav className={`${styles.nav} ${scrolled ? styles.scrolled : ''}`}>
      <span className={styles.scanLine} aria-hidden="true" />

      {/* Logo → always goes to home */}
      <Link to="/" className={styles.logo}>
        <img
          src="/logo-removebg-preview.png"
          alt="Linkziy Logo"
          className={styles.logoImg}
        />
        <span className={styles.logoText}>Linkziy</span>
      </Link>

      <ul className={styles.links}>
        {/* These stay anchor links (landing page sections) */}
        <li><a href="/#features">Features</a></li>
        <li><a href="/#solutions">Solutions</a></li>
        <li><a href="/#built">Built for</a></li>

        {/* Pricing → now goes to page */}
        <li>
          <Link
            to="/pricing"
            className={location.pathname === "/pricing" ? styles.active : ""}
          >
            Pricing
          </Link>
        </li>

        <li><a href="/#contact">Contact</a></li>
      </ul>

      <div className={styles.actions}>
        <button
          className={styles.btnLogin}
          onClick={() => (window.location.href = '/login')}
        >
          Log In
        </button>

        <button
          className={styles.btnStart}
          onClick={() => (window.location.href = '/signup')}
        >
          Start Free
        </button>
      </div>
    </nav>
  )
}