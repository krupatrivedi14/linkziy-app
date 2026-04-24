import { Link } from "react-router-dom";
import styles from "./Logo.module.css";

export default function Logo() {
  return (
    <Link to="/" className={styles.logo}>
      <img
        src="/logo-removebg-preview.png"
        alt="Linkziy Logo"
        className={styles.logoImg}
      />
      <span className={styles.logoText}>Linkziy</span>
    </Link>
  );
}