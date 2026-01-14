'use client';

interface ScoreGaugeProps {
  score: number;
}

export default function ScoreGauge({ score }: ScoreGaugeProps) {
  const getScoreColor = () => {
    if (score >= 70) return { main: '#4ade80', glow: 'rgba(74, 222, 128, 0.35)' };
    if (score >= 40) return { main: '#fbbf24', glow: 'rgba(251, 191, 36, 0.35)' };
    return { main: '#f87171', glow: 'rgba(248, 113, 113, 0.35)' };
  };

  const colors = getScoreColor();
  const circumference = 2 * Math.PI * 56;
  const strokeDashoffset = circumference - (score / 100) * circumference * 0.75;

  return (
    <div className="flex flex-col items-center py-4">
      <div className="relative w-44 h-44">
        {/* Outer glow */}
        <div
          className="absolute inset-2 rounded-full blur-2xl opacity-60 transition-all duration-700"
          style={{ background: colors.glow }}
        />

        {/* SVG Gauge */}
        <svg className="w-full h-full -rotate-[135deg]" viewBox="0 0 120 120">
          {/* Background track */}
          <circle
            cx="60"
            cy="60"
            r="56"
            fill="none"
            stroke="rgba(255,255,255,0.04)"
            strokeWidth="4"
            strokeLinecap="round"
            strokeDasharray={circumference * 0.75}
          />
          {/* Gradient definition */}
          <defs>
            <linearGradient id="scoreGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor={colors.main} stopOpacity="0.6" />
              <stop offset="100%" stopColor={colors.main} />
            </linearGradient>
          </defs>
          {/* Progress arc */}
          <circle
            cx="60"
            cy="60"
            r="56"
            fill="none"
            stroke="url(#scoreGradient)"
            strokeWidth="4"
            strokeLinecap="round"
            strokeDasharray={circumference * 0.75}
            strokeDashoffset={strokeDashoffset}
            className="transition-all duration-700 ease-out"
            style={{ filter: `drop-shadow(0 0 6px ${colors.glow})` }}
          />
        </svg>

        {/* Center content */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span
            className="text-5xl font-extralight tracking-tighter transition-colors duration-500"
            style={{ color: colors.main }}
          >
            {score}
          </span>
          <span className="text-[10px] text-white/30 uppercase tracking-[0.2em] mt-1">Instant Score</span>
        </div>
      </div>
    </div>
  );
}
