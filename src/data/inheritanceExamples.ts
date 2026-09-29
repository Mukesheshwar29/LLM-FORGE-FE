export interface InheritanceCase {
  id: string;
  title: string;
  gene: string;
  variant: string;
  mode: 'Autosomal Dominant' | 'Autosomal Recessive' | 'X-Linked Recessive' | 'De Novo';
  condition: string;
  transmission: string;
  recurrenceRisk: string;
  penetrance: string;
  epistemicAudit: string;
}

export const INHERITANCE_EXAMPLES: InheritanceCase[] = [
  {
    id: 'CASE_MYBPC3',
    title: 'Paternal Cardiomyopathy with Incomplete Penetrance',
    gene: 'MYBPC3',
    variant: 'c.1504C>T (p.Arg502Trp)',
    mode: 'Autosomal Dominant',
    condition: 'Hypertrophic Cardiomyopathy (HCM)',
    transmission: 'Direct Paternal Transmission (Grandfather I-1 -> Father II-1 -> Proband III-1)',
    recurrenceRisk: '50% transmission probability for subsequent offspring',
    penetrance: 'Age-dependent incomplete penetrance (~60% lifetime manifestation)',
    epistemicAudit: 'Father confirmed asymptomatic carrier at age 38 without de novo mutation error.'
  },
  {
    id: 'CASE_CFTR',
    title: 'First-Cousin Consanguinity Carrier Screening',
    gene: 'CFTR',
    variant: 'c.1521_1523delCTT (p.Phe508del)',
    mode: 'Autosomal Recessive',
    condition: 'Cystic Fibrosis (CF)',
    transmission: 'Biparental inheritance from shared common ancestral founder lineage',
    recurrenceRisk: '25% affected (Hom), 50% carrier (Het), 25% non-carrier wild-type',
    penetrance: '100% complete penetrance for classical homozygotes',
    epistemicAudit: 'Both parents confirmed heterozygous carriers via targeted NGS sequencing.'
  },
  {
    id: 'CASE_SCN1A',
    title: 'Spontaneous De Novo Dravet Syndrome',
    gene: 'SCN1A',
    variant: 'c.4123C>T (p.Arg1375Ter)',
    mode: 'De Novo',
    condition: 'Severe Myoclonic Epilepsy of Infancy (Dravet Syndrome)',
    transmission: 'Non-inherited spontaneous germline mutation in proband',
    recurrenceRisk: '< 1% empirical population recurrence for future siblings',
    penetrance: 'High penetrance in pediatric early infancy',
    epistemicAudit: 'Both biological parents certified high-coverage WT/WT (Wild-Type).'
  },
  {
    id: 'CASE_DMD',
    title: 'X-Linked Muscular Dystrophy & Carrier Lyonization',
    gene: 'DMD',
    variant: 'c.5839C>T (p.Gln1947Ter)',
    mode: 'X-Linked Recessive',
    condition: 'Duchenne Muscular Dystrophy',
    transmission: 'Maternal X-chromosome transmission to male proband',
    recurrenceRisk: '50% of male offspring affected; 50% of female offspring carriers',
    penetrance: 'Complete hemizygous male penetrance; variable skewed X-inactivation in females',
    epistemicAudit: 'Direct father-to-son transmission excluded as biologically impossible.'
  }
];
