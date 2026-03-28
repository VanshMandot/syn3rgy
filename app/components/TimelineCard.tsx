"use client";

import React, { useRef, useState } from "react";

export interface DayData {
  dayNumber: number;
  cardValue: string;
  cardImages: {
    "♠": string;
    "♥": string;
    "♦": string;
    "♣": string;
  };
  title: string;
  date: string;
  tagline: string;
  difficulty: string;
  events: { time: string; title: string; description: string }[];
}

interface Props {
  day: DayData;
}

export default function TimelineCard({ day }: Props) {
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
    // "fanned" phase
    if (isHovered) {
      // Collapse everything precisely behind the Club card, straightening them out perfectly
      return `translate(0px, 0px) rotate(0deg) scale(1.05)`;
    }
    
    // Default fanned state
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
                style={{ backfaceVisibility: "hidden", WebkitBackfaceVisibility: "hidden", transform: "rotateY(0deg)" }}
              >
                <img
                  src={(day.cardImages as any)[config.suit]}
                  alt={`${day.cardValue} of ${config.suit}`}
                  className="w-full h-full object-cover"
                  draggable={false}
                />
                
                {/* Optional glow overlay on the top card */}
                {config.suit === "♣" && (
                  <div 
                    className={`absolute inset-0 pointer-events-none transition-opacity duration-500 ${isHovered ? 'opacity-100 shadow-[0_0_40px_rgba(217,4,41,0.6)]' : 'opacity-0'}`} 
                  />
                )}
              </div>

              {/* Back Face (Facedown Image - 180deg) */}
              <div 
                className="absolute inset-0 w-full h-full rounded-[14px] overflow-hidden bg-[#0a0a0a] border-2 border-[var(--crimson)]/50"
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
          ))}
        </div>

        {/* Text Content */}
        <div className="cyber-glass w-full flex flex-col justify-center rounded-2xl relative overflow-hidden transition-all duration-1000 transform opacity-100 translate-y-0"
             style={{ maxWidth: '896px', minHeight: '400px', paddingTop: '3rem', paddingBottom: '3rem', paddingLeft: '5%', paddingRight: '5%' }}>
          
          {/* Subtle decoration lines */}
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[var(--crimson)] to-transparent opacity-60" />
          <div className="absolute top-0 w-1 h-12 bg-[var(--crimson)]/90 shadow-[0_0_15px_rgba(217,4,41,0.9)]" style={{ left: '1rem' }} />
          <div className="absolute bottom-0 w-1 h-12 bg-[var(--gold)]/90 shadow-[0_0_15px_rgba(255,214,10,0.9)]" style={{ right: '1rem' }} />

          <div className="relative z-10 w-full" style={{ paddingLeft: '3rem', paddingRight: '2rem' }}>
            {/* Header */}
            <div className="mb-6 border-b border-[var(--crimson)]/30 pb-4 relative">
              <div className="flex items-start justify-between gap-4 mb-3">
                <h2 
                  className="text-3xl sm:text-4xl md:text-5xl text-white font-black tracking-widest uppercase borderland-glow drop-shadow-[0_0_15px_rgba(217,4,41,0.6)]"
                  style={{ fontFamily: 'var(--font-cloister)' }}
                >
                  {day.title}
                </h2>
                <span
                  className="px-3 py-1 font-orbitron text-xs sm:text-sm tracking-widest uppercase font-extrabold border-2 rounded-sm bg-black/60 shadow-[0_0_10px_currentColor] flex-shrink-0 mt-1"
                  style={{ color: difficultyColors[day.difficulty] || "var(--crimson)", borderColor: difficultyColors[day.difficulty] || "var(--crimson)" }}
                >
                  {day.difficulty}
                </span>
              </div>
              
              <div className="flex flex-wrap items-center mb-3" style={{ gap: '1rem' }}>
                <span className="font-orbitron font-bold text-[var(--gold)] text-xs sm:text-sm tracking-widest uppercase mt-0.5 border-b border-[var(--gold)]/30 pb-1" style={{ paddingRight: '1rem' }}>
                  {day.date}
                </span>
              </div>
              <p className="text-gray-300 italic text-sm sm:text-base tracking-wide border-l-2 border-[var(--gold)]/80 mt-2 font-medium bg-[#0a0a0a]/40 rounded-r-md" style={{ paddingLeft: '1rem', paddingTop: '0.375rem', paddingBottom: '0.375rem' }}>
                &quot;{day.tagline}&quot;
              </p>
            </div>

            {/* Events Timeline */}
            <div className="mt-4" style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
              {day.events.map((event, idx) => (
                <div key={idx} className="flex group" style={{ gap: '1.5rem' }}>
                  {/* Time Stamp */}
                  <div className="text-right pt-2 flex-shrink-0" style={{ width: '4.5rem' }}>
                    <span className="font-orbitron font-black text-white/50 tracking-widest text-xs sm:text-sm group-hover:text-[var(--teal)] transition-colors duration-300 drop-shadow-[0_0_5px_rgba(0,0,0,1)]">
                      {event.time}
                    </span>
                  </div>
                  
                  {/* Graphic Node & Content */}
                  <div className="relative flex-1 flex" style={{ paddingBottom: '2rem' }}>
                    {/* Node Column (Spine) */}
                    <div className="relative flex-shrink-0" style={{ width: '2rem' }}>
                      {/* Vertical Line Connector */}
                      {idx !== day.events.length - 1 && (
                        <div className="absolute top-5 w-0.5 h-full bg-[var(--crimson)]/20 group-hover:bg-[var(--crimson)]/50 transition-colors" style={{ left: '7px' }} />
                      )}
                      {/* Glowing Node Dot */}
                      <div className="absolute top-2 w-4 h-4 rounded-full border-2 border-[var(--crimson)] bg-[#050508] z-10 transition-all duration-300 shadow-[0_0_10px_rgba(217,4,41,0.5)] group-hover:bg-[var(--crimson)] group-hover:scale-110" style={{ left: '0px' }} />
                    </div>
                    
                    {/* Expanded Event Text Column */}
                    <div className="flex-1 border-b border-transparent group-hover:border-white/5" style={{ paddingTop: '0.125rem', paddingBottom: '0.75rem', paddingLeft: '0.5rem' }}>
                      <h4 
                        className="text-lg sm:text-xl font-bold text-white tracking-wider leading-tight mb-1 group-hover:text-[var(--gold)] transition-colors duration-300 uppercase"
                        style={{ fontFamily: 'var(--font-cloister)', paddingLeft: '4px' }}
                      >
                        {event.title}
                      </h4>
                      <p className="text-[#a0a0a0] font-orbitron tracking-wide text-[10px] uppercase leading-relaxed font-bold" style={{ paddingLeft: '4px' }}>
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
