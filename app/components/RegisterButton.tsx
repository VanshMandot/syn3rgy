"use client";

import React, { useState, useEffect } from "react";

export function RegisterButton() {
  const [displayText, setDisplayText] = useState("REGISTER NOW");
  const [isHovered, setIsHovered] = useState(false);
  const [isInDomains, setIsInDomains] = useState(false);
  // Gate: only attach the domain observer after the card intro animation ends
  const [introComplete, setIntroComplete] = useState(false);

  // Wait for timeline card intro to finish before doing anything
  useEffect(() => {
    const onIntroComplete = () => setIntroComplete(true);
    window.addEventListener("timeline-intro-complete", onIntroComplete);
    return () => window.removeEventListener("timeline-intro-complete", onIntroComplete);
  }, []);

  // Periodic glitch text effect — only once visible
  useEffect(() => {
    if (!isInDomains) return;
    const glitchFrames = [
      "REGISTER NOW",
      "R3G1ST3R N0W",
      "REG!ST▓R N◌W",
      "REGISTER NOW",
      "▓▓▓▓▓▓▓▓ ▓▓▓",
      "REGISTER NOW",
    ];
    const triggerGlitch = () => {
      let i = 0;
      const interval = setInterval(() => {
        setDisplayText(glitchFrames[i % glitchFrames.length]);
        i++;
        if (i >= glitchFrames.length) {
          clearInterval(interval);
          setDisplayText("REGISTER NOW");
        }
      }, 90);
    };
    const initial = setTimeout(triggerGlitch, 2000);
    const periodic = setInterval(triggerGlitch, 5000);
    return () => {
      clearTimeout(initial);
      clearInterval(periodic);
    };
  }, [isInDomains]);

  // Only start watching #domains AFTER the card intro animation finishes
  useEffect(() => {
    if (!introComplete) return;

    let obs: IntersectionObserver | null = null;
    let pollInterval: ReturnType<typeof setInterval>;

    const connectObserver = () => {
      const domainsEl = document.getElementById("domains");
      if (domainsEl && !obs) {
        obs = new IntersectionObserver(
          ([entry]) => setIsInDomains(entry.isIntersecting),
          { threshold: 0.1 }
        );
        obs.observe(domainsEl);
      } else if (!domainsEl && obs) {
        obs.disconnect();
        obs = null;
        setIsInDomains(false);
      }
    };

    pollInterval = setInterval(connectObserver, 800);
    connectObserver();

    return () => {
      clearInterval(pollInterval);
      if (obs) obs.disconnect();
    };
  }, [introComplete]);

  return (
    <>
      <style>{`
        @keyframes reg-float {
          0%, 100% {
            transform: translateY(0px);
            box-shadow: 0 0 18px rgba(255,0,51,0.45), 0 0 40px rgba(255,0,51,0.12), inset 0 0 8px rgba(255,0,51,0.1);
          }
          50% {
            transform: translateY(-7px);
            box-shadow: 0 0 32px rgba(255,0,51,0.75), 0 0 70px rgba(255,0,51,0.25), inset 0 0 16px rgba(255,0,51,0.2);
          }
        }
        @keyframes reg-border-pulse {
          0%, 100% { border-color: rgba(255,0,51,0.55); }
          50%       { border-color: rgba(255,0,51,1); }
        }
        @keyframes reg-scan {
          0%   { top: -2px; opacity: 0.8; }
          80%  { opacity: 0.6; }
          100% { top: 100%; opacity: 0; }
        }
        @keyframes reg-ping {
          0%   { transform: scale(1); opacity: 1; }
          100% { transform: scale(2.8); opacity: 0; }
        }
        @keyframes reg-corner-blink {
          0%, 100% { opacity: 1; }
          50%       { opacity: 0.3; }
        }
        .reg-btn-outer {
          animation: reg-float 4s ease-in-out infinite, reg-border-pulse 2.5s ease-in-out infinite;
        }
        .reg-btn-outer:hover {
          animation: reg-border-pulse 0.8s ease-in-out infinite;
        }
        .reg-scan-line { animation: reg-scan 2.2s linear infinite; }
        .reg-ping-ring { animation: reg-ping 1.6s ease-out infinite; }
        .reg-corner    { animation: reg-corner-blink 1.2s step-end infinite; }
      `}</style>

      {/* Original slide animation — triggered by introComplete instead of isInDomains */}
      <div className="fixed bottom-8 left-8 right-8 z-[9999] pointer-events-none h-20">
        <div
          className="absolute bottom-0 w-max pointer-events-auto transition-all duration-[1000ms] ease-[cubic-bezier(0.16,1,0.3,1)]"
          style={{
            left: isInDomains ? "0%" : "100%",
            transform: isInDomains ? "translateX(0%)" : "translateX(-100%)",
            opacity: introComplete ? 1 : 0,
          }}
        >
          <a
            id="register-button"
            href="https://example.com/register"
            target="_blank"
            rel="noopener noreferrer"
            className="no-underline focus:outline-none block w-fit"
            aria-label="Register for SYNERGY 3.0"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <div
              style={{ minWidth: "260px", padding: "0.5rem 2.0rem" }}
              className={`reg-btn-outer relative overflow-hidden border-2 border-red-600/55
                bg-black/88 backdrop-blur-md flex flex-col items-center gap-[8px]
                transition-all duration-300
                ${isHovered ? "!bg-red-950/70 scale-105" : ""}
              `}
            >
              <span className="reg-corner absolute top-[3px] left-[3px] w-[10px] h-[10px] border-t-2 border-l-2 border-red-500/90" />
              <span className="reg-corner absolute top-[3px] right-[3px] w-[10px] h-[10px] border-t-2 border-r-2 border-red-500/90" style={{ animationDelay: "0.3s" }} />
              <span className="reg-corner absolute bottom-[3px] left-[3px] w-[10px] h-[10px] border-b-2 border-l-2 border-red-500/90" style={{ animationDelay: "0.6s" }} />
              <span className="reg-corner absolute bottom-[3px] right-[3px] w-[10px] h-[10px] border-b-2 border-r-2 border-red-500/90" style={{ animationDelay: "0.9s" }} />

              <div className="reg-scan-line pointer-events-none absolute left-0 w-full h-[1.5px] bg-gradient-to-r from-transparent via-red-500 to-transparent opacity-55" />

              <div className="absolute -top-1 -right-1 w-3 h-3">
                <div className="absolute inset-0 rounded-full bg-red-500" />
                <div className="reg-ping-ring absolute inset-0 rounded-full bg-red-500" />
              </div>

              <span className="text-red-500 text-3xl leading-none drop-shadow-[0_0_12px_rgba(255,0,51,0.9)] animate-pulse">♠</span>

              <span className={`font-mono text-sm md:text-base tracking-[0.32em] uppercase whitespace-nowrap transition-colors duration-200 ${isHovered ? "text-red-400 drop-shadow-[0_0_8px_rgba(255,0,51,0.8)]" : "text-white drop-shadow-[0_0_5px_rgba(255,0,51,0.4)]"}`}>
                {displayText}
              </span>

              <span className="font-mono text-red-600/65 text-[10px] md:text-[11px] tracking-[0.25em] uppercase">
                VISA REQUIRED
              </span>

              <div className={`absolute top-0 h-full w-[40%] pointer-events-none bg-gradient-to-r from-transparent via-red-500/10 to-transparent transition-all duration-700 ease-in-out ${isHovered ? "left-[120%]" : "left-[-60%]"}`} />
            </div>
          </a>
        </div>
      </div>
    </>
  );
}
