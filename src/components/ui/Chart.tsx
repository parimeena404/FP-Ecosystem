/* ──────────────────────────────────────────────────────────────
   FUTURE PILOT — SVG Chart Component
   Lightweight SVG Line, Bar, and Donut charts for Analytics
   ────────────────────────────────────────────────────────────── */
'use client';

import React from 'react';
import { motion } from 'framer-motion';

export interface DataPoint {
  label: string;
  value: number;
}

interface ChartProps {
  data: DataPoint[];
  type?: 'line' | 'bar' | 'donut';
  height?: number;
  color?: string;
  className?: string;
}

export function Chart({
  data,
  type = 'line',
  height = 200,
  color = '#00D4FF',
  className = '',
}: ChartProps) {
  if (!data || data.length === 0) return null;

  const maxValue = Math.max(...data.map((d) => d.value), 1);

  if (type === 'bar') {
    return (
      <div className={`w-full flex items-end gap-2 pt-6 pb-2 ${className}`} style={{ height: `${height}px` }}>
        {data.map((item, i) => {
          const barHeight = (item.value / maxValue) * 100;
          return (
            <div key={i} className="flex-1 flex flex-col items-center gap-2 h-full justify-end group">
              <span className="text-[10px] text-fp-gray opacity-0 group-hover:opacity-100 transition-opacity font-mono">
                {item.value}
              </span>
              <motion.div
                initial={{ height: 0 }}
                animate={{ height: `${barHeight}%` }}
                transition={{ duration: 0.6, delay: i * 0.05 }}
                className="w-full rounded-t-lg bg-gradient-to-t from-fp-neon-purple to-fp-neon-blue group-hover:brightness-125 transition-all"
              />
              <span className="text-[10px] text-fp-gray truncate w-full text-center">{item.label}</span>
            </div>
          );
        })}
      </div>
    );
  }

  // Line Chart
  const svgWidth = 500;
  const svgHeight = height;
  const padding = 20;

  const points = data.map((d, i) => {
    const x = padding + (i / (data.length - 1)) * (svgWidth - padding * 2);
    const y = svgHeight - padding - (d.value / maxValue) * (svgHeight - padding * 2);
    return `${x},${y}`;
  });

  const pathD = `M ${points.join(' L ')}`;

  return (
    <div className={`w-full overflow-hidden ${className}`}>
      <svg viewBox={`0 0 ${svgWidth} ${svgHeight}`} className="w-full h-auto overflow-visible">
        <defs>
          <linearGradient id="chartGlow" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={color} stopOpacity="0.3" />
            <stop offset="100%" stopColor={color} stopOpacity="0.0" />
          </linearGradient>
        </defs>

        <motion.path
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1.2, ease: 'easeOut' }}
          d={pathD}
          fill="none"
          stroke={color}
          strokeWidth="3"
          strokeLinecap="round"
        />
      </svg>
      <div className="flex justify-between text-[10px] text-fp-gray mt-2 px-1">
        {data.map((d, i) => (
          <span key={i}>{d.label}</span>
        ))}
      </div>
    </div>
  );
}
