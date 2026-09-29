import React, { useState } from 'react';
import { FileQuestion, GitFork, Layers, AlertCircle } from 'lucide-react';

export const ProblemSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'fragmented' | 'unified'>('unified');

  return (
    <section id="problem" className="py-24 relative bg-midnight/90 border-t border-b border-cyan-electric/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <span className="text-xs font-mono uppercase tracking-widest text-cyan-electric mb-3 block">
            THE MULTIGENERATIONAL GENOMIC PROBLEM
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-bold text-text-primary tracking-tight mb-6">
            A Variant Alone Cannot Tell the Whole Story.
          </h2>
          <p className="text-base sm:text-lg text-text-secondary leading-relaxed">
            In modern clinical genetics, an individual's DNA sequence cannot be interpreted in isolation. A single nucleotide polymorphism or copy-number variation observed in a patient often remains a Variant of Uncertain Significance (VUS) without the matrix of ancestral transmission.
          </p>
        </div>

        {/* Three Sophisticated Visual Panels */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {/* Panel 01: Isolated Evidence */}
          <div className="glass-panel glass-panel-hover p-8 rounded-2xl flex flex-col justify-between relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-6 font-mono text-4xl font-extrabold text-white/5 group-hover:text-cyan-electric/10 transition-colors">
              01
            </div>
            <div>
              <div className="w-12 h-12 rounded-xl bg-surface-card border border-evidence-amber/30 flex items-center justify-center text-evidence-amber mb-6 shadow-glow-unknown">
                <FileQuestion className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-heading font-bold text-text-primary mb-3">
                Isolated Evidence
              </h3>
              <p className="text-sm text-text-secondary leading-relaxed mb-6">
                A genetic variant exists in a static laboratory report, but its clinical pathogenicity often remains indeterminate without multigenerational segregation data.
              </p>
            </div>
            <div className="p-3.5 rounded-lg bg-surface-card/60 border border-evidence-amber/20 text-xs font-mono text-evidence-amber flex items-center gap-2">
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              <span>VUS Rate in Solitary Tests: &gt; 42%</span>
            </div>
          </div>

          {/* Panel 02: Missing Lineage */}
          <div className="glass-panel glass-panel-hover p-8 rounded-2xl flex flex-col justify-between relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-6 font-mono text-4xl font-extrabold text-white/5 group-hover:text-cyan-electric/10 transition-colors">
              02
            </div>
            <div>
              <div className="w-12 h-12 rounded-xl bg-surface-card border border-cyan-electric/30 flex items-center justify-center text-cyan-electric mb-6 shadow-glow-cyan">
                <GitFork className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-heading font-bold text-text-primary mb-3">
                Missing Lineage
              </h3>
              <p className="text-sm text-text-secondary leading-relaxed mb-6">
                Parental transmission pathways, incomplete age-dependent penetrance, variable expressivity, and ungenotyped relatives complicate causal inheritance deductions.
              </p>
            </div>
            <div className="p-3.5 rounded-lg bg-surface-card/60 border border-cyan-electric/20 text-xs font-mono text-cyan-ice flex items-center gap-2">
              <GitFork className="w-4 h-4 flex-shrink-0 text-cyan-electric" />
              <span>Lineage Skips &amp; Silent Carriers</span>
            </div>
          </div>

          {/* Panel 03: Fragmented Clinical Context */}
          <div className="glass-panel glass-panel-hover p-8 rounded-2xl flex flex-col justify-between relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-6 font-mono text-4xl font-extrabold text-white/5 group-hover:text-lavender-muted/10 transition-colors">
              03
            </div>
            <div>
              <div className="w-12 h-12 rounded-xl bg-surface-card border border-lavender-muted/30 flex items-center justify-center text-lavender-muted mb-6 shadow-glow-lavender">
                <Layers className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-heading font-bold text-text-primary mb-3">
                Fragmented Clinical Context
              </h3>
              <p className="text-sm text-text-secondary leading-relaxed mb-6">
                Molecular sequencing panels, Human Phenotype Ontology (HPO) records, and longitudinal multigenerational observations reside in disconnected hospital silos.
              </p>
            </div>
            <div className="p-3.5 rounded-lg bg-surface-card/60 border border-lavender-muted/20 text-xs font-mono text-lavender-muted flex items-center gap-2">
              <Layers className="w-4 h-4 flex-shrink-0" />
              <span>Siloed EHR &amp; Lab Data Records</span>
            </div>
          </div>
        </div>

        {/* Interactive Comparison Strip: Disconnected Fragments vs. Unified Living Pedigree */}
        <div className="glass-panel p-8 rounded-2xl border border-cyan-electric/25 bg-surface-dark/90">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-6 pb-6 border-b border-white/10 mb-6">
            <div>
              <h4 className="text-lg font-heading font-bold text-text-primary mb-1">
                The Architectural Shift: From Disjointed Records to Living Knowledge Graph
              </h4>
              <p className="text-xs text-text-secondary">
                Toggle between the legacy fragmented paradigm and GenInherit-LLM's unified parametric pedigree representation.
              </p>
            </div>
            <div className="flex items-center bg-surface-card p-1 rounded-lg border border-cyan-electric/20">
              <button
                onClick={() => setActiveTab('fragmented')}
                className={`px-3.5 py-1.5 rounded-md text-xs font-mono transition-all ${
                  activeTab === 'fragmented'
                    ? 'bg-midnight text-evidence-amber border border-evidence-amber/30'
                    : 'text-text-muted hover:text-text-primary'
                }`}
              >
                Traditional Silos
              </button>
              <button
                onClick={() => setActiveTab('unified')}
                className={`px-3.5 py-1.5 rounded-md text-xs font-mono transition-all ${
                  activeTab === 'unified'
                    ? 'bg-gradient-to-r from-cyan-electric to-lavender-muted text-midnight font-bold shadow-glow-cyan'
                    : 'text-text-muted hover:text-text-primary'
                }`}
              >
                GenInherit Unified Graph
              </button>
            </div>
          </div>

          {activeTab === 'fragmented' ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs font-mono">
              <div className="p-4 rounded-xl bg-midnight/80 border border-white/10 text-text-secondary">
                <span className="text-evidence-amber font-bold block mb-1">❌ Lab PDF Report</span>
                <span>Isolated VCF call: "MYBPC3 c.1504C&gt;T (VUS)". No parental segregation context.</span>
              </div>
              <div className="p-4 rounded-xl bg-midnight/80 border border-white/10 text-text-secondary">
                <span className="text-evidence-amber font-bold block mb-1">❌ EHR Cardiology Chart</span>
                <span>"Father healthy at 38". Erroneously assumes variant is excluded or de novo.</span>
              </div>
              <div className="p-4 rounded-xl bg-midnight/80 border border-white/10 text-text-secondary">
                <span className="text-evidence-amber font-bold block mb-1">❌ Vector Search (RAG)</span>
                <span>Fails 4-hop lineage traversal; hallucinates maternal carrier status.</span>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs font-mono animate-in fade-in duration-300">
              <div className="p-4 rounded-xl bg-midnight/80 border border-cyan-electric/30 text-text-primary shadow-glow-cyan">
                <span className="text-cyan-electric font-bold block mb-1">✓ Multigenerational Graph</span>
                <span>Links Grandfather [I-1] to Father [II-1] to Proband [III-1] in continuous lineage.</span>
              </div>
              <div className="p-4 rounded-xl bg-midnight/80 border border-evidence-green/30 text-text-primary shadow-glow-observed">
                <span className="text-evidence-green font-bold block mb-1">✓ Incomplete Penetrance Solved</span>
                <span>Correctly identifies Father as an asymptomatic obligate carrier without de novo errors.</span>
              </div>
              <div className="p-4 rounded-xl bg-midnight/80 border border-lavender-muted/30 text-text-primary shadow-glow-lavender">
                <span className="text-lavender-muted font-bold block mb-1">✓ Parametric LoRA Memory</span>
                <span>Internalizes lineage directly into low-rank neural weights (&lt; 35 MB) with zero cross-leakage.</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
