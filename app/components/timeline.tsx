"use client";

import React, {
  useState,
  useEffect,
  useRef,
  useCallback,
  CSSProperties,
} from "react";
import { useInView } from "framer-motion";
import "./timeline.css";

// ─────────────────────────────────────────────────────────────────
//  DATA TYPES
// ─────────────────────────────────────────────────────────────────

export interface DayEvent {
  time: string;
  title: string;
  description: string;
}

export interface StatEntry {
  label: string;
  value: number; // 0–100
}

export type Difficulty = "easy" | "medium" | "hard"
export type GlowColor = "teal" | "gold" | "crim";

export interface RoundData {
  id: string;               // e.g. "r1"
  index: number;            // 0-based
  roundNum: string;         // "01" | "02" | "03"
  dayCode: string;          // "DAY_1 // REGISTRATION & KICKOFF"
  difficulty: Difficulty;
  title: string;
  tagline: string;
  glowColor: GlowColor;
  divbarStyle: CSSProperties;
  cardValue: string;        // "J" | "Q" | "K"
  cardSuit: string;         // "♣" | "♥" | "♠"
  cardSuitColor: string;    // CSS colour
  cardValColor: string;     // CSS colour
  cardFaceStyle: CSSProperties;
  cardShadowColor: string;
  cardStripLabel: string;
  cardBackColors: [string, string, string];
  cardAnimDelay?: string;   // e.g. "-3.5s"
  reverseLayout: boolean;   // card goes left side
  dotStyle?: CSSProperties;
  cardImage: string;        // path to card image in timeline_cards
  cardBackImages: [string, string, string];
  events: DayEvent[];
  stats: StatEntry[];
}

// ─────────────────────────────────────────────────────────────────
//  ROUND DATA
// ─────────────────────────────────────────────────────────────────

