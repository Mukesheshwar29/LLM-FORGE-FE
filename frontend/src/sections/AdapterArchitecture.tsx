import React, { useState } from 'react';
import { ShieldCheck, Lock, ArrowDown, ChevronRight, Activity } from 'lucide-react';

interface FamilyAdapterData {
  id: string;
  name: string;
  generations: string;
  version: string;
  size: string;
  hash: string;
  variant: string;
  phenotype: string;
  history: { stage: string; event: string; status: string }[];
}

const FAMILIES: FamilyAdapterData[] = [
  {
    id: 'FAM_A',
    name: 'Family A — Cardiomyopathy Lineage',
    generations: 'Generations I–III',
    version: 'v2.1 (Verified)',
    size: '34.8 MB',
    hash: 'SHA256: e8f921...c4a1',
    variant: 'MYBPC3 c.1504C>T (p.Arg502Trp)',
    phenotype: 'Hypertrophic Cardiomyopathy (Incomplete Penetrance)',
    history: [
      { stage: 'v1.0', event: 'Generations I & II Ingested (Grandfather & Father)', status: 'Replay Verified' },
      { stage: 'v2.0', event: 'Birth of Proband [III-1] & Heterozygous VCF Ingestion', status: 'Segregation Recomputed' },
      { stage: 'v2.1', event: 'Proband Phenotypic Onset at Age 12 Recorded', status: 'Active Checkpoint' },
    ]
  },
  {
    id: 'FAM_B',
    name: 'Family B — Cystic Fibrosis Lineage',
    generations: 'Generations I–II',
    version: 'v1.4 (Verified)',
    size: '35.1 MB',
    hash: 'SHA256: b710aa...99f2',
    variant: 'CFTR c.1521_1523delCTT (p.Phe508del)',
    phenotype: 'Autosomal Recessive Carrier Screening (Consanguineous Union)',
    history: [
      { stage: 'v1.0', event: 'First-Cousin Couple Carrier Screening Ingested', status: 'Biparental Replay' },
      { stage: 'v1.4', event: 'Pre-Conceptional 25% Recurrence Risk Evaluated', status: 'Active Checkpoint' }
    ]
  },
  {
    id: 'FAM_C',
    name: 'Family C — Hereditary Oncology Lineage',
    generations: 'Generations I–IV',
    version: 'v1.0 (Initial)',
    size: '34.6 MB',
    hash: 'SHA256: 4f129c...8810',
    variant: 'BRCA1 c.68_69delAG (p.Glu23fs)',
    phenotype: 'Hereditary Breast & Ovarian Cancer Syndrome (HBOC)',
    history: [
      { stage: 'v1.0', event: 'Initial Multi-Branch 4-Generation Pedigree Ingested', status: 'Active Checkpoint' }
    ]
  }
];

