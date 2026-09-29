import React from 'react';
import { cn } from '../../lib/utils';

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'observed' | 'inferred' | 'unknown' | 'cyan' | 'lavender' | 'default';
}

export const Badge: React.FC<BadgeProps> = ({
  className,
  variant = 'default',
  children,
  ...props
}) => {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md text-[11px] font-mono font-bold tracking-wider uppercase',
        variant === 'observed' && 'bg-evidence-green/20 text-evidence-green border border-evidence-green/40 shadow-glow-observed',
        variant === 'inferred' && 'bg-cyan-electric/20 text-cyan-electric border border-cyan-electric/40 shadow-glow-inferred',
        variant === 'unknown' && 'bg-evidence-amber/20 text-evidence-amber border border-evidence-amber/40 shadow-glow-unknown',
        variant === 'cyan' && 'bg-cyan-electric/10 text-cyan-electric border border-cyan-electric/20',
        variant === 'lavender' && 'bg-lavender-muted/10 text-lavender-muted border border-lavender-muted/20',
        variant === 'default' && 'bg-surface-card text-text-secondary border border-white/10',
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
};
