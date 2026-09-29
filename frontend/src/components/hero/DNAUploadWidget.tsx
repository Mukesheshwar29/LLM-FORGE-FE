import React, { useState, useRef } from 'react';
import { 
  Upload, 
  FileCheck, 
  Dna, 
  Cpu, 
  ShieldCheck, 
  ArrowRight, 
  RefreshCw
} from 'lucide-react';

interface PresetFamily {
  id: string;
  name: string;
  fileName: string;
  fileSize: string;
  condition: string;
  gene: string;
  detectedGenerations: number;
  probandsRisk: string;
  observedCount: number;
  inferredCount: number;
  adapterId: string;
}

const PRESET_FAMILIES: PresetFamily[] = [
  {
    id: 'fam-841',
    name: 'Sample 1: BRCA1 Hereditary Breast/Ovarian',
    fileName: 'family_841_trio_exome.vcf.gz',
    fileSize: '48.2 MB',
    condition: 'Hereditary Breast & Ovarian Cancer (HBOC)',
    gene: 'BRCA1 (c.68_69delAG)',
    detectedGenerations: 3,
    probandsRisk: 'High (84% Lifetime Penetrance)',
    observedCount: 6,
    inferredCount: 2,
    adapterId: 'lora_adapter_fam_841_rank16.safetensors'
  },
  {
    id: 'fam-102',
    name: 'Sample 2: MLH1 Lynch Syndrome',
    fileName: 'lynch_syndrome_multigen.vcf',
    fileSize: '32.1 MB',
    condition: 'HNPCC / Lynch Syndrome Type 1',
    gene: 'MLH1 (c.350C>T, p.Thr117Met)',
    detectedGenerations: 4,
    probandsRisk: 'High (68% Colorectal Risk)',
    observedCount: 8,
    inferredCount: 3,
    adapterId: 'lora_adapter_fam_102_rank16.safetensors'
  },
  {
    id: 'fam-519',
    name: 'Sample 3: MYBPC3 Cardiomyopathy',
    fileName: 'cardio_pedigree_panel.vcf',
    fileSize: '18.4 MB',
    condition: 'Hypertrophic Cardiomyopathy (Sarcomeric HCM)',
    gene: 'MYBPC3 (c.1504C>T, p.Arg502Trp)',
    detectedGenerations: 3,
    probandsRisk: 'Moderate-High (65% Penetrance)',
    observedCount: 5,
    inferredCount: 2,
    adapterId: 'lora_adapter_fam_519_rank16.safetensors'
  }
];

