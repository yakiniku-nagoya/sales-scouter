'use client';

interface AlertOverlayProps {
  isActive: boolean;
  onClose: () => void;
}

export default function AlertOverlay({ isActive, onClose }: AlertOverlayProps) {
  if (!isActive) return null;

  return (
    <div
      className="fixed inset-0 bg-black/70 backdrop-blur-md z-50 flex items-center justify-center animate-scale-in"
      onClick={onClose}
    >
      {/* Radial glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(74,222,128,0.12),transparent_50%)]" />

      <div
        className="relative glass-elevated rounded-3xl px-14 py-10 text-center max-w-md mx-4"
        onClick={(e) => e.stopPropagation()}
        style={{ boxShadow: '0 0 100px rgba(74, 222, 128, 0.15)' }}
      >
        {/* Icon */}
        <div className="w-16 h-16 mx-auto mb-5 relative">
          <div className="absolute inset-0 bg-[#4ade80]/20 rounded-full blur-xl animate-pulse" />
          <div className="relative w-full h-full bg-gradient-to-br from-[#4ade80] to-[#22c55e] rounded-full flex items-center justify-center">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
        </div>

        <h2 className="text-xl font-medium text-white mb-2">
          クロージングのタイミング
        </h2>
        <p className="text-sm text-white/40 mb-6">お客様の購買意欲が高まっています</p>

        <button
          onClick={onClose}
          className="px-8 py-2.5 bg-gradient-to-r from-[#4ade80] to-[#22c55e] text-white rounded-full text-sm font-medium hover:opacity-90 transition-opacity glow-success"
        >
          了解
        </button>
      </div>
    </div>
  );
}
