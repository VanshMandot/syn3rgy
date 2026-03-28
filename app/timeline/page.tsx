"use client";

import "./timeline.css";
import React, { useState, useEffect } from "react";
import TimelineCard, { DayData } from "./components/TimelineCard";
import CardDeck from "./components/CardDeck";

const hackathonDays: DayData[] = [
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

export default function BorderlandTimeline() {
  const [introDone, setIntroDone] = useState(false);
  const [headerVisible, setHeaderVisible] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  
  useEffect(() => {
    setIsMounted(true);
    // Force the browser to reset scroll position on reload
    if (typeof window !== "undefined") {
      // Disable native browser scroll restoration
      if ('scrollRestoration' in window.history) {
        window.history.scrollRestoration = 'manual';
      }
      
      // Fire slightly after paint to override Next.js routing scroll behaviors
      setTimeout(() => {
        window.scrollTo({ top: 0, left: 0, behavior: "instant" });
        document.documentElement.scrollTop = 0;
        document.body.scrollTop = 0;
      }, 50);
    }
  }, []);
  
  // Extract all 12 card images to pass into the intro deck shuffle
  const allCardImages = hackathonDays.flatMap(day => Object.values(day.cardImages));

  return (
    <>
      {!introDone && (
        <CardDeck 
          images={allCardImages} 
          onFlyingStart={() => setHeaderVisible(true)}
          onComplete={() => setIntroDone(true)} 
        />
      )}
      
      <main className="snap-container bg-[#050508] relative overflow-hidden">
        {/* Cinematic Background Elements */}
        <div className="bg-blur-image pulse-opacity" />
        <div className="bg-vignette" />
        <div className="bg-scanlines" />

        {/* Particles */}
        <div className="fixed inset-0 overflow-hidden pointer-events-none z-10 w-full h-full">
          {isMounted && ["♠", "♥", "♦", "♣", "♠", "♥", "♦", "♣", "♠", "♥"].map((suit, i) => (
            <div
              key={i}
              className="particle font-serif"
              style={{
                left: `${Math.random() * 100}vw`,
                animationDelay: `${Math.random() * 15}s`,
                animationDuration: `${15 + Math.random() * 10}s`,
                fontSize: `${20 + Math.random() * 30}px`,
                color: suit === "♥" || suit === "♦" ? "rgba(217,4,41,0.6)" : "rgba(255,255,255,0.2)",
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
            <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold text-white borderland-glow tracking-widest text-shadow uppercase">
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
      </main>
    </>
  );
}
