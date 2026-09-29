import React, { useState, useMemo } from 'react';
import { Sliders, RefreshCw } from 'lucide-react';

type GenotypeOption = 'AA' | 'Aa' | 'aa';
type ModeOption = 'AR' | 'AD' | 'XLR';

export const InheritanceSimulator: React.FC = () => {
  const [parent1, setParent1] = useState<GenotypeOption>('Aa');
  const [parent2, setParent2] = useState<GenotypeOption>('Aa');
  const [mode, setMode] = useState<ModeOption>('AR');
  const [penetrance, setPenetrance] = useState<number>(100);

  // Compute Punnett Square & Probabilities
  const simulationResults = useMemo(() => {
    // Alleles
    const p1Alleles = [parent1[0], parent1[1]];
    const p2Alleles = [parent2[0], parent2[1]];

    // 4 Offspring Combinations
    const cells = [
      { genotype: sortGenotype(p1Alleles[0] + p2Alleles[0]), p1: p1Alleles[0], p2: p2Alleles[0] },
      { genotype: sortGenotype(p1Alleles[0] + p2Alleles[1]), p1: p1Alleles[0], p2: p2Alleles[1] },
      { genotype: sortGenotype(p1Alleles[1] + p2Alleles[0]), p1: p1Alleles[1], p2: p2Alleles[0] },
      { genotype: sortGenotype(p1Alleles[1] + p2Alleles[1]), p1: p1Alleles[1], p2: p2Alleles[1] },
    ];

    let countAA = 0;
    let countAa = 0;
    let countaa = 0;

    cells.forEach((c) => {
      if (c.genotype === 'AA') countAA++;
      else if (c.genotype === 'Aa') countAa++;
      else if (c.genotype === 'aa') countaa++;
    });

    const probAA = (countAA / 4) * 100;
    const probAa = (countAa / 4) * 100;
    const probaa = (countaa / 4) * 100;

    // Clinical Manifestation Probability (adjusted for Penetrance)
    let genotypeRiskPercentage = 0;
    if (mode === 'AR') {
      genotypeRiskPercentage = probaa; // Homozygous aa
    } else if (mode === 'AD') {
      genotypeRiskPercentage = probAA + probAa; // Dominant A
    } else if (mode === 'XLR') {
      genotypeRiskPercentage = probaa;
    }

    const clinicalManifestationRisk = (genotypeRiskPercentage * (penetrance / 100)).toFixed(1);

    return {
      cells,
      probAA,
      probAa,
      probaa,
      p1Alleles,
      p2Alleles,
      genotypeRiskPercentage,
      clinicalManifestationRisk,
    };
  }, [parent1, parent2, mode, penetrance]);

  function sortGenotype(str: string): string {
    if (str === 'aA') return 'Aa';
    return str;
  }

  return (
    <section id="simulator" className="py-24 relative bg-midnight/90 border-t border-cyan-electric/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-mono uppercase tracking-widest text-cyan-electric mb-3 block">
            INTERACTIVE MENDELIAN SIMULATION ENGINE
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-bold text-text-primary tracking-tight mb-6">
            Explore How Inheritance Changes Across Generations.
          </h2>
          <p className="text-base sm:text-lg text-text-secondary leading-relaxed">
            Experiment with parental genotypes, transmission modes, and penetrance rates. Calculate exact Mendelian segregation odds and conditional clinical manifestation risks in real time.
          </p>
        </div>

        {/* Master Simulator Workbench */}
        <div className="glass-panel p-8 sm:p-12 rounded-3xl border border-cyan-electric/25 bg-surface-dark/95 shadow-glass-card">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            {/* Left Column: Interactive Controls — 5 Cols */}
            <div className="lg:col-span-5 flex flex-col justify-between">
              <div>
                <h3 className="text-xl font-heading font-bold text-text-primary mb-6 flex items-center gap-2">
                  <Sliders className="w-5 h-5 text-cyan-electric" />
                  <span>Simulation Configuration</span>
                </h3>

                {/* 1. Mode Selector */}
                <div className="mb-6">
                  <label className="block text-xs font-mono text-text-muted uppercase mb-2">
                    Inheritance Mode
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { id: 'AR', label: 'Autosomal Recessive' },
                      { id: 'AD', label: 'Autosomal Dominant' },
                      { id: 'XLR', label: 'X-Linked Recessive' },
                    ].map((item) => (
                      <button
                        key={item.id}
                        onClick={() => setMode(item.id as ModeOption)}
                        className={`py-2 px-3 rounded-xl text-xs font-mono font-bold transition-all text-center ${
                          mode === item.id
                            ? 'bg-cyan-electric text-midnight shadow-glow-cyan'
                            : 'bg-midnight border border-white/10 text-text-secondary hover:text-text-primary'
                        }`}
                      >
                        {item.id}
                      </button>
                    ))}
                  </div>
                </div>

                {/* 2. Parent 1 Genotype */}
                <div className="mb-6">
                  <label className="block text-xs font-mono text-text-muted uppercase mb-2">
                    Parent 1 Genotype (Father)
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {(['AA', 'Aa', 'aa'] as GenotypeOption[]).map((gt) => (
                      <button
                        key={gt}
                        onClick={() => setParent1(gt)}
                        className={`py-2 px-3 rounded-xl text-xs font-mono font-bold transition-all ${
                          parent1 === gt
                            ? 'bg-gradient-to-r from-cyan-electric to-cyan-ice text-midnight shadow-glow-cyan'
                            : 'bg-midnight border border-white/10 text-text-secondary hover:text-text-primary'
                        }`}
                      >
                        {gt} {gt === 'Aa' ? '(Carrier)' : gt === 'aa' ? '(Affected)' : '(Normal)'}
                      </button>
                    ))}
                  </div>
                </div>

                {/* 3. Parent 2 Genotype */}
                <div className="mb-6">
                  <label className="block text-xs font-mono text-text-muted uppercase mb-2">
                    Parent 2 Genotype (Mother)
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {(['AA', 'Aa', 'aa'] as GenotypeOption[]).map((gt) => (
                      <button
                        key={gt}
                        onClick={() => setParent2(gt)}
                        className={`py-2 px-3 rounded-xl text-xs font-mono font-bold transition-all ${
                          parent2 === gt
                            ? 'bg-gradient-to-r from-lavender-muted to-cyan-ice text-midnight shadow-glow-lavender'
                            : 'bg-midnight border border-white/10 text-text-secondary hover:text-text-primary'
                        }`}
                      >
                        {gt} {gt === 'Aa' ? '(Carrier)' : gt === 'aa' ? '(Affected)' : '(Normal)'}
                      </button>
                    ))}
                  </div>
                </div>

                {/* 4. Penetrance Control Slider */}
                <div className="mb-6 p-4 rounded-2xl bg-midnight border border-white/10">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-mono text-text-primary font-bold">
                      Age-Dependent Penetrance Rate
                    </span>
                    <span className="text-xs font-mono text-cyan-electric font-bold">
                      {penetrance}%
                    </span>
                  </div>
                  <input
                    type="range"
                    min="10"
                    max="100"
                    step="5"
                    value={penetrance}
                    onChange={(e) => setPenetrance(Number(e.target.value))}
                    className="w-full accent-cyan-electric cursor-pointer"
                  />
                  <div className="flex justify-between text-[10px] font-mono text-text-muted mt-1">
                    <span>10% (Low Penetrance)</span>
                    <span>100% (Complete Penetrance)</span>
                  </div>
                </div>
              </div>

              {/* Reset to Canonical Default */}
              <button
                onClick={() => {
                  setParent1('Aa');
                  setParent2('Aa');
                  setMode('AR');
                  setPenetrance(100);
                }}
                className="flex items-center justify-center gap-2 py-2 px-4 rounded-xl bg-surface-card border border-white/10 text-xs font-mono text-text-muted hover:text-text-primary transition-colors"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Reset to Canonical Carrier Couple (Aa × Aa)</span>
              </button>
            </div>

            {/* Right Column: Visual Punnett Square & Probability Breakdown — 7 Cols */}
            <div className="lg:col-span-7 flex flex-col justify-between">
              {/* Interactive Punnett Square Visualizer */}
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
                    {simulationResults.p1Alleles[0]}
                  </div>
                  <div className="p-3 rounded-lg bg-surface-card border border-cyan-electric/30 text-cyan-electric font-bold text-base">
                    {simulationResults.p1Alleles[1]}
                  </div>

                  {/* Row 1 */}
                  <div className="p-3 rounded-lg bg-surface-card border border-lavender-muted/30 text-lavender-muted font-bold text-base flex items-center justify-center">
                    {simulationResults.p2Alleles[0]}
                  </div>
                  <div className="p-4 rounded-xl bg-surface-card/90 border border-white/20 text-lg font-bold text-text-primary shadow-glow-cyan/30">
                    {simulationResults.cells[0].genotype}
                  </div>
                  <div className="p-4 rounded-xl bg-surface-card/90 border border-white/20 text-lg font-bold text-text-primary shadow-glow-cyan/30">
                    {simulationResults.cells[1].genotype}
                  </div>

                  {/* Row 2 */}
                  <div className="p-3 rounded-lg bg-surface-card border border-lavender-muted/30 text-lavender-muted font-bold text-base flex items-center justify-center">
                    {simulationResults.p2Alleles[1]}
                  </div>
                  <div className="p-4 rounded-xl bg-surface-card/90 border border-white/20 text-lg font-bold text-text-primary shadow-glow-cyan/30">
                    {simulationResults.cells[2].genotype}
                  </div>
                  <div className="p-4 rounded-xl bg-surface-card/90 border border-white/20 text-lg font-bold text-text-primary shadow-glow-cyan/30">
                    {simulationResults.cells[3].genotype}
                  </div>
                </div>
              </div>

              {/* Exact Calculated Probabilities Breakdown */}
              <div className="grid grid-cols-3 gap-3 mb-6">
                <div className="p-4 rounded-2xl bg-midnight border border-evidence-green/30 text-center">
                  <div className="text-[10px] font-mono text-text-muted uppercase mb-1">HOMOZYGOUS AA</div>
                  <div className="text-2xl font-mono font-bold text-evidence-green">
                    {simulationResults.probAA}%
                  </div>
                  <div className="text-[10px] font-mono text-text-secondary mt-1">Unaffected Non-Carrier</div>
                </div>

                <div className="p-4 rounded-2xl bg-midnight border border-cyan-electric/30 text-center">
                  <div className="text-[10px] font-mono text-text-muted uppercase mb-1">HETEROZYGOUS Aa</div>
                  <div className="text-2xl font-mono font-bold text-cyan-electric">
                    {simulationResults.probAa}%
                  </div>
                  <div className="text-[10px] font-mono text-text-secondary mt-1">Carrier Status</div>
                </div>

                <div className="p-4 rounded-2xl bg-midnight border border-evidence-amber/30 text-center">
                  <div className="text-[10px] font-mono text-text-muted uppercase mb-1">HOMOZYGOUS aa</div>
                  <div className="text-2xl font-mono font-bold text-evidence-amber">
                    {simulationResults.probaa}%
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
                    Genotype Risk ({simulationResults.genotypeRiskPercentage}%) × Penetrance ({penetrance}%)
                  </div>
                </div>
                <div className="text-2xl font-mono font-bold text-text-primary px-4 py-1.5 rounded-xl bg-midnight border border-cyan-electric/40 shadow-glow-cyan">
                  {simulationResults.clinicalManifestationRisk}%
                </div>
              </div>

              {/* Scientific Caveat */}
              <div className="mt-4 text-[11px] font-mono text-text-muted">
                *Note: Displayed values represent theoretical Mendelian genotype probabilities under the selected assumptions, not a substitute for diagnostic patient counseling.
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
