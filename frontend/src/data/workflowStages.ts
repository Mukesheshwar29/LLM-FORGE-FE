export interface WorkflowStage {
  number: string;
  title: string;
  headline: string;
  description: string;
  inputs: string[];
  processing: string[];
  outputs: string[];
  icon: string;
}

export const WORKFLOW_STAGES: WorkflowStage[] = [
  {
    number: '01',
    title: 'Ingest',
    headline: 'Multi-Modal Evidence Ingestion',
    description: 'Ingests raw multi-sample VCF files, GA4GH Phenopackets v2, and clinical lab panels directly into the secure local computational enclave.',
    inputs: ['.vcf / .vcf.gz Variant Files', 'GA4GH Phenopackets JSON', 'Clinical Pedigree Records'],
    processing: ['cyvcf2 High-Speed VCF Parsing', 'Quality Filter (DP>=20, GQ>=30)', 'Clinical Phenotype Tagging'],
    outputs: ['Normalized Sample Variant Tables', 'Validated Phenotype Index'],
    icon: 'UploadCloud'
  },
  {
    number: '02',
    title: 'Normalize',
    headline: 'Ontological & Genomic Standardization',
    description: 'Harmonizes disparate laboratory nomenclatures to strict Ensembl HGVS and Human Phenotype Ontology (HPO) standards.',
    inputs: ['Raw Genomic Coordinates (GRCh37/GRCh38)', 'Unstructured Phenotype Text'],
    processing: ['VEP / Mutalyzer HGVS Alignment', 'HPO Concept Mapping (e.g., HP:0001639)', 'gnomAD Population Frequency Query'],
    outputs: ['Standardized c. and p. HGVS Nomenclature', 'Canonical Transcript Validations'],
    icon: 'CheckCircle2'
  },
  {
    number: '03',
    title: 'Structure',
    headline: 'PSTS-v1 Pedigree Graph Serialization',
    description: 'Converts raw kinships and variant vectors into deterministic Pedigree Structural Token Stream (PSTS-v1) representation.',
    inputs: ['Standardized Genotypes', 'Generational Kinship Edges', 'Epistemic Status Flags'],
    processing: ['Consanguinity Loop Detection', 'Obligate Carrier Graph Traversal', 'PSTS-v1 Token Serialization'],
    outputs: ['Tokenized Linear Pedigree Stream', 'Epistemic Boundary Ledger'],
    icon: 'Network'
  },
  {
    number: '04',
    title: 'Reason',
    headline: 'Family-Specific Adapter Neural Reasoning',
    description: 'Executes multi-hop Mendelian deduction by coupling the frozen 7.24B foundation model with the isolated family LoRA adapter.',
    inputs: ['PSTS-v1 Token Stream', 'Family LoRA Adapter (~35 MB)', 'Clinical Directives'],
    processing: ['FlashAttention-3 GPU Forward Pass', 'Parent-of-Origin Lineage Deduction', 'Penetrance & Recurrence Risk Computation'],
    outputs: ['Deductive Reasoning Trace', 'Epistemic Certainty Scores'],
    icon: 'Cpu'
  },
  {
    number: '05',
    title: 'Deliver',
    headline: 'Actionable Multi-Modal Clinical Synthesis',
    description: 'Synthesizes neural deductions into standardized 10-tier clinical reports, interactive visual pedigrees, and HL7/FHIR R4 EHR resources.',
    inputs: ['Verified Reasoning Trace', 'Probabilistic Recurrence Ledger'],
    processing: ['ACMG Clinical Report Formatting', 'SMART-on-FHIR JSON Generation', 'Plain-Language Translation'],
    outputs: ['10-Tier Clinical Diagnostic Note', 'HL7 FHIR R4 Bundle', 'Patient Family Handout'],
    icon: 'FileText'
  }
];
