# GenInherit-LLM: Research & Development Specification
## Volume 2: Data Architecture, Validation Protocols, and Pedigree Representation

```text
====================================================================================================
  GENINHERIT-LLM: TECHNICAL RESEARCH & DEVELOPMENT SPECIFICATION
  VOLUME 2: DATA ARCHITECTURE, VALIDATION PROTOCOLS, AND PEDIGREE REPRESENTATION
====================================================================================================
  CONTINUALLY EVOLVING FAMILY-SPECIFIC GENOMIC INHERITANCE REASONING LARGE LANGUAGE MODEL
  GENOMIC DATA STRUCTURES, PEDIGREE TOKENIZATION, AND CLINICAL VALIDATION
  SYSTEM TARGET: MULTIGENERATIONAL DEDUCTIVE GENOMICS
====================================================================================================
```

---

## Document Overview and Metadata

* **Document Title:** GenInherit-LLM Technical R&D Specification — Volume 2: Data Architecture, Validation, and Pedigree Representation
* **Document Number:** GIN-SPEC-2026-VOL2
* **Target Audience:** Bioinformaticians, Clinical Data Architects, Clinical Geneticists, ML Pipeline Engineers
* **Primary Scope:** Genomic tokenization, pedigree graph schemas, multi-stage data validation pipelines, longitudinal data management, and epistemic negative/unknown tracking.

---

## Table of Contents

