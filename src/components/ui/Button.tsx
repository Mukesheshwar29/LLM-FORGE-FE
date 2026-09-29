import React from 'react';
import { cn } from '../../lib/utils';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'glass' | 'outline';
  size?: 'sm' | 'md' | 'lg';
}

export const Button: React.FC<ButtonProps> = ({
  className,
  variant = 'primary',
  size = 'md',
  children,
  ...props
}) => {
  return (
    <button
      className={cn(
        'inline-flex items-center justify-center font-heading font-bold transition-all active:scale-95 disabled:opacity-50 disabled:pointer-events-none rounded-xl',
        size === 'sm' && 'px-3 py-1.5 text-xs',
        size === 'md' && 'px-5 py-2.5 text-sm',
        size === 'lg' && 'px-6 py-3.5 text-base',
        variant === 'primary' && 'bg-gradient-to-r from-cyan-electric to-lavender-muted text-midnight shadow-glow-cyan hover:opacity-95',
        variant === 'secondary' && 'bg-surface-card hover:bg-surface-card/80 border border-cyan-electric/25 text-text-primary',
        variant === 'glass' && 'glass-panel text-text-primary hover:border-cyan-electric/40',
        variant === 'outline' && 'bg-transparent border border-white/20 text-text-secondary hover:text-text-primary hover:border-white/40',
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
};
