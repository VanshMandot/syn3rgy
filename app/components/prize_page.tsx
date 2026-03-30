// "use client";

// import React, { useState, useEffect, useRef, Suspense } from 'react';
// import { Canvas, useFrame } from '@react-three/fiber';
// import { useGLTF, Float, PerspectiveCamera } from '@react-three/drei';
// import * as THREE from 'three';

// // --- 1. 3D Model Component ---
// function GunModel({ targetRotation }: { targetRotation: [number, number, number] }) {
//   const { scene } = useGLTF('/pistol.glb');
//   const groupRef = useRef<THREE.Group>(null);
//   const [isMobile, setIsMobile] = useState(false);

//   useEffect(() => {
//     const checkMobile = () => setIsMobile(window.innerWidth < 768);
//     checkMobile();
//     window.addEventListener('resize', checkMobile);
    
//     scene.traverse((child: any) => {
//       if (child.isMesh) {
//         child.material.emissiveIntensity = 0.5;
//         child.material.roughness = 0.1;
//         child.material.metalness = 0.9;
//         child.material.needsUpdate = true;
//       }
//     });
//     return () => window.removeEventListener('resize', checkMobile);
//   }, [scene]);

//   useFrame(() => {
//     if (groupRef.current) {
//       groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, targetRotation[0], 0.1);
//       groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, targetRotation[1], 0.1);
//     }
//   });

//   return (
//     <group ref={groupRef}>
//       <primitive object={scene} scale={isMobile ? 2.5 : 4.2} position={isMobile ? [0, -1.8, 0] : [0, -2.2, 0]} />
//     </group>
//   );
// }

// // --- 2. Effect Components ---
// function ShatterEffect({ color }: { color: string }) {
//   const shards = Array.from({ length: 15 }).map((_, i) => ({
//     id: i, left: Math.random() * 100 + '%', top: Math.random() * 100 + '%',
//     tx: (Math.random() - 0.5) * 400, ty: Math.random() * 500 + 300, rot: Math.random() * 720,
//     size: Math.random() * 15 + 5, delay: Math.random() * 0.1, bg: i % 3 === 0 ? '#fff' : color, 
//   }));
//   return (
//     <div className="absolute inset-0 pointer-events-none z-50">
//       {shards.map((s) => (
//         <div key={s.id} className="absolute backdrop-blur-[1px]" style={{
//             left: s.left, top: s.top, width: `${s.size}px`, height: `${s.size}px`, backgroundColor: s.bg,
//             boxShadow: `0 0 10px ${s.bg}`, clipPath: 'polygon(50% 0%, 100% 100%, 0% 100%)',
//             animation: `fallDown 1.2s forwards cubic-bezier(0.25, 0.46, 0.45, 0.94) ${s.delay}s`,
//             '--tx': `${s.tx}px`, '--ty': `${s.ty}px`, '--rot': `${s.rot}deg`,
//           } as any} />
//       ))}
//     </div>
//   );
// }

// function CrackedOverlay({ color }: { color: string }) {
//   return (
//     <div className="absolute inset-0 z-40 pointer-events-none rounded-2xl overflow-hidden bg-white/10 backdrop-blur-[1px]">
//       <svg className="w-full h-full stroke-white/80 stroke-[3px] fill-none" viewBox="0 0 100 100">
//         <path d="M50 50 L55 40 L45 30 L52 15" className="animate-pulse" />
//         <path d="M50 50 L65 55 L75 45 L90 52" className="animate-pulse" />
//         <path d="M50 50 L40 60 L45 75 L30 85" className="animate-pulse" />
//         <path d="M50 50 L35 45 L25 55 L10 40" className="animate-pulse" />
//         <circle cx="50" cy="50" r="5" style={{ stroke: color }} className="opacity-50" />
//       </svg>
//       <div className="absolute inset-0 bg-white animate-impact-flash" />
//     </div>
//   );
// }

