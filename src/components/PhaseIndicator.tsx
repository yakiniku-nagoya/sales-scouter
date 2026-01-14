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
          ring: 'ring-[#22c55e]/40',
          bg: 'bg-[#22c55e]',
          text: 'text-[#22c55e]',
          line: 'bg-[#22c55e]',
        };
      case 'active':
        return {
          ring: 'ring-[#6366f1]/40',
          bg: 'bg-[#6366f1]',
          text: 'text-[#6366f1]',
          line: 'bg-[#6366f1]',
        };
      default:
        return {
          ring: 'ring-white/10',
          bg: 'bg-white/20',
          text: 'text-white/30',
          line: 'bg-white/10',
        };
    }
  };

  return (
    <div>
      <h3 className="text-sm font-medium text-white/60 mb-4">商談フェーズ</h3>
      <div className="glass rounded-2xl p-5">
        {/* Progress bar */}
        <div className="flex items-center gap-1 mb-6">
          {phases.map((phase, i) => {
            const styles = getStatusStyles(phase.status);
            return (
              <div key={i} className="flex-1 flex items-center">
                <div className={`h-1 flex-1 rounded-full ${styles.line}`} />
              </div>
            );
          })}
        </div>

        {/* Phase cards */}
        <div className="grid grid-cols-6 gap-2">
          {phases.map((phase, i) => {
            const styles = getStatusStyles(phase.status);
            return (
              <div key={i} className="text-center">
                <div
                  className={`w-8 h-8 mx-auto rounded-full ring-2 ${styles.ring} flex items-center justify-center mb-2`}
                >
                  {phase.status === 'completed' ? (
                    <svg className="w-4 h-4 text-[#22c55e]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                    </svg>
                  ) : (
                    <div className={`w-2 h-2 rounded-full ${styles.bg}`} />
                  )}
                </div>
                <span className="text-[10px] text-white/40 block leading-tight">{phase.shortName}</span>
                <span className={`text-lg font-light ${styles.text}`}>
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
