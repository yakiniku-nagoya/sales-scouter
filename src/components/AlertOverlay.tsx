'use client';

import { useEffect, useState, useRef } from 'react';

interface AlertOverlayProps {
  isActive: boolean;
  onClose: () => void;
}

export default function AlertOverlay({ isActive, onClose }: AlertOverlayProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    if (isActive && videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.play();
      setShowButton(false);

      // 動画終了後にボタン表示
      const timer = setTimeout(() => {
        setShowButton(true);
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [isActive]);

  if (!isActive) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden bg-black"
      onClick={showButton ? onClose : undefined}
    >
      {/* 動画エフェクト */}
      <video
        ref={videoRef}
        className="absolute inset-0 w-full h-full object-cover"
        src="/alert-effect.mov"
        muted
        playsInline
        loop
      />

      {/* ボタン */}
      {showButton && (
        <div
          className="absolute bottom-16 left-1/2 -translate-x-1/2 z-20 animate-fade-up"
          onClick={(e) => e.stopPropagation()}
        >
          <button
            onClick={onClose}
            className="px-12 py-5 text-2xl rounded-xl transition-transform hover:scale-105 active:scale-95"
            style={{
              fontFamily: 'var(--font-yuji), serif',
              fontWeight: 'bold',
              background: `linear-gradient(180deg,
                #FFFFFF 0%,
                #FFF0B0 10%,
                #FFD700 30%,
                #FF8C00 60%,
                #CC4400 80%,
                #8B2500 100%
              )`,
              color: '#2a0800',
              border: '4px solid #3d1500',
              boxShadow: `
                0 0 30px rgba(255, 200, 0, 1),
                0 0 60px rgba(255, 150, 0, 0.8),
                0 0 100px rgba(255, 100, 0, 0.5),
                0 6px 0 #2a0800,
                inset 0 2px 4px rgba(255, 255, 255, 0.8)
              `,
              textShadow: '1px 1px 0 rgba(255,255,255,0.5), -1px -1px 0 rgba(0,0,0,0.2)',
            }}
          >
            今すぐクロージング
          </button>
        </div>
      )}
    </div>
  );
}
