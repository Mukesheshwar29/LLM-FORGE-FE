import React from 'react';
import { ShieldCheck, Lock, FileKey, Trash2, EyeOff, UserCheck, AlertOctagon } from 'lucide-react';

export const SecuritySection: React.FC = () => {
  const securityPillars = [
    {
      icon: Lock,
      title: 'Family-Level Adapter Isolation',
      desc: 'Each family is represented as a physically and logically isolated low-rank adapter (~35 MB), preventing cross-family parameter contamination.',
      badge: 'Zero Parameter Sharing',
    },
    {
      icon: FileKey,
      title: 'AES-256-GCM Hardware Encryption',
      desc: 'Family weight files are encrypted at rest with dedicated cryptographic keys managed by hospital hardware security modules (HSM).',
      badge: 'Air-Gapped Enclave',
    },
    {
      icon: ShieldCheck,
      title: 'Immutable WORM Audit Ledger',
      desc: 'Every forward inference pass, deduction hash, and clinician query is logged to an immutable append-only compliance ledger.',
      badge: 'Audit Verified',
    },
    {
      icon: Trash2,
      title: 'GDPR Right-to-be-Forgotten',
      desc: 'Erasing a family record requires deleting only their 35 MB adapter tensor—zero retraining or fine-tuning of the foundation model needed.',
      badge: 'Instant Cryptographic Erasure',
    },
    {
      icon: EyeOff,
      title: 'Ethical Non-Profiling Guardrails',
      desc: 'Hard-coded computational guardrails prevent unauthorized non-clinical phenotyping, forensic matching, or direct-to-consumer profiling.',
      badge: 'Bioethics Certified',
    },
    {
      icon: UserCheck,
      title: 'Mandatory Human Clinical Oversight',
      desc: 'GenInherit-LLM operates as clinical decision support. All outputs are advisory and require board-certified physician sign-off.',
      badge: 'Human-in-the-Loop',
    },
  ];

  return (
    <section id="security" className="py-24 relative bg-midnight/95 border-t border-cyan-electric/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-mono uppercase tracking-widest text-cyan-electric mb-3 block">
            GOVERNANCE, BIOETHICS &amp; PRIVACY
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-bold text-text-primary tracking-tight mb-6">
            Genomic Intelligence Must Begin With Trust.
          </h2>
          <p className="text-base sm:text-lg text-text-secondary leading-relaxed">
            Protecting sensitive multigenerational genetic heritage requires rigorous cryptographic isolation, air-gapped on-premise infrastructure, and strict bioethical boundaries.
          </p>
        </div>

        {/* 6 Security Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {securityPillars.map((pillar, idx) => {
            const Icon = pillar.icon;
            return (
              <div
                key={idx}
                className="glass-panel p-8 rounded-2xl border border-cyan-electric/20 bg-surface-dark/90 flex flex-col justify-between group hover:border-cyan-electric/40 transition-all duration-300"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-12 h-12 rounded-xl bg-midnight border border-cyan-electric/30 flex items-center justify-center text-cyan-electric shadow-glow-cyan">
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-[10px] font-mono px-2.5 py-1 rounded bg-surface-card border border-white/10 text-cyan-ice">
                      {pillar.badge}
                    </span>
                  </div>

                  <h3 className="text-lg font-heading font-bold text-text-primary mb-2">
                    {pillar.title}
                  </h3>
                  <p className="text-xs text-text-secondary leading-relaxed mb-6 font-sans">
                    {pillar.desc}
                  </p>
                </div>

                <div className="pt-3 border-t border-white/5 text-[10px] font-mono text-text-muted flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-evidence-green" />
                  <span>Institutional Defense-in-Depth</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Responsible Intelligence Statement Banner */}
        <div className="p-6 rounded-2xl bg-surface-card/90 border border-white/10 text-xs font-mono text-text-secondary leading-relaxed">
          <div className="flex items-start gap-3">
            <AlertOctagon className="w-5 h-5 text-evidence-amber flex-shrink-0 mt-0.5" />
            <div>
              <strong className="text-text-primary block mb-1">
                Transparency &amp; Responsible Deployment Commitment:
              </strong>
              Family-specific adapters are an architectural mechanism for parameter isolation. Actual patient data protection depends on complete on-premise hardware deployment, air-gap enforcement, and institutional operational access controls. GenInherit-LLM is designed for clinical decision support and genetics education, not autonomous diagnostics.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
