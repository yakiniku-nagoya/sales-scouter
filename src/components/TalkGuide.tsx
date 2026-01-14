'use client';

interface TalkGuideProps {
  currentPhase: string;
  suggestions: string[];
  checkpoints: { text: string; done: boolean }[];
}

export default function TalkGuide({ currentPhase, suggestions, checkpoints }: TalkGuideProps) {
  const completedCount = checkpoints.filter(c => c.done).length;

  return (
    <div className="glass rounded-2xl p-5 h-full">
      <div className="flex justify-between items-center mb-5">
        <h3 className="text-sm font-medium text-white/50">トークガイド</h3>
        <span className="text-[10px] text-[#818cf8] bg-[#818cf8]/10 px-2.5 py-1 rounded-full border border-[#818cf8]/20">
          {currentPhase}
        </span>
      </div>

      {/* Checkpoints */}
      <div className="mb-5">
        <div className="flex justify-between items-center mb-3">
          <span className="text-[11px] text-white/30">確認ポイント</span>
          <span className="text-[10px] text-white/20">{completedCount}/{checkpoints.length}</span>
        </div>
        <div className="space-y-2">
          {checkpoints.map((cp, i) => (
            <div key={i} className="flex items-start gap-2.5">
              <div className={`w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 ${
                cp.done
                  ? 'bg-[#4ade80]/15 border border-[#4ade80]/30'
                  : 'bg-white/[0.02] border border-white/10'
              }`}>
                {cp.done && (
                  <svg className="w-2.5 h-2.5 text-[#4ade80]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                  </svg>
                )}
              </div>
              <span className={`text-[12px] leading-relaxed ${cp.done ? 'text-white/30 line-through' : 'text-white/60'}`}>
                {cp.text}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Suggestions */}
      <div>
        <span className="text-[11px] text-white/30 mb-3 block">おすすめトーク</span>
        <div className="space-y-2">
          {suggestions.map((suggestion, i) => (
            <div
              key={i}
              className="p-3 rounded-xl bg-[#818cf8]/[0.04] border border-[#818cf8]/10 hover:border-[#818cf8]/25 cursor-pointer transition-all duration-200 hover:bg-[#818cf8]/[0.06]"
            >
              <p className="text-[12px] text-white/55 leading-relaxed">「{suggestion}」</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
