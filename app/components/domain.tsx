"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import styles from "./domain.module.css";

const DOMAINS = [
  {
    id: "web-app",
    label: "Web / App",
    title: ["WEB", "DEVELOPMENT"],
    codeName: "Code Architect",
    description:
      "Build the next generation of digital experiences. From high-performance web applications to immersive creative interfaces.",
    image: "/characters/web-app.png",
  },
  {
    id: "blockchain",
    label: "Blockchain",
    title: ["BLOCK", "CHAIN"],
    codeName: "Chain Forger",
    description:
      "Architect decentralized systems and smart contracts. Explore the frontier of trustless computing and digital sovereignty.",
    image: "/characters/blockchain.png",
  },
  {
    id: "aiml",
    label: "AI / ML",
    title: ["AI /", "MACHINE LEARNING"],
    codeName: "Neural Sage",
    description:
      "Harness the power of neural networks and intelligent algorithms. Build systems that learn, adapt, and evolve autonomously.",
    image: "/characters/aiml.png",
  },
  {
    id: "cybersecurity",
    label: "Cyber Security",
    title: ["CYBER", "SECURITY"],
    codeName: "Shield Bearer",
    description:
      "Defend the digital frontier against emerging threats. Design resilient security architectures and exploit detection systems.",
    image: "/characters/cybersecurity.png",
  },
];

export default function DomainSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [animating, setAnimating] = useState(false);

  const active = DOMAINS[activeIndex];

  const handleSwitch = (index: number) => {
    if (index === activeIndex) return;
    setAnimating(true);
    setTimeout(() => {
      setActiveIndex(index);
      setTimeout(() => setAnimating(false), 50);
    }, 200);
  };

  useEffect(() => {
    const timer = setInterval(() => {
      handleSwitch((activeIndex + 1) % DOMAINS.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [activeIndex]);

  return (
    <section className={styles.domainSection} id="domains">
      <div className={styles.domainBg} />
      
      <div className={styles.domainHeader}>
        <h1 className={styles.mainHeading}>DOMAINS</h1>
      </div>

      <div className={styles.domainInner}>
        {/* Left Content */}
        <div className={styles.domainLeft}>

          <h2 className={styles.domainTitle}>
            {active.title[0]}
            <span className={styles.domainTitleAccent}>{active.title[1]}</span>
          </h2>

          <p className={styles.domainDesc}>{active.description}</p>

          {/* Selector Cards */}
          <div className={styles.domainCards}>
            {DOMAINS.map((d, i) => (
              <div
                key={d.id}
                className={`${styles.domainCard} ${
                  i === activeIndex ? styles.active : ""
                }`}
                onClick={() => handleSwitch(i)}
              >
                <div className={styles.domainCardThumb}>
                  <Image
                    src={d.image}
                    alt={d.label}
                    width={48}
                    height={48}
                  />
                </div>
                <span className={styles.domainCardLabel}>{d.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Right — Character Image */}
        <div className={styles.domainRight}>
          <div className={styles.characterGlow} />
          <Image
            key={active.id}
            src={active.image}
            alt={active.label}
            width={500}
            height={580}
            className={`${styles.characterImage} ${
              !animating ? styles.entering : ""
            }`}
            style={{ opacity: animating ? 0 : 1 }}
            priority
          />
        </div>
      </div>
    </section>
  );
}
