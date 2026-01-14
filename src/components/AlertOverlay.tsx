'use client';

interface AlertOverlayProps {
  isActive: boolean;
  onClose: () => void;
}

export default function AlertOverlay({ isActive, onClose }: AlertOverlayProps) {
  if (!isActive) return null;

  return (
    <div
      className="fixed inset-0 bg-black/60 backdrop-blur-md z-50 flex items-center justify-center animate-fade-in"
      onClick={onClose}
    >
      {/* Radial glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(34,197,94,0.15),transparent_50%)]" />

      <div
        className="relative glass-strong rounded-3xl px-16 py-12 text-center animate-fade-in"
        onClick={(e) => e.stopPropagation()}
        style={{ boxShadow: '0 0 80px rgba(34, 197, 94, 0.2)' }}
      >
        {/* Icon */}
        <div className="w-20 h-20 mx-auto mb-6 relative">
          <div className="absolute inset-0 bg-[#22c55e]/20 rounded-full blur-xl" />
          <div className="relative w-full h-full bg-gradient-to-br from-[#22c55e] to-[#16a34a] rounded-full flex items-center justify-center">
            <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
        </div>

        <h2 className="text-2xl font-medium text-white mb-2">
          クロージングのタイミング
        </h2>
        <p className="text-white/50">お客様の購買意欲が高まっています</p>

        <button
          onClick={onClose}
          className="mt-8 px-8 py-3 bg-[#22c55e] hover:bg-[#16a34a] text-white rounded-full font-medium transition-colors"
        >
          了解
        </button>
      </div>
    </div>
  );
}
