'use client';

interface Highlight {
  time: string;
  text: string;
  type: 'positive' | 'opportunity' | 'warning';
  tag: string;
}

interface HighlightPanelProps {
  highlights: Highlight[];
}

export default function HighlightPanel({ highlights }: HighlightPanelProps) {
  const getTypeStyles = (type: Highlight['type']) => {
    switch (type) {
      case 'positive':
        return {
          dot: 'bg-[#22c55e]',
          tag: 'bg-[#22c55e]/10 text-[#22c55e] ring-[#22c55e]/20',
          glow: 'hover:shadow-[inset_0_0_20px_rgba(34,197,94,0.1)]',
        };
      case 'opportunity':
        return {
          dot: 'bg-[#f59e0b]',
          tag: 'bg-[#f59e0b]/10 text-[#f59e0b] ring-[#f59e0b]/20',
          glow: 'hover:shadow-[inset_0_0_20px_rgba(245,158,11,0.1)]',
        };
      case 'warning':
        return {
          dot: 'bg-[#ef4444]',
          tag: 'bg-[#ef4444]/10 text-[#ef4444] ring-[#ef4444]/20',
          glow: 'hover:shadow-[inset_0_0_20px_rgba(239,68,68,0.1)]',
        };
    }
  };

  return (
    <div className="glass rounded-2xl p-5">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-sm font-medium text-white/60">検出ポイント</h3>
        <span className="text-xs text-white/30 bg-white/5 px-2.5 py-1 rounded-full ring-1 ring-white/10">
          {highlights.length}
        </span>
      </div>

      <div className="space-y-2 max-h-[260px] overflow-y-auto pr-1">
        {highlights.map((highlight, i) => {
          const styles = getTypeStyles(highlight.type);
          return (
            <div
              key={i}
              className={`p-3.5 rounded-xl bg-white/[0.02] hover:bg-white/[0.04]
                ring-1 ring-white/5 cursor-pointer transition-all duration-300 ${styles.glow}`}
            >
              <div className="flex items-center gap-2 mb-2">
                <span className={`w-1.5 h-1.5 rounded-full ${styles.dot}`} />
                <span className="text-[11px] text-white/30 font-mono">{highlight.time}</span>
                <span className={`text-[10px] px-2 py-0.5 rounded-full ring-1 ${styles.tag}`}>
                  {highlight.tag}
                </span>
              </div>
              <p className="text-sm text-white/70 leading-relaxed">「{highlight.text}」</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
