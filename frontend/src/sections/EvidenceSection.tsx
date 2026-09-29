import React from 'react';
import { ShieldCheck, Cpu, AlertCircle, ArrowRight, Check, HelpCircle } from 'lucide-react';

export const EvidenceSection: React.FC = () => {
  return (
    <section id="evidence" className="py-24 relative bg-midnight/95 border-t border-cyan-electric/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <span className="text-xs font-mono uppercase tracking-widest text-cyan-electric mb-3 block">
            EPISTEMOLOGICAL RIGOR &amp; INTEGRITY
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-bold text-text-primary tracking-tight mb-6">
            Every Conclusion Has an Evidence Status.
          </h2>
          <p className="text-base sm:text-lg text-text-secondary leading-relaxed">
            GenInherit-LLM rejects binary assumptions. The system enforces strict separation between certified laboratory facts, mathematical deductions, and missing information—preventing diagnostic overreach and confirmation bias.
          </p>
        </div>

        {/* 3 Large Elegant Evidence Panels */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {/* Panel 1: OBSERVED (Green) */}
          <div className="glass-panel p-8 rounded-3xl border-2 border-evidence-green/30 bg-surface-dark/90 shadow-glow-observed flex flex-col justify-between group hover:border-evidence-green/60 transition-all">
            <div>
              <div className="flex items-center justify-between mb-6">
                <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-evidence-green/20 text-evidence-green border border-evidence-green/40">
                  TIER 1 EVIDENCE
                </span>
                <ShieldCheck className="w-6 h-6 text-evidence-green" />
              </div>
              <h3 className="text-2xl font-heading font-bold text-text-primary mb-3">
                OBSERVED
              </h3>
              <p className="text-sm text-text-secondary leading-relaxed mb-6">
                Directly verified genomic or clinical evidence confirmed via laboratory assays (e.g., high-coverage NGS, Sanger confirmation, certified echocardiogram).
              </p>
            </div>
            <div className="p-3.5 rounded-xl bg-midnight border border-evidence-green/20 text-xs font-mono text-evidence-green">
              Rule: Immutable parametric truth anchor.
            </div>
          </div>

          {/* Panel 2: INFERRED (Cyan) */}
          <div className="glass-panel p-8 rounded-3xl border-2 border-cyan-electric/30 bg-surface-dark/90 shadow-glow-cyan flex flex-col justify-between group hover:border-cyan-electric/60 transition-all">
            <div>
              <div className="flex items-center justify-between mb-6">
                <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-cyan-electric/20 text-cyan-electric border border-cyan-electric/40">
                  TIER 2 EVIDENCE
                </span>
                <Cpu className="w-6 h-6 text-cyan-electric" />
              </div>
              <h3 className="text-2xl font-heading font-bold text-text-primary mb-3">
                INFERRED
              </h3>
              <p className="text-sm text-text-secondary leading-relaxed mb-6">
                Deductive conclusions derived strictly from available evidence, parent-of-origin transmission, and formal Mendelian segregation logic.
              </p>
            </div>
            <div className="p-3.5 rounded-xl bg-midnight border border-cyan-electric/20 text-xs font-mono text-cyan-ice">
              Rule: Explicit mathematical confidence assigned.
            </div>
          </div>

          {/* Panel 3: STRICT UNKNOWN (Amber) */}
          <div className="glass-panel p-8 rounded-3xl border-2 border-evidence-amber/30 bg-surface-dark/90 shadow-glow-unknown flex flex-col justify-between group hover:border-evidence-amber/60 transition-all">
            <div>
              <div className="flex items-center justify-between mb-6">
                <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-evidence-amber/20 text-evidence-amber border border-evidence-amber/40">
                  TIER 3 BOUNDARY
                </span>
                <AlertCircle className="w-6 h-6 text-evidence-amber" />
              </div>
              <h3 className="text-2xl font-heading font-bold text-text-primary mb-3">
                STRICT UNKNOWN
              </h3>
              <p className="text-sm text-text-secondary leading-relaxed mb-6">
                Information that has not been sequenced or verified. The system strictly refuses to assume that an untested relative is genetically wild-type or unaffected.
              </p>
            </div>
            <div className="p-3.5 rounded-xl bg-midnight border border-evidence-amber/20 text-xs font-mono text-evidence-amber">
              Rule: Never guessed; prompts targeted sequencing.
            </div>
          </div>
        </div>

        {/* Evidence-to-Inference Miniature Case Walkthroughs */}
        <div className="glass-panel p-8 rounded-3xl border border-cyan-electric/25 bg-surface-dark/95">
          <h4 className="text-lg font-heading font-bold text-text-primary mb-6">
            Epistemic Logic in Action: Controlled Biological Deduction
          </h4>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Example 1: Full Evidence Flow */}
            <div className="p-6 rounded-2xl bg-midnight/90 border border-evidence-green/30">
              <div className="text-xs font-mono text-evidence-green font-bold mb-3 flex items-center gap-1.5">
                <Check className="w-4 h-4" />
                <span>CASE 1: VERIFIED BIPARENTAL SEGREGATION</span>
              </div>
              <div className="flex flex-col sm:flex-row items-center gap-3 text-xs font-mono text-text-secondary mb-4">
                <div className="p-3 rounded-lg bg-surface-card border border-white/10 w-full text-center">
                  Father [I-1]: <span className="text-text-primary font-bold">Het</span> [OBSERVED]
                </div>
                <ArrowRight className="w-4 h-4 text-cyan-electric flex-shrink-0" />
                <div className="p-3 rounded-lg bg-surface-card border border-white/10 w-full text-center">
                  Mother [I-2]: <span className="text-text-primary font-bold">WT/WT</span> [OBSERVED]
                </div>
                <ArrowRight className="w-4 h-4 text-cyan-electric flex-shrink-0" />
                <div className="p-3 rounded-lg bg-surface-card border border-cyan-electric/40 text-cyan-ice w-full text-center">
                  Child [II-1]: <span className="text-cyan-electric font-bold">50% Risk</span> [INFERRED]
                </div>
              </div>
              <p className="text-xs text-text-secondary leading-relaxed">
                Because both parents possess certified high-coverage sequencing, the model derives an exact conditional transmission probability under an Autosomal Dominant model.
              </p>
            </div>

            {/* Example 2: Missing Data Preservation */}
            <div className="p-6 rounded-2xl bg-midnight/90 border border-evidence-amber/30">
              <div className="text-xs font-mono text-evidence-amber font-bold mb-3 flex items-center gap-1.5">
                <HelpCircle className="w-4 h-4" />
                <span>CASE 2: UNTESTED PARENT (ANTI-HALLUCINATION)</span>
              </div>
              <div className="flex flex-col sm:flex-row items-center gap-3 text-xs font-mono text-text-secondary mb-4">
                <div className="p-3 rounded-lg bg-surface-card border border-white/10 w-full text-center">
                  Father [I-1]: <span className="text-text-primary font-bold">WT/WT</span> [OBSERVED]
                </div>
                <ArrowRight className="w-4 h-4 text-evidence-amber flex-shrink-0" />
                <div className="p-3 rounded-lg bg-surface-card border border-evidence-amber/30 text-evidence-amber w-full text-center">
                  Mother [I-2]: <span className="font-bold">UNTESTED</span> [STRICT_UNKNOWN]
                </div>
                <ArrowRight className="w-4 h-4 text-evidence-amber flex-shrink-0" />
                <div className="p-3 rounded-lg bg-surface-card border border-evidence-amber/40 text-evidence-amber w-full text-center">
                  Child: <span className="font-bold">De Novo Unconfirmed</span>
                </div>
              </div>
              <p className="text-xs text-text-secondary leading-relaxed">
                Rather than hallucinating that the mother is negative, the engine marks maternal origin as indeterminate and issues a targeted clinical sequencing recommendation.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
