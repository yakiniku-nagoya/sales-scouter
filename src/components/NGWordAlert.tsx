'use client';

interface NGWord {
  word: string;
  time: string;
  reason: string;
  severity: 'high' | 'medium' | 'low';
}

interface NGWordAlertProps {
  ngWords: NGWord[];
}

export default function NGWordAlert({ ngWords }: NGWordAlertProps) {
  const getSeverityStyles = (severity: NGWord['severity']) => {
    switch (severity) {
      case 'high':
        return {
          bg: 'bg-[#f87171]/10',
          border: 'border-[#f87171]/20',
          text: 'text-[#f87171]',
        };
      case 'medium':
        return {
          bg: 'bg-[#fbbf24]/10',
          border: 'border-[#fbbf24]/20',
          text: 'text-[#fbbf24]',
        };
      case 'low':
        return {
          bg: 'bg-[#818cf8]/10',
          border: 'border-[#818cf8]/20',
          text: 'text-[#818cf8]',
        };
    }
  };

  if (ngWords.length === 0) {
    return (
      <div className="glass rounded-2xl p-5">
        <h3 className="text-sm font-medium text-white/50 mb-4">NGワード検知</h3>
        <div className="flex items-center justify-center py-8">
          <div className="flex items-center gap-2 text-[#4ade80]">
            <div className="w-6 h-6 rounded-full bg-[#4ade80]/10 flex items-center justify-center">
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <span className="text-sm">問題なし</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="glass rounded-2xl p-5">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-sm font-medium text-white/50">NGワード検知</h3>
        <span className="text-[10px] text-[#f87171] bg-[#f87171]/10 px-2.5 py-1 rounded-full border border-[#f87171]/20">
          {ngWords.length}件
        </span>
      </div>

      <div className="space-y-2 max-h-[140px] overflow-y-auto">
        {ngWords.map((ng, i) => {
          const styles = getSeverityStyles(ng.severity);
          return (
            <div
              key={i}
              className={`p-3 rounded-xl ${styles.bg} border ${styles.border}`}
            >
              <div className="flex items-center gap-2 mb-1.5">
                <span className={`text-sm font-medium ${styles.text}`}>「{ng.word}」</span>
                <span className="text-[10px] text-white/25 font-mono">{ng.time}</span>
              </div>
              <p className="text-[11px] text-white/40">{ng.reason}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
