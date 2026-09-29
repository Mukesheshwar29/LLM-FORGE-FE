import React from 'react';
import type { PedigreeMember } from '../../data/samplePedigree';

interface EvidencePanelProps {
  selectedMember: PedigreeMember;
}

export const EvidencePanel: React.FC<EvidencePanelProps> = ({ selectedMember }) => {
  return (
    <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-cyan-electric/25 bg-surface-dark/95 shadow-glass-card flex flex-col justify-between h-full">
      <div>
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-6">
          <div>
            <span className="text-[11px] font-mono text-cyan-electric uppercase tracking-wider block">
              {selectedMember.generation} INDIVIDUAL SPECIFICATION
            </span>
            <h3 className="text-xl font-heading font-bold text-text-primary">
              {selectedMember.name}
            </h3>
          </div>
          <span
            className={`px-2.5 py-1 text-xs font-mono font-bold rounded-lg ${
              selectedMember.status === 'OBSERVED'
                ? 'bg-evidence-green/20 text-evidence-green border border-evidence-green/40 shadow-glow-observed'
                : selectedMember.status === 'INFERRED'
                ? 'bg-cyan-electric/20 text-cyan-electric border border-cyan-electric/40 shadow-glow-inferred'
                : 'bg-evidence-amber/20 text-evidence-amber border border-evidence-amber/40 shadow-glow-unknown'
            }`}
          >
            {selectedMember.status}
          </span>
        </div>

        {/* Data Cards */}
        <div className="space-y-4 text-xs font-mono">
          {/* Zygosity & Genotype */}
          <div className="p-4 rounded-xl bg-midnight/90 border border-white/10">
            <div className="text-[10px] text-text-muted uppercase mb-1">Genotype &amp; Zygosity</div>
            <div className="text-sm text-cyan-ice font-bold mb-1">{selectedMember.genotype}</div>
            <div className="text-[11px] text-text-secondary">{selectedMember.zygosity}</div>
          </div>

          {/* Phenotype Presentation */}
          <div className="p-4 rounded-xl bg-midnight/90 border border-white/10">
            <div className="text-[10px] text-text-muted uppercase mb-1">Clinical Phenotype</div>
            <div className="text-text-primary font-medium mb-2">{selectedMember.phenotype}</div>
            <div className="flex flex-wrap gap-1.5">
              {selectedMember.hpoTerms.map((term, i) => (
                <span
                  key={i}
                  className="px-2 py-0.5 rounded bg-surface-card text-[10px] text-cyan-electric border border-cyan-electric/20"
                >
                  {term}
                </span>
              ))}
            </div>
          </div>

          {/* Biological Context Details */}
          <div className="p-4 rounded-xl bg-midnight/90 border border-white/10">
            <div className="text-[10px] text-text-muted uppercase mb-1">Causal Evidence &amp; Proof</div>
            <p className="text-xs text-text-secondary font-sans leading-relaxed">
              {selectedMember.details}
            </p>
          </div>
        </div>
      </div>

      {/* Bottom Proof Source */}
      <div className="mt-6 pt-4 border-t border-white/10 text-[11px] font-mono text-text-muted flex items-center justify-between">
        <span>Source Authority:</span>
        <span className="text-text-primary truncate max-w-[180px]">
          {selectedMember.evidenceSource}
        </span>
      </div>
    </div>
  );
};
