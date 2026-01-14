'use client';

import { useState, useRef, useEffect } from 'react';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

interface AskAIPanelProps {
  isOpen: boolean;
  onToggle: () => void;
}

const quickQuestions = [
  '不安点は？',
  '次の一言',
  'CLタイミング',
  'まとめ',
];

export default function AskAIPanel({ isOpen, onToggle }: AskAIPanelProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: '商談について何でも聞いてください',
    },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 300);
    }
  }, [isOpen]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSubmit = async (question: string) => {
    if (!question.trim() || isLoading) return;

    const userMessage: Message = { role: 'user', content: question };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    setTimeout(() => {
      const responses: Record<string, string> = {
        '不安点は？': '「費用対効果」と「本当に結果が出るか」に不安を感じています。具体的な成功事例を示すことをおすすめします。',
        '次の一言': '「具体的にどのような結果をイメージされていますか？」と聞いてみてください。',
        'CLタイミング': 'スコア75で高め。価格と期間を確認後にクロージングへ。',
        'まとめ': '【良い点】購買意欲高い、競合優位\n【注意】価格懸念、一度躊躇あり\n【推奨】成功事例→具体プラン提示',
      };

      const aiResponse: Message = {
        role: 'assistant',
        content: responses[question] || `現在スコア75で購買意欲は高い状態です。「今すぐにでも始めたい」という発言は強い購買シグナルです。`,
      };
      setMessages((prev) => [...prev, aiResponse]);
      setIsLoading(false);
    }, 800);
  };

  return (
    <div className="fixed right-6 bottom-6 z-40">
      {/* Expanded Panel */}
      <div
        className={`absolute right-0 bottom-0 origin-bottom-right transition-all duration-300 ease-out ${
          isOpen
            ? 'w-80 h-[420px] opacity-100 scale-100'
            : 'w-14 h-14 opacity-0 scale-75 pointer-events-none'
        }`}
      >
        <div className="w-full h-full glass-elevated rounded-2xl overflow-hidden flex flex-col">
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3 border-b border-white/[0.04]">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-md bg-gradient-to-br from-[#818cf8] to-[#6366f1] flex items-center justify-center">
                <svg className="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <span className="text-xs font-medium text-white/70">AIに質問</span>
            </div>
            <button
              onClick={onToggle}
              className="w-6 h-6 rounded-md bg-white/[0.03] hover:bg-white/[0.06] flex items-center justify-center transition-colors"
            >
              <svg className="w-3.5 h-3.5 text-white/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-3 space-y-3">
            {messages.map((message, i) => (
              <div
                key={i}
                className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[90%] px-3 py-2 rounded-xl text-[12px] leading-relaxed whitespace-pre-wrap ${
                    message.role === 'user'
                      ? 'bg-[#818cf8] text-white rounded-br-sm'
                      : 'bg-white/[0.04] text-white/60 rounded-bl-sm border border-white/[0.04]'
                  }`}
                >
                  {message.content}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-white/[0.04] text-white/50 px-3 py-2 rounded-xl rounded-bl-sm border border-white/[0.04]">
                  <div className="flex gap-1">
                    <span className="w-1.5 h-1.5 bg-white/30 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                    <span className="w-1.5 h-1.5 bg-white/30 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                    <span className="w-1.5 h-1.5 bg-white/30 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick questions */}
          <div className="px-3 pb-2">
            <div className="flex gap-1.5 overflow-x-auto scrollbar-hide">
              {quickQuestions.map((q, i) => (
                <button
                  key={i}
                  onClick={() => handleSubmit(q)}
                  disabled={isLoading}
                  className="flex-shrink-0 px-2.5 py-1 text-[10px] text-white/40 bg-white/[0.02] hover:bg-white/[0.05] border border-white/[0.04] rounded-full transition-colors disabled:opacity-50"
                >
                  {q}
                </button>
              ))}
            </div>
          </div>

          {/* Input */}
          <div className="px-3 pb-3">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSubmit(input);
              }}
              className="flex gap-2"
            >
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="質問を入力..."
                disabled={isLoading}
                className="flex-1 px-3 py-2 bg-white/[0.03] border border-white/[0.06] rounded-lg text-[12px] text-white placeholder-white/25 focus:outline-none focus:border-[#818cf8]/50 transition-colors disabled:opacity-50"
              />
              <button
                type="submit"
                disabled={!input.trim() || isLoading}
                className="px-3 py-2 bg-[#818cf8] hover:bg-[#6366f1] disabled:bg-white/[0.03] disabled:text-white/20 text-white rounded-lg transition-colors"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                </svg>
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Floating Button (visible when closed) */}
      <button
        onClick={onToggle}
        className={`w-14 h-14 bg-gradient-to-br from-[#818cf8] to-[#6366f1] rounded-2xl flex items-center justify-center shadow-lg shadow-[#818cf8]/25 hover:shadow-[#818cf8]/40 hover:scale-105 transition-all ${
          isOpen ? 'opacity-0 scale-75 pointer-events-none' : 'opacity-100 scale-100'
        }`}
      >
        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      </button>
    </div>
  );
}
