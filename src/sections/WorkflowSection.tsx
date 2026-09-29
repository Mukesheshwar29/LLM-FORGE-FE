import React, { useState } from 'react';
import { WORKFLOW_STAGES, type WorkflowStage } from '../data/workflowStages';
import { UploadCloud, CheckCircle2, Network, Cpu, FileText, ArrowRight, CornerDownRight } from 'lucide-react';

const ICONS_MAP: Record<string, React.ReactNode> = {
  UploadCloud: <UploadCloud className="w-5 h-5" />,
  CheckCircle2: <CheckCircle2 className="w-5 h-5" />,
  Network: <Network className="w-5 h-5" />,
  Cpu: <Cpu className="w-5 h-5" />,
  FileText: <FileText className="w-5 h-5" />,
};

export const WorkflowSection: React.FC = () => {
  const [activeStage, setActiveStage] = useState<WorkflowStage>(WORKFLOW_STAGES[0]);

  return (
    <section id="workflow" className="py-24 relative bg-midnight/95 border-t border-cyan-electric/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <span className="text-xs font-mono uppercase tracking-widest text-cyan-electric mb-3 block">
            THE 5-STAGE OPERATIONAL PIPELINE
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-bold text-text-primary tracking-tight mb-6">
            From Genetic Evidence to Inheritance Reasoning.
          </h2>
          <p className="text-base sm:text-lg text-text-secondary leading-relaxed">
            A deterministic, air-gapped clinical ingestion pipeline that translates raw next-generation sequencing VCF files and clinical observations into multi-hop biological deductions.
          </p>
        </div>

        {/* 5-Stage Horizontal Interactive Step Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 mb-10">
          {WORKFLOW_STAGES.map((stage) => {
            const isSelected = activeStage.number === stage.number;
            return (
              <button
                key={stage.number}
                onClick={() => setActiveStage(stage)}
                className={`p-4 rounded-xl text-left transition-all duration-300 flex flex-col justify-between relative group ${
                  isSelected
                    ? 'bg-surface-card border-2 border-cyan-electric shadow-glow-cyan scale-[1.02]'
                    : 'bg-surface-card/40 hover:bg-surface-card/70 border border-white/10 hover:border-cyan-electric/30'
                }`}
              >
                <div className="flex items-center justify-between mb-3 w-full">
                  <span
                    className={`font-mono text-xs font-bold px-2 py-0.5 rounded ${
                      isSelected
                        ? 'bg-cyan-electric text-midnight'
                        : 'bg-white/10 text-text-muted group-hover:text-cyan-electric'
                    }`}
                  >
                    STAGE {stage.number}
                  </span>
                  <div
                    className={`${
                      isSelected ? 'text-cyan-electric' : 'text-text-muted group-hover:text-text-primary'
                    }`}
                  >
                    {ICONS_MAP[stage.icon]}
                  </div>
                </div>

                <div className="font-heading font-bold text-sm sm:text-base text-text-primary mb-1">
                  {stage.title}
                </div>
                <div className="text-[11px] font-mono text-text-muted truncate w-full">
                  {stage.headline}
                </div>
              </button>
            );
          })}
        </div>

        {/* Interactive Detailed Stage Inspector Drawer */}
        <div className="glass-panel p-8 rounded-3xl border border-cyan-electric/25 bg-surface-dark/95 shadow-glass-card">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-white/10 mb-8">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-midnight border border-cyan-electric/40 flex items-center justify-center text-cyan-electric shadow-glow-cyan">
                {ICONS_MAP[activeStage.icon]}
              </div>
              <div>
                <div className="text-xs font-mono text-cyan-electric mb-0.5">
                  STAGE {activeStage.number} ARCHITECTURAL SPECIFICATION
                </div>
                <h3 className="text-2xl font-heading font-bold text-text-primary">
                  {activeStage.headline}
                </h3>
              </div>
            </div>
            <div className="text-xs font-mono text-text-secondary bg-surface-card px-4 py-2 rounded-xl border border-white/10 max-w-sm">
              Status: <span className="text-evidence-green font-bold">Deterministic Pipeline Enclave</span>
            </div>
          </div>

          <p className="text-base text-text-secondary leading-relaxed mb-8 max-w-4xl">
            {activeStage.description}
          </p>

          {/* 3-Column Inputs, Processing, Outputs */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Inputs */}
            <div className="p-5 rounded-2xl bg-midnight/90 border border-white/10">
              <span className="text-xs font-mono font-bold text-cyan-ice block mb-3 uppercase tracking-wider">
                1. Inputs Ingested
              </span>
              <ul className="space-y-2 text-xs font-mono text-text-secondary">
                {activeStage.inputs.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <CornerDownRight className="w-3.5 h-3.5 text-cyan-electric flex-shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Processing */}
            <div className="p-5 rounded-2xl bg-midnight/90 border border-cyan-electric/20 shadow-glow-cyan/50">
              <span className="text-xs font-mono font-bold text-cyan-electric block mb-3 uppercase tracking-wider">
                2. Processing &amp; Execution
              </span>
              <ul className="space-y-2 text-xs font-mono text-text-primary">
                {activeStage.processing.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-evidence-green flex-shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Outputs */}
            <div className="p-5 rounded-2xl bg-midnight/90 border border-lavender-muted/20">
              <span className="text-xs font-mono font-bold text-lavender-muted block mb-3 uppercase tracking-wider">
                3. Emitted Deliverables
              </span>
              <ul className="space-y-2 text-xs font-mono text-text-secondary">
                {activeStage.outputs.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <ArrowRight className="w-3.5 h-3.5 text-lavender-muted flex-shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
