import React from 'react';
import { PedigreeNode } from './PedigreeNode';
import { Sparkles } from 'lucide-react';
import type { PedigreeMember } from '../../data/samplePedigree';

interface PedigreeCanvasProps {
  genI: PedigreeMember[];
  genII: PedigreeMember[];
  genIII: PedigreeMember[];
  selectedMember: PedigreeMember;
  onSelectMember: (member: PedigreeMember) => void;
  viewMode: 'genotype' | 'phenotype';
  showEvidenceOverlay: boolean;
  activePathHover: boolean;
  setActivePathHover: (hover: boolean) => void;
}

export const PedigreeCanvas: React.FC<PedigreeCanvasProps> = ({
  genI,
  genII,
  genIII,
  selectedMember,
  onSelectMember,
  viewMode,
  showEvidenceOverlay,
  activePathHover,
  setActivePathHover,
}) => {
  return (
    <div className="glass-panel p-6 sm:p-10 rounded-3xl border border-cyan-electric/25 bg-surface-dark/95 relative shadow-glass-card flex flex-col justify-between min-h-[580px]">
      {/* Background Grid */}
      <div className="absolute inset-0 bg-grid-pattern opacity-40 pointer-events-none rounded-3xl" />

      {/* Generational Levels */}
      <div className="relative z-10 flex flex-col justify-between h-full gap-12">
        {/* --- GENERATION I --- */}
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-text-muted mb-4">
            <span className="w-2 h-2 rounded-full bg-evidence-green" />
            <span>GENERATION I (Founders)</span>
          </div>
          <div className="flex items-center justify-center gap-16 sm:gap-28 relative">
            <PedigreeNode
              member={genI[0]}
              isSelected={selectedMember.id === genI[0].id}
              onSelect={() => onSelectMember(genI[0])}
              viewMode={viewMode}
              showEvidence={showEvidenceOverlay}
            />

            {/* Partnership Line (I-1 to I-2) */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 sm:w-28 h-0.5 bg-cyan-electric/40" />

            <PedigreeNode
              member={genI[1]}
              isSelected={selectedMember.id === genI[1].id}
              onSelect={() => onSelectMember(genI[1])}
              viewMode={viewMode}
              showEvidence={showEvidenceOverlay}
            />
          </div>
        </div>

        {/* Connecting Vertical Line: Gen I -> Gen II */}
        <div className="flex justify-center -my-6 relative">
          <div
            onMouseEnter={() => setActivePathHover(true)}
            onMouseLeave={() => setActivePathHover(false)}
            className={`w-0.5 h-12 transition-all cursor-pointer ${
              activePathHover ? 'bg-cyan-electric shadow-glow-cyan w-1' : 'bg-cyan-electric/50'
            }`}
          />
        </div>

        {/* --- GENERATION II --- */}
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-text-muted mb-4">
            <span className="w-2 h-2 rounded-full bg-evidence-green" />
            <span>GENERATION II (Carriers)</span>
          </div>
          <div className="flex items-center justify-center gap-16 sm:gap-28 relative">
            <PedigreeNode
              member={genII[0]}
              isSelected={selectedMember.id === genII[0].id}
              onSelect={() => onSelectMember(genII[0])}
              viewMode={viewMode}
              showEvidence={showEvidenceOverlay}
            />

            {/* Partnership Line (II-1 to II-2) */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 sm:w-28 h-0.5 bg-cyan-electric/40" />

            <PedigreeNode
              member={genII[1]}
              isSelected={selectedMember.id === genII[1].id}
              onSelect={() => onSelectMember(genII[1])}
              viewMode={viewMode}
              showEvidence={showEvidenceOverlay}
            />
          </div>
        </div>

        {/* Connecting Vertical Line: Gen II -> Gen III */}
        <div className="flex justify-center -my-6 relative">
          <div
            className={`w-0.5 h-12 transition-all ${
              activePathHover ? 'bg-cyan-electric shadow-glow-cyan w-1' : 'bg-cyan-electric/50'
            }`}
          />
        </div>

        {/* --- GENERATION III --- */}
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-text-muted mb-4">
            <span className="w-2 h-2 rounded-full bg-cyan-electric animate-pulse" />
            <span>GENERATION III (Proband &amp; Descendants)</span>
          </div>
          <div className="flex items-center justify-center gap-16 sm:gap-28 relative">
            <PedigreeNode
              member={genIII[0]}
              isSelected={selectedMember.id === genIII[0].id}
              onSelect={() => onSelectMember(genIII[0])}
              viewMode={viewMode}
              showEvidence={showEvidenceOverlay}
            />

            <PedigreeNode
              member={genIII[1]}
              isSelected={selectedMember.id === genIII[1].id}
              onSelect={() => onSelectMember(genIII[1])}
              viewMode={viewMode}
              showEvidence={showEvidenceOverlay}
            />
          </div>
        </div>
      </div>

      {/* Standard Pedigree Legend Bar */}
      <div className="relative z-10 pt-6 mt-6 border-t border-white/10 flex flex-wrap items-center justify-between gap-4 text-xs font-mono text-text-muted">
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1.5">
            <span className="w-3.5 h-3.5 border border-cyan-electric rounded-sm" /> Male
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-3.5 h-3.5 border border-cyan-electric rounded-full" /> Female
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-3.5 h-3.5 bg-cyan-electric rounded-sm" /> Affected
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-3.5 h-3.5 border-2 border-evidence-green bg-evidence-green/30 rounded-sm" /> Carrier
          </span>
        </div>
        <div className="text-cyan-electric flex items-center gap-1">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Paternal Transmission Highlighted</span>
        </div>
      </div>
    </div>
  );
};
