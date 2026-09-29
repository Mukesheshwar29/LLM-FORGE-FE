import React, { useState } from 'react';
import { SAMPLE_PEDIGREE, type PedigreeMember } from '../data/samplePedigree';
import { Eye, AlertTriangle, Sparkles } from 'lucide-react';

export const PedigreeExplorer: React.FC = () => {
  const [selectedMember, setSelectedMember] = useState<PedigreeMember>(SAMPLE_PEDIGREE[4]); // Default Proband III-1
  const [viewMode, setViewMode] = useState<'genotype' | 'phenotype'>('genotype');
  const [showEvidenceOverlay, setShowEvidenceOverlay] = useState<boolean>(true);
  const [activePathHover, setActivePathHover] = useState<boolean>(false);

  // Group by generation
  const genI = SAMPLE_PEDIGREE.filter((m) => m.generation === 'I');
  const genII = SAMPLE_PEDIGREE.filter((m) => m.generation === 'II');
  const genIII = SAMPLE_PEDIGREE.filter((m) => m.generation === 'III');

  return (
    <section id="pedigree" className="py-24 relative bg-midnight border-t border-cyan-electric/10 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12">
          <div className="max-w-3xl">
            <span className="text-xs font-mono uppercase tracking-widest text-cyan-electric mb-3 block">
              INTERACTIVE PEDIGREE CANVAS
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-bold text-text-primary tracking-tight mb-4">
              Follow the Evidence Across Generations.
            </h2>
            <p className="text-base sm:text-lg text-text-secondary leading-relaxed">
              Interact directly with the 3-generation family tree. Explore molecular zygosities, carrier segregation, incomplete penetrance, and strict epistemic boundaries.
            </p>
          </div>

          {/* Canvas View Controls */}
          <div className="flex flex-wrap items-center gap-3">
            <div className="bg-surface-card p-1 rounded-xl border border-cyan-electric/20 flex items-center">
              <button
                onClick={() => setViewMode('genotype')}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono font-semibold transition-all ${
                  viewMode === 'genotype'
                    ? 'bg-cyan-electric text-midnight shadow-glow-cyan'
                    : 'text-text-muted hover:text-text-primary'
                }`}
              >
                Genotype View
              </button>
              <button
                onClick={() => setViewMode('phenotype')}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono font-semibold transition-all ${
                  viewMode === 'phenotype'
                    ? 'bg-lavender-muted text-midnight shadow-glow-lavender'
                    : 'text-text-muted hover:text-text-primary'
                }`}
              >
                Phenotype View
              </button>
            </div>

            <button
              onClick={() => setShowEvidenceOverlay(!showEvidenceOverlay)}
              className={`px-3.5 py-2 rounded-xl text-xs font-mono border transition-all flex items-center gap-2 ${
                showEvidenceOverlay
                  ? 'bg-surface-card border-evidence-green/40 text-evidence-green shadow-glow-observed'
                  : 'bg-surface-card/50 border-white/10 text-text-muted hover:text-text-primary'
              }`}
            >
              <Eye className="w-3.5 h-3.5" />
              <span>Evidence Overlays</span>
            </button>
          </div>
        </div>

        {/* Warning Badge: Fictional Illustrative Data */}
        <div className="mb-6 flex items-center gap-2 text-xs font-mono text-evidence-amber bg-evidence-amber/10 border border-evidence-amber/20 px-4 py-2 rounded-xl w-fit">
          <AlertTriangle className="w-4 h-4 flex-shrink-0" />
          <span>ILLUSTRATIVE FAMILY DATA — NOT A CLINICAL CASE</span>
        </div>

        {/* Master Canvas Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Canvas (Pedigree Graph) — 8 Cols */}
          <div className="lg:col-span-8 glass-panel p-6 sm:p-10 rounded-3xl border border-cyan-electric/25 bg-surface-dark/95 relative shadow-glass-card flex flex-col justify-between min-h-[580px]">
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
                  {/* I-1 (Grandfather) */}
                  <PedigreeNodeComponent
                    member={genI[0]}
                    isSelected={selectedMember.id === genI[0].id}
                    onSelect={() => setSelectedMember(genI[0])}
                    viewMode={viewMode}
                    showEvidence={showEvidenceOverlay}
                  />

                  {/* Partnership Line (I-1 to I-2) */}
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 sm:w-28 h-0.5 bg-cyan-electric/40" />

                  {/* I-2 (Grandmother) */}
                  <PedigreeNodeComponent
                    member={genI[1]}
                    isSelected={selectedMember.id === genI[1].id}
                    onSelect={() => setSelectedMember(genI[1])}
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
                  {/* II-1 (Father) */}
                  <PedigreeNodeComponent
                    member={genII[0]}
                    isSelected={selectedMember.id === genII[0].id}
                    onSelect={() => setSelectedMember(genII[0])}
                    viewMode={viewMode}
                    showEvidence={showEvidenceOverlay}
                  />

                  {/* Partnership Line (II-1 to II-2) */}
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 sm:w-28 h-0.5 bg-cyan-electric/40" />

                  {/* II-2 (Mother - Unknown) */}
                  <PedigreeNodeComponent
                    member={genII[1]}
                    isSelected={selectedMember.id === genII[1].id}
                    onSelect={() => setSelectedMember(genII[1])}
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
                  {/* III-1 (Proband) */}
                  <PedigreeNodeComponent
                    member={genIII[0]}
                    isSelected={selectedMember.id === genIII[0].id}
                    onSelect={() => setSelectedMember(genIII[0])}
                    viewMode={viewMode}
                    showEvidence={showEvidenceOverlay}
                  />

                  {/* III-2 (Sibling) */}
                  <PedigreeNodeComponent
                    member={genIII[1]}
                    isSelected={selectedMember.id === genIII[1].id}
                    onSelect={() => setSelectedMember(genIII[1])}
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

          {/* Right Inspector Panel (Individual Evidence Detail) — 4 Cols */}
          <div className="lg:col-span-4 glass-panel p-6 sm:p-8 rounded-3xl border border-cyan-electric/25 bg-surface-dark/95 shadow-glass-card flex flex-col justify-between">
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
                      <span key={i} className="px-2 py-0.5 rounded bg-surface-card text-[10px] text-cyan-electric border border-cyan-electric/20">
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
              <span className="text-text-primary truncate max-w-[180px]">{selectedMember.evidenceSource}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// Reusable Pedigree Node Component
const PedigreeNodeComponent: React.FC<{
  member: PedigreeMember;
  isSelected: boolean;
  onSelect: () => void;
  viewMode: 'genotype' | 'phenotype';
  showEvidence: boolean;
}> = ({ member, isSelected, onSelect, viewMode, showEvidence }) => {
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
      {/* Node Shape */}
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

        {/* Evidence Pill */}
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