// function TrophyCard({ id, prize, glowColor, isRevealed, delay, imageSrc, frontImage, isCracking, isFanned, index, onManualClick }: any) {
//   const [isMobile, setIsMobile] = useState(false);
//   useEffect(() => {
//     const checkMobile = () => setIsMobile(window.innerWidth < 768);
//     checkMobile();
//     window.addEventListener('resize', checkMobile);
//     return () => window.removeEventListener('resize', checkMobile);
//   }, []);

//   const getTransform = () => {
//     if (!isFanned) return 'translate(0, 0) scale(0.5)';
//     if (isMobile) {
//       switch (id) {
//         case 'c2': return 'translate(0, -60%) scale(0.85)'; 
//         case 'c1': return 'translate(-48%, 25%) scale(0.85)';
//         case 'c3': return 'translate(48%, 25%) scale(0.85)';
//         default: return 'translate(0,0)';
//       }
//     }
//     const xOffsets = ["-140%", "0%", "140%"];
//     const rotations = ["-5deg", "0deg", "5deg"];
//     return `translateX(${xOffsets[index]}) rotate(${rotations[index]})`;
//   };

//   return (
//     <div id={id} onClick={() => onManualClick(id, glowColor)} 
//       className={`absolute w-[180px] h-[250px] md:w-[260px] md:h-[380px] cursor-crosshair transition-transform active:scale-95 ${isRevealed ? 'pointer-events-none' : 'pointer-events-auto'}`}
//       style={{ transform: getTransform(), opacity: isFanned ? 1 : 0.8, zIndex: isFanned ? (id === 'c2' ? 1010 : 1000 + index) : 1000 + index, transition: 'all 1.2s cubic-bezier(0.34, 1.56, 0.64, 1)' }}>
//       <div className="w-full h-full preserve-3d" style={{ animation: isFanned ? `drift 8s ease-in-out infinite ${delay}` : 'none' }}>
//         <div className={`absolute inset-0 rounded-2xl flex flex-col items-center justify-center transition-all duration-1000 ${isRevealed ? 'opacity-100 scale-100' : 'opacity-0 scale-50'}`} style={{ background: 'transparent', boxShadow: isRevealed ? `0 0 50px ${glowColor}44` : 'none' }}>
//           <img src={imageSrc} alt="prize" className="absolute w-[180%] h-[180%] object-contain max-w-none pointer-events-none z-10" style={{ top: '40%', left: '50%', transform: 'translate(-50%, -50%)', filter: isRevealed ? `drop-shadow(0 0 25px ${glowColor})` : 'none' }} />
//           <div className="absolute bottom-6 z-20 text-center">
//             <div className="text-white text-xl md:text-4xl font-black">{prize}</div>
//           </div>
//         </div>
//         <div className={`absolute inset-0 z-30 overflow-hidden bg-transparent border border-white/10 rounded-2xl flex items-center justify-center transition-all duration-150 ${isRevealed ? 'animate-shatter pointer-events-none' : 'opacity-100'}`}>
//           <img src={frontImage} alt="card face" className="absolute inset-0 w-full h-full object-cover opacity-90" />
//           {isCracking && <CrackedOverlay color={glowColor} />}
//         </div>
//         {isRevealed && <ShatterEffect color={glowColor} />}
//       </div>
//     </div>
//   );
// }

// // --- 3. Main Game Component ---
// export default function BorderlandGame() {
//   const [isFanned, setIsFanned] = useState(false);
//   const [revealedIds, setRevealedIds] = useState<string[]>([]);
//   const [crackingId, setCrackingId] = useState<string | null>(null);
//   const [isFiring, setIsFiring] = useState(false);
//   const [activeColor, setActiveColor] = useState('#ffffff');
//   const [shake, setShake] = useState(false);
//   const [gunRotation, setGunRotation] = useState<[number, number, number]>([0.4, Math.PI, 0]);

