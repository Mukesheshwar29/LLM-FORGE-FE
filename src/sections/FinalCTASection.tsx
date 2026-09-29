import React from 'react';
import { ArrowRight, Dna, ShieldCheck, Sparkles, Network } from 'lucide-react';

export const FinalCTASection: React.FC = () => {
  return (
    <section className="py-28 relative bg-radial-gradient overflow-hidden border-t border-cyan-electric/15">
      {/* Background Grids */}
      <div className="absolute inset-0 bg-grid-pattern opacity-50 pointer-events-none" />

      {/* Ambient Glowing Orbs */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-cyan-electric/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 left-1/3 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-lavender-muted/15 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        {/* DNA Icon Motif */}
        <div className="w-16 h-16 rounded-2xl bg-midnight border-2 border-cyan-electric/40 mx-auto flex items-center justify-center text-cyan-electric shadow-glow-cyan mb-8">
          <Dna className="w-8 h-8 animate-pulse" />
        </div>

        {/* Main Headline */}
        <h2 className="text-3xl sm:text-5xl lg:text-6xl font-heading font-extrabold text-text-primary tracking-tight mb-6 leading-tight">
          Every Family Has a Story Written in Its{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-electric via-cyan-ice to-lavender-muted">
            Genes.
          </span>
        </h2>

        {/* Supporting Copy */}
        <p className="text-base sm:text-xl text-text-secondary leading-relaxed max-w-2xl mx-auto mb-10">
          Explore how structured genomic evidence and multigenerational reasoning can help reveal patterns of inheritance without compromising privacy.
        </p>

        {/* Primary & Secondary Action Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-4 mb-12">
          <a
            href="#pedigree"
            className="flex items-center gap-2.5 bg-gradient-to-r from-cyan-electric via-cyan-ice to-lavender-muted text-midnight font-bold px-8 py-4 rounded-xl text-base shadow-glow-cyan hover:opacity-95 active:scale-95 transition-all"
          >
            <span>Explore GenInherit-LLM</span>
            <ArrowRight className="w-5 h-5" />
          </a>
          <a
            href="#architecture"
            className="flex items-center gap-2 bg-surface-card hover:bg-surface-card/80 border border-cyan-electric/30 hover:border-cyan-electric text-text-primary font-medium px-8 py-4 rounded-xl text-base transition-all"
          >
            <span>Discover the Architecture</span>
          </a>
        </div>

        {/* Trust Badges Strip */}
        <div className="flex flex-wrap items-center justify-center gap-6 text-xs font-mono text-text-muted pt-8 border-t border-white/10">
          <span className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-evidence-green" />
            <span>Air-Gapped On-Premise Enclave</span>
          </span>
          <span className="flex items-center gap-2">
            <Network className="w-4 h-4 text-cyan-electric" />
            <span>NVIDIA DGX B200 Accelerated</span>
          </span>
          <span className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-lavender-muted" />
            <span>Qwen2.5-7B Foundation Backbone</span>
          </span>
        </div>
      </div>
    </section>
  );
};
