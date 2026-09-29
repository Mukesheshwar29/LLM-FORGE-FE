import React, { useState } from 'react';
import { ChevronDown, HelpCircle, Check } from 'lucide-react';

interface FAQItem {
  id: string;
  category: 'privacy' | 'science' | 'clinical' | 'data';
  question: string;
  answer: string;
  keyPoints?: string[];
}

const FAQS: FAQItem[] = [
  {
    id: 'faq-1',
    category: 'privacy',
    question: 'How does isolated LoRA adaptation guarantee zero cross-family data leakage?',
    answer: 'Unlike traditional LLMs that fine-tune entire model weights (which risks memorizing and regurgitating sensitive personal genetic records), GenInherit-LLM permanently freezes the 7-billion parameter foundation backbone (Qwen2.5-7B). When a family\'s pedigree and VCF data are processed, a micro-adapter (<15 MB) is trained in strict isolation within an ephemeral GPU enclave. The adapter is loaded on-demand via a 31.8ms hot-swap and purged immediately when the session ends, mathematically guaranteeing 0.000% cross-family parameter contamination.',
    keyPoints: [
      'Base foundation model remains 100% frozen and read-only',
      'Ephemeral GPU enclaves prevent cache persistence',
      'Compliant with GDPR Right-to-be-Forgotten via instant adapter deletion'
    ]
  },
  {
    id: 'faq-2',
    category: 'data',
    question: 'What DNA raw data and clinical file formats are supported?',
    answer: 'GenInherit-LLM supports virtually all major consumer DNA providers, whole exome/genome clinical files, and standard healthcare interchange formats. You can upload files directly or link to cloud storage.',
    keyPoints: [
      'Consumer Raw DNA: 23andMe (v3/v4/v5), AncestryDNA, MyHeritage, FamilyTreeDNA',
      'Clinical Sequencing: VCF v4.2 / v4.3 (GRCh37/hg19 & GRCh38/hg38), gVCF, BAM/CRAM, FASTQ',
      'Health Informatics: HL7 FHIR R4 GenomicStudy JSON, GA4GH Phenopackets v2, PED/BED files'
    ]
  },
  {
    id: 'faq-3',
    category: 'science',
    question: 'What is Epistemic Status Tracking ([OBSERVED] vs [INFERRED] vs [STRICT_UNKNOWN])?',
    answer: 'In clinical genetics, conflating verified laboratory sequencing with probabilistic inheritance deduction is dangerous. GenInherit-LLM enforces strict epistemic tagging for every single genotype and phenotype assertion:',
    keyPoints: [
      '[OBSERVED] (Green): Direct laboratory assay evidence (e.g., Sanger or NGS variant call).',
      '[INFERRED] (Cyan): Probabilistically derived from pedigree segregation, obligate carrier status, or Bayesian inference.',
      '[STRICT_UNKNOWN] (Amber): Missing, unsequenced, or contradictory data where the model strictly refuses to guess.'
    ]
  },
  {
    id: 'faq-4',
    category: 'clinical',
    question: 'How do Doctors and Genetic Counselors integrate this into Hospital EHRs (Epic / Cerner)?',
    answer: 'GenInherit-LLM automatically generates structured HL7 FHIR R4 payloads (GenomicStudy, MolecularSequence, Observation, DiagnosticReport) alongside ACMG/AMP Tier I-IV structured clinical summaries. These can be pushed directly into hospital electronic health record systems via REST API or exported as signed clinical PDFs with full segregation provenance.',
    keyPoints: [
      'Native FHIR R4 interoperability for Epic, Cerner, and Allscripts',
      'Automated 10-Tier ACMG/AMP classification breakdown',
      'Exportable Plain-Language Patient Family Leaflet for counseling sessions'
    ]
  },
  {
    id: 'faq-5',
    category: 'science',
    question: 'How was the 94.8% empirical Mendelian accuracy validated?',
    answer: 'The system was rigorously evaluated across 386 held-out, leakage-free multigenerational families on an NVIDIA DGX B200 cluster. Evaluation included complex inheritance patterns: Autosomal Dominant with age-dependent penetrance, Autosomal Recessive carrier states, X-Linked Recessive segregation, and Trinucleotide repeat anticipation. Ground-truth pedigree segregation was compared against model outputs, achieving a 94.8% accuracy rate with a near-zero 1.5% hallucination rate.',
    keyPoints: [
      '386 verified held-out benchmark families',
      'Zero test-set contamination (leakage_free_verified: true)',
      '1.5% hallucination rate compared to 38.4% for unadapted GPT-4o'
    ]
  },
  {
    id: 'faq-6',
    category: 'clinical',
    question: 'Can students and genetic counseling trainees use this for learning?',
    answer: 'Yes! The Student/Learner workspace provides an interactive "What-If?" allele sandbox, Mendelian puzzle solving, and step-by-step transmission explanations. Trainees can experiment with changing penetrance sliders, modifying parental carrier statuses, and observing instant recalculations in real time.',
    keyPoints: [
      'Interactive Punnett square and allele combinations',
      'Textbook genetics validation mode',
      'Step-by-step segregation explanations with visual pedigree cues'
    ]
  }
];

