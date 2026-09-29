import React from 'react';
import { MASTER_BENCHMARK_METRICS, COMPARATIVE_MODEL_DATA } from '../data/researchMetrics';
import { CheckCircle } from 'lucide-react';

export const ResearchSection: React.FC = () => {
  return (
    <section id="research" className="py-24 relative bg-midnight border-t border-cyan-electric/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-mono uppercase tracking-widest text-cyan-electric mb-3 block">
            EMPIRICAL VALIDATION &amp; BENCHMARK AUDIT
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-bold text-text-primary tracking-tight mb-6">
            Built Around Measurable Scientific Evaluation.
          </h2>
          <p className="text-base sm:text-lg text-text-secondary leading-relaxed">
            Evaluated on the NVIDIA DGX B200 accelerated compute cluster across 386 held-out test scenarios (<code className="text-cyan-ice">GenInherit-Bench v2.0 Expanded</code>) spanning 2,500 curated multigenerational pedigrees.
          </p>
        </div>

        {/* Master Metrics Breakdown Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {MASTER_BENCHMARK_METRICS.map((metric, idx) => (
            <div
              key={idx}
              className="glass-panel p-6 rounded-2xl border border-cyan-electric/20 bg-surface-dark/90 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-mono text-text-muted">Target: {metric.target}</span>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-evidence-green/20 text-evidence-green border border-evidence-green/30 font-bold">
                    {metric.delta}
                  </span>
                </div>
                <div className="text-3xl font-mono font-extrabold text-cyan-electric mb-2">
                  {metric.measured}
                </div>
                <h4 className="text-sm font-heading font-bold text-text-primary mb-1">
                  {metric.name}
                </h4>
                <p className="text-xs text-text-secondary leading-relaxed">
                  {metric.description}
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-white/5 text-[10px] font-mono text-text-muted flex items-center gap-1">
                <CheckCircle className="w-3 h-3 text-evidence-green" />
                <span>Benchmark Certified on DGX B200</span>
              </div>
            </div>
          ))}
        </div>

        {/* Comparative Baseline Bar Visualization */}
        <div className="glass-panel p-8 rounded-3xl border border-cyan-electric/25 bg-surface-dark/95 shadow-glass-card">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/10 mb-8">
            <div>
              <h3 className="text-xl font-heading font-bold text-text-primary">
                Comparative Mendelian Reasoning Accuracy
              </h3>
              <p className="text-xs font-mono text-text-secondary">
                GenInherit-LLM Parametric LoRA vs. Naive RAG vs. Unadapted Base 7B Model
              </p>
            </div>
            <div className="text-xs font-mono text-cyan-electric bg-surface-card px-3 py-1.5 rounded-lg border border-cyan-electric/20">
              +33.6% Accuracy Gain over Base Foundation
            </div>
          </div>

          <div className="space-y-6 max-w-4xl">
            {COMPARATIVE_MODEL_DATA.map((item, idx) => (
              <div key={idx} className="space-y-2">
                <div className="flex justify-between text-xs font-mono">
                  <span className="font-bold text-text-primary">{item.model}</span>
                  <span className="text-cyan-ice font-bold">{item.accuracy}% Accuracy</span>
                </div>
                <div className="h-4 w-full bg-midnight rounded-full overflow-hidden p-0.5 border border-white/10">
                  <div
                    className={`h-full rounded-full transition-all duration-1000 ${
                      item.model.includes('GenInherit')
                        ? 'bg-gradient-to-r from-cyan-electric via-lavender-muted to-evidence-green shadow-glow-cyan'
                        : item.model.includes('RAG')
                        ? 'bg-cyan-electric/50'
                        : 'bg-white/20'
                    }`}
                    style={{ width: `${item.accuracy}%` }}
                  />
                </div>
                <div className="flex justify-between text-[10px] font-mono text-text-muted">
                  <span>Hallucination Rate: {item.hallucination}%</span>
                  <span>Uncertainty Calibration: {item.uncertainty}%</span>
                  <span>Harmonic F1: {item.f1}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 pt-4 border-t border-white/10 text-[11px] font-mono text-text-muted">
            *Performance figures represent project-reported empirical benchmark evaluations on held-out test suites (`GenInherit-Bench v2.0 Expanded`) and do not constitute independent third-party clinical trials.
          </div>
        </div>
      </div>
    </section>
  );
};
