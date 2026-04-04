"use client";

import BorderlandTimeline from "../components/timeline";
import HybridDomainPage from "../components/domain";
import PrizeSection from "../components/prize_page";
import FAQSection from "../components/faq";
import HeroBanner from "../components/HeroBanner";
import { useState, useEffect, useRef } from "react";

export default function MainGamePage() {
  const [timelineStarted, setTimelineStarted] = useState(false);

  const hasTriggeredRef = useRef(false);

// Inside MainGamePage()
  useEffect(() => {
    const handleFirstScroll = (e: Event) => {
      if (hasTriggeredRef.current) return;

      const timeline = document.getElementById("timeline");
      if (timeline) {
        hasTriggeredRef.current = true;
        
        document.body.style.overflow = "hidden";
        setTimelineStarted(true);

        const timeline = document.getElementById("timeline") || document.querySelector(".tl-round");
        if (timeline) {
          const rect = timeline.getBoundingClientRect();
          const offset = window.innerHeight * 0.0001;
          window.scrollTo({
            top: window.scrollY + rect.top - offset,
            behavior: "smooth",
          });
        } else {
          window.scrollBy({ top: window.innerHeight * 1.3, behavior: "smooth" });
        }
        
        if (e.cancelable) e.preventDefault();
      }
    };
    window.addEventListener("wheel", handleFirstScroll, { passive: false });
    window.addEventListener("touchmove", handleFirstScroll, { passive: false });

    return () => {
      window.removeEventListener("wheel", handleFirstScroll);
      window.removeEventListener("touchmove", handleFirstScroll);
    };
  }, []);

  useEffect(() => {
    const trigger = () => {
      if (hasTriggeredRef.current) return;

      hasTriggeredRef.current = true;
      document.body.style.overflow = "hidden";
      setTimelineStarted(true);
    };

    window.addEventListener("triggerTimeline", trigger);

    return () => {
      window.removeEventListener("triggerTimeline", trigger);
    };
  }, []);

  return (
    <main className="bg-[#050508] relative flex flex-col w-screen overflow-x-hidden">
      {/* 0. Hero Banner Section */}
      <div className="w-full relative z-20 block">
        <HeroBanner timelineStarted={timelineStarted} />
      </div>

      {/* 1. Timeline Section */}
      <div className="w-full relative z-10 block">
        <BorderlandTimeline timelineStarted={timelineStarted} />
      </div>

      {/* 2. Domains Section */}
      <div className="w-full relative z-50 block bg-black">
        <HybridDomainPage />
      </div>

      {/* 3. Prize Section */}
      <div className="w-full relative z-30 block bg-black">
        <PrizeSection />
      </div>

      {/* 4. FAQ Section
      <div className="w-full relative z-40 block bg-black">
        <FAQSection />
      </div> */}
    </main>
  );
}
