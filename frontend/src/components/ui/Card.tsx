import React from 'react';
import { cn } from '../../lib/utils';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  hover?: boolean;
}

export const Card: React.FC<CardProps> = ({
  className,
  hover = true,
  children,
  ...props
}) => {
  return (
    <div
      className={cn(
        'glass-panel p-6 sm:p-8 rounded-2xl border border-cyan-electric/20 bg-surface-dark/90',
        hover && 'glass-panel-hover',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};
