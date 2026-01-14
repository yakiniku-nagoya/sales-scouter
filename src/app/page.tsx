'use client';

import { useState, useEffect } from 'react';
import ScoreGauge from '@/components/ScoreGauge';
import ECGTimeline from '@/components/ECGTimeline';
import PhaseIndicator from '@/components/PhaseIndicator';
import HighlightPanel from '@/components/HighlightPanel';
import TranscriptPanel from '@/components/TranscriptPanel';
import AlertOverlay from '@/components/AlertOverlay';
import EmotionGraph from '@/components/EmotionGraph';
import NGWordAlert from '@/components/NGWordAlert';
import TalkGuide from '@/components/TalkGuide';

const highlights = [
  { time: '01:22:15', text: 'それなら今すぐにでも始めたい', type: 'positive' as const, tag: '購買意欲' },
  { time: '01:18:42', text: '費用対効果が気になる', type: 'opportunity' as const, tag: '価格関心' },
  { time: '01:15:08', text: '具体的にどう進めればいい？', type: 'positive' as const, tag: '次ステップ' },
  { time: '00:58:33', text: 'ちょっと考えさせてください', type: 'warning' as const, tag: '躊躇' },
];

const transcriptMessages = [
  { speaker: 'customer' as const, text: 'そうですね、それなら今すぐにでも始めたいって思ってるんですけど...', highlight: 'それなら今すぐにでも始めたい' },
  { speaker: 'sales' as const, text: 'ありがとうございます。それでは具体的なプランについてご説明させていただきますね。' },
  { speaker: 'customer' as const, text: 'はい、お願いします。' },
];

const phases = [
  { name: 'アイスブレイク', shortName: 'アイス', score: 95, status: 'completed' as const },
  { name: '課題深掘り', shortName: '課題', score: 88, status: 'completed' as const },
  { name: '緊急性確認', shortName: '緊急性', score: 82, status: 'completed' as const },
  { name: '提案', shortName: '提案', score: 78, status: 'active' as const },
  { name: 'リスク排除', shortName: 'リスク', score: null, status: 'waiting' as const },
  { name: 'クロージング', shortName: 'CL', score: null, status: 'waiting' as const },
];

const emotions = {
  expectation: 75,
  anxiety: 25,
  excitement: 68,
  trust: 82,
};

const ngWords = [
  { word: '絶対', time: '01:15:32', reason: '断定的な表現は信頼を損なう可能性', severity: 'medium' as const },
];

const talkGuideData = {
  currentPhase: '提案',
  suggestions: [
    '具体的にどのような結果をイメージされていますか？',
    '今のお気持ちを教えていただけますか？',
  ],
  checkpoints: [
    { text: '復縁したい理由を確認', done: true },
    { text: '相手との現在の関係性を把握', done: true },
    { text: '過去の問題点を共有', done: true },
    { text: '理想の未来像を確認', done: false },
    { text: 'サービス内容の説明', done: false },
  ],
};

