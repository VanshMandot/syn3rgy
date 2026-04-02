"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { VideoLayer } from "./components/VideoLayer";
import { GlitchOverlay } from "./components/GlitchOverlay";
import { EnterButton } from "./components/EnterButton";

export default function Home() {
  const router = useRouter();
  const [hasStarted, setHasStarted] = useState(false);
  const [isFlipped, setIsFlipped] = useState(false);
  const [startVideo, setStartVideo] = useState(false);
  const [showButton, setShowButton] = useState(false);
  const [glitch, setGlitch] = useState(false);

  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (!hasStarted) return;
    const videoTimer = setTimeout(() => setStartVideo(true), 1000);
    return () => clearTimeout(videoTimer);
  }, [hasStarted]);

  useEffect(() => {
    if (startVideo && videoRef.current) {
      videoRef.current.muted = false;
      videoRef.current.play().catch((error) => {
        console.warn("Video autoplay prevented:", error);
      });
    }
  }, [startVideo]);

  const handleVideoEnded = () => {
    setGlitch(true);
    setTimeout(() => {
      setShowButton(true);
    }, 800);
  };

  if (!hasStarted) {
    return (
      <div className="relative w-screen h-screen bg-[#050000] flex flex-col items-center justify-center font-sans select-none overflow-hidden">
        <style>{`
          @keyframes grid-move {
            0% { transform: rotateX(80deg) translateY(0); }
            100% { transform: rotateX(80deg) translateY(100px); }
          }
          @keyframes float-card {
            0%, 100% { transform: translateY(0) rotateX(10deg) rotateY(-5deg); }
            50% { transform: translateY(-20px) rotateX(15deg) rotateY(5deg); }
          }
          @keyframes radar-sweep {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
          @keyframes tv-static {
            0%, 100% { transform: translate(0,0); }
            20% { transform: translate(-1%,1%); }
            40% { transform: translate(1%,-1%); }
            60% { transform: translate(-2%,2%); }
            80% { transform: translate(2%,-2%); }
          }
          .animate-grid { animation: grid-move 3s linear infinite; }
          .animate-float-card { animation: float-card 6s ease-in-out infinite; transform-style: preserve-3d; }
          .animate-radar { animation: radar-sweep 12s linear infinite; }
          .animate-static { animation: tv-static 0.1s infinite; }
          
          .card-wrapper {
            perspective: 2000px;
          }
          .card-inner {
            transition: transform 1s cubic-bezier(0.175, 0.885, 0.32, 1.275);
            transform-style: preserve-3d;
          }
          .card-inner.flipped {
            transform: rotateY(180deg) scale(1.05);
          }
          .card-face {
            backface-visibility: hidden;
            -webkit-backface-visibility: hidden;
          }
          .card-back {
            transform: rotateY(180deg) translateZ(1px);
          }
        `}</style>

        {/* Dynamic Dystopian Sky & Background */}
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none bg-[#050000]">
          <img src="/bg-city.png" className="absolute inset-0 w-full h-full object-cover opacity-60 contrast-125 saturate-150" alt="Cyberpunk City" />

          {/* Deep Blood-Red Sun/Glow */}
          <div className="absolute top-[-30%] left-1/2 -translate-x-1/2 w-[200vw] h-[200vw] md:w-[100vw] md:h-[100vw] bg-[radial-gradient(circle,rgba(255,0,0,0.5)_0%,transparent_60%)] animate-pulse mix-blend-overlay" />

          {/* Endless Sweeping Radar/Searchlight */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200vw] h-[200vw] bg-[conic-gradient(from_0deg,transparent_0deg,rgba(255,0,0,0.3)_90deg,transparent_100deg)] animate-radar opacity-80 mix-blend-screen" />

          {/* Shimmering TV Static overlay */}
          <div className="absolute -inset-[100%] opacity-[0.05] z-0 pointer-events-none mix-blend-overlay animate-static" style={{ backgroundImage: 'url("https://www.transparenttextures.com/patterns/stardust.png")' }} />
        </div>

        {/* 3D Laser Grid Floor */}
        <div className="absolute inset-0 z-10 bg-[radial-gradient(circle_at_center,transparent_20%,#050000_80%)] pointer-events-none" />
        <div className="absolute bottom-[-60vh] left-[-50vw] w-[200vw] h-[150vh] opacity-40 pointer-events-none z-0 animate-grid"
          style={{
            backgroundImage: 'linear-gradient(to right, #f00 2px, transparent 2px), linear-gradient(to bottom, #f00 2px, transparent 2px)',
            backgroundSize: '100px 100px',
            transformOrigin: 'top center'
          }}
        />

        <div className="absolute top-8 w-full flex justify-between items-center px-8 md:px-12 text-red-600/70 font-mono text-xs md:text-sm tracking-[0.3em] uppercase z-10 drop-shadow-[0_0_8px_red]">
          <span>Tokyo Metropolitan</span>
          <span className="animate-pulse flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-red-600 shadow-[0_0_10px_red]"></span>
            Population: 0
          </span>
        </div>

        {/* Floating Card Wrapper */}
        <div className="z-20 flex flex-col items-center card-wrapper">
          <div className="animate-float-card flex items-center justify-center">

            <div
              onClick={() => setIsFlipped(!isFlipped)}
              onTouchEnd={(e) => {
                e.preventDefault();
                setIsFlipped(!isFlipped);
              }}
              className={`relative w-72 h-[28rem] md:w-80 md:h-[32rem] cursor-pointer shadow-[0_30px_50px_rgba(255,0,0,0.1)] card-inner ${isFlipped ? 'flipped' : 'hover:scale-[1.02] hover:shadow-[0_0_50px_rgba(255,0,0,0.5)] transition-transform duration-300'}`}
            >
              {/* --- FRONT OF CARD --- */}
              <div className="card-face absolute inset-0 bg-black/90 border-[3px] border-red-900/80 rounded-2xl flex flex-col justify-between shadow-[inset_0_0_50px_rgba(255,0,0,0.1)] overflow-hidden pb-8">
                {/* Crown aligned at center-top */}
                <div className="absolute top-2 left-1/2 -translate-x-1/2 text-6xl md:text-7xl text-red-600/40 drop-shadow-[0_0_15px_rgba(255,0,0,0.5)] z-0">
                  ♛
                </div>

                {/* Vintage Card Details */}
                <div className="absolute top-5 left-5 text-red-600/90 text-2xl md:text-3xl font-serif leading-none text-center drop-shadow-[0_0_15px_rgba(255,0,0,0.8)] z-10">
                  K<br /><span className="text-xl md:text-2xl pt-1 block">♥</span>
                </div>
                <div className="absolute bottom-5 right-5 text-red-600/90 text-2xl md:text-3xl font-serif leading-none text-center rotate-180 drop-shadow-[0_0_15px_rgba(255,0,0,0.8)] z-10">
                  K<br /><span className="text-xl md:text-2xl pt-1 block">♥</span>
                </div>

                {/* Absolute Center: Big Heart + "King of Hearts" + "VISA: Unlimited" */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center justify-center w-full z-10">
                  <div className={`text-red-600 text-[10rem] md:text-[11rem] leading-none drop-shadow-[0_0_35px_rgba(255,0,0,0.7)] transition-transform duration-500 ${isFlipped ? 'scale-110' : ''}`}>
                    ♥
                  </div>
                  <h2 className="text-white font-mono tracking-[0.4em] text-lg md:text-xl uppercase drop-shadow-[0_0_8px_white] mt-4 text-center">
                    King of Hearts
                  </h2>
                  <p className="text-red-500 font-mono text-[10px] md:text-xs tracking-[0.25em] opacity-80 uppercase mt-2 text-center">
                    Visa: Unlimited
                  </p>
                </div>

                {/* Bottom Section - Anchored to absolute bottom */}
                <div className="absolute bottom-8 flex flex-col items-center w-full px-6 z-10">
                  {/* Scanline/Authorization button simulation */}
                  <div className="relative overflow-hidden border border-red-900/60 bg-red-900/10 px-8 py-3 md:px-14 md:py-4 rounded-sm shadow-[0_0_10px_rgba(255,0,0,0.2)]">
                    <div className="absolute inset-0 bg-red-500/10 animate-pulse pointer-events-none"></div>
                    <span className="text-red-500/90 font-mono text-[10px] md:text-xs tracking-[0.3em] uppercase">
                      {isFlipped ? "Authorized" : "Tap to Authorize"}
                    </span>
                  </div>
                </div>
              </div>

              {/* --- BACK OF CARD --- */}
              <div className="card-face card-back absolute inset-0 bg-gradient-to-b from-[#1a0000] to-red-950 border-[3px] border-red-600 rounded-2xl flex flex-col items-center justify-center shadow-[0_0_60px_rgba(255,0,0,0.5)] overflow-hidden">
                {/* Diagonal caution stripes */}
                <div className="absolute inset-0 bg-[repeating-linear-gradient(45deg,transparent,transparent_15px,rgba(0,0,0,0.5)_15px,rgba(0,0,0,0.5)_30px)] pointer-events-none" />
                
                {/* Glowing Core */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-red-600/20 blur-[50px] rounded-full pointer-events-none"></div>

                <div className="flex flex-col items-center justify-center z-10 space-y-6 flex-grow pt-10">
                  <span className="text-red-100 text-[6rem] md:text-[7rem] leading-none animate-pulse drop-shadow-[0_0_20px_red]">☠</span>
                  
                  <div className="flex flex-col items-center gap-2">
                    <h2 className="text-white font-mono tracking-[0.3em] md:tracking-[0.4em] text-xl uppercase text-center drop-shadow-[0_0_10px_white]">System Override</h2>
                    <p className="text-red-500/80 font-mono text-[10px] tracking-[0.2em] uppercase">Security Breach Detected</p>
                  </div>
                </div>

                <div className="absolute bottom-4 w-full flex justify-center z-20">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setHasStarted(true);
                    }}
                    onTouchEnd={(e) => {
                      e.stopPropagation();
                      e.preventDefault();
                      setHasStarted(true);
                    }}
                    className={`relative border border-red-500/80 bg-red-950/40 px-10 py-3 md:px-16 md:py-4 backdrop-blur-sm transition-all duration-300 hover:bg-red-900/60 hover:scale-105 hover:shadow-[0_0_30px_rgba(255,0,0,0.8)] focus:outline-none focus:ring-2 focus:ring-red-500 overflow-hidden group ${
                      isFlipped ? 'opacity-100 pointer-events-auto translate-y-0' : 'opacity-0 pointer-events-none translate-y-4 disabled'
                    }`}
                  >
                    {/* Button Glitch Hover Effect */}
                    <div className="absolute inset-0 bg-red-500/20 -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out skew-x-[-20deg]"></div>
                    <span className="text-white font-mono text-sm tracking-[0.5em] font-bold group-hover:text-red-200 transition-colors drop-shadow-[0_0_5px_white] relative z-10 uppercase">ENTER ARENA</span>
                  </button>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* Floating Particulates / Glitch Dust Simulation */}
        <div className="absolute inset-0 pointer-events-none mix-blend-screen opacity-30">
           <div className="absolute top-[20%] left-[10%] w-1 h-1 bg-red-500 rounded-full animate-ping delay-75"></div>
           <div className="absolute top-[70%] left-[80%] w-1 h-1 bg-red-500 rounded-full animate-ping delay-300"></div>
           <div className="absolute top-[40%] left-[60%] w-1 h-1 bg-red-500 rounded-full animate-ping delay-500"></div>
        </div>
      </div>
    );
  }

  return (
    <main className="relative w-screen h-screen bg-black overflow-hidden font-sans select-none">
      <VideoLayer
        videoRef={videoRef}
        isVisible={startVideo}
        onEnded={handleVideoEnded}
        className="z-0"
      />

      {/* Dark overlay for readability */}
      <div
        className={`absolute inset-0 bg-black/60 z-10 pointer-events-none transition-opacity duration-1000 ${
          startVideo ? 'opacity-100' : 'opacity-0'
        }`}
      />

      <GlitchOverlay active={glitch} className="z-30 backdrop-contrast-200" />
      <EnterButton showButton={showButton} className="z-40" />

      {/* Skip Button */}
      {startVideo && !showButton && (
        <button
          onClick={() => { router.push("/timeline"); }}
          className="absolute top-6 right-6 lg:top-10 lg:right-10 z-[999] pointer-events-auto text-white font-mono text-[10px] md:text-sm tracking-[0.2em] md:tracking-[0.3em] uppercase border-2 border-red-500 bg-red-900/90 p-1 shadow-[0_0_20px_rgba(255,0,0,0.8)] backdrop-blur-md transition-all duration-300 hover:bg-red-600 hover:scale-105"
        >
          Skip ⇥
        </button>
      )}
    </main>
  );
}