"use client";

import { useEffect, useState } from "react";

const TARGET_TIME = new Date("2026-04-19T14:00:00+05:30").getTime();

function getCountdownValue() {
  const difference = Math.max(TARGET_TIME - Date.now(), 0);
  const totalSeconds = Math.floor(difference / 1000);
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
}

export default function TimerPage() {
  const [timeLeft, setTimeLeft] = useState("00:00:00");

  useEffect(() => {
    setTimeLeft(getCountdownValue());

    const intervalId = window.setInterval(() => {
      setTimeLeft(getCountdownValue());
    }, 1000);

    return () => window.clearInterval(intervalId);
  }, []);

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#050000] text-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,0,51,0.18),transparent_34%),linear-gradient(180deg,#140000_0%,#050000_45%,#000000_100%)]" />
      <div
        className="absolute inset-0 opacity-25 mix-blend-screen"
        style={{ backgroundImage: 'url("/images/banner_bg_blackwhite")', backgroundPosition: "center", backgroundSize: "cover" }}
      />
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,0,51,0.12)_1px,transparent_1px),linear-gradient(90deg,rgba(255,0,51,0.12)_1px,transparent_1px)] bg-[size:90px_90px] opacity-10 [mask-image:linear-gradient(to_bottom,transparent,black_18%,black_82%,transparent)]" />
      <div
        className="absolute inset-0 opacity-[0.05] mix-blend-screen"
        style={{ backgroundImage: 'url("https://www.transparenttextures.com/patterns/stardust.png")' }}
      />
      <div className="absolute left-1/2 top-[-12rem] h-[28rem] w-[28rem] -translate-x-1/2 rounded-full bg-red-700/20 blur-3xl" />

      <section className="relative z-10 flex min-h-screen items-center justify-center px-6 py-20">
        <div className="w-full max-w-5xl rounded-[28px] border border-red-500/30 bg-black/65 p-8 mb-18 shadow-[0_0_40px_rgba(255,0,51,0.18)] backdrop-blur-xl md:p-12">
          <div className="mb-10 flex flex-col gap-6 border-b border-red-500/20 pb-8 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="mb-3 text-xs uppercase tracking-[0.55em] text-red-400/80">Survival Clock</p>
              <h1 className="text-5xl uppercase text-white drop-shadow-[0_0_18px_rgba(255,0,51,0.35)] md:text-7xl">
                Timer
              </h1>
            </div>

            <div className="rounded-md border border-red-500/25 bg-red-950/30 px-4 py-3 text-left md:text-right">
              <p className="text-[11px] uppercase tracking-[0.4em] text-zinc-400">Target Window</p>
              <p className="mt-1 text-lg uppercase tracking-[0.18em] text-white/90">19 Apr 2026 // 02:00 PM IST</p>
            </div>
          </div>

          <div className="relative overflow-hidden rounded-[24px] border border-red-500/25 bg-[linear-gradient(180deg,rgba(20,0,0,0.95)_0%,rgba(0,0,0,0.98)_100%)] p-6 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.03)] md:p-8">
            <div className="absolute left-0 top-0 h-px w-full bg-gradient-to-r from-transparent via-red-400/70 to-transparent" />
            <p className="mb-4 text-sm uppercase tracking-[0.45em] text-zinc-500">T-minus</p>
            <div className="primary-font justify-self-center text-[clamp(3rem,10vw,7.5rem)] leading-none tracking-[0.06em] text-red-400 drop-shadow-[0_0_24px_rgba(255,0,51,0.5)] md:tracking-[0.1em]">
              {timeLeft}
            </div>
            <p className="mt-5 max-w-2xl text-sm justify-self-center uppercase tracking-[0.3em] text-zinc-400 md:text-base">
              Countdown locked to the Syn3rgy activation point.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
