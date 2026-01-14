'use client';

import { useEffect, useState } from 'react';

interface AlertOverlayProps {
  isActive: boolean;
  onClose: () => void;
}

export default function AlertOverlay({ isActive, onClose }: AlertOverlayProps) {
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    if (isActive) {
      setPhase(0);
      const timer1 = setTimeout(() => setPhase(1), 100);
      const timer2 = setTimeout(() => setPhase(2), 400);
      const timer3 = setTimeout(() => setPhase(3), 800);
      return () => {
        clearTimeout(timer1);
        clearTimeout(timer2);
        clearTimeout(timer3);
      };
    }
  }, [isActive]);

  if (!isActive) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden"
      onClick={onClose}
    >
      {/* Dark overlay with flash */}
      <div
        className={`absolute inset-0 transition-all duration-300 ${
          phase >= 1 ? 'bg-black/80' : 'bg-white'
        }`}
      />

      {/* Impact lines */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        {[...Array(16)].map((_, i) => (
          <div
            key={i}
            className={`absolute h-[200vh] w-1 bg-gradient-to-b from-transparent via-[#4ade80]/40 to-transparent transition-all duration-500 ${
              phase >= 1 ? 'opacity-100 scale-100' : 'opacity-0 scale-0'
            }`}
            style={{
              transform: `rotate(${i * 22.5}deg) scaleY(${phase >= 1 ? 1 : 0})`,
              transitionDelay: `${i * 20}ms`,
            }}
          />
        ))}
      </div>

      {/* Radial burst */}
      <div
        className={`absolute w-[150vw] h-[150vh] transition-all duration-700 ${
          phase >= 1 ? 'opacity-100 scale-100' : 'opacity-0 scale-0'
        }`}
        style={{
          background: 'radial-gradient(circle, rgba(74,222,128,0.25) 0%, transparent 50%)',
        }}
      />

      {/* Screen shake container */}
      <div className={`relative ${phase === 1 ? 'animate-shake' : ''}`}>
        {/* Main impact text */}
        <div className="relative">
          {/* Shadow/outline layer */}
          <div
            className={`absolute inset-0 flex items-center justify-center transition-all duration-200 ${
              phase >= 1 ? 'opacity-100' : 'opacity-0 scale-150'
            }`}
          >
            <span
              className="text-[120px] font-black tracking-tighter"
              style={{
                WebkitTextStroke: '8px rgba(74, 222, 128, 0.3)',
                color: 'transparent',
                filter: 'blur(8px)',
              }}
            >
              今だ！
            </span>
          </div>

          {/* Main text */}
          <div
            className={`relative transition-all duration-300 ${
              phase >= 1 ? 'opacity-100 scale-100' : 'opacity-0 scale-150'
            }`}
          >
            <span
              className="text-[120px] font-black tracking-tighter bg-gradient-to-b from-white via-[#4ade80] to-[#22c55e] bg-clip-text text-transparent drop-shadow-2xl"
              style={{
                textShadow: '0 0 60px rgba(74, 222, 128, 0.8), 0 0 120px rgba(74, 222, 128, 0.4)',
                filter: 'drop-shadow(0 0 30px rgba(74, 222, 128, 0.6))',
              }}
            >
              今だ！
            </span>
          </div>

          {/* Secondary text - sliding in */}
          <div
            className={`absolute -bottom-12 left-1/2 -translate-x-1/2 whitespace-nowrap transition-all duration-500 ${
              phase >= 2 ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'
            }`}
          >
            <span className="text-2xl font-bold text-white/90 tracking-widest">
              クロージングチャンス
            </span>
          </div>
        </div>

        {/* Floating particles */}
        {phase >= 2 && (
          <div className="absolute inset-0 pointer-events-none">
            {[...Array(20)].map((_, i) => (
              <div
                key={i}
                className="absolute w-2 h-2 rounded-full animate-float-particle"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  background: `rgba(74, 222, 128, ${0.3 + Math.random() * 0.5})`,
                  animationDelay: `${Math.random() * 2}s`,
                  animationDuration: `${2 + Math.random() * 2}s`,
                }}
              />
            ))}
          </div>
        )}
      </div>

      {/* Bottom action panel */}
      <div
        className={`absolute bottom-12 left-1/2 -translate-x-1/2 transition-all duration-500 ${
          phase >= 3 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="glass-elevated rounded-2xl px-8 py-5 text-center">
          <p className="text-sm text-white/50 mb-4">お客様の購買意欲が最高潮です</p>
          <button
            onClick={onClose}
            className="px-10 py-3 bg-gradient-to-r from-[#4ade80] to-[#22c55e] text-white rounded-full text-sm font-bold hover:opacity-90 transition-opacity glow-success animate-pulse-subtle"
          >
            クロージングへ
          </button>
        </div>
      </div>
    </div>
  );
}
