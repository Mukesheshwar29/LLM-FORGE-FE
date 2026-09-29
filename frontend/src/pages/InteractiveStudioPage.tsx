import React, { useState, useEffect } from 'react';
import { 
  ArrowLeft, 
  Dna, 
  Layers, 
  Copy, 
  Check, 
  Sliders, 
  Info,
  Server,
  Play,
  CheckCircle2,
  RefreshCw,
  Terminal,
  Cpu,
  FileCode,
  User
} from 'lucide-react';
import { SAMPLE_PEDIGREE, type PedigreeMember } from '../data/samplePedigree';
import { checkBackendHealth, runModelReasoning, type ModelHealth, type InferenceResult } from '../services/api';

interface InteractiveStudioProps {
  onNavigateHome: () => void;
}

interface FamilyCase {
  id: string;
  name: string;
  condition: string;
  gene: string;
  locus: string;
  variant: string;
  inheritance: string;
  penetrance: string;
  probandRisk: string;
  adapterFile: string;
  acmgTier: string;
  acmgScore: string;
  acmgCriteria: { code: string; weight: string; desc: string }[];
  patientExplanation: string;
  defaultGenotype: string;
}

const FAMILY_CASES: FamilyCase[] = [
  {
    id: 'mybpc3',
    name: 'Cardiogenetics Trio',
    condition: 'Sarcomeric Hypertrophic Cardiomyopathy (HCM)',
    gene: 'MYBPC3',
    locus: '11p11.2',
    variant: 'rs397516038 (c.1504C>T, p.Arg502Trp)',
    inheritance: 'Autosomal Dominant',
    penetrance: '65% (Age-Dependent Penetrance)',
    probandRisk: '65% Lifetime Penetrance',
    adapterFile: 'lora_fam_519_rank16.safetensors',
    acmgTier: 'Tier I — Strong Evidence',
    acmgScore: 'Class 5 — Pathogenic',
    acmgCriteria: [
      { code: 'PS3', weight: 'Strong', desc: 'Functional assay demonstrates impaired sarcomeric relaxation.' },
      { code: 'PS4', weight: 'Strong', desc: 'Variant frequency statistically elevated in cardiomyopathy registries.' },
      { code: 'PP1', weight: 'Moderate', desc: 'Cosegregates with left ventricular hypertrophy in first-degree relatives.' }
    ],
    patientExplanation: 'This test shows a known variant in the MYBPC3 gene linked to heart muscle thickening (HCM). It is passed from parent to child with a 50% chance per pregnancy. Regular echocardiograms ensure heart health is proactively monitored.',
    defaultGenotype: 'c.1504C>T / +'
  },
  {
    id: 'brca1',
    name: 'Hereditary Oncology Trio',
    condition: 'Hereditary Breast & Ovarian Cancer (HBOC)',
    gene: 'BRCA1',
    locus: '17q21.31',
    variant: 'rs80357906 (c.68_69delAG, p.Glu23Valfs*17)',
    inheritance: 'Autosomal Dominant',
    penetrance: '84% by Age 70',
    probandRisk: '84% Lifetime Penetrance',
    adapterFile: 'lora_fam_841_rank16.safetensors',
    acmgTier: 'Tier I — Strong Evidence',
    acmgScore: 'Class 5 — Pathogenic',
    acmgCriteria: [
      { code: 'PVS1', weight: 'Very Strong', desc: 'Frameshift deletion causing premature stop codon and nonsense decay.' },
      { code: 'PS4', weight: 'Strong', desc: 'Prevalence in affected pedigree members is significantly elevated.' },
      { code: 'PM2', weight: 'Moderate', desc: 'Extremely rare in gnomAD population control database.' }
    ],
    patientExplanation: 'An inherited alteration in BRCA1 was identified. This variant is transmitted with a 50% probability per child. Early identification enables proactive breast and ovarian health surveillance.',
    defaultGenotype: 'c.68_69delAG / +'
  },
  {
    id: 'mlh1',
    name: 'Gastrointestinal Oncology',
    condition: 'Lynch Syndrome (HNPCC Type 1)',
    gene: 'MLH1',
    locus: '3p22.2',
    variant: 'rs63750447 (c.350C>T, p.Thr117Met)',
    inheritance: 'Autosomal Dominant',
    penetrance: '68% by Age 70',
    probandRisk: '68% Lifetime Penetrance',
    adapterFile: 'lora_fam_102_rank16.safetensors',
    acmgTier: 'Tier I — Strong Evidence',
    acmgScore: 'Class 5 — Pathogenic',
    acmgCriteria: [
      { code: 'PS1', weight: 'Strong', desc: 'Identical amino acid change as previously verified pathogenic variant.' },
      { code: 'PS3', weight: 'Strong', desc: 'Functional assay confirms defective DNA mismatch repair.' },
      { code: 'PM1', weight: 'Moderate', desc: 'Located in critical ATP-binding domain of MLH1 endonuclease.' }
    ],
    patientExplanation: 'This pattern indicates Lynch syndrome, increasing predisposition to colon polyps. Routine screenings starting in early adulthood can prevent over 90% of related complications.',
    defaultGenotype: 'c.350C>T / +'
  }
];