1. [Biomedical Domain Corpus and Pre-Training Data Architecture](#1-biomedical-domain-corpus-and-pre-training-data-architecture)
2. [Instruction and Reasoning Dataset Construction](#2-instruction-and-reasoning-dataset-construction)
3. [The Counterfactual and Negative-Control Training Paradigm](#3-the-counterfactual-and-negative-control-training-paradigm)
4. [Minimum Viable Family Data vs. Rich Longitudinal Deployment](#4-minimum-viable-family-data-vs-rich-longitudinal-deployment)
5. [The Longitudinal Data Paradigm: Debunking Repeated Sequencing Myths](#5-the-longitudinal-data-paradigm-debunking-repeated-sequencing-myths)
6. [Longitudinal Learning Experimental Regimes](#6-longitudinal-learning-experimental-regimes)
7. [Pedigree Topography and Graph Tokenization](#7-pedigree-topography-and-graph-tokenization)
8. [Hierarchical Generational Mapping](#8-hierarchical-generational-mapping)
9. [Source Authority and The Provenance Chain](#9-source-authority-and-the-provenance-chain)
10. [The Multi-Stage Data Ingestion and Validation Pipeline](#10-the-multi-stage-data-ingestion-and-validation-pipeline)
11. [Handling Nonexistent, Ghost, and Synthetic Individuals](#11-handling-nonexistent-ghost-and-synthetic-individuals)
12. [Epistemological Rigor: Unknown Status vs. Negative Status](#12-epistemological-rigor-unknown-status-vs-negative-status)
13. [Formal Genetic Representation Schema](#13-formal-genetic-representation-schema)
14. [Formal Phenotypic Representation Schema](#14-formal-phenotypic-representation-schema)
15. [Comprehensive Taxonomy of Supported Inheritance Mechanisms](#15-comprehensive-taxonomy-of-supported-inheritance-mechanisms)
16. [Handling Volumetric Family Growth Across Generations](#16-handling-volumetric-family-growth-across-generations)
17. [The Five-Level Biomedical Evidence Hierarchy](#17-the-five-level-biomedical-evidence-hierarchy)
18. [Data Verification and Conflict Resolution State Machine](#18-data-verification-and-conflict-resolution-state-machine)

---

## 1. Biomedical Domain Corpus and Pre-Training Data Architecture

Prior to family-specific adaptation, the base GenInherit-LLM must possess an exhaustive parametric mastery of molecular biology, formal genetics nomenclature, and hereditary transmission mechanisms.

```text
+--------------------------------------------------------------------------------------------------+
|                            BASE MODEL PRE-TRAINING DOMAIN TAXONOMY                               |
+--------------------------------------------------------------------------------------------------+
|  1. MOLECULAR VARIANT CATALOGS:                                                                 |
|     • Single Nucleotide Polymorphisms (SNPs), Indels, Structural Variants (SVs), CNVs.           |
|     • HGVS Nomenclature Standard: Coding (c.), Genomic (g.), Protein (p.), Non-coding (n.).      |
|     • Population Allele Frequencies: gnomAD (v2, v3, v4), 1000 Genomes Project, ExAC.           |
|                                                                                                  |
|  2. GENE FUNCTION AND CYTOGENETICS:                                                              |
|     • Chromosomal Cytobands (e.g., 17q21.31, Xp22.33), Telomeric & Centromeric boundaries.     |
|     • Canonical Ensembl & RefSeq Transcripts, Exon-Intron boundaries, Splice donor/acceptor.     |
|     • Biological Pathways: Gene Ontology (GO), KEGG, Reactome, ClinGen Gene-Disease Validity.   |
|                                                                                                  |
|  3. CLINICAL PHENOTYPE AND ONTOLOGICAL TAXONOMIES:                                               |
|     • Human Phenotype Ontology (HPO): Standardized phenotypic abnormalities (e.g., HP:0001250). |
|     • Disease Classifications: OMIM, Orphanet, Mondo Disease Ontology, ICD-10-CM / ICD-11.      |
|     • ACMG/AMP 2015 Variant Classification Standards (PVS1, PS1-4, PM1-6, PP1-5, BA1, BS1-4).   |
|                                                                                                  |
|  4. MENDELIAN AND NON-MENDELIAN INHERITANCE LITERATURE:                                          |
|     • Curated full-text pedigree studies, twin registries, consanguinity mapping papers.         |
|     • Biomedical literature extracts from PubMed Central, Nature Genetics, American Journal of  |
|       Human Genetics (AJHG), European Journal of Human Genetics (EJHG).                         |
+--------------------------------------------------------------------------------------------------+
```

---

## 2. Instruction and Reasoning Dataset Construction

Genomic reasoning cannot be achieved through naive next-token prediction on unstructured text alone. The base model is subjected to specialized Supervised Fine-Tuning (SFT) using an engineered multi-modal instruction taxonomy comprising seven distinct categorical distributions:

```text
                              +---------------------------------------+
                              |    INSTRUCTION DATASET DISTRIBUTION   |
                              +---------------------------------------+
                                                  |
         +--------------------+-------------------+--------------------+--------------------+
         |                    |                   |                    |                    |
         v                    v                   v                    v                    v
  [POSITIVE CASES]     [NEGATIVE CASES]    [AMBIGUOUS CASES]    [COUNTERFACTUALS]    [MULTI-GEN CASES]
  Canonical Mendelian  Flawed, Impossible  Incomplete Testing;  Altered Parental     3-4 Generations;
  Deductions (30%)     Deductions (15%)    Missing Data (15%)   Alleles (15%)        Lineage Skips (15%)
                                                  |
                                                  +--------------------+
                                                  |                    |
                                                  v                    v
                                          [CONFLICT CASES]     [MISSING CONTROLS]
                                          Discrepant Labs      Unknown Parentage
                                          (5%)                 Controls (5%)
```

### 2.1 Schema of Instruction Sample Categories

1. **Positive Canonical Examples (30%):** Pristine family trees with complete genotyping exhibiting classical Autosomal Dominant (AD), Autosomal Recessive (AR), X-Linked Recessive (XLR), X-Linked Dominant (XLD), and Mitochondrial (MT) transmissions.
2. **Negative and Fallacious Examples (15%):** Deliberately flawed reasoning tasks where the model must detect impossible inheritance pathways (e.g., father-to-son transmission of an X-linked pathogenic allele, or an autosomal recessive disease manifesting from a single heterozygous wild-type mating without de novo events).
3. **Ambiguous and Under-Determined Examples (15%):** Cases where familial evidence is mathematically insufficient to distinguish between competing modes (e.g., distinguishing X-linked dominant from autosomal dominant when affected males have no reproductive offspring).
4. **Counterfactual Lineage Examples (15%):** Systematic perturbations of ancestral genotypes designed to force rigorous causal deduction: *"If Maternal Grandmother [I-2] were homozygous wild-type instead of heterozygous, does the child's pathogenic variant require a de novo event?"*
5. **Multigenerational High-Depth Traversal (15%):** Complex 4-generation lineages exhibiting variable age-dependent penetrance, compound heterozygosity in trans vs. cis, and germline mosaicism.
6. **Contradictory and Discrepant Laboratory Reports (5%):** Ingestion of conflicting classifications (e.g., Lab A calls variant Pathogenic; Lab B calls it a VUS). The model is trained to identify and report the discrepancy rather than guessing.
7. **Explicit Missing-Data Negative Controls (5%):** Scenarios where untested family members are explicitly probed to ensure the model produces an `UNKNOWN` output rather than assuming wild-type normality.

---

## 3. The Counterfactual and Negative-Control Training Paradigm

A persistent failure mode of commercial language models in clinical settings is the "confirmation bias hallucination"—the tendency to invent parental carrier statuses to force an observed child variant into a clean Mendelian pattern.

To neutralize this failure mode, GenInherit-LLM incorporates an explicit training objective on negative controls and counterfactual invariants:

```text
[COUNTERFACTUAL TRAINING EXAMPLE SPECIFICATION]
----------------------------------------------------------------------------------------------------
PROMPT:
Family Pedigree:
- Grandfather [I-1]: Carrier of CFTR c.1521_1523delCTT (p.Phe508del), Heterozygous.
- Grandmother [I-2]: Tested, Confirmed Wild-Type (WT/WT).
- Father [II-1]: Confirmed Heterozygous Carrier of CFTR c.1521_1523delCTT.
- Mother [II-2]: Genetic Status UNTESTED, No phenotypic pulmonary symptoms.
- Proband [III-1]: Diagnosed with classic Cystic Fibrosis; Genotype confirmed: 
  CFTR [c.1521_1523delCTT] ; [c.1521_1523delCTT] (Homozygous).

QUERY:
Deduce the origin of the two pathogenic alleles in Proband [III-1]. Can the maternal allele be 
confirmed as an inherited maternal transmission?

TARGET REASONING TRACE (SUPERVISED OUTPUT):
1. PATERNAL ALLELE ANALYSIS:
   - Father [II-1] is a verified carrier of CFTR c.1521_1523delCTT, inherited from [I-1].
   - Father transmits one c.1521_1523delCTT allele to Proband [III-1]. Paternal origin: CONFIRMED.

2. MATERNAL ALLELE ANALYSIS:
   - Proband [III-1] is homozygous for the variant, requiring a second c.1521_1523delCTT allele.
   - Mother [II-2] has NEVER been genotyped. 
   - While Mother [II-2] is statistically suspected to be an asymptomatic carrier, her genetic status 
     in the family ledger is strictly UNVERIFIED.
   - ALTERNATIVE BIOLOGICAL MECHANISMS:
     a) Uniparental Disomy (UPD): Maternal UPD of chromosome 7 or paternal isodisomy.
     b) De Novo Mutation: An independent c.1521_1523delCTT event during maternal gametogenesis.
     c) True Maternal Carrier Inheritance.

3. EPISTEMIC DEDUCTIVE CONCLUSION:
   - "The maternal origin CANNOT be definitively confirmed from verified records. The system records 
     Mother [II-2] as an Obligate Suspected Carrier with status: UNVERIFIED. Targeted Sanger sequencing 
     of Mother [II-2] is mandatory to exclude paternal uniparental isodisomy and certify carrier status."
----------------------------------------------------------------------------------------------------
```

---

## 4. Minimum Viable Family Data vs. Rich Longitudinal Deployment

Clinical genomic environments present wildly varying data densities. GenInherit-LLM enforces a formal specification defining the threshold between a non-viable submission, a Minimum Viable Case (MVC), and an Enterprise Rich Longitudinal Profile:

```text
====================================================================================================
                        CLINICAL DATA REQUIREMENT DENSITY MATRIX
====================================================================================================

+-----------------------------------+--------------------+--------------------+--------------------+
| DATA FIELD ATTRIBUTE              | NON-VIABLE CASE    | MINIMUM VIABLE     | RICH LONGITUDINAL  |
|                                   | (REJECTED)         | CASE (MVC)         | DEPLOYMENT         |
+-----------------------------------+--------------------+--------------------+--------------------+
| Pedigree Topology Depth           | Isolated Proband   | >= 2 Generations   | >= 4 Generations   |
| Biological Parentage Definition   | Missing / Vague    | Explicitly Defined | Fully Certified    |
| Genetic Variant Molecular Data    | Colloquial Names   | HGVS + Genotype    | Full VCF / WGS/WES |
| Zygosity / Allelic State          | Unspecified        | Explicit (Het/Hom) | Detailed Phase/VCF |
| Documented Clinical Phenotype     | None / Anecdotal   | >= 1 Primary HPO   | Longitudinal Diary |
| Laboratory Source Authority       | Anonymous User     | CLIA/CAP Lab ID    | Full Signed PDF/HL7|
| Data Verification Sign-Off        | None               | Clinical Reviewer  | Molecular Geneticist|
| Epistemic Status Tagging          | Absent             | Strict 4-State Tag | Complete Provenance|
| Temporal Onset Milestones         | Absent             | Approximate Age    | Exact Dated Pheno  |
| Consanguinity Documentation       | Ignored            | Declared (Yes/No)  | Coefficient of Inbr|
+-----------------------------------+--------------------+--------------------+--------------------+
```

### 4.1 Rejection of Non-Viable Submissions

The ingestion engine structurally aborts fine-tuning if a case fails the MVC criteria:
* Case with proband-only sequencing without family structure $\to$ Directed to standard clinical variant lookup, **NOT** family adaptation.
* Case where variants are provided without zygosity (e.g., *"Patient has BRCA1 mutation"*) $\to$ Quarantined until allelic state (Heterozygous, Homozygous, Hemizygous) is certified.

---

## 5. The Longitudinal Data Paradigm: Debunking Repeated Sequencing Myths

A widespread fallacy in machine learning for healthcare is the assumption that longitudinal genomic modeling requires sequencing an individual repeatedly at regular intervals (e.g., ages 5, 13, 18, 25, 32, 40, 50, 60).

```text
+--------------------------------------------------------------------------------------------------+
|                              THE BIOLOGICAL REALITY OF GERMLINE DNA                              |
+--------------------------------------------------------------------------------------------------+
|  1. GERMLINE INVARIANCE:                                                                         |
|     • An individual's inherited nuclear germline genome is established at fertilization and      |
|       remains effectively static throughout their entire life.                                    |
|     • A high-coverage Whole Genome Sequencing (WGS) assay executed at age 5 does not need to be   |
|       repeated at age 25 or 50 to re-evaluate constitutional Mendelian inheritance.              |
|                                                                                                  |
|  2. TEMPORAL PHENOTYPIC EVOLUTION:                                                               |
|     • What DOES evolve longitudinally is the PHENOME—the clinical manifestation, penetrance,      |
|       tissue-specific expressivity, and diagnostic disease milestones over chronological time.    |
|                                                                                                  |
|  3. THE SYSTEM INTEGRATION PRINCIPLE:                                                            |
|     • Germline Genotype = STATIC PARAMETRIC ANCHOR.                                              |
|     • Longitudinal Phenome = DYNAMIC TEMPORAL LEDGER.                                             |
+--------------------------------------------------------------------------------------------------+
```

```text
PATIENT TIMELINE: CHRONOLOGICAL ACCRUAL OF CLINICAL EVIDENCE
====================================================================================================
Age 00 (Birth) : Certified Germline WGS (Illumina NovaSeq 6000, 40x):
                 - Confirmed Variant: FBN1 c.6125G>A (p.Cys2042Tyr), Heterozygous.
                 - Epistemic Tag: VERIFIED_MOLECULAR. Status: Asymptomatic Neonate.

Age 06 Years   : Clinical Pediatric Evaluation (Boston Children's Hospital):
                 - Manifestation: Ectopia lentis (bilateral superior subluxation).
                 - Phenotype Ontologies: Added HP:0001083. Status: VERIFIED_CLINICAL.

Age 14 Years   : Orthopedic Consultation (Johns Hopkins Hospital):
                 - Manifestation: Severe scoliosis (Cobb angle 34 degrees), Pectus excavatum.
                 - Phenotype Ontologies: Added HP:0002650, HP:0000767.

Age 28 Years   : Cardiovascular Echocardiogram (Cleveland Clinic):
                 - Manifestation: Ascending aortic root dilatation (Z-score = +3.8).
                 - Phenotype Ontologies: Added HP:0002616 (Aortic root aneurysm).
                 - Diagnostic Conclusion: Full Marfan Syndrome clinical diagnosis confirmed.
====================================================================================================
```

GenInherit-LLM updates its family adapter across these milestones not because the DNA changed, but because the **phenotypic penetrance vector evolved**, validating the functional pathogenicity of the static germline variant within that specific family background.

---

## 6. Longitudinal Learning Experimental Regimes

To empirically demonstrate the impact of longitudinal data accretion, GenInherit-LLM establishes three comparative experimental regimes:

```text
                  +-------------------------------------------------------------+
                  |         LONGITUDINAL ADAPTATION EXPERIMENTAL REGIMES        |
                  +-------------------------------------------------------------+
                                                 |
         +---------------------------------------+---------------------------------------+
         |                                       |                                       |
         v                                       v                                       v
+-------------------------------+       +-------------------------------+       +-------------------------------+
|       MODEL REGIME A:         |       |       MODEL REGIME B:         |       |       MODEL REGIME C:         |
|   Ancestral Baseline Only     |       |    Multigenerational Expansion|       | Longitudinal Pheno-Synthesis  |
+-------------------------------+       +-------------------------------+       +-------------------------------+
| • Ingests Gen I & II only.    |       | • Ingests Gen I, II, & III.   |       | • Ingests Gen I, II, & III.   |
| • Static variant data.        |       | • Static variant data across  |       | • Longitudinal phenotype logs |
| • Single-point phenotypes.    |       |   all three tiers.            |       |   spanning 3 decades.         |
| • Tests: Baseline Mendelian   |       | • Tests: Multi-hop lineage    |       | • Tests: Penetrance tracking, |
|   attribution across parents. |       |   traversal & child risk.     |       |   expressivity, & onset risk. |
+-------------------------------+       +-------------------------------+       +-------------------------------+
```

### 6.1 Formal Hypothesis of Longitudinal Experimentation

$$\Delta \text{Reasoning}(C \text{ vs } B) \gg \Delta \text{Reasoning}(B \text{ vs } A)$$

While moving from Model A to Model B increases topological pedigree accuracy, moving from Model B to Model C enables the model to parameterize **age-dependent penetrance curves** specific to that familial modifier background.

---

## 7. Pedigree Topography and Graph Tokenization

A core innovation of GenInherit-LLM is the serial tokenization of directed acyclic pedigree graphs (DAGs) into specialized structural sequence tokens readable by the Transformer architecture.

### 7.1 Structural Graph Grammar and Token Definitions

```text
====================================================================================================
                    PEDIGREE STRUCTURAL TOKEN SPECIFICATION (PSTS-v1)
====================================================================================================
TOKEN NAME               REPRESENTATION         SEMANTIC DEFINITION
----------------------------------------------------------------------------------------------------
<PEDIGREE_START>         [PED_START]            Initiates the family structural block.
<PEDIGREE_END>           [PED_END]              Terminates the family structural block.
<FAMILY_DEF>             [FAM_ID:xxxx]          Declares the unique cryptographic family identifier.
<INDIVIDUAL_START>       [IND:xxxx]             Declares individual node with cryptographic ID.
<SEX_MALE>               [SEX:M]                Biological male karyotype (XY).
<SEX_FEMALE>             [SEX:F]                Biological female karyotype (XX).
<SEX_OTHER>              [SEX:O]                Intersex / Turner / Klinefelter / Other.
<PARENT_RELATION>        [PARENTS:xxx,yyy]      Directed biological edges: [Father_ID, Mother_ID].
<SPOUSE_RELATION>        [SPOUSE:xxx]           Consort / reproductive partner edge.
<CONSANGUINITY>          [CONSANGUINEOUS]       Flags verified intra-familial union.
<DECEASED>               [DEC:Age]              Deceased individual with age at death.
<PROBAND>                [PROBAND]              Identifies primary presenting patient.
====================================================================================================
```

### 7.2 Serialized Sequence Tokenization Example

```text
[PED_START] [FAM_ID:FAM_00942_C]
  [IND:I-1] [SEX:M] [PARENTS:NONE,NONE] [DEC:74] [PHENOTYPES:HP:0001644,HP:0001658]
  [IND:I-2] [SEX:F] [PARENTS:NONE,NONE] [DEC:81] [PHENOTYPES:NONE]
  [IND:II-1] [SEX:M] [PARENTS:I-1,I-2] [SPOUSE:II-2] [PHENOTYPES:HP:0001644]
  [IND:II-2] [SEX:F] [PARENTS:NONE,NONE] [SPOUSE:II-1] [PHENOTYPES:NONE]
  [IND:III-1] [SEX:F] [PARENTS:II-1,II-2] [PROBAND] [PHENOTYPES:HP:0001644,HP:0001638]
[PED_END]
```

---

## 8. Hierarchical Generational Mapping

The parser converts the tokenized pedigree graph into an internal directed topological matrix:

```text
                 GENERATION I (Founders)
                 +---------------------+                +---------------------+
                 | Individual: I-1     |                | Individual: I-2     |
                 | Sex: Male           | <============> | Sex: Female         |
                 | Genotype: Het V1    |   Mating Edge  | Genotype: WT/WT     |
                 +---------------------+                +---------------------+
                            |                                      |
                            +------------------+-------------------+
                                               |
                                               v
                 GENERATION II (Transmitting Tier)
                 +---------------------+                +---------------------+
                 | Individual: II-1    |                | Individual: II-2    |
                 | Sex: Male           | <============> | Sex: Female         |
                 | Genotype: Het V1    |   Mating Edge  | Genotype: UNTESTED  |
                 +---------------------+                +---------------------+
                            |                                      |
                            +------------------+-------------------+
                                               |
                                               v
                 GENERATION III (Proband Tier)
                 +---------------------+
                 | Individual: III-1   |
                 | Sex: Female (PROBAND|
                 | Genotype: Het V1    |
                 +---------------------+
```

The model calculates the topological distance matrix $D \in \mathbb{R}^{N \times N}$ where $D_{ij}$ equals the shortest path biological distance between individual $i$ and individual $j$, enforcing positional invariant embeddings that reflect generational depth.

---

## 9. Source Authority and The Provenance Chain

A foundational rule of GenInherit-LLM is that **an AI model never establishes biological truth**. Facts originate solely from accredited human institutions and molecular instruments:

```text
+--------------------------------------------------------------------------------------------------+
|                                    PROVENANCE AUTHORITY TIERS                                    |
+--------------------------------------------------------------------------------------------------+
|  TIER 1: ACCREDITED DIAGNOSTIC LABORATORIES                                                      |
|  • Institutions: CLIA-certified, CAP-accredited molecular genetics laboratories.                |
|  • Assay Types: Next-Generation Sequencing (NGS), Sanger Confirmation, Chromosomal Microarray.   |
|  • Credential Artifact: Digitally signed HL7/FHIR Genomics DiagnosticReport or certified PDF.    |
|                                                                                                  |
|  TIER 2: LICENSED MEDICAL GENETICS PROFESSIONALS                                                 |
|  • Actors: Board-Certified Clinical Geneticists (ABMGG, EBMG), Certified Genetic Counselors.    |
|  • Mandate: Clinical pedigree verification, HPO phenotypic documentation, diagnostic sign-off.   |
|  • Credential Artifact: Institutional NPI/Medical License signature attached to clinical note.   |
|                                                                                                  |
|  TIER 3: PUBLIC REFERENCE KNOWLEDGEBASES                                                         |
|  • Sources: ClinVar, gnomAD, OMIM, ClinGen, PharmGKB.                                            |
|  • Function: Population frequency priors, consensus pathogenicity classifications.              |
|                                                                                                  |
|  TIER 4: REJECTED / ZERO-AUTHORITY INPUTS (UNAUTHORIZED FOR GRADIENT TRAINING)                  |
|  • Anecdotal patient self-reports ("My grandmother had brittle bones").                         |
|  • Unverified commercial direct-to-consumer raw exports without clinical validation.             |
|  • Outputs from other unverified generative AI models or synthetic chat engines.                |
+--------------------------------------------------------------------------------------------------+
```

---

## 10. The Multi-Stage Data Ingestion and Validation Pipeline

Before any clinical record is converted into training tokens for an adapter update, it must execute a deterministic 7-stage validation pipeline:

```text
Raw Clinical Submission (VCF, HL7, Pedigree JSON, Signed Notes)
                            |
                            v
+------------------------------------------------------------------------+
| STAGE 1: CRYPTOGRAPHIC IDENTITY & CONSENT VERIFICATION                 |
| • Verify digital signatures of submitting medical authority.          |
| • Validate dynamic patient consent token against enterprise ledger.    |
+------------------------------------------------------------------------+
                            |
                            v
+------------------------------------------------------------------------+
| STAGE 2: SYNTAX & ONTOLOGICAL CONFORMANCE VALIDATION                   |
| • Validate VCF 4.2 / HGVS v20.05 nomenclature conformance.            |
| • Normalize all phenotype entries to exact Human Phenotype Ontology.   |
+------------------------------------------------------------------------+
                            |
                            v
+------------------------------------------------------------------------+
| STAGE 3: PEDIGREE TOPOLOGY CONSISTENCY VERIFICATION                   |
| • Check DAG acyclicity: Assert no circular ancestry loops.             |
| • Verify biological sex invariants against designated parent roles.   |
+------------------------------------------------------------------------+
                            |
                            v
+------------------------------------------------------------------------+
| STAGE 4: GENETIC TRANSMISSION FEASIBILITY CHECK                        |
| • Detect impossible Mendelian events (e.g., homozygous child from     |
|   two confirmed homozygous wild-type parents).                         |
| • Flag suspected non-paternity or sample swaps for clinical review.   |
+------------------------------------------------------------------------+
                            |
                            v
+------------------------------------------------------------------------+
| STAGE 5: CROSS-LABORATORY CONFLICT RESOLUTION                          |
| • Detect discrepant variant assertions across historical reports.      |
| • If unresolved: Mark variant state as CONFLICTING; route to human.   |
+------------------------------------------------------------------------+
                            |
                            v
+------------------------------------------------------------------------+
| STAGE 6: HISTORICAL REPLAY INTEGRATION & TRAINING EMISSION             |
| • Extract 25% representative replay vectors from ancestral checkpoints.|
| • Synthesize SFT training pairs (Tokens + Target Deductive Proofs).    |
+------------------------------------------------------------------------+
                            |
                            v
+------------------------------------------------------------------------+
| STAGE 7: GATEWAY AUTHORIZATION SIGN-OFF                                |
| • Medical Geneticist cryptographic sign-off unlocks gradient updates.  |
+------------------------------------------------------------------------+
```

---

## 11. Handling Nonexistent, Ghost, and Synthetic Individuals

A critical clinical vulnerability occurs when a user or clinical note references an unverified family member (e.g., *"The patient mentions a paternal uncle who had early seizures, but no records exist"*).

### 11.1 The Ghost Individual Protocol

GenInherit-LLM formalizes unverified individuals under the `GHOST_NODE` protocol:

```text
[IND:II-3] [STATUS:UNVERIFIED_ANECDOTAL] [TYPE:GHOST_NODE]
  [RELATION:PATERNAL_UNCLE] [PARENTS:I-1,I-2]
  [GENOTYPE:UNVERIFIED_UNKNOWN]
  [PHENOTYPE_ANECDOTAL:HP:0001250 (Seizures)]
  [TRAINING_ELIGIBILITY:ZERO_WEIGHT_MASKED]
```

* **Zero-Weight Gradient Masking:** During loss computation, token positions corresponding to ghost individuals are multiplied by a loss mask $M_t = 0$. The model learns to *refer* to their existence during conversational clinical intake, but **zero parameter weight shifts occur based on unverified persons**.

### 11.2 The Synthetic Individual Research Protocol

In academic and educational modes (Mode A), pedigrees frequently contain synthetic individuals:
* `[SYNTHETIC_INDIVIDUAL:TRUE]` token is permanently prepended.
* Prevents accidental cross-contamination of research benchmarks with clinical validation pipelines.

---

## 12. Epistemological Rigor: Unknown Status vs. Negative Status

A catastrophic failure mode in algorithmic genetics is treating an absence of testing as equivalent to a wild-type (negative) result.

```text
+--------------------------------------------------------------------------------------------------+
|                              THE EPISTEMIC FALLACY OF GENOMICS                                   |
+--------------------------------------------------------------------------------------------------+
|                               ABSENCE OF EVIDENCE != EVIDENCE OF ABSENCE                         |
|                                                                                                  |
|  TRADITIONAL BUG:                                                                                |
|  Mother has no variant record in database  ---> Code assigns: Mother_Genotype = "WT/WT" (0/0)   |
|                                            ---> Result: Model deduces "De Novo Mutation" in child|
|                                            ---> Clinical Impact: CATASTROPHIC MISDIAGNOSIS       |
|                                                                                                  |
|  GENINHERIT-LLM PROTOCOL:                                                                        |
|  Mother has no variant record in database  ---> System assigns: Mother_Genotype = UNTESTED (./.) |
|                                            ---> Result: Model deduces "Lineage Indeterminate;    |
|                                                 Maternal Carrier State cannot be excluded."      |
|                                            ---> Clinical Impact: CLINICALLY CORRECT & SAFE       |
+--------------------------------------------------------------------------------------------------+
```

### 12.1 The Four Discrete Epistemic States

For every variant-individual intersection, GenInherit-LLM enforces one of four immutable states:

```text
+---------------------+-----------------------------------------------------------------------------+
| EPISTEMIC STATE     | CLINICAL DEFINITION & MATHEMATICAL ENCODING                                 |
+---------------------+-----------------------------------------------------------------------------+
| 1. VERIFIED_PRESENT | Molecular assay confirmed variant presence (Heterozygous, Homozygous, Hemi).|
| 2. VERIFIED_ABSENT  | Molecular assay confirmed variant absence (Homozygous Wild-Type, WT/WT).    |
| 3. CONFLICTING      | Multiple certified lab reports present discordant classifications/assays.    |
| 4. STRICT_UNKNOWN   | Individual has not undergone molecular testing for this specific locus.     |
+---------------------+-----------------------------------------------------------------------------+
```

---

## 13. Formal Genetic Representation Schema

All genetic variants must conform to the following JSON validation schema before tokenization:

```json
{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "title": "GenInheritVariantRecord",
  "type": "object",
  "required": [
    "variant_id",
    "individual_id",
    "chromosome",
    "position_hg38",
    "reference_allele",
    "alternate_allele",
    "hgvs_c",
    "zygosity",
    "epistemic_status",
    "source_laboratory"
  ],
  "properties": {
    "variant_id": { "type": "string", "pattern": "^VAR_[A-Za-z0-9_]+$" },
    "individual_id": { "type": "string", "pattern": "^IND_[A-Za-z0-9_]+$" },
    "chromosome": { "type": "string", "enum": ["chr1","chr2","chr3","chr4","chr5","chr6","chr7","chr8","chr9","chr10","chr11","chr12","chr13","chr14","chr15","chr16","chr17","chr18","chr19","chr20","chr21","chr22","chrX","chrY","chrM"] },
    "position_hg38": { "type": "integer", "minimum": 1 },
    "reference_allele": { "type": "string", "pattern": "^[ACGTN]+$" },
    "alternate_allele": { "type": "string", "pattern": "^[ACGTN]+$" },
    "gene_symbol": { "type": "string", "pattern": "^[A-Z0-9]+$" },
    "hgvs_c": { "type": "string", "pattern": "^c\\.[0-9]+.*$" },
    "hgvs_p": { "type": "string", "pattern": "^p\\.[A-Z][a-z]{2}[0-9]+.*$" },
    "zygosity": { "type": "string", "enum": ["HETEROZYGOUS", "HOMOZYGOUS_ALT", "HEMIZYGOUS", "HOMOZYGOUS_REF", "UNKNOWN"] },
    "epistemic_status": { "type": "string", "enum": ["VERIFIED_PRESENT", "VERIFIED_ABSENT", "CONFLICTING", "STRICT_UNKNOWN"] },
    "acmg_classification": { "type": "string", "enum": ["PATHOGENIC", "LIKELY_PATHOGENIC", "VUS", "LIKELY_BENIGN", "BENIGN", "UNCLASSIFIED"] },
    "source_laboratory": {
      "type": "object",
      "required": ["lab_name", "clia_id", "report_date"],
      "properties": {
        "lab_name": { "type": "string" },
        "clia_id": { "type": "string" },
        "report_date": { "type": "string", "format": "date" }
      }
    }
  }
}
```

---

## 14. Formal Phenotypic Representation Schema

Longitudinal phenotypic records are formalized using structured Human Phenotype Ontology entries:

```json
{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "title": "GenInheritPhenotypeLedger",
  "type": "object",
  "required": [
    "phenotype_id",
    "individual_id",
    "hpo_term_id",
    "hpo_label",
    "age_at_onset_years",
    "verification_tier"
  ],
  "properties": {
    "phenotype_id": { "type": "string" },
    "individual_id": { "type": "string" },
    "hpo_term_id": { "type": "string", "pattern": "^HP:[0-9]{7}$" },
    "hpo_label": { "type": "string" },
    "age_at_onset_years": { "type": "number", "minimum": 0.0, "maximum": 120.0 },
    "observation_date": { "type": "string", "format": "date" },
    "clinical_severity": { "type": "string", "enum": ["MILD", "MODERATE", "SEVERE", "PROFOUND", "VARIABLE"] },
    "verification_tier": { "type": "string", "enum": ["CLINICIAN_CONFIRMED", "PATIENT_REPORTED", "SUSPECTED", "RULED_OUT"] }
  }
}
```

---

## 15. Comprehensive Taxonomy of Supported Inheritance Mechanisms

GenInherit-LLM is engineered to reason over the full biological spectrum of human genetic transmission:

```text
====================================================================================================
                        SUPPORTED INHERITANCE REASONING TAXONOMY
====================================================================================================

1. AUTOSOMAL DOMINANT (AD)
   - Transmission Probability: 50% from affected parent to offspring regardless of sex.
   - Special Mechanics: Incomplete penetrance modeling, variable expressivity tracking.
   - Classical Example: Huntington Disease (HTT), Marfan Syndrome (FBN1).

2. AUTOSOMAL RECESSIVE (AR)
   - Transmission Probability: 25% affected, 50% carrier from two heterozygous carrier parents.
   - Special Mechanics: Compound heterozygosity in trans vs. cis; Consanguinity coefficient integration.
   - Classical Example: Cystic Fibrosis (CFTR), Sickle Cell Disease (HBB).

3. X-LINKED RECESSIVE (XLR)
   - Transmission Probability: Carrier mothers transmit to 50% of sons (affected) and 50% of 
     daughters (carriers). Affected fathers transmit carrier status to 100% of daughters; 0% of sons.
   - Special Mechanics: Skewed X-inactivation (Lyonization) resulting in manifesting female carriers.
   - Classical Example: Duchenne Muscular Dystrophy (DMD), Hemophilia A (F8).

4. X-LINKED DOMINANT (XLD)
   - Transmission Probability: Affected father transmits to 100% of daughters and 0% of sons.
   - Special Mechanics: Male lethality tracking (skewed sex ratio in offspring).
   - Classical Example: Rett Syndrome (MECP2), Incontinentia Pigmenti (IKBKG).

5. MITOCHONDRIAL (NON-MENDELIAN MATERNAL)
   - Transmission Probability: Exclusively transmitted from affected mother to 100% of offspring.
   - Special Mechanics: Heteroplasmy threshold variation across siblings; Zero paternal transmission.
   - Classical Example: MELAS Syndrome, Leber Hereditary Optic Neuropathy (LHON).

6. Y-LINKED (HOLANDRIC)
   - Transmission Probability: Direct, uninterrupted transmission from father to 100% of sons.
   - Classical Example: SRY-related sex determination, Y-chromosome microdeletions (AZF).

7. DE NOVO MUTATION EVENTS
   - Transmission Probability: Variant present in proband but demonstrably absent in both confirmed 
     biological parents.
   - Special Mechanics: Parental germline mosaicism probability modeling.
====================================================================================================
```

---

## 16. Handling Volumetric Family Growth Across Generations

As family pedigrees expand across multi-decade generational updates, memory management becomes paramount:

```text
Generation I   : 4 Founders   --> ~12 Variant Records  --> Easily fits in Single Context
Generation II  : 8 Descendants--> ~40 Variant Records  --> Low Context Consumption
Generation III : 18 Members   --> ~110 Variant Records --> Moderate Context Consumption
Generation IV  : 36 Members   --> ~280 Variant Records --> High Context Consumption
Generation V   : 70+ Members  --> ~600+ Variant Records--> RISKS TRADITIONAL CONTEXT OVERFLOW
```

### 16.1 The Parametric Compression Solution

GenInherit-LLM solves the volumetric expansion problem: **As the family grows, the 7B base model parameter size DOES NOT expand to 13B or 70B.**

Instead, ancestral generations ($G_1, G_2$) undergo **parametric compression**:
1. Raw ancestral laboratory reports are archived in certified cold storage.
2. Ancestral variant distributions and transmission paths are permanently internalized into the low-rank adapter weights ($\Delta W_k$).
3. The active inference prompt needs only to supply the immediate local sub-pedigree (e.g., parents, siblings, proband), while the adapted neural weights natively store the deep ancestral knowledge.

---

## 17. The Five-Level Biomedical Evidence Hierarchy

When formulating explanations, GenInherit-LLM strictly delineates statements using a 5-tier epistemic hierarchy, preventing inference from being conflated with empirical observation:

```text
[LEVEL 1: EMPIRICAL LABORATORY ASSAY] (Highest Certainty)
"The CLIA-certified NGS report (LabID: 8812) confirms heterozygous variant c.123A>G in Proband."
                              |
                              v
[LEVEL 2: CERTIFIED PEDIGREE RELATIONSHIP]
"Proband III-1 is the certified biological offspring of Father II-1 and Mother II-2."
                              |
                              v
[LEVEL 3: EXPERT CLINICAL REVIEW ASSERTION]
"Attending geneticist asserts phenotypic concordance with Marfanoid habitus at age 14."
                              |
                              v
[LEVEL 4: PUBLIC SCIENTIFIC KNOWLEDGEBASE ASSERTION]
"ClinVar consensus asserts c.123A>G is Pathogenic with 3-star review status (Accession: VCV000012)."
                              |
                              v
[LEVEL 5: MATHEMATICAL MODEL INFERENCE] (Lowest Certainty)
"The observed pedigree distribution is 94.2% consistent with an autosomal dominant transmission 
 pathway exhibiting incomplete penetrance in Generation II."
```

---

## 18. Data Verification and Conflict Resolution State Machine

The following state machine governs the lifecycle of every incoming clinical data point:

```text
                        +----------------------+
                        |   UNVERIFIED INPUT   |
                        +----------------------+
                                   |
                     [Assay & Identity Validated?]
                                   |
                    +--------------+--------------+
                    |                             |
                 [YES]                           [NO]
                    |                             |
                    v                             v
         +--------------------+        +--------------------+
         |   VALIDATED DATA   |        |   REJECTED / QUAR  |
         +--------------------+        +--------------------+
                    |
      [Prior Discordant Records Exist?]
                    |
     +--------------+--------------+
     |                             |
   [NO]                          [YES]
     |                             |
     v                             v
+--------------------+   +--------------------+
|  TRAINING ELIGIBLE |   |  CONFLICT DETECTED |
+--------------------+   +--------------------+
     |                             |
[Gradient Update]         [Human Expert Review]
     |                             |
     v                     +-------+-------+
+--------------------+     |               |
| ACTIVE PARAMETRIC  |  [RESOLVED]   [UNRESOLVABLE]
|     KNOWLEDGE      |     |               |
+--------------------+     v               v
                   +----------------+ +----------------+
                   | RETRAIN ADAPT  | | TAGGED CONFLICT|
                   +----------------+ | (NO GRADIENT)  |
                                      +----------------+
```

---

## Summary of Volume 2

In this volume, we have specified:
1. The domain corpus and the 7-tier instruction dataset taxonomy (including counterfactuals and negative controls).
2. The Minimum Viable Case (MVC) criteria and the biological reality of germline stability versus longitudinal phenotypic evolution.
3. The formal grammar of Pedigree Structural Tokenization (PSTS-v1).
4. The multi-stage automated validation pipeline enforcing clinical provenance and consent.
5. The epistemic distinction between missing data (`STRICT_UNKNOWN`) and negative test results (`VERIFIED_ABSENT`).
6. The JSON validation schemas for molecular variants and longitudinal HPO phenotypes.
7. The comprehensive taxonomy of seven supported human inheritance mechanisms.
8. The 5-level biomedical evidence hierarchy and the conflict resolution state machine.

*The architectural specification continues in **Volume 3: Model Architecture, Training Pipeline, and Continual Learning**.*
