import React from 'react';

interface IntroTextProps {
  showText: boolean;
  className?: string;
}

export function IntroText({ showText, className = '' }: IntroTextProps) {
  return (
    <div
      className={`absolute inset-0 flex items-center justify-center pointer-events-none transition-opacity duration-[3000ms] ease-in-out ${showText ? 'opacity-50' : 'opacity-0'
        } ${className}`}
    >
      <h1 className="text-white text-lg md:text-2xl font-mono tracking-[0.25em] font-light drop-shadow-lg text-center px-4 transition-transform duration-1000 scale-100 md:scale-105">
        Is anyone there…?
      </h1>
    </div>
  );
}
