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
      ? { label: '営業', color: 'text-[#6366f1]', bg: 'bg-[#6366f1]/10 ring-[#6366f1]/20' }
      : { label: '顧客', color: 'text-[#f59e0b]', bg: 'bg-[#f59e0b]/10 ring-[#f59e0b]/20' };
  };

  const renderText = (message: TranscriptMessage) => {
    if (!message.highlight) return message.text;

    const parts = message.text.split(message.highlight);
    return (
      <>
        {parts[0]}
        <mark className="bg-[#22c55e]/20 text-[#22c55e] px-1 rounded ring-1 ring-[#22c55e]/20">
          {message.highlight}
        </mark>
        {parts[1]}
      </>
    );
  };

  return (
    <div className="glass rounded-2xl p-5 flex-1">
      <h3 className="text-sm font-medium text-white/60 mb-4">文字起こし</h3>

      <div className="space-y-3 max-h-[160px] overflow-y-auto pr-1">
        {messages.map((message, i) => {
          const styles = getSpeakerStyles(message.speaker);
          return (
            <div key={i} className="flex gap-3">
              <span className={`text-[10px] font-medium px-2 py-1 rounded-full h-fit ring-1 ${styles.bg} ${styles.color}`}>
                {styles.label}
              </span>
              <p className="text-sm text-white/60 leading-relaxed flex-1">
                {renderText(message)}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