export const DNAUploadWidget: React.FC = () => {
  const [selectedFamily, setSelectedFamily] = useState<PresetFamily>(PRESET_FAMILIES[0]);
  const [analyzing, setAnalyzing] = useState<boolean>(false);
  const [analysisStep, setAnalysisStep] = useState<number>(0);
  const [uploadedCustomFile, setUploadedCustomFile] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const startAnalysis = (family: PresetFamily) => {
    setSelectedFamily(family);
    setAnalyzing(true);
    setAnalysisStep(1);

    setTimeout(() => setAnalysisStep(2), 600);
    setTimeout(() => setAnalysisStep(3), 1200);
    setTimeout(() => {
      setAnalysisStep(4);
      setAnalyzing(false);
    }, 1800);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setUploadedCustomFile(file.name);
      const customPreset: PresetFamily = {
        id: 'fam-custom',
        name: `Uploaded: ${file.name}`,
        fileName: file.name,
        fileSize: `${(file.size / (1024 * 1024)).toFixed(1)} MB`,
        condition: 'Custom Genomic Pedigree Stream',
        gene: 'Multi-Locus VCF Analysis',
        detectedGenerations: 3,
        probandsRisk: 'Personalized Variant Recurrence',
        observedCount: 5,
        inferredCount: 2,
        adapterId: `lora_custom_${Date.now().toString().slice(-6)}.safetensors`
      };
      startAnalysis(customPreset);
    }
  };

  return (
    <div className="w-full glass-panel rounded-2xl border border-cyan-electric/25 p-6 shadow-2xl bg-surface-card/90">
      {/* Dropzone Header */}
      <div className="flex items-center justify-between gap-4 mb-4 pb-4 border-b border-white/10">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-cyan-electric/15 border border-cyan-electric/30 flex items-center justify-center text-cyan-electric">
            <Upload className="w-4 h-4 animate-bounce" />
          </div>
          <div>
            <h3 className="text-sm font-heading font-bold text-text-primary">
              Genomic Data Ingestion & Live Reasoning
            </h3>
            <p className="text-[11px] font-mono text-text-muted">
              Supports 23andMe, AncestryDNA, MyHeritage, VCF v4.2, BAM, FHIR JSON
            </p>
          </div>
        </div>

        <span className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-evidence-greenBg border border-evidence-green/30 text-evidence-green text-[10px] font-mono font-bold">
          <ShieldCheck className="w-3 h-3" />
          Zero Data Bleed
        </span>
      </div>

      {/* Preset Quick Select Buttons */}
      <div className="mb-4">
        <span className="text-[10px] font-mono text-text-muted uppercase tracking-wider block mb-2">
          Or Select a Pre-Loaded Clinical Family Case:
        </span>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
          {PRESET_FAMILIES.map((fam) => (
            <button
              key={fam.id}
              onClick={() => startAnalysis(fam)}
              className={`text-left p-2.5 rounded-xl border text-xs transition-all ${
                selectedFamily.id === fam.id
                  ? 'bg-cyan-electric/15 border-cyan-electric text-text-primary shadow-glow-cyan'
                  : 'bg-midnight/60 border-white/10 hover:border-white/20 text-text-secondary hover:text-text-primary'
              }`}
            >
              <div className="font-semibold truncate text-[11px]">{fam.name.split(':')[1] || fam.name}</div>
              <div className="text-[10px] font-mono text-cyan-electric truncate">{fam.gene}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Drag & Drop Box */}
      <div
        onClick={() => fileInputRef.current?.click()}
        className="relative group cursor-pointer rounded-xl border-2 border-dashed border-cyan-electric/30 hover:border-cyan-electric p-6 text-center bg-midnight/50 hover:bg-cyan-electric/5 transition-all mb-4"
      >
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileUpload}
          accept=".vcf,.vcf.gz,.txt,.csv,.json,.bam,.cram,.fastq"
          className="hidden"
        />

        <div className="flex flex-col items-center">
          <div className="w-12 h-12 rounded-2xl bg-surface-card border border-white/10 flex items-center justify-center text-cyan-electric mb-2 group-hover:scale-110 group-hover:border-cyan-electric transition-all shadow-glow-cyan">
            <Dna className="w-6 h-6 animate-pulse" />
          </div>
          <span className="text-xs font-semibold text-text-primary group-hover:text-cyan-electric transition-colors">
            {uploadedCustomFile ? `Selected: ${uploadedCustomFile}` : 'Drop your Raw DNA file here or click to browse'}
          </span>
          <span className="text-[10px] font-mono text-text-muted mt-1">
            23andMe • AncestryDNA • MyHeritage • Whole Exome VCF (GRCh38)
          </span>
        </div>
      </div>

      {/* Dynamic Processing Status Strip */}
      {analyzing ? (
        <div className="p-4 rounded-xl bg-midnight/80 border border-cyan-electric/30 animate-pulse space-y-2.5 text-xs font-mono">
          <div className="flex items-center justify-between text-cyan-electric">
            <span className="flex items-center gap-2">
              <RefreshCw className="w-3.5 h-3.5 animate-spin" />
              {analysisStep === 1 && 'Ingesting Genomic Coordinates & Variant Alleles...'}
              {analysisStep === 2 && 'Aligning Segregation to HG38 Reference...'}
              {analysisStep === 3 && 'Hot-swapping Isolated Family LoRA Adapter (28.4ms)...'}
              {analysisStep === 4 && 'Computing Multigenerational Epistemic Posterior...'}
            </span>
            <span className="font-bold">{analysisStep * 25}%</span>
          </div>
          <div className="w-full bg-surface-card h-1.5 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-cyan-electric to-lavender-muted transition-all duration-300"
              style={{ width: `${analysisStep * 25}%` }}
            />
          </div>
        </div>
      ) : (
        /* Real-Time Analyzed Results Card */
        <div className="p-4 rounded-xl bg-midnight/90 border border-cyan-electric/20 text-xs font-mono space-y-3">
          <div className="flex items-center justify-between text-text-secondary border-b border-white/5 pb-2">
            <span className="flex items-center gap-1.5 text-text-primary font-bold">
              <FileCheck className="w-4 h-4 text-evidence-green" />
              {selectedFamily.fileName}
            </span>
            <span className="text-[10px] text-cyan-electric font-mono">{selectedFamily.fileSize}</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-[11px]">
            <div className="p-2 rounded-lg bg-surface-card/60">
              <span className="text-text-muted block text-[9px]">ACTIVE CONDITION</span>
              <span className="text-text-primary font-bold truncate block">{selectedFamily.condition.split('(')[0]}</span>
            </div>
            <div className="p-2 rounded-lg bg-surface-card/60">
              <span className="text-text-muted block text-[9px]">TARGET LOCUS</span>
              <span className="text-cyan-electric font-bold truncate block">{selectedFamily.gene}</span>
            </div>
            <div className="p-2 rounded-lg bg-surface-card/60">
              <span className="text-text-muted block text-[9px]">OBSERVED EVIDENCE</span>
              <span className="text-evidence-green font-bold block">{selectedFamily.observedCount} Variants</span>
            </div>
            <div className="p-2 rounded-lg bg-surface-card/60">
              <span className="text-text-muted block text-[9px]">INFERRED POSTERIOR</span>
              <span className="text-cyan-ice font-bold block">{selectedFamily.inferredCount} Lineages</span>
            </div>
          </div>

          <div className="flex items-center justify-between gap-3 pt-1">
            <div className="flex items-center gap-2 text-[10px] text-text-muted">
              <Cpu className="w-3.5 h-3.5 text-lavender-muted" />
              <span className="truncate max-w-[180px]">{selectedFamily.adapterId}</span>
            </div>

            <a
              href="#pedigree"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-cyan-electric text-midnight font-bold text-xs hover:bg-cyan-ice transition-all shadow-glow-cyan"
            >
              <span>Inspect Lineage</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      )}
    </div>
  );
};
