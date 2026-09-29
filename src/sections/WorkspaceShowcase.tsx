import React, { useState } from 'react';
import { Microscope, GraduationCap, Stethoscope, ArrowRight, Check } from 'lucide-react';

export const WorkspaceShowcase: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'research' | 'student' | 'clinical'>('clinical');

  return (
    <section id="workspaces" className="py-24 relative bg-midnight border-t border-cyan-electric/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-mono uppercase tracking-widest text-cyan-electric mb-3 block">
            ROLE-SPECIFIC APPLICATION ENVIRONMENTS
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-bold text-text-primary tracking-tight mb-6">
            One Genomic Intelligence System. Three Ways to Explore It.
          </h2>
          <p className="text-base sm:text-lg text-text-secondary leading-relaxed">
            Tailored cognitive workspaces engineered specifically for the distinct requirements of biomedical researchers, genetics students, and board-certified clinical geneticists.
          </p>
        </div>

        {/* Workspace Selector Tabs */}
        <div className="flex justify-center mb-12">
          <div className="bg-surface-card p-1.5 rounded-2xl border border-cyan-electric/20 flex flex-wrap gap-2">
            <button
              onClick={() => setActiveTab('research')}
              className={`flex items-center gap-2.5 px-5 py-3 rounded-xl text-sm font-heading font-bold transition-all ${
                activeTab === 'research'
                  ? 'bg-gradient-to-r from-cyan-electric to-lavender-muted text-midnight shadow-glow-cyan'
                  : 'text-text-secondary hover:text-text-primary'
              }`}
            >
              <Microscope className="w-4 h-4" />
              <span>01 — Researcher Workspace</span>
            </button>

            <button
              onClick={() => setActiveTab('student')}
              className={`flex items-center gap-2.5 px-5 py-3 rounded-xl text-sm font-heading font-bold transition-all ${
                activeTab === 'student'
                  ? 'bg-gradient-to-r from-cyan-electric to-lavender-muted text-midnight shadow-glow-cyan'
                  : 'text-text-secondary hover:text-text-primary'
              }`}
            >
              <GraduationCap className="w-4 h-4" />
              <span>02 — Student Sandbox</span>
            </button>

            <button
              onClick={() => setActiveTab('clinical')}
              className={`flex items-center gap-2.5 px-5 py-3 rounded-xl text-sm font-heading font-bold transition-all ${
                activeTab === 'clinical'
                  ? 'bg-gradient-to-r from-cyan-electric to-lavender-muted text-midnight shadow-glow-cyan'
                  : 'text-text-secondary hover:text-text-primary'
              }`}
            >
              <Stethoscope className="w-4 h-4" />
              <span>03 — Clinical Workspace</span>
            </button>
          </div>
        </div>

        {/* Dynamic Workspace Detail Panel */}
        <div className="glass-panel p-8 sm:p-12 rounded-3xl border border-cyan-electric/25 bg-surface-dark/95 shadow-glass-card">
          {/* TAB 1: RESEARCHER WORKSPACE */}
          {activeTab === 'research' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center animate-in fade-in duration-300">
              <div className="lg:col-span-5">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-cyan-electric/10 text-cyan-electric text-xs font-mono mb-4 border border-cyan-electric/20">
                  <Microscope className="w-3.5 h-3.5" />
                  <span>RESEARCH &amp; COHORT SIMULATION</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-heading font-bold text-text-primary mb-4">
                  Discover Patterns Across Genetic Cohorts.
                </h3>
                <p className="text-sm text-text-secondary leading-relaxed mb-6">
                  Empower computational biologists and geneticists to conduct high-throughput batch VCF ingestion, calculate parametric LOD co-segregation scores, and simulate penetrance shifts across thousands of virtual descendants.
                </p>

                <div className="space-y-3 mb-8 text-xs font-mono text-text-primary">
                  <div className="flex items-center gap-2.5">
                    <Check className="w-4 h-4 text-cyan-electric flex-shrink-0" />
                    <span>Batch Multi-Sample VCF &amp; PED Ingestion</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <Check className="w-4 h-4 text-cyan-electric flex-shrink-0" />
                    <span>Monte Carlo Penetrance &amp; Expressivity Sweeps (10–100%)</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <Check className="w-4 h-4 text-cyan-electric flex-shrink-0" />
                    <span>Statistical LOD Co-Segregation &amp; VUS Upgrading</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <Check className="w-4 h-4 text-cyan-electric flex-shrink-0" />
                    <span>One-Click Export to CSV, Parquet &amp; R-Dataframes</span>
                  </div>
                </div>

                <a
                  href="#simulator"
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-cyan-electric text-midnight font-bold text-sm shadow-glow-cyan hover:opacity-95 transition-all"
                >
                  <span>Explore Research</span>
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>

              {/* Research Preview UI Box */}
              <div className="lg:col-span-7 p-6 rounded-2xl bg-midnight/90 border border-cyan-electric/30">
                <div className="flex items-center justify-between pb-3 border-b border-white/10 mb-4 text-xs font-mono">
                  <span className="text-cyan-electric">Cohort LOD Matrix Sweep (N=420)</span>
                  <span className="text-evidence-green">gnomAD v4.1 Synced</span>
                </div>
                <div className="grid grid-cols-2 gap-3 mb-4 text-xs font-mono">
                  <div className="p-3.5 rounded-xl bg-surface-card border border-white/10">
                    <div className="text-[10px] text-text-muted mb-1">CANDIDATE VUS COHORT</div>
                    <div className="text-lg text-text-primary font-bold">12 Families</div>
                    <div className="text-[10px] text-cyan-ice">MYBPC3, LMNA, TTN</div>
                  </div>
                  <div className="p-3.5 rounded-xl bg-surface-card border border-white/10">
                    <div className="text-[10px] text-text-muted mb-1">CALCULATED LOD SCORE</div>
                    <div className="text-lg text-evidence-green font-bold">+3.84 (Significant)</div>
                    <div className="text-[10px] text-text-secondary">P-value: 0.00014</div>
                  </div>
                </div>
                <div className="p-4 rounded-xl bg-surface-card border border-cyan-electric/20 text-xs font-mono text-text-secondary leading-relaxed">
                  <div className="text-cyan-electric font-bold mb-1">&gt; Simulated Progeny Severity Curve</div>
                  <p>Monte Carlo sweep ($N=10,000$ trials) confirms $62.4\%$ conditional manifestation probability at age &gt; 40 under incomplete penetrance.</p>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: STUDENT WORKSPACE */}
          {activeTab === 'student' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center animate-in fade-in duration-300">
              <div className="lg:col-span-5">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-lavender-muted/10 text-lavender-muted text-xs font-mono mb-4 border border-lavender-muted/20">
                  <GraduationCap className="w-3.5 h-3.5" />
                  <span>EDUCATIONAL GENETICS SANDBOX</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-heading font-bold text-text-primary mb-4">
                  Learn Inheritance by Exploring It.
                </h3>
                <p className="text-sm text-text-secondary leading-relaxed mb-6">
                  A gamified, interactive training sandbox for medical students and genetic counseling trainees. Solve mystery pedigree puzzles, run counterfactual "What-If?" lineage shifts, and observe animated gamete segregation.
                </p>

                <div className="space-y-3 mb-8 text-xs font-mono text-text-primary">
                  <div className="flex items-center gap-2.5">
                    <Check className="w-4 h-4 text-lavender-muted flex-shrink-0" />
                    <span>Interactive "Genomic Detective" Mystery Cases</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <Check className="w-4 h-4 text-lavender-muted flex-shrink-0" />
                    <span>Counterfactual Lineage Slider ("What-If?" Simulator)</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <Check className="w-4 h-4 text-lavender-muted flex-shrink-0" />
                    <span>Step-by-Step Chain-of-Thought Deduction Cards</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <Check className="w-4 h-4 text-lavender-muted flex-shrink-0" />
                    <span>Automated Board Exam Quiz Generation</span>
                  </div>
                </div>

                <a
                  href="#simulator"
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-lavender-muted text-midnight font-bold text-sm shadow-glow-lavender hover:opacity-95 transition-all"
                >
                  <span>Explore Learning</span>
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>

              {/* Student Preview UI Box */}
              <div className="lg:col-span-7 p-6 rounded-2xl bg-midnight/90 border border-lavender-muted/30">
                <div className="flex items-center justify-between pb-3 border-b border-white/10 mb-4 text-xs font-mono">
                  <span className="text-lavender-muted">Mystery Case #14: The Asymptomatic Father</span>
                  <span className="text-evidence-green">Level 3 Trainee</span>
                </div>
                <div className="p-4 rounded-xl bg-surface-card border border-white/10 mb-4 text-xs font-mono">
                  <span className="text-text-muted block mb-1">STUDENT HYPOTHESIS TEST:</span>
                  <p className="text-text-primary font-medium">"If Grandmother [I-2] were homozygous normal, why does Grandson [III-1] show severe neuropathy?"</p>
                </div>
                <div className="p-4 rounded-xl bg-surface-card border border-lavender-muted/20 text-xs font-mono text-text-secondary leading-relaxed">
                  <div className="text-lavender-muted font-bold mb-1">&gt; AI Tutor Rationale Step 2/3</div>
                  <p>Grandfather [I-1] transmitted the X-linked pathogenic allele to Mother [II-2] (an obligate carrier). Mother passed it to Grandson [III-1] with 50% Mendelian odds.</p>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: CLINICAL WORKSPACE */}
          {activeTab === 'clinical' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center animate-in fade-in duration-300">
              <div className="lg:col-span-5">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-evidence-green/10 text-evidence-green text-xs font-mono mb-4 border border-evidence-green/20">
                  <Stethoscope className="w-3.5 h-3.5" />
                  <span>CLINICAL GENOMICS DECISION SUPPORT</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-heading font-bold text-text-primary mb-4">
                  Bring Family Evidence Into Clinical Reasoning.
                </h3>
                <p className="text-sm text-text-secondary leading-relaxed mb-6">
                  Engineered for genetic counselors and medical geneticists. Rapidly construct clinical pedigrees, review molecular panels, compute prenatal recurrence risk, and generate board-certified consultation notes with HL7 FHIR R4 EHR export.
                </p>

                <div className="space-y-3 mb-8 text-xs font-mono text-text-primary">
                  <div className="flex items-center gap-2.5">
                    <Check className="w-4 h-4 text-evidence-green flex-shrink-0" />
                    <span>Visual Drag-and-Drop Pedigree Builder</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <Check className="w-4 h-4 text-evidence-green flex-shrink-0" />
                    <span>10-Tier ACMG Board-Certified Clinical Diagnostic Reports</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <Check className="w-4 h-4 text-evidence-green flex-shrink-0" />
                    <span>SMART-on-FHIR R4 Direct Export (Epic &amp; Cerner)</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <Check className="w-4 h-4 text-evidence-green flex-shrink-0" />
                    <span>Plain-Language Patient Family Take-Home Leaflets</span>
                  </div>
                </div>

                <a
                  href="#pedigree"
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-r from-cyan-electric to-lavender-muted text-midnight font-bold text-sm shadow-glow-cyan hover:opacity-95 transition-all"
                >
                  <span>Explore Clinical Tools</span>
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>

              {/* Clinical Preview UI Box */}
              <div className="lg:col-span-7 p-6 rounded-2xl bg-midnight/90 border border-evidence-green/30">
                <div className="flex items-center justify-between pb-3 border-b border-white/10 mb-4 text-xs font-mono">
                  <span className="text-evidence-green">Clinical Case Consultation: FAM_CARDIO_042</span>
                  <span className="text-cyan-electric">Epic EHR Connected</span>
                </div>
                <div className="grid grid-cols-2 gap-3 mb-4 text-xs font-mono">
                  <div className="p-3.5 rounded-xl bg-surface-card border border-white/10">
                    <div className="text-[10px] text-text-muted mb-1">INHERITANCE PATTERN</div>
                    <div className="text-base text-text-primary font-bold">Autosomal Dominant</div>
                    <div className="text-[10px] text-evidence-green">Confidence: 98.4%</div>
                  </div>
                  <div className="p-3.5 rounded-xl bg-surface-card border border-white/10">
                    <div className="text-[10px] text-text-muted mb-1">TARGETED TESTING TRIAGE</div>
                    <div className="text-base text-evidence-amber font-bold">Mother [II-2]</div>
                    <div className="text-[10px] text-text-secondary">Prioritize targeted sequencing</div>
                  </div>
                </div>
                <div className="p-4 rounded-xl bg-surface-card border border-evidence-green/20 text-xs font-mono text-text-secondary leading-relaxed">
                  <div className="text-evidence-green font-bold mb-1">&gt; 10-Tier Clinical Diagnostic Note Preview</div>
                  <p>"Deduction establishes 3-generation paternal transmission of MYBPC3 c.1504C&gt;T. Sibling [III-2] possesses 50% prior transmission risk. Recommend regular non-invasive echocardiograms."</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
