"use client";

import React, { useRef, useEffect, useState } from "react";
import { DayData } from "./DayDetail";

interface CardProps {
  day: DayData;
  index: number;
}

export default function Card({ day, index }: CardProps) {
  const clubSuit = "♣";
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
    // If we have an image for this suit, render it
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
    // Otherwise render the old fallback CSS card
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
      {/* The playing card pack (scaled down perfectly for mobile) */}
      <div className="flex-shrink-0 flex items-center justify-center w-[250px] h-[300px] md:w-[380px] md:h-[460px]">
        <div className="card-visual relative origin-center scale-[0.65] md:scale-100" style={{ width: "380px", height: "460px" }}>
          {/* Background Cards */}
          {backgroundSuits.map((config, i) => (
            <div
              key={i}
              className="absolute rounded-2xl border-2 border-[var(--crimson)] bg-[#1a1a2e]"
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

          {/* Top Card (Clubs) */}
          <div
            className="absolute card-glow rounded-2xl border-2 border-[var(--crimson)] bg-[#1a1a2e]"
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

      {/* Revealed content — inline beside the card */}
      <div className={`card-content-panel ${isVisible ? "content-visible" : ""}`}>
        <div className="glass-panel p-6">
          {/* Title row */}
          <div className="flex items-center gap-3 mb-2">
            <h3 className="text-xl font-bold neon-text leading-tight">
              {day.title}
            </h3>
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

          <p
            className="text-sm font-medium mb-1"
            style={{ color: "var(--gold)" }}
          >
            {day.date}
          </p>
          <p className="text-sm text-white/50 italic mb-3">
            &quot;{day.tagline}&quot;
          </p>

          {/* Divider */}
          <div
            className="h-px w-full mb-4"
            style={{
              background:
                "linear-gradient(to right, transparent, var(--crimson), transparent)",
            }}
          />

          {/* Event list */}
          <div className="space-y-3">
            {day.events.map((event, i) => (
              <div key={i} className="flex items-start gap-2">
                <span
                  className="text-sm font-mono font-semibold flex-shrink-0 mt-0.5"
                  style={{ color: "var(--teal)" }}
                >
                  {event.time}
                </span>
                <div
                  className="w-2 h-2 rounded-full flex-shrink-0 mt-1.5"
                  style={{
                    background: "var(--crimson)",
                  }}
                />
                <span className="text-sm text-white/80 leading-tight">
                  {event.title}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
