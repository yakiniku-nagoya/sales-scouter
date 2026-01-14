'use client';

import { useEffect, useRef, useState } from 'react';

interface ECGTimelineProps {
  score: number;
  threshold?: number;
}

export default function ECGTimeline({ score, threshold = 70 }: ECGTimelineProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [dataPoints, setDataPoints] = useState<number[]>(() => {
    // 初期値は固定（ハイドレーション対策）
    return Array(100).fill(50);
  });
  const [isClient, setIsClient] = useState(false);
  const animationRef = useRef<number | null>(null);

  // クライアントサイドでのみランダム初期化
  useEffect(() => {
    setIsClient(true);
    const initial: number[] = [];
    for (let i = 0; i < 100; i++) {
      initial.push(40 + Math.random() * 30);
    }
    setDataPoints(initial);
  }, []);

  useEffect(() => {
    if (!isClient) return;
    setDataPoints(prev => [...prev.slice(1), score]);
  }, [score, isClient]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    ctx.scale(dpr, dpr);

    let offset = 0;

    const draw = (timestamp: number) => {
      const width = rect.width;
      const height = rect.height;
      const padding = 16;

      ctx.clearRect(0, 0, width, height);

      // Subtle grid
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.02)';
      ctx.lineWidth = 1;
      for (let y = 0; y <= height; y += 24) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }
      for (let x = offset % 48; x <= width; x += 48) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }

      // Threshold line
      const thresholdY = height - (threshold / 100) * (height - padding * 2) - padding;
      ctx.strokeStyle = 'rgba(74, 222, 128, 0.2)';
      ctx.setLineDash([4, 4]);
      ctx.beginPath();
      ctx.moveTo(0, thresholdY);
      ctx.lineTo(width, thresholdY);
      ctx.stroke();
      ctx.setLineDash([]);

      // ECG line gradient
      const gradient = ctx.createLinearGradient(0, 0, width, 0);
      gradient.addColorStop(0, 'rgba(129, 140, 248, 0.05)');
      gradient.addColorStop(0.5, 'rgba(129, 140, 248, 0.4)');
      gradient.addColorStop(0.85, 'rgba(129, 140, 248, 0.8)');
      gradient.addColorStop(1, 'rgba(74, 222, 128, 1)');

      ctx.strokeStyle = gradient;
      ctx.lineWidth = 2;
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';

      ctx.beginPath();
      const pointWidth = width / (dataPoints.length - 1);

      dataPoints.forEach((point, i) => {
        const x = i * pointWidth;
        const y = height - (point / 100) * (height - padding * 2) - padding;

        if (i === 0) {
          ctx.moveTo(x, y);
        } else {
          const prevPoint = dataPoints[i - 1];
          const prevY = height - (prevPoint / 100) * (height - padding * 2) - padding;
          const prevX = (i - 1) * pointWidth;
          const cpX = (prevX + x) / 2;
          ctx.bezierCurveTo(cpX, prevY, cpX, y, x, y);
        }
      });
      ctx.stroke();

      // Glow dot at end
      const lastX = width - 2;
      const lastY = height - (dataPoints[dataPoints.length - 1] / 100) * (height - padding * 2) - padding;
      const currentScore = dataPoints[dataPoints.length - 1];
      const glowColor = currentScore >= 70 ? '74, 222, 128' : currentScore >= 40 ? '251, 191, 36' : '248, 113, 113';

      // Outer glow
      const glowSize = 6 + Math.sin(timestamp / 150) * 2;
      const glowGradient = ctx.createRadialGradient(lastX, lastY, 0, lastX, lastY, glowSize * 3);
      glowGradient.addColorStop(0, `rgba(${glowColor}, 0.6)`);
      glowGradient.addColorStop(0.5, `rgba(${glowColor}, 0.2)`);
      glowGradient.addColorStop(1, `rgba(${glowColor}, 0)`);

      ctx.fillStyle = glowGradient;
      ctx.beginPath();
      ctx.arc(lastX, lastY, glowSize * 3, 0, Math.PI * 2);
      ctx.fill();

      // Core dot
      ctx.fillStyle = `rgb(${glowColor})`;
      ctx.beginPath();
      ctx.arc(lastX, lastY, 3, 0, Math.PI * 2);
      ctx.fill();

      offset -= 0.3;
      animationRef.current = requestAnimationFrame(draw);
    };

    animationRef.current = requestAnimationFrame(draw);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [dataPoints, threshold]);

  useEffect(() => {
    const interval = setInterval(() => {
      setDataPoints(prev => {
        const lastValue = prev[prev.length - 1];
        const variation = (Math.random() - 0.5) * 6;
        const trend = (score - lastValue) * 0.08;
        const newValue = Math.max(10, Math.min(100, lastValue + variation + trend));
        return [...prev.slice(1), newValue];
      });
    }, 80);

    return () => clearInterval(interval);
  }, [score]);

  const currentScore = dataPoints[dataPoints.length - 1];
  const scoreColor = currentScore >= 70 ? '#4ade80' : currentScore >= 40 ? '#fbbf24' : '#f87171';

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-sm font-medium text-white/50">リアルタイムスコア</h3>
        <div className="flex items-center gap-4">
          <div className="flex gap-3 text-[10px] text-white/30">
            <span className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#4ade80]" />高
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#fbbf24]" />中
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#f87171]" />低
            </span>
          </div>
          <span
            className="text-lg font-mono font-light tabular-nums"
            style={{ color: scoreColor }}
          >
            {Math.round(currentScore)}
          </span>
        </div>
      </div>

      <div className="glass rounded-2xl p-1.5 overflow-hidden">
        <canvas
          ref={canvasRef}
          className="w-full h-28 rounded-xl"
          style={{ background: 'rgba(0, 0, 0, 0.2)' }}
        />
      </div>
    </div>
  );
}
