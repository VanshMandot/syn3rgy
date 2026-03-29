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
    subtitle: "HIGH-PERFORMANCE INTERFACES",
    description: "Architect the grand digital frontier. Build high-speed applications enforcing fluid interactive experiences.",
    image: "/characters/web.png",
    themeRgb: "0, 191, 255", // Neon Cyan
    stats: [
      { name: "LOG", val: 9 },
      { name: "CRE", val: 8 },
      { name: "SEC", val: 5 },
      { name: "SPD", val: 8 },
      { name: "INT", val: 9 },
      { name: "IMP", val: 8 }
    ]
  },
  {
    id: "blockchain",
    label: "Blockchain",
    title: "BLOCKCHAIN",
    subtitle: "DECENTRALIZED ARCHITECTURE",
    description: "Herald of the decentralized network. Travel node to node enforcing trustless truth and absolute order.",
    image: "/characters/blockchain.png",
    themeRgb: "234, 179, 8", // Neon Gold/Yellow
    stats: [
      { name: "LOG", val: 10 },
      { name: "CRE", val: 4 },
      { name: "SEC", val: 10 },
      { name: "SPD", val: 5 },
      { name: "INT", val: 3 },
      { name: "IMP", val: 9 }
    ]
  },
  {
    id: "cyber",
    label: "Cybersecurity",
    title: "CYBERSECURITY",
    subtitle: "PEACE & ORDER BY SHIELD",
    description: "Defends the digital frontier against emerging threats. Navigates the network detecting exploits securely.",
    image: "/characters/cyber.png",
    themeRgb: "255, 0, 51", // Brutal Red
    stats: [
      { name: "LOG", val: 9 },
      { name: "CRE", val: 5 },
      { name: "SEC", val: 10 },
      { name: "SPD", val: 9 },
      { name: "INT", val: 4 },
      { name: "IMP", val: 8 }
    ]
  },
  {
    id: "aiml",
    label: "AI / ML",
    title: "AI / ML",
    subtitle: "AUTONOMOUS EVOLUTION",
    description: "Harness the power of neural networks. Train intelligent algorithms capable of adapting autonomously.",
    image: "/characters/aiml.png",
    themeRgb: "0, 255, 170", // Neon Mint Green
    stats: [
      { name: "LOG", val: 10 },
      { name: "CRE", val: 9 },
      { name: "SEC", val: 4 },
      { name: "SPD", val: 10 },
      { name: "INT", val: 6 },
      { name: "IMP", val: 10 }
    ]
  },
  {
    id: "open-innovation",
    label: "Open Innovation",
    title: "OPEN INNOVATION",
    subtitle: "NO BOUNDARIES NO MASTERS",
    description: "Explore without boundaries or constraints. Blend disciplines to invent wildly and enforce the unimaginable.",
    image: "/characters/open.png",
    themeRgb: "176, 38, 255", // Neon Purple
    stats: [
      { name: "LOG", val: 7 },
      { name: "CRE", val: 10 },
      { name: "SEC", val: 6 },
      { name: "SPD", val: 8 },
      { name: "INT", val: 8 },
      { name: "IMP", val: 10 }
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

      {/* CAROUSEL STAGE */}
      <div className={styles.carouselStage}>
        <AnimatePresence initial={false}>
          {DOMAINS.map((domain, i) => {
            const isActive = i === activeIndex;
            let offset = i - activeIndex;

            if (offset > 2) offset -= DOMAINS.length;
            if (offset < -2) offset += DOMAINS.length;

            const xPos = offset * 30; // Spread out to 30vw to make room for giant center card
            const yPos = Math.abs(offset) * -2;
            const zPos = Math.abs(offset) * -200;
            const scaleAmount = isActive ? 1.15 : Math.max(0.65, 1 - Math.abs(offset) * 0.15);

            return (
              <motion.div
                key={domain.id}
                className={`${styles.characterItem} ${isActive ? styles.activeChar : styles.inactiveChar}`}
                onClick={() => setActiveIndex(i)}
                initial={{ opacity: 0, scale: scaleAmount, x: `${xPos}vw`, z: zPos, y: `${yPos}vh` }}
                animate={{
                  opacity: Math.abs(offset) > 2 ? 0 : 1,
                  scale: scaleAmount,
                  x: `${xPos}vw`,
                  z: zPos,
                  y: `${yPos}vh`,
                }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                style={{ zIndex: 100 - Math.abs(offset) * 10 }}
              >
                {isActive && <div className={styles.pedestal} />}

                <div className={styles.charFrame}>
                  <Image
                    src={domain.image}
                    alt={domain.label}
                    fill
                    className={styles.characterImage}
                    priority={isActive}
                  />
                  {!isActive && (
                    <span className={styles.silhouetteLabel}>?</span>
                  )}
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      {/* BOTTOM HUD - Dystopian Style */}
      <div className={styles.bottomHUD}>
        <div className={styles.hudContainer}>
          <button className={`${styles.navArrow} ${styles.navLeft}`} onClick={handlePrev}>&lt;</button>

          <div className={styles.hudCenter}>
            <div className={styles.youChoose}>[ YOU_CHOOSE ]</div>
            <div className={styles.titleAreaHud}>
              <h1 className={styles.titleText}>{active.title}</h1>
            </div>

            <div className={styles.subtitle}>{active.subtitle}</div>

            <div className={styles.statsAndDesc}>
              <div className={styles.statsBlock}>
                {active.stats.map(stat => (
                  <div key={stat.name} className={styles.statRow}>
                    <span className={styles.statName}>{stat.name}</span>
                    <div className={styles.statBar}>
                      {Array.from({ length: 10 }).map((_, idx) => (
                        <div key={idx} className={`${styles.statChunk} ${idx < stat.val ? styles.filled : ""}`} />
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              <p className={styles.descText}>{active.description}</p>
            </div>
          </div>

          <button className={`${styles.navArrow} ${styles.navRight}`} onClick={handleNext}>&gt;</button>
        </div>
      </div>
    </section>
  );
}