export const FAQSection: React.FC = () => {
  const [openFaqId, setOpenFaqId] = useState<string | null>('faq-1');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const toggleFaq = (id: string) => {
    setOpenFaqId(openFaqId === id ? null : id);
  };

  const filteredFaqs = FAQS.filter(
    (faq) => selectedCategory === 'all' || faq.category === selectedCategory
  );

  return (
    <section id="faq" className="py-24 bg-white relative border-b border-zinc-200">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-zinc-100 border border-zinc-300 text-black text-xs font-mono font-bold mb-4">
            <HelpCircle className="w-3.5 h-3.5 text-black" />
            <span>FREQUENTLY ASKED QUESTIONS</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-extrabold text-black tracking-tight mb-4">
            Everything You Need to Know About <br />
            <span className="underline decoration-zinc-300 underline-offset-8">
              GenInherit-LLM &amp; Genomic Reasoning
            </span>
          </h2>

          <p className="text-base text-zinc-600 leading-relaxed">
            Clear, transparent answers on privacy isolation, scientific methodology, file compatibility, and clinical EHR integration.
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex items-center justify-center flex-wrap gap-2.5 mb-10">
          {[
            { id: 'all', label: 'All Questions' },
            { id: 'privacy', label: 'Privacy & Security' },
            { id: 'science', label: 'Science & Accuracy' },
            { id: 'clinical', label: 'Clinical Integration' },
            { id: 'data', label: 'Data & Formats' },
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                selectedCategory === cat.id
                  ? 'bg-black text-white shadow-sm'
                  : 'bg-zinc-100 hover:bg-zinc-200 text-zinc-700 border border-zinc-200'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Accordion List */}
        <div className="space-y-4">
          {filteredFaqs.map((faq) => {
            const isOpen = openFaqId === faq.id;
            return (
              <div
                key={faq.id}
                className={`rounded-2xl border transition-all duration-300 overflow-hidden ${
                  isOpen
                    ? 'border-black bg-zinc-50 shadow-sm'
                    : 'border-zinc-200 hover:border-zinc-400 bg-white'
                }`}
              >
                <button
                  onClick={() => toggleFaq(faq.id)}
                  className="w-full p-6 text-left flex items-center justify-between gap-4 focus:outline-none"
                  aria-expanded={isOpen}
                >
                  <span className="font-heading font-bold text-base sm:text-lg text-black">
                    {faq.question}
                  </span>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 transition-transform duration-300 ${
                    isOpen ? 'rotate-180 bg-black text-white' : 'bg-zinc-100 text-zinc-600'
                  }`}>
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-6 pb-6 pt-2 border-t border-zinc-200 text-sm text-zinc-600 space-y-4 animate-in fade-in duration-200">
                    <p className="leading-relaxed">{faq.answer}</p>

                    {faq.keyPoints && (
                      <div className="p-4 rounded-xl bg-white border border-zinc-200 space-y-2 text-xs">
                        <span className="font-bold text-black uppercase tracking-wider block text-[10px] font-mono">
                          Key Takeaways:
                        </span>
                        {faq.keyPoints.map((pt, idx) => (
                          <div key={idx} className="flex items-start gap-2 text-zinc-800">
                            <Check className="w-3.5 h-3.5 text-evidence-green flex-shrink-0 mt-0.5" />
                            <span>{pt}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