export const AdapterArchitecture: React.FC = () => {
  const [selectedFamily, setSelectedFamily] = useState<FamilyAdapterData>(FAMILIES[0]);

  return (
    <section id="architecture" className="py-24 relative bg-midnight overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-mono uppercase tracking-widest text-cyan-electric mb-3 block">
            CORE ARCHITECTURAL NOVELTY
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-bold text-text-primary tracking-tight mb-6">
            One Foundation. Isolated Family Intelligence.
          </h2>
          <p className="text-base sm:text-lg text-text-secondary leading-relaxed">
            Rather than retraining monolithic models or relying on fragile vector retrieval, GenInherit-LLM couples a frozen foundation model with physically and logically isolated family adapters that evolve longitudinally.
          </p>
        </div>

        {/* Master Architectural Visual Diagram */}
        <div className="glass-panel p-8 sm:p-12 rounded-3xl border border-cyan-electric/25 bg-surface-dark/95 shadow-glass-card mb-12">
          {/* Top Layer: Frozen Foundation Model */}
          <div className="max-w-xl mx-auto mb-10 text-center">
            <div className="p-6 rounded-2xl bg-midnight/90 border-2 border-cyan-electric/40 shadow-glow-cyan relative group">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-electric/10 text-cyan-electric font-mono text-xs mb-3 border border-cyan-electric/20">
                <Lock className="w-3.5 h-3.5" />
                <span>PERMANENTLY FROZEN PARAMETERS (~7.24B BF16)</span>
              </div>
              <h3 className="text-2xl font-heading font-bold text-text-primary mb-2">
                Qwen2.5-7B Foundation Base
              </h3>
              <p className="text-xs font-mono text-text-secondary">
                Mastery of HGVS Nomenclature, gnomAD Allele Frequencies, ClinVar, OMIM, &amp; Mendelian Deductive Rules
              </p>
            </div>
          </div>

          {/* Separator / Bus Connecting Arrows */}
          <div className="flex justify-around max-w-2xl mx-auto mb-6 text-cyan-electric/60">
            <div className="flex flex-col items-center">
              <div className="w-0.5 h-8 bg-gradient-to-b from-cyan-electric to-transparent" />
              <ArrowDown className="w-4 h-4 text-cyan-electric animate-bounce" />
            </div>
            <div className="flex flex-col items-center">
              <div className="w-0.5 h-8 bg-gradient-to-b from-lavender-muted to-transparent" />
              <ArrowDown className="w-4 h-4 text-lavender-muted animate-bounce" />
            </div>
            <div className="flex flex-col items-center">
              <div className="w-0.5 h-8 bg-gradient-to-b from-evidence-green to-transparent" />
              <ArrowDown className="w-4 h-4 text-evidence-green animate-bounce" />
            </div>
          </div>

          {/* Bottom Layer: Three Isolated Family Adapters */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {FAMILIES.map((fam) => {
              const isSelected = selectedFamily.id === fam.id;
              return (
                <div
                  key={fam.id}
                  onClick={() => setSelectedFamily(fam)}
                  className={`cursor-pointer p-6 rounded-2xl transition-all duration-300 relative ${
                    isSelected
                      ? 'bg-midnight border-2 border-cyan-electric shadow-glow-cyan scale-[1.02]'
                      : 'bg-surface-card/60 hover:bg-surface-card border border-white/10 hover:border-cyan-electric/30'
                  }`}
                >
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-mono font-bold text-cyan-electric px-2.5 py-1 rounded bg-cyan-electric/10 border border-cyan-electric/20">
                      {fam.id}
                    </span>
                    <span className="flex items-center gap-1.5 text-[11px] font-mono text-evidence-green">
                      <ShieldCheck className="w-3.5 h-3.5" />
                      <span>AES-256 Encrypted</span>
                    </span>
                  </div>

                  <h4 className="text-base font-heading font-bold text-text-primary mb-1">
                    {fam.name}
                  </h4>
                  <p className="text-xs font-mono text-text-muted mb-4">
                    {fam.generations} • Size: {fam.size}
                  </p>

                  <div className="p-3 rounded-lg bg-midnight/90 border border-white/10 text-xs font-mono text-cyan-ice mb-3">
                    <div className="text-[10px] text-text-muted mb-0.5">TARGET VARIANT</div>
                    <div className="truncate">{fam.variant}</div>
                  </div>

                  <div className="flex items-center justify-between text-[11px] font-mono text-text-secondary pt-2 border-t border-white/5">
                    <span>Active: {fam.version}</span>
                    <span className="text-cyan-electric font-semibold flex items-center gap-1">
                      Inspect <ChevronRight className="w-3 h-3" />
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Selected Adapter Fictional Generational Evolution Inspector */}
        <div className="glass-panel p-6 sm:p-8 rounded-2xl border border-cyan-electric/20 bg-midnight/90">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/10 mb-6">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-surface-card border border-cyan-electric/30 flex items-center justify-center text-cyan-electric">
                <Activity className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-base font-heading font-bold text-text-primary">
                  {selectedFamily.name} — Checkpoint Evolution Ledger
                </h4>
                <p className="text-xs font-mono text-text-secondary">
                  Cryptographic Hash: <span className="text-cyan-ice">{selectedFamily.hash}</span>
                </p>
              </div>
            </div>
            <div className="text-xs font-mono text-text-muted bg-surface-card px-3 py-1.5 rounded-lg border border-white/10">
              Hot-Swap Latency: <span className="text-evidence-green font-bold">31.8 ms</span>
            </div>
          </div>

          {/* Timeline of Evolution */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {selectedFamily.history.map((step, idx) => (
              <div key={idx} className="p-4 rounded-xl bg-surface-card/70 border border-white/10 flex flex-col justify-between">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-mono font-bold text-cyan-electric">{step.stage}</span>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-evidence-green/10 text-evidence-green border border-evidence-green/20">
                    {step.status}
                  </span>
                </div>
                <p className="text-xs text-text-primary leading-relaxed mb-2">{step.event}</p>
                <span className="text-[10px] font-mono text-text-muted">Replay Regularized (Zero Forgetting)</span>
              </div>
            ))}
          </div>

          <div className="mt-6 pt-4 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-text-muted">
            <p>
              "Each family lineage is represented through an isolated adapter that can evolve as new verified evidence becomes available."
            </p>
            <div className="text-[11px] text-evidence-amber">
              *Logical adapter isolation is part of a defense-in-depth architecture; complete privacy depends on institutional deployment controls.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
