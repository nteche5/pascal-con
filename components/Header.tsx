'use client'

import Link from 'next/link'
import { useState } from 'react'
import styles from './Header.module.css'

type HeaderProps = {
  variant?: 'default' | 'overlay'
}

export default function Header({ variant = 'default' }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const closeMenu = () => {
    setIsMenuOpen(false)
  }

  return (
    <header className={`${styles.header} ${variant === 'overlay' ? styles.overlay : ''}`} role="banner">
      <div className="container">
        <div className={styles.headerContent}>
          {/* Primary Logo - Desktop */}
          <Link href="/" className={styles.logoFull} aria-label="PKSA Construction Home">
            <span className={styles.logoText}>PKSΛ</span>
            <span className={styles.logoCompany}>PKSA CONSTRUCTION & ENGINEERING CONSULTANCY LTD</span>
          </Link>

          {/* Secondary Logo - Mobile */}
          <Link href="/" className={styles.logoMobile} aria-label="PKSA Construction Home">
            <span className={styles.logoText}>PKSΛ</span>
          </Link>

          {/* Navigation */}
          <nav className={styles.nav} role="navigation" aria-label="Main navigation">
            <button
              className={styles.menuToggle}
              aria-expanded={isMenuOpen}
              aria-controls="main-menu"
              aria-label="Toggle navigation menu"
              onClick={toggleMenu}
            >
              <span className={styles.menuIcon}></span>
              <span className="sr-only">Menu</span>
            </button>

            <ul
              id="main-menu"
              className={`${styles.navList} ${isMenuOpen ? styles.navListOpen : ''}`}
            >
              <li>
                <Link href="/" onClick={closeMenu}>Home</Link>
              </li>
              <li>
                <Link href="/about" onClick={closeMenu}>About Us</Link>
              </li>
              <li>
                <Link href="/services" onClick={closeMenu}>Services</Link>
              </li>
              <li>
                <Link href="/projects" onClick={closeMenu}>Projects</Link>
              </li>
              <li>
                <Link href="/contact" onClick={closeMenu}>Contact</Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  )
}

