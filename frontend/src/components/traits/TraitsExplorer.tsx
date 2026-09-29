import React, { useState } from 'react';
import { 
  Dna, 
  Search, 
  Activity, 
  Heart, 
  Brain, 
  ShieldAlert, 
  Pill, 
  ChevronRight, 
  Info, 
  FileText, 
  Layers, 
  X,
  Sparkles
} from 'lucide-react';

interface TraitItem {
  id: string;
  category: 'oncology' | 'cardiology' | 'neurology' | 'mendelian' | 'pharmacogenomics';
  title: string;
  gene: string;
  rsId: string;
  inheritanceMode: 'Autosomal Dominant' | 'Autosomal Recessive' | 'X-Linked Recessive' | 'Codominant';
  epistemicStatus: 'OBSERVED' | 'INFERRED' | 'STRICT_UNKNOWN';
  familyRiskScore: string;
  penetrance: string;
  description: string;
  transmissionOdds: string;
  affectedGenerations: string;
  clinicalTier: 'Tier I - Strong Evidence' | 'Tier II - Potential Significance' | 'Tier III - Research/Unknown';
  clinicalSummary: string;
  patientLeaflet: string;
  acmgClassification: string;
}

const TRAITS_DATA: TraitItem[] = [
  {
    id: 'brca1-hboc',
    category: 'oncology',
    title: 'Hereditary Breast & Ovarian Cancer Syndrome',
    gene: 'BRCA1 (17q21.31)',
    rsId: 'rs80357906 (c.68_69delAG)',
    inheritanceMode: 'Autosomal Dominant',
    epistemicStatus: 'OBSERVED',
    familyRiskScore: 'High (84% Lifetime Penetrance)',
    penetrance: '72% – 85% by Age 70',
    description: 'Deleterious frameshift pathogenic variant causing homologous recombination DNA repair deficiency across 3 tested generations.',
    transmissionOdds: '50% Transmission per child',
    affectedGenerations: 'G1 (Grandmother), G2 (Mother), G3 (Proband)',
    clinicalTier: 'Tier I - Strong Evidence',
    clinicalSummary: 'Pathogenic heterozygous frameshift deletion in Exon 2 of BRCA1. ACMG criteria: PVS1 (null variant), PS4 (prevalence in affected pedigree), PM2 (absent from gnomAD controls). High risk for early-onset epithelial ovarian and triple-negative breast neoplasia.',
    patientLeaflet: 'Your family carries a known variant in the BRCA1 gene. This variant is passed down from parent to child with a 50% chance for each offspring. Having this variant means a higher lifetime chance of breast and ovarian conditions, which allows your healthcare team to recommend proactive screening (like annual breast MRI and risk-reducing options) starting earlier in life.',
    acmgClassification: 'Pathogenic (Class 5) — PVS1 + PS4 + PM2'
  },
  {
    id: 'mlh1-lynch',
    category: 'oncology',
    title: 'Lynch Syndrome (HNPCC Type 1)',
    gene: 'MLH1 (3p22.2)',
    rsId: 'rs63750447 (c.350C>T, p.Thr117Met)',
    inheritanceMode: 'Autosomal Dominant',
    epistemicStatus: 'OBSERVED',
    familyRiskScore: 'High (68% Colorectal Risk)',
    penetrance: '60% – 70% Lifetime Penetrance',
    description: 'Mismatch repair deficiency predisposing to multigenerational early colorectal and endometrial carcinoma with microsatellite instability.',
    transmissionOdds: '50% Transmission per child',
    affectedGenerations: 'G1 (Grandfather), G2 (Uncle, Father), G3 (Cousin)',
    clinicalTier: 'Tier I - Strong Evidence',
    clinicalSummary: 'Pathogenic missense variant altering ATP-binding pocket of MLH1 mismatch repair endonuclease. Pedigree exhibits vertical transmission fulfilling Amsterdam II criteria. High MSI-H likelihood.',
    patientLeaflet: 'This genetic pattern points to Lynch Syndrome, a condition that runs in families and increases the likelihood of colorectal and uterine polyps. Knowing this in advance is empowering: routine colonoscopies starting at age 20-25 can prevent over 90% of colorectal complications by removing polyps before they progress.',
    acmgClassification: 'Pathogenic (Class 5) — PS1 + PS3 + PM1 + PP4'
  },
  {
    id: 'mybpc3-hcm',
    category: 'cardiology',
    title: 'Hypertrophic Cardiomyopathy (Sarcomeric HCM)',
    gene: 'MYBPC3 (11p11.2)',
    rsId: 'rs397516038 (c.1504C>T, p.Arg502Trp)',
    inheritanceMode: 'Autosomal Dominant',
    epistemicStatus: 'OBSERVED',
    familyRiskScore: 'Moderate-High (Variable Expressivity)',
    penetrance: '65% (Age-Dependent, Higher in Males)',
    description: 'Cardiac myosin binding protein C mutation causing asymmetric septal hypertrophy, diastolic dysfunction, and ventricular arrhythmia risk.',
    transmissionOdds: '50% Transmission per child',
    affectedGenerations: 'G1 (Grandfather - Inferred), G2 (Mother), G3 (Brother)',
    clinicalTier: 'Tier I - Strong Evidence',
    clinicalSummary: 'Well-characterized founder mutation in MYBPC3 Sarcomere regulatory domain. Exhibits incomplete and age-dependent penetrance. Echocardiographic evaluation and Holter monitoring indicated for all first-degree relatives.',
    patientLeaflet: 'This heart-related gene variant can cause heart muscle thickening. While some family members experience mild symptoms, others may experience fatigue or palpitations during sports. Annual ultrasound checks (echocardiograms) help track heart function seamlessly.',
    acmgClassification: 'Pathogenic (Class 5) — PS3 + PS4 + PM1 + PP1_Strong'
  },
  {
    id: 'ldlr-fh',
    category: 'cardiology',
    title: 'Familial Hypercholesterolemia (HeFH)',
    gene: 'LDLR (19p13.2)',
    rsId: 'rs121908028 (c.2054A>G, p.Asp685Gly)',
    inheritanceMode: 'Autosomal Dominant',
    epistemicStatus: 'INFERRED',
    familyRiskScore: 'High (Premature Atherosclerosis)',
    penetrance: '90%+ Severe Hypercholesterolemia',
    description: 'Low-density lipoprotein receptor deficiency resulting in severely elevated serum LDL-C (>190 mg/dL) from early childhood.',
    transmissionOdds: '50% Transmission per child',
    affectedGenerations: 'G1 (Paternal Grandfather), G2 (Father - Deceased CAD at 42)',
    clinicalTier: 'Tier I - Strong Evidence',
    clinicalSummary: 'Impaired LDL clearance leading to premature coronary artery disease. Inferred with high posterior probability (0.94) from obligate carrier paternal lineage and biochemical lipid profiles.',
    patientLeaflet: 'Your family history and genetic markers show high LDL ("bad") cholesterol that is inherited biologically rather than caused by diet alone. Early management with lipid-lowering therapies (like statins or PCSK9 inhibitors) drastically reduces lifelong cardiovascular risk.',
    acmgClassification: 'Pathogenic (Class 5) — Inferred Posterior P=0.94'
  },
  {
    id: 'cftr-cf',
    category: 'mendelian',
    title: 'Cystic Fibrosis Transmembrane Regulator (CF)',
    gene: 'CFTR (7q31.2)',
    rsId: 'rs113993960 (c.1521_1523delCTT, p.Phe508del)',
    inheritanceMode: 'Autosomal Recessive',
    epistemicStatus: 'OBSERVED',
    familyRiskScore: 'Carrier Status (25% Recurrence if Partner is Carrier)',
    penetrance: '100% in Homozygous / Compound Heterozygous',
    description: 'Deletion of phenylalanine at position 508 disrupting epithelial chloride and bicarbonate transport in pulmonary and pancreatic tracts.',
    transmissionOdds: '25% Affected if both parents carriers; 50% Asymptomatic Carrier',
    affectedGenerations: 'G2 (Carrier Mother, Carrier Father), G3 (Homozygous Affected Child)',
    clinicalTier: 'Tier I - Strong Evidence',
    clinicalSummary: 'Classic Class II CFTR trafficking defect. Carrier status in proband confirmed. Expanded carrier screening recommended for reproductive partner before pregnancy planning.',
    patientLeaflet: 'You are an asymptomatic carrier of the CFTR variant. Carriers do not experience cystic fibrosis symptoms. If you and your partner both carry a CFTR change, there is a 1 in 4 (25%) chance in each pregnancy for a child to have CF, making reproductive counseling helpful.',
    acmgClassification: 'Pathogenic (Class 5) — Canonical Variant'
  },
  {
    id: 'htt-huntington',
    category: 'neurology',
    title: 'Huntington Chorea (Trinucleotide CAG Expansion)',
    gene: 'HTT (4p16.3)',
    rsId: 'rs362307 (CAG Repeat Expansion)',
    inheritanceMode: 'Autosomal Dominant',
    epistemicStatus: 'STRICT_UNKNOWN',
    familyRiskScore: 'Paternal Transmission Risk (42 Repeats Detected)',
    penetrance: 'Complete Penetrance for >=40 CAG Repeats',
    description: 'Polyglutamine expansion in huntingtin protein with paternal anticipation leading to progressive neurodegenerative chorea and cognitive decline.',
    transmissionOdds: '50% Transmission with Potential Expansion in Spermatogenesis',
    affectedGenerations: 'G1 (Grandfather - Incomplete Records), G2 (Father)',
    clinicalTier: 'Tier I - Strong Evidence',
    clinicalSummary: 'Allele sizing indicates 42 CAG repeats (full penetrance range). Epistemic designation for Proband is STRICT_UNKNOWN pending pre-symptomatic genetic counseling protocol adherence.',
    patientLeaflet: 'A repeat expansion in the HTT gene is present in the paternal lineage. Formal predictive testing is available following specialized pre-test genetic counseling to ensure emotional support and informed decision-making.',
    acmgClassification: 'Pathogenic (Class 5) — Full Penetrance Expansion'
  },
  {
    id: 'cyp2c19-pgx',
    category: 'pharmacogenomics',
    title: 'CYP2C19 Poor Metabolizer (*2 / *3 Loss of Function)',
    gene: 'CYP2C19 (10q23.33)',
    rsId: 'rs4244285 (*2) & rs4986893 (*3)',
    inheritanceMode: 'Codominant',
    epistemicStatus: 'OBSERVED',
    familyRiskScore: 'Critical Drug Interaction (Clopidogrel Resistance)',
    penetrance: 'Pharmacokinetic Impairment (100%)',
    description: 'Cytochrome P450 enzyme loss of function preventing metabolic bioactivation of antiplatelet prodrugs (Plavix) and altered SSRI clearance.',
    transmissionOdds: 'Codominant Allele Segregation',
    affectedGenerations: 'G2 (Mother *1/*2), G3 (Proband *2/*2 Poor Metabolizer)',
    clinicalTier: 'Tier I - Strong Evidence',
    clinicalSummary: 'CPIC Guideline Level A: Significantly reduced active thiol metabolite generation from clopidogrel. Increased ischemic adverse event risk post-PCI. Alternative antiplatelet agents (Ticagrelor or Prasugrel) recommended.',
    patientLeaflet: 'Your body processes certain common medications (like the blood thinner clopidogrel and certain antidepressants) much slower than average. Sharing this report with your prescribing doctor ensures you get the safest, most effective alternative medication without trial-and-error.',
    acmgClassification: 'CPIC Level A Actionable Pharmacogenomic Marker'
  },
  {
    id: 'psen1-ad',
    category: 'neurology',
    title: 'Early-Onset Familial Alzheimer Disease (EOFAD)',
    gene: 'PSEN1 (14q24.2)',
    rsId: 'rs63750082 (c.437C>T, p.Ala146Val)',
    inheritanceMode: 'Autosomal Dominant',
    epistemicStatus: 'INFERRED',
    familyRiskScore: 'High (Onset Age 42-48)',
    penetrance: '100% Penetrance by Age 55',
    description: 'Presenilin 1 catalytic subunit mutation altering gamma-secretase cleavage and drastically elevating neurotoxic amyloid-beta 42:40 ratio.',
    transmissionOdds: '50% Transmission per child',
    affectedGenerations: 'G1 (Grandmother onset 44), G2 (Mother onset 46)',
    clinicalTier: 'Tier I - Strong Evidence',
    clinicalSummary: 'Inferred pathogenic missense alteration in transmembrane domain 2 of PSEN1. Multigenerational cognitive pedigree exhibits classical early-onset dementia with vertical transmission.',
    patientLeaflet: 'This hereditary condition causes memory and cognitive changes starting in mid-adulthood (40s-50s). Clinical trial opportunities and novel disease-modifying therapies are actively available for individuals with confirmed familial variants.',
    acmgClassification: 'Pathogenic (Class 5) — PVS1_Moderate + PS3 + PS4'
  }
];