//   const gunRef = useRef<HTMLDivElement>(null);
//   const muzzleRef = useRef<HTMLDivElement>(null);
//   const laserRef = useRef<HTMLDivElement>(null);
//   const breakSound = useRef<HTMLAudioElement | null>(null);
//   const laserSound = useRef<HTMLAudioElement | null>(null);
  
//   const autoShootTimer = useRef<NodeJS.Timeout | null>(null);

//   const CARDS_DATA = [
//     { id: "c1", prize: "₹15,000", color: "#1eafd7", img: "queen_trophy.png", frontImg: "heartofqueen.png", delay: "0s" },
//     { id: "c2", prize: "₹25,000", color: "#fb923c", img: "king_trophy.png", frontImg: "kingofspades.png", delay: "-2s" },
//     { id: "c3", prize: "₹10,000", color: "#2bff8a", img: "jack_trophy.png", frontImg: "jackofclubs.png", delay: "-4s" }
//   ];

//   const resetAutoTimer = () => {
//     if (autoShootTimer.current) clearTimeout(autoShootTimer.current);
//     if (revealedIds.length < 3 && isFanned) {
//       autoShootTimer.current = setTimeout(shootNextCard, 4000);
//     }
//   };

//   const shootNextCard = () => {
//     const remaining = CARDS_DATA.find(card => !revealedIds.includes(card.id));
//     if (remaining) {
//       handleShoot(remaining.id, remaining.color);
//     }
//   };

//   useEffect(() => {
//     breakSound.current = new Audio('/glass-break.mp3');
//     laserSound.current = new Audio('/laser.mp3');
//     setTimeout(() => setIsFanned(true), 1000);
//     return () => { if (autoShootTimer.current) clearTimeout(autoShootTimer.current); };
//   }, []);

//   useEffect(() => {
//     if (isFanned && !isFiring) {
//       resetAutoTimer();
//     }
//   }, [isFanned, revealedIds, isFiring]);

//   useEffect(() => {
//     const handleMouseMove = (e: MouseEvent) => {
//       if (isFiring || revealedIds.length >= 3 || !gunRef.current) return;
//       const mouseXFromCenter = e.clientX - window.innerWidth / 2;
//       const mouseYPercent = e.clientY / window.innerHeight;

//       // Ensure sway is applied correctly to the translate property
//       gunRef.current.style.transform = `translateX(calc(-50% + ${mouseXFromCenter}px))`;
//       gunRef.current.style.setProperty('--sway', `${mouseXFromCenter}px`);

//       const pitch = 0.5 - (mouseYPercent * 0.6); 
//       const yaw = Math.PI - (mouseXFromCenter / window.innerWidth * 0.4); 
//       setGunRotation([pitch, yaw, 0]);
//     };
//     window.addEventListener('mousemove', handleMouseMove);
//     return () => window.removeEventListener('mousemove', handleMouseMove);
//   }, [isFiring, revealedIds]);

//   const handleShoot = async (targetId: string, color: string) => {
//     if (!isFanned || isFiring || revealedIds.includes(targetId)) return;
//     if (autoShootTimer.current) clearTimeout(autoShootTimer.current);

//     const targetEl = document.getElementById(targetId);
//     if (!targetEl || !gunRef.current || !laserRef.current || !muzzleRef.current) return;

//     const rect = targetEl.getBoundingClientRect();
//     const tx = rect.left + rect.width / 2;
//     const ty = rect.top + rect.height / 2;
    
//     const targetXOffset = tx - window.innerWidth / 2;

//     // Fixed the centering shift: Update sway variable to match target location exactly
//     gunRef.current.style.setProperty('--sway', `${targetXOffset}px`);
//     gunRef.current.style.transform = `translateX(calc(-50% + ${targetXOffset}px))`;
//     setGunRotation([0.45, Math.PI, 0]); 

