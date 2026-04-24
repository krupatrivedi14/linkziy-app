import styles from './Footer.module.css'

const LINKS = ['Features', 'Pricing', 'Blog', 'Changelog', 'Privacy', 'Terms']

export default function Footer() {
  return (
    <footer className={styles.footer} role="contentinfo">
      <div className={styles.top}>
        <a href="/" className={styles.logo}>
           <img src="/logo-removebg-preview.png" alt="Linkziy Logo" className={styles.logoImg}/>
           <span className={styles.logoText}>Linkziy</span>
        </a>

        <nav className={styles.links} aria-label="Footer navigation">
          {LINKS.map((label) => (
            <a
              key={label}
              href={`/${label.toLowerCase()}`}
              className={styles.link}
            >
              {label}
            </a>
          ))}
        </nav>
      </div>
      <div className={styles.bottom}>
        <span className={styles.copy}>© 2026 Linkziy. All rights reserved.</span>
        <span className={styles.copy}>14-day free trial · No credit card · Cancel anytime</span>
      </div>
    </footer>
  )
}
