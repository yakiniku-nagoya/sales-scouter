'use client';

interface Phase {
  name: string;
  shortName: string;
  score: number | null;
  status: 'completed' | 'active' | 'waiting';
}

interface PhaseIndicatorProps {
  phases: Phase[];
}

export default function PhaseIndicator({ phases }: PhaseIndicatorProps) {
  const getStatusStyles = (status: Phase['status']) => {
    switch (status) {
      case 'completed':
        return {
          ring: 'border-[#4ade80]/40',
          dot: 'bg-[#4ade80]',
          text: 'text-[#4ade80]',
          line: 'bg-[#4ade80]/60',
          glow: '0 0 12px rgba(74, 222, 128, 0.3)',
        };
      case 'active':
        return {
          ring: 'border-[#818cf8]/50',
          dot: 'bg-[#818cf8]',
          text: 'text-[#818cf8]',
          line: 'bg-[#818cf8]/60',
          glow: '0 0 12px rgba(129, 140, 248, 0.3)',
        };
      default:
        return {
          ring: 'border-white/10',
          dot: 'bg-white/20',
          text: 'text-white/25',
          line: 'bg-white/8',
          glow: 'none',
        };
    }
  };

  const completedCount = phases.filter(p => p.status === 'completed').length;
  const progress = (completedCount / phases.length) * 100;

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-sm font-medium text-white/50">商談フェーズ</h3>
        <span className="text-xs text-white/30">{completedCount}/{phases.length} 完了</span>
      </div>

      <div className="glass rounded-2xl p-5">
        {/* Progress bar */}
        <div className="relative h-1 bg-white/[0.04] rounded-full mb-6 overflow-hidden">
          <div
            className="absolute inset-y-0 left-0 bg-gradient-to-r from-[#4ade80] to-[#818cf8] rounded-full transition-all duration-700"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Phase nodes */}
        <div className="grid grid-cols-6 gap-1">
          {phases.map((phase, i) => {
            const styles = getStatusStyles(phase.status);
            return (
              <div key={i} className="text-center group">
                <div
                  className={`w-7 h-7 mx-auto rounded-full border-2 ${styles.ring} flex items-center justify-center mb-2 transition-all duration-300`}
                  style={{ boxShadow: styles.glow }}
                >
                  {phase.status === 'completed' ? (
                    <svg className="w-3.5 h-3.5 text-[#4ade80]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                    </svg>
                  ) : (
                    <div className={`w-1.5 h-1.5 rounded-full ${styles.dot}`} />
                  )}
                </div>
                <span className="text-[9px] text-white/35 block leading-tight mb-1">{phase.shortName}</span>
                <span className={`text-base font-light ${styles.text}`}>
                  {phase.score !== null ? phase.score : '—'}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
