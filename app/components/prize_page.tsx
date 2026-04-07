
"use client";

import React, { useState, useEffect, useRef, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useGLTF, Float, PerspectiveCamera } from '@react-three/drei';
import * as THREE from 'three';
import Image from 'next/image';

// --- 1. 3D Model Component ---
function GunModel({ targetRotation }: { targetRotation: [number, number, number] }) {
  const { scene } = useGLTF('/pistol.glb');
  const groupRef = useRef<THREE.Group>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    scene.traverse((child: any) => {
      if (child.isMesh) {
        child.material.emissiveIntensity = 1.2;
        child.material.roughness = 0.05;
        child.material.metalness = 1.0;
      }
    });
    return () => window.removeEventListener('resize', checkMobile);
  }, [scene]);

  useFrame(() => {
    if (groupRef.current) {
      groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, targetRotation[0], 0.1);
      groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, targetRotation[1], 0.1);
    }
  });

  return (
    <group ref={groupRef}>
      <primitive
        object={scene}
        scale={isMobile ? 2.8 : 5.0}
        position={isMobile ? [0, -1.0, 0] : [0, -1.6, 0]}
      />
    </group>
  );
}

// --- 2. Effect Components ---
function ShatterEffect({ color }: { color: string }) {
  const shards = Array.from({ length: 18 }).map((_, i) => ({
    id: i, left: Math.random() * 100 + '%', top: Math.random() * 100 + '%',
    tx: (Math.random() - 0.5) * 500, ty: Math.random() * 600 + 400, rot: Math.random() * 720,
    size: Math.random() * 20 + 5, delay: Math.random() * 0.1, bg: i % 3 === 0 ? '#fff' : color,
  }));
  return (
    <div className="absolute inset-0 pointer-events-none z-50">
      {shards.map((s) => (
        <div key={s.id} className="absolute backdrop-blur-[1px]" style={{
          left: s.left, top: s.top, width: `${s.size}px`, height: `${s.size}px`, backgroundColor: s.bg,
          boxShadow: `0 0 15px ${s.bg}`, clipPath: 'polygon(50% 0%, 100% 100%, 0% 100%)',
          animation: `fallDown 1.4s forwards cubic-bezier(0.25, 0.46, 0.45, 0.94) ${s.delay}s`,
          '--tx': `${s.tx}px`, '--ty': `${s.ty}px`, '--rot': `${s.rot}deg`,
        } as any} />
      ))}
    </div>
  );
}

function CrackedOverlay({ color }: { color: string }) {
  return (
    <div className="absolute inset-0 z-50 pointer-events-none rounded-2xl overflow-hidden bg-white/5 backdrop-blur-[2px]">
      <svg className="w-full h-full stroke-white stroke-[1.5px] fill-none drop-shadow-[0_2px_3px_rgba(0,0,0,0.5)]" viewBox="0 0 100 100">
        <path d="M50 50 L55 40 L45 30 L52 15" className="animate-crack-grow" />
        <path d="M50 50 L65 55 L75 45 L90 52" className="animate-crack-grow" />
        <path d="M50 50 L40 60 L45 75 L30 85" className="animate-crack-grow" />
        <path d="M50 50 L35 45 L25 55 L10 40" className="animate-crack-grow" />
        <circle cx="50" cy="50" r="8" className="fill-white animate-ping opacity-30" />
        <circle cx="50" cy="50" r="3.5" style={{ fill: color }} className="drop-shadow-[0_0_5px_white]" />
      </svg>
      <div className="absolute inset-0 bg-white animate-impact-flash" />
    </div>
  );
}

