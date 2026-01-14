'use client';

import { useEffect, useRef, useState } from 'react';

interface ECGTimelineProps {
  score: number;
  threshold?: number;
}

export default function ECGTimeline({ score, threshold = 70 }: ECGTimelineProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [dataPoints, setDataPoints] = useState<number[]>(() => {
    // Initialize with some random data
    const initial: number[] = [];
    for (let i = 0; i < 100; i++) {
      initial.push(40 + Math.random() * 30);
    }
    return initial;
  });
  const animationRef = useRef<number | null>(null);
  const lastUpdateRef = useRef<number>(0);

  // Add new score to data points
  useEffect(() => {
    setDataPoints(prev => {
      const newPoints = [...prev.slice(1), score];
      return newPoints;
    });
  }, [score]);

  // Smooth animation loop
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
      const padding = 20;

      // Clear canvas
      ctx.clearRect(0, 0, width, height);

      // Background grid
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.03)';
      ctx.lineWidth = 1;
      for (let y = 0; y <= height; y += 20) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }
      for (let x = offset % 40; x <= width; x += 40) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }

      // Threshold line
      const thresholdY = height - (threshold / 100) * (height - padding * 2) - padding;
      ctx.strokeStyle = 'rgba(34, 197, 94, 0.3)';
      ctx.setLineDash([5, 5]);
      ctx.beginPath();
      ctx.moveTo(0, thresholdY);
      ctx.lineTo(width, thresholdY);
      ctx.stroke();
      ctx.setLineDash([]);

      // Draw ECG line with gradient
      const gradient = ctx.createLinearGradient(0, 0, width, 0);
      gradient.addColorStop(0, 'rgba(99, 102, 241, 0.1)');
      gradient.addColorStop(0.7, 'rgba(99, 102, 241, 0.8)');
      gradient.addColorStop(1, 'rgba(34, 197, 94, 1)');

      ctx.strokeStyle = gradient;
      ctx.lineWidth = 2.5;
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';

      // Create smooth curve using bezier
      ctx.beginPath();
      const pointWidth = width / (dataPoints.length - 1);

      dataPoints.forEach((point, i) => {
        const x = i * pointWidth;
        const y = height - (point / 100) * (height - padding * 2) - padding;

        if (i === 0) {
          ctx.moveTo(x, y);
        } else {
          // Bezier curve for smoothness
          const prevPoint = dataPoints[i - 1];
          const prevY = height - (prevPoint / 100) * (height - padding * 2) - padding;
          const prevX = (i - 1) * pointWidth;

          const cpX = (prevX + x) / 2;
          ctx.bezierCurveTo(cpX, prevY, cpX, y, x, y);
        }
      });
      ctx.stroke();

      // Glow effect on the current point
      const lastX = width;
      const lastY = height - (dataPoints[dataPoints.length - 1] / 100) * (height - padding * 2) - padding;

      // Pulse glow
      const glowSize = 8 + Math.sin(timestamp / 200) * 3;
      const glowGradient = ctx.createRadialGradient(lastX, lastY, 0, lastX, lastY, glowSize * 2);

      const currentScore = dataPoints[dataPoints.length - 1];
      const glowColor = currentScore >= 70 ? '34, 197, 94' : currentScore >= 40 ? '245, 158, 11' : '239, 68, 68';

      glowGradient.addColorStop(0, `rgba(${glowColor}, 0.8)`);
      glowGradient.addColorStop(0.5, `rgba(${glowColor}, 0.3)`);
      glowGradient.addColorStop(1, `rgba(${glowColor}, 0)`);

      ctx.fillStyle = glowGradient;
      ctx.beginPath();
      ctx.arc(lastX, lastY, glowSize * 2, 0, Math.PI * 2);
      ctx.fill();

      // Core dot
      ctx.fillStyle = currentScore >= 70 ? '#22c55e' : currentScore >= 40 ? '#f59e0b' : '#ef4444';
      ctx.beginPath();
      ctx.arc(lastX, lastY, 4, 0, Math.PI * 2);
      ctx.fill();

      // Scanline effect
      const scanX = (timestamp / 20) % width;
      const scanGradient = ctx.createLinearGradient(scanX - 100, 0, scanX, 0);
      scanGradient.addColorStop(0, 'rgba(99, 102, 241, 0)');
      scanGradient.addColorStop(1, 'rgba(99, 102, 241, 0.1)');
      ctx.fillStyle = scanGradient;
      ctx.fillRect(scanX - 100, 0, 100, height);

      offset -= 0.5;
      animationRef.current = requestAnimationFrame(draw);
    };

    animationRef.current = requestAnimationFrame(draw);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [dataPoints, threshold]);

  // Auto-generate data for demo
  useEffect(() => {
    const interval = setInterval(() => {
      setDataPoints(prev => {
        const lastValue = prev[prev.length - 1];
        // Add some variation based on current score
        const variation = (Math.random() - 0.5) * 8;
        const trend = (score - lastValue) * 0.1;
        const newValue = Math.max(10, Math.min(100, lastValue + variation + trend));
        return [...prev.slice(1), newValue];
      });
    }, 100);

    return () => clearInterval(interval);
  }, [score]);

  const currentScore = dataPoints[dataPoints.length - 1];

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-sm font-medium text-white/60">リアルタイムスコア</h3>
        <div className="flex items-center gap-3">
          <div className="flex gap-3 text-xs text-white/40">
            <span className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#22c55e]" />高
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#f59e0b]" />中
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#ef4444]" />低
            </span>
          </div>
          <span className={`text-lg font-mono font-medium ${
            currentScore >= 70 ? 'text-[#22c55e]' : currentScore >= 40 ? 'text-[#f59e0b]' : 'text-[#ef4444]'
          }`}>
            {Math.round(currentScore)}
          </span>
        </div>
      </div>

      <div className="glass rounded-2xl p-1 overflow-hidden">
        <canvas
          ref={canvasRef}
          className="w-full h-32 rounded-xl"
          style={{ background: 'rgba(0, 0, 0, 0.3)' }}
        />
      </div>
    </div>
  );
}
