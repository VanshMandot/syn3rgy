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

    const videoTimer = setTimeout(() => setStartVideo(true), 1000); // Shifting sequence forward as text was removed

    return () => {
      clearTimeout(videoTimer);
    };
  }, [hasStarted]);

  useEffect(() => {
    if (startVideo && videoRef.current) {
      videoRef.current.muted = false; // Directly unmute original video track natively
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
            0%, 100% { transform: translateY(0) rotateX(5deg) rotateY(-5deg); }
            50% { transform: translateY(-30px) rotateX(15deg) rotateY(5deg); }
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
          
          .card-backface {
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

        <div className="absolute top-10 w-full flex justify-between px-10 text-red-600/60 font-mono text-xs tracking-widest z-10 drop-shadow-[0_0_5px_red]">
          <span>TOKYO METROPOLITAN</span>
          <span>POPULATION: 0</span>
        </div>

        {/* Floating wrapper */}
        <div className="z-20 flex flex-col items-center [perspective:2000px]">
          <div className="animate-float-card [transform-style:preserve-3d]">

            <div
              onClick={() => setIsFlipped(!isFlipped)}
              onTouchEnd={(e) => {
                e.preventDefault();
                setIsFlipped(!isFlipped);
              }}
              className={`relative w-64 h-96 md:w-80 md:h-[30rem] transition-all duration-[1000ms] [transform-style:preserve-3d] cursor-pointer shadow-[0_30px_50px_rgba(255,0,0,0.1)] ${isFlipped ? '[transform:rotateY(180deg)_scale(1.05)]' : 'hover:scale-105 hover:shadow-[0_0_50px_rgba(255,0,0,0.4)]'
                }`}
            >
              {/* Front of card */}
              <div className="absolute inset-0 bg-black/90 border-[3px] border-red-900/80 rounded-2xl flex flex-col items-center justify-between py-12 card-backface overflow-hidden shadow-[inset_0_0_50px_rgba(255,0,0,0.1)]">
                <div className="absolute top-4 left-5 text-red-600/80 text-xl md:text-2xl font-serif leading-none text-center drop-shadow-[0_0_10px_red]">K<br />♥</div>
                <div className="absolute bottom-4 right-5 text-red-600/80 text-xl md:text-2xl font-serif leading-none text-center rotate-180 drop-shadow-[0_0_10px_red]">K<br />♥</div>

                <span className={`text-red-600 text-[8rem] leading-none drop-shadow-[0_0_30px_rgba(255,0,0,0.6)] mt-6 transition-transform duration-500 relative ${isFlipped ? 'scale-110' : ''}`}>
                  <span className="absolute -top-16 left-1/2 -translate-x-1/2 text-5xl font-sans drop-shadow-none opacity-40">♛</span>
                  ♥
                </span>

                <div className="text-center z-10 flex flex-col gap-2 mt-4">
                  <h2 className="text-white font-mono tracking-[0.4em] text-lg md:text-xl uppercase drop-shadow-[0_0_5px_white]">King of Hearts</h2>
                  <p className="text-red-500 font-mono text-xs tracking-[0.2em] opacity-80">VISA: UNLIMITED</p>
                </div>

                <span className="text-red-500/80 mt-6 font-mono text-[10px] tracking-[0.2em] animate-pulse border border-red-900/40 px-6 py-2 bg-red-900/10">
                  {isFlipped ? "AUTHORIZED" : "TAP TO AUTHORIZE"}
                </span>
              </div>

              {/* Back of card */}
              <div className="absolute inset-0 bg-gradient-to-b from-red-950 to-red-900 border-[3px] border-red-500 rounded-2xl flex flex-col items-center justify-center card-backface card-back shadow-[0_0_80px_rgba(255,0,0,0.6)] overflow-hidden">
                <div className="absolute inset-0 bg-[repeating-linear-gradient(45deg,transparent,transparent_10px,rgba(0,0,0,0.4)_10px,rgba(0,0,0,0.4)_20px)] pointer-events-none" />
                <span className="text-white text-[6rem] leading-none animate-pulse drop-shadow-[0_0_15px_white] z-10 mb-4 font-sans">☠</span>
                <h2 className="text-white font-mono tracking-[0.3em] md:tracking-[0.4em] text-lg md:text-xl uppercase text-center ml-[0.2em] drop-shadow-[0_0_10px_white] z-10">System Override</h2>

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
                  className={`mt-10 border-2 border-red-500/80 px-8 py-4 z-20 backdrop-blur-md transition-all duration-300 hover:scale-110 hover:shadow-[0_0_30px_rgba(255,0,0,1)] shadow-[0_0_15px_rgba(255,0,0,0.3)] ${isFlipped ? 'bg-[#050000] opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none disabled'
                    } group`}
                >
                  <p className="text-white font-mono text-[10px] md:text-xs tracking-[0.4em] font-bold group-hover:text-red-500 transition-colors drop-shadow-[0_0_5px_white]">ENTER ARENA</p>
                </button>
              </div>
            </div>

          </div>
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
        className={`absolute inset-0 bg-black/60 z-10 pointer-events-none transition-opacity duration-1000 ${startVideo ? 'opacity-100' : 'opacity-0'
          }`}
      />

      <GlitchOverlay active={glitch} className="z-30 backdrop-contrast-200" />
      <EnterButton showButton={showButton} className="z-40" />

      {/* Skip Button */}
      {startVideo && !showButton && (
        <button
          onClick={() => { router.push("/timeline"); }}
          className="absolute top-6 right-6 lg:top-10 lg:right-10 z-[999] pointer-events-auto text-white font-mono text-[10px] md:text-sm tracking-[0.2em] md:tracking-[0.3em] uppercase border-2 border-red-500 bg-red-900/90 px-6 py-3 shadow-[0_0_20px_rgba(255,0,0,0.8)] backdrop-blur-md transition-all duration-300 hover:bg-red-600 hover:scale-105"
        >
          Skip ⇥
        </button>
      )}
    </main>
  );
}
