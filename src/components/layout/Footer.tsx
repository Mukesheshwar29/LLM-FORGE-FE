import React from 'react';
import { Dna, ShieldAlert } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-midnight border-t border-white/10 pt-16 pb-12 text-text-secondary text-xs font-mono">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-12">
          {/* Col 1 & 2: Brand & Mission */}
          <div className="lg:col-span-2">
            <a href="#" className="flex items-center gap-3 mb-4 group">
              <div className="w-8 h-8 rounded-lg bg-surface-card border border-cyan-electric/30 flex items-center justify-center text-cyan-electric">
                <Dna className="w-4 h-4" />
              </div>
              <span className="font-heading font-bold text-base text-text-primary">
                GenInherit<span className="text-cyan-electric font-mono text-xs ml-1 px-1.5 py-0.5 rounded bg-cyan-electric/10 border border-cyan-electric/20">LLM</span>
              </span>
            </a>
            <p className="text-xs text-text-secondary leading-relaxed font-sans max-w-sm mb-4">
              Continually evolving family-specific genomic inheritance reasoning platform. Coupling a frozen foundation model with cryptographically isolated parameter adapters for multigenerational clinical decision support.
            </p>
            <div className="text-[11px] text-cyan-ice">
              Hardware Environment: NVIDIA DGX B200 SXM Compute Node
            </div>
          </div>

          {/* Col 3: Platform Links */}
          <div>
            <span className="text-xs font-bold text-text-primary uppercase tracking-wider block mb-4">
              Platform
            </span>
            <ul className="space-y-2.5">
              <li><a href="#architecture" className="hover:text-cyan-electric transition-colors">Foundation Model</a></li>
              <li><a href="#pedigree" className="hover:text-cyan-electric transition-colors">Pedigree Canvas</a></li>
              <li><a href="#workflow" className="hover:text-cyan-electric transition-colors">Ingestion Pipeline</a></li>
              <li><a href="#simulator" className="hover:text-cyan-electric transition-colors">Inheritance Simulator</a></li>
              <li><a href="#workspaces" className="hover:text-cyan-electric transition-colors">Role Workspaces</a></li>
            </ul>
          </div>

          {/* Col 4: Research & Docs */}
          <div>
            <span className="text-xs font-bold text-text-primary uppercase tracking-wider block mb-4">
              Research
            </span>
            <ul className="space-y-2.5">
              <li><a href="#research" className="hover:text-cyan-electric transition-colors">DGX B200 Benchmark</a></li>
              <li><a href="#integration" className="hover:text-cyan-electric transition-colors">FHIR R4 Genomics</a></li>
              <li><a href="#evidence" className="hover:text-cyan-electric transition-colors">Epistemic Lexicon</a></li>
              <li><a href="#problem" className="hover:text-cyan-electric transition-colors">Anti-RAG Thesis</a></li>
            </ul>
          </div>

          {/* Col 5: Security & Governance */}
          <div>
            <span className="text-xs font-bold text-text-primary uppercase tracking-wider block mb-4">
              Governance
            </span>
            <ul className="space-y-2.5">
              <li><a href="#security" className="hover:text-cyan-electric transition-colors">Adapter Isolation</a></li>
              <li><a href="#security" className="hover:text-cyan-electric transition-colors">WORM Audit Trails</a></li>
              <li><a href="#security" className="hover:text-cyan-electric transition-colors">Right-to-be-Forgotten</a></li>
              <li><a href="#security" className="hover:text-cyan-electric transition-colors">Bioethics Guardrails</a></li>
            </ul>
          </div>
        </div>

        {/* Clinical Disclaimer Box */}
        <div className="p-4 rounded-xl bg-surface-card/60 border border-white/10 mb-8 flex items-start gap-3 text-[11px] leading-relaxed text-text-muted">
          <ShieldAlert className="w-4 h-4 text-evidence-amber flex-shrink-0 mt-0.5" />
          <div>
            <strong className="text-text-secondary">Clinical Decision Support Disclaimer:</strong> GenInherit-LLM is engineered strictly to assist certified medical geneticists, genetic counselors, and bioinformatics researchers. AI outputs represent algorithmic deductions over submitted evidence and do not replace qualified medical diagnosis or independent clinical validation.
          </div>
        </div>

        {/* Copyright & Bottom Bar */}
        <div className="pt-6 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-text-muted">
          <div>
            &copy; 2026 GenInherit-LLM Research Initiative. All rights reserved.
          </div>
          <div className="flex items-center gap-6">
            <span>Version 1.0.0-RC</span>
            <span>Classification: Medical AI Research</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
