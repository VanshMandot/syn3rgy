import React, { useState, useEffect } from 'react';

interface VideoLayerProps {
  videoRef?: React.Ref<HTMLVideoElement>;
  isVisible: boolean;
  onEnded?: () => void;
  className?: string;
}

export function VideoLayer({ videoRef, isVisible, onEnded, className = '' }: VideoLayerProps) {
  const [videoSrc, setVideoSrc] = useState('/video.mp4');

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setVideoSrc('/video2.mp4');
      } else {
        setVideoSrc('/video.mp4');
      }
    };

    // Set source correctly on initial mount
    handleResize();

    // Listen for resize to update dynamically
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (videoRef && 'current' in videoRef && videoRef.current) {
      videoRef.current.volume = 0.15;
      videoRef.current.playbackRate = 1.5;
    }
  }, [videoSrc]);

  return (
    <video
      ref={videoRef}
      src={videoSrc}
      playsInline
      preload="auto"
      onEnded={onEnded}
      className={`absolute inset-0 w-full h-full object-cover object-center bg-black transition-opacity duration-1000 ${
        isVisible ? 'opacity-100' : 'opacity-0'
      } ${className}`}
    />
  );
}
