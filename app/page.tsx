"use client";

import React, { useState } from "react";
import Link from "next/link";
import styles from "./page.module.css";
import BorderlandTimeline from "./components/BorderlandTimeline";



const DOMAINS_DATA = [
  { icon: "🤖", title: "Artificial Intelligence", desc: "Build intelligent systems using machine learning, NLP, and computer vision to solve real-world problems." },
  { icon: "🌐", title: "Web3 & Blockchain", desc: "Create decentralized applications, smart contracts, and explore the future of distributed systems." },
  { icon: "🛡️", title: "Cybersecurity", desc: "Design security tools, vulnerability scanners, and defend against modern cyber threats." },
  { icon: "📱", title: "IoT & Hardware", desc: "Connect the physical and digital worlds with innovative IoT solutions and embedded systems." },
  { icon: "🌿", title: "Sustainability", desc: "Leverage technology to address environmental challenges and build a greener future." },
  { icon: "🏥", title: "HealthTech", desc: "Innovate in healthcare with AI diagnostics, telemedicine, and patient care solutions." },
];

const GUIDELINES_DATA = [
  { title: "Team Size", text: "Teams must consist of 2–4 members. Individual participation is not allowed." },
  { title: "Eligibility", text: "Open to all college students with a valid student ID. No restriction on branch or year." },
  { title: "Original Work", text: "All projects must be built from scratch during the hackathon. Pre-built projects will be disqualified." },
  { title: "Tech Stack", text: "You are free to use any programming language, framework, or tool of your choice." },
  { title: "Code of Conduct", text: "Participants must adhere to a respectful and inclusive environment. Harassment or misconduct will not be tolerated." },
  { title: "Submissions", text: "Projects must be submitted via the official portal before the deadline with a working demo and documentation." },
  { title: "Judging Criteria", text: "Projects will be judged on innovation, technical complexity, design, and real-world impact." },
  { title: "Mentorship", text: "Industry mentors will be available throughout the event to guide and support participants." },
];

const FAQ_DATA = [
  { q: "What is SYNERGY 3.0?", a: "SYNERGY 3.0 is a national-level hackathon where students collaborate to build innovative solutions across multiple technology domains within a 24-hour timeframe." },
  { q: "Is there a registration fee?", a: "No, participation in SYNERGY 3.0 is completely free. We believe in making innovation accessible to everyone." },
  { q: "Can I participate solo?", a: "No, SYNERGY 3.0 is a team event. You must have a team of 2–4 members to participate." },
  { q: "Will food and refreshments be provided?", a: "Yes! We will provide meals, snacks, and beverages throughout the hackathon to keep you fueled." },
  { q: "Do I need prior hackathon experience?", a: "Not at all! SYNERGY 3.0 welcomes participants of all skill levels. Mentors will be available to help beginners." },
  { q: "What should I bring?", a: "Bring your laptop, charger, student ID, and any hardware you might need. We'll provide the rest — Wi-Fi, power, space, and inspiration!" },
];