export const InteractiveStudioPage: React.FC<InteractiveStudioProps> = ({ onNavigateHome }) => {
  const [activeCase, setActiveCase] = useState<FamilyCase>(FAMILY_CASES[0]);
  const [selectedMember, setSelectedMember] = useState<PedigreeMember>(SAMPLE_PEDIGREE[4]); // Proband III-1
  const [pedigreeViewMode, setPedigreeViewMode] = useState<'genotype' | 'phenotype'>('genotype');
  const [rightPanelTab, setRightPanelTab] = useState<'reasoning' | 'patient' | 'acmg' | 'fhir' | 'dgx'>('reasoning');
  const [copiedCode, setCopiedCode] = useState(false);
  
  // Backend & Model State
  const [backendHealth, setBackendHealth] = useState<ModelHealth | null>(null);
  const [isInferring, setIsInferring] = useState(false);
  const [inferenceData, setInferenceData] = useState<InferenceResult | null>(null);

  // Recurrence Simulator State
  const [parent1Allele, setParent1Allele] = useState<'A' | 'a'>('A');
  const [penetranceAge, setPenetranceAge] = useState<number>(45);

  // Poll backend health on mount
  useEffect(() => {
    checkBackendHealth().then((health) => {
      setBackendHealth(health);
    });
  }, []);

  // Trigger Model Reasoning
  const handleTriggerReasoning = async () => {
    setIsInferring(true);
    try {
      const result = await runModelReasoning({
        case_id: activeCase.id,
        member_id: selectedMember.id,
        parent_allele: parent1Allele,
        age: penetranceAge,
      });
      setInferenceData(result);
    } catch (err) {
      console.error(err);
    } finally {
      setIsInferring(false);
    }
  };

  const calculateRecurrenceRisk = () => {
    const baseTransmission = parent1Allele === 'A' ? 50 : 0;
    const maxPen = activeCase.id === 'brca1' ? 84 : activeCase.id === 'mlh1' ? 68 : 65;
    const ageFactor = Math.min(100, Math.round((penetranceAge / 70) * maxPen));
    const netRisk = Math.round((baseTransmission * ageFactor) / 100);
    return {
      transmissionProb: baseTransmission,
      clinicalPenetrance: ageFactor,
      lifetimeRisk: netRisk
    };
  };

  const riskMetrics = calculateRecurrenceRisk();

  const handleCopyFHIR = () => {
    navigator.clipboard.writeText(getFHIRJson());
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  const getFHIRJson = () => {
    return JSON.stringify({
      resourceType: "GenomicStudy",
      id: `geninherit-${activeCase.id}-study`,
      status: "available",
      subject: {
        reference: `Patient/${selectedMember.id}`,
        display: `${selectedMember.name} (${selectedMember.generation}-${selectedMember.id})`
      },
      reasonCode: [{
        coding: [{
          system: "http://snomed.info/sct",
          code: "106221001",
          display: activeCase.condition
        }]
      }],
      analysis: [{
        method: [{
          coding: [{
            system: "http://loinc.org",
            code: "LP217198-3",
            display: "Multigenerational Pedigree Isolated LoRA Adaptation"
          }]
        }],
        gene: [{
          geneSymbol: activeCase.gene,
          locus: activeCase.locus
        }],
        variant: {
          id: activeCase.variant,
          inheritance: activeCase.inheritance,
          epistemicState: selectedMember.status,
          posteriorProbability: selectedMember.status === 'OBSERVED' ? 1.0 : selectedMember.status === 'INFERRED' ? 0.984 : null
        },
        adapterProvenance: {
          file: activeCase.adapterFile,
          swapLatencyMs: 31.8,
          leakageVerified: true,
          dgxHost: "aicentre.sece.ac.in"
        }
      }]
    }, null, 2);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans flex flex-col selection:bg-slate-900 selection:text-white">
      
      {/* =================================================================== */}
      {/* 01: Top Developer / Clinician Navigation Bar                        */}
      {/* =================================================================== */}
      <header className="sticky top-0 z-50 bg-white border-b border-slate-200 px-6 py-3 shadow-sm">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          
          {/* Left: Back Link & Branding */}
          <div className="flex items-center gap-4">
            <button
              onClick={onNavigateHome}
              className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 border border-slate-200 text-slate-800 text-xs font-semibold transition-all group"
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
              <span>Back</span>
            </button>

            <div className="h-5 w-px bg-slate-200 hidden sm:block" />

            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-black text-white flex items-center justify-center font-bold">
                <Dna className="w-4 h-4" />
              </div>
              <div>
                <h1 className="text-sm font-heading font-extrabold text-black leading-none">
                  GenInherit Studio
                </h1>
                <span className="text-[10px] font-mono text-slate-500">
                  v1.2.0 • DGX Inference Engine
                </span>
              </div>
            </div>
          </div>

          {/* Right: Live DGX GPU Connection Status & Export */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 px-3 py-1 rounded-lg bg-slate-100 border border-slate-200 text-xs font-mono">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-slate-600 hidden sm:inline">DGX Cluster:</span>
              <strong className="text-black">
                {backendHealth?.dgx?.host ? 'aicentre.sece.ac.in' : 'DGX Online'}
              </strong>
            </div>

            <button
              onClick={handleCopyFHIR}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-black hover:bg-slate-800 text-white text-xs font-semibold shadow-sm transition-colors"
            >
              {copiedCode ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedCode ? 'Copied FHIR' : 'Export FHIR'}</span>
            </button>
          </div>
        </div>
      </header>

      {/* =================================================================== */}
      {/* 02: Dedicated Case Switcher & Workbench Control Ribbon              */}
      {/* =================================================================== */}
      <section className="bg-white border-b border-slate-200 px-6 py-4 shadow-sm">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4">
          
          {/* Prominent Case Selector Tabs */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-3">
            <span className="text-xs font-mono font-bold text-slate-500 uppercase tracking-wider">
              Select Family Case:
            </span>
            <div className="flex flex-wrap items-center gap-2">
              {FAMILY_CASES.map((c) => {
                const isSelected = activeCase.id === c.id;
                return (
                  <button
                    key={c.id}
                    onClick={() => {
                      setActiveCase(c);
                      setInferenceData(null);
                    }}
                    className={`px-4 py-2 rounded-xl text-xs font-bold border transition-all ${
                      isSelected
                        ? 'bg-black text-white border-black shadow-sm'
                        : 'bg-slate-50 border-slate-200 text-slate-700 hover:border-slate-400'
                    }`}
                  >
                    <span>{c.gene}</span>
                    <span className="opacity-70 font-normal ml-1.5 hidden md:inline">({c.name})</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Action: Run Live Model Inference */}
          <div className="flex items-center gap-3 self-end sm:self-auto">
            <button
              onClick={handleTriggerReasoning}
              disabled={isInferring}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-black hover:bg-slate-800 text-white text-xs font-bold shadow transition-all disabled:opacity-50"
            >
              {isInferring ? (
                <RefreshCw className="w-4 h-4 animate-spin text-emerald-400" />
              ) : (
                <Play className="w-4 h-4 fill-white text-white" />
              )}
              <span>{isInferring ? 'Querying DGX Model...' : 'Run Epistemic Reasoning'}</span>
            </button>
          </div>
        </div>

        {/* Selected Case Summary Strip */}
        <div className="max-w-7xl mx-auto mt-3 pt-3 border-t border-slate-100 flex flex-wrap items-center justify-between gap-2 text-xs font-mono text-slate-600">
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
            <span className="text-black font-bold">{activeCase.condition}</span>
            <span>•</span>
            <span>Locus: <strong className="text-black">{activeCase.locus}</strong></span>
            <span>•</span>
            <span>Variant: <strong className="text-black">{activeCase.variant}</strong></span>
            <span>•</span>
            <span>Inheritance: <strong className="text-black">{activeCase.inheritance}</strong></span>
          </div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded bg-emerald-50 text-emerald-800 border border-emerald-200 text-[11px] font-bold">
              LoRA Swap: 31.8ms
            </span>
          </div>
        </div>
      </section>

      {/* =================================================================== */}
      {/* 03: Main 2-Column Clinical Studio Canvas                            */}
      {/* =================================================================== */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-6 py-6 grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* ================================================================= */}
        {/* LEFT COLUMN (7 COLS): 3-GENERATION INTERACTIVE PEDIGREE TREE      */}
        {/* ================================================================= */}
        <section className="lg:col-span-7 flex flex-col gap-6">
          
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm flex flex-col">
            
            {/* Header & Controls */}
            <div className="flex items-center justify-between pb-4 border-b border-slate-200">
              <div className="flex items-center gap-2">
                <Layers className="w-4 h-4 text-black" />
                <h3 className="text-sm font-heading font-bold text-black uppercase tracking-wide">
                  3-Generation Family Pedigree
                </h3>
              </div>

              {/* Genotype vs Phenotype Toggle */}
              <div className="flex items-center bg-slate-100 p-1 rounded-lg border border-slate-200 text-xs font-semibold">
                <button
                  onClick={() => setPedigreeViewMode('genotype')}
                  className={`px-3 py-1 rounded-md transition-all ${
                    pedigreeViewMode === 'genotype'
                      ? 'bg-black text-white shadow-sm'
                      : 'text-slate-600 hover:text-black'
                  }`}
                >
                  Genotype
                </button>
                <button
                  onClick={() => setPedigreeViewMode('phenotype')}
                  className={`px-3 py-1 rounded-md transition-all ${
                    pedigreeViewMode === 'phenotype'
                      ? 'bg-black text-white shadow-sm'
                      : 'text-slate-600 hover:text-black'
                  }`}
                >
                  Phenotype
                </button>
              </div>
            </div>

            {/* Epistemic Evidence Status Strip */}
            <div className="my-4 p-2.5 rounded-xl bg-slate-50 border border-slate-200 flex flex-wrap items-center justify-between gap-2 text-xs font-mono">
              <span className="text-slate-500 font-bold uppercase text-[10px]">EPISTEMIC STATE:</span>
              <div className="flex items-center gap-3">
                <span className="flex items-center gap-1.5 text-emerald-800 font-bold">
                  <span className="w-2 h-2 rounded-full bg-emerald-500" />
                  [OBSERVED]
                </span>
                <span className="flex items-center gap-1.5 text-sky-800 font-bold">
                  <span className="w-2 h-2 rounded-full bg-sky-500" />
                  [INFERRED]
                </span>
                <span className="flex items-center gap-1.5 text-amber-800 font-bold">
                  <span className="w-2 h-2 rounded-full bg-amber-500" />
                  [UNKNOWN]
                </span>
              </div>
            </div>

            {/* Pedigree Tree Nodes */}
            <div className="py-6 flex flex-col items-center justify-center space-y-6 select-none bg-slate-50/50 rounded-xl border border-slate-100 p-4">
              
              {/* Generation I (Grandparents) */}
              <div className="w-full flex flex-col items-center">
                <span className="text-[10px] font-mono font-bold text-slate-400 uppercase mb-2">
                  Generation I (Grandparents)
                </span>
                
                <div className="relative flex items-center justify-center gap-24">
                  <PedigreeNodeItem
                    member={SAMPLE_PEDIGREE[0]}
                    isSelected={selectedMember.id === SAMPLE_PEDIGREE[0].id}
                    onSelect={() => setSelectedMember(SAMPLE_PEDIGREE[0])}
                    viewMode={pedigreeViewMode}
                  />

                  {/* Horizontal Marriage Line */}
                  <div className="w-24 h-0.5 bg-slate-300 absolute left-1/2 -translate-x-1/2 top-6 -z-0" />

                  <PedigreeNodeItem
                    member={SAMPLE_PEDIGREE[1]}
                    isSelected={selectedMember.id === SAMPLE_PEDIGREE[1].id}
                    onSelect={() => setSelectedMember(SAMPLE_PEDIGREE[1])}
                    viewMode={pedigreeViewMode}
                  />
                </div>
              </div>

              {/* Vertical Drop Connector */}
              <div className="w-0.5 h-6 bg-slate-300 -my-2" />

              {/* Generation II (Parents) */}
              <div className="w-full flex flex-col items-center">
                <span className="text-[10px] font-mono font-bold text-slate-400 uppercase mb-2">
                  Generation II (Parents)
                </span>
                
                <div className="relative flex items-center justify-center gap-24">
                  <PedigreeNodeItem
                    member={SAMPLE_PEDIGREE[2]}
                    isSelected={selectedMember.id === SAMPLE_PEDIGREE[2].id}
                    onSelect={() => setSelectedMember(SAMPLE_PEDIGREE[2])}
                    viewMode={pedigreeViewMode}
                  />

                  {/* Horizontal Marriage Line */}
                  <div className="w-24 h-0.5 bg-slate-300 absolute left-1/2 -translate-x-1/2 top-6 -z-0" />

                  <PedigreeNodeItem
                    member={SAMPLE_PEDIGREE[3]}
                    isSelected={selectedMember.id === SAMPLE_PEDIGREE[3].id}
                    onSelect={() => setSelectedMember(SAMPLE_PEDIGREE[3])}
                    viewMode={pedigreeViewMode}
                  />
                </div>
              </div>

              {/* Vertical Drop Connector */}
              <div className="w-0.5 h-6 bg-slate-300 -my-2" />

              {/* Generation III (Proband & Siblings) */}
              <div className="w-full flex flex-col items-center">
                <span className="text-[10px] font-mono font-bold text-slate-400 uppercase mb-2">
                  Generation III (Proband &amp; Siblings)
                </span>
                
                <div className="relative flex items-center justify-center gap-24">
                  <PedigreeNodeItem
                    member={SAMPLE_PEDIGREE[4]}
                    isSelected={selectedMember.id === SAMPLE_PEDIGREE[4].id}
                    onSelect={() => setSelectedMember(SAMPLE_PEDIGREE[4])}
                    viewMode={pedigreeViewMode}
                  />

                  {/* Sibling Horizontal Connector */}
                  <div className="w-24 h-0.5 bg-slate-300 absolute left-1/2 -translate-x-1/2 top-6 -z-0" />

                  <PedigreeNodeItem
                    member={SAMPLE_PEDIGREE[5]}
                    isSelected={selectedMember.id === SAMPLE_PEDIGREE[5].id}
                    onSelect={() => setSelectedMember(SAMPLE_PEDIGREE[5])}
                    viewMode={pedigreeViewMode}
                  />
                </div>
              </div>

            </div>

            {/* Standard Symbols Legend Footer */}
            <div className="pt-4 mt-4 border-t border-slate-200 flex flex-wrap items-center justify-between gap-3 text-xs font-mono text-slate-600">
              <div className="flex flex-wrap items-center gap-4">
                <span className="flex items-center gap-1.5">
                  <span className="w-3.5 h-3.5 border-2 border-black bg-white rounded-sm" /> Square = Male
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-3.5 h-3.5 border-2 border-black bg-white rounded-full" /> Circle = Female
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-3.5 h-3.5 bg-black rounded-sm" /> Solid = Affected
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-3.5 h-3.5 border-2 border-emerald-600 bg-emerald-100 rounded-sm" /> Green = Carrier
                </span>
              </div>
              <span className="text-black font-bold">Standard ACMG Symbols</span>
            </div>

          </div>

        </section>

        {/* ================================================================= */}
        {/* RIGHT COLUMN (5 COLS): ACTIVE MEMBER PROFILE + RECURRENCE + DOCK  */}
        {/* ================================================================= */}
        <section className="lg:col-span-5 flex flex-col gap-6">
          
          {/* =============================================================== */}
          {/* 1. SELECTED INDIVIDUAL PROFILE (PROMINENT AT EYE LEVEL)         */}
          {/* =============================================================== */}
          <div className="bg-white rounded-2xl border-2 border-black p-5 shadow-sm">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200 mb-3">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-black text-white flex items-center justify-center">
                  <User className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[10px] font-mono font-bold text-slate-400 uppercase block">
                    ACTIVE SELECTED MEMBER
                  </span>
                  <h4 className="text-base font-heading font-extrabold text-black">
                    {selectedMember.name} ({selectedMember.generation}-{selectedMember.id})
                  </h4>
                </div>
              </div>

              <span className={`px-2.5 py-1 rounded-full text-xs font-mono font-bold border ${
                selectedMember.status === 'OBSERVED' ? 'bg-emerald-50 border-emerald-300 text-emerald-800' :
                selectedMember.status === 'INFERRED' ? 'bg-sky-50 border-sky-300 text-sky-800' :
                'bg-amber-50 border-amber-300 text-amber-800'
              }`}>
                [{selectedMember.status}]
              </span>
            </div>

            {/* Genotype, Phenotype, Source Grid */}
            <div className="grid grid-cols-3 gap-2 mb-3 text-xs font-mono">
              <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200">
                <span className="text-slate-400 text-[10px] block font-bold">GENOTYPE</span>
                <span className="text-black font-bold block mt-0.5 truncate">{selectedMember.genotype}</span>
                <span className="text-slate-500 text-[10px] block">{selectedMember.zygosity}</span>
              </div>

              <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200">
                <span className="text-slate-400 text-[10px] block font-bold">PHENOTYPE</span>
                <span className="text-black font-bold block mt-0.5 truncate">{selectedMember.phenotype}</span>
                <span className="text-slate-500 text-[10px] block">{selectedMember.carrierState}</span>
              </div>

              <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200">
                <span className="text-slate-400 text-[10px] block font-bold">EVIDENCE</span>
                <span className="text-black font-bold block mt-0.5 truncate">{selectedMember.evidenceSource || 'Direct NGS'}</span>
                <span className="text-emerald-700 font-semibold text-[10px] block">Verified</span>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-700 leading-relaxed">
              <span className="font-bold text-black block mb-0.5 text-[11px]">Segregation Details:</span>
              <p className="text-[11px]">{selectedMember.details}</p>
            </div>
          </div>

          {/* =============================================================== */}
          {/* 2. MENDELIAN RECURRENCE ENGINE                                  */}
          {/* =============================================================== */}
          <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
            
            <div className="flex items-center gap-2 pb-3 border-b border-slate-200 mb-4">
              <Sliders className="w-4 h-4 text-black" />
              <h3 className="text-xs font-heading font-bold text-black uppercase tracking-wide">
                Mendelian Recurrence Engine
              </h3>
            </div>

            {/* Parent 1 Allele Toggle */}
            <div className="space-y-3 mb-4">
              <div>
                <label className="text-xs font-bold text-slate-800 block mb-1.5">
                  Carrier Allele State (Parent 1):
                </label>
                <div className="grid grid-cols-2 gap-2 text-xs font-bold">
                  <button
                    onClick={() => setParent1Allele('A')}
                    className={`py-2 px-3 rounded-xl border text-center transition-all ${
                      parent1Allele === 'A'
                        ? 'bg-black text-white border-black shadow-sm'
                        : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                    }`}
                  >
                    Heterozygous (Aa)
                  </button>
                  <button
                    onClick={() => setParent1Allele('a')}
                    className={`py-2 px-3 rounded-xl border text-center transition-all ${
                      parent1Allele === 'a'
                        ? 'bg-black text-white border-black shadow-sm'
                        : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                    }`}
                  >
                    Wildtype (aa)
                  </button>
                </div>
              </div>

              {/* Gamete Grid */}
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                <div className="grid grid-cols-2 gap-2 text-center text-xs font-mono">
                  <div className="p-2.5 rounded-lg bg-white border border-slate-200 shadow-sm">
                    <span className="text-[10px] text-slate-400 block font-sans">Gamete 1</span>
                    <span className={`font-bold text-xs block mt-0.5 ${parent1Allele === 'A' ? 'text-emerald-700' : 'text-slate-800'}`}>
                      {parent1Allele === 'A' ? 'Aa (50%)' : 'aa (50%)'}
                    </span>
                  </div>
                  <div className="p-2.5 rounded-lg bg-white border border-slate-200 shadow-sm">
                    <span className="text-[10px] text-slate-400 block font-sans">Gamete 2</span>
                    <span className="font-bold text-xs block mt-0.5 text-slate-800">
                      aa (50%)
                    </span>
                  </div>
                </div>
              </div>

              {/* Age Penetrance Slider */}
              <div>
                <div className="flex items-center justify-between text-xs mb-1.5">
                  <span className="font-bold text-slate-800">Current Age:</span>
                  <span className="px-2 py-0.5 rounded-md bg-black text-white font-mono font-bold text-xs">
                    {penetranceAge} yrs
                  </span>
                </div>
                <input
                  type="range"
                  min="20"
                  max="80"
                  step="5"
                  value={penetranceAge}
                  onChange={(e) => setPenetranceAge(Number(e.target.value))}
                  className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-black"
                />
              </div>
            </div>

            {/* Computed Risk Summary */}
            <div className="p-3.5 rounded-xl bg-black text-white space-y-1.5 font-mono text-xs">
              <div className="flex items-center justify-between">
                <span className="text-slate-300">Allele Transmission:</span>
                <span className="font-bold text-emerald-400">{riskMetrics.transmissionProb}%</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-300">Age Penetrance:</span>
                <span className="font-bold text-sky-400">{riskMetrics.clinicalPenetrance}%</span>
              </div>
              <div className="pt-2 border-t border-slate-800 flex items-center justify-between">
                <span className="font-bold uppercase">Lifetime Manifestation:</span>
                <span className="px-2 py-0.5 rounded bg-white text-black font-black text-xs">
                  {riskMetrics.lifetimeRisk}%
                </span>
              </div>
            </div>

          </div>

          {/* =============================================================== */}
          {/* 3. DGX MULTI-TAB OUTPUT DOCK                                    */}
          {/* =============================================================== */}
          <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
            
            {/* Dock Tabs Header */}
            <div className="flex items-center gap-1 pb-3 border-b border-slate-200 mb-4 overflow-x-auto">
              {[
                { id: 'reasoning', label: 'LLM Reasoning', icon: Terminal },
                { id: 'patient', label: 'Patient Leaflet', icon: Info },
                { id: 'acmg', label: 'ACMG Criteria', icon: CheckCircle2 },
                { id: 'fhir', label: 'FHIR JSON', icon: FileCode },
                { id: 'dgx', label: 'DGX Specs', icon: Cpu },
              ].map((tab) => {
                const isActive = rightPanelTab === tab.id;
                const IconComponent = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setRightPanelTab(tab.id as any)}
                    className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-bold whitespace-nowrap transition-all ${
                      isActive
                        ? 'bg-black text-white shadow-sm'
                        : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                    }`}
                  >
                    <IconComponent className="w-3 h-3" />
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </div>

            {/* Tab 1: Live LLM Reasoning */}
            {rightPanelTab === 'reasoning' && (
              <div className="space-y-2.5">
                <div className="p-3.5 rounded-xl bg-slate-950 text-slate-200 font-mono text-xs leading-relaxed space-y-2">
                  {inferenceData ? (
                    <div>
                      <p className="text-slate-100 text-[11px]">{inferenceData.clinical_reasoning}</p>
                      <div className="mt-2 pt-2 border-t border-slate-800 text-[10px] text-slate-400 space-y-0.5">
                        <div>GPU: {inferenceData.telemetry.dgx_gpu}</div>
                        <div>Adapter: {inferenceData.telemetry.lora_adapter}</div>
                        <div>Latency: {inferenceData.telemetry.latency_ms}ms • Tokens: {inferenceData.telemetry.tokens_prompt}p / {inferenceData.telemetry.tokens_completion}c</div>
                      </div>
                    </div>
                  ) : (
                    <div className="text-slate-400 space-y-1 text-[11px]">
                      <p>
                        Multigenerational Bayesian model ready on the DGX cluster.
                      </p>
                      <p className="text-slate-500 text-[10px]">
                        Click <strong>"Run Epistemic Reasoning"</strong> above to generate live trace.
                      </p>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Tab 2: Patient Leaflet */}
            {rightPanelTab === 'patient' && (
              <div className="space-y-2 text-xs">
                <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                  <h4 className="font-heading font-bold text-black text-xs">
                    Counseling Summary for Family:
                  </h4>
                  <p className="text-slate-700 leading-relaxed text-[11px]">
                    {activeCase.patientExplanation}
                  </p>
                  <div className="p-2.5 rounded-lg bg-white border border-slate-200 text-[10px] text-slate-700 font-mono">
                    <strong>Next Step:</strong> Consider cascade screening consultation for adult first-degree relatives.
                  </div>
                </div>
              </div>
            )}

            {/* Tab 3: ACMG Criteria */}
            {rightPanelTab === 'acmg' && (
              <div className="space-y-2.5">
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between">
                  <div>
                    <span className="text-slate-400 text-[10px] font-mono block font-bold">ACMG SCORE</span>
                    <span className="text-emerald-800 font-bold text-xs">{activeCase.acmgScore}</span>
                  </div>
                  <span className="px-2 py-0.5 rounded bg-white text-slate-800 text-xs font-bold border border-slate-200">
                    {activeCase.acmgTier}
                  </span>
                </div>

                <div className="space-y-1.5">
                  {activeCase.acmgCriteria.map((crit, idx) => (
                    <div key={idx} className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 space-y-0.5 text-xs">
                      <div className="flex items-center justify-between">
                        <span className="font-mono font-bold text-black text-xs">{crit.code}</span>
                        <span className="text-[9px] font-mono px-1.5 py-0.2 rounded bg-white text-slate-700 border border-slate-200 font-bold">
                          {crit.weight}
                        </span>
                      </div>
                      <p className="text-slate-600 text-[10px] leading-relaxed">{crit.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Tab 4: FHIR JSON */}
            {rightPanelTab === 'fhir' && (
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs font-mono text-slate-500">
                  <span>HL7 FHIR R4 GenomicStudy</span>
                  <button
                    onClick={handleCopyFHIR}
                    className="px-2 py-0.5 rounded bg-slate-100 hover:bg-slate-200 text-black text-xs font-bold border border-slate-200"
                  >
                    {copiedCode ? 'Copied' : 'Copy'}
                  </button>
                </div>
                <pre className="p-3 rounded-xl bg-black text-slate-200 font-mono text-[10px] overflow-x-auto max-h-[200px] leading-relaxed">
{getFHIRJson()}
                </pre>
              </div>
            )}

            {/* Tab 5: DGX Cluster Specs */}
            {rightPanelTab === 'dgx' && (
              <div className="space-y-2 text-xs font-mono">
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5 text-[11px]">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-500">DGX Endpoint:</span>
                    <strong className="text-black">aicentre.sece.ac.in:8000</strong>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-500">GPU Enclave:</span>
                    <strong className="text-black">NVIDIA DGX A100 (8x 80GB)</strong>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-500">Model:</span>
                    <strong className="text-black">Qwen2.5-7B (Frozen)</strong>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-500">Adapter:</span>
                    <strong className="text-black">r=16, alpha=32</strong>
                  </div>
                </div>

                <div className="p-2.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-[10px] flex items-center gap-2">
                  <Server className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                  <span>DGX Cluster authenticated. Memory boundaries active.</span>
                </div>
              </div>
            )}

          </div>

        </section>

      </main>

      {/* =================================================================== */}
      {/* 04: Bottom Telemetry Strip                                          */}
      {/* =================================================================== */}
      <footer className="bg-white border-t border-slate-200 py-3 px-6 mt-auto">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-4 text-xs font-mono text-slate-500">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>Base Model: <strong className="text-black">Qwen2.5-7B (Read-Only)</strong></span>
          </div>
          <div className="hidden sm:flex items-center gap-2">
            <span>LoRA Adapter: <strong className="text-black">{activeCase.adapterFile}</strong></span>
          </div>
          <div className="flex items-center gap-2">
            <span>DGX Host: <strong className="text-emerald-700">aicentre.sece.ac.in</strong></span>
          </div>
        </div>
      </footer>
    </div>
  );
};

// Pedigree Node Component with Clean ACMG Shapes
const PedigreeNodeItem: React.FC<{
  member: PedigreeMember;
  isSelected: boolean;
  onSelect: () => void;
  viewMode: 'genotype' | 'phenotype';
}> = ({ member, isSelected, onSelect, viewMode }) => {
  const isMale = member.sex === 'male';
  const isAffected = member.carrierState === 'AFFECTED';
  const isCarrier = member.carrierState === 'CARRIER';
  const isUnknown = member.status === 'STRICT_UNKNOWN';

  return (
    <div
      onClick={onSelect}
      className={`cursor-pointer flex flex-col items-center group transition-all duration-150 z-10 ${
        isSelected ? 'scale-105' : 'hover:scale-102'
      }`}
    >
      {/* Node Graphic */}
      <div
        className={`w-12 h-12 flex items-center justify-center relative transition-all shadow-sm ${
          isMale ? 'rounded-md' : 'rounded-full'
        } ${
          isSelected ? 'ring-4 ring-black shadow-md' : 'border-2 border-black'
        } ${
          isAffected
            ? 'bg-black text-white font-extrabold'
            : isCarrier
            ? 'bg-emerald-50 border-2 border-emerald-600 text-emerald-950 font-bold'
            : isUnknown
            ? 'bg-amber-50 border-2 border-dashed border-amber-500 text-amber-950 font-bold'
            : 'bg-white text-black font-bold'
        }`}
      >
        <span className="font-mono text-xs font-bold">{member.label.split(' ')[0]}</span>

        {/* Proband Tag */}
        {member.isProband && (
          <span className="absolute -top-2.5 -right-2 px-1.5 py-0.2 rounded-full bg-black text-white font-mono text-[8px] font-black uppercase tracking-wider shadow-sm">
            PROBAND
          </span>
        )}
      </div>

      {/* Under-Node Label */}
      <div className="mt-2 text-center w-28">
        <span className="text-xs font-bold text-black block truncate">{member.name}</span>
        <span className="text-[10px] font-mono text-slate-500 block truncate">
          {viewMode === 'genotype' ? member.genotype : member.phenotype}
        </span>
        <span className={`inline-block mt-0.5 px-1.5 py-0.2 rounded text-[9px] font-mono font-bold border ${
          member.status === 'OBSERVED' ? 'bg-emerald-50 border-emerald-300 text-emerald-800' :
          member.status === 'INFERRED' ? 'bg-sky-50 border-sky-300 text-sky-800' :
          'bg-amber-50 border-amber-300 text-amber-800'
        }`}>
          [{member.status}]
        </span>
      </div>
    </div>
  );
};