function TrophyCard({ id, prize, rank, glowColor, isRevealed, delay, imageSrc, frontImage, isCracking, isFanned, index, onManualClick }: any) {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const getTransform = () => {
    if (!isFanned) return 'translate(0, 0) scale(0.3)';
    if (isMobile) {
      // Use pixel offsets so cards stay within the card zone, not drifting into the header
      switch (id) {
        case 'c2': return 'translate(0px, -80px) scale(0.85)';       // center / 1st — nudge up slightly
        case 'c1': return 'translate(-105px, 60px) scale(0.72)';     // left / 2nd
        case 'c3': return 'translate(105px, 60px) scale(0.72)';      // right / 3rd
        default: return 'translate(0,0)';
      }
    }
    const xOffsets = ["-145%", "0%", "145%"];
    const rotations = ["-6deg", "0deg", "6deg"];
    return `translateX(${xOffsets[index]}) rotate(${rotations[index]})`;
  };

  const rankLabel = ['2nd', '1st', '3rd'][index];
  const rankColors = ['#0088FF', '#FF8C00', '#00CC55'];

  return (
    <div id={id} onClick={() => onManualClick(id, glowColor)}
      className={`absolute cursor-crosshair transition-transform active:scale-95 ${isRevealed ? 'pointer-events-none' : 'pointer-events-auto'}`}
      style={{
        width: isMobile ? '130px' : '280px',
        height: isMobile ? '185px' : '400px',
        transform: getTransform(),
        opacity: isFanned ? 1 : 0.8,
        zIndex: isFanned ? (id === 'c2' ? 1010 : 1000 + index) : 1000 + index,
        transition: 'all 1.2s cubic-bezier(0.34, 1.56, 0.64, 1)'
      }}>
      <div className="w-full h-full preserve-3d" style={{ animation: isFanned ? `drift 8s ease-in-out infinite ${delay}` : 'none' }}>

        {/* Revealed back */}
        <div className={`absolute inset-0 rounded-2xl flex flex-col items-center justify-center transition-all duration-1000 ${isRevealed ? 'opacity-100 scale-100' : 'opacity-0 scale-50'}`}
          style={{ background: 'transparent', boxShadow: isRevealed ? `0 0 60px ${glowColor}55` : 'none' }}>
          <Image src={imageSrc} alt="prize" className="absolute w-[230%] h-[230%] object-contain max-w-none pointer-events-none z-10"
            style={{ top: '42%', left: '50%', transform: 'translate(-50%, -50%)', filter: isRevealed ? `drop-shadow(0 0 40px ${glowColor})` : 'none' }}
            width={300} height={300} />
          <div className="absolute bottom-2 md:bottom-4 z-20 text-center px-2">
            {/* Rank */}
            <div className="text-white/70 text-[10px] md:text-sm font-bold uppercase tracking-[0.3em] mb-0.5">{rankLabel} Place</div>
            {/* Prize amount */}
            <div className="text-white text-lg md:text-5xl font-black italic tracking-tighter" style={{ textShadow: `0 0 20px ${glowColor}` }}>{prize}</div>
            {/* In-kind note */}
            <div className="text-white/50 text-[8px] md:text-xs font-semibold uppercase tracking-widest mt-0.5">Prize Value</div>
          </div>
        </div>

        {/* Front face */}
        <div className={`absolute inset-0 z-30 overflow-hidden bg-transparent border border-white/20 rounded-2xl flex items-center justify-center transition-all duration-150 ${isRevealed ? 'animate-shatter pointer-events-none' : 'opacity-100'}`}>
          <Image src={frontImage} alt="card face" className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-300 ${isCracking ? 'opacity-40' : 'opacity-95'}`} width={280} height={400} />
          {isCracking && <CrackedOverlay color={glowColor} />}
        </div>
        {isRevealed && <ShatterEffect color={glowColor} />}
      </div>
    </div>
  );
}

// --- Prize Pool Header Component ---
function PrizePoolHeader() {
  return (
    <div className="flex flex-col items-center w-full px-4 pt-5 pb-2 md:pt-8 md:pb-3 pointer-events-none">
      {/* PRIZE VAULT title */}
      <h1 className="text-white text-3xl md:text-6xl font-black italic tracking-tighter leading-none"
        style={{ textShadow: '0 0 40px rgba(255,80,0,0.9), 0 0 80px rgba(255,0,0,0.4)' }}>
        PRIZE VAULT
      </h1>

      {/* Total pool badge */}
      <div className="mt-2 md:mt-3 flex flex-col items-center">
        <div
          className="relative px-4 md:px-8 py-1 md:py-2 rounded-full border border-amber-400/50"
          style={{ background: 'linear-gradient(135deg, rgba(255,160,0,0.25), rgba(255,80,0,0.15))', boxShadow: '0 0 30px rgba(255,140,0,0.4)' }}
        >
          <div className="flex items-center gap-1.5 md:gap-3">
            <span className="text-amber-300/80 text-[9px] md:text-sm font-bold uppercase tracking-[0.3em]">Total Prize Pool</span>
            <span className="text-amber-300 text-xl md:text-6xl font-black italic tracking-tight" style={{ textShadow: '0 0 20px rgba(255,180,0,0.8) animate-pulse-glow'}}>
              ₹75,000
            </span>
          </div>
        </div>

        {/* In-kind disclaimer */}
        <div className="mt-4 md:mt-2 flex items-center gap-1.5 md:gap-2">
          <div className="w-3 md:w-5 h-px bg-white/30" />
          <span className="text-white/45 text-[7px] md:text-[11px] font-semibold uppercase tracking-[0.2em]">
            Incl. ₹25,000 in-kind · ₹50,000 cash
          </span>
          <div className="w-3 md:w-5 h-px bg-white/30" />
        </div>
      </div>

      {/* Sub-label */}
      <p className="text-white/40 mt-1 text-[7px] md:text-xs font-bold uppercase tracking-[0.4em]">
        Target Locked · Eliminate to Reveal
      </p>
    </div>
  );
}

// --- 3. Main Game Component ---
export default function BorderlandGame() {
  const [isFanned, setIsFanned] = useState(false);
  const [revealedIds, setRevealedIds] = useState<string[]>([]);
  const [crackingId, setCrackingId] = useState<string | null>(null);
  const [isFiring, setIsFiring] = useState(false);
  const [activeColor, setActiveColor] = useState('#ffffff');
  const [shake, setShake] = useState(false);
  const [gunRotation, setGunRotation] = useState<[number, number, number]>([0.4, Math.PI, 0]);

  const sectionRef = useRef<HTMLDivElement>(null);
  const gunRef = useRef<HTMLDivElement>(null);
  const muzzleRef = useRef<HTMLDivElement>(null);
  const laserRef = useRef<HTMLDivElement>(null);
  const breakSound = useRef<HTMLAudioElement | null>(null);
  const laserSound = useRef<HTMLAudioElement | null>(null);

  const revealedRef = useRef<string[]>([]);
  const hasInteracted = useRef(false);

  // Updated: 1st = ₹35k (c2/center), 2nd = ₹25k (c1/left), 3rd = ₹15k (c3/right)
  const CARDS_DATA = [
    { id: "c1", prize: "₹25,000", rank: "2nd", color: "#0088FF", img: "/queen_trophy.webp", frontImg: "/queenheart_blue.webp", delay: "0s" },
    { id: "c2", prize: "₹35,000", rank: "1st", color: "#FF8C00", img: "/king_trophy.webp", frontImg: "/kingspade_red.webp", delay: "-2s" },
    { id: "c3", prize: "₹15,000", rank: "3rd", color: "#00CC55", img: "/jack_trophy.webp", frontImg: "/jackclub_green.webp", delay: "-4s" }
  ];

  useEffect(() => {
    revealedRef.current = revealedIds;
  }, [revealedIds]);

  useEffect(() => {
    breakSound.current = new Audio('/glass-break.mp3');
    laserSound.current = new Audio('/laser.mp3');
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) { setIsFanned(true); observer.disconnect(); }
    }, { threshold: 0.25 });
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  // useEffect(() => {
  //   if (isFanned) {
  //     const shootSequence = async () => {
  //       await new Promise(resolve => setTimeout(resolve, 5000));
  //       if (hasInteracted.current) return;
  //       for (const card of CARDS_DATA) {
  //         if (hasInteracted.current) break;
  //         if (!revealedRef.current.includes(card.id)) {
  //           await handleShoot(card.id, card.color, true);
  //           await new Promise(resolve => setTimeout(resolve, 1000));
  //         }
  //       }
  //     };
  //     shootSequence();
  //   }
  // }, [isFanned]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (isFiring || revealedIds.length >= 3 || !gunRef.current) return;
      const mouseXFromCenter = e.clientX - window.innerWidth / 2;
      const mouseYPercent = e.clientY / window.innerHeight;

      gunRef.current.style.transform = `translateX(calc(-50% + ${mouseXFromCenter}px))`;
      gunRef.current.style.setProperty('--sway', `${mouseXFromCenter}px`);

      const pitch = 0.5 - (mouseYPercent * 0.6);
      const yaw = Math.PI - (mouseXFromCenter / window.innerWidth * 0.4);
      setGunRotation([pitch, yaw, 0]);
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [isFiring, revealedIds]);

  // const handleShoot = async (targetId: string, color: string, isAuto = false) => {
  const handleShoot = async (targetId: string, color: string) => {
    if (isFiring || revealedRef.current.includes(targetId)) return;
    // if (!isAuto) hasInteracted.current = true;
    hasInteracted.current = true;

    const targetEl = document.getElementById(targetId);
    const laser = laserRef.current;
    const muzzle = muzzleRef.current;

    if (!targetEl || !gunRef.current || !laser || !muzzle) return;

    const mRect = muzzle.getBoundingClientRect();
    const originX = mRect.left + mRect.width / 2;
    const originY = mRect.top + mRect.height / 2;

    const tRect = targetEl.getBoundingClientRect();
    const tx = tRect.left + tRect.width / 2;
    const ty = tRect.top + tRect.height / 2;

    const targetXOffset = tx - window.innerWidth / 2;
    gunRef.current.style.setProperty('--sway', `${targetXOffset}px`);
    gunRef.current.style.transform = `translateX(calc(-50% + ${targetXOffset}px))`;

    setIsFiring(true);
    setActiveColor(color);

    if (laserSound.current) { laserSound.current.currentTime = 0; laserSound.current.play().catch(() => {}); }

    const dx = tx - originX;
    const dy = ty - originY;
    const dist = Math.sqrt(dx * dx + dy * dy);
    const angle = Math.atan2(dy, dx);

    laser.style.left = `${originX}px`;
    laser.style.top = `${originY}px`;
    laser.style.height = `${dist}px`;
    laser.style.transform = `rotate(${angle - Math.PI / 2}rad)`;
    laser.style.opacity = '1';
    laser.style.background = `linear-gradient(to bottom, white 0%, ${color} 20%, ${color} 80%, transparent 100%)`;
    laser.style.boxShadow = `0 0 15px white, 0 0 30px ${color}`;

    setTimeout(() => {
      setCrackingId(targetId);
      setShake(true);
      if (breakSound.current) { breakSound.current.currentTime = 0; breakSound.current.play().catch(() => {}); }
    }, 40);

    return new Promise<void>((resolve) => {
      setTimeout(() => {
        if (laser) laser.style.opacity = '0';
        setShake(false);
        setRevealedIds(prev => [...prev, targetId]);
        setCrackingId(null);
        setIsFiring(false);
        resolve();
      }, 500);
    });
  };

  return (
    <div
      ref={sectionRef}
      className={`relative w-full h-screen min-h-[600px] overflow-hidden flex flex-col transition-transform duration-75 ${shake ? 'scale-[1.01]' : 'scale-100'}`}
    >
      {/* Background */}
      <div className="absolute inset-0 z-0 bg-center bg-cover" style={{ backgroundImage: "url('/bg_prize.webp')", filter: 'brightness(0.6) contrast(1.2)' }} />

      {/* Laser beam — fixed, sits above everything */}
      <div
        ref={laserRef}
        className="fixed w-[4px] md:w-[8px] z-[5000] pointer-events-none opacity-0 transition-opacity duration-75 rounded-full"
        style={{ transformOrigin: 'top center' }}
      />

      {/* ── HEADER ZONE (top ~28% on mobile, ~30% on desktop) ── */}
      <div className="relative z-[500] w-full flex-shrink-0">
        <PrizePoolHeader />
      </div>

      {/* ── CARD ZONE (flex-grow, cards centered inside) ── */}
      <div className="relative flex-1 flex items-center justify-center perspective-[1800px] z-[1000] min-h-0">
        {CARDS_DATA.map((card, idx) => (
          <TrophyCard
            key={card.id} id={card.id} index={idx} isFanned={isFanned}
            prize={card.prize} rank={card.rank} glowColor={card.color}
            isRevealed={revealedIds.includes(card.id)}
            isCracking={crackingId === card.id} delay={card.delay}
            imageSrc={card.img} frontImage={card.frontImg}
            onManualClick={() => handleShoot(card.id, card.color)}
          />
        ))}

        {/* Mobile tap hint */}
        {isFanned && revealedIds.length === 0 && (
          <div className="md:hidden absolute bottom-2 left-1/2 -translate-x-1/2 z-[1500] pointer-events-none animate-pulse">
            <p className="text-white/40 text-[9px] font-bold uppercase tracking-[0.35em] text-center">Tap a card to shoot</p>
          </div>
        )}
      </div>

      {/* ── GUN (fixed to bottom, always on top) ── */}
      <div
        ref={gunRef}
        className={`fixed left-1/2 z-[2000] pointer-events-none -translate-x-1/2 transition-all duration-300 ease-out ${isFiring ? 'animate-recoil' : ''} ${revealedIds.length >= 3 ? 'translate-y-full opacity-0' : 'opacity-100'}`}
        style={{
          '--sway': '0px',
          width: 'clamp(160px, 32vw, 420px)',
          height: 'clamp(220px, 46vw, 600px)',
          bottom: 'clamp(-80px, -8vw, -120px)',
        } as any}
      >
        <div className="relative w-full h-full">
          {/* Muzzle anchor point */}
          <div 
            ref={muzzleRef} 
            className="absolute top-[22%] md:top-[26%] left-[52%] md:left-[55%] -translate-x-1/2 w-2 h-2" 
          />

          {isFiring && (
            <div
              className="absolute top-10 md:top-16 left-1/2 -translate-x-1/2 z-50 pointer-events-none"
              style={{ width: 'clamp(40px, 7vw, 110px)', height: 'clamp(40px, 7vw, 110px)' }}
            >
              <div className="absolute inset-0 bg-white rounded-full blur-md animate-muzzle-flare" />
              <div className="absolute inset-0 rounded-full blur-2xl animate-muzzle-flare" style={{ backgroundColor: activeColor }} />
            </div>
          )}

          <Canvas shadows dpr={[1, 2]}>
            <ambientLight intensity={3.5} />
            <PerspectiveCamera makeDefault position={[0, 0, 4.5]} fov={45} />
            <Suspense fallback={null}>
              <Float speed={1.5} rotationIntensity={0.05} floatIntensity={0.05}>
                <GunModel targetRotation={gunRotation} />
              </Float>
            </Suspense>
          </Canvas>
        </div>
      </div>

      <style jsx global>{`
        @keyframes drift { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-12px); } }
        @keyframes recoil {
          0% { transform: translateX(calc(-50% + var(--sway))) translateY(0); }
          15% { transform: translateX(calc(-50% + var(--sway))) translateY(35px) rotateX(-12deg); }
          100% { transform: translateX(calc(-50% + var(--sway))) translateY(0); }
        }
        @keyframes crack-grow { 0% { stroke-dasharray: 0 100; opacity: 0; } 100% { stroke-dasharray: 100 0; opacity: 1; } }
        @keyframes impact-flash { 0% { opacity: 0; } 20% { opacity: 0.6; } 100% { opacity: 0; } }
        @keyframes muzzle-flare { 0% { transform: scale(0); opacity: 0; } 30% { transform: scale(1.4); opacity: 1; } 100% { transform: scale(2.5); opacity: 0; } }
        @keyframes fallDown { 0% { transform: translate(0, 0) rotate(0deg); opacity: 1; } 100% { transform: translate(var(--tx), var(--ty)) rotate(var(--rot)); opacity: 0; } }
        @keyframes shatter { 0% { opacity: 1; transform: scale(1); } 100% { opacity: 0; transform: scale(1.6); filter: blur(12px); } }
        .animate-recoil { animation: recoil 0.2s ease-out; }
        .animate-muzzle-flare { animation: muzzle-flare 0.25s ease-out forwards; }
        .animate-shatter { animation: shatter 0.5s forwards cubic-bezier(0.4, 0, 0.2, 1); }
        .animate-crack-grow { animation: crack-grow 0.25s ease-out forwards; }
        .animate-impact-flash { animation: impact-flash 0.3s ease-out forwards; }
        .preserve-3d { transform-style: preserve-3d; }
      `}</style>
    </div>
  );
}
