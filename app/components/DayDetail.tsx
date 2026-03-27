"use client";

import React from "react";

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

interface DayDetailProps {
  day: DayData | null;
  onClose: () => void;
}

export default function DayDetail({ day, onClose }: DayDetailProps) {
  if (!day) return null;

  const difficultyColors: Record<string, string> = {
    Easy: "var(--teal)",
    Medium: "var(--gold)",
    Hard: "var(--crimson)",
  };

  return (
    <div className="slide-in glass-panel p-6 sm:p-8 w-full max-w-lg relative">
      {/* Close button */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full
                   bg-white/5 hover:bg-white/10 transition-colors text-white/60 hover:text-white"
        aria-label="Close detail panel"
      >
        ✕
      </button>

      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center gap-3 mb-2">
          <span
            className="text-3xl"
            style={{ color: "var(--crimson)" }}
          >
            ♣
          </span>
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
        <h2 className="text-2xl sm:text-3xl font-bold neon-text mb-1">
          {day.title}
        </h2>
        <p
          className="text-sm font-medium"
          style={{ color: "var(--gold)" }}
        >
          {day.date}
        </p>
        <p className="text-sm text-white/50 mt-1 italic">
          &quot;{day.tagline}&quot;
        </p>
      </div>

      {/* Divider */}
      <div
        className="h-px w-full mb-6"
        style={{
          background:
            "linear-gradient(to right, transparent, var(--crimson), transparent)",
        }}
      />

      {/* Events */}
      <div className="space-y-4">
        {day.events.map((event, i) => (
          <div key={i} className="flex gap-4">
            {/* Time */}
            <div className="flex-shrink-0 w-20 text-right">
              <span
                className="text-sm font-mono font-semibold"
                style={{ color: "var(--teal)" }}
              >
                {event.time}
              </span>
            </div>

            {/* Dot + line */}
            <div className="flex flex-col items-center">
              <div
                className="w-3 h-3 rounded-full flex-shrink-0 mt-1"
                style={{
                  background: "var(--crimson)",
                  boxShadow: "0 0 8px rgba(230,57,70,0.5)",
                }}
              />
              {i < day.events.length - 1 && (
                <div
                  className="w-px flex-1 my-1"
                  style={{ background: "rgba(230,57,70,0.3)" }}
                />
              )}
            </div>

            {/* Content */}
            <div className="flex-1 pb-2">
              <h3 className="text-sm font-semibold text-white">
                {event.title}
              </h3>
              <p className="text-xs text-white/50 mt-0.5 leading-relaxed">
                {event.description}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Card badge at bottom */}
      <div className="mt-6 flex items-center justify-center gap-2">
        <span className="text-lg" style={{ color: "var(--crimson)" }}>
          ♣
        </span>
        <span
          className="text-xs font-mono uppercase tracking-widest"
          style={{ color: "var(--gold)" }}
        >
          {day.cardValue} of Clubs — Day {day.dayNumber}
        </span>
        <span className="text-lg" style={{ color: "var(--crimson)" }}>
          ♣
        </span>
      </div>
    </div>
  );
}
