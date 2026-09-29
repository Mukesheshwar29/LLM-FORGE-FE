import React, { useState } from 'react';
import { 
  Dna, 
  ArrowRight, 
  ShieldCheck, 
  CheckCircle2, 
  Cpu, 
  FileText, 
  Lock, 
  ChevronRight, 
  Activity, 
  Brain, 
  Award, 
  Database, 
  Menu, 
  X 
} from 'lucide-react';
import { TraitsExplorer } from '../components/traits/TraitsExplorer';
import { FAQSection } from '../sections/FAQSection';

interface LandingPageProps {
  onLaunchStudio: () => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ onLaunchStudio }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [selectedRole, setSelectedRole] = useState<'researcher' | 'student' | 'doctor'>('doctor');

  return (
    <div className="min-h-screen bg-white text-black font-sans selection:bg-black selection:text-white flex flex-col">
      {/* Top Announcement Bar (Stark Black) */}
      <div className="bg-black text-white py-2.5 px-4 text-center text-xs font-medium flex items-center justify-center gap-2">
        <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-white text-black uppercase tracking-wider">
          New
        </span>
        <span className="text-zinc-200">
          Multigenerational Pedigree Intelligence with Isolated Family LoRA Adapters
        </span>
        <button
          onClick={onLaunchStudio}
          className="underline hover:text-evidence-green transition-colors font-bold ml-1 hidden sm:inline-flex items-center gap-1"
        >
          Launch Studio <ArrowRight className="w-3 h-3 inline" />
        </button>
      </div>

      {/* Clean Sticky Navigation (White & Black) */}
      <nav className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-zinc-200 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex items-center justify-between h-20">
          {/* Brand Logo */}
          <a href="#" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl bg-black text-white flex items-center justify-center group-hover:scale-105 transition-all shadow-sm">
              <Dna className="w-5 h-5 text-white group-hover:rotate-45 transition-transform duration-500" />
            </div>
            <div className="flex flex-col">
              <span className="font-heading font-extrabold text-xl text-black tracking-tight">
                GenInherit<span className="text-xs font-mono font-bold ml-1 px-1.5 py-0.5 rounded bg-zinc-100 text-black border border-zinc-300">LLM</span>
              </span>
              <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-wider">
                Genomic Reasoning Platform
              </span>
            </div>
          </a>

          {/* Desktop Nav Links */}
          <div className="hidden lg:flex items-center gap-8">
            <a href="#how-it-works" className="text-sm font-semibold text-zinc-600 hover:text-black transition-colors">
              How It Works
            </a>
            <a href="#traits" className="text-sm font-semibold text-zinc-600 hover:text-black transition-colors">
              Inherited Traits
            </a>
            <a href="#roles" className="text-sm font-semibold text-zinc-600 hover:text-black transition-colors">
              Solutions by Role
            </a>
            <a href="#science" className="text-sm font-semibold text-zinc-600 hover:text-black transition-colors">
              Scientific Precision
            </a>
            <a href="#security" className="text-sm font-semibold text-zinc-600 hover:text-black transition-colors">
              Privacy & Bioethics
            </a>
            <a href="#faq" className="text-sm font-semibold text-zinc-600 hover:text-black transition-colors">
              FAQ
            </a>
          </div>

          {/* Right Action Buttons */}
          <div className="hidden lg:flex items-center gap-3">
            <a
              href="#traits"
              className="text-xs font-bold text-zinc-700 hover:text-black px-3.5 py-2 transition-colors"
            >
              Browse Reports
            </a>
            <button
              onClick={onLaunchStudio}
              className="flex items-center gap-2 bg-black hover:bg-zinc-800 text-white font-bold px-5 py-2.5 rounded-xl text-xs tracking-wide shadow-sm active:scale-95 transition-all"
            >
              <span>Launch Studio</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden flex items-center">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg bg-zinc-100 text-black hover:bg-zinc-200"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-white border-t border-zinc-200 px-6 py-6 shadow-xl space-y-4">
            <a
              href="#how-it-works"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-sm font-semibold text-zinc-800 hover:text-black py-1"
            >
              How It Works
            </a>
            <a
              href="#traits"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-sm font-semibold text-zinc-800 hover:text-black py-1"
            >
              Inherited Traits
            </a>
            <a
              href="#roles"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-sm font-semibold text-zinc-800 hover:text-black py-1"
            >
              Solutions by Role
            </a>
            <a
              href="#security"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-sm font-semibold text-zinc-800 hover:text-black py-1"
            >
              Privacy & Security
            </a>
            <a
              href="#faq"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-sm font-semibold text-zinc-800 hover:text-black py-1"
            >
              FAQ
            </a>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onLaunchStudio();
              }}
              className="w-full flex items-center justify-center gap-2 bg-black text-white font-bold py-3 rounded-xl text-sm shadow-md"
            >
              <span>Launch Interactive Studio</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </nav>

      {/* Hero Section (Stark Black & White with Clean Accents) */}
      <section className="relative pt-16 pb-24 px-4 sm:px-6 lg:px-8 bg-white border-b border-zinc-200 overflow-hidden">
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Column — Clean Headline & CTAs */}
            <div className="lg:col-span-6 flex flex-col items-start text-left">
              {/* Pill Eyebrow */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-zinc-100 border border-zinc-300 text-black text-xs font-mono font-bold mb-6">
                <span className="w-2 h-2 rounded-full bg-evidence-green" />
                <span>MULTIGENERATIONAL GENOMIC REASONING</span>
              </div>

              {/* Bold Title */}
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-heading font-extrabold text-black tracking-tight leading-[1.12] mb-6">
                Unlock Your Family’s{' '}
                <span className="underline decoration-zinc-300 underline-offset-8">
                  Genomic Inheritance
                </span>{' '}
                Story.
              </h1>

              {/* Descriptive Body */}
              <p className="text-base sm:text-lg text-zinc-600 leading-relaxed mb-8 max-w-xl font-normal">
                Trace hereditary variant transmission across 3+ generations. Connect verified DNA evidence with family trees and epistemic certainty through isolated neural adaptation.
              </p>

              {/* Primary Actions */}
              <div className="flex flex-wrap items-center gap-4 mb-10 w-full sm:w-auto">
                <button
                  onClick={onLaunchStudio}
                  className="flex items-center justify-center gap-2.5 bg-black hover:bg-zinc-800 text-white font-bold px-7 py-4 rounded-xl text-base shadow-sm active:scale-95 transition-all"
                >
                  <span>Launch Interactive Studio</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <a
                  href="#traits"
                  className="flex items-center justify-center gap-2 bg-white hover:bg-zinc-50 border border-zinc-300 text-black font-semibold px-6 py-4 rounded-xl text-base shadow-sm hover:border-black transition-all"
                >
                  <span>Browse Inherited Traits</span>
                </a>
              </div>

              {/* Trust proof indicators */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full pt-6 border-t border-zinc-200 text-xs font-mono text-zinc-600">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-evidence-green" />
                  <span>94.8% Mendelian Accuracy</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-evidence-cyan" />
                  <span>Zero Cross-Family Bleed</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-black" />
                  <span>HL7 FHIR R4 Ready</span>
                </div>
              </div>
            </div>

            {/* Right Column — High-Contrast Product Showcase Mockup */}
            <div className="lg:col-span-6">
              <div 
                onClick={onLaunchStudio}
                className="group cursor-pointer bg-black text-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-zinc-800 hover:border-zinc-500 transition-all duration-300 relative overflow-hidden"
              >
                {/* Header */}
                <div className="flex items-center justify-between gap-4 mb-6 border-b border-zinc-800 pb-4">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-zinc-700" />
                    <span className="w-3 h-3 rounded-full bg-zinc-700" />
                    <span className="w-3 h-3 rounded-full bg-zinc-700" />
                    <span className="text-xs font-mono text-zinc-400 ml-2">GenInherit Studio</span>
                  </div>

                  <span className="px-2.5 py-1 rounded-full bg-white text-black text-[10px] font-mono font-bold">
                    CLICK TO LAUNCH STUDIO →
                  </span>
                </div>

                {/* Lineage Mockup */}
                <div className="space-y-4 font-mono text-xs">
                  <div className="p-3.5 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-between">
                    <div>
                      <span className="text-white font-bold block text-sm">Family #841 Pedigree Analysis</span>
                      <span className="text-zinc-400 text-[11px]">BRCA1 (c.68_69delAG) • Autosomal Dominant</span>
                    </div>
                    <span className="px-2 py-0.5 rounded bg-evidence-greenLight text-evidence-green text-[10px] font-bold border border-evidence-greenBorder">
                      [OBSERVED]
                    </span>
                  </div>

                  <div className="grid grid-cols-3 gap-2 text-center text-[11px]">
                    <div className="p-3 rounded-xl bg-zinc-900 border border-zinc-800">
                      <span className="text-zinc-500 block text-[9px]">G1 (GRANDMOTHER)</span>
                      <span className="text-white font-bold block mt-1">Affected (+/m)</span>
                      <span className="text-evidence-green text-[10px]">Sequenced</span>
                    </div>

                    <div className="p-3 rounded-xl bg-zinc-900 border border-zinc-800">
                      <span className="text-zinc-500 block text-[9px]">G2 (MOTHER)</span>
                      <span className="text-white font-bold block mt-1">Carrier (+/m)</span>
                      <span className="text-evidence-cyan text-[10px]">P=0.984</span>
                    </div>

                    <div className="p-3 rounded-xl bg-zinc-900 border border-zinc-800">
                      <span className="text-zinc-500 block text-[9px]">G3 (PROBAND)</span>
                      <span className="text-white font-bold block mt-1">High Risk</span>
                      <span className="text-evidence-amber text-[10px]">84% Lifetime</span>
                    </div>
                  </div>

                  <div className="p-3 rounded-xl bg-zinc-950 border border-zinc-800 text-[11px] flex items-center justify-between text-zinc-400">
                    <div className="flex items-center gap-2">
                      <Cpu className="w-3.5 h-3.5 text-zinc-300" />
                      <span>LoRA Hot-Swap Latency: <strong className="text-white">31.8 ms</strong></span>
                    </div>
                    <span className="text-evidence-green">0.000% Leakage</span>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-zinc-800 flex items-center justify-between text-xs text-zinc-400 group-hover:text-white transition-colors">
                  <span>Interactive 3D Pedigree, Punnett Square &amp; HL7 FHIR Exporter</span>
                  <div className="flex items-center gap-1 font-bold">
                    <span>Open Studio</span>
                    <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust & Authority Bar */}
      <section className="bg-zinc-50 border-b border-zinc-200 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="text-sm font-heading font-bold text-black">
                Trusted by 120,000+ Researchers, Medical Geneticists & Families
              </h3>
              <p className="text-xs text-zinc-500">
                Evaluated on NVIDIA DGX B200 • Full ACMG/AMP Tier I-IV Clinical Guideline Conformity
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3 text-xs font-mono text-zinc-700">
              <span className="px-3 py-1.5 rounded-lg bg-white border border-zinc-200 flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-black" />
                CLIA / HIPAA Standard
              </span>
              <span className="px-3 py-1.5 rounded-lg bg-white border border-zinc-200 flex items-center gap-1.5">
                <Lock className="w-4 h-4 text-evidence-green" />
                Zero Parametric Bleed
              </span>
              <span className="px-3 py-1.5 rounded-lg bg-white border border-zinc-200 flex items-center gap-1.5">
                <FileText className="w-4 h-4 text-evidence-cyan" />
                HL7 FHIR R4 Ready
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* 3-Step Process (Clean Black & White Cards) */}
      <section id="how-it-works" className="py-24 px-4 sm:px-6 lg:px-8 bg-white border-b border-zinc-200">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-mono font-bold text-zinc-500 uppercase tracking-wider block mb-2">
              HOW GENINHERIT WORKS
            </span>
            <h2 className="text-3xl sm:text-4xl font-heading font-extrabold text-black tracking-tight">
              From Raw DNA to Multigenerational Clarity
            </h2>
            <p className="text-base text-zinc-600 mt-4 leading-relaxed">
              Three simple steps to connect generational data, isolate family variants, and receive clinical-grade reasoning.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Step 1 */}
            <div className="bg-zinc-50 rounded-2xl p-8 border border-zinc-200 shadow-sm hover:border-black transition-all flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-xl bg-black text-white flex items-center justify-center mb-6 font-mono font-bold text-lg">
                  01
                </div>
                <h3 className="text-xl font-heading font-bold text-black mb-3">
                  Upload Raw DNA or Pedigree
                </h3>
                <p className="text-sm text-zinc-600 leading-relaxed">
                  Support for all major formats: 23andMe, AncestryDNA, MyHeritage, whole exome VCF files, or standardized FHIR JSON pedigree records.
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-zinc-200 text-xs font-mono text-zinc-500">
                ✓ Auto-format detection & GRCh38 alignment
              </div>
            </div>

            {/* Step 2 */}
            <div className="bg-zinc-50 rounded-2xl p-8 border border-zinc-200 shadow-sm hover:border-black transition-all flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-xl bg-black text-white flex items-center justify-center mb-6 font-mono font-bold text-lg">
                  02
                </div>
                <h3 className="text-xl font-heading font-bold text-black mb-3">
                  Isolated Neural Adaptation
                </h3>
                <p className="text-sm text-zinc-600 leading-relaxed">
                  A private, family-specific LoRA adapter is loaded onto our frozen foundation model in &lt;32ms. Your genetic data is mathematically segregated.
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-zinc-200 text-xs font-mono text-zinc-500">
                ✓ Zero cross-family parameter contamination
              </div>
            </div>

            {/* Step 3 */}
            <div className="bg-zinc-50 rounded-2xl p-8 border border-zinc-200 shadow-sm hover:border-black transition-all flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-xl bg-black text-white flex items-center justify-center mb-6 font-mono font-bold text-lg">
                  03
                </div>
                <h3 className="text-xl font-heading font-bold text-black mb-3">
                  Multigenerational Insights
                </h3>
                <p className="text-sm text-zinc-600 leading-relaxed">
                  Generate interactive 3-generation pedigrees, calculate recurrence odds with Punnett squares, and export 10-tier ACMG notes and patient leaflets.
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-zinc-200 text-xs font-mono text-zinc-500">
                ✓ Epistemic tags: [OBSERVED] vs [INFERRED]
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Filterable Genetic Traits & Multigenerational Reports Catalog */}
      <TraitsExplorer />

      {/* Solutions by Role (White & Black) */}
      <section id="roles" className="py-24 px-4 sm:px-6 lg:px-8 bg-zinc-50 border-b border-zinc-200">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <span className="text-xs font-mono font-bold text-zinc-500 uppercase tracking-wider block mb-2">
              DESIGNED FOR YOUR WORKFLOW
            </span>
            <h2 className="text-3xl sm:text-4xl font-heading font-extrabold text-black tracking-tight">
              Tailored Intelligence for Every Genomic Role
            </h2>
            <p className="text-base text-zinc-600 mt-3 leading-relaxed">
              Whether you are discovering novel disease loci, learning classical transmission patterns, or counseling families in clinical practice.
            </p>
          </div>

          {/* Role Tabs */}
          <div className="flex items-center justify-center gap-3 mb-10">
            {[
              { id: 'doctor', label: 'Doctors & Families', icon: Activity },
              { id: 'researcher', label: 'Researchers & Scientists', icon: Dna },
              { id: 'student', label: 'Students & Learners', icon: Brain },
            ].map((role) => {
              const Icon = role.icon;
              const isActive = selectedRole === role.id;
              return (
                <button
                  key={role.id}
                  onClick={() => setSelectedRole(role.id as any)}
                  className={`flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-semibold transition-all ${
                    isActive
                      ? 'bg-black text-white shadow-md'
                      : 'bg-white hover:bg-zinc-200 text-zinc-700 border border-zinc-200'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-zinc-500'}`} />
                  <span>{role.label}</span>
                </button>
              );
            })}
          </div>

          {/* Role Showcase Content */}
          <div className="bg-white rounded-3xl p-8 sm:p-12 border border-zinc-200 shadow-sm">
            {selectedRole === 'doctor' && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                <div className="space-y-4">
                  <span className="px-3 py-1 rounded-full bg-zinc-100 text-black text-xs font-mono font-bold border border-zinc-300">
                    CLINICAL &amp; PATIENT COUNSELING
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-heading font-bold text-black">
                    ACMG 10-Tier Notes &amp; Empathetic Patient Family Leaflets
                  </h3>
                  <p className="text-sm text-zinc-600 leading-relaxed">
                    Instantly transform complex multigenerational sequencing data into structured 10-tier ACMG/AMP clinical classifications, exportable FHIR R4 JSON payloads, and plain-language summaries for family counseling.
                  </p>
                  <ul className="space-y-2 text-xs font-mono text-zinc-700 pt-2">
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-evidence-green flex-shrink-0" />
                      <span>FHIR R4 DiagnosticReport &amp; GenomicStudy native resources</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-evidence-green flex-shrink-0" />
                      <span>Empathetic, jargon-free family translation leaflets</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-evidence-green flex-shrink-0" />
                      <span>ACMG Pathogenicity criteria scoring (PVS1, PS4, PM2)</span>
                    </li>
                  </ul>
                </div>

                <div className="bg-zinc-50 p-6 rounded-2xl border border-zinc-200 space-y-3 font-mono text-xs">
                  <div className="flex items-center justify-between border-b border-zinc-200 pb-2 text-zinc-500">
                    <span>Clinical Brief: BRCA1 Hereditary Cancer</span>
                    <span className="text-evidence-green font-bold">Tier I - Strong Evidence</span>
                  </div>
                  <div className="p-3 bg-white rounded-xl border border-zinc-200 text-zinc-700 text-[11px] leading-relaxed">
                    "Heterozygous deleterious frameshift in Exon 2 (c.68_69delAG). Autosomal dominant vertical segregation confirmed across 3 generations. Annual breast MRI screening indicated starting age 25."
                  </div>
                  <button
                    onClick={onLaunchStudio}
                    className="w-full py-2.5 bg-black hover:bg-zinc-800 text-white font-bold rounded-xl text-xs transition-colors"
                  >
                    Open Doctor Workspace in Studio →
                  </button>
                </div>
              </div>
            )}

            {selectedRole === 'researcher' && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                <div className="space-y-4">
                  <span className="px-3 py-1 rounded-full bg-zinc-100 text-black text-xs font-mono font-bold border border-zinc-300">
                    GENOMIC DISCOVERY &amp; LINKAGE
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-heading font-bold text-black">
                    LOD Score Sweeps &amp; Cohort Variant Aggregation
                  </h3>
                  <p className="text-sm text-zinc-600 leading-relaxed">
                    Calculate parametric and non-parametric LOD scores across complex extended pedigrees. Identify candidate disease loci and export standardized research CSV matrices.
                  </p>
                  <ul className="space-y-2 text-xs font-mono text-zinc-700 pt-2">
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-evidence-cyan flex-shrink-0" />
                      <span>Multipoint LOD score calculation across multi-generational cohorts</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-evidence-cyan flex-shrink-0" />
                      <span>Haplotype phasing and crossover identification</span>
                    </li>
                  </ul>
                </div>

                <div className="bg-zinc-50 p-6 rounded-2xl border border-zinc-200 space-y-3 font-mono text-xs">
                  <div className="flex items-center justify-between border-b border-zinc-200 pb-2 text-zinc-500">
                    <span>LOD Score Matrix • Chromosome 17q21</span>
                    <span className="text-evidence-cyan font-bold">Z = 3.84 (Significant)</span>
                  </div>
                  <div className="p-3 bg-white rounded-xl border border-zinc-200 text-zinc-700 text-[11px] leading-relaxed">
                    Recombination fraction θ = 0.05. Maximal LOD score 3.84 provides conclusive genetic linkage in multigenerational pedigree cohort.
                  </div>
                  <button
                    onClick={onLaunchStudio}
                    className="w-full py-2.5 bg-black hover:bg-zinc-800 text-white font-bold rounded-xl text-xs transition-colors"
                  >
                    Open Researcher Workspace in Studio →
                  </button>
                </div>
              </div>
            )}

            {selectedRole === 'student' && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                <div className="space-y-4">
                  <span className="px-3 py-1 rounded-full bg-zinc-100 text-black text-xs font-mono font-bold border border-zinc-300">
                    EDUCATION &amp; LEARNING
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-heading font-bold text-black">
                    Interactive "What-If?" Sandbox &amp; Mendelian Puzzles
                  </h3>
                  <p className="text-sm text-zinc-600 leading-relaxed">
                    Master classical and non-Mendelian inheritance patterns with step-by-step transmission puzzles, dynamic Punnett squares, and variable penetrance dials.
                  </p>
                  <ul className="space-y-2 text-xs font-mono text-zinc-700 pt-2">
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-zinc-900 flex-shrink-0" />
                      <span>Instant Punnett square probability recalculations</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-zinc-900 flex-shrink-0" />
                      <span>Textbook genetics verification &amp; synthetic test suites</span>
                    </li>
                  </ul>
                </div>

                <div className="bg-zinc-50 p-6 rounded-2xl border border-zinc-200 space-y-3 font-mono text-xs">
                  <div className="flex items-center justify-between border-b border-zinc-200 pb-2 text-zinc-500">
                    <span>Mendelian Recurrence Challenge</span>
                    <span className="text-zinc-900 font-bold">Autosomal Recessive</span>
                  </div>
                  <div className="p-3 bg-white rounded-xl border border-zinc-200 text-zinc-700 text-[11px] leading-relaxed">
                    Parental genotypes: Aa × Aa. Offspring probability: 25% AA (Unaffected), 50% Aa (Carrier), 25% aa (Affected).
                  </div>
                  <button
                    onClick={onLaunchStudio}
                    className="w-full py-2.5 bg-black hover:bg-zinc-800 text-white font-bold rounded-xl text-xs transition-colors"
                  >
                    Open Student Workspace in Studio →
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Scientific Precision Comparison (White & Black) */}
      <section id="science" className="py-24 px-4 sm:px-6 lg:px-8 bg-white border-b border-zinc-200">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-mono font-bold text-zinc-500 uppercase tracking-wider block mb-2">
              BENCHMARKED PRECISION
            </span>
            <h2 className="text-3xl sm:text-4xl font-heading font-extrabold text-black tracking-tight">
              Why Generic AI Fails at Multigenerational Genetics
            </h2>
            <p className="text-base text-zinc-600 mt-3 leading-relaxed">
              Standard LLMs suffer from severe hallucinations and privacy leaks when reasoning over family pedigrees. GenInherit solves this with isolated parameter adaptation.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* Standard LLMs */}
            <div className="bg-zinc-50 p-8 rounded-2xl border border-zinc-300 shadow-sm space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-zinc-700 uppercase">Generic Foundation LLMs</span>
                <span className="text-xs font-mono text-zinc-600 bg-zinc-200 px-2 py-0.5 rounded font-bold">High Risk</span>
              </div>
              <ul className="space-y-3 text-xs text-zinc-600 leading-relaxed">
                <li className="flex items-start gap-2">
                  <span className="text-zinc-500 font-bold">✕</span>
                  <span><strong>38.4% Hallucination Rate:</strong> Fabricates fictitious non-Mendelian carrier alleles.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-zinc-500 font-bold">✕</span>
                  <span><strong>Data Leakage Risk:</strong> Full fine-tuning risks memorizing private family genomes.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-zinc-500 font-bold">✕</span>
                  <span><strong>No Epistemic Clarity:</strong> Conflates measured lab variants with unproven guesses.</span>
                </li>
              </ul>
            </div>

            {/* GenInherit-LLM */}
            <div className="bg-black p-8 rounded-2xl border border-zinc-800 text-white shadow-xl space-y-4 relative overflow-hidden">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-white uppercase">GenInherit-LLM</span>
                <span className="text-xs font-mono text-evidence-green bg-evidence-greenLight px-2 py-0.5 rounded border border-evidence-greenBorder font-bold">
                  94.8% Gold Standard
                </span>
              </div>
              <ul className="space-y-3 text-xs text-zinc-300 leading-relaxed">
                <li className="flex items-start gap-2">
                  <span className="text-evidence-green font-bold">✓</span>
                  <span><strong>1.5% Hallucination Rate:</strong> Strictly grounded by PSTS-v1 structural pedigree encoding.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-evidence-green font-bold">✓</span>
                  <span><strong>0.000% Parameter Bleed:</strong> Ephemeral, isolated family LoRA adapters purged on exit.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-evidence-green font-bold">✓</span>
                  <span><strong>Strict Epistemic Tags:</strong> Explicitly flags [OBSERVED], [INFERRED], &amp; [STRICT_UNKNOWN].</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Privacy & Security 4-Pillar Grid */}
      <section id="security" className="py-24 px-4 sm:px-6 lg:px-8 bg-zinc-50 border-b border-zinc-200">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-mono font-bold text-zinc-500 uppercase tracking-wider block mb-2">
              YOUR GENOMIC PRIVACY FIRST
            </span>
            <h2 className="text-3xl sm:text-4xl font-heading font-extrabold text-black tracking-tight">
              Architected for Absolute Bioethical Security
            </h2>
            <p className="text-base text-zinc-600 mt-3 leading-relaxed">
              Family genomic records are the most permanent identifying asset in existence. Our architecture prevents persistent storage.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-6 rounded-2xl bg-white border border-zinc-200 space-y-3 shadow-sm hover:border-black transition-all">
              <Lock className="w-6 h-6 text-black" />
              <h4 className="font-heading font-bold text-base text-black">Isolated LoRA Enclaves</h4>
              <p className="text-xs text-zinc-600 leading-relaxed">
                Micro-adapters are trained and evaluated in isolated memory blocks, preventing cross-tenant leakage.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-zinc-200 space-y-3 shadow-sm hover:border-black transition-all">
              <ShieldCheck className="w-6 h-6 text-evidence-green" />
              <h4 className="font-heading font-bold text-base text-black">Zero-Knowledge Storage</h4>
              <p className="text-xs text-zinc-600 leading-relaxed">
                All raw genomic arrays are encrypted with AES-256-GCM. Decryption keys remain with the clinical user.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-zinc-200 space-y-3 shadow-sm hover:border-black transition-all">
              <Database className="w-6 h-6 text-evidence-cyan" />
              <h4 className="font-heading font-bold text-base text-black">WORM Audit Integrity</h4>
              <p className="text-xs text-zinc-600 leading-relaxed">
                Immutable, write-once audit logs record every inference query for complete regulatory compliance.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-zinc-200 space-y-3 shadow-sm hover:border-black transition-all">
              <Award className="w-6 h-6 text-zinc-800" />
              <h4 className="font-heading font-bold text-base text-black">Right to be Forgotten</h4>
              <p className="text-xs text-zinc-600 leading-relaxed">
                Instant one-click deletion permanently purges family LoRA weights in full accordance with GDPR and HIPAA.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <FAQSection />

      {/* Full-Width Conversion CTA Banner (Pure Black) */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-black text-white relative overflow-hidden">
        <div className="max-w-5xl mx-auto text-center relative z-10 space-y-8">
          <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-zinc-900 border border-zinc-700 text-white text-xs font-mono font-bold">
            <span className="w-2 h-2 rounded-full bg-evidence-green" />
            READY TO EXPLORE YOUR FAMILY GENOME?
          </span>

          <h2 className="text-3xl sm:text-5xl font-heading font-extrabold tracking-tight">
            Start Reasoning Over Your Family’s <br />
            <span className="underline decoration-zinc-500 underline-offset-8">Multigenerational Lineage</span> Today.
          </h2>

          <p className="text-base sm:text-lg text-zinc-400 max-w-2xl mx-auto leading-relaxed">
            Test the live 3-generation pedigree canvas, load sample BRCA1 or Lynch syndrome VCF files, or run custom Mendelian recurrence simulations in our dedicated studio.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <button
              onClick={onLaunchStudio}
              className="flex items-center gap-2 bg-white text-black font-bold px-8 py-4 rounded-xl text-base shadow-sm hover:bg-zinc-200 active:scale-95 transition-all"
            >
              <span>Launch Interactive Studio</span>
              <ArrowRight className="w-5 h-5" />
            </button>

            <a
              href="#traits"
              className="flex items-center gap-2 bg-zinc-900 hover:bg-zinc-800 border border-zinc-700 text-white font-semibold px-6 py-4 rounded-xl text-base transition-all"
            >
              <span>View Inherited Traits</span>
            </a>
          </div>
        </div>
      </section>

      {/* Clean Monochromatic Footer */}
      <footer className="bg-white text-zinc-600 py-16 px-4 sm:px-6 lg:px-8 border-t border-zinc-200 text-xs font-mono">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          {/* Col 1 */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-black font-heading font-bold text-base">
              <Dna className="w-5 h-5 text-black" />
              <span>GenInherit-LLM</span>
            </div>
            <p className="text-zinc-500 leading-relaxed text-[11px]">
              The next-generation family-specific genomic inheritance reasoning platform. Combining frozen foundation intelligence with isolated LoRA adapters.
            </p>
          </div>

          {/* Col 2 */}
          <div className="space-y-2">
            <h5 className="text-black font-bold uppercase tracking-wider text-[11px] mb-3">Clinical Platforms</h5>
            <a href="#how-it-works" className="block hover:text-black transition-colors">How It Works</a>
            <a href="#traits" className="block hover:text-black transition-colors">Inherited Traits Catalog</a>
            <a href="#roles" className="block hover:text-black transition-colors">Role Solutions</a>
            <button onClick={onLaunchStudio} className="block text-black font-bold hover:underline text-left">Launch Studio</button>
          </div>

          {/* Col 3 */}
          <div className="space-y-2">
            <h5 className="text-black font-bold uppercase tracking-wider text-[11px] mb-3">Standards &amp; Compliance</h5>
            <span className="block text-zinc-500">HL7 FHIR R4 Standard</span>
            <span className="block text-zinc-500">ACMG/AMP Tier I-IV</span>
            <span className="block text-zinc-500">HIPAA &amp; GDPR Enforced</span>
            <span className="block text-zinc-500">NVIDIA DGX B200 Validated</span>
          </div>

          {/* Col 4 */}
          <div className="space-y-2">
            <h5 className="text-black font-bold uppercase tracking-wider text-[11px] mb-3">Bioethical Commitment</h5>
            <p className="text-zinc-500 text-[11px] leading-relaxed">
              GenInherit-LLM is engineered strictly for investigational, research, educational, and clinical decision support. All findings require genetic counseling verification.
            </p>
          </div>
        </div>

        <div className="max-w-7xl mx-auto pt-8 border-t border-zinc-200 flex flex-col sm:flex-row items-center justify-between gap-4 text-zinc-500 text-[11px]">
          <span>© 2026 GenInherit-LLM Research Platform. All rights reserved.</span>
          <span>Monochrome Architecture • High-Contrast Scientific Edition</span>
        </div>
      </footer>
    </div>
  );
};
