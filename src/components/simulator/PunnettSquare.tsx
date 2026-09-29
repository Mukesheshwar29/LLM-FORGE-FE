import React from 'react';

interface PunnettSquareProps {
  p1Alleles: string[];
  p2Alleles: string[];
  cells: { genotype: string; p1: string; p2: string }[];
  parent1: string;
  parent2: string;
}

export const PunnettSquare: React.FC<PunnettSquareProps> = ({
  p1Alleles,
  p2Alleles,
  cells,
  parent1,
  parent2,
}) => {
  return (
    <div className="p-6 rounded-2xl bg-midnight/90 border border-cyan-electric/30 mb-6">
      <div className="flex items-center justify-between pb-3 border-b border-white/10 mb-6">
        <span className="text-xs font-mono text-cyan-electric font-bold">
          Interactive Gamete Segregation Grid (Punnett Square)
        </span>
        <span className="text-xs font-mono text-text-muted">
          Parental Mating: <span className="text-text-primary font-bold">{parent1} × {parent2}</span>
        </span>
      </div>

      {/* 2x2 Punnett Grid */}
      <div className="max-w-xs mx-auto grid grid-cols-3 gap-2 text-center font-mono">
        {/* Top Left Empty Corner */}
        <div className="p-3 text-xs text-text-muted flex items-center justify-center">
          ♀ \ ♂
        </div>
        {/* Header Alleles from Parent 1 */}
        <div className="p-3 rounded-lg bg-surface-card border border-cyan-electric/30 text-cyan-electric font-bold text-base">
          {p1Alleles[0]}
        </div>
        <div className="p-3 rounded-lg bg-surface-card border border-cyan-electric/30 text-cyan-electric font-bold text-base">
          {p1Alleles[1]}
        </div>

        {/* Row 1 */}
        <div className="p-3 rounded-lg bg-surface-card border border-lavender-muted/30 text-lavender-muted font-bold text-base flex items-center justify-center">
          {p2Alleles[0]}
        </div>
        <div className="p-4 rounded-xl bg-surface-card/90 border border-white/20 text-lg font-bold text-text-primary shadow-glow-cyan/30">
          {cells[0].genotype}
        </div>
        <div className="p-4 rounded-xl bg-surface-card/90 border border-white/20 text-lg font-bold text-text-primary shadow-glow-cyan/30">
          {cells[1].genotype}
        </div>

        {/* Row 2 */}
        <div className="p-3 rounded-lg bg-surface-card border border-lavender-muted/30 text-lavender-muted font-bold text-base flex items-center justify-center">
          {p2Alleles[1]}
        </div>
        <div className="p-4 rounded-xl bg-surface-card/90 border border-white/20 text-lg font-bold text-text-primary shadow-glow-cyan/30">
          {cells[2].genotype}
        </div>
        <div className="p-4 rounded-xl bg-surface-card/90 border border-white/20 text-lg font-bold text-text-primary shadow-glow-cyan/30">
          {cells[3].genotype}
        </div>
      </div>
    </div>
  );
};
