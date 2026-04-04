"use client";

import React, { useState, useEffect, useRef, useCallback } from 'react';

// ─────────────────────────────────────────────────────────────────
//  GLITCH OVERLAY (existing)
// ─────────────────────────────────────────────────────────────────

interface GlitchOverlayProps {
  active?: boolean;
  className?: string;
}

export function GlitchOverlay({ active = false, className = '' }: GlitchOverlayProps) {
  if (!active) return null;

  return (
    <div className={`pointer-events-none absolute inset-0 animate-glitch mix-blend-screen bg-black/10 ${className}`} />
  );
}

// ─────────────────────────────────────────────────────────────────
//  LASER CURSOR (converted from CodePen byeolbit/EEbpoJ)
// ─────────────────────────────────────────────────────────────────

interface TrailPoint {
  X: number;
  Y: number;
}

export function LaserCursor() {
  const pointerRef = useRef<HTMLDivElement>(null);
  const trailRef = useRef<SVGPathElement>(null);
  const gradientRef = useRef<SVGLinearGradientElement>(null);
  const mouseRef = useRef<TrailPoint>({ X: -100, Y: -100 });
  const trailPointsRef = useRef<TrailPoint[]>([]);
  const animIdRef = useRef<number>(0);
  const [isMobile, setIsMobile] = useState(false);

  const draw = useCallback(() => {
    const trail = trailPointsRef.current;
    if (trail.length === 0) return;
    const mouse = mouseRef.current;
    let x = mouse.X;
    let y = mouse.Y;

    for (let i = 0; i < 12; i++) {
      const nextDot = trail[i + 1] || trail[0];
      trail[i].X = x;
      trail[i].Y = y;
      x += (nextDot.X - x) * 0.3;
      y += (nextDot.Y - y) * 0.3;
    }

    const dx = mouse.X - trail[1].X;
    const dy = mouse.Y - trail[1].Y;
    let x1 = 0, y1 = 0, x2 = 0, y2 = 0;

    if (Math.abs(dx) > Math.abs(dy)) {
      if (dx > 0) x2 = 1;
      else x1 = 1;
    } else {
      if (dy > 0) y2 = 1;
      else y1 = 1;
    }

    if (gradientRef.current) {
      gradientRef.current.setAttribute('x1', String(x1));
      gradientRef.current.setAttribute('y1', String(y1));
      gradientRef.current.setAttribute('x2', String(x2));
      gradientRef.current.setAttribute('y2', String(y2));
    }

    const M = `M ${trail[11].X}, ${trail[11].Y} `;
    const C = `C ${trail[6].X}, ${trail[6].Y} ${trail[6].X}, ${trail[6].Y} ${trail[5].X}, ${trail[5].Y} `;
    const S = `S ${trail[2].X}, ${trail[2].Y} ${trail[1].X}, ${trail[1].Y} ${trail[1].X}, ${trail[1].Y} ${mouse.X}, ${mouse.Y}`;

    if (trailRef.current) {
      trailRef.current.setAttribute('d', M + C + S);
    }
  }, []);

  useEffect(() => {
    const mql = window.matchMedia("(pointer: coarse)");
    setIsMobile(mql.matches);
    if (mql.matches) return;

    trailPointsRef.current = Array.from({ length: 12 }, () => ({ X: -100, Y: -100 }));

    const handleMouseMove = (e: MouseEvent) => {
      if (pointerRef.current) {
        pointerRef.current.style.left = e.clientX + 'px';
        pointerRef.current.style.top = e.clientY + 'px';
      }
      mouseRef.current.X = e.clientX + 4;
      mouseRef.current.Y = e.clientY + 4;
    };

    window.addEventListener('mousemove', handleMouseMove);

    function animate() {
      draw();
      animIdRef.current = requestAnimationFrame(animate);
    }
    animate();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animIdRef.current);
    };
  }, [draw]);

  if (isMobile) return null;

  return (
    <div className="laser-cursor-container" aria-hidden="true">
      <div className="laser-pointer" ref={pointerRef} />
      <svg xmlns="http://www.w3.org/2000/svg">
        <defs>
          <filter id="laser-glow">
            <feGaussianBlur result="coloredBlur" stdDeviation="4" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <linearGradient id="laser-gradient" ref={gradientRef}>
            <stop offset="0" stopColor="red" stopOpacity="0" />
            <stop offset="1" stopColor="red" />
          </linearGradient>
        </defs>
        <path
          ref={trailRef}
          className="laser-trail"
          fill="transparent"
          d="M-100 -100 L-100 -100"
        />
      </svg>
    </div>
  );
}