//     if (laserSound.current) { laserSound.current.currentTime = 0; laserSound.current.play().catch(() => {}); }

//     setIsFiring(true);
//     setActiveColor(color);

//     const mPos = muzzleRef.current.getBoundingClientRect();
//     const originX = mPos.left + mPos.width / 2;
//     const originY = mPos.top;
//     const dist = Math.sqrt(Math.pow(ty - originY, 2) + Math.pow(tx - originX, 2));

//     const laser = laserRef.current;
//     laser.style.left = `${originX}px`;
//     laser.style.top = `${originY}px`;
//     laser.style.height = `${dist}px`; 
//     laser.style.transform = `rotate(0deg)`; 
//     laser.style.backgroundColor = 'white'; 
//     laser.style.boxShadow = `0 0 40px ${color}, 0 0 80px ${color}`; 
//     laser.style.opacity = '1';
    
//     setShake(true);
//     setCrackingId(targetId); 
//     if (breakSound.current) { breakSound.current.currentTime = 0; breakSound.current.play().catch(() => {}); }

//     setTimeout(() => {
//       laser.style.opacity = '0'; setShake(false);
//       setRevealedIds(prev => [...prev, targetId]);
//       setCrackingId(null); setIsFiring(false);
//     }, 400);
//   };

//   return (
//     <div className={`relative w-full h-screen overflow-hidden transition-transform duration-75 ${shake ? 'scale-[1.04]' : 'scale-100'}`}>
//       <div className="fixed inset-0 z-0 bg-center bg-cover" style={{ backgroundImage: "url('/bg_image.jpeg')", filter: 'brightness(1.1) contrast(1.1)' }} />
      
//       <div className="fixed top-8 md:top-12 left-1/2 -translate-x-1/2 z-[4000] text-center w-full px-4 pointer-events-none">
//         <h1 className="text-white text-2xl md:text-6xl font-black italic tracking-tighter" style={{ textShadow: '0 0 40px #ff0000' }}>PRIZE VAULT</h1>
//         <p className="text-white/80 mt-1 md:mt-2 text-[10px] md:text-sm font-bold uppercase tracking-[0.2em] md:tracking-[0.5em]" style={{ textShadow: '0 0 10px rgba(255,255,255,0.5)' }}>Shoot the cards to reveal prize pool</p>
//       </div>

//       <div ref={laserRef} className="fixed w-[4px] md:w-[6px] z-[1500] pointer-events-none origin-top opacity-0 transition-opacity duration-100" />

//       {/* Gun Container: Use --sway for recoil stability */}
//       <div ref={gunRef} className={`fixed left-1/2 w-[220px] md:w-[400px] h-[350px] md:h-[600px] z-[2000] pointer-events-none -translate-x-1/2 transition-all duration-300 ease-out ${isFiring ? 'animate-recoil' : ''} ${revealedIds.length >= 3 ? '-bottom-96 opacity-0' : '-bottom-4 md:-bottom-32 opacity-100'}`} style={{'--sway': '0px'} as any}>
//         <div className="relative w-full h-full">
//           {isFiring && (
//             <div className="absolute top-10 md:top-12 left-1/2 -translate-x-1/2 w-24 md:w-40 h-24 md:h-40 z-50 pointer-events-none">
//                 <div className="absolute inset-0 bg-white rounded-full blur-xl animate-muzzle-flare" />
//                 <div className="absolute inset-0 rounded-full blur-[30px] md:blur-[60px] animate-muzzle-flare" style={{ backgroundColor: activeColor, opacity: 1 }} />
//             </div>
//           )}
//           <Canvas shadows dpr={[1, 2]}>
//             <ambientLight intensity={2.5} />
//             <PerspectiveCamera makeDefault position={[0, 0, 5]} fov={45} />
//             <spotLight position={[0, 10, 5]} intensity={8} color="white" />
//             <Suspense fallback={null}>
//               <Float speed={2} rotationIntensity={0.05} floatIntensity={0.1}>
//                 <GunModel targetRotation={gunRotation} />
//               </Float>
//             </Suspense>
//           </Canvas>
//           <div ref={muzzleRef} className="absolute top-[20%] md:top-[28%] left-1/2 -translate-x-1/2 w-2 h-2" />
//         </div>
//       </div>

