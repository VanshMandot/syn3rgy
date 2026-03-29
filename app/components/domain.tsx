"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import Image from "next/image";
import styles from "./domain.module.css";

const DOMAINS = [
  {
    id: "web-app",
    label: "Web / App",
    title: ["WEB", " DEVELOPMENT"],
    suit: "Spades",
    description: "Build the next generation of digital experiences. From high-performance web applications to immersive creative interfaces.",
    image: "/characters/lucid-origin_Spade_—_AGENT_AGUNI_The_Knight_Pursuer_Character_Aguni_Morizono_Role_Duelist_E-0.jpg",
    color: "#00bfff",
    glowColor: "rgba(0, 191, 255, 0.5)",
    spriteClass: "spade",
    cardLetter: "A",
  },
  {
    id: "blockchain",
    label: "Blockchain",
    title: ["BLOCK", " CHAIN"],
    suit: "Hearts",
    description: "Architect decentralized systems and smart contracts. Explore the frontier of trustless computing and digital sovereignty.",
    image: "/characters/lucid-origin_Heart_—_AGENT_USAGI_The_Lover_Guide_Character_Yuzuha_Usagi_Role_Initiator_Inte-0.jpg",
    color: "#ff0055",
    glowColor: "rgba(255, 0, 85, 0.5)",
    spriteClass: "heart",
    cardLetter: "A",
  },
  {
    id: "cyber",
    label: "Cybersecurity",
    title: ["CYBER", " SECURITY"],
    suit: "Diamonds",
    description: "Defend the digital frontier against emerging threats. Design resilient security architectures and exploit detection systems.",
    image: "/characters/lucid-origin_Diamond_—_AGENT_CHISHIYA_The_Strategist_Character_Shuntarō_Chishiya_Role_Cont-0.jpg",
    color: "#ffaa00",
    glowColor: "rgba(255, 170, 0, 0.5)",
    spriteClass: "diamond",
    cardLetter: "A",
  },
  {
    id: "aiml",
    label: "AI / ML",
    title: ["AI /", " ML"],
    suit: "Clubs",
    description: "Harness the power of neural networks and intelligent algorithms. Build systems that learn, adapt, and evolve autonomously.",
    image: "/characters/lucid-origin_Club_—_AGENT_ARISU_The_Hero_Protagonist_Character_Ryōhei_Arisu_Role_Duelist_A-0.jpg",
    color: "#00ffaa",
    glowColor: "rgba(0, 255, 170, 0.5)",
    spriteClass: "club",
    cardLetter: "A",
  },
  {
    id: "open-innovation",
    label: "Open Innovation",
    title: ["OPEN", " INNOVATION"],
    suit: "Joker",
    description: "Innovate without boundaries. Blend disciplines, invent wildly, and bring your most unconventional, rule-breaking ideas to life.",
    image: "/characters/open_innovation_joker.png",
    color: "#b026ff",
    glowColor: "rgba(176, 38, 255, 0.5)",
    spriteClass: "joker",
    cardLetter: "J",
  },
];

function DomainHero() {
  const containerRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 60,
    damping: 25,
    restDelta: 0.001
  });

  // Made cards move smoothly and sizes will be smaller in CSS
  const yTop = useTransform(smoothProgress, [0, 0.4], ["0vh", "-30vh"]);
  const xTop = useTransform(smoothProgress, [0, 0.4], ["0vw", "0vw"]);
  const opacityTop = useTransform(smoothProgress, [0, 0.1, 0.4], [0.3, 0.8, 1]);

  const xLeft = useTransform(smoothProgress, [0, 0.4], ["0vw", "-28vw"]);
  const yLeft = useTransform(smoothProgress, [0, 0.4], ["0vh", "0vh"]);
  const opacityLeft = useTransform(smoothProgress, [0, 0.1, 0.4], [0.3, 0.8, 1]);

  const xRight = useTransform(smoothProgress, [0, 0.4], ["0vw", "28vw"]);
  const yRight = useTransform(smoothProgress, [0, 0.4], ["0vh", "0vh"]);
  const opacityRight = useTransform(smoothProgress, [0, 0.1, 0.4], [0.3, 0.8, 1]);

  const yBottom = useTransform(smoothProgress, [0, 0.4], ["0vh", "30vh"]);
  const xBottom = useTransform(smoothProgress, [0, 0.4], ["0vw", "0vw"]);
  const opacityBottom = useTransform(smoothProgress, [0, 0.1, 0.4], [0.3, 0.8, 1]);

  const yCenter = useTransform(smoothProgress, [0, 0.4], ["0vh", "0vh"]);
  const xCenter = useTransform(smoothProgress, [0, 0.4], ["0vw", "0vw"]);
  const opacityCenter = useTransform(smoothProgress, [0, 0.1, 0.4], [0.3, 0.8, 1]);

  const rotTop = useTransform(smoothProgress, [0, 0.4], [-8, 0]);
  const rotLeft = useTransform(smoothProgress, [0, 0.4], [-3, 0]);
  const rotRight = useTransform(smoothProgress, [0, 0.4], [4, 0]);
  const rotBottom = useTransform(smoothProgress, [0, 0.4], [8, 0]);
  const rotCenter = useTransform(smoothProgress, [0, 0.4], [12, 0]);

  const titleScale = useTransform(smoothProgress, [0, 0.4], [1, 1.2]);
  const titleOpacity = useTransform(smoothProgress, [0, 0.2, 0.5], [1, 0.8, 0]);

  const renderCard = (d: typeof DOMAINS[0], isTop: boolean, isLeft: boolean, isRight: boolean, isBottom: boolean, isCenter: boolean = false) => {
    let y = useTransform(smoothProgress, [0, 1], ["0vh", "0vh"]);
    let x = useTransform(smoothProgress, [0, 1], ["0vw", "0vw"]);
    let rot = useTransform(smoothProgress, [0, 1], [0, 0]);
    let op = useTransform(smoothProgress, [0, 1], [1, 1]);
    let z = 1;

    if (isTop) { y = yTop; x = xTop; rot = rotTop; op = opacityTop; z = 5; }
    if (isLeft) { y = yLeft; x = xLeft; rot = rotLeft; op = opacityLeft; z = 4; }
    if (isRight) { y = yRight; x = xRight; rot = rotRight; op = opacityRight; z = 3; }
    if (isBottom) { y = yBottom; x = xBottom; rot = rotBottom; op = opacityBottom; z = 2; }
    if (isCenter) { y = yCenter; x = xCenter; rot = rotCenter; op = opacityCenter; z = 6; }

    return (
      <motion.div
        className={styles.card}
        style={{ y, x, rotate: rot, opacity: op, borderColor: d.color, boxShadow: `0 0 20px ${d.glowColor}, inset 0 0 10px ${d.glowColor}`, zIndex: z }}
      >
        <div className={styles.cardCornerTop} style={{ color: d.color }}>
          <span>{d.cardLetter}</span>
          <div className={`${styles.suitIconGraphic} ${styles[d.spriteClass]}`} />
        </div>

        <div className={styles.cardContent}>
          <Image src={d.image} alt={d.label} width={140} height={140} className={styles.cardImg} />
          <h3 className={styles.cardLabel}>{d.label}</h3>
        </div>

        <div className={styles.cardCornerBottom} style={{ color: d.color }}>
          <span>{d.cardLetter}</span>
          <div className={`${styles.suitIconGraphic} ${styles[d.spriteClass]}`} />
        </div>
      </motion.div>
    );
  };

  return (
    <section className={styles.container} ref={containerRef} id="domains">
      <div className={styles.stickyArea}>
        <div className={styles.bgOverlay} />

        <motion.div
          className={styles.titleWrapper}
          style={{ scale: titleScale, opacity: titleOpacity }}
        >
          <h1 className={styles.glitchTitle} data-text="DOMAIN">DOMAIN</h1>
        </motion.div>

        <div className={styles.cardsCenter}>
          {renderCard(DOMAINS[0], true, false, false, false, false)}
          {renderCard(DOMAINS[1], false, true, false, false, false)}
          {renderCard(DOMAINS[2], false, false, true, false, false)}
          {renderCard(DOMAINS[3], false, false, false, true, false)}
          {renderCard(DOMAINS[4], false, false, false, false, true)}
        </div>
      </div>
    </section>
  );
}

function DomainDetails() {
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
    <section className={styles.domainSection}>
      <div className={styles.domainBg} />

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
                className={`${styles.domainCard} ${i === activeIndex ? styles.active : ""
                  }`}
                onClick={() => handleSwitch(i)}
              >
                <div className={styles.domainCardThumb}>
                  <Image src={d.image} alt={d.label} width={48} height={48} />
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
            className={`${styles.characterImage} ${!animating ? styles.entering : ""
              }`}
            style={{ opacity: animating ? 0 : 1 }}
            priority
          />
        </div>
      </div>
    </section>
  );
}

export default function DomainPage() {
  return (
    <>
      <DomainHero />
      <DomainDetails />
    </>
  );
}
