"use client";

import { useEffect, useRef } from "react";

export function BackgroundAudio() {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    if (!audioRef.current) {
      const audio = new Audio("/bg_audio/alice_in_borderland.mp3");
      audio.loop = true;
      audio.volume = 0.5; // Adjusted to a comfortable level
      audioRef.current = audio;
    }

    const playAudio = () => {
      if (audioRef.current) {
        // Attempt to play audio. Browsers might block it if no interaction,
        // but handleEnterClick guarantees an interaction context.
        audioRef.current.play().catch((e) => {
          console.warn("Background audio playback restricted:", e);
        });
        sessionStorage.setItem("bgAudioStarted", "true");
      }
    };

    // If it was already started in this session (e.g. user refreshed the page)
    if (sessionStorage.getItem("bgAudioStarted") === "true") {
      playAudio();
      
      // Setup a one-time click listener in case autoplay is blocked on refresh
      const onInteraction = () => {
        playAudio();
        window.removeEventListener("click", onInteraction);
      };
      window.addEventListener("click", onInteraction);
    }

    window.addEventListener("start-bg-audio", playAudio);

    return () => {
      window.removeEventListener("start-bg-audio", playAudio);
    };
  }, []);

  return null;
}