export const hackathonRounds: RoundData[] = [
  {
    id: "r0",
    index: 0,
    roundNum: "00",
    dayCode: "4th April - 12th April // REGISTRATION & KICKOFF",
    difficulty: "easy",
    title: "The First Game",
    tagline: '"Welcome to the Borderland. The game begins now."',
    glowColor: "teal",
    divbarStyle: {
      background: "linear-gradient(to right, var(--aib-teal), rgba(0,245,212,.18), transparent)",
      boxShadow: "0 0 10px rgba(0,245,212,.3)",
    },
    cardValue: "J",
    cardSuit: "♣",
    cardSuitColor: "var(--aib-teal)",
    cardValColor: "var(--aib-teal)",
    cardFaceStyle: {
      borderColor: "rgba(0,245,212,.45)",
      boxShadow: "0 35px 90px rgba(0,0,0,.95),0 0 60px rgba(0,245,212,.15),inset 0 0 50px rgba(0,0,0,.7)",
    },
    cardShadowColor: "rgba(0,245,212,.5)",
    cardStripLabel: "Jack of Clubs — Day One",
    cardBackColors: ["rgba(0,245,212,.18)", "rgba(0,245,212,.3)", "rgba(0,245,212,.42)"],
    reverseLayout: false,
    cardImage: "/timeline_cards/jackclubs.png",
    cardBackImages: [
      "/timeline_cards/jackspades.png",
      "/timeline_cards/jackhearts.png",
      "/timeline_cards/jackdiamonds.png"
    ],
    events: [
      { time: "", title: "Registrations Begin", description: "Check in and collect your player badge." },
      { time: "", title: "PPT Submission by 12th April", description: "Present your strategy. Submit your pitch deck before your visas expire — only the prepared survive." },
      { time: "", title: "Survival of the Fittest", description: "The weak are eliminated. Only 40 teams advance to face the real game." }
    ],
    stats: [
      { label: "INTENSITY", value: 38 },
      { label: "RISK", value: 28 },
      { label: "REWARD", value: 45 },
      { label: "TEAMWORK", value: 60 },
    ],
  },
  {
    id: "r1",
    index: 1,
    roundNum: "01",
    dayCode: "18th April - DAY_1 // BUILD & BATTLE",
    difficulty: "medium",
    title: "The Queen's Gambit",
    tagline: '"Only the strongest ideas survive."',
    glowColor: "gold",
    divbarStyle: {
      background: "linear-gradient(to right, var(--aib-gold), rgba(255,214,10,.18), transparent)",
      boxShadow: "0 0 10px rgba(255,214,10,.3)",
    },
    cardValue: "Q",
    cardSuit: "♣",
    cardSuitColor: "var(--aib-teal)",
    cardValColor: "var(--aib-gold)",
    cardFaceStyle: {
      borderColor: "rgba(255,214,10,.45)",
      boxShadow: "0 35px 90px rgba(0,0,0,.95),0 0 60px rgba(255,214,10,.12),inset 0 0 50px rgba(0,0,0,.7)",
    },
    cardShadowColor: "rgba(255,214,10,.4)",
    cardStripLabel: "Queen of Clubs — Day Two",
    cardBackColors: ["rgba(255,214,10,.18)", "rgba(255,214,10,.3)", "rgba(255,214,10,.42)"],
    cardAnimDelay: "-3.5s",
    reverseLayout: true,
    cardImage: "/timeline_cards/queenclubs.png",
    cardBackImages: [
      "/timeline_cards/queenspades.png",
      "/timeline_cards/queenhearts.png",
      "/timeline_cards/queendiamonds.png"
    ],
    dotStyle: { borderColor: "var(--aib-gold)", boxShadow: "0 0 8px rgba(255,214,10,.4)" },
    events: [
      { time: "1:00 P.M", title: "Reporting Time", description: "All participants must report to the venue. Verification and onboarding will be conducted." },
      { time: "1:30 P.M", title: "Problem Statement Allotment (FCFS)", description: "Problem statements alloted on  a First-Come First-Serve basis via form." },
      { time: "2:00 P.M", title: "Coding Round Begins", description: "Start of the 24-hour hackathon. Teams begin development." },
      { time: "7:00 P.M", title: "Mentoring Round 1", description: "Teams present ideas; mentors provide guidance." },
      { time: "8:00 P.M", title: "Dinner Break", description: "Dinner arranged in slots for participants." },
    ],
    stats: [
      { label: "INTENSITY", value: 65 },
      { label: "RISK", value: 60 },
      { label: "REWARD", value: 74 },
      { label: "TEAMWORK", value: 80 },
    ],
  },
  {
    id: "r2",
    index: 2,
    roundNum: "01",
    dayCode: "DAY_2 // DEMO & JUDGEMENT",
    difficulty: "hard",
    title: "The King's Verdict",
    tagline: '"The King decides who returns to the real world."',
    glowColor: "crim",
    divbarStyle: {
      background: "linear-gradient(to right, var(--aib-red), rgba(217,4,41,.18), transparent)",
      boxShadow: "0 0 12px rgba(217,4,41,.35)",
    },
    cardValue: "K",
    cardSuit: "♣",
    cardSuitColor: "var(--aib-teal)",
    cardValColor: "var(--aib-red2)",
    cardFaceStyle: {
      borderColor: "rgba(217,4,41,.7)",
      boxShadow: "0 35px 90px rgba(0,0,0,.95),0 0 80px rgba(217,4,41,.28),inset 0 0 50px rgba(0,0,0,.7)",
    },
    cardShadowColor: "rgba(217,4,41,.7)",
    cardStripLabel: "King of Clubs — Day Three",
    cardBackColors: ["rgba(217,4,41,.28)", "rgba(217,4,41,.45)", "rgba(217,4,41,.62)"],
    cardAnimDelay: "-1.8s",
    reverseLayout: false,
    cardImage: "/timeline_cards/kingclubs.png",
    cardBackImages: [
      "/timeline_cards/kingspades.png",
      "/timeline_cards/kinghearts.png",
      "/timeline_cards/kingdiamonds.png"
    ],
    events: [
      { time: "12:00 A.M", title: "Mentoring Round 2", description: "Progress review and debugging support. Overnight Development Phase continues." },
      { time: "8:00 A.M", title: "Breakfast Break", description: "Breakfast provided; teams continue work." },
      { time: "2:00 PM", title: "Coding Ends", description: "Strict code freeze after 24 hours." },
      { time: "2:00 PM", title: "Lunch & Judging", description: "Lunch with simultaneous team-wise judging." }
    ],
    stats: [
      { label: "INTENSITY", value: 100 },
      { label: "RISK", value: 100 },
      { label: "REWARD", value: 100 },
      { label: "TEAMWORK", value: 100 },
    ],
  },
];

const STAT_COLORS: Record<Difficulty, { bg: string; shadow: string }> = {
  easy: { bg: "var(--aib-teal)", shadow: "0 0 8px var(--aib-teal)" },
  medium: { bg: "var(--aib-gold)", shadow: "0 0 8px rgba(255,214,10,.5)" },
  hard: { bg: "var(--aib-red2)", shadow: "0 0 10px rgba(255,10,55,.55)" },
};

