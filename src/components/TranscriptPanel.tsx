'use client';

interface TranscriptMessage {
  speaker: 'sales' | 'customer';
  text: string;
  highlight?: string;
}

interface TranscriptPanelProps {
  messages: TranscriptMessage[];
}

export default function TranscriptPanel({ messages }: TranscriptPanelProps) {
  const getSpeakerStyles = (speaker: TranscriptMessage['speaker']) => {
    return speaker === 'sales'
      ? { label: '営業', color: 'text-[#818cf8]', bg: 'bg-[#818cf8]/10 border-[#818cf8]/20' }
      : { label: '顧客', color: 'text-[#fbbf24]', bg: 'bg-[#fbbf24]/10 border-[#fbbf24]/20' };
  };

  const renderText = (message: TranscriptMessage) => {
    if (!message.highlight) return message.text;

    const parts = message.text.split(message.highlight);
    return (
      <>
        {parts[0]}
        <mark className="bg-[#4ade80]/15 text-[#4ade80] px-1 rounded border border-[#4ade80]/20">
          {message.highlight}
        </mark>
        {parts[1]}
      </>
    );
  };

  return (
    <div className="glass rounded-2xl p-5 flex-1">
      <h3 className="text-sm font-medium text-white/50 mb-4">文字起こし</h3>

      <div className="space-y-3 max-h-[140px] overflow-y-auto pr-1">
        {messages.map((message, i) => {
          const styles = getSpeakerStyles(message.speaker);
          return (
            <div key={i} className="flex gap-2.5">
              <span className={`text-[9px] font-medium px-2 py-1 rounded-full h-fit border ${styles.bg} ${styles.color}`}>
                {styles.label}
              </span>
              <p className="text-[12px] text-white/50 leading-relaxed flex-1">
                {renderText(message)}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
