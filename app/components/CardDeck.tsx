"use client";

import React, { useEffect, useState } from "react";

interface Props {
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

export default function CardDeck({ images, onFlyingStart, onComplete }: Props) {
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
          prev.map((c, i) => ({
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
        pointerEvents: "none"
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
                transitionDuration: phase === "flying" ? "1.2s" : phase === "scattering" ? "1s" : phase === "split" ? "0.5s" : "0.6s",
                transitionTimingFunction: "cubic-bezier(0.25, 0.46, 0.45, 0.94)",
                boxShadow: isFacedown ? "0 10px 30px rgba(0,0,0,0.8)" : (card as any).boxShadow || "0 10px 40px rgba(0,0,0,0.6)",
                transformStyle: "preserve-3d",
              }}
            >
              {/* Front Face (Actual Card - 0deg) */}
              <div 
                className={`absolute inset-0 w-full h-full rounded-2xl overflow-hidden ${
                  card.isTitle ? "bg-transparent" : "bg-[#0a0a0a] border border-[var(--crimson)]"
                }`}
                style={{ backfaceVisibility: "hidden", WebkitBackfaceVisibility: "hidden", transform: "rotateY(0deg)" }}
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
                style={{ backfaceVisibility: "hidden", WebkitBackfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
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