export default function Home() {
  const [score, setScore] = useState(75);
  const [showAlert, setShowAlert] = useState(false);
  const [sessionTime, setSessionTime] = useState(5076);
  const [activeTab, setActiveTab] = useState<'highlight' | 'emotion' | 'ng'>('highlight');

  useEffect(() => {
    const timer = setInterval(() => {
      setSessionTime((prev) => prev + 1);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds: number) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
  };

  const updateScore = (newScore: number) => {
    setScore(Math.max(0, Math.min(100, newScore)));
  };

  const triggerAlert = () => {
    setShowAlert(true);
  };

  const startSimulation = () => {
    const simScores = [45, 52, 58, 65, 72, 78, 85, 82, 88, 92];
    let i = 0;
    const interval = setInterval(() => {
      if (i >= simScores.length) {
        clearInterval(interval);
        triggerAlert();
        return;
      }
      updateScore(simScores[i]);
      i++;
    }, 500);
  };

  const isClosingChance = score >= 70;

  return (
    <>
      {/* Ambient background */}
      <div className="bg-ambient" />

      <div className="relative z-10 min-h-screen">
        <AlertOverlay isActive={showAlert} onClose={() => setShowAlert(false)} />

        <div className="max-w-7xl mx-auto px-8 py-6">
          {/* Header */}
          <header className="flex justify-between items-center mb-8 animate-fade-up">
            <div className="flex items-center gap-4">
              <div className="relative">
                <div className="absolute inset-0 bg-[#818cf8] rounded-xl blur-lg opacity-30" />
                <div className="relative w-11 h-11 rounded-xl bg-gradient-to-br from-[#818cf8] to-[#6366f1] flex items-center justify-center">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
              </div>
              <div>
                <h1 className="text-lg font-semibold text-white tracking-tight">Sales Scouter</h1>
                <p className="text-xs text-white/40">リアルタイム商談分析</p>
              </div>
            </div>

            <div className="flex items-center gap-8">
              <div className="flex items-center gap-2.5 px-4 py-2 glass rounded-full">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#4ade80] opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-[#4ade80]" />
                </span>
                <span className="text-sm text-white/70">商談中</span>
              </div>
              <div className="font-mono text-2xl font-light text-white/60 tabular-nums tracking-tight">
                {formatTime(sessionTime)}
              </div>
            </div>
          </header>

          {/* Main Grid */}
          <div className="grid grid-cols-[1fr_300px_260px] gap-5">
            {/* Left Column */}
            <div className="space-y-5">
              {/* Score Card */}
              <div className="glass-elevated rounded-2xl p-6 animate-fade-up" style={{ animationDelay: '0.05s' }}>
                <ScoreGauge score={score} />

                {/* Action Button */}
                <div className="text-center mt-4">
                  <button
                    onClick={triggerAlert}
                    disabled={!isClosingChance}
                    className={`relative px-8 py-3 rounded-full text-sm font-medium transition-all duration-300
                      ${isClosingChance
                        ? 'bg-gradient-to-r from-[#4ade80] to-[#22c55e] text-white cursor-pointer glow-success animate-shimmer'
                        : 'bg-white/[0.03] text-white/30 cursor-not-allowed border border-white/[0.04]'
                      }`}
                  >
                    {isClosingChance ? 'クロージング推奨' : '機会を待機中'}
                  </button>
                </div>
              </div>

              <div className="animate-fade-up" style={{ animationDelay: '0.1s' }}>
                <ECGTimeline score={score} threshold={70} />
              </div>

              <div className="animate-fade-up" style={{ animationDelay: '0.15s' }}>
                <PhaseIndicator phases={phases} />
              </div>
            </div>

            {/* Center Column */}
            <div className="space-y-5">
              {/* Tab switcher */}
              <div className="flex gap-1 p-1 glass rounded-xl animate-fade-up" style={{ animationDelay: '0.1s' }}>
                {[
                  { id: 'highlight', label: '検出' },
                  { id: 'emotion', label: '感情' },
                  { id: 'ng', label: 'NG' },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as typeof activeTab)}
                    className={`flex-1 py-2 text-xs font-medium rounded-lg transition-all duration-200 ${
                      activeTab === tab.id
                        ? 'bg-[#818cf8] text-white shadow-lg shadow-[#818cf8]/20'
                        : 'text-white/40 hover:text-white/60 hover:bg-white/[0.02]'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              <div className="animate-fade-up" style={{ animationDelay: '0.15s' }}>
                {activeTab === 'highlight' && <HighlightPanel highlights={highlights} />}
                {activeTab === 'emotion' && <EmotionGraph emotions={emotions} />}
                {activeTab === 'ng' && <NGWordAlert ngWords={ngWords} />}
              </div>

              <div className="animate-fade-up" style={{ animationDelay: '0.2s' }}>
                <TranscriptPanel messages={transcriptMessages} />
              </div>
            </div>

            {/* Right Column */}
            <div className="animate-fade-up" style={{ animationDelay: '0.15s' }}>
              <TalkGuide
                currentPhase={talkGuideData.currentPhase}
                suggestions={talkGuideData.suggestions}
                checkpoints={talkGuideData.checkpoints}
              />
            </div>
          </div>

          {/* Demo Controls */}
          <div className="fixed bottom-6 left-1/2 -translate-x-1/2 flex gap-2 glass-elevated px-5 py-3 rounded-full">
            <button
              onClick={triggerAlert}
              className="px-4 py-1.5 bg-[#818cf8] text-white rounded-full text-xs font-medium hover:bg-[#6366f1] transition-colors"
            >
              アラート
            </button>
            <button
              onClick={() => updateScore(score + 15)}
              className="px-4 py-1.5 text-white/60 rounded-full text-xs font-medium hover:text-white hover:bg-white/[0.04] transition-all border border-white/[0.04]"
            >
              スコア↑
            </button>
            <button
              onClick={() => updateScore(score - 15)}
              className="px-4 py-1.5 text-white/60 rounded-full text-xs font-medium hover:text-white hover:bg-white/[0.04] transition-all border border-white/[0.04]"
            >
              スコア↓
            </button>
            <button
              onClick={startSimulation}
              className="px-4 py-1.5 text-white/60 rounded-full text-xs font-medium hover:text-white hover:bg-white/[0.04] transition-all border border-white/[0.04]"
            >
              シミュレーション
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
