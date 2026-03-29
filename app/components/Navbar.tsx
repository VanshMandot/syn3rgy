"use client";

import { useState, useEffect } from "react";
import styles from "./Navbar.module.css";

const NAV_ITEMS = [
  { label: "Timeline", href: "#timeline" },
  { label: "Domains", href: "#domains" },
  { label: "Prizes", href: "#prizes" },
  { label: "Guidelines", href: "#guidelines" },
  { label: "Contact", href: "#contact" },
  { label: "FAQ", href: "#faq" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);

      // Determine active section
      const sections = NAV_ITEMS.map((item) => item.href.slice(1));
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 120) {
            setActiveSection(sections[i]);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (href: string) => {
    setMenuOpen(false);
    const el = document.querySelector(href);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <nav className={`${styles.navbar} ${scrolled ? styles.scrolled : ""}`} id="navbar">
      <div className={styles.navContainer}>
        {/* LEFT - Glitch Logo */}
        <div className={styles.logo} onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
          SYNERGY <span className={styles.logoAccent}>3.0</span>
        </div>

        {/* RIGHT - Navigation & Status */}
        <div className={styles.rightSide}>
          <ul className={`${styles.navLinks} ${menuOpen ? styles.open : ""}`}>
            {NAV_ITEMS.map((item) => (
              <li key={item.href}>
                <button
                  className={`${styles.navLink} ${activeSection === item.href.slice(1) ? styles.active : ""}`}
                  onClick={() => handleNavClick(item.href)}
                >
                  {item.label}
                </button>
              </li>
            ))}
          </ul>
          
          <div className={styles.statusBlock}>
            <div className={styles.statusDot} />
            <span>SYSTEM_STATUS: OPERATIONAL</span>
          </div>
        </div>

        {/* MOBILE TOGGLE */}
        <button
          className={`${styles.menuToggle} ${menuOpen ? styles.open : ""}`}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <span />
          <span />
          <span />
        </button>
      </div>
    </nav>
  );
}
