'use client';

interface TalkGuideProps {
  currentPhase: string;
  suggestions: string[];
  checkpoints: { text: string; done: boolean }[];
}

export default function TalkGuide({ currentPhase, suggestions, checkpoints }: TalkGuideProps) {
  return (
    <div className="glass rounded-2xl p-5">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-sm font-medium text-white/60">トークガイド</h3>
        <span className="text-xs text-[#6366f1] bg-[#6366f1]/10 px-2.5 py-1 rounded-full ring-1 ring-[#6366f1]/20">
          {currentPhase}
        </span>
      </div>

      {/* Checkpoints */}
      <div className="mb-4">
        <span className="text-xs text-white/40 mb-2 block">確認ポイント</span>
        <div className="space-y-1.5">
          {checkpoints.map((cp, i) => (
            <div key={i} className="flex items-center gap-2">
              <span className={`w-4 h-4 rounded-full flex items-center justify-center text-[10px] ${
                cp.done
                  ? 'bg-[#22c55e]/20 text-[#22c55e] ring-1 ring-[#22c55e]/30'
                  : 'bg-white/5 text-white/30 ring-1 ring-white/10'
              }`}>
                {cp.done ? '✓' : ''}
              </span>
              <span className={`text-sm ${cp.done ? 'text-white/40 line-through' : 'text-white/70'}`}>
                {cp.text}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Suggested phrases */}
      <div>
        <span className="text-xs text-white/40 mb-2 block">おすすめトーク</span>
        <div className="space-y-2">
          {suggestions.map((suggestion, i) => (
            <div
              key={i}
              className="p-3 rounded-xl bg-[#6366f1]/5 ring-1 ring-[#6366f1]/10 hover:ring-[#6366f1]/30 cursor-pointer transition-all"
            >
              <p className="text-sm text-white/70">「{suggestion}」</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
