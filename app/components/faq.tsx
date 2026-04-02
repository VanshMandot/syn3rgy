"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from "framer-motion";

// ── Types ─────────────────────────────────────────────────────────────────────
interface FAQItem {
  id: string;
  suit: string;
  number: string;
  category: string;
  question: string;
  answer: string;
  difficulty: "♠" | "♥" | "♦" | "♣";
}

// ── FAQ Data ──────────────────────────────────────────────────────────────────
const FAQ_ITEMS: FAQItem[] = [
  {
    id: "faq-1",
    suit: "♠",
    number: "01",
    category: "ELIGIBILITY",
    question: "Who can participate in SYNERGY 3.0?",
    answer: "Any currently enrolled undergraduate or postgraduate student is eligible to enter the borderland. Teams of 2–4 players are accepted. Solo players are forbidden — survival requires allies.",
    difficulty: "♠",
  },
  {
    id: "faq-2",
    suit: "♥",
    number: "02",
    category: "REGISTRATION",
    question: "How do we register and what is the deadline?",
    answer: "Registration is executed through the official portal. Complete team registration before the deadline. There is no registration fee; your only currency here is skill and resolve.",
    difficulty: "♥",
  },
  {
    id: "faq-3",
    suit: "♦",
    number: "03",
    category: "DURATION",
    question: "How long does the game last?",
    answer: "The hackathon is a 24-hour continuous game. The clock starts the moment the opening ceremony ends. There are no pauses, no extensions. Time waits for no player.",
    difficulty: "♦",
  },
  {
    id: "faq-4",
    suit: "♣",
    number: "04",
    category: "DOMAINS",
    question: "What domains can we build in?",
    answer: "Five domains await selection: Web/App Development, Blockchain, Cybersecurity, AI/ML, and Open Innovation. Your team must declare a domain at registration — switching is elimination.",
    difficulty: "♣",
  },
  {
    id: "faq-5",
    suit: "♠",
    number: "05",
    category: "JUDGING",
    question: "How will projects be evaluated?",
    answer: "Projects are judged across five criteria: Innovation, Technical Complexity, Practical Feasibility, Presentation, and Domain Impact. A panel of masters oversees all evaluations.",
    difficulty: "♠",
  },
  {
    id: "faq-6",
    suit: "♥",
    number: "06",
    category: "SUBMISSIONS",
    question: "What must we submit at the end of the game?",
    answer: "A working prototype or MVP, a public GitHub repository, a 3-minute demo video, and a slide deck. Commit your code and submit all materials through the designated portal.",
    difficulty: "♥",
  },
  {
    id: "faq-7",
    suit: "♦",
    number: "07",
    category: "RESOURCES",
    question: "Are API keys, cloud credits, or tools provided?",
    answer: "Selected API credits and cloud service vouchers will be distributed. Internet access is provided. You may bring your own hardware. Open-source tools are encouraged.",
    difficulty: "♦",
  },
  {
    id: "faq-8",
    suit: "♣",
    number: "08",
    category: "CONDUCT",
    question: "What rules govern player conduct?",
    answer: "All code must be written during the hackathon. Plagiarism triggers disqualification. Collaboration between teams on core logic is prohibited. The game masters hold absolute authority.",
    difficulty: "♣",
  },
  {
    id: "faq-9",
    suit: "♠",
    number: "09",
    category: "PRIZES",
    question: "What does the winner claim from the vault?",
    answer: "First place claims ₹25,000. Second place receives ₹15,000. Third place secures ₹10,000. Special awards exist for Best UI/UX, Most Innovative Concept, and Domain-Specific Solutions.",
    difficulty: "♠",
  },
  {
    id: "faq-10",
    suit: "♥",
    number: "10",
    category: "MENTORSHIP",
    question: "Will mentors be present during the game?",
    answer: "Industry and faculty mentors are stationed throughout the arena. Mentors guide — they do not build. Teams may request mentor sessions. Use them strategically.",
    difficulty: "♥",
  },
];

// ── Glitch Counter — Scrambles before resolving ───────────────────────────────
const GLITCH_CHARS = "!@#█▓▒░×÷";