export default function Home() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [isMounted, setIsMounted] = React.useState(false);

  React.useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <main>
      {/* ===== HERO ===== */}
      <section className={styles.hero}>
        <div className={styles.heroParticles}>
          {isMounted && [...Array(20)].map((_, i) => (
            <div
              key={i}
              className={styles.particle}
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 5}s`,
                animationDuration: `${4 + Math.random() * 4}s`,
                opacity: 0.1 + Math.random() * 0.3,
                width: `${2 + Math.random() * 4}px`,
                height: `${2 + Math.random() * 4}px`,
              }}
            />
          ))}
        </div>
        <div className={styles.heroContent}>
          <span className={styles.heroTag}>🚀 National Level Hackathon</span>
          <h1 className={styles.heroTitle}>
            <span className={styles.heroGradient}>SYNERGY</span>
          </h1>
          <p className={styles.heroVersion}>3.0</p>
          <p className={styles.heroDescription}>
            Innovate. Collaborate. Transform. Join the ultimate hackathon experience
            where brilliant minds come together to build the future.
          </p>
          <button
            className={styles.heroCta}
            onClick={() =>
              document
                .getElementById("timeline")
                ?.scrollIntoView({ behavior: "smooth" })
            }
          >
            Explore Event ↓
          </button>
        </div>
        <div className={styles.scrollIndicator}>
          <span>Scroll</span>
          <div className={styles.scrollDot} />
        </div>
      </section>

      {/* ===== BORDERLAND TIMELINE ===== */}
      <BorderlandTimeline />

      {/* ===== DOMAINS ===== */}
      <section className="section" id="domains">
        <div className="container">
          <h2 className="section-title">Domains</h2>
          <p className="section-subtitle">
            Choose your track and build something extraordinary in one of these exciting domains.
          </p>
          <div className={styles.domainsGrid}>
            {DOMAINS_DATA.map((d, i) => (
              <div key={i} className={styles.domainCard}>
                <span className={styles.domainIcon}>{d.icon}</span>
                <h3 className={styles.domainCardTitle}>{d.title}</h3>
                <p className={styles.domainCardDesc}>{d.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== PRIZES ===== */}
      <section className="section" id="prizes">
        <div className="container">
          <h2 className="section-title">Prizes</h2>
          <p className="section-subtitle">
            Compete for exciting prizes and earn recognition for your innovation.
          </p>
          <div className={styles.prizesGrid}>
            <div className={`${styles.prizeCard} ${styles.silver}`}>
              <span className={styles.prizeTrophy}>🥈</span>
              <p className={styles.prizeRank}>2nd Place</p>
              <p className={styles.prizeAmount}>₹15,000</p>
              <p className={styles.prizeSub}>+ Certificates & Swag</p>
            </div>
            <div className={`${styles.prizeCard} ${styles.gold}`}>
              <span className={styles.prizeTrophy}>🏆</span>
              <p className={styles.prizeRank}>1st Place</p>
              <p className={styles.prizeAmount}>₹25,000</p>
              <p className={styles.prizeSub}>+ Internship Opportunities</p>
            </div>
            <div className={`${styles.prizeCard} ${styles.bronze}`}>
              <span className={styles.prizeTrophy}>🥉</span>
              <p className={styles.prizeRank}>3rd Place</p>
              <p className={styles.prizeAmount}>₹10,000</p>
              <p className={styles.prizeSub}>+ Certificates & Swag</p>
            </div>
          </div>
        </div>
      </section>

      {/* ===== GUIDELINES ===== */}
      <section className="section" id="guidelines">
        <div className="container">
          <h2 className="section-title">Guidelines</h2>
          <p className="section-subtitle">
            Please go through the rules and guidelines before registering.
          </p>
          <div className={styles.guidelinesList}>
            {GUIDELINES_DATA.map((g, i) => (
              <div key={i} className={styles.guidelineItem}>
                <div className={styles.guidelineNumber}>{i + 1}</div>
                <p className={styles.guidelineText}>
                  <strong>{g.title}: </strong>
                  {g.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== CONTACT ===== */}
      <section className="section" id="contact">
        <div className="container">
          <h2 className="section-title">Contact Us</h2>
          <p className="section-subtitle">
            Have questions? Reach out to us and we&apos;ll get back to you.
          </p>
          <div className={styles.contactGrid}>
            <div className={styles.contactInfo}>
              <h3 className={styles.contactInfoTitle}>Get in Touch</h3>
              <p className={styles.contactInfoDesc}>
                We&apos;re here to help! Whether you have questions about registration,
                domains, or logistics — feel free to reach out.
              </p>
              <div className={styles.contactItem}>
                <div className={styles.contactIcon}>📧</div>
                <div>
                  <p className={styles.contactLabel}>Email</p>
                  <p className={styles.contactValue}>synergy@college.edu</p>
                </div>
              </div>
              <div className={styles.contactItem}>
                <div className={styles.contactIcon}>📞</div>
                <div>
                  <p className={styles.contactLabel}>Phone</p>
                  <p className={styles.contactValue}>+91 98765 43210</p>
                </div>
              </div>
              <div className={styles.contactItem}>
                <div className={styles.contactIcon}>📍</div>
                <div>
                  <p className={styles.contactLabel}>Location</p>
                  <p className={styles.contactValue}>
                    Main Auditorium, College Campus
                  </p>
                </div>
              </div>
            </div>

            <form
              className={styles.contactForm}
              onSubmit={(e) => e.preventDefault()}
            >
              <div className={styles.formGroup}>
                <label className={styles.formLabel} htmlFor="name">
                  Name
                </label>
                <input
                  className={styles.formInput}
                  type="text"
                  id="name"
                  placeholder="Your name"
                />
              </div>
              <div className={styles.formGroup}>
                <label className={styles.formLabel} htmlFor="email">
                  Email
                </label>
                <input
                  className={styles.formInput}
                  type="email"
                  id="email"
                  placeholder="your@email.com"
                />
              </div>
              <div className={styles.formGroup}>
                <label className={styles.formLabel} htmlFor="message">
                  Message
                </label>
                <textarea
                  className={styles.formTextarea}
                  id="message"
                  placeholder="Your message..."
                />
              </div>
              <button className={styles.formSubmit} type="submit">
                Send Message
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* ===== FAQ ===== */}
      <section className="section" id="faq">
        <div className="container">
          <h2 className="section-title">FAQ</h2>
          <p className="section-subtitle">
            Frequently asked questions about SYNERGY 3.0.
          </p>
          <div className={styles.faqList}>
            {FAQ_DATA.map((item, i) => (
              <div
                key={i}
                className={`${styles.faqItem} ${
                  openFaq === i ? styles.open : ""
                }`}
              >
                <button
                  className={styles.faqQuestion}
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                >
                  <span>{item.q}</span>
                  <span className={styles.faqChevron}>▾</span>
                </button>
                <div className={styles.faqAnswer}>
                  <p className={styles.faqAnswerInner}>{item.a}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== FOOTER ===== */}
      <footer className={styles.footer}>
        <div className="container">
          <div className={styles.footerLogo}>SYNERGY 3.0</div>
          <div className={styles.footerSocials}>
            <a href="#" className={styles.socialLink} aria-label="Instagram">📸</a>
            <a href="#" className={styles.socialLink} aria-label="Twitter">🐦</a>
            <a href="#" className={styles.socialLink} aria-label="LinkedIn">💼</a>
            <a href="#" className={styles.socialLink} aria-label="Discord">🎮</a>
          </div>
          <p className={styles.footerCopy}>
            © 2026 SYNERGY 3.0. All rights reserved. Made with 💜
          </p>
        </div>
      </footer>
    </main>
  );
}