const GLITCH_COLORS: Record<GlowColor, [string, string]> = {
  teal: ["rgba(217,4,41,.7)", "rgba(0,245,212,.6)"],
  gold: ["rgba(255,214,10,.7)", "rgba(0,245,212,.6)"],
  crim: ["rgba(255,10,55,.8)", "rgba(0,245,212,.6)"],
};

const DIVIDER_SUITS: Array<{ suit: string; style: CSSProperties }> = [
  {
    suit: "♦",
    style: {},
  },
  {
    suit: "♣",
    style: {
      background: "linear-gradient(to right,transparent,var(--aib-gold),rgba(255,214,10,.28),transparent)",
      boxShadow: "0 0 18px rgba(255,214,10,.28)",
    },
  },
];

const HUD_MESSAGES = [
  "SYSTEM_READY // INITIATING",
  "SCANNING TIMELINE DATA...",
  "ROUNDS DETECTED: 3",
  "LOADING PLAYER MANIFEST...",
  "BORDERLAND PROTOCOL: ACTIVE",
  "SURVIVAL_MODE: ENABLED",
];

const INTRO_CARDS = [
  { v: "J", s: "♠", c: "#ededed", img: "/timeline_cards/jackspades.png" },
  { v: "J", s: "♥", c: "#d90429", img: "/timeline_cards/jackhearts.png" },
  { v: "J", s: "♦", c: "#d90429", img: "/timeline_cards/jackdiamonds.png" },
  { v: "J", s: "♣", c: "#ededed", img: "/timeline_cards/jackclubs.png" },
  { v: "Q", s: "♠", c: "#ededed", img: "/timeline_cards/queenspades.png" },
  { v: "Q", s: "♥", c: "#d90429", img: "/timeline_cards/queenhearts.png" },
  { v: "Q", s: "♦", c: "#d90429", img: "/timeline_cards/queendiamonds.png" },
  { v: "Q", s: "♣", c: "#ededed", img: "/timeline_cards/queenclubs.png" },
  { v: "K", s: "♠", c: "#ededed", img: "/timeline_cards/kingspades.png" },
  { v: "K", s: "♥", c: "#d90429", img: "/timeline_cards/kinghearts.png" },
  { v: "K", s: "♦", c: "#d90429", img: "/timeline_cards/kingdiamonds.png" },
  { v: "K", s: "♣", c: "#ededed", img: "/timeline_cards/kingclubs.png" },
];



// ─────────────────────────────────────────────────────────────────
//  HOOK: CYCLING HUD MESSAGE
// ─────────────────────────────────────────────────────────────────

function useCyclingMessage(messages: string[], intervalMs: number) {
  const [idx, setIdx] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setIdx((i) => (i + 1) % messages.length), intervalMs);
    return () => clearInterval(id);
  }, [messages, intervalMs]);
  return messages[idx];
}

// ─────────────────────────────────────────────────────────────────
//  HOOK: INTERSECTION REVEAL
// ─────────────────────────────────────────────────────────────────

function useRevealOnIntersect(threshold = 0.18) {
  const ref = useRef<HTMLElement | null>(null);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setRevealed(true);
          obs.unobserve(el);
        }
      },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);

  return { ref, revealed };
}

// ─────────────────────────────────────────────────────────────────
//  SUB-COMPONENT: HUD
// ─────────────────────────────────────────────────────────────────

interface HUDProps {
  visible: boolean;
  sysMessage: string;
}

