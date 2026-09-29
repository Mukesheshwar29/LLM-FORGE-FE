import React from 'react';
import { Network, Shield, Dna } from 'lucide-react';

export const HeroLabels: React.FC = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 w-full pt-6 border-t border-white/10">
      <div className="flex items-center gap-2 text-xs font-mono text-text-secondary">
        <Network className="w-4 h-4 text-cyan-electric flex-shrink-0" />
        <span>Multigenerational Reasoning</span>
      </div>
      <div className="flex items-center gap-2 text-xs font-mono text-text-secondary">
        <Shield className="w-4 h-4 text-evidence-green flex-shrink-0" />
        <span>Family-Isolated Adaptation</span>
      </div>
      <div className="flex items-center gap-2 text-xs font-mono text-text-secondary">
        <Dna className="w-4 h-4 text-lavender-muted flex-shrink-0" />
        <span>Evidence-Aware Intelligence</span>
      </div>
    </div>
  );
};
