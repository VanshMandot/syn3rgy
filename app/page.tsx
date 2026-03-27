"use client";

import React from "react";
import CardDeck from "./components/CardDeck";
import { DayData } from "./components/DayDetail";

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
        title: "Final Push",
        description: "Last hours to polish and fix bugs.",
      },
      {
        time: "10:00",
        title: "Code Freeze ❄️",
        description: "All submissions locked. Fate sealed.",
      },
      {
        time: "11:00",
        title: "Demo Presentations",
        description: "5 minutes each. Impress or be forgotten.",
      },
      {
        time: "14:00",
        title: "Deliberation",
        description: "Judges retreat. Tension rises.",
      },
      {
        time: "16:00",
        title: "The Verdict — Awards",
        description: "Winners crowned. The game ends… or does it?",
      },
    ],
  },
];

export default function Home() {
  return (
    <div className="relative min-h-screen flex flex-col">
      {/* Grid background */}
      <div className="bg-grid" />

      {/* Main content */}
      <div className="relative z-10 flex flex-col items-center w-full px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <header className="pt-12 sm:pt-16 pb-4 text-center">
          <div className="flex items-center justify-center gap-3 mb-3">
            <span className="text-3xl" style={{ color: "var(--crimson)" }}>
              ♣
            </span>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight neon-text">
              Synergy Timeline
            </h1>
            <span className="text-3xl" style={{ color: "var(--crimson)" }}>
              ♣
            </span>
          </div>
          <p
            className="text-sm sm:text-base font-mono tracking-widest uppercase"
            style={{ color: "var(--gold)" }}
          >
            Welcome to the Borderland
          </p>
          <p className="text-xs text-white/40 mt-2 max-w-md mx-auto">
            Scroll down to reveal your fate. Each card holds the schedule for one day of the game.
          </p>
        </header>

        {/* Timeline */}
        <main className="flex flex-col items-center w-full max-w-4xl pb-20">
          <CardDeck days={hackathonDays} />
        </main>

        {/* Footer */}
        <footer className="pb-8 text-center">
          <p className="text-xs text-white/20 font-mono">
            ♣ SYNERGY HACKATHON • ALICE IN BORDERLAND EDITION ♣
          </p>
        </footer>
      </div>
    </div>
  );
}
