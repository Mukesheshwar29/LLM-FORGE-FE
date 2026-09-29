import React, { useState } from 'react';
import { FileCode, FileText, Download, Heart, BarChart, Check, Copy } from 'lucide-react';

export const IntegrationSection: React.FC = () => {
  const [activeFormat, setActiveFormat] = useState<'fhir' | 'report' | 'leaflet' | 'research'>('fhir');
  const [copied, setCopied] = useState(false);

  const fhirJsonExample = `{
  "resourceType": "DiagnosticReport",
  "id": "geninherit-fam042-report",
  "status": "final",
  "category": [
    {
      "coding": [
        {
          "system": "http://terminology.hl7.org/CodeSystem/v2-0074",
          "code": "GE",
          "display": "Genetics"
        }
      ]
    }
  ],
  "code": {
    "coding": [
      {
        "system": "http://loinc.org",
        "code": "51969-4",
        "display": "Genetic analysis summary report"
      }
    ]
  },
  "subject": { "reference": "Patient/PROBAND_III_1" },
  "effectiveDateTime": "2026-09-29T12:00:00Z",
  "conclusion": "Observed distribution confirms 3-generation paternal transmission of MYBPC3 c.1504C>T under an Autosomal Dominant model with incomplete penetrance.",
  "conclusionCode": [
    {
      "coding": [
        {
          "system": "http://snomed.info/sct",
          "code": "416550000",
          "display": "Autosomal dominant inheritance"
        }
      ]
    }
  ]
}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(fhirJsonExample);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="integration" className="py-24 relative bg-midnight border-t border-cyan-electric/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-mono uppercase tracking-widest text-cyan-electric mb-3 block">
            MULTI-MODAL OUTPUT &amp; EHR INTEROPERABILITY
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-bold text-text-primary tracking-tight mb-6">
            From Structured Evidence to Actionable Scientific Outputs.
          </h2>
          <p className="text-base sm:text-lg text-text-secondary leading-relaxed">
            GenInherit-LLM translates neural biological reasoning into five clinical and academic export modalities—from board-ready medical notes to HL7/FHIR R4 hospital records.
          </p>
        </div>

        {/* 4 Format Switcher Buttons */}
        <div className="flex flex-wrap justify-center gap-3 mb-10">
          {[
            { id: 'fhir', label: 'HL7 / FHIR R4 JSON', icon: FileCode },
            { id: 'report', label: '10-Tier Clinical Report (PDF)', icon: FileText },
            { id: 'leaflet', label: 'Patient Family Leaflet', icon: Heart },
            { id: 'research', label: 'Research Analytics & CSV', icon: BarChart },
          ].map((tab) => {
            const Icon = tab.icon;
            const isSelected = activeFormat === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveFormat(tab.id as any)}
                className={`flex items-center gap-2 px-5 py-3 rounded-xl text-xs sm:text-sm font-mono font-bold transition-all ${
                  isSelected
                    ? 'bg-gradient-to-r from-cyan-electric to-lavender-muted text-midnight shadow-glow-cyan'
                    : 'bg-surface-card border border-white/10 text-text-secondary hover:text-text-primary'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Dynamic Display Panel */}
        <div className="glass-panel p-8 rounded-3xl border border-cyan-electric/25 bg-surface-dark/95 shadow-glass-card">
          {/* TAB 1: FHIR R4 JSON */}
          {activeFormat === 'fhir' && (
            <div className="animate-in fade-in duration-300">
              <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-6">
                <div>
                  <h3 className="text-lg font-heading font-bold text-text-primary">
                    HL7 / FHIR R4 Genomics Resource Representation
                  </h3>
                  <p className="text-xs font-mono text-text-secondary">
                    Standardized JSON payload mapped to LOINC <span className="text-cyan-ice">51969-4</span> and SNOMED-CT <span className="text-cyan-ice">416550000</span>
                  </p>
                </div>
                <button
                  onClick={handleCopy}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-surface-card border border-white/10 text-xs font-mono text-cyan-electric hover:bg-surface-card/80 transition-colors"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-evidence-green" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copied ? 'Copied' : 'Copy JSON'}</span>
                </button>
              </div>

              <div className="p-6 rounded-2xl bg-midnight/95 border border-white/10 font-mono text-xs text-cyan-ice overflow-x-auto">
                <pre>{fhirJsonExample}</pre>
              </div>

              <div className="mt-4 text-[11px] font-mono text-text-muted">
                *Illustrative FHIR R4 excerpt for hospital EHR integration (Epic Beaker &amp; Cerner).
              </div>
            </div>
          )}

          {/* TAB 2: 10-TIER CLINICAL REPORT */}
          {activeFormat === 'report' && (
            <div className="animate-in fade-in duration-300 space-y-4">
              <div className="flex items-center justify-between pb-4 border-b border-white/10">
                <div>
                  <h3 className="text-lg font-heading font-bold text-text-primary">
                    10-Tier ACMG Board-Certified Clinical Diagnostic Consultation Letter
                  </h3>
                  <p className="text-xs font-mono text-text-secondary">
                    Auto-generated comprehensive clinical note ready for medical geneticist review and electronic sign-off.
                  </p>
                </div>
                <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-cyan-electric text-midnight font-mono text-xs font-bold shadow-glow-cyan">
                  <Download className="w-3.5 h-3.5" />
                  <span>Download PDF</span>
                </button>
              </div>

              <div className="p-6 rounded-2xl bg-midnight/90 border border-white/10 text-xs font-mono space-y-3">
                <div className="text-cyan-electric font-bold">1. PATIENT IDENTIFIER &amp; REASON FOR REFERRAL</div>
                <p className="text-text-secondary">Proband [III-1] (Age 12, Female). Referred for evaluation of syncopal episode during athletic exertion and family history of cardiomyopathy.</p>

                <div className="text-cyan-electric font-bold pt-2">2. MOLECULAR FINDINGS &amp; ZYGOSITY</div>
                <p className="text-text-secondary">Pathogenic Variant: MYBPC3 (NM_000256.3) c.1504C&gt;T (p.Arg502Trp) in Heterozygous state. gnomAD Allele Frequency: 0.000012.</p>

                <div className="text-cyan-electric font-bold pt-2">3. DEDUCTIVE INHERITANCE REASONING &amp; SEGREGATION</div>
                <p className="text-text-secondary">Paternal Grandfather [I-1] confirmed carrier (Age 68, onset 62). Father [II-1] confirmed asymptomatic carrier at Age 38. Transmission is consistent with Autosomal Dominant inheritance with age-dependent incomplete penetrance.</p>
              </div>
            </div>
          )}

          {/* TAB 3: PATIENT FAMILY LEAFLET */}
          {activeFormat === 'leaflet' && (
            <div className="animate-in fade-in duration-300">
              <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-6">
                <div>
                  <h3 className="text-lg font-heading font-bold text-text-primary">
                    Plain-Language Family Consultation Handout
                  </h3>
                  <p className="text-xs font-mono text-text-secondary">
                    Written at a 6th-to-8th grade reading level to provide reassuring, compassionate, non-fatalistic clarity.
                  </p>
                </div>
                <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-lavender-muted text-midnight font-mono text-xs font-bold shadow-glow-lavender">
                  <Download className="w-3.5 h-3.5" />
                  <span>Print Family Leaflet</span>
                </button>
              </div>

              <div className="p-6 rounded-2xl bg-midnight/90 border border-lavender-muted/30 text-sm space-y-4">
                <h4 className="font-heading font-bold text-base text-text-primary">
                  Understanding Your Family's Heart Health Gene Finding
                </h4>
                <p className="text-text-secondary leading-relaxed">
                  Our medical testing found a genetic change in the <strong className="text-cyan-ice">MYBPC3</strong> gene. This change came from the father's side of the family.
                </p>
                <div className="p-4 rounded-xl bg-surface-card border border-white/10 space-y-2 text-xs">
                  <p className="font-bold text-evidence-green">✓ What this means for your children:</p>
                  <p className="text-text-secondary leading-relaxed">
                    Carrying this genetic marker does <em>not</em> guarantee that a person will become sick. In our records, many relatives who have this gene live completely normal, healthy lives without any heart issues.
                  </p>
                  <p className="font-bold text-cyan-electric pt-2">✓ Next Gentle Steps:</p>
                  <p className="text-text-secondary leading-relaxed">
                    We recommend regular, non-invasive ultrasound checks (echocardiograms) every 2–3 years rather than immediate medication.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: RESEARCH ANALYTICS */}
          {activeFormat === 'research' && (
            <div className="animate-in fade-in duration-300">
              <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-6">
                <div>
                  <h3 className="text-lg font-heading font-bold text-text-primary">
                    Research Cohort Analytics &amp; Parquet / CSV Data Export
                  </h3>
                  <p className="text-xs font-mono text-text-secondary">
                    Statistical distributions, LOD scores, and Monte Carlo penetrance simulations formatted for R and Python Pandas.
                  </p>
                </div>
                <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-cyan-electric text-midnight font-mono text-xs font-bold shadow-glow-cyan">
                  <Download className="w-3.5 h-3.5" />
                  <span>Export Parquet / CSV</span>
                </button>
              </div>

              <div className="p-6 rounded-2xl bg-midnight/90 border border-white/10 text-xs font-mono">
                <div className="grid grid-cols-4 gap-4 pb-3 border-b border-white/10 text-text-muted">
                  <span>COHORT_ID</span>
                  <span>TARGET_GENE</span>
                  <span>CALC_LOD_SCORE</span>
                  <span>PENETRANCE_EST</span>
                </div>
                <div className="grid grid-cols-4 gap-4 py-2 border-b border-white/5 text-text-secondary">
                  <span className="text-cyan-ice">FAM_042_CARDIO</span>
                  <span>MYBPC3</span>
                  <span className="text-evidence-green font-bold">+3.84</span>
                  <span>62.4% (at age 40+)</span>
                </div>
                <div className="grid grid-cols-4 gap-4 py-2 border-b border-white/5 text-text-secondary">
                  <span className="text-cyan-ice">FAM_118_CYSTIC</span>
                  <span>CFTR</span>
                  <span className="text-evidence-green font-bold">+5.12</span>
                  <span>100.0% (Homozygote)</span>
                </div>
                <div className="grid grid-cols-4 gap-4 py-2 text-text-secondary">
                  <span className="text-cyan-ice">FAM_204_HBOC</span>
                  <span>BRCA1</span>
                  <span className="text-evidence-green font-bold">+4.02</span>
                  <span>72.0% (Lifetime)</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
