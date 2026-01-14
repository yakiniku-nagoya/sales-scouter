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
          dot: 'bg-[#4ade80]',
          tag: 'bg-[#4ade80]/10 text-[#4ade80] border-[#4ade80]/20',
          hover: 'hover:border-[#4ade80]/20',
        };
      case 'opportunity':
        return {
          dot: 'bg-[#fbbf24]',
          tag: 'bg-[#fbbf24]/10 text-[#fbbf24] border-[#fbbf24]/20',
          hover: 'hover:border-[#fbbf24]/20',
        };
      case 'warning':
        return {
          dot: 'bg-[#f87171]',
          tag: 'bg-[#f87171]/10 text-[#f87171] border-[#f87171]/20',
          hover: 'hover:border-[#f87171]/20',
        };
    }
  };

  return (
    <div className="glass rounded-2xl p-5">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-sm font-medium text-white/50">検出ポイント</h3>
        <span className="text-[10px] text-white/25 bg-white/[0.03] px-2.5 py-1 rounded-full border border-white/[0.04]">
          {highlights.length}件
        </span>
      </div>

      <div className="space-y-2 max-h-[220px] overflow-y-auto pr-1">
        {highlights.map((highlight, i) => {
          const styles = getTypeStyles(highlight.type);
          return (
            <div
              key={i}
              className={`p-3 rounded-xl bg-white/[0.01] border border-white/[0.03] cursor-pointer transition-all duration-200 ${styles.hover} hover:bg-white/[0.02]`}
            >
              <div className="flex items-center gap-2 mb-1.5">
                <span className={`w-1.5 h-1.5 rounded-full ${styles.dot}`} />
                <span className="text-[10px] text-white/25 font-mono">{highlight.time}</span>
                <span className={`text-[9px] px-2 py-0.5 rounded-full border ${styles.tag}`}>
                  {highlight.tag}
                </span>
              </div>
              <p className="text-[13px] text-white/60 leading-relaxed">「{highlight.text}」</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
