import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import styles from './Navbar.module.css'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const closeMenu = () => setMenuOpen(false)

  return (
    <nav className={`${styles.nav} ${scrolled ? styles.scrolled : ''}`}>
      <Link to="/" className={styles.logo} onClick={closeMenu}>
        <img
          src="/logo-removebg-preview.png"
          alt="Linkziy Logo"
          className={styles.logoImg}
        />
        <span className={styles.logoText}>Linkziy</span>
      </Link>

      <button
        className={styles.menuBtn}
        onClick={() => setMenuOpen(!menuOpen)}
        aria-label="Open navigation menu"
      >
        <span />
        <span />
        <span />
      </button>

      <div className={`${styles.menu} ${menuOpen ? styles.open : ''}`}>
        <ul className={styles.links}>
          <li><a href="/#features" onClick={closeMenu}>Features</a></li>
          <li><a href="/#solutions" onClick={closeMenu}>Solutions</a></li>
          <li><a href="/#built" onClick={closeMenu}>Built for</a></li>

          <li>
            <Link
              to="/pricing"
              onClick={closeMenu}
              className={location.pathname === '/pricing' ? styles.active : ''}
            >
              Pricing
            </Link>
          </li>

          <li><a href="/#contact" onClick={closeMenu}>Contact</a></li>
        </ul>

        <div className={styles.actions}>
          <Link to="/login" className={styles.btnLogin} onClick={closeMenu}>
            Log In
          </Link>

          <Link to="/signup" className={styles.btnStart} onClick={closeMenu}>
            Start Free
          </Link>
        </div>
      </div>
    </nav>
  )
}