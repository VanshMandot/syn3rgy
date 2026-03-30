"use client";

import React, { useState, useEffect, useRef } from "react";
import "./timeline.css";

// ============================================================================
// SHARED INTERFACES & DATA
// ============================================================================

export interface DayEvent {
  time: string;
  title: string;
  description: string;
}

export interface DayData {
  dayNumber: number;
  cardValue: string;
  cardImages?: {
    "♠": string;
    "♥": string;
    "♦": string;
    "♣": string;
  };
  title: string;
  date: string;
  tagline: string;
  difficulty: string;
  events: DayEvent[];
}

export const hackathonDays: DayData[] = [
  {
    dayNumber: 1,
    cardValue: "J",
    cardImages: {
      "♠": "/istockphoto-124676510-612x612.jpg",
      "♥": "/istockphoto-166089342-612x612.jpg",
      "♦": "/istockphoto-165592777-612x612.jpg",
      "♣": "/istockphoto-163680097-612x612.jpg",
    },
    title: "The First Game",
    date: "Day 1 — Registration & Kickoff",
    tagline: "Welcome to the Borderland. The game begins now.",
    difficulty: "Easy",
    events: [
      {
        time: "09:00",
        title: "Gates Open — Registration",
        description: "Check in and collect your player badge.",
      },
      {
        time: "10:30",
        title: "Opening Ceremony",
        description: "Theme announcement and rules revealed.",
      },
      {
        time: "12:00",
        title: "Hacking Begins",
        description: "Teams enter the arena. The clock starts.",
      },
      {
        time: "18:00",
        title: "Mentorship Round 1",
        description: "Industry mentors offer guidance.",
      },
      {
        time: "21:00",
        title: "Night Challenge",
        description: "Surprise mini-game for bonus points.",
      },
    ],
  },
  {
    dayNumber: 2,
    cardValue: "Q",
    cardImages: {
      "♠": "/istockphoto-458111957-612x612.jpg",
      "♥": "/istockphoto-166089285-612x612.jpg",
      "♦": "/istockphoto-149137023-612x612.jpg",
      "♣": "/istockphoto-155652049-612x612.jpg",
    },
    title: "The Queen's Gambit",
    date: "Day 2 — Build & Battle",
    tagline: "Only the strongest ideas survive.",
    difficulty: "Medium",
    events: [
      {
        time: "08:00",
        title: "Sunrise Check-in",
        description: "Mandatory progress review.",
      },
      {
        time: "10:00",
        title: "Workshop: Weapons Upgrade",
        description: "AI/ML, Web3, and cloud workshops.",
      },
      {
        time: "13:00",
        title: "Mid-Game Review",
        description: "Judges observe. Pivot or persevere.",
      },
      {
        time: "16:00",
        title: "Sponsor Challenges",
        description: "Side quests with exclusive prizes.",
      },
      {
        time: "22:00",
        title: "Code Freeze Warning",
        description: "12 hours until final submission.",
      },
    ],
  },
  {
    dayNumber: 3,
    cardValue: "K",
    cardImages: {
      "♠": "/istockphoto-458126511-612x612.jpg",
      "♥": "/istockphoto-166089307-612x612.jpg",
      "♦": "/istockphoto-149126841-612x612.jpg",
      "♣": "/istockphoto-149127808-612x612.jpg",
    },
    title: "The King's Verdict",
    date: "Day 3 — Demo & Judgement",
    tagline: "The King decides who returns to the real world.",
    difficulty: "Hard",
    events: [
      {
        time: "08:00",
        title: "Final Submission Hand-in",
        description: "Hacking concludes. Hands off keyboards.",
      },
      {
        time: "09:30",
        title: "Demo Exhibitions",
        description: "Showcase your surviving projects to the executives.",
      },
      {
        time: "13:00",
        title: "The Final Judgement",
        description: "Top 10 teams pitch on the main stage.",
      },
      {
        time: "15:30",
        title: "Closing Ceremony & Awards",
        description: "Prize distribution and closing remarks.",
      },
      {
        time: "17:00",
        title: "Game Cleared",
        description: "Hackathon officially ends. Survivors depart.",
      },
    ],
  },
];

// ============================================================================
// CARD DECK COMPONENT
// ============================================================================

interface CardDeckProps {
  images: string[];
  onFlyingStart: () => void;
  onComplete: () => void;
}

type Phase = "stacked" | "split" | "merge" | "scattering" | "holding" | "flying" | "done";

interface CardState {
  id: string;
  image?: string;
  isTitle?: boolean;
  x: number;
  y: number;
  rot: number;
  z: number;
  scale: number;
  opacity: number;
}

export function CardDeck({ images, onFlyingStart, onComplete }: CardDeckProps) {
  const [phase, setPhase] = useState<Phase>("stacked");
  const [cards, setCards] = useState<CardState[]>([]);

  useEffect(() => {
    // Phase 1: Stacked
    const initialCards: CardState[] = [
      ...images.map((img, i) => ({
        id: `img-${i}`,
        image: img,
        isTitle: false,
        x: 0,
        y: 0,
        rot: (Math.random() - 0.5) * 10,
        z: i,
        scale: 1,
        opacity: 1,
      })),
      {
        id: "title",
        isTitle: true,
        x: 0,
        y: 0,
        rot: 0,
        z: 999, // 12th card (Timeline)
        scale: 1,
        opacity: 1,
      },
    ];
    setCards(initialCards);

    // Sequence the animation
    const t1 = setTimeout(() => {
      // Phase 2: Split (Shuffling Part 1)
      setPhase("split");
      setCards((prev) =>
        prev.map((c) => {
          if (c.isTitle) return { ...c, rot: 0 };
          let xTarget = 120 + Math.random() * 80;
          if (Math.random() < 0.5) xTarget *= -1;
          return {
            ...c,
            x: xTarget,
            y: (Math.random() - 0.5) * 40,
            rot: (Math.random() - 0.5) * 20,
          };
        })
      );

      const t2 = setTimeout(() => {
        // Phase 3: Merge (Shuffling Part 2)
        setPhase("merge");
        setCards((prev) =>
          prev.map((c) => ({
            ...c,
            x: 0,
            y: 0,
            rot: c.isTitle ? 0 : (Math.random() - 0.5) * 10,
          }))
        );

        const t3 = setTimeout(() => {
          // Phase 4: Scattering Phase (1000ms duration)
          setPhase("scattering");
          setCards((prev) =>
            prev.map((c, i) => {
              if (c.isTitle) {
                return { ...c, x: 0, y: 0, rot: 0, scale: 1.4, z: 999 };
              }
              const angle = ((Math.PI * 2) / images.length) * i;
              const radius = 220 + Math.random() * 120;
              return {
                ...c,
                x: Math.cos(angle) * radius,
                y: Math.sin(angle) * radius,
                rot: (Math.random() - 0.5) * 60,
                scale: 0.8,
                opacity: 1, // Fully visible playing cards
              };
            })
          );

          const t4 = setTimeout(() => {
            // Phase 5: Holding Phase (3000ms)
            setPhase("holding");

            const t5 = setTimeout(() => {
              // Phase 6: Flying Phase (1200ms)
              setPhase("flying");
              onFlyingStart(); // Trigger header fade in

              setCards((prev) =>
                prev.map((c, i) => {
                  if (c.isTitle) {
                    // Timeline flies towards header and fades/shrinks
                    return { ...c, y: -400, scale: 0.5, opacity: 0 };
                  }
                  // Day cards deal to their timeline layout
                  let yPos = window.innerHeight * 0.6;
                  if (i < 4) yPos = window.innerHeight * 0.6;
                  else if (i < 8) yPos = window.innerHeight * 1.2;
                  else yPos = window.innerHeight * 1.8;

                  return {
                    ...c,
                    x: (Math.random() - 0.5) * 200,
                    y: yPos,
                    rot: (Math.random() - 0.5) * 45,
                    opacity: 0,
                    scale: 0.5,
                  };
                })
              );

              const t6 = setTimeout(() => {
                setPhase("done");
                onComplete();
              }, 1200); // Wait for flying animation
            }, 3000); // Holding duration
          }, 1000); // Scattering duration
        }, 600); // Shuffling merge duration
      }, 500); // Shuffling split duration
    }, 500); // Initial delay

    return () => clearInterval(t1);
  }, [images, onFlyingStart, onComplete]);

  if (phase === "done") return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center transition-colors duration-[1200ms]"
      style={{
        backgroundColor: phase === "flying" ? "transparent" : "#050508",
        pointerEvents: "none",
      }}
    >
      {/* Background vignette fades out when flying so timeline shows */}
      <div
        className="absolute inset-0 bg-vignette transition-opacity duration-[1200ms]"
        style={{ opacity: phase === "flying" ? 0 : 1 }}
      />

      <div className="relative w-[160px] h-[224px] sm:w-[200px] sm:h-[280px] perspective-[1000px]">
        {cards.map((card) => {
          const isFacedown = ["stacked", "split", "merge"].includes(phase);

          return (
            <div
              key={card.id}
              className="absolute inset-0 transition-all rounded-2xl"
              style={{
                zIndex: card.z,
                transform: `translate(${card.x}px, ${card.y}px) rotate(${card.rot}deg) scale(${card.scale}) rotateY(${isFacedown ? 180 : 0}deg)`,
                opacity: card.opacity,
                transitionDuration:
                  phase === "flying"
                    ? "1.2s"
                    : phase === "scattering"
                      ? "1s"
                      : phase === "split"
                        ? "0.5s"
                        : "0.6s",
                transitionTimingFunction: "cubic-bezier(0.25, 0.46, 0.45, 0.94)",
                boxShadow: isFacedown
                  ? "0 10px 30px rgba(0,0,0,0.8)"
                  : (card as any).boxShadow || "0 10px 40px rgba(0,0,0,0.6)",
                transformStyle: "preserve-3d",
              }}
            >
              {/* Front Face (Actual Card - 0deg) */}
              <div
                className={`absolute inset-0 w-full h-full rounded-2xl overflow-hidden ${card.isTitle ? "bg-transparent" : "bg-[#0a0a0a] border border-[var(--crimson)]"
                  }`}
                style={{
                  backfaceVisibility: "hidden",
                  WebkitBackfaceVisibility: "hidden",
                  transform: "rotateY(0deg)",
                }}
              >
                {card.isTitle ? (
                  <img
                    src="/timelinecard.png"
                    alt="Timeline Title Card"
                    className="w-full h-full object-cover"
                    draggable={false}
                  />
                ) : (
                  <img
                    src={card.image!}
                    alt="Card"
                    className="w-full h-full object-cover"
                    draggable={false}
                  />
                )}
              </div>

              {/* Back Face (Facedown - 180deg) */}
              <div
                className="absolute inset-0 w-full h-full rounded-2xl overflow-hidden bg-[#0a0a0a] border border-[var(--crimson)]"
                style={{
                  backfaceVisibility: "hidden",
                  WebkitBackfaceVisibility: "hidden",
                  transform: "rotateY(180deg)",
                }}
              >
                <img
                  src="/facedown.png"
                  alt="Facedown Card"
                  className="w-full h-full object-cover"
                  draggable={false}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ============================================================================
// TIMELINE CARD COMPONENT
// ============================================================================

interface TimelineCardProps {
  day: DayData;
}

export function TimelineCard({ day }: TimelineCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  const difficultyColors: Record<string, string> = {
    Easy: "var(--teal)",
    Medium: "var(--gold)",
    Hard: "var(--crimson)",
  };

  const packConfigs = [
    { suit: "♠", rotate: -15, x: -25, y: 20, z: 1 },
    { suit: "♥", rotate: -5, x: -8, y: 6, z: 2 },
    { suit: "♦", rotate: 5, x: 8, y: 6, z: 3 },
    { suit: "♣", rotate: 15, x: 25, y: 20, z: 4 }, // Top card
  ];

  const getCardTransform = (config: typeof packConfigs[0]) => {
    if (isHovered) {
      return `translate(0px, 0px) rotate(0deg) scale(1.05)`;
    }
    return `translate(${config.x}px, ${config.y}px) rotate(${config.rotate}deg) scale(1)`;
  };

  const getTransitionStyle = () => {
    return "transform 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94), box-shadow 0.6s ease";
  };

  return (
    <section ref={ref} className="snap-section w-full px-4 sm:px-8 py-20 relative z-20">
      <div className="flex flex-col lg:flex-row items-center justify-center w-full max-w-6xl mx-auto gap-12 lg:gap-24">
        {/* Card Pack Visual */}
        <div
          className="relative w-[180px] h-[252px] sm:w-[220px] sm:h-[308px] flex-shrink-0 perspective-[1000px] cursor-pointer"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {packConfigs.map((config) => (
            <div
              key={config.suit}
              className="absolute inset-0 rounded-[14px] shadow-2xl transition-all"
              style={{
                zIndex: config.z,
                transition: getTransitionStyle(),
                boxShadow: "0 10px 40px rgba(0,0,0,0.8)",
                transform: `${getCardTransform(config)}`,
                transformStyle: "preserve-3d",
              }}
            >
              {/* Front Face (Actual Image - 0deg) */}
              <div
                className="absolute inset-0 w-full h-full rounded-[14px] overflow-hidden bg-[#0a0a0a] border-2 border-[var(--crimson)]/50"
                style={{
                  backfaceVisibility: "hidden",
                  WebkitBackfaceVisibility: "hidden",
                  transform: "rotateY(0deg)",
                }}
              >
                <img
                  src={(day.cardImages as any)[config.suit]}
                  alt={`${day.cardValue} of ${config.suit}`}
                  className="w-full h-full object-cover"
                  draggable={false}
                />
                {config.suit === "♣" && (
                  <div
                    className={`absolute inset-0 pointer-events-none transition-opacity duration-500 ${isHovered ? "opacity-100 shadow-[0_0_40px_rgba(217,4,41,0.6)]" : "opacity-0"
                      }`}
                  />
                )}
              </div>

              {/* Back Face (Facedown Image - 180deg) */}
              <div
                className="absolute inset-0 w-full h-full rounded-[14px] overflow-hidden bg-[#0a0a0a] border-2 border-[var(--crimson)]/50"
                style={{
                  backfaceVisibility: "hidden",
                  WebkitBackfaceVisibility: "hidden",
                  transform: "rotateY(180deg)",
                }}
              >
                <img
                  src="/facedown.png"
                  alt="Facedown Card"
                  className="w-full h-full object-cover"
                  draggable={false}
                />
              </div>
            </div>
          ))}
        </div>

        {/* Text Content */}
        <div
          className="cyber-glass w-full flex flex-col justify-center rounded-2xl relative overflow-hidden transition-all duration-1000 transform opacity-100 translate-y-0"
          style={{
            maxWidth: "896px",
            minHeight: "400px",
            paddingTop: "3rem",
            paddingBottom: "3rem",
            paddingLeft: "5%",
            paddingRight: "5%",
          }}
        >
          {/* Subtle decoration lines */}
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[var(--crimson)] to-transparent opacity-60" />
          <div
            className="absolute top-0 w-1 h-12 bg-[var(--crimson)]/90 shadow-[0_0_15px_rgba(217,4,41,0.9)]"
            style={{ left: "1rem" }}
          />
          <div
            className="absolute bottom-0 w-1 h-12 bg-[var(--gold)]/90 shadow-[0_0_15px_rgba(255,214,10,0.9)]"
            style={{ right: "1rem" }}
          />

          <div className="relative z-10 w-full" style={{ paddingLeft: "3rem", paddingRight: "2rem" }}>
            {/* Header */}
            <div className="mb-6 border-b border-[var(--crimson)]/30 pb-4 relative">
              <div className="flex items-start justify-between gap-4 mb-3">
                <h2
                  className="text-3xl sm:text-4xl md:text-5xl text-white font-black tracking-widest uppercase borderland-glow drop-shadow-[0_0_15px_rgba(217,4,41,0.6)]"
                  style={{ fontFamily: "var(--font-cloister)" }}
                >
                  {day.title}
                </h2>
                <span
                  className="px-3 py-1 font-orbitron text-xs sm:text-sm tracking-widest uppercase font-extrabold border-2 rounded-sm bg-black/60 shadow-[0_0_10px_currentColor] flex-shrink-0 mt-1"
                  style={{
                    color: difficultyColors[day.difficulty] || "var(--crimson)",
                    borderColor: difficultyColors[day.difficulty] || "var(--crimson)",
                  }}
                >
                  {day.difficulty}
                </span>
              </div>

              <div className="flex flex-wrap items-center mb-3" style={{ gap: "1rem" }}>
                <span
                  className="font-orbitron font-bold text-[var(--gold)] text-xs sm:text-sm tracking-widest uppercase mt-0.5 border-b border-[var(--gold)]/30 pb-1"
                  style={{ paddingRight: "1rem" }}
                >
                  {day.date}
                </span>
              </div>
              <p
                className="text-gray-300 italic text-sm sm:text-base tracking-wide border-l-2 border-[var(--gold)]/80 mt-2 font-medium bg-[#0a0a0a]/40 rounded-r-md"
                style={{ paddingLeft: "1rem", paddingTop: "0.375rem", paddingBottom: "0.375rem" }}
              >
                &quot;{day.tagline}&quot;
              </p>
            </div>

            {/* Events Timeline */}
            <div className="mt-4" style={{ display: "flex", flexDirection: "column", gap: "0" }}>
              {day.events.map((event, idx) => (
                <div key={idx} className="flex group" style={{ gap: "1.5rem" }}>
                  {/* Time Stamp */}
                  <div className="text-right pt-2 flex-shrink-0" style={{ width: "4.5rem" }}>
                    <span className="font-orbitron font-black text-white/50 tracking-widest text-xs sm:text-sm group-hover:text-[var(--teal)] transition-colors duration-300 drop-shadow-[0_0_5px_rgba(0,0,0,1)]">
                      {event.time}
                    </span>
                  </div>

                  {/* Graphic Node & Content */}
                  <div className="relative flex-1 flex" style={{ paddingBottom: "2rem" }}>
                    {/* Node Column (Spine) */}
                    <div className="relative flex-shrink-0" style={{ width: "2rem" }}>
                      {/* Vertical Line Connector */}
                      {idx !== day.events.length - 1 && (
                        <div
                          className="absolute top-5 w-0.5 h-full bg-[var(--crimson)]/20 group-hover:bg-[var(--crimson)]/50 transition-colors"
                          style={{ left: "7px" }}
                        />
                      )}
                      {/* Glowing Node Dot */}
                      <div
                        className="absolute top-2 w-4 h-4 rounded-full border-2 border-[var(--crimson)] bg-[#050508] z-10 transition-all duration-300 shadow-[0_0_10px_rgba(217,4,41,0.5)] group-hover:bg-[var(--crimson)] group-hover:scale-110"
                        style={{ left: "0px" }}
                      />
                    </div>

                    {/* Expanded Event Text Column */}
                    <div
                      className="flex-1 border-b border-transparent group-hover:border-white/5"
                      style={{ paddingTop: "0.125rem", paddingBottom: "0.75rem", paddingLeft: "0.5rem" }}
                    >
                      <h4
                        className="text-lg sm:text-xl font-bold text-white tracking-wider leading-tight mb-1 group-hover:text-[var(--gold)] transition-colors duration-300 uppercase"
                        style={{ fontFamily: "var(--font-cloister)", paddingLeft: "4px" }}
                      >
                        {event.title}
                      </h4>
                      <p
                        className="text-[#a0a0a0] font-orbitron tracking-wide text-[10px] uppercase leading-relaxed font-bold"
                        style={{ paddingLeft: "4px" }}
                      >
                        {event.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ============================================================================
// MAIN EXPORT COMPONENT
// ============================================================================

export default function BorderlandTimeline() {
  const [introDone, setIntroDone] = useState(false);
  const [headerVisible, setHeaderVisible] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [hasEnteredViewport, setHasEnteredViewport] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    setIsMounted(true);

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHasEnteredViewport(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 } // Trigger when 20% of section is visible
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Extract all 12 card images to pass into the intro deck shuffle
  const allCardImages = hackathonDays.flatMap((day) =>
    day.cardImages ? Object.values(day.cardImages) : []
  );

  return (
    <>
      {hasEnteredViewport && !introDone && (
        <CardDeck
          images={allCardImages}
          onFlyingStart={() => setHeaderVisible(true)}
          onComplete={() => setIntroDone(true)}
        />
      )}

      <section
        id="timeline-borderland"
        ref={sectionRef}
        className="snap-container bg-[#050508] relative overflow-hidden w-full"
      >
        {/* Cinematic Background Elements */}
        <div className="bg-blur-image pulse-opacity" />
        <div className="bg-vignette" />
        <div className="bg-scanlines" />

        {/* Particles */}
        <div className="fixed inset-0 overflow-hidden pointer-events-none z-10 w-full h-full">
          {isMounted &&
            ["♠", "♥", "♦", "♣", "♠", "♥", "♦", "♣", "♠", "♥"].map((suit, i) => (
              <div
                key={i}
                className="particle font-serif"
                style={{
                  left: `${Math.random() * 100}vw`,
                  animationDelay: `${Math.random() * 15}s`,
                  animationDuration: `${15 + Math.random() * 10}s`,
                  fontSize: `${20 + Math.random() * 30}px`,
                  color:
                    suit === "♥" || suit === "♦"
                      ? "rgba(217,4,41,0.6)"
                      : "rgba(255,255,255,0.2)",
                }}
              >
                {suit}
              </div>
            ))}
        </div>

        {/* Title Header */}
        <header className="w-full relative z-20 flex flex-col items-center justify-center text-center px-4 pt-16 sm:pt-24 pb-8 sm:pb-12">
          <div className="flex items-center gap-3 sm:gap-4 mb-2 sm:mb-4">
            <span className="text-3xl sm:text-5xl text-[var(--crimson)] borderland-glow">♣</span>
            <h1
              className="text-4xl sm:text-6xl md:text-7xl font-extrabold text-white borderland-glow tracking-widest text-shadow uppercase"
              style={{ fontFamily: "var(--font-cloister)" }}
            >
              Timeline
            </h1>
            <span className="text-3xl sm:text-5xl text-[var(--crimson)] borderland-glow">♣</span>
          </div>
          <p className="font-orbitron text-sm sm:text-xl text-[var(--gold)] borderland-gold-glow tracking-[0.3em] font-medium uppercase mt-1 sm:mt-2">
            Welcome to the Borderland
          </p>
        </header>

        {/* Timeline Days */}
        {hackathonDays.map((day) => (
          <TimelineCard key={day.dayNumber} day={day} />
        ))}
      </section>
    </>
  );
}

// ============================================================================
// ORPHANED/UNUSED COMPONENTS (Included for completeness)
// ============================================================================

interface CardProps {
  day: DayData;
  index: number;
}

export function Card({ day, index }: CardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.4 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const difficultyColors: Record<string, string> = {
    Easy: "var(--teal)",
    Medium: "var(--gold)",
    Hard: "var(--crimson)",
  };

  const backgroundSuits = [
    { symbol: "♠", rotate: -12, x: -45, y: 22, color: "var(--foreground)" },
    { symbol: "♥", rotate: -4, x: -15, y: 7, color: "var(--crimson)" },
    { symbol: "♦", rotate: 4, x: 15, y: 7, color: "var(--crimson)" },
  ];

  const renderCardFace = (suit: string, color: string) => {
    if (day.cardImages && (day.cardImages as any)[suit]) {
      return (
        <img
          src={(day.cardImages as any)[suit]}
          alt={`${day.cardValue} of ${suit}`}
          className="w-full h-full object-cover rounded-xl"
          draggable={false}
        />
      );
    }
    return (
      <div
        className="absolute inset-0 rounded-2xl flex flex-col justify-between p-6"
        style={{
          background: "linear-gradient(145deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)",
        }}
      >
        <div className="flex flex-col items-start leading-none">
          <span className="text-4xl font-bold" style={{ color }}>{day.cardValue}</span>
          <span className="text-3xl" style={{ color }}>{suit}</span>
        </div>
        <div className="flex flex-col items-center justify-center flex-1">
          <span className="text-7xl mb-1" style={{ color }}>{suit}</span>
        </div>
        <div className="flex flex-col items-end leading-none rotate-180">
          <span className="text-4xl font-bold" style={{ color }}>{day.cardValue}</span>
          <span className="text-3xl" style={{ color }}>{suit}</span>
        </div>
        <div
          className="absolute inset-2 rounded-xl border pointer-events-none"
          style={{ borderColor: "rgba(255, 255, 255, 0.1)" }}
        />
      </div>
    );
  };

  return (
    <div
      ref={ref}
      className={`scroll-reveal-card ${isVisible ? "revealed" : ""}`}
      style={{ animationDelay: `${index * 0.15}s` }}
    >
      <div className="card-visual flex-shrink-0 relative" style={{ width: "280px", height: "340px" }}>
        <div className="absolute inset-0 origin-center" style={{ transform: "scale(0.6)", transformOrigin: "center center" }}>
          <div className="relative" style={{ width: "460px", height: "500px", left: "50%", top: "50%", transform: "translate(-50%, -50%)" }}>
            {backgroundSuits.map((config, i) => (
              <div
                key={i}
                className="absolute rounded-2xl border-2 border-[var(--crimson)] bg-[#1a1a2e] overflow-hidden"
                style={{
                  width: "300px",
                  height: "420px",
                  left: "50%",
                  top: "50%",
                  transform: `translate(-50%, -50%) rotate(${config.rotate}deg) translate(${config.x}px, ${config.y}px)`,
                  zIndex: i,
                  boxShadow: "0 6px 20px rgba(0, 0, 0, 0.5)",
                }}
              >
                {renderCardFace(config.symbol, config.color)}
              </div>
            ))}
            <div
              className="absolute card-glow rounded-2xl border-2 border-[var(--crimson)] bg-[#1a1a2e] overflow-hidden"
              style={{
                width: "300px",
                height: "420px",
                left: "50%",
                top: "50%",
                transform: `translate(-50%, -50%) rotate(12deg) translate(38px, 22px)`,
                zIndex: 10,
              }}
            >
              {renderCardFace("♣", "var(--crimson)")}
            </div>
          </div>
        </div>
      </div>
      <div className={`card-content-panel ${isVisible ? "content-visible" : ""}`}>
        <div className="glass-panel p-6">
          <div className="flex items-center gap-3 mb-2">
            <h3 className="text-xl font-bold neon-text leading-tight">{day.title}</h3>
            <span
              className="px-2 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider flex-shrink-0"
              style={{
                background: `${difficultyColors[day.difficulty] || "var(--crimson)"}22`,
                color: difficultyColors[day.difficulty] || "var(--crimson)",
                border: `1px solid ${difficultyColors[day.difficulty] || "var(--crimson)"}44`,
              }}
            >
              {day.difficulty}
            </span>
          </div>
          <p className="text-sm font-medium mb-1" style={{ color: "var(--gold)" }}>{day.date}</p>
          <p className="text-sm text-white/50 italic mb-3">&quot;{day.tagline}&quot;</p>
          <div
            className="h-px w-full mb-4"
            style={{ background: "linear-gradient(to right, transparent, var(--crimson), transparent)" }}
          />
          <div className="space-y-3">
            {day.events.map((event, i) => (
              <div key={i} className="flex items-start gap-2">
                <span className="text-sm font-mono font-semibold flex-shrink-0 mt-0.5" style={{ color: "var(--teal)" }}>
                  {event.time}
                </span>
                <div className="w-2 h-2 rounded-full flex-shrink-0 mt-1.5" style={{ background: "var(--crimson)" }} />
                <span className="text-sm text-white/80 leading-tight">{event.title}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

interface DayDetailProps {
  day: DayData | null;
  onClose: () => void;
}

export function DayDetail({ day, onClose }: DayDetailProps) {
  if (!day) return null;

  const difficultyColors: Record<string, string> = {
    Easy: "var(--teal)",
    Medium: "var(--gold)",
    Hard: "var(--crimson)",
  };

  return (
    <div className="slide-in glass-panel p-6 sm:p-8 w-full max-w-lg relative">
      <button
        onClick={onClose}
        className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full bg-white/5 hover:bg-white/10 transition-colors text-white/60 hover:text-white"
        aria-label="Close detail panel"
      >
        ✕
      </button>
      <div className="mb-6">
        <div className="flex items-center gap-3 mb-2">
          <span className="text-3xl" style={{ color: "var(--crimson)" }}>♣</span>
          <span
            className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider"
            style={{
              background: `${difficultyColors[day.difficulty] || "var(--crimson)"}22`,
              color: difficultyColors[day.difficulty] || "var(--crimson)",
              border: `1px solid ${difficultyColors[day.difficulty] || "var(--crimson)"}44`,
            }}
          >
            {day.difficulty}
          </span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold neon-text mb-1">{day.title}</h2>
        <p className="text-sm font-medium" style={{ color: "var(--gold)" }}>{day.date}</p>
        <p className="text-sm text-white/50 mt-1 italic">&quot;{day.tagline}&quot;</p>
      </div>
      <div
        className="h-px w-full mb-6"
        style={{ background: "linear-gradient(to right, transparent, var(--crimson), transparent)" }}
      />
      <div className="space-y-4">
        {day.events.map((event, i) => (
          <div key={i} className="flex gap-4">
            <div className="flex-shrink-0 w-20 text-right">
              <span className="text-sm font-mono font-semibold" style={{ color: "var(--teal)" }}>
                {event.time}
              </span>
            </div>
            <div className="flex flex-col items-center">
              <div
                className="w-3 h-3 rounded-full flex-shrink-0 mt-1"
                style={{
                  background: "var(--crimson)",
                  boxShadow: "0 0 8px rgba(230,57,70,0.5)",
                }}
              />
              {i < day.events.length - 1 && (
                <div className="w-px flex-1 my-1" style={{ background: "rgba(230,57,70,0.3)" }} />
              )}
            </div>
            <div className="flex-1 pb-2">
              <h3 className="text-sm font-semibold text-white">{event.title}</h3>
              <p className="text-xs text-white/50 mt-0.5 leading-relaxed">{event.description}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-6 flex items-center justify-center gap-2">
        <span className="text-lg" style={{ color: "var(--crimson)" }}>♣</span>
        <span className="text-xs font-mono uppercase tracking-widest" style={{ color: "var(--gold)" }}>
          {day.cardValue} of Clubs — Day {day.dayNumber}
        </span>
        <span className="text-lg" style={{ color: "var(--crimson)" }}>♣</span>
      </div>
    </div>
  );
}