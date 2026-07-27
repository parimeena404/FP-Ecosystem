/* ──────────────────────────────────────────────────────────────
   FUTURE PILOT — Counter Animation
   Animated number counter that triggers on viewport entry
   ────────────────────────────────────────────────────────────── */
'use client';

import React, { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { cn } from '@/lib/utils/cn';

interface CounterAnimationProps {
  end: number;
  duration?: number;
  prefix?: string;
  suffix?: string;
  className?: string;
  label?: string;
  labelClassName?: string;
  decimals?: number;
  separator?: boolean;
}

export default function CounterAnimation({
  end,
  duration = 2,
  prefix = '',
  suffix = '',
  className,
  label,
  labelClassName,
  decimals = 0,
  separator = true,
}: CounterAnimationProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView) return;

    let startTime: number;
    let animationFrame: number;

    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / (duration * 1000), 1);

      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * end));

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      } else {
        setCount(end);
      }
    };

    animationFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrame);
  }, [isInView, end, duration]);

  const formatNumber = (num: number) => {
    if (separator) {
      return num.toLocaleString('en-IN', {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals,
      });
    }
    return num.toFixed(decimals);
  };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className="text-center"
    >
      <div className={cn('font-display font-bold tabular-nums', className)}>
        {prefix}
        {formatNumber(count)}
        {suffix}
      </div>
      {label && (
        <div className={cn('mt-2 text-fp-gray font-medium', labelClassName)}>
          {label}
        </div>
      )}
    </motion.div>
  );
}