//       <div className="relative flex items-center justify-center h-full w-full perspective-[2000px]">
//         {CARDS_DATA.map((card, idx) => (
//           <TrophyCard key={card.id} id={card.id} index={idx} isFanned={isFanned} prize={card.prize} glowColor={card.color} isRevealed={revealedIds.includes(card.id)} isCracking={crackingId === card.id} delay={card.delay} imageSrc={card.img} frontImage={card.frontImg} onManualClick={() => handleShoot(card.id, card.color)} />
//         ))}
//       </div>

//       <style jsx global>{`
//         @keyframes drift { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-15px); } }
//         /* Recoil now uses var(--sway) to prevent shifting to middle/left after firing */
//         @keyframes recoil {
//           0% { transform: translateX(calc(-50% + var(--sway))) translateY(0) scale(1); }
//           20% { transform: translateX(calc(-50% + var(--sway))) translateY(40px) md:translateY(100px) rotateX(-15deg); }
//           100% { transform: translateX(calc(-50% + var(--sway))) translateY(0); }
//         }
//         @keyframes muzzle-flare { 0% { scale: 0; opacity: 0; } 20% { scale: 1.5; opacity: 1; } 100% { scale: 3; opacity: 0; } }
//         @keyframes fallDown { 0% { transform: translate(0, 0) rotate(0deg); opacity: 1; } 100% { transform: translate(var(--tx), var(--ty)) rotate(var(--rot)); opacity: 0; } }
//         @keyframes shatter { 0% { opacity: 1; transform: scale(1); } 20% { opacity: 1; transform: scale(1.1); filter: brightness(2); } 100% { opacity: 0; transform: scale(1.8); filter: blur(15px); } }
//         @keyframes impact-flash { 0% { opacity: 0; } 20% { opacity: 0.9; } 100% { opacity: 0; } }
//         .animate-recoil { animation: recoil 0.25s ease-out; }
//         .animate-muzzle-flare { animation: muzzle-flare 0.3s ease-out forwards; }
//         .animate-shatter { animation: shatter 0.6s forwards ease-out; }
//         .animate-impact-flash { animation: impact-flash 0.3s forwards; }
//         .preserve-3d { transform-style: preserve-3d; }
//       `}</style>
//     </div>
//   );
// }
























"use client";

import React, { useState, useEffect, useRef, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useGLTF, Float, PerspectiveCamera } from '@react-three/drei';
import * as THREE from 'three';

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
        child.material.emissiveIntensity = 0.6;
        child.material.roughness = 0.1;
        child.material.metalness = 1.0;
        child.material.needsUpdate = true;
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
      {/* SCALE INCREASED: Gun is now larger and positioned higher (closer to user) */}
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
    <div className="absolute inset-0 z-40 pointer-events-none rounded-2xl overflow-hidden bg-white/10 backdrop-blur-[1px]">
      <svg className="w-full h-full stroke-white/80 stroke-[3px] fill-none" viewBox="0 0 100 100">
        <path d="M50 50 L55 40 L45 30 L52 15" className="animate-pulse" />
        <path d="M50 50 L65 55 L75 45 L90 52" className="animate-pulse" />
        <path d="M50 50 L40 60 L45 75 L30 85" className="animate-pulse" />
        <path d="M50 50 L35 45 L25 55 L10 40" className="animate-pulse" />
        <circle cx="50" cy="50" r="5" style={{ stroke: color }} className="opacity-50" />
      </svg>
      <div className="absolute inset-0 bg-white animate-impact-flash" />
    </div>
  );
}