function GlitchNumber({ targetNumber, isLanded }: { targetNumber: string; isLanded: boolean }) {
  const [display, setDisplay] = useState(targetNumber.replace(/./g, "█"));
  const length = targetNumber.length;
  
  useEffect(() => {
    if (!isLanded) return;

    let iterations = 0;
    const interval = setInterval(() => {
      setDisplay((prev) =>
        targetNumber
          .split("")
          .map((char, index) => {
            if (index < Math.floor(iterations / 3)) {
              return targetNumber[index];
            }
            return GLITCH_CHARS[Math.floor(Math.random() * GLITCH_CHARS.length)];
          })
          .join("")
      );

      if (iterations >= length * 3) {
        clearInterval(interval);
      }
      iterations++;
    }, 40);

    return () => clearInterval(interval);
  }, [isLanded, targetNumber, length]);

  return <span className="font-mono tracking-widest">{display}</span>;
}

// ── Single FAQ Card ───────────────────────────────────────────────────────────
function FAQCard({
  item,
  index,
  isOpen,
  onToggle,
  column,
  inView
}: {
  item: FAQItem;
  index: number;
  isOpen: boolean;
  onToggle: () => void;
  column: number;
  inView: boolean;
}) {
  const isRed = item.suit === "♥" || item.suit === "♦";
  const suitColor = isRed ? "#ff0033" : "#00bfff";
  const accentRgb = isRed ? "255, 0, 51" : "0, 191, 255";

  // State to track if card has completed dealing animation
  const [hasLanded, setHasLanded] = useState(false);
  // Crack animation state
  const [isCracking, setIsCracking] = useState(false);

  // Trigger Deal timeout
  useEffect(() => {
    if (inView) {
      // Matches the staggered delay duration
      const timer = setTimeout(() => {
        setHasLanded(true);
      }, (index * 55) + 600); // 600ms = approx deal duration
      return () => clearTimeout(timer);
    } else {
      setHasLanded(false);
    }
  }, [inView, index]);

  // Framer Motion Gyroscope logic
  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);
  const springConfig = { damping: 25, stiffness: 180 };
  const smoothMouseX = useSpring(mouseX, springConfig);
  const smoothMouseY = useSpring(mouseY, springConfig);

  // Pitch tilt ±12°, Yaw tilt ±16°
  const pitch = useTransform(smoothMouseY, [0, 1], [12, -12]);
  const yaw = useTransform(smoothMouseX, [0, 1], [-16, 16]);

  const glareX = useTransform(smoothMouseX, [0, 1], [-20, 120]);
  const glareY = useTransform(smoothMouseY, [0, 1], [-20, 120]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isOpen || !hasLanded) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
    const y = Math.max(0, Math.min(1, (e.clientY - rect.top) / rect.height));
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    mouseX.set(0.5);
    mouseY.set(0.5);
  };

  const handleClick = () => {
    if (isOpen) {
      onToggle(); // Close immediately without crack
    } else {
      // Crack the seal animation
      setIsCracking(true);
      setTimeout(() => {
        setIsCracking(false);
        onToggle();
      }, 350); // Matches keyframe duration
    }
  };

  // Card Deal-In Motion Variants
  const cardVariants = {
    hidden: {
      y: 60,
      x: column === 0 ? 80 : -80,
      scale: 0.85,
      rotateX: 20,
      rotateZ: column === 0 ? 15 : -15, // Stacked slightly rotated
      opacity: 0,
      filter: "blur(4px)"
    },
    visible: {
      y: [60, -30, 0],             // arc trajectory
      x: [column === 0 ? 80 : -80, column === 0 ? -15 : 15, 0],
      scale: [0.85, 0.95, 1],
      rotateX: [20, -5, 0],
      rotateZ: [column === 0 ? 15 : -15, column === 0 ? -5 : 5, 0],
      opacity: [0, 0.8, 1],
      filter: ["blur(4px)", "blur(0px)", "blur(0px)"],
      transition: {
        duration: 0.65,
        ease: [0.34, 1.56, 0.64, 1] as any, // Spring-like bounce easing
      }
    }
  };

  return (
    <motion.div
      variants={cardVariants}
      style={{
        perspective: "1200px",
        transformStyle: "preserve-3d",
      }}
      className="w-full h-full relative"
    >
      <motion.div
        className={`faq-card-wrapper relative bg-[#0a0a0f] border rounded-md overflow-hidden cursor-pointer transition-colors duration-300 ${
          isOpen ? `border-[${suitColor}]` : "border-white/10"
        } ${isCracking ? "crack-animation" : ""}`}
        style={
          isOpen || !hasLanded || isCracking
            ? {
                borderColor: isOpen ? suitColor : "rgba(255,255,255,0.1)",
                boxShadow: isOpen ? `0 0 40px rgba(${accentRgb}, 0.15)` : "none"
              }
            : {
                rotateX: pitch,
                rotateY: yaw,
                borderColor: suitColor,
                boxShadow: `0 10px 40px rgba(0,0,0,0.8), 0 0 20px rgba(${accentRgb}, 0.2)`
              }
        }
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onClick={handleClick}
        role="button"
        tabIndex={0}
      >
        {/* Holographic Foil Shimmer */}
        <motion.div
          className="absolute inset-0 pointer-events-none mix-blend-color-dodge z-0 transition-opacity duration-300"
          style={{
            opacity: hasLanded && !isOpen ? 0.6 : 0,
            background: useTransform(
              () => `radial-gradient(circle at ${glareX.get()}% ${glareY.get()}%, rgba(255, 214, 10, 0.25) 0%, rgba(${accentRgb}, 0.15) 30%, transparent 65%)`
            )
          }}
        />

        {/* Crimson Flash Overlay (Crack Effect) */}
        {isCracking && <div className="absolute inset-0 bg-red-600 z-50 opacity-10 animate-flash pointer-events-none" />}

        {/* Diagonal Background Grid & Vignette */}
        <div className="absolute inset-0 bg-[repeating-linear-gradient(45deg,transparent,transparent_8px,rgba(255,255,255,0.015)_8px,rgba(255,255,255,0.015)_16px)] pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-br from-transparent to-[#050508] opacity-80 pointer-events-none" />

        {/* Top/Bottom Suit Borders */}
        <div className="absolute top-0 left-0 w-full h-[2px]" style={{ background: `linear-gradient(to right, ${suitColor}, transparent)` }} />
        
        {/* Content Container */}
        <div className="relative z-10 p-6 md:p-8 flex flex-col items-start gap-5">
          
          {/* Header Row */}
          <div className="w-full flex justify-between items-center opacity-80">
            <div className="flex items-center gap-3" style={{ color: suitColor }}>
              <span className="font-serif text-2xl drop-shadow-md">{item.suit}</span>
              <span className="font-mono text-[0.65rem] tracking-[0.25em] border px-2 py-0.5 rounded-sm" style={{ borderColor: `${suitColor}40`, backgroundColor: `${suitColor}10` }}>
                {item.category}
              </span>
            </div>
            {/* Glitch Counter */}
            <div className="text-white/40 text-xs mt-1 drop-shadow-md">
              <span style={{ color: suitColor }}>[</span>
              <GlitchNumber targetNumber={item.number} isLanded={hasLanded} />
              <span style={{ color: suitColor }}>]</span>
            </div>
          </div>

          {/* Question Text */}
          <h3 className="text-white font-sans text-base md:text-lg font-bold leading-relaxed tracking-wide drop-shadow-md pr-4 group-hover:text-white transition-colors duration-200">
            {item.question}
          </h3>

          {/* Answer Accordion */}
          <AnimatePresence initial={false}>
            {isOpen && (
              <motion.div
                key="content"
                initial="collapsed"
                animate="open"
                exit="collapsed"
                variants={{
                  open: { opacity: 1, height: "auto", marginTop: "4px" },
                  collapsed: { opacity: 0, height: 0, marginTop: "0px" }
                }}
                transition={{ duration: 0.4, ease: [0.34, 1.56, 0.64, 1] as [number, number, number, number] }}
                className="overflow-hidden w-full will-change-transform"
              >
                <div className="w-full h-[1px] bg-white/10 mb-5" />
                <p className="text-white/90 font-mono text-sm leading-relaxed tracking-wide shadow-black drop-shadow-md">
                  <span style={{ color: suitColor }}>&gt; </span> {item.answer}
                </p>
                
                {/* Difficulty Pips */}
                <div className="flex items-center gap-2 mt-5 border-t border-white/5 pt-3">
                  <span className="text-[0.55rem] font-mono tracking-widest text-white/30 uppercase mr-1">RATING:</span>
                  {[...Array(4)].map((_, i) => (
                    <span
                      key={i}
                      className="w-2 h-2 rounded-sm"
                      style={{
                        background: i < ["♠","♥","♦","♣"].indexOf(item.difficulty) + 1 ? suitColor : `rgba(255,255,255,0.1)`,
                        boxShadow: i < ["♠","♥","♦","♣"].indexOf(item.difficulty) + 1 ? `0 0 6px ${suitColor}` : "none",
                      }}
                    />
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

        </div>
      </motion.div>

      <style jsx>{`
        /* Crack Shake CSS Keyframes */
        .crack-animation {
          animation: crackShake 0.35s cubic-bezier(0.36, 0.07, 0.19, 0.97) both;
        }

        @keyframes crackShake {
          0% { transform: perspective(1200px) translateX(0) rotateX(0deg) scale(1); }
          15% { transform: perspective(1200px) translateX(-5px) rotateX(-6deg) scale(1.02); }
          30% { transform: perspective(1200px) translateX(4px) rotateX(4deg) scale(1.01); }
          45% { transform: perspective(1200px) translateX(-3px) rotateX(-3deg) scale(1.02); }
          60% { transform: perspective(1200px) translateX(2px) rotateX(2deg) scale(1.01); }
          75% { transform: perspective(1200px) translateX(-1px) rotateX(-1deg) scale(1.005); }
          100% { transform: perspective(1200px) translateX(0) rotateX(0deg) scale(1); }
        }

        @keyframes flash {
          0% { opacity: 0; }
          20% { opacity: 0.15; }
          100% { opacity: 0; }
        }
        .animate-flash {
          animation: flash 0.35s ease-out forwards;
        }
      `}</style>
    </motion.div>
  );
}

// ── Main FAQ Section ──────────────────────────────────────────────────────────
export default function FAQSection() {
  const [inView, setInView] = useState(false);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          // We don't disconnect immediately so we can re-trigger deal-in if wanted, 
          // but for now, let's keep it firing once.
          obs.disconnect(); 
        }
      },
      { threshold: 0.15 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.055, // Stagger dealing by ~55ms
      }
    }
  };

  return (
    <section ref={sectionRef} className="relative w-full min-h-screen bg-[#020204] overflow-hidden py-24 sm:py-32 flex flex-col justify-center items-center" id="faq">
      
      {/* ── Background Ambience ── */}
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_center,rgba(255,0,51,0.03)_0%,transparent_60%)]" />
      <div className="absolute inset-0 pointer-events-none opacity-5 mix-blend-overlay bg-[url('https://www.transparenttextures.com/patterns/stardust.png')]" />

      <div className="w-full max-w-5xl mx-auto px-5 relative z-10">

        
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center mb-16 md:mb-24 flex flex-col items-center"
        >
          <div className="font-mono text-[0.6rem] md:text-xs tracking-[0.4em] text-red-500 uppercase border border-red-500/30 px-6 py-2 bg-red-500/5 mb-6">
            // INTEL_DATABASE //
          </div>
          <h2 className="font-serif text-5xl md:text-7xl text-white tracking-widest drop-shadow-[0_0_20px_rgba(255,0,0,0.3)] flex items-center gap-4">
            <span className="text-red-500 animate-pulse drop-shadow-[0_0_15px_red]">♠</span>
            INTEL
            <span className="text-[#00bfff] drop-shadow-[0_0_15px_#00bfff]">♦</span>
          </h2>
          <p className="font-mono text-white/40 text-xs md:text-sm mt-6 max-w-xl mx-auto tracking-widest leading-loose">
            FREQUENTLY ASKED QUESTIONS. READ CAREFULLY. THERE ARE NO SECOND CHANCES TO ASK IN THE BORDERLAND.
          </p>
        </motion.div>

        {/* Grid Container */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-10 max-w-5xl mx-auto"
        >
          {FAQ_ITEMS.map((item, index) => (
            <FAQCard
              key={item.id}
              item={item}
              index={index}
              column={index % 2}
              inView={inView}
              isOpen={expandedId === item.id}
              onToggle={() => setExpandedId(expandedId === item.id ? null : item.id)}
            />
          ))}
        </motion.div>

        {/* Footer */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 1.5, duration: 1 }}
          className="mt-20 text-center font-mono text-[0.65rem] md:text-xs text-white/30 tracking-[0.3em] uppercase flex items-center justify-center gap-4"
        >
          <span className="text-red-500/50 text-base">☠</span>
          STILL HAVE QUESTIONS? CONTACT SYNERGY@SIGAI.IN
          <span className="text-red-500/50 text-base">☠</span>
        </motion.div>

      </div>
    </section>
  );
}
