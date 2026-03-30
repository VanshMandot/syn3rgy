import React from 'react';

export default function HomePage() {
  return (
    <div className="w-screen h-screen bg-[#050000] flex flex-col items-center justify-center font-mono text-white select-none relative overflow-hidden">
      {/* Heavy Red Center Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,0,0,0.15)_0%,transparent_60%)] pointer-events-none animate-pulse" />
      
      {/* Background static texture */}
      <div className="absolute inset-0 opacity-[0.05] pointer-events-none mix-blend-overlay" style={{ backgroundImage: 'url("https://www.transparenttextures.com/patterns/stardust.png")' }} />

      <div className="z-10 flex flex-col items-center">
        <span className="text-red-600 text-6xl md:text-8xl mb-8 drop-shadow-[0_0_30px_red] animate-pulse">♠</span>
        <h1 className="text-2xl md:text-5xl tracking-[0.6em] text-center drop-shadow-[0_0_10px_white] uppercase ml-[0.3em]">Botherland</h1>
        <p className="mt-6 text-red-500/80 tracking-[0.3em] text-xs md:text-sm text-center uppercase">Location: Shibuya Crossing<br/>Visa: Authorized</p>
        
        <div className="mt-16 px-10 py-4 border border-red-700 bg-red-950/30 text-red-500 text-xs md:text-sm tracking-[0.4em] shadow-[0_0_20px_rgba(255,0,0,0.3)] backdrop-blur-sm">
          GAME STATUS: IN PROGRESS
        </div>
      </div>
    </div>
  );
}