function TrophyCard({ id, prize, glowColor, isRevealed, delay, imageSrc, frontImage, isCracking, isFanned, index, onManualClick }: any) {
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
      switch (id) {
        case 'c2': return 'translate(0, -42%) scale(0.78)'; 
        case 'c1': return 'translate(-42%, 35%) scale(0.78)';
        case 'c3': return 'translate(42%, 35%) scale(0.78)';
        default: return 'translate(0,0)';
      }
    }
    const xOffsets = ["-145%", "0%", "145%"];
    const rotations = ["-6deg", "0deg", "6deg"];
    return `translateX(${xOffsets[index]}) rotate(${rotations[index]})`;
  };

  return (
    <div id={id} onClick={() => onManualClick(id, glowColor)} 
      className={`absolute w-[150px] h-[210px] md:w-[280px] md:h-[400px] cursor-crosshair transition-transform active:scale-95 ${isRevealed ? 'pointer-events-none' : 'pointer-events-auto'}`}
      style={{ transform: getTransform(), opacity: isFanned ? 1 : 0.8, zIndex: isFanned ? (id === 'c2' ? 1010 : 1000 + index) : 1000 + index, transition: 'all 1.2s cubic-bezier(0.34, 1.56, 0.64, 1)' }}>
      <div className="w-full h-full preserve-3d" style={{ animation: isFanned ? `drift 8s ease-in-out infinite ${delay}` : 'none' }}>
        <div className={`absolute inset-0 rounded-2xl flex flex-col items-center justify-center transition-all duration-1000 ${isRevealed ? 'opacity-100 scale-100' : 'opacity-0 scale-50'}`} style={{ background: 'transparent', boxShadow: isRevealed ? `0 0 60px ${glowColor}55` : 'none' }}>
          {/* TROPHY SCALE INCREASED to 230% */}
          <img src={imageSrc} alt="prize" className="absolute w-[230%] h-[230%] object-contain max-w-none pointer-events-none z-10" style={{ top: '42%', left: '50%', transform: 'translate(-50%, -50%)', filter: isRevealed ? `drop-shadow(0 0 40px ${glowColor})` : 'none' }} />
          <div className="absolute bottom-4 z-20 text-center">
            <div className="text-white text-xl md:text-5xl font-black italic tracking-tighter" style={{ textShadow: `0 0 20px ${glowColor}` }}>{prize}</div>
          </div>
        </div>
        <div className={`absolute inset-0 z-30 overflow-hidden bg-transparent border border-white/20 rounded-2xl flex items-center justify-center transition-all duration-150 ${isRevealed ? 'animate-shatter pointer-events-none' : 'opacity-100'}`}>
          <img src={frontImage} alt="card face" className="absolute inset-0 w-full h-full object-cover opacity-95" />
          {isCracking && <CrackedOverlay color={glowColor} />}
        </div>
        {isRevealed && <ShatterEffect color={glowColor} />}
      </div>
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
  
  const autoShootTimer = useRef<NodeJS.Timeout | null>(null);

  const CARDS_DATA = [
    { id: "c1", prize: "₹15,000", color: "#1eafd7", img: "queen_trophy.png", frontImg: "heartofqueen.png", delay: "0s" },
    { id: "c2", prize: "₹25,000", color: "#fb923c", img: "king_trophy.png", frontImg: "kingofspades.png", delay: "-2s" },
    { id: "c3", prize: "₹10,000", color: "#2bff8a", img: "jack_trophy.png", frontImg: "jackofclubs.png", delay: "-4s" }
  ];

  const resetAutoTimer = () => {
    if (autoShootTimer.current) clearTimeout(autoShootTimer.current);
    if (revealedIds.length < 3 && isFanned) {
      autoShootTimer.current = setTimeout(shootNextCard, 4000);
    }
  };

  const shootNextCard = () => {
    const remaining = CARDS_DATA.find(card => !revealedIds.includes(card.id));
    if (remaining) {
      handleShoot(remaining.id, remaining.color);
    }
  };

  useEffect(() => {
    breakSound.current = new Audio('/glass-break.mp3');
    laserSound.current = new Audio('/laser.mp3');

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsFanned(true); 
          observer.disconnect();
        }
      },
      { threshold: 0.25 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);

    return () => { 
      if (autoShootTimer.current) clearTimeout(autoShootTimer.current);
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    if (isFanned && !isFiring) {
      resetAutoTimer();
    }
  }, [isFanned, revealedIds, isFiring]);

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
    
    const handleTouchMove = (e: TouchEvent) => {
      if (isFiring || revealedIds.length >= 3 || !gunRef.current) return;
      const touch = e.touches[0];
      const mouseXFromCenter = touch.clientX - window.innerWidth / 2;
      gunRef.current.style.transform = `translateX(calc(-50% + ${mouseXFromCenter}px))`;
      gunRef.current.style.setProperty('--sway', `${mouseXFromCenter}px`);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('touchmove', handleTouchMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleTouchMove);
    };
  }, [isFiring, revealedIds]);

  const handleShoot = async (targetId: string, color: string) => {
    if (!isFanned || isFiring || revealedIds.includes(targetId)) return;
    if (autoShootTimer.current) clearTimeout(autoShootTimer.current);

    const targetEl = document.getElementById(targetId);
    if (!targetEl || !gunRef.current || !laserRef.current || !muzzleRef.current) return;

    const rect = targetEl.getBoundingClientRect();
    const tx = rect.left + rect.width / 2;
    const ty = rect.top + rect.height / 2;
    
    const targetXOffset = tx - window.innerWidth / 2;

    gunRef.current.style.setProperty('--sway', `${targetXOffset}px`);
    gunRef.current.style.transform = `translateX(calc(-50% + ${targetXOffset}px))`;
    setGunRotation([0.45, Math.PI, 0]); 

    if (laserSound.current) { laserSound.current.currentTime = 0; laserSound.current.play().catch(() => {}); }

    setIsFiring(true);
    setActiveColor(color);

    const mPos = muzzleRef.current.getBoundingClientRect();
    const originX = mPos.left + mPos.width / 2;
    const originY = mPos.top;
    const dist = Math.sqrt(Math.pow(ty - originY, 2) + Math.pow(tx - originX, 2));

    const laser = laserRef.current;
    laser.style.left = `${originX}px`;
    laser.style.top = `${originY}px`;
    laser.style.height = `${dist}px`; 
    laser.style.opacity = '1';
    laser.style.backgroundColor = 'white'; 
    laser.style.boxShadow = `0 0 50px ${color}`;
    
    setShake(true);
    setCrackingId(targetId); 
    if (breakSound.current) { breakSound.current.currentTime = 0; breakSound.current.play().catch(() => {}); }

    setTimeout(() => {
      laser.style.opacity = '0'; setShake(false);
      setRevealedIds(prev => [...prev, targetId]);
      setCrackingId(null); setIsFiring(false);
    }, 400);
  };

  return (
    <div ref={sectionRef} className={`relative w-full h-screen min-h-[600px] pt-16 md:pt-20 overflow-hidden transition-transform duration-75 ${shake ? 'scale-[1.04]' : 'scale-100'}`}>
      <div className="absolute inset-0 z-0 bg-center bg-cover" style={{ backgroundImage: "url('/bg_image.jpeg')", filter: 'brightness(1.1) contrast(1.1)' }} />
      
      <div className="absolute top-6 md:top-10 left-1/2 -translate-x-1/2 z-[4000] text-center w-full px-4 pointer-events-none">
        <h1 className="text-white text-3xl md:text-6xl font-black italic tracking-tighter" style={{ textShadow: '0 0 40px #ff0000' }}>PRIZE VAULT</h1>
        <p className="text-white/80 mt-1 text-[10px] md:text-sm font-bold uppercase tracking-[0.2em] md:tracking-[0.5em]">Shoot the cards to reveal prize pool</p>
      </div>

      <div ref={laserRef} className="fixed w-[4px] md:w-[6px] z-[1500] pointer-events-none origin-top opacity-0 transition-opacity duration-100" />

      {/* Gun is lifted slightly closer to the viewer using -bottom-4 instead of -bottom-6 */}
      <div ref={gunRef} className={`fixed left-1/2 w-[220px] md:w-[450px] h-[320px] md:h-[650px] z-[2000] pointer-events-none -translate-x-1/2 transition-all duration-300 ease-out ${isFiring ? 'animate-recoil' : ''} ${revealedIds.length >= 3 ? '-bottom-96 opacity-0' : '-bottom-4 md:-bottom-24 opacity-100'}`} style={{'--sway': '0px'} as any}>
        <div className="relative w-full h-full">
          {isFiring && (
            <div className="absolute top-10 md:top-12 left-1/2 -translate-x-1/2 w-20 md:w-40 h-20 md:h-40 z-50 pointer-events-none">
                <div className="absolute inset-0 bg-white rounded-full blur-xl animate-muzzle-flare" />
                <div className="absolute inset-0 rounded-full blur-[30px] animate-muzzle-flare" style={{ backgroundColor: activeColor, opacity: 1 }} />
            </div>
          )}
          <Canvas shadows dpr={[1, 2]}>
            <ambientLight intensity={3.0} />
            <PerspectiveCamera makeDefault position={[0, 0, 4.5]} fov={45} />
            <Suspense fallback={null}>
              <Float speed={2} rotationIntensity={0.05} floatIntensity={0.1}>
                <GunModel targetRotation={gunRotation} />
              </Float>
            </Suspense>
          </Canvas>
          <div ref={muzzleRef} className="absolute top-[20%] md:top-[26%] left-1/2 -translate-x-1/2 w-2 h-2" />
        </div>
      </div>

      <div className="relative flex items-center justify-center h-[calc(100%-140px)] w-full perspective-[1800px]">
        {CARDS_DATA.map((card, idx) => (
          <TrophyCard key={card.id} id={card.id} index={idx} isFanned={isFanned} prize={card.prize} glowColor={card.color} isRevealed={revealedIds.includes(card.id)} isCracking={crackingId === card.id} delay={card.delay} imageSrc={card.img} frontImage={card.frontImg} onManualClick={() => handleShoot(card.id, card.color)} />
        ))}
      </div>

      <style jsx global>{`
        @keyframes drift { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-12px); } }
        @keyframes recoil {
          0% { transform: translateX(calc(-50% + var(--sway))) translateY(0); }
          20% { transform: translateX(calc(-50% + var(--sway))) translateY(35px) rotateX(-12deg); }
          100% { transform: translateX(calc(-50% + var(--sway))) translateY(0); }
        }
        @keyframes muzzle-flare { 0% { transform: scale(0); opacity: 0; } 20% { transform: scale(1.4); opacity: 1; } 100% { transform: scale(2.5); opacity: 0; } }
        @keyframes fallDown { 0% { transform: translate(0, 0) rotate(0deg); opacity: 1; } 100% { transform: translate(var(--tx), var(--ty)) rotate(var(--rot)); opacity: 0; } }
        @keyframes shatter { 0% { opacity: 1; transform: scale(1); } 100% { opacity: 0; transform: scale(1.6); filter: blur(12px); } }
        .animate-recoil { animation: recoil 0.25s ease-out; }
        .animate-muzzle-flare { animation: muzzle-flare 0.3s ease-out forwards; }
        .animate-shatter { animation: shatter 0.5s forwards ease-out; }
        .preserve-3d { transform-style: preserve-3d; }
      `}</style>
    </div>
  );
}