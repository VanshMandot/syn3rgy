"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import styles from "./domain.module.css";

const DOMAINS = [
  {
    id: "web-app",
    label: "Web / App",
    title: "WEB DEV",
    subtitle: "Playstyle: Smart, adaptive, problem-solver, system thinker....",
    description: "A master of logic and structure, Arisu navigates complex systems with precision. He builds seamless digital worlds, solving problems step by step and turning chaos into clean, functional design.",
    image: "/characters/web.png",
    cardImage: "/cards/spade.png",
    backImage: "/characters/blue.png",
    themeRgb: "0, 191, 255", // Neon Cyan
    stats: [
      { name: "HP", val: 92 },
      { name: "ARMOR  ", val: 75 },
      { name: "MOBILITY  ", val: 84 },
      { name: "ACCURACY  ", val: 88 },
      { name: "STEALTH  ", val: 64 },
      { name: "TACTICS  ", val: 90 }
    ]
  },
  {
    id: "blockchain",
    label: "Blockchain",
    title: "BLOCKCHAIN",
    subtitle: "Playstyle: Strategic, unpredictable, high IQ plays....",
    description: "Cold, calculated, and always ten steps ahead. Chishiya thrives in systems built on trust and deception, mastering decentralization, cryptography, and high-stakes decision-making.",
    image: "/characters/blockchain.png",
    cardImage: "/cards/club.png",
    backImage: "/characters/yellow.png",
    themeRgb: "234, 179, 8", // Neon Gold/Yellow
    stats: [
      { name: "HP", val: 88 },
      { name: "ARMOR", val: 82 },
      { name: "MOBILITY", val: 62 },
      { name: "ACCURACY", val: 70 },
      { name: "STEALTH", val: 48 },
      { name: "TACTICS", val: 95 }
    ]
  },
  {
    id: "cyber",
    label: "Cybersecurity",
    title: "CYBERSECURITY",
    subtitle: "Playstyle: Defensive offense, sharp instincts, resilience....",
    description: "Fearless and relentless, Kuina protects systems like a warrior. She anticipates threats, breaks through defenses, and ensures nothing slips past unnoticed.",
    image: "/characters/cyber.png",
    cardImage: "/cards/heart.png",
    backImage: "/characters/red.png",
    themeRgb: "255, 0, 51", // Brutal Red
    stats: [
      { name: "HP", val: 95 },
      { name: "ARMOR", val: 88 },
      { name: "MOBILITY", val: 78 },
      { name: "ACCURACY", val: 82 },
      { name: "STEALTH", val: 79 },
      { name: "TACTICS", val: 84 }
    ]
  },
  {
    id: "aiml",
    label: "AI / ML",
    title: "AI / ML",
    subtitle: "Playstyle: Speed, adaptability, pattern recognition....",
    description: "Fast, precise, and always learning. Faith moves through data like a city skyline—adapting, predicting, and optimizing every step with intelligence and agility.",
    image: "/characters/aiml.png",
    cardImage: "/cards/diamond.png",
    backImage: "/characters/green.png",
    themeRgb: "0, 255, 170", // Neon Mint Green
    stats: [
      { name: "HP", val: 90 },
      { name: "ARMOR", val: 65 },
      { name: "MOBILITY", val: 94 },
      { name: "ACCURACY", val: 92 },
      { name: "STEALTH", val: 70 },
      { name: "TACTICS", val: 96 }
    ]
  },
  {
    id: "open-innovation",
    label: "Open Innovation",
    title: "OPEN INNOVATION",
    subtitle: "Playstyle: Aggressive, decisive, team-driven....",
    description: "A force of raw ambition and leadership. Aguni drives bold ideas into action, uniting people under pressure and pushing innovation beyond limits.",
    image: "/characters/open.png",
    cardImage: "/cards/joker.png",
    backImage: "/characters/purple.png",
    themeRgb: "176, 38, 255", // Neon Purple
    stats: [
      { name: "HP", val: 85 },
      { name: "ARMOR", val: 70 },
      { name: "MOBILITY", val: 88 },
      { name: "ACCURACY", val: 83 },
      { name: "STEALTH", val: 80 },
      { name: "TACTICS", val: 92 }
    ]
  },
];

