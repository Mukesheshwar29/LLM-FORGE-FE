import React from 'react';

interface ProbabilityBreakdownProps {
  probAA: number;
  probAa: number;
  probaa: number;
  genotypeRiskPercentage: number;
  penetrance: number;
  clinicalManifestationRisk: string;
}

export const ProbabilityBreakdown: React.FC<ProbabilityBreakdownProps> = ({
  probAA,
  probAa,
  probaa,
  genotypeRiskPercentage,
  penetrance,
  clinicalManifestationRisk,
}) => {
  return (
    <div className="flex flex-col justify-between h-full">
      {/* 3 Outcome Cards */}
      <div className="grid grid-cols-3 gap-3 mb-6">
        <div className="p-4 rounded-2xl bg-midnight border border-evidence-green/30 text-center">
          <div className="text-[10px] font-mono text-text-muted uppercase mb-1">HOMOZYGOUS AA</div>
          <div className="text-2xl font-mono font-bold text-evidence-green">
            {probAA}%
          </div>
          <div className="text-[10px] font-mono text-text-secondary mt-1">Unaffected Non-Carrier</div>
        </div>

        <div className="p-4 rounded-2xl bg-midnight border border-cyan-electric/30 text-center">
          <div className="text-[10px] font-mono text-text-muted uppercase mb-1">HETEROZYGOUS Aa</div>
          <div className="text-2xl font-mono font-bold text-cyan-electric">
            {probAa}%
          </div>
          <div className="text-[10px] font-mono text-text-secondary mt-1">Carrier Status</div>
        </div>

        <div className="p-4 rounded-2xl bg-midnight border border-evidence-amber/30 text-center">
          <div className="text-[10px] font-mono text-text-muted uppercase mb-1">HOMOZYGOUS aa</div>
          <div className="text-2xl font-mono font-bold text-evidence-amber">
            {probaa}%
          </div>
          <div className="text-[10px] font-mono text-text-secondary mt-1">Affected Genotype</div>
        </div>
      </div>

      {/* Penetrance-Adjusted Clinical Risk Banner */}
      <div className="p-4 rounded-2xl bg-surface-card border border-cyan-electric/30 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <div className="text-xs font-mono text-cyan-electric font-bold mb-0.5">
            PENETRANCE-ADJUSTED CLINICAL MANIFESTATION ODDS
          </div>
          <div className="text-xs text-text-secondary">
            Genotype Risk ({genotypeRiskPercentage}%) × Penetrance ({penetrance}%)
          </div>
        </div>
        <div className="text-2xl font-mono font-bold text-text-primary px-4 py-1.5 rounded-xl bg-midnight border border-cyan-electric/40 shadow-glow-cyan">
          {clinicalManifestationRisk}%
        </div>
      </div>

      {/* Scientific Caveat */}
      <div className="mt-4 text-[11px] font-mono text-text-muted">
        *Note: Displayed values represent theoretical Mendelian genotype probabilities under the selected assumptions, not a substitute for diagnostic patient counseling.
      </div>
    </div>
  );
};
