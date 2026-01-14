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

const initialScores = [35, 42, 48, 52, 45, 38, 55, 62, 58, 65, 72, 68, 75, 82, 78, 70, 65, 72, 80, 85, 78, 75, 72, 68, 75, 82, 88, 85, 78, 75];

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

// 6段階フェーズ
const phases = [
  { name: 'アイスブレイク', shortName: 'アイス', score: 95, status: 'completed' as const },
  { name: '課題深掘り', shortName: '課題', score: 88, status: 'completed' as const },
  { name: '緊急性確認', shortName: '緊急性', score: 82, status: 'completed' as const },
  { name: '提案', shortName: '提案', score: 78, status: 'active' as const },
  { name: 'リスク排除', shortName: 'リスク', score: null, status: 'waiting' as const },
  { name: 'クロージング', shortName: 'CL', score: null, status: 'waiting' as const },
];

// 感情データ
const emotions = {
  expectation: 75,
  anxiety: 25,
  excitement: 68,
  trust: 82,
};

// NGワード
const ngWords = [
  { word: '絶対', time: '01:15:32', reason: '断定的な表現は信頼を損なう可能性', severity: 'medium' as const },
];

// トークガイド
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
  const [scores, setScores] = useState(initialScores);
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
    setScore(newScore);
    setScores((prev) => [...prev.slice(1), newScore]);
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
    <div className="min-h-screen bg-gradient-mesh">
      <AlertOverlay isActive={showAlert} onClose={() => setShowAlert(false)} />

      <div className="max-w-7xl mx-auto px-6 py-6">
        {/* Header */}
        <header className="flex justify-between items-center mb-8">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#6366f1] to-[#4f46e5] flex items-center justify-center shadow-lg shadow-[#6366f1]/20">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
            <div>
              <h1 className="text-xl font-semibold text-white tracking-tight">Sales Scouter</h1>
              <p className="text-xs text-white/40">リアルタイム商談分析</p>
            </div>
          </div>

          <div className="flex items-center gap-8">
            <div className="flex items-center gap-2">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#22c55e] opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#22c55e]" />
              </span>
              <span className="text-sm text-white/60">商談中</span>
            </div>
            <div className="text-3xl font-light text-white/80 tabular-nums tracking-tight font-mono">
              {formatTime(sessionTime)}
            </div>
          </div>
        </header>

        {/* Main Grid - 3 columns */}
        <div className="grid grid-cols-[1fr_320px_280px] gap-5">
          {/* Left Column - Score & Timeline */}
          <div className="space-y-5">
            {/* Score Card */}
            <div className="glass rounded-3xl p-6">
              <ScoreGauge score={score} />

              {/* Action Button */}
              <div className="text-center mt-2">
                <button
                  onClick={triggerAlert}
                  disabled={!isClosingChance}
                  className={`relative px-8 py-3.5 rounded-full text-sm font-medium transition-all duration-300 overflow-hidden
                    ${isClosingChance
                      ? 'bg-gradient-to-r from-[#22c55e] to-[#16a34a] text-white cursor-pointer glow-success'
                      : 'bg-white/5 text-white/30 cursor-not-allowed ring-1 ring-white/10'
                    }`}
                >
                  {isClosingChance && (
                    <span className="absolute inset-0 animate-shimmer" />
                  )}
                  <span className="relative">
                    {isClosingChance ? 'クロージング推奨' : '機会を待機中'}
                  </span>
                </button>
              </div>
            </div>

            <ECGTimeline score={score} threshold={70} />
            <PhaseIndicator phases={phases} />
          </div>

          {/* Center Column - Highlights/Emotion/NG + Transcript */}
          <div className="space-y-5">
            {/* Tab switcher */}
            <div className="flex gap-1 p-1 bg-white/5 rounded-xl">
              {[
                { id: 'highlight', label: '検出' },
                { id: 'emotion', label: '感情' },
                { id: 'ng', label: 'NG' },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as typeof activeTab)}
                  className={`flex-1 py-2 text-xs font-medium rounded-lg transition-all ${
                    activeTab === tab.id
                      ? 'bg-[#6366f1] text-white'
                      : 'text-white/50 hover:text-white/70'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Tab content */}
            {activeTab === 'highlight' && <HighlightPanel highlights={highlights} />}
            {activeTab === 'emotion' && <EmotionGraph emotions={emotions} />}
            {activeTab === 'ng' && <NGWordAlert ngWords={ngWords} />}

            <TranscriptPanel messages={transcriptMessages} />
          </div>

          {/* Right Column - Talk Guide */}
          <div>
            <TalkGuide
              currentPhase={talkGuideData.currentPhase}
              suggestions={talkGuideData.suggestions}
              checkpoints={talkGuideData.checkpoints}
            />
          </div>
        </div>

        {/* Demo Controls */}
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 flex gap-2 glass-strong px-4 py-2.5 rounded-full">
          <button
            onClick={triggerAlert}
            className="px-4 py-1.5 bg-[#6366f1] text-white rounded-full text-xs font-medium hover:bg-[#4f46e5] transition-colors"
          >
            アラート
          </button>
          <button
            onClick={() => updateScore(Math.min(score + 15, 100))}
            className="px-4 py-1.5 bg-white/5 text-white/70 rounded-full text-xs font-medium hover:bg-white/10 transition-colors ring-1 ring-white/10"
          >
            スコア↑
          </button>
          <button
            onClick={() => updateScore(Math.max(score - 15, 0))}
            className="px-4 py-1.5 bg-white/5 text-white/70 rounded-full text-xs font-medium hover:bg-white/10 transition-colors ring-1 ring-white/10"
          >
            スコア↓
          </button>
          <button
            onClick={startSimulation}
            className="px-4 py-1.5 bg-white/5 text-white/70 rounded-full text-xs font-medium hover:bg-white/10 transition-colors ring-1 ring-white/10"
          >
            シミュレーション
          </button>
        </div>
      </div>
    </div>
  );
}
