import React from 'react';

interface VideoLayerProps {
  videoRef?: React.Ref<HTMLVideoElement>;
  isVisible: boolean;
  onEnded?: () => void;
  className?: string;
}

export function VideoLayer({ videoRef, isVisible, onEnded, className = '' }: VideoLayerProps) {
  return (
    <video
      ref={videoRef}
      src="/video.mp4"
      muted
      playsInline
      preload="auto"
      onEnded={onEnded}
      className={`absolute inset-0 w-full h-full object-contain md:object-cover object-center bg-black transition-opacity duration-1000 ${
        isVisible ? 'opacity-100' : 'opacity-0'
      } ${className}`}
    />
  );
}
