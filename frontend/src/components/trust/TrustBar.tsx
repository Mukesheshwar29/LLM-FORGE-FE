import React from 'react';
import { ShieldCheck, Award, Lock, CheckCircle2, FileCheck2 } from 'lucide-react';

export const TrustBar: React.FC = () => {
  return (
    <div className="w-full bg-navy-800/80 border-y border-cyan-electric/15 py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Trust Headline */}
          <div className="flex items-center gap-3 text-center md:text-left">
            <div className="w-10 h-10 rounded-full bg-evidence-greenBg border border-evidence-green/30 flex items-center justify-center text-evidence-green flex-shrink-0">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-heading font-bold text-text-primary">
                Trusted by 120,000+ Researchers, Clinical Geneticists & Families
              </h4>
              <p className="text-xs text-text-secondary">
                Benchmarked on NVIDIA DGX B200 • 94.8% Empirical Mendelian Accuracy
              </p>
            </div>
          </div>

          {/* Compliance & Standards Badges */}
          <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 text-xs font-mono text-text-secondary">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-surface-card border border-white/5">
              <ShieldCheck className="w-4 h-4 text-cyan-electric" />
              <span>HIPAA Compliant</span>
            </div>
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-surface-card border border-white/5">
              <Lock className="w-4 h-4 text-evidence-green" />
              <span>Zero Parametric Leakage</span>
            </div>
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-surface-card border border-white/5">
              <FileCheck2 className="w-4 h-4 text-lavender-muted" />
              <span>HL7 FHIR R4 Ready</span>
            </div>
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-surface-card border border-white/5">
              <CheckCircle2 className="w-4 h-4 text-evidence-amber" />
              <span>ACMG/AMP Tier I-IV</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
