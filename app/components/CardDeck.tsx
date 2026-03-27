"use client";

import React, { useState, useEffect, useRef } from "react";
import Card from "./Card";
import { DayData } from "./DayDetail";

interface CardDeckProps {
  days: DayData[];
}

// Animation phases
type Phase = "stacked" | "shuffling" | "dealing" | "dealt";

// Card animation state
interface AnimCard {
  x: number;
  y: number;
  rotation: number;
  zIndex: number;
  scale: number;
  opacity: number;
}

// Easing functions
function easeInOutCubic(t: number): number {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

function easeOutBack(t: number): number {
  const c1 = 1.70158;
  const c3 = c1 + 1;
  return 1 + c3 * Math.pow(t - 1, 3) + c1 * Math.pow(t - 1, 2);
}

const TOTAL_DECK = 12;
const CARD_W = 300;
const CARD_H = 420;

export default function CardDeck({ days }: CardDeckProps) {
  const [phase, setPhase] = useState<Phase>("stacked");
  const [deckCards, setDeckCards] = useState<AnimCard[]>([]);
  const [dealPositions, setDealPositions] = useState<AnimCard[]>([]);
  const animFrameRef = useRef<number>(0);

  // Initialize stacked deck
  useEffect(() => {
    const cards: AnimCard[] = [];
    for (let i = 0; i < TOTAL_DECK; i++) {
      cards.push({
        x: 0,
        y: -i * 0.8,
        rotation: (Math.random() - 0.5) * 2,
        zIndex: i,
        scale: 1,
        opacity: 1,
      });
    }
    setDeckCards(cards);
    const timer = setTimeout(() => setPhase("shuffling"), 600);
    return () => clearTimeout(timer);
  }, []);

  // ===== SHUFFLE ANIMATION =====
  useEffect(() => {
    if (phase !== "shuffling") return;

    const cards = [...deckCards];
    const duration = 1800;
    const splitDuration = 500;
    const mergeDuration = 1000;
    const settleDuration = 300;
    let startTime: number | null = null;

    const piles: ("left" | "right")[] = cards.map(() =>
      Math.random() > 0.5 ? "left" : "right"
    );

    const leftIndices = piles
      .map((p, i) => (p === "left" ? i : -1))
      .filter((i) => i >= 0);
    const rightIndices = piles
      .map((p, i) => (p === "right" ? i : -1))
      .filter((i) => i >= 0);

    function animate(timestamp: number) {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;

      const newCards = cards.map((card, i) => {
        const pile = piles[i];
        const pileOffset = pile === "left" ? -1 : 1;

        if (elapsed < splitDuration) {
          const t = easeInOutCubic(elapsed / splitDuration);
          return {
            ...card,
            x: pileOffset * 100 * t,
            y: -i * 0.8 + (Math.random() - 0.5) * 2 * t,
            rotation: pileOffset * 8 * t + (Math.random() - 0.5) * 3 * t,
            zIndex: i,
            scale: 1,
            opacity: 1,
          };
        } else if (elapsed < splitDuration + mergeDuration) {
          const mergeT = (elapsed - splitDuration) / mergeDuration;
          const cardDelay = (i / cards.length) * 0.6;
          const cardT = Math.max(0, Math.min(1, (mergeT - cardDelay) / 0.4));
          const smoothT = easeInOutCubic(cardT);
          const leftIdx = leftIndices.indexOf(i);
          const rightIdx = rightIndices.indexOf(i);
          const newZ =
            leftIdx >= 0 ? leftIdx * 2 : rightIdx >= 0 ? rightIdx * 2 + 1 : i;

          return {
            ...card,
            x: pileOffset * 100 * (1 - smoothT),
            y: -(newZ * 0.8) * smoothT + (-i * 0.8) * (1 - smoothT),
            rotation:
              (pileOffset * 8 + (Math.random() - 0.5) * 3) * (1 - smoothT),
            zIndex: Math.round(newZ * smoothT + i * (1 - smoothT)),
            scale: 1,
            opacity: 1,
          };
        } else if (elapsed < duration) {
          const settleT = easeInOutCubic(
            (elapsed - splitDuration - mergeDuration) / settleDuration
          );
          const leftIdx = leftIndices.indexOf(i);
          const rightIdx = rightIndices.indexOf(i);
          const newZ =
            leftIdx >= 0 ? leftIdx * 2 : rightIdx >= 0 ? rightIdx * 2 + 1 : i;

          return {
            ...card,
            x: 0,
            y: -newZ * 0.8 * (1 - settleT * 0.5),
            rotation: (Math.random() - 0.5) * 1 * (1 - settleT),
            zIndex: newZ,
            scale: 1,
            opacity: 1,
          };
        }
        return card;
      });

      setDeckCards(newCards);

      if (elapsed < duration) {
        animFrameRef.current = requestAnimationFrame(animate);
      } else {
        setPhase("dealing");
      }
    }

    animFrameRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animFrameRef.current);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phase]);

  // ===== DEAL ANIMATION =====
  useEffect(() => {
    if (phase !== "dealing") return;

    const duration = 1200;
    let startTime: number | null = null;

    // Cards deal to vertical positions — we just need them centered, layout handled by CSS
    const gap = CARD_H + 140; // card height + generous gap for content
    const targets = [
      { x: 0, y: 0, rotation: 0 },
      { x: 0, y: gap, rotation: 0 },
      { x: 0, y: gap * 2, rotation: 0 },
    ];

    function animate(timestamp: number) {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;

      const finalPositions: AnimCard[] = targets.map((target, i) => {
        const delay = i * 200;
        const cardElapsed = Math.max(0, elapsed - delay);
        const t = Math.min(1, cardElapsed / (duration - delay));
        const smoothT = easeOutBack(t);

        const arcHeight = -120 - i * 30;
        const arcY = arcHeight * Math.sin(Math.PI * t);
        const spinRotation = 360 * (1 - t) * (i % 2 === 0 ? 1 : -1);

        return {
          x: target.x * smoothT,
          y: target.y * smoothT + arcY * (1 - t),
          rotation: spinRotation * (1 - smoothT),
          zIndex: 100 + i,
          scale: 0.6 + 0.4 * smoothT,
          opacity: Math.min(1, t * 3),
        };
      });

      setDealPositions(finalPositions);

      setDeckCards((prev) =>
        prev.map((card) => ({
          ...card,
          opacity: Math.max(0, 1 - elapsed / 600),
          scale: Math.max(0.5, 1 - elapsed / 2000),
        }))
      );

      if (elapsed < duration + 200) {
        animFrameRef.current = requestAnimationFrame(animate);
      } else {
        setDealPositions(
          targets.map((target, i) => ({
            x: target.x,
            y: target.y,
            rotation: 0,
            zIndex: 100 + i,
            scale: 1,
            opacity: 1,
          }))
        );
        setDeckCards([]);
        setPhase("dealt");
      }
    }

    animFrameRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animFrameRef.current);
  }, [phase]);

  const handleReshuffle = React.useCallback(() => {
    setPhase("stacked");
    setDealPositions([]);
    setDeckCards([]);
    const cards: AnimCard[] = [];
    for (let i = 0; i < TOTAL_DECK; i++) {
      cards.push({
        x: 0,
        y: -i * 0.8,
        rotation: (Math.random() - 0.5) * 2,
        zIndex: i,
        scale: 1,
        opacity: 1,
      });
    }
    setDeckCards(cards);
    setTimeout(() => setPhase("shuffling"), 400);
  }, []);

  const isDealt = phase === "dealt";

  return (
    <div className="relative flex flex-col items-center justify-center origin-center scale-[0.55] sm:scale-[0.75] md:scale-100">
      {/* Shuffle + deal animation area */}
      {!isDealt && (
        <div
          className="relative"
          style={{
            width: `${CARD_W + 240}px`,
            height: `${CARD_H + 40}px`,
          }}
        >
          {deckCards.map((card, i) => (
            <div
              key={`deck-${i}`}
              className="absolute rounded-2xl"
              style={{
                width: `${CARD_W}px`,
                height: `${CARD_H}px`,
                left: "50%",
                top: "50%",
                transform: `translate(-50%, -50%) translate(${card.x}px, ${card.y}px) rotate(${card.rotation}deg) scale(${card.scale})`,
                zIndex: card.zIndex,
                opacity: card.opacity,
                transition: phase === "stacked" ? "all 0.3s ease" : "none",
              }}
            >
              <div
                className="w-full h-full rounded-2xl border-2 border-[var(--crimson)] card-back-pattern"
                style={{ boxShadow: "0 4px 20px rgba(0,0,0,0.4)" }}
              >
                <div className="w-full h-full flex items-center justify-center">
                  <div
                    className="text-4xl"
                    style={{
                      color: "var(--crimson)",
                      opacity: 0.6,
                      filter: "drop-shadow(0 0 6px rgba(230,57,70,0.3))",
                    }}
                  >
                    ♣
                  </div>
                </div>
              </div>
            </div>
          ))}

          {dealPositions.map((pos, i) => {
            if (i >= days.length) return null;
            const day = days[i];
            return (
              <div
                key={`deal-${day.dayNumber}`}
                className="absolute"
                style={{
                  left: "50%",
                  top: 0,
                  transform: `translate(-50%, 0) translate(${pos.x}px, ${pos.y}px) rotate(${pos.rotation}deg) scale(${pos.scale})`,
                  zIndex: pos.zIndex,
                  opacity: pos.opacity,
                }}
              >
                {day.cardImages?.["♣"] ? (
                  <div
                    className="card-glow relative rounded-2xl overflow-hidden border-2 border-[var(--crimson)]"
                    style={{ width: `${CARD_W}px`, height: `${CARD_H}px` }}
                  >
                    <img
                      src={day.cardImages["♣"]}
                      alt={`${day.cardValue} of Clubs`}
                      className="w-full h-full object-cover rounded-2xl"
                      draggable={false}
                    />
                  </div>
                ) : (
                  <div
                    className="card-glow relative rounded-2xl border-2 border-[var(--crimson)]"
                    style={{ width: `${CARD_W}px`, height: `${CARD_H}px` }}
                  >
                    <div
                      className="absolute inset-0 rounded-2xl flex flex-col justify-between p-3"
                      style={{
                        background:
                          "linear-gradient(145deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)",
                      }}
                    >
                      <div className="flex flex-col items-start leading-none">
                        <span className="text-xl font-bold" style={{ color: "var(--crimson)" }}>
                          {day.cardValue}
                        </span>
                        <span className="text-lg" style={{ color: "var(--crimson)" }}>♣</span>
                      </div>
                      <div className="flex flex-col items-center justify-center flex-1">
                        <span
                          className="text-4xl mb-1"
                          style={{
                            color: "var(--crimson)",
                          }}
                        >
                          ♣
                        </span>
                        <span
                          className="text-[10px] font-semibold tracking-[0.25em] uppercase mt-1"
                          style={{ color: "var(--gold)" }}
                        >
                          Day {day.dayNumber}
                        </span>
                      </div>
                      <div className="flex flex-col items-end leading-none rotate-180">
                        <span className="text-xl font-bold" style={{ color: "var(--crimson)" }}>
                          {day.cardValue}
                        </span>
                        <span className="text-lg" style={{ color: "var(--crimson)" }}>♣</span>
                      </div>
                      <div
                        className="absolute inset-2 rounded-xl border pointer-events-none"
                        style={{ borderColor: "rgba(230, 57, 70, 0.15)" }}
                      />
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* After dealt: scrollable card list with inline content */}
      {isDealt && (
        <div className="dealt-cards-container">
          {days.map((day, i) => (
            <Card key={day.dayNumber} day={day} index={i} />
          ))}

          {/* Reshuffle button */}
          <button
            onClick={handleReshuffle}
            className="mt-8 px-5 py-2 rounded-full text-xs font-mono uppercase tracking-widest
                       border border-[var(--crimson)] text-[var(--crimson)]
                       hover:bg-[var(--crimson)] hover:text-white
                       transition-all duration-300 cursor-pointer mx-auto block"
            style={{
              opacity: 0,
              animation: "fadeIn 0.5s ease 0.8s forwards",
            }}
          >
            ♣ Reshuffle
          </button>
        </div>
      )}
    </div>
  );
}
