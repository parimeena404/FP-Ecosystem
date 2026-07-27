/* ──────────────────────────────────────────────────────────────
   FUTURE PILOT — Avatar Component
   User avatar with fallback initials and online indicator
   ────────────────────────────────────────────────────────────── */

import React from 'react';
import { cn } from '@/lib/utils/cn';
import { getInitials } from '@/lib/utils/format';

type AvatarSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

interface AvatarProps {
  src?: string | null;
  name: string;
  size?: AvatarSize;
  online?: boolean;
  levelColor?: string;
  className?: string;
}

const sizeStyles: Record<AvatarSize, { container: string; text: string; indicator: string }> = {
  xs: { container: 'w-6 h-6', text: 'text-[10px]', indicator: 'w-1.5 h-1.5 border' },
  sm: { container: 'w-8 h-8', text: 'text-xs', indicator: 'w-2 h-2 border' },
  md: { container: 'w-10 h-10', text: 'text-sm', indicator: 'w-2.5 h-2.5 border-2' },
  lg: { container: 'w-14 h-14', text: 'text-lg', indicator: 'w-3 h-3 border-2' },
  xl: { container: 'w-20 h-20', text: 'text-2xl', indicator: 'w-4 h-4 border-2' },
};

export default function Avatar({
  src,
  name,
  size = 'md',
  online,
  levelColor,
  className,
}: AvatarProps) {
  const styles = sizeStyles[size];
  const initials = getInitials(name);

  return (
    <div className={cn('relative inline-flex shrink-0', className)}>
      {src ? (
        <img
          src={src}
          alt={name}
          className={cn(
            styles.container,
            'rounded-full object-cover',
            levelColor ? 'ring-2' : 'ring-1 ring-fp-border/50'
          )}
          style={levelColor ? { borderColor: levelColor, boxShadow: `0 0 12px ${levelColor}33` } : undefined}
        />
      ) : (
        <div
          className={cn(
            styles.container,
            'rounded-full flex items-center justify-center font-semibold',
            'bg-gradient-to-br from-fp-neon-blue/20 to-fp-neon-purple/20 text-fp-white',
            levelColor ? 'ring-2' : 'ring-1 ring-fp-border/50'
          )}
          style={levelColor ? { borderColor: levelColor } : undefined}
        >
          <span className={styles.text}>{initials}</span>
        </div>
      )}

      {online !== undefined && (
        <span
          className={cn(
            'absolute bottom-0 right-0 rounded-full border-fp-dark',
            styles.indicator,
            online ? 'bg-fp-neon-cyan' : 'bg-fp-gray/50'
          )}
        />
      )}
    </div>
  );
}
