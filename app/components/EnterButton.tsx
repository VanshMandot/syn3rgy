"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

interface EnterButtonProps {
  showButton: boolean;
  onClick?: () => void;
  className?: string;
}

export function EnterButton({ showButton, onClick, className = '' }: EnterButtonProps) {
  const [displayText, setDisplayText] = useState("ENTER THE GAME");
  const [isExiting, setIsExiting] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (!showButton) return;

    const texts = ["ENTER THE GAME", "SYSTEM READY", "ACCESS GRANTED"];
    let index = 0;

    const intervalId = setInterval(() => {
      index = (index + 1) % texts.length;
      setDisplayText(texts[index]);
    }, 100);

    const timeoutId = setTimeout(() => {
      clearInterval(intervalId);
      setDisplayText("ENTER THE GAME");
    }, 1000);

    return () => {
      clearInterval(intervalId);
      clearTimeout(timeoutId);
    };
  }, [showButton]);

  const handleEnterClick = () => {
    setIsExiting(true);
    if (onClick) onClick();
    
    // Synthesize a high-tech 'Alice in Botherland' Game Registration sound
    try {
      const AudioContextCtor = window.AudioContext || (window as any).webkitAudioContext;
      const ctx = new AudioContextCtor();

      const playTone = (freq: number, type: OscillatorType, startTime: number, duration: number, glideTo?: number) => {
        const osc = ctx.createOscillator();
        const gainNode = ctx.createGain();
        
        osc.type = type;
        osc.frequency.setValueAtTime(freq, startTime);
        if (glideTo) {
          osc.frequency.exponentialRampToValueAtTime(glideTo, startTime + duration);
        }

        gainNode.gain.setValueAtTime(0, startTime);
        gainNode.gain.linearRampToValueAtTime(0.3, startTime + 0.02);
        gainNode.gain.exponentialRampToValueAtTime(0.01, startTime + duration);

        osc.connect(gainNode);
        gainNode.connect(ctx.destination);
        
        osc.start(startTime);
        osc.stop(startTime + duration);
      };

      // 1. Double robotic terminal beep ("Registration Confirmed")
      playTone(880, 'square', ctx.currentTime, 0.1);
      playTone(1760, 'square', ctx.currentTime + 0.12, 0.2);
      
      // 2. Heavy digital slam / game drop instantly following the confirm
      playTone(150, 'sawtooth', ctx.currentTime + 0.25, 0.8, 10);
    } catch (e) {
      console.warn("AudioContext synthesis failed", e);
    }

    // Trigger the background audio with the entrance animation
    window.dispatchEvent(new CustomEvent("start-bg-audio"));

    setTimeout(() => {
      router.push("/timeline");
    }, 500);
  };

  if (!showButton) return null;

  return (
    <>
      <style>{`
        @keyframes float-hud {
          0%, 100% { transform: perspective(1000px) rotateX(15deg) rotateY(-5deg) translateZ(0); box-shadow: 20px 30px 40px rgba(255,0,0,0.2), inset 0 0 10px rgba(255,0,0,0.5); }
          50% { transform: perspective(1000px) rotateX(20deg) rotateY(10deg) translateZ(30px) scale(1.02); box-shadow: -20px 40px 60px rgba(255,0,0,0.4), inset 0 0 20px rgba(255,0,0,0.8); }
        }
        @keyframes border-glow-pulse {
          0%, 100% { border-color: rgba(255, 0, 0, 0.4); text-shadow: 0 0 5px rgba(255,0,0,0.3); }
          50% { border-color: rgba(255, 0, 0, 1); text-shadow: 0 0 15px rgba(255,0,0,0.9); }
        }
        .btn-3d {
          animation: float-hud 6s ease-in-out infinite, border-glow-pulse 3s infinite;
        }
      `}</style>
      <div className={`absolute inset-0 flex items-center justify-center pointer-events-none p-4 z-50 ${className}`}>
        
        {/* Terminal Environment Backdrop Replace */}
        <div className={`absolute inset-0 -z-10 transition-opacity duration-1000 ${isExiting ? 'opacity-0' : 'opacity-100'}`}>
          <Image src="/bg-terminal.webp" className="absolute inset-0 w-full h-full object-cover opacity-60" alt="Cyberpunk Control Terminal" fill style={{ objectFit: 'cover' }} />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0000] via-transparent to-[#0a0000] opacity-80" />
        </div>

        {/* Holographic AR Player Terminal */}
        <div className={`pointer-events-auto bg-black/70 border border-red-800/80 rounded-xl p-6 md:p-10 flex flex-col items-center gap-6 shadow-[0_0_50px_rgba(255,0,0,0.3)] backdrop-blur-md transition-all duration-700 w-full max-w-[22rem] md:max-w-md ${
            isExiting ? 'animate-glitch pointer-events-none opacity-0 !duration-500 scale-125 blur-lg' : 'btn-3d'
          }`}>
          
          {/* Header */}
          <div className="flex flex-col items-center w-full border-b border-red-900/50 pb-4 relative">
            <span className="text-red-500 text-3xl md:text-4xl mb-3 animate-pulse drop-shadow-[0_0_10px_red]">♠</span>
            <p className="secondary-font text-red-500/80 text-[9px] md:text-xs tracking-[0.3em] uppercase">Device Authorized</p>
            <span className="primary-font text-white text-lg md:text-2xl tracking-[0.4em] md:tracking-[0.5em] uppercase mt-2 drop-shadow-[0_0_10px_red]">Face Card</span>
            <div className="absolute top-0 right-0 w-2 h-2 bg-red-600 rounded-full animate-ping" />
          </div>

          {/* Time/Status HUD */}
          <div className="w-full flex justify-between px-2 text-red-500/60 font-mono text-[9px] md:text-xs tracking-widest uppercase">
            <span>Stage: Final</span>
            <span className="animate-pulse">12:00:00</span>
          </div>

          {/* The Button */}
          <button 
            onClick={handleEnterClick}
            className="primary-font w-full bg-gradient-to-r from-red-950 via-red-800 to-red-950 tracking-[0.3em] md:tracking-[0.4em] text-white text-[10px] md:text-sm uppercase hover:from-red-600 hover:via-red-500 hover:to-red-600 shadow-[0_0_15px_rgba(255,0,0,0.4)] hover:shadow-[0_0_40px_rgba(255,0,0,1)] border border-red-500 transition-all duration-300 relative overflow-hidden group"
            style={{ padding: '20px 40px' }}
          >
            <span className="relative z-10 whitespace-nowrap">{displayText}</span>
            <div className="absolute top-0 left-[-100%] w-full h-[1px] bg-white group-hover:left-[100%] transition-all duration-1000 ease-in-out infinite shadow-[0_0_10px_white]" />
          </button>
          
          {/* Footer Stats/Sensors */}
          <div className="flex w-full justify-between items-center mt-2 border-t border-red-900/50 pt-4">
            <div className="flex gap-2">
              <div className="w-8 h-1 bg-red-600/20"><div className="w-2/3 h-full bg-red-600 animate-pulse"/></div>
              <div className="w-8 h-1 bg-red-600/20"><div className="w-full h-full bg-red-600"/></div>
              <div className="w-8 h-1 bg-red-600/20"><div className="w-1/3 h-full bg-red-600"/></div>
            </div>
            <p className="text-red-700/80 font-mono text-[8px] tracking-widest">ID: ALICE-001</p>
          </div>

        </div>
      </div>
    </>
  );
}
