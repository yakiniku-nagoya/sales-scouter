'use client';

interface TimelineProps {
  scores: number[];
  threshold?: number;
}

export default function Timeline({ scores, threshold = 70 }: TimelineProps) {
  const getBarColor = (score: number) => {
    if (score >= 70) return '#22c55e';
    if (score >= 40) return '#f59e0b';
    return '#ef4444';
  };

  const maxScore = Math.max(...scores, 100);
  const thresholdPercent = (threshold / maxScore) * 100;

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-sm font-medium text-white/60">スコア推移</h3>
        <div className="flex gap-4 text-xs text-white/40">
          <span className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#22c55e]" />高
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#f59e0b]" />中
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#ef4444]" />低
          </span>
        </div>
      </div>

      <div className="glass rounded-2xl p-5 h-28 relative overflow-hidden">
        {/* Grid lines */}
        <div className="absolute inset-5 flex flex-col justify-between pointer-events-none">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="border-t border-white/5" />
          ))}
        </div>

        {/* Threshold line */}
        <div
          className="absolute left-5 right-5 border-t border-dashed border-[#22c55e]/30 z-10"
          style={{ bottom: `calc(${thresholdPercent}% + 20px)` }}
        >
          <span className="absolute right-0 -top-4 text-[10px] text-[#22c55e]/60">{threshold}</span>
        </div>

        {/* Bars */}
        <div className="flex items-end justify-between h-full gap-[2px] relative z-10">
          {scores.map((score, i) => {
            const isLast = i === scores.length - 1;
            return (
              <div
                key={i}
                className="flex-1 rounded-t transition-all duration-500 ease-out"
                style={{
                  height: `${(score / maxScore) * 100}%`,
                  background: isLast
                    ? `linear-gradient(to top, ${getBarColor(score)}, ${getBarColor(score)}dd)`
                    : getBarColor(score),
                  opacity: isLast ? 1 : 0.3 + (i / scores.length) * 0.5,
                  boxShadow: isLast ? `0 0 20px ${getBarColor(score)}40` : 'none',
                }}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}
