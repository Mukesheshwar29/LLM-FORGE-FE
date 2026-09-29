import React, { useState } from 'react';
import { ArrowRight, Play, Shield, Network, Dna, Sparkles, ChevronDown, CheckCircle2, UploadCloud, Layers } from 'lucide-react';
import { DNAExperience } from './DNAExperience';
import { DNAUploadWidget } from './DNAUploadWidget';

export const HeroSection: React.FC = () => {
  const [selectedNode, setSelectedNode] = useState<any>(null);
  const [heroView, setHeroView] = useState<'upload' | '3d'>('upload');

  return (
    <section className="relative min-h-screen pt-28 pb-16 flex flex-col justify-between overflow-hidden bg-radial-gradient">
      {/* Background Decorative Grids */}
      <div className="absolute inset-0 bg-grid-pattern pointer-events-none opacity-60" />

      {/* Main Two-Column Hero Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full my-auto z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Left Column — Text & CTAs */}
          <div className="lg:col-span-6 flex flex-col items-start text-left">
            {/* Scientific Eyebrow Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-surface-card border border-cyan-electric/30 text-cyan-electric text-xs font-mono mb-6 shadow-glow-cyan">
              <Sparkles className="w-3.5 h-3.5 text-cyan-electric animate-pulse" />
              <span>THE NEXT-GEN MULTIGENERATIONAL GENOMICS PLATFORM</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl xl:text-6xl font-heading font-extrabold text-text-primary tracking-tight leading-[1.08] mb-6">
              Unlock Your Family’s{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-electric via-cyan-ice to-lavender-muted">
                Genomic Inheritance
              </span>{' '}
              Story.
            </h1>

            {/* Supporting Text */}
            <p className="text-base sm:text-lg text-text-secondary leading-relaxed mb-8 max-w-xl">
              Trace pathogenic variant transmission across 3+ generations. Connect verified molecular sequencing with family relationships and epistemic intelligence through isolated neural adaptation.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-4 mb-8 w-full sm:w-auto">
              <a
                href="#traits"
                className="flex items-center justify-center gap-2.5 bg-gradient-to-r from-cyan-electric to-lavender-muted text-midnight font-bold px-6 py-3.5 rounded-xl text-sm sm:text-base shadow-glow-cyan hover:opacity-95 active:scale-95 transition-all"
              >
                <span>Browse Trait Reports</span>
                <ArrowRight className="w-4 h-4" />
              </a>
              <a
                href="#pedigree"
                className="flex items-center justify-center gap-2 bg-surface-card hover:bg-surface-cardHover border border-cyan-electric/25 hover:border-cyan-electric/60 text-text-primary font-medium px-6 py-3.5 rounded-xl text-sm sm:text-base transition-all"
              >
                <Play className="w-4 h-4 text-cyan-electric" />
                <span>Live Pedigree Canvas</span>
              </a>
            </div>

            {/* Trust-Oriented Indicators */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 w-full pt-6 border-t border-white/10">
              <div className="flex items-center gap-2 text-xs font-mono text-text-secondary">
                <Network className="w-4 h-4 text-cyan-electric flex-shrink-0" />
                <span>Multigenerational Pedigrees</span>
              </div>
              <div className="flex items-center gap-2 text-xs font-mono text-text-secondary">
                <Shield className="w-4 h-4 text-evidence-green flex-shrink-0" />
                <span>Isolated Family Adapters</span>
              </div>
              <div className="flex items-center gap-2 text-xs font-mono text-text-secondary">
                <Dna className="w-4 h-4 text-lavender-muted flex-shrink-0" />
                <span>94.8% Mendelian Accuracy</span>
              </div>
            </div>
          </div>

          {/* Right Column — Signature Genomelink Dropzone & 3D DNA Toggle */}
          <div className="lg:col-span-6 relative">
            {/* View Switcher Bar */}
            <div className="flex items-center justify-between mb-3 px-1">
              <span className="text-[11px] font-mono text-text-muted">
                LIVE INTERACTIVE DEMO:
              </span>
              <div className="flex items-center p-1 rounded-xl bg-midnight/80 border border-white/10 text-xs font-mono">
                <button
                  onClick={() => setHeroView('upload')}
                  className={`flex items-center gap-1.5 px-3 py-1 rounded-lg transition-all ${
                    heroView === 'upload'
                      ? 'bg-cyan-electric text-midnight font-bold shadow-glow-cyan'
                      : 'text-text-secondary hover:text-text-primary'
                  }`}
                >
                  <UploadCloud className="w-3.5 h-3.5" />
                  <span>DNA Dropzone</span>
                </button>
                <button
                  onClick={() => setHeroView('3d')}
                  className={`flex items-center gap-1.5 px-3 py-1 rounded-lg transition-all ${
                    heroView === '3d'
                      ? 'bg-cyan-electric text-midnight font-bold shadow-glow-cyan'
                      : 'text-text-secondary hover:text-text-primary'
                  }`}
                >
                  <Layers className="w-3.5 h-3.5" />
                  <span>3D Helix View</span>
                </button>
              </div>
            </div>

            {heroView === 'upload' ? (
              <DNAUploadWidget />
            ) : (
              <DNAExperience
                onSelectNode={(node) => setSelectedNode(node)}
                selectedNode={selectedNode}
              />
            )}
          </div>
        </div>
      </div>

      {/* Horizontal Scientific Status Strip (Bottom of Hero) */}
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 z-10">
        <div className="glass-panel py-3.5 px-6 rounded-xl border border-cyan-electric/20 flex flex-wrap items-center justify-between gap-4 text-xs font-mono text-text-secondary">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-evidence-green animate-ping" />
            <span className="text-text-primary font-semibold">Qwen2.5-7B Frozen Backbone</span>
          </div>
          <div className="hidden md:flex items-center gap-2">
            <span className="text-cyan-electric">●</span>
            <span>LoRA Hot-Swap: 31.8 ms</span>
          </div>
          <div className="hidden sm:flex items-center gap-2">
            <span className="text-evidence-green">●</span>
            <span>Zero Cross-Family Leakage (0.000%)</span>
          </div>
          <div className="flex items-center gap-2 text-cyan-ice">
            <CheckCircle2 className="w-3.5 h-3.5 text-cyan-electric" />
            <span>PSTS-v1 Structural Encoding</span>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="flex justify-center mt-6">
          <a
            href="#traits"
            className="flex items-center gap-1.5 text-[11px] font-mono text-text-muted hover:text-cyan-electric transition-colors"
          >
            <span>Scroll to explore</span>
            <ChevronDown className="w-3.5 h-3.5 animate-bounce" />
          </a>
        </div>
      </div>
    </section>
  );
};