const CATEGORIES = [
  { id: 'all', label: 'All Categories', count: 8, icon: Dna },
  { id: 'oncology', label: 'Hereditary Oncology', count: 2, icon: ShieldAlert },
  { id: 'cardiology', label: 'Cardiogenetics', count: 2, icon: Heart },
  { id: 'mendelian', label: 'Rare Mendelian', count: 1, icon: Layers },
  { id: 'neurology', label: 'Neurogenetics', count: 2, icon: Brain },
  { id: 'pharmacogenomics', label: 'Pharmacogenomics', count: 1, icon: Pill },
];

export const TraitsExplorer: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeTraitModal, setActiveTraitModal] = useState<TraitItem | null>(null);
  const [reportTab, setReportTab] = useState<'clinical' | 'patient' | 'fhir'>('clinical');

  const filteredTraits = TRAITS_DATA.filter((trait) => {
    const matchesCategory = selectedCategory === 'all' || trait.category === selectedCategory;
    const matchesSearch = 
      trait.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      trait.gene.toLowerCase().includes(searchQuery.toLowerCase()) ||
      trait.rsId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      trait.inheritanceMode.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <section id="traits" className="py-20 bg-white relative border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 border border-slate-200 text-slate-800 text-xs font-semibold mb-3">
            <Sparkles className="w-3.5 h-3.5 text-black" />
            <span>INHERITED TRAITS &amp; CONDITIONS CATALOG</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-extrabold text-black tracking-tight mb-3">
            Explore Inherited Traits &amp; Reports
          </h2>

          <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-2xl">
            Browse verified Mendelian conditions, hereditary oncology markers, and cardiogenetic traits with multigenerational clinical reasoning.
          </p>
        </div>

        {/* Search Bar & Category Tabs */}
        <div className="flex flex-col gap-5 mb-10">
          {/* Search Box */}
          <div className="relative max-w-2xl mx-auto w-full">
            <Search className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by gene (BRCA1, MLH1, CFTR), condition, or rsID..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-11 pr-16 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 placeholder:text-slate-400 text-sm focus:outline-none focus:border-black focus:ring-1 focus:ring-black transition-all shadow-sm"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-black text-xs font-medium"
              >
                Clear
              </button>
            )}
          </div>

          {/* Category Filter Pills (Clean Black & White) */}
          <div className="flex items-center justify-center flex-wrap gap-2">
            {CATEGORIES.map((cat) => {
              const Icon = cat.icon;
              const isActive = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold transition-all border ${
                    isActive
                      ? 'bg-black text-white border-black shadow-sm'
                      : 'bg-slate-50 hover:bg-slate-100 border-slate-200 text-slate-700 hover:text-black'
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-white' : 'text-slate-700'}`} />
                  <span>{cat.label}</span>
                  <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold ${
                    isActive ? 'bg-white/20 text-white' : 'bg-slate-200 text-slate-700'
                  }`}>
                    {cat.count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Traits Card Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTraits.map((trait) => (
            <div
              key={trait.id}
              className="bg-white rounded-2xl p-6 border border-slate-200 hover:border-black transition-all duration-200 hover:shadow-md flex flex-col justify-between"
            >
              <div>
                {/* Top Badges: Inheritance Mode + Epistemic Status */}
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="text-xs px-2.5 py-1 rounded-lg bg-slate-100 text-slate-800 font-semibold border border-slate-200">
                    {trait.inheritanceMode}
                  </span>
                  
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${
                    trait.epistemicStatus === 'OBSERVED'
                      ? 'bg-emerald-50 border-emerald-300 text-emerald-800'
                      : trait.epistemicStatus === 'INFERRED'
                      ? 'bg-sky-50 border-sky-300 text-sky-800'
                      : 'bg-amber-50 border-amber-300 text-amber-800'
                  }`}>
                    [{trait.epistemicStatus}]
                  </span>
                </div>

                {/* Title & Gene */}
                <h3 className="text-base font-heading font-extrabold text-black mb-1.5 leading-snug">
                  {trait.title}
                </h3>
                <div className="flex items-center gap-2 text-xs text-slate-600 mb-3">
                  <Dna className="w-3.5 h-3.5 text-black" />
                  <span className="font-bold text-slate-900">{trait.gene}</span>
                  <span className="text-slate-300">•</span>
                  <span className="text-slate-500 font-mono text-[11px]">{trait.rsId}</span>
                </div>

                {/* Description */}
                <p className="text-xs text-slate-600 leading-relaxed mb-4 line-clamp-2">
                  {trait.description}
                </p>

                {/* Quick Metrics */}
                <div className="grid grid-cols-2 gap-2 p-3 rounded-xl bg-slate-50 border border-slate-200 mb-4 text-xs">
                  <div>
                    <span className="text-slate-400 block text-[10px] font-semibold uppercase">PENETRANCE</span>
                    <span className="text-slate-900 font-bold block mt-0.5 text-[11px] truncate">{trait.penetrance}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px] font-semibold uppercase">ODDS PER CHILD</span>
                    <span className="text-emerald-700 font-bold block mt-0.5 text-[11px]">{trait.transmissionOdds.split(' ')[0]}</span>
                  </div>
                </div>
              </div>

              {/* Bottom Action Button */}
              <button
                onClick={() => {
                  setActiveTraitModal(trait);
                  setReportTab('clinical');
                }}
                className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-slate-50 hover:bg-black hover:text-white border border-slate-200 hover:border-black text-slate-800 font-bold text-xs transition-all shadow-sm group"
              >
                <FileText className="w-3.5 h-3.5" />
                <span>View Full Family Report</span>
                <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
              </button>
            </div>
          ))}
        </div>

        {/* Empty Search State */}
        {filteredTraits.length === 0 && (
          <div className="text-center py-16 bg-slate-50 rounded-2xl border border-slate-200 max-w-lg mx-auto">
            <Info className="w-10 h-10 text-slate-400 mx-auto mb-3" />
            <h4 className="text-base font-bold text-slate-900 mb-1">No matching traits found</h4>
            <p className="text-xs text-slate-500 mb-4">
              Try searching for a different gene name (e.g., BRCA1, MLH1, MYBPC3, CFTR) or reset your filter.
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('all');
              }}
              className="px-4 py-2 rounded-xl bg-black text-white text-xs font-bold shadow-sm"
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>

      {/* Clean White & Black Interactive Report Modal */}
      {activeTraitModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-950/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="w-full max-w-4xl max-h-[90vh] rounded-2xl border border-slate-200 bg-white shadow-2xl flex flex-col overflow-hidden">
            
            {/* Modal Header */}
            <div className="p-6 border-b border-slate-200 flex items-start justify-between gap-4 bg-white">
              <div>
                <div className="flex items-center gap-2.5 mb-2">
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${
                    activeTraitModal.epistemicStatus === 'OBSERVED'
                      ? 'bg-emerald-50 border-emerald-300 text-emerald-800'
                      : activeTraitModal.epistemicStatus === 'INFERRED'
                      ? 'bg-sky-50 border-sky-300 text-sky-800'
                      : 'bg-amber-50 border-amber-300 text-amber-800'
                  }`}>
                    [{activeTraitModal.epistemicStatus}]
                  </span>
                  <span className="text-xs font-semibold text-slate-600">
                    {activeTraitModal.inheritanceMode}
                  </span>
                </div>
                <h3 className="text-2xl font-heading font-extrabold text-slate-950">
                  {activeTraitModal.title}
                </h3>
                <p className="text-xs text-slate-500 mt-1">
                  Locus: <strong className="text-slate-800">{activeTraitModal.gene}</strong> • Variant: <strong className="text-slate-800">{activeTraitModal.rsId}</strong>
                </p>
              </div>

              <button
                onClick={() => setActiveTraitModal(null)}
                className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-600 hover:text-slate-950 transition-colors"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Navigation Tabs (Doctor / Family / FHIR) */}
            <div className="flex border-b border-slate-200 px-6 bg-slate-50 gap-6">
              <button
                onClick={() => setReportTab('clinical')}
                className={`py-3 text-xs sm:text-sm font-bold border-b-2 transition-all flex items-center gap-2 ${
                  reportTab === 'clinical'
                    ? 'border-black text-black'
                    : 'border-transparent text-slate-500 hover:text-slate-900'
                }`}
              >
                <Activity className="w-4 h-4" />
                <span>Doctor / ACMG Clinical Note</span>
              </button>

              <button
                onClick={() => setReportTab('patient')}
                className={`py-3 text-xs sm:text-sm font-bold border-b-2 transition-all flex items-center gap-2 ${
                  reportTab === 'patient'
                    ? 'border-black text-black'
                    : 'border-transparent text-slate-500 hover:text-slate-900'
                }`}
              >
                <Info className="w-4 h-4" />
                <span>Patient &amp; Family Leaflet</span>
              </button>

              <button
                onClick={() => setReportTab('fhir')}
                className={`py-3 text-xs sm:text-sm font-bold border-b-2 transition-all flex items-center gap-2 ${
                  reportTab === 'fhir'
                    ? 'border-black text-black'
                    : 'border-transparent text-slate-500 hover:text-slate-900'
                }`}
              >
                <Layers className="w-4 h-4" />
                <span>HL7 FHIR R4 JSON</span>
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 overflow-y-auto flex-1 space-y-6 text-sm bg-white">
              {/* Tab 1: Doctor / ACMG Clinical View */}
              {reportTab === 'clinical' && (
                <div className="space-y-4">
                  {/* ACMG Badge & Evidence summary */}
                  <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                    <div>
                      <span className="text-slate-400 block text-[10px] font-bold uppercase">CLASSIFICATION</span>
                      <span className="text-emerald-800 font-bold block mt-0.5">{activeTraitModal.acmgClassification}</span>
                    </div>
                    <div>
                      <span className="text-slate-400 block text-[10px] font-bold uppercase">CLINICAL TIER</span>
                      <span className="text-slate-950 font-bold block mt-0.5">{activeTraitModal.clinicalTier}</span>
                    </div>
                    <div>
                      <span className="text-slate-400 block text-[10px] font-bold uppercase">PENETRANCE</span>
                      <span className="text-slate-950 font-bold block mt-0.5">{activeTraitModal.penetrance}</span>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-xs uppercase text-slate-950 font-bold tracking-wider mb-2">
                      Formal Clinical Assessment &amp; Multigenerational Segregation
                    </h4>
                    <p className="text-xs sm:text-sm text-slate-700 leading-relaxed bg-slate-50 p-4 rounded-xl border border-slate-200">
                      {activeTraitModal.clinicalSummary}
                    </p>
                  </div>

                  <div>
                    <h4 className="text-xs uppercase text-slate-950 font-bold tracking-wider mb-2">
                      Identified Pedigree Segregation Path
                    </h4>
                    <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-800 flex items-center gap-3">
                      <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                      <span className="font-semibold">{activeTraitModal.affectedGenerations}</span>
                    </div>
                  </div>
                </div>
              )}

              {/* Tab 2: Patient & Family Plain English Leaflet */}
              {reportTab === 'patient' && (
                <div className="space-y-4">
                  <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex items-start gap-3 text-xs">
                    <Info className="w-5 h-5 text-black flex-shrink-0 mt-0.5" />
                    <div>
                      <span className="font-bold text-black block mb-1">Empathetic, Plain-Language Explanation</span>
                      <p className="text-slate-600">
                        This summary is generated for family counseling to help non-specialist patients understand what this genetic finding means for their personal health and children.
                      </p>
                    </div>
                  </div>

                  <div className="bg-slate-50 p-5 rounded-xl border border-slate-200">
                    <h4 className="text-sm font-heading font-bold text-slate-950 mb-3">
                      What does this mean for your family?
                    </h4>
                    <p className="text-sm text-slate-700 leading-relaxed mb-4">
                      {activeTraitModal.patientLeaflet}
                    </p>

                    <div className="p-3.5 rounded-lg bg-white border border-slate-200 text-xs text-slate-600 space-y-1">
                      <span className="font-bold text-slate-950 block mb-1">Recommended Next Steps:</span>
                      <ul className="list-disc list-inside space-y-1 text-slate-600">
                        <li>Schedule a consultation with a certified clinical genetic counselor.</li>
                        <li>Consider cascade screening for first-degree relatives if clinically indicated.</li>
                        <li>Export and attach the HL7 FHIR record to your health portal.</li>
                      </ul>
                    </div>
                  </div>
                </div>
              )}

              {/* Tab 3: HL7 FHIR R4 JSON Code */}
              {reportTab === 'fhir' && (
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-xs text-slate-500">
                    <span className="font-semibold">Resource: GenomicStudy / MolecularSequence</span>
                    <span className="px-2 py-0.5 rounded bg-slate-100 text-slate-800 font-bold border border-slate-200 font-mono text-[11px]">
                      HL7 FHIR R4
                    </span>
                  </div>
                  <pre className="p-4 rounded-xl bg-slate-950 text-slate-200 font-mono text-[11px] overflow-x-auto leading-relaxed max-h-[300px]">
{JSON.stringify({
  resourceType: "GenomicStudy",
  id: `geninherit-${activeTraitModal.id}`,
  status: "available",
  subject: {
    reference: "Patient/FAM-841-PROBAND",
    display: "Proband (Generation III)"
  },
  reasonCode: [{
    coding: [{
      system: "http://snomed.info/sct",
      code: "106221001",
      display: activeTraitModal.title
    }]
  }],
  analysis: [{
    method: [{
      coding: [{
        system: "http://loinc.org",
        code: "LP217198-3",
        display: "Multigenerational Pedigree LoRA Adaptation"
      }]
    }],
    changeType: [{
      coding: [{
        system: "http://sequenceontology.org",
        code: "SO:0001587",
        display: "stop_gained"
      }]
    }],
    gene: [{
      geneSymbol: activeTraitModal.gene.split(' ')[0],
      referenceSeq: "NC_000017.11"
    }],
    variant: {
      id: activeTraitModal.rsId,
      inheritance: activeTraitModal.inheritanceMode,
      epistemicState: activeTraitModal.epistemicStatus,
      posteriorProb: 0.984
    }
  }]
}, null, 2)}
                  </pre>
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="p-4 sm:p-6 border-t border-slate-200 bg-slate-50 flex items-center justify-between">
              <span className="text-xs text-slate-500 hidden sm:inline font-medium">
                Isolated Family LoRA Parameter Adapter
              </span>
              <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
                <button
                  onClick={() => setActiveTraitModal(null)}
                  className="px-4 py-2 rounded-xl bg-white hover:bg-slate-100 border border-slate-200 text-slate-700 text-xs font-semibold"
                >
                  Close
                </button>
                <a
                  href="#studio"
                  onClick={() => setActiveTraitModal(null)}
                  className="px-4 py-2 rounded-xl bg-black hover:bg-slate-800 text-white text-xs font-bold shadow-sm transition-colors"
                >
                  Open in Clinical Studio
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
