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
          bg: 'bg-[#ef4444]/10',
          border: 'ring-[#ef4444]/30',
          text: 'text-[#ef4444]',
          icon: '!',
        };
      case 'medium':
        return {
          bg: 'bg-[#f59e0b]/10',
          border: 'ring-[#f59e0b]/30',
          text: 'text-[#f59e0b]',
          icon: '!',
        };
      case 'low':
        return {
          bg: 'bg-[#6366f1]/10',
          border: 'ring-[#6366f1]/30',
          text: 'text-[#6366f1]',
          icon: 'i',
        };
    }
  };

  if (ngWords.length === 0) {
    return (
      <div className="glass rounded-2xl p-5">
        <h3 className="text-sm font-medium text-white/60 mb-4">NGワード検知</h3>
        <div className="flex items-center justify-center py-6 text-white/30 text-sm">
          <svg className="w-5 h-5 mr-2 text-[#22c55e]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
          問題なし
        </div>
      </div>
    );
  }

  return (
    <div className="glass rounded-2xl p-5">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-sm font-medium text-white/60">NGワード検知</h3>
        <span className="text-xs text-[#ef4444] bg-[#ef4444]/10 px-2.5 py-1 rounded-full ring-1 ring-[#ef4444]/20">
          {ngWords.length}件
        </span>
      </div>

      <div className="space-y-2 max-h-[140px] overflow-y-auto">
        {ngWords.map((ng, i) => {
          const styles = getSeverityStyles(ng.severity);
          return (
            <div
              key={i}
              className={`p-3 rounded-xl ${styles.bg} ring-1 ${styles.border}`}
            >
              <div className="flex items-start gap-2">
                <span className={`w-5 h-5 rounded-full ${styles.bg} ${styles.text} flex items-center justify-center text-xs font-bold ring-1 ${styles.border}`}>
                  {styles.icon}
                </span>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className={`text-sm font-medium ${styles.text}`}>「{ng.word}」</span>
                    <span className="text-[10px] text-white/30 font-mono">{ng.time}</span>
                  </div>
                  <p className="text-xs text-white/50">{ng.reason}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