function HUD({ visible, sysMessage }: HUDProps) {
  return (
    <div className={`tl-hud${visible ? " on" : ""}`}>
      <div className="tl-hud-bar">
        <div className="tl-hud-l">
          <div className="tl-hud-sys">{sysMessage}</div>
          <div className="tl-hud-phase">PHASE 01: TIMELINE</div>
        </div>
        <div className="tl-hud-c">
          <div className="tl-hud-badge">
            &gt; SURVIVAL_PROTOCOL::ACTIVE::AWAITING_INPUT
          </div>
        </div>

      </div>
      <div className="tl-hud-line" />
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────
//  SUB-COMPONENT: PROGRESS RAIL
// ─────────────────────────────────────────────────────────────────

interface RailProps {
  visible: boolean;
  activeIndex: number;
  onNav: (n: number) => void;
}

function ProgressRail({ visible, activeIndex, onNav }: RailProps) {
  return (
    <div className={`tl-rail${visible ? " on" : ""}`}>
      {[0, 1, 2].map((i) => (
        <React.Fragment key={i}>
          <div
            className={`tl-rail-node${activeIndex === i ? " active" : ""}`}
            onClick={() => onNav(i + 1)}
          />
          {i < 2 && <div className="tl-rail-line" />}
        </React.Fragment>
      ))}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────
//  SUB-COMPONENT: CARD SCENE
// ─────────────────────────────────────────────────────────────────

interface CardSceneProps {
  round: RoundData;
  revealed: boolean;
}

function CardScene({ round, revealed }: CardSceneProps) {
  const sceneRef = useRef<HTMLDivElement>(null);
  const backRefs = [
    useRef<HTMLDivElement>(null),
    useRef<HTMLDivElement>(null),
    useRef<HTMLDivElement>(null),
  ];

  const leftBackTransforms = [
    "rotate(-17deg) translate(-52px,28px)",
    "rotate(-8deg) translate(-26px,14px)",
    "rotate(0deg)",
  ];
  const rightBackTransforms = [
    "rotate(17deg) translate(52px,28px)",
    "rotate(8deg) translate(26px,14px)",
    "rotate(0deg)",
  ];
  const defaultTransforms = round.reverseLayout ? rightBackTransforms : leftBackTransforms;

  const handleMouseEnter = useCallback(() => {
    backRefs.forEach((r, i) => {
      if (!r.current) return;
      const sgn = round.reverseLayout ? 1 : i % 2 === 0 ? -1 : 1;
      r.current.style.transform = `rotate(${sgn * (i + 1) * 18}deg) translate(${sgn * (i + 1) * 60}px,${(i + 1) * 12}px)`;
    });
  }, [round.reverseLayout]);

  const handleMouseLeave = useCallback(() => {
    backRefs.forEach((r, i) => {
      if (!r.current) return;
      r.current.style.transform = defaultTransforms[i];
    });
  }, [defaultTransforms]);

  const [g1Color, g2Color] = GLITCH_COLORS[round.glowColor];

  return (
    <div
      className="tl-card-scene"
      ref={sceneRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Stacked back-cards */}
      {round.cardBackColors.map((color, i) => (
        <div
          key={i}
          ref={backRefs[i]}
          className="tl-card-back"
          style={{
            transform: defaultTransforms[i],
            borderColor: color,
            zIndex: i + 1,
            transition: "transform .5s cubic-bezier(.25,.46,.45,.94)",
            backgroundImage: `url(${round.cardBackImages[i]})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            filter: "brightness(0.65) contrast(1.1)",
          }}
        >
          <div className="tl-card-scanlines" />
        </div>
      ))}

      {/* Main 3D floating card */}
      <div
        className="tl-card-3d"
        style={{
          zIndex: 10,
          position: "relative",
          ...(round.cardAnimDelay ? { animationDelay: round.cardAnimDelay } : {}),
        }}
      >
        <div className="tl-bracket">
          <div className="tl-bracket-inner" />
        </div>

        <div className="tl-card-face" style={round.cardFaceStyle}>
          <img
            src={round.cardImage}
            alt={round.cardStripLabel}
            className="tl-card-img"
          />
          <div className="tl-card-scanlines" />
        </div>
      </div>

      {/* Shadow glow beneath card */}
      <div className="tl-card-shadow" style={{ background: round.cardShadowColor }} />

      {/* Label strip below card */}
      <div className="tl-card-strip">
        <div className="tl-card-strip-val">{round.cardStripLabel}</div>
        <div className="tl-card-strip-line" style={{ background: round.cardShadowColor }} />
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────
//  SUB-COMPONENT: EVENT ROW
// ─────────────────────────────────────────────────────────────────

interface EventRowProps {
  event: DayEvent;
  isLast: boolean;
  revealDelay: number;
  parentRevealed: boolean;
  dotStyle?: CSSProperties;
}

function EventRow({ event, isLast, revealDelay, parentRevealed, dotStyle }: EventRowProps) {
  const [bodyIn, setBodyIn] = useState(false);

  useEffect(() => {
    if (!parentRevealed) return;
    const id = setTimeout(() => setBodyIn(true), revealDelay);
    return () => clearTimeout(id);
  }, [parentRevealed, revealDelay]);

  return (
    <div className="tl-event">
      <div className="tl-event-time-col">
        <div className="tl-event-time">{event.time}</div>
      </div>
      <div className="tl-event-spine">
        <div className="tl-event-dot" style={dotStyle} />
        {!isLast && <div className="tl-event-vline" />}
      </div>
      <div className={`tl-event-body${bodyIn ? " in" : ""}`}>
        <div className="tl-event-name">{event.title}</div>
        <div className="tl-event-desc">{event.description}</div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────
//  SUB-COMPONENT: STAT BAR
// ─────────────────────────────────────────────────────────────────

interface StatBarProps {
  stat: StatEntry;
  difficulty: Difficulty;
  triggered: boolean;
}

function StatBar({ stat, difficulty, triggered }: StatBarProps) {
  const { bg, shadow } = STAT_COLORS[difficulty];
  return (
    <div className="tl-stat-bar">
      <span className="tl-stat-label">{stat.label}</span>
      <div className="tl-stat-track">
        <div
          className="tl-stat-fill"
          style={{
            background: bg,
            boxShadow: shadow,
            width: triggered ? `${stat.value}%` : "0%",
          }}
        />
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────
//  SUB-COMPONENT: ROUND SECTION
// ─────────────────────────────────────────────────────────────────

interface RoundSectionProps {
  round: RoundData;
  onVisibilityChange: (index: number, isVisible: boolean) => void;
  pageReady: boolean;
}

function RoundSection({ round, onVisibilityChange, pageReady }: RoundSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const [metaIn, setMetaIn] = useState(false);
  const [titleIn, setTitleIn] = useState(false);
  const [taglineIn, setTaglineIn] = useState(false);
  const [divbarIn, setDivbarIn] = useState(false);
  const [statsIn, setStatsIn] = useState(false);
  const [statsFill, setStatsFill] = useState(false);
  const [revealed, setRevealed] = useState(false);
  const [ghostY, setGhostY] = useState(0);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const obs = new IntersectionObserver(
      ([entry]) => {
        const isVis = entry.isIntersecting;
        onVisibilityChange(round.index, isVis);
        if (isVis && !revealed && pageReady) {
          setRevealed(true);
          setTimeout(() => setMetaIn(true), 0);
          setTimeout(() => setTitleIn(true), 130);
          setTimeout(() => setTaglineIn(true), 260);
          setTimeout(() => setDivbarIn(true), 390);
          setTimeout(() => setStatsIn(true), 500);
          setTimeout(() => setStatsFill(true), 650);
          obs.unobserve(el);
        }
      },
      { threshold: 0.18 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [round.index, revealed, onVisibilityChange, pageReady]);

  // Parallax ghost number
  useEffect(() => {
    const handleScroll = () => {
      const el = sectionRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      setGhostY((-rect.top / window.innerHeight) * 90);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const [g1Color, g2Color] = GLITCH_COLORS[round.glowColor];

  const leftPanel = (
    <div
      className={`tl-panel-left${round.reverseLayout ? " flip-right" : ""}`}
    >
      {/* META */}
      <div className={`tl-meta${metaIn ? " in" : ""}`}>
        <span className="tl-meta-code">◈ ROUND_{round.roundNum}</span>
        <span className="tl-meta-sep" />
        <span className="tl-meta-code">{round.dayCode}</span>
        <span className="tl-meta-sep" />
        <span className={`tl-dtag ${round.difficulty}`}>
          {round.difficulty.toUpperCase()}
        </span>
      </div>

      {/* TITLE with glitch layers */}
      <h2 className={`tl-round-title ${round.glowColor}${titleIn ? " in" : ""}`}>
        {round.title}
        <span className="g1" style={{ color: g1Color }} aria-hidden="true">
          {round.title}
        </span>
        <span className="g2" style={{ color: g2Color }} aria-hidden="true">
          {round.title}
        </span>
      </h2>

      {/* TAGLINE */}
      <p className={`tl-tagline${taglineIn ? " in" : ""}`}>{round.tagline}</p>

      {/* DIVBAR */}
      <div
        className={`tl-divbar${divbarIn ? " in" : ""}`}
        style={round.divbarStyle}
      />

      {/* EVENTS */}
      <div className="tl-events">
        {round.events.map((ev, i) => (
          <EventRow
            key={`${round.id}-ev-${i}`}
            event={ev}
            isLast={i === round.events.length - 1}
            revealDelay={420 + i * 160}
            parentRevealed={revealed}
            dotStyle={round.dotStyle}
          />
        ))}
      </div>

      {/* STATS */}
      <div className={`tl-stat-panel${statsIn ? " in" : ""}`}>
        {round.stats.map((stat) => (
          <StatBar
            key={stat.label}
            stat={stat}
            difficulty={round.difficulty}
            triggered={statsFill}
          />
        ))}
      </div>
    </div>
  );

  const rightPanel = (
    <div
      className={`tl-panel-right${round.reverseLayout ? " flip-left" : ""}`}
    >
      <CardScene round={round} revealed={revealed} />
    </div>
  );

  return (
    <section
      className="tl-round"
      id={round.id}
      ref={sectionRef}
    >
      {/* Ghost number */}
      <div className="tl-ghost-num">
        <span style={{ transform: `translateY(${ghostY}px)` }}>
          {round.index + 1}
        </span>
      </div>

      {round.reverseLayout ? (
        <>
          {rightPanel}
          {leftPanel}
        </>
      ) : (
        <>
          {leftPanel}
          {rightPanel}
        </>
      )}

      {/* Scroll hint only on first round */}
      {round.index === 0 && (
        <div className="tl-scroll-hint">
          <span>SCROLL</span>
          <div className="tl-scroll-arrow" />
        </div>
      )}
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────
//  SUB-COMPONENT: CARD INTRO ANIMATION
// ─────────────────────────────────────────────────────────────────

interface CardIntroProps {
  onComplete: () => void;
  onFlyStart: () => void;
}

interface IntroCardState {
  x: number;
  y: number;
  rot: number;
  scale: number;
  opacity: number;
  facedown: boolean;
  zIndex: number;
  duration: number;
  easing: string;
}

function CardIntro({ onComplete, onFlyStart }: CardIntroProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });
  const [removed, setRemoved] = useState(false);
  const [introOut, setIntroOut] = useState(false);
  const [cardStates, setCardStates] = useState<IntroCardState[]>(() =>
    INTRO_CARDS.map((_, i) => ({
      x: 0, y: 0,
      rot: (Math.random() - 0.5) * 7,
      scale: 1, opacity: 1,
      facedown: true,
      zIndex: i + 1,
      duration: 0.6,
      easing: "ease",
    }))
  );
  const [titleState, setTitleState] = useState<IntroCardState>({
    x: 0, y: 0, rot: 0, scale: 1, opacity: 1,
    facedown: true, zIndex: 999, duration: 0.6, easing: "ease",
  });
  const [titleGlow, setTitleGlow] = useState(false);

  const move = useCallback(
    (
      updater: (prev: IntroCardState[]) => IntroCardState[],
      titleUpdater: (prev: IntroCardState) => IntroCardState
    ) => {
      setCardStates(updater);
      setTitleState(titleUpdater);
    },
    []
  );

  useEffect(() => {
    if (!isInView) return;
    const t1 = setTimeout(() => {
      // SPLIT
      setCardStates((prev) =>
        prev.map((s) => {
          let xt = 120 + Math.random() * 90;
          if (Math.random() < 0.5) xt *= -1;
          return { ...s, x: xt, y: (Math.random() - 0.5) * 55, rot: (Math.random() - 0.5) * 25, duration: 0.5, easing: "ease" };
        })
      );

      const t2 = setTimeout(() => {
        // MERGE
        setCardStates((prev) =>
          prev.map((s) => ({ ...s, x: 0, y: 0, rot: (Math.random() - 0.5) * 7, duration: 0.55, easing: "ease" }))
        );

        const t3 = setTimeout(() => {
          // SCATTER + FLIP
          setCardStates((prev) =>
            prev.map((s, i) => {
              const angle = (Math.PI * 2 / 12) * i;
              const r = 170 + Math.random() * 140;
              return {
                ...s,
                x: Math.cos(angle) * r,
                y: Math.sin(angle) * r,
                rot: (Math.random() - 0.5) * 65,
                scale: 0.82,
                facedown: false,
                duration: 1,
                easing: "cubic-bezier(.25,.46,.45,.94)",
              };
            })
          );
          setTitleState((s) => ({ ...s, x: 0, y: 0, rot: 0, scale: 1.45, facedown: false, duration: 1, easing: "cubic-bezier(.25,.46,.45,.94)" }));

          const t4 = setTimeout(() => {
            setTitleGlow(true);

            const t5 = setTimeout(() => {
              // FLY
              onFlyStart();
              setCardStates((prev) =>
                prev.map((s, i) => {
                  const angle = (Math.PI * 2 / 12) * i;
                  return {
                    ...s,
                    x: Math.cos(angle) * window.innerWidth,
                    y: Math.sin(angle) * window.innerHeight,
                    rot: (Math.random() - 0.5) * 100,
                    scale: 0.3,
                    opacity: 0,
                    duration: 1.1,
                    easing: "cubic-bezier(.55,.06,.68,.19)",
                  };
                })
              );
              setTitleState((s) => ({ ...s, y: -650, scale: 0.3, opacity: 0, duration: 1.1, easing: "cubic-bezier(.55,.06,.68,.19)" }));

              const t6 = setTimeout(() => {
                setIntroOut(true);
                onComplete();
                setTimeout(() => setRemoved(true), 2000);
              }, 900);
              return () => clearTimeout(t6);
            }, 3400);
            return () => clearTimeout(t5);
          }, 1000);
          return () => clearTimeout(t4);
        }, 580);
        return () => clearTimeout(t3);
      }, 480);
      return () => clearTimeout(t2);
    }, 750);
    return () => clearTimeout(t1);
  }, [onComplete, onFlyStart, isInView]);

  if (removed) return null;

  return (
    <div ref={ref} className={`tl-intro${introOut ? " out" : ""}`}>
      <div className="tl-intro-corner tl">SYSTEM_READY // INITIATING</div>
      <div className="tl-intro-corner tr">
        PROTOCOL: BORDERLAND
        <br />
        STATUS: ACTIVE
      </div>
      <div className="tl-intro-corner bl">GAME: HACKATHON_TIMELINE</div>
      <div className="tl-intro-corner br">ROUNDS: 3 DETECTED</div>

      <div className="tl-arena">
        {/* Regular playing cards */}
        {INTRO_CARDS.map((d, i) => {
          const s = cardStates[i];
          return (
            <div
              key={i}
              className="tl-ic"
              style={{
                zIndex: s.zIndex,
                transform: `translate(${s.x}px,${s.y}px) rotate(${s.rot}deg) scale(${s.scale})`,
                opacity: s.opacity,
                transition: `transform ${s.duration}s ${s.easing}, opacity ${s.duration}s ease`,
              }}
            >
              <div style={{
                width: "100%", height: "100%", position: "relative",
                transformStyle: "preserve-3d",
                transform: `rotateY(${s.facedown ? 180 : 0}deg)`,
                transition: `transform ${s.duration}s ${s.easing}`,
              }}>
                {/* Front face — card image */}
                <div className="tl-ic-face">
                  <img
                    src={d.img}
                    alt={`${d.v}${d.s}`}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      display: "block",
                    }}
                  />
                </div>
                {/* Back face — facedown image */}
                <div className="tl-ic-face tl-ic-back">
                  <img
                    src="/timeline_cards/facedown.png"
                    alt="Card back"
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      display: "block",
                    }}
                  />
                </div>
              </div>
            </div>
          );
        })}

        {/* Title card — timeline.png */}
        <div
          className="tl-ic"
          style={{
            zIndex: titleState.zIndex,
            transform: `translate(${titleState.x}px,${titleState.y}px) rotate(${titleState.rot}deg) scale(${titleState.scale})`,
            opacity: titleState.opacity,
            transition: `transform ${titleState.duration}s ${titleState.easing}, opacity ${titleState.duration}s ease`,
          }}
        >
          <div style={{
            width: "100%", height: "100%", position: "relative",
            transformStyle: "preserve-3d",
            transform: `rotateY(${titleState.facedown ? 180 : 0}deg)`,
            transition: `transform ${titleState.duration}s ${titleState.easing}`,
          }}>
            {/* Front face — timeline card image */}
            <div
              className="tl-ic-face"
              style={{
                borderColor: "rgba(255,214,10,.6)",
                boxShadow: titleGlow
                  ? "0 0 70px rgba(255,214,10,.7),0 0 140px rgba(255,214,10,.25)"
                  : "0 0 40px rgba(255,214,10,.25)",
                transition: "box-shadow 0.8s ease",
              }}
            >
              <img
                src="/timeline_cards/timeline.png"
                alt="Timeline"
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  display: "block",
                }}
              />
            </div>
            {/* Back face — facedown */}
            <div
              className="tl-ic-face tl-ic-back"
              style={{
                borderColor: "rgba(255,214,10,.6)",
                boxShadow: titleGlow
                  ? "0 0 70px rgba(255,214,10,.7),0 0 140px rgba(255,214,10,.25)"
                  : "0 0 40px rgba(255,214,10,.25)",
                transition: "box-shadow 0.8s ease",
              }}
            >
              <img
                src="/timeline_cards/facedown.png"
                alt="Card back"
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  display: "block",
                }}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="tl-lore-blink">— Enter the Borderland —</div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────
//  SUB-COMPONENT: PARTICLES
// ─────────────────────────────────────────────────────────────────

interface Particle {
  id: number;
  suit: string;
  left: string;
  delay: string;
  duration: string;
  size: string;
  color: string;
}

function Particles({ active }: { active: boolean }) {
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    if (!active) return;
    const suits = ["♠", "♥", "♦", "♣"];
    setParticles(
      Array.from({ length: 24 }, (_, i) => {
        const s = suits[i % 4];
        return {
          id: i,
          suit: s,
          left: `${Math.random() * 100}vw`,
          delay: `${Math.random() * 28}s`,
          duration: `${16 + Math.random() * 16}s`,
          size: `${12 + Math.random() * 22}px`,
          color: s === "♥" || s === "♦" ? "rgba(217,4,41,.45)" : "rgba(255,255,255,.14)",
        };
      })
    );
  }, [active]);

  return (
    <div className="tl-particles">
      {particles.map((p) => (
        <div
          key={p.id}
          className="tl-particle"
          style={{
            left: p.left,
            animationDelay: p.delay,
            animationDuration: p.duration,
            fontSize: p.size,
            color: p.color,
          }}
        >
          {p.suit}
        </div>
      ))}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────
//  ROOT COMPONENT
// ─────────────────────────────────────────────────────────────────

export default function BorderlandTimeline() {
  const [hudVisible, setHudVisible] = useState(false);
  const [railVisible, setRailVisible] = useState(false);
  const [pageVisible, setPageVisible] = useState(false);
  const [particlesActive, setParticlesActive] = useState(false);
  const [activeRound, setActiveRound] = useState(0);
  const [isMounted, setIsMounted] = useState(false);


  const sysMessage = useCyclingMessage(HUD_MESSAGES, 3200);

  useEffect(() => { setIsMounted(true); }, []);

  const handleFlyStart = useCallback(() => {
    setHudVisible(true);
    setRailVisible(true);
  }, []);

  const handleIntroComplete = useCallback(() => {
    setPageVisible(true);
    setParticlesActive(true);
    // Signal to RegisterButton and domain timer that the intro is done
    window.dispatchEvent(new CustomEvent("timeline-intro-complete"));
  }, []);

  const handleVisibilityChange = useCallback((index: number, isVisible: boolean) => {
    if (isVisible) setActiveRound(index);
  }, []);

  const scrollToRound = useCallback((n: number) => {
    document.getElementById(`r${n}`)?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  // Cursor tracking
  const cursorRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!isMounted) return;
    const onMove = (e: MouseEvent) => {
      if (!cursorRef.current) return;
      cursorRef.current.style.left = `${e.clientX}px`;
      cursorRef.current.style.top = `${e.clientY}px`;
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, [isMounted]);

  if (!isMounted) return null;

  return (
    <div className="tl-root">
      {/* Custom cursor */}
      <div className="tl-cursor" ref={cursorRef} />

      {/* Cinematic overlays */}
      <div className="tl-scanlines" />
      <div className="tl-vignette" />

      {/* Animated grid */}
      <div className="tl-grid-bg">
        <svg xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="tl-grid-pat" width="60" height="60" patternUnits="userSpaceOnUse">
              <path d="M60 0L0 0 0 60" fill="none" stroke="rgba(217,4,41,0.5)" strokeWidth="0.4" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#tl-grid-pat)" />
        </svg>
      </div>

      {/* Floating suit particles */}
      <Particles active={particlesActive} />

      {/* HUD */}
      <HUD visible={hudVisible} sysMessage={sysMessage} />

      {/* Left progress rail */}
      <ProgressRail
        visible={railVisible}
        activeIndex={activeRound}
        onNav={scrollToRound}
      />

      {/* Card intro animation */}
      <CardIntro onFlyStart={handleFlyStart} onComplete={handleIntroComplete} />

      {/* Main timeline page */}
      <div className={`tl-page${pageVisible ? " on" : ""}`}>
        {hackathonRounds.map((round, i) => (
          <React.Fragment key={round.id}>
            {/* Round section */}
            <RoundSection
              round={round}
              onVisibilityChange={handleVisibilityChange}
              pageReady={pageVisible}
            />

            {/* Section dividers between rounds */}
            {i < hackathonRounds.length - 1 && (
              <div
                className="tl-section-divider"
                style={DIVIDER_SUITS[i].style}
              >
                <div
                  className="tl-section-divider-suit"
                  style={{
                    color: i === 0 ? "var(--aib-red)" : "var(--aib-gold)",
                  }}
                >
                  {DIVIDER_SUITS[i].suit}
                </div>
              </div>
            )}
          </React.Fragment>
        ))}


      </div>
    </div>
  );
}