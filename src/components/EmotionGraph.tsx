'use client';

interface EmotionGraphProps {
  emotions: {
    expectation: number;
    anxiety: number;
    excitement: number;
    trust: number;
  };
}

export default function EmotionGraph({ emotions }: EmotionGraphProps) {
  const emotionData = [
    { label: '期待', value: emotions.expectation, color: '#4ade80' },
    { label: '信頼', value: emotions.trust, color: '#818cf8' },
    { label: '興奮', value: emotions.excitement, color: '#fbbf24' },
    { label: '不安', value: emotions.anxiety, color: '#f87171', inverse: true },
  ];

  const sortedData = [...emotionData].sort((a, b) => {
    if (a.inverse) return 1;
    if (b.inverse) return -1;
    return b.value - a.value;
  });
  const dominant = sortedData[0];

  return (
    <div className="glass rounded-2xl p-5">
      <h3 className="text-sm font-medium text-white/50 mb-4">感情分析</h3>

      <div className="space-y-3">
        {emotionData.map((emotion, i) => (
          <div key={i} className="flex items-center gap-3">
            <span className="text-[11px] text-white/40 w-7">{emotion.label}</span>
            <div className="flex-1 h-1.5 bg-white/[0.04] rounded-full overflow-hidden">
              <div
                className="h-full rounded-full transition-all duration-700 ease-out"
                style={{
                  width: `${emotion.value}%`,
                  background: `linear-gradient(90deg, ${emotion.color}80, ${emotion.color})`,
                  boxShadow: `0 0 8px ${emotion.color}40`,
                }}
              />
            </div>
            <span className="text-[11px] text-white/30 w-6 text-right font-mono">{emotion.value}</span>
          </div>
        ))}
      </div>

      {/* Dominant emotion */}
      <div className="mt-5 pt-4 border-t border-white/[0.04] flex items-center justify-between">
        <span className="text-[11px] text-white/30">優勢感情</span>
        <span
          className="text-xs font-medium px-3 py-1.5 rounded-full border"
          style={{
            backgroundColor: `${dominant.color}10`,
            color: dominant.color,
            borderColor: `${dominant.color}25`,
          }}
        >
          {dominant.label}が高い
        </span>
      </div>
    </div>
  );
}
