"use client";

import React, { useEffect, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

// Suit symbols for the raining cards
const SUITS = ["♠", "♥", "♦", "♣"];
const SUIT_COLORS = [
  "text-red-600",
  "text-white",
  "text-red-500",
  "text-gray-400",
];

interface FallingCard {
  id: number;
  suit: string;
  colorClass: string;
  left: string;
  delay: number;
  duration: number;
  size: number;
  rotation: number;
}

export default function HeroBanner({ timelineStarted }: { timelineStarted: boolean }) {
  const [cards, setCards] = useState<FallingCard[]>([]);
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });
  const [isHovering, setIsHovering] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [timer, setTimer] = useState("00:00:00");

  useEffect(() => {
    const targetDate = new Date("2026-04-18T13:00:00+05:30");

    const updateTimer = () => {
      const now = new Date();
      const diff = targetDate.getTime() - now.getTime();

      if (diff <= 0) {
        setTimer("00:00:00");
        return;
      }

      const hours = Math.floor(diff / (1000 * 60 * 60));
      const minutes = Math.floor((diff / (1000 * 60)) % 60);
      const seconds = Math.floor((diff / 1000) % 60);

      setTimer(
        `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`
      );
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);

    return () => clearInterval(interval);
  }, []);

  const { scrollY } = useScroll();
  // HeroBanner fades out and shifts down slightly for a parallax effect as you scroll
  const opacity = useTransform(scrollY, [0, 600], [1, -0.2]);
  const yOffset = useTransform(scrollY, [0, 600], [0, 200]);

  useEffect(() => {
    // Generate initial set of falling cards
    const initialCards: FallingCard[] = Array.from({ length: 20 }).map(
      (_, i) => ({
        id: i,
        suit: SUITS[Math.floor(Math.random() * SUITS.length)],
        colorClass: SUIT_COLORS[Math.floor(Math.random() * SUIT_COLORS.length)],
        left: `${Math.random() * 100}%`,
        delay: Math.random() * 5,
        duration: Math.random() * 5 + 4, // 4 to 9 seconds falling duration
        size: Math.random() * 2 + 1.5, // 1.5rem to 3.5rem size
        rotation: (Math.random() - 0.5) * 360,
      }),
    );
    setCards(initialCards);
  }, []);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const handleMouseMove = (e: React.MouseEvent) => {
    const { clientX, clientY } = e;
    // Get cursor position relative to the viewport
    const { innerWidth, innerHeight } = window;
    setMousePos({
      x: (clientX / innerWidth) * 100,
      y: (clientY / innerHeight) * 100,
    });
  };

  return (
    <div
      className="relative w-full h-screen min-h-[600px] overflow-hidden bg-[#050000] select-none font-sans border-b-2 border-red-900/50"
      onMouseMove={!isMobile ? handleMouseMove : undefined}
      onMouseEnter={!isMobile ? () => setIsHovering(true) : undefined}
      onMouseLeave={!isMobile ? () => setIsHovering(false) : undefined}
    >
      <style>{`
  .timerBox {
    display: none;
    position: absolute;
    top: 16px;
    right: 20px;
    z-index: 50;
    text-align: right;
    flex-direction: column;
    pointer-events: none;
    background: rgba(5, 5, 5, 0.95);
    padding: 6px 12px;
    border: 1px solid rgba(255, 0, 0, 0.35);
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.6);
    border-radius: 4px;
    backdrop-filter: blur(4px);
  }

  @media (min-width: 768px) {
    .timerBox {
      display: flex;
    }
  }

  .timerLabel {
    font-size: 0.6rem;
    color: #9CA3AF;
    letter-spacing: 1px;
  }

  .timerValue {
    font-size: 1.4rem;
    color: rgb(255, 0, 0);
    font-weight: bold;
    letter-spacing: 2px;
    text-shadow: 0 0 10px rgba(255, 0, 0, 0.8);
    line-height: 1;
  }
`}</style>
      <motion.div
        style={{ opacity, y: yOffset }}
        className="absolute inset-0 w-full h-full flex flex-col items-center justify-center"
      >
        {/* Background with interactive Red Spotlight */}
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
          {/* Black & White Base Layer */}
          <div
            className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 ease-out"
            style={{ backgroundImage: 'url("/images/banner_bg_blackwhite")' }}
          />

          {/* Darkening Overlay for text readability */}
          <div className="absolute inset-0 bg-black/60 pointer-events-none" />

          {!isMobile && (
            <>
              <div
                className="absolute inset-0 pointer-events-none transition-opacity duration-300 mix-blend-color"
                style={{
                  opacity: isHovering ? 1 : 0,
                  background: `radial-gradient(circle 250px at ${mousePos.x}% ${mousePos.y}%, rgba(255, 0, 0, 1) 0%, transparent 100%)`,
                }}
              />
              <div
                className="absolute inset-0 pointer-events-none transition-opacity duration-300 mix-blend-screen"
                style={{
                  opacity: isHovering ? 1 : 0,
                  background: `radial-gradient(circle 180px at ${mousePos.x}% ${mousePos.y}%, rgba(255, 0, 0, 0.45) 0%, transparent 100%)`,
                }}
              />
            </>
          )}
        </div>

        {/* Raining Cards Animation */}
        <div className="absolute inset-0 z-[1] overflow-hidden pointer-events-none opacity-60">
          {cards.map((card) => (
            <motion.div
              key={card.id}
              initial={{ y: "-10vh", opacity: 0, rotate: card.rotation }}
              animate={{
                y: "110vh",
                opacity: [0, 0.8, 0.8, 0],
                rotate: card.rotation + (Math.random() > 0.5 ? 180 : -180),
              }}
              transition={{
                duration: card.duration,
                delay: card.delay,
                repeat: Infinity,
                ease: "linear",
              }}
              className={`absolute ${card.colorClass} drop-shadow-[0_0_8px_rgba(255,0,0,0.5)] flex flex-col items-center justify-center p-2 border border-white/10 rounded-sm bg-black/40 backdrop-blur-sm`}
              style={{
                left: card.left,
                fontSize: `${card.size}rem`,
                width: `${card.size * 1.5}rem`,
                height: `${card.size * 2}rem`,
              }}
            >
              {card.suit}
            </motion.div>
          ))}
        </div>

        {/* TV Static Overlay */}
        <div
          className="absolute inset-0 opacity-[0.03] z-[2] pointer-events-none mix-blend-overlay"
          style={{
            backgroundImage:
              'url("https://www.transparenttextures.com/patterns/stardust.png")',
          }}
        />

        <div className="timerBox">
          <div className="timerLabel">T-MINUS // SURVIVAL TICKER</div>
          <div className="timerValue">{timer}</div>
        </div>
        {/* HUD Elements */}
        {!isMobile && <div className="absolute top-5 left-10 z-20 font-mono text-[10px] md:text-sm text-red-500 tracking-[0.3em] uppercase">
          PLAYER ID: UNKNOWN <br />
          <span className="text-white">STATUS: IN_GAME</span>
        </div>}
        <div className="absolute top-5 right-5 md:right-auto md:items-center z-20">
          <img 
            src="/logo2.jpeg"
            alt="Player HUD Logo"
            className="w-32 md:w-48 lg:w-56 h-auto object-contain"
          />
        </div>

        {/* Main Title Content */}
        <div className="relative z-20 flex flex-col items-center justify-center w-full px-4 text-center pointer-events-none">
          {/* Subtitle */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="font-mono text-white/70 text-xs md:text-base tracking-[0.5em] mb-6 uppercase drop-shadow-[0_0_10px_white]"
          >
            Welcome to the Arena
          </motion.div>

          {/* CSS for text glitches */}
          <style
            dangerouslySetInnerHTML={{
              __html: `
            .glitch-word {
              position: relative;
              display: inline-block;
            }
            .glitch-word::before,
            .glitch-word::after {
              content: attr(data-text);
              position: absolute;
              top: 0;
              left: 0;
              width: 100%;
              height: 100%;
              opacity: 0.6;
              pointer-events: none;
            }
            @media (min-width: 640px) {
            .glitch-word::before {
              left: 3px;
              text-shadow: -2px 0 red;
              animation: glitch-anim-1 1s infinite linear alternate-reverse;
            }
            .glitch-word::after {
              left: -3px;
              text-shadow: -2px 0 cyan;
              animation: glitch-anim-2 3s infinite linear alternate-reverse;
            }

            @keyframes glitch-anim-1 {
              0% { clip-path: inset(20% 0 80% 0); transform: translate(-2px, 1px); }
              20% { clip-path: inset(60% 0 10% 0); transform: translate(2px, -1px); }
              40% { clip-path: inset(40% 0 50% 0); transform: translate(-2px, 2px); }
              60% { clip-path: inset(80% 0 5% 0); transform: translate(2px, -2px); }
              80% { clip-path: inset(10% 0 70% 0); transform: translate(-1px, 1px); }
              100% { clip-path: inset(30% 0 40% 0); transform: translate(1px, -1px); }
            }

            @keyframes glitch-anim-2 {
              0% { clip-path: inset(10% 0 60% 0); transform: translate(2px, -1px); }
              20% { clip-path: inset(30% 0 20% 0); transform: translate(-2px, 2px); }
              40% { clip-path: inset(70% 0 10% 0); transform: translate(2px, 1px); }
              60% { clip-path: inset(20% 0 50% 0); transform: translate(-1px, -2px); }
              80% { clip-path: inset(50% 0 30% 0); transform: translate(1px, 2px); }
              100% { clip-path: inset(5% 0 80% 0); transform: translate(-2px, -1px); }
            }
            }
          `,
            }}
          />

          {/* Title decorated with Cards and Glitch */}
          <motion.h1
            className="secondary-font text-4xl sm:text-5xl md:text-6xl lg:text-[7rem] xl:text-[8rem] font-black text-white uppercase mb-4 px-2 py-4 flex flex-wrap justify-center items-center gap-x-3 md:gap-x-4 lg:gap-x-6 leading-tight"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: "easeOut" }}
            style={{ textShadow: "0px 0px 20px rgba(0, 0, 0, 0.9)" }}
          >
            <span className="glitch-word" data-text="SYNERGY">
              SYNERGY
            </span>
            <span className="text-white/80 text-[0.7em] drop-shadow-md pb-2 md:pb-4">
              ♠
            </span>
            <span className="glitch-word" data-text="IN">
              IN
            </span>
            {/* <span className="text-red-600 text-[0.7em] drop-shadow-[0_0_15px_rgba(255,0,0,0.8)] pb-2 md:pb-4">♥</span> */}
            <span className="glitch-word" data-text="BORDERLAND">
              BORDERLAND
            </span>
          </motion.h1>
        </div>
      </motion.div>

      {/* Action / Warning box */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{
          opacity: isMobile ? (timelineStarted ? 0 : 1) : 1,
          y: isMobile ? (timelineStarted ? 40 : 0) : 0,
        }}
        transition={{ duration: 0.4 }}
        className={`
        ${isMobile ? "fixed bottom-18 left-1/2 -translate-x-1/2" : "absolute bottom-16 left-1/2 -translate-x-1/2"}
        z-50 cursor-pointer w-max
      `}
        onClick={() => {
          window.dispatchEvent(new Event("triggerTimeline"));
          const timeline =
            document.getElementById("timeline") ||
            document.querySelector(".tl-round");
          if (timeline) {
            const rect = timeline.getBoundingClientRect();
            const offset = window.innerHeight * 0.0001;
            window.scrollTo({
              top: window.scrollY + rect.top - offset,
              behavior: "smooth",
            });
          } else {
            window.scrollBy({
              top: window.innerHeight * 1.3,
              behavior: "smooth",
            });
          }
        }}
      >
        {/* Glowing border effects for the button */}
        <div className="absolute inset-0 border border-red-700/50 group-hover/btn:border-red-500 transition-colors duration-300"></div>
        <div className="absolute inset-0 bg-red-950/40 backdrop-blur-md"></div>

        <div className="relative px-8 md:px-12 py-3 md:py-4 flex items-center gap-4 group-hover/btn:bg-red-900/30 transition-colors duration-300">
          {!isMobile && <span className="text-red-500 animate-pulse">▼</span>}
          <p className="font-mono text-red-500 text-xs md:text-sm tracking-[0.4em] uppercase font-bold group-hover/btn:text-white transition-colors duration-300">
            {isMobile? "Scroll down":"Scroll down to survive"}
          </p>
          {!isMobile && <span className="text-red-500 animate-pulse">▼</span>}
        </div>
      </motion.div>
    </div>
  );
}
