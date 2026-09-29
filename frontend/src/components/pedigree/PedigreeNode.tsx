import React from 'react';
import type { PedigreeMember } from '../../data/samplePedigree';

interface PedigreeNodeProps {
  member: PedigreeMember;
  isSelected: boolean;
  onSelect: () => void;
  viewMode: 'genotype' | 'phenotype';
  showEvidence: boolean;
}

export const PedigreeNode: React.FC<PedigreeNodeProps> = ({
  member,
  isSelected,
  onSelect,
  viewMode,
  showEvidence,
}) => {
  const isMale = member.sex === 'male';
  const isAffected = member.carrierState === 'AFFECTED';
  const isCarrier = member.carrierState === 'CARRIER';
  const isUnknown = member.status === 'STRICT_UNKNOWN';

  return (
    <div
      onClick={onSelect}
      className={`cursor-pointer flex flex-col items-center group transition-all duration-300 relative z-20 ${
        isSelected ? 'scale-110' : 'hover:scale-105'
      }`}
    >
      {/* Node Shape: Square (Male) / Circle (Female) */}
      <div
        className={`w-14 h-14 sm:w-16 sm:h-16 flex items-center justify-center relative transition-all duration-300 ${
          isMale ? 'rounded-xl' : 'rounded-full'
        } ${
          isSelected
            ? 'ring-4 ring-cyan-electric shadow-glow-cyan'
            : 'hover:ring-2 hover:ring-cyan-electric/50'
        } ${
          isAffected
            ? 'bg-gradient-to-br from-cyan-electric to-lavender-muted text-midnight font-bold'
            : isCarrier
            ? 'bg-midnight border-2 border-evidence-green text-evidence-green'
            : isUnknown
            ? 'bg-midnight border-2 border-dashed border-evidence-amber text-evidence-amber'
            : 'bg-midnight border-2 border-white/30 text-text-secondary'
        }`}
      >
        <span className="font-mono text-xs sm:text-sm font-bold">
          {member.label.split(' ')[0]}
        </span>

        {/* Proband Tag */}
        {member.isProband && (
          <span className="absolute -top-3 -right-2 px-1.5 py-0.5 rounded bg-cyan-electric text-midnight font-mono text-[9px] font-extrabold tracking-tighter uppercase shadow-glow-cyan">
            PROBAND
          </span>
        )}
      </div>

      {/* Under-Node Label */}
      <div className="mt-2 text-center max-w-[120px]">
        <div className="font-heading font-semibold text-xs text-text-primary truncate">
          {member.name}
        </div>
        <div className="font-mono text-[10px] text-cyan-ice truncate">
          {viewMode === 'genotype' ? member.genotype : member.phenotype}
        </div>

        {/* Evidence Status Pill */}
        {showEvidence && (
          <span
            className={`inline-block mt-1 px-1.5 py-0.5 rounded text-[9px] font-mono font-bold ${
              member.status === 'OBSERVED'
                ? 'bg-evidence-green/20 text-evidence-green border border-evidence-green/30'
                : member.status === 'INFERRED'
                ? 'bg-cyan-electric/20 text-cyan-electric border border-cyan-electric/30'
                : 'bg-evidence-amber/20 text-evidence-amber border border-evidence-amber/30'
            }`}
          >
            {member.status}
          </span>
        )}
      </div>
    </div>
  );
};
