'use client';

interface ScoreGaugeProps {
  score: number;
}

export default function ScoreGauge({ score }: ScoreGaugeProps) {
  const getScoreColor = () => {
    if (score >= 70) return { main: '#22c55e', glow: 'rgba(34, 197, 94, 0.4)' };
    if (score >= 40) return { main: '#f59e0b', glow: 'rgba(245, 158, 11, 0.4)' };
    return { main: '#ef4444', glow: 'rgba(239, 68, 68, 0.4)' };
  };

  const colors = getScoreColor();
  const circumference = 2 * Math.PI * 58;
  const strokeDashoffset = circumference - (score / 100) * circumference * 0.75;

  return (
    <div className="flex flex-col items-center py-6">
      <div className="relative w-48 h-48">
        {/* Glow effect */}
        <div
          className="absolute inset-4 rounded-full blur-2xl transition-all duration-700"
          style={{ background: colors.glow }}
        />

        {/* Background ring */}
        <svg className="w-full h-full -rotate-[135deg]" viewBox="0 0 128 128">
          {/* Track */}
          <circle
            cx="64"
            cy="64"
            r="58"
            fill="none"
            stroke="rgba(255,255,255,0.06)"
            strokeWidth="6"
            strokeLinecap="round"
            strokeDasharray={circumference * 0.75}
          />
          {/* Progress */}
          <circle
            cx="64"
            cy="64"
            r="58"
            fill="none"
            stroke={colors.main}
            strokeWidth="6"
            strokeLinecap="round"
            strokeDasharray={circumference * 0.75}
            strokeDashoffset={strokeDashoffset}
            className="transition-all duration-700 ease-out"
            style={{ filter: `drop-shadow(0 0 8px ${colors.glow})` }}
          />
        </svg>

        {/* Center content */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span
            className="text-6xl font-light tracking-tighter transition-colors duration-500"
            style={{ color: colors.main }}
          >
            {score}
          </span>
          <span className="text-xs text-white/40 uppercase tracking-widest mt-1">Score</span>
        </div>
      </div>
    </div>
  );
}
