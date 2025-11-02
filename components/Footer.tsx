import Link from 'next/link'
import styles from './Footer.module.css'

export default function Footer() {
  return (
    <footer className={styles.footer} role="contentinfo">
      <div className="container">
        <div className={styles.footerContent}>
          {/* Logo Section */}
          <div className={styles.footerSection}>
            <Link href="/" className={styles.footerLogo} aria-label="PKSA Construction Home">
              <span className={styles.footerLogoText}>PKSΛ</span>
            </Link>
            <p className={styles.tagline}>The Value-Driven Partner</p>
          </div>

          {/* Quick Links */}
          <div className={styles.footerSection}>
            <h3 className={styles.footerHeading}>Quick Links</h3>
            <nav aria-label="Footer navigation">
              <ul className={styles.footerNav}>
                <li><Link href="/">Home</Link></li>
                <li><Link href="/about">About Us</Link></li>
                <li><Link href="/services">Services</Link></li>
                <li><Link href="/projects">Projects</Link></li>
                <li><Link href="/contact">Contact</Link></li>
              </ul>
            </nav>
          </div>

          {/* Services */}
          <div className={styles.footerSection}>
            <h3 className={styles.footerHeading}>Services</h3>
            <ul className={styles.footerNav}>
              <li><Link href="/services#construction">Construction</Link></li>
              <li><Link href="/services#engineering">Engineering</Link></li>
              <li><Link href="/services#consultancy">Consultancy</Link></li>
              <li><Link href="/services#property-management">Property Management</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className={styles.footerSection}>
            <h3 className={styles.footerHeading}>Contact Us</h3>
            <address className={styles.contactInfo}>
              <p>
                <strong>PKSA Construction & Engineering Consultancy Ltd</strong>
              </p>
              <p>
                Email: <a href="mailto:pascalconstructionlmt@gmail.com">pascalconstructionlmt@gmail.com</a>
              </p>
              <p>
                Phone: <a href="tel:+233555810550">+233 555 810 550</a>
              </p>
            </address>
          </div>
        </div>

        {/* Copyright */}
        <div className={styles.footerBottom}>
          <p className={styles.copyright}>
            &copy; {new Date().getFullYear()} PKSA Construction & Engineering Consultancy Ltd. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}

