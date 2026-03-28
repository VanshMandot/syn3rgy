import React from 'react';

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
