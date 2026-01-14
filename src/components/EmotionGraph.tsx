'use client';

interface EmotionGraphProps {
  emotions: {
    expectation: number; // 期待
    anxiety: number;     // 不安
    excitement: number;  // 興奮
    trust: number;       // 信頼
  };
}

export default function EmotionGraph({ emotions }: EmotionGraphProps) {
  const emotionData = [
    { label: '期待', value: emotions.expectation, color: '#22c55e' },
    { label: '信頼', value: emotions.trust, color: '#6366f1' },
    { label: '興奮', value: emotions.excitement, color: '#f59e0b' },
    { label: '不安', value: emotions.anxiety, color: '#ef4444' },
  ];

  return (
    <div className="glass rounded-2xl p-5">
      <h3 className="text-sm font-medium text-white/60 mb-4">感情分析</h3>

      <div className="space-y-3">
        {emotionData.map((emotion, i) => (
          <div key={i} className="flex items-center gap-3">
            <span className="text-xs text-white/50 w-8">{emotion.label}</span>
            <div className="flex-1 h-2 bg-white/5 rounded-full overflow-hidden">
              <div
                className="h-full rounded-full transition-all duration-700 ease-out"
                style={{
                  width: `${emotion.value}%`,
                  backgroundColor: emotion.color,
                  boxShadow: `0 0 10px ${emotion.color}60`,
                }}
              />
            </div>
            <span className="text-xs text-white/40 w-8 text-right">{emotion.value}</span>
          </div>
        ))}
      </div>

      {/* Dominant emotion */}
      <div className="mt-4 pt-4 border-t border-white/5 flex items-center justify-between">
        <span className="text-xs text-white/40">優勢感情</span>
        <span
          className="text-sm font-medium px-2.5 py-1 rounded-full"
          style={{
            backgroundColor: `${emotionData[0].color}20`,
            color: emotionData[0].color,
          }}
        >
          {emotionData.sort((a, b) => b.value - a.value)[0].label}が高い
        </span>
      </div>
    </div>
  );
}