export default function HybridDomainPage() {
  const [activeIndex, setActiveIndex] = useState(2);
  const [timer, setTimer] = useState("72:00:00");
  const [typedText, setTypedText] = useState("");
  const fullText = "> PROTOCOL_ACCESS_GRANTED::AWAITING_INPUT";

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % DOMAINS.length);
  };

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + DOMAINS.length) % DOMAINS.length);
  };

  useEffect(() => {
    // Fake typing logic
    let currentIndex = 0;
    const typingInterval = setInterval(() => {
      if (currentIndex <= fullText.length) {
        setTypedText(fullText.slice(0, currentIndex));
        currentIndex++;
      } else {
        clearInterval(typingInterval);
      }
    }, 50);

    // Countdown logic
    let [hours, minutes, seconds] = [71, 59, 59];
    const countdownInterval = setInterval(() => {
      seconds--;
      if (seconds < 0) {
        seconds = 59;
        minutes--;
        if (minutes < 0) {
          minutes = 59;
          hours--;
        }
      }
      setTimer(
        `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
      );
    }, 1000);

    return () => {
      clearInterval(typingInterval);
      clearInterval(countdownInterval);
    };
  }, []);

  useEffect(() => {
    const autoplay = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % DOMAINS.length);
    }, 7000);
    return () => clearInterval(autoplay);
  }, []);

  const active = DOMAINS[activeIndex];

  return (
    <section className={styles.container} style={{ "--theme-rgb": active.themeRgb } as React.CSSProperties} id="domains">
      <div className={styles.noiseOverlay} />

      {/* DASHBOARD HEADER */}
      <div className={styles.dashboardHeader}>
        <div className={styles.titleArea}>
          <div className={styles.subLabel}>SYSTEM_READY // INITIATING</div>
          <h2 className={styles.phaseTitle}>PHASE 02: DOMAIN SELECTION</h2>
        </div>

        <div className={styles.terminalBox}>
          <div className={styles.typingText}>{typedText}</div>
        </div>

        <div className={styles.timerBox}>
          <div className={styles.timerLabel}>T-MINUS // SURVIVAL TICKER</div>
          <div className={styles.timerValue}>{timer}</div>
        </div>
      </div>

      {/* CAROUSEL STAGE & HUD CONTENT */}
      <div className={styles.mainContent}>
        {/* BOTTOM HUD - Left Side */}
        <div className={styles.bottomHUD}>
          <div className={styles.hudContainer}>
            <div className={styles.hudCenter}>
              <div className={styles.titleAreaHud}>
                <h1 className={styles.titleText}>{active.title}</h1>
              </div>

              <div className={styles.subtitle}>{active.subtitle}</div>

              <div className={styles.statsAndDesc}>
                <div className={styles.statsBlock}>
                  {active.stats.map(stat => {
                    const barLevel = Math.min(10, Math.max(0, Math.round(stat.val / 10)));
                    return (
                      <div key={stat.name} className={styles.statRow}>
                        <span className={styles.statName}>{stat.name}</span>
                        <div className={styles.statBar}>
                          {Array.from({ length: 10 }).map((_, idx) => (
                            <div key={idx} className={`${styles.statChunk} ${idx < barLevel ? styles.filled : ""}`} />
                          ))}
                        </div>
                      </div>
                    );
                  })}
                </div>

                <p className={styles.descText}>{active.description}</p>
              </div>
            </div>
          </div>
        </div>

        {/* CAROUSEL STAGE - Right Side */}
        <div className={styles.carouselStage}>
          <button className={`${styles.navArrow} ${styles.navLeft}`} onClick={handlePrev}>&lt;</button>
          <div className={styles.carouselCenter}>
            <AnimatePresence initial={false}>
          {DOMAINS.map((domain, i) => {
            const isActive = i === activeIndex;
            let offset = i - activeIndex;

            if (offset > Math.floor(DOMAINS.length / 2)) offset -= DOMAINS.length;
            if (offset < -Math.floor(DOMAINS.length / 2)) offset += DOMAINS.length;

            // Only show active card and up to two cards on the left side
            if (offset > 0) return null;

            const layer = Math.min(2, Math.abs(offset));

            const xPos = isActive ? 0 : -11 - (layer - 1) * 8;
            const yPos = isActive ? 0 :  0 + layer * 10;
            const zPos = isActive ? 0 : -60 * layer;
            const cardRotateY = isActive ? 0 : -16;
            const scaleAmount = isActive ? 1.12 : 0.82;
            const visibleOpacity = isActive ? 1 : 0.65 - layer * 0.2;

            return (
              <motion.div
                key={domain.id}
                className={`${styles.characterItem} ${isActive ? styles.activeChar : styles.inactiveChar}`}
                onClick={() => setActiveIndex(i)}
                initial={{ opacity: 0, scale: scaleAmount, x: `${xPos}vw`, z: zPos, y: `${yPos}vh`, rotateY: `${cardRotateY}deg` }}
                animate={{
                  opacity: visibleOpacity,
                  scale: scaleAmount,
                  x: `${xPos}vw`,
                  z: zPos,
                  y: `${yPos}vh`,
                  rotateY: `${cardRotateY}deg`
                }}
                transition={{ duration: 0.45, ease: "easeOut" }}
                style={{ "--card-rgb": domain.themeRgb, zIndex: 200 - layer * 10 } as React.CSSProperties}
              >
                <div className={styles.charFrame}>
                  <Image
                    src={domain.image}
                    alt={domain.label}
                    fill
                    className={styles.characterImage}
                    priority={isActive}
                  />
                  <div className={styles.charOverlay}>
                    <div className={styles.overlayText}>
                      <span className={styles.overlayTitle}>{domain.title}</span>
                      <span className={styles.overlaySubtitle}>{domain.subtitle}</span>
                    </div>
                  </div>
                  {!isActive && (
                    <div className={styles.cardBackFull}>
                      <Image
                        src={domain.backImage}
                        alt={`${domain.label} back`}
                        fill
                        className={styles.characterImage}
                      />
                    </div>
                  )}
                </div>
              </motion.div>
            );
          })}
            </AnimatePresence>
          </div>
          <button className={`${styles.navArrow} ${styles.navRight}`} onClick={handleNext}>&gt;</button>
        </div>
      </div>
    </section>
  );
}
