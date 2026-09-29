export interface PedigreeMember {
  id: string;
  generation: 'I' | 'II' | 'III';
  name: string;
  label: string;
  sex: 'male' | 'female';
  age: number;
  genotype: string;
  phenotype: string;
  status: 'OBSERVED' | 'INFERRED' | 'STRICT_UNKNOWN';
  carrierState: 'AFFECTED' | 'CARRIER' | 'UNAFFECTED' | 'UNKNOWN';
  isProband?: boolean;
  parents?: string[];
  partner?: string;
  details: string;
  evidenceSource?: string;
  zygosity: string;
  hpoTerms: string[];
}

export const SAMPLE_PEDIGREE: PedigreeMember[] = [
  // Generation I
  {
    id: 'I-1',
    generation: 'I',
    name: 'Paternal Grandfather',
    label: 'I-1',
    sex: 'male',
    age: 68,
    genotype: 'MYBPC3 c.1504C>T (Het)',
    zygosity: 'Heterozygous (0/1)',
    phenotype: 'Late-onset Hypertrophic Cardiomyopathy (Age 62)',
    status: 'OBSERVED',
    carrierState: 'AFFECTED',
    details: 'Verified high-coverage NGS sequencing (GeneDx #GD-9912). Progressive left ventricular hypertrophy diagnosed at age 62.',
    evidenceSource: 'NGS Panel (Invitae / GeneDx #9912)',
    hpoTerms: ['HP:0001639 (Cardiomyopathy)', 'HP:0001663 (Ventricular hypertrophy)'],
    partner: 'I-2'
  },
  {
    id: 'I-2',
    generation: 'I',
    name: 'Paternal Grandmother',
    label: 'I-2',
    sex: 'female',
    age: 66,
    genotype: 'MYBPC3 WT/WT (Normal)',
    zygosity: 'Wild-Type (0/0)',
    phenotype: 'Unaffected (Normal Echocardiogram)',
    status: 'OBSERVED',
    carrierState: 'UNAFFECTED',
    details: 'Verified negative for familial pathogenic variant. Normal cardiac dimensions and ECG at age 65.',
    evidenceSource: 'Targeted Sanger Sequencing (Invitae #INV-4410)',
    hpoTerms: ['HP:0000001 (Normal Clinical Status)'],
    partner: 'I-1'
  },

  // Generation II
  {
    id: 'II-1',
    generation: 'II',
    name: 'Father',
    label: 'II-1',
    sex: 'male',
    age: 38,
    genotype: 'MYBPC3 c.1504C>T (Het)',
    zygosity: 'Heterozygous (0/1)',
    phenotype: 'Asymptomatic Obligate Carrier',
    status: 'OBSERVED',
    carrierState: 'CARRIER',
    parents: ['I-1', 'I-2'],
    partner: 'II-2',
    details: 'Verified carrier inheriting paternal variant. Asymptomatic at current age 38, demonstrating incomplete / age-dependent penetrance.',
    evidenceSource: 'Targeted Sanger Sequencing (#INV-8821)',
    hpoTerms: ['HP:0000001 (Asymptomatic Non-Penetrant)'],
  },
  {
    id: 'II-2',
    generation: 'II',
    name: 'Mother',
    label: 'II-2',
    sex: 'female',
    age: 36,
    genotype: 'UNTESTED / Missing Record',
    zygosity: 'STRICT_UNKNOWN (./.)',
    phenotype: 'No Symptoms Reported',
    status: 'STRICT_UNKNOWN',
    carrierState: 'UNKNOWN',
    partner: 'II-1',
    details: 'No genetic sequencing records available. Epistemic engine preserves strict uncertainty rather than assuming wild-type normality.',
    evidenceSource: 'UNTESTED (No Laboratory Evidence Available)',
    hpoTerms: ['HP:0000001 (No Known Phenotype)'],
  },

  // Generation III
  {
    id: 'III-1',
    generation: 'III',
    name: 'Proband (Daughter)',
    label: 'III-1 (Proband)',
    sex: 'female',
    age: 12,
    genotype: 'MYBPC3 c.1504C>T (Het)',
    zygosity: 'Heterozygous (0/1)',
    phenotype: 'Early-Onset Hypertrophic Cardiomyopathy (Age 12)',
    status: 'OBSERVED',
    carrierState: 'AFFECTED',
    isProband: true,
    parents: ['II-1', 'II-2'],
    details: 'Proband diagnosed following syncopal episode during athletic screening. Heterozygous pathogenic variant inherited via paternal lineage.',
    evidenceSource: 'WES Panel (Boston Childrens Hospital #BCH-7741)',
    hpoTerms: ['HP:0001639 (Hypertrophic cardiomyopathy)', 'HP:0001279 (Syncope)'],
  },
  {
    id: 'III-2',
    generation: 'III',
    name: 'Sibling (Brother)',
    label: 'III-2',
    sex: 'male',
    age: 8,
    genotype: 'Inferred 50% Transmission Risk',
    zygosity: 'INFERRED (50% Prior)',
    phenotype: 'Asymptomatic Pediatrician Screening',
    status: 'INFERRED',
    carrierState: 'CARRIER',
    parents: ['II-1', 'II-2'],
    details: 'Untested sibling. 50% prior probability of inheriting paternal pathogenic allele under Mendelian Autosomal Dominant transmission.',
    evidenceSource: 'Mendelian Segregation Deduction',
    hpoTerms: ['HP:0000001 (Asymptomatic Pediatric)'],
  }
];
