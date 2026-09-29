# GenInherit: Role-Specific User Experience & Feature Implementation Specification
## Dedicated User-Centric Blueprint for Research, Student, and Doctor Workflows

```text
====================================================================================================
  GENINHERIT: ROLE-SPECIFIC APPLICATION BLUEPRINT
  FOCUS: (1) FAMILY VARIANT PATTERN IDENTIFICATION & (2) FORWARD INHERITANCE PREDICTION
  TARGET ROLES: 1. RESEARCHER / SCIENTIST | 2. STUDENT / LEARNER | 3. DOCTOR / CLINICIAN & FAMILIES
====================================================================================================
```

---

## Executive Summary

The underlying AI reasoning engine is complete and locked. This document specifies the **user experience (UX), functional feature suites, interactive workflows, and specialized outputs** for the three primary user groups.

Every user interacts with two core clinical genetic capabilities:
1. **Variant Pattern Identification:** Analyzing existing family members, genotypes, and phenotypes to deduce the biological mode of inheritance, transmission path, carrier states, and penetrance history.
2. **Inheritance & Character Prediction:** Projecting forward into future generations, prospective pregnancies, or untested descendants to predict recurrence risk, carrier probabilities, and clinical manifestation timelines.

```text
+--------------------------------------------------------------------------------------------------+
|                                    THE TWO CORE FUNCTIONAL PILLARS                               |
+--------------------------------------------------------------------------------------------------+
|                                                                                                  |
|   PILLAR 1: VARIANT PATTERN IDENTIFICATION           PILLAR 2: INHERITANCE PREDICTION            |
|   (Retrospective & Lineage Deductive Analysis)       (Prospective & Prognostic Risk Forecasting) |
|   ├── Mode of Inheritance Discovery (AD/AR/XLR/MT)   ├── Recurrence Risk Calculation (Future Child)|
|   ├── Segregation & Lineage Tracing (Paternal/Mat)   ├── Carrier Probability in Descendants      |
|   ├── Obligate Carrier Detection & Zygosity Checks   ├── Penetrance-Adjusted Manifestation Odds  |
|   └── Epistemic Data Audit (Observed vs. Unknown)    ├── Actionable Clinical Surveillance Guidance|
|                                                                                                  |
+--------------------------------------------------------------------------------------------------+
```

---

# 1. User Role 1: Genomic Researcher / Scientist

```text
+--------------------------------------------------------------------------------------------------+
| ROLE: RESEARCHER / SCIENTIST                                                                     |
| Primary Motivation : Hypothesis testing, cohort discovery, penetrance modeling, batch analytics  |
| Data Modality      : Multi-sample VCFs, cohort matrices, GWAS logs, raw variant tables           |
| Cognitive Priority : Statistical rigor, mathematical penetrance sweeps, parameter ablations      |
+--------------------------------------------------------------------------------------------------+
```

### 1.1 Task 1: Variant Pattern Identification (Researcher Workflow)
* **High-Throughput Batch Segregation Analysis:**
  * Ingests hundreds of family pedigrees simultaneously (multi-sample VCF + PED files).
  * Automatically categorizes pedigrees into Mendelian vs. Non-Mendelian candidate cohorts.
* **Variant of Uncertain Significance (VUS) Segregation Score:**
  * Computes statistical co-segregation LOD scores across large extended families.
  * Correlates variant zygosity against Human Phenotype Ontology (HPO) terms to reclassify VUS into Likely Pathogenic.
* **Complex Multi-Variant & Digenic Pattern Detection:**
  * Detects epistatic or oligogenic interactions across two different chromosomal loci (e.g., modifier genes altering severity).

### 1.2 Task 2: Forward Inheritance Prediction (Researcher Workflow)
* **Dynamic Penetrance & Expressivity Sweep Simulator:**
  * Interactive parameter sliders allowing the researcher to sweep penetrance rates from $10\%$ to $100\%$ across simulated offspring cohorts.
  * Simulates $N=10,000$ virtual progeny to calculate empirical distribution curves of symptom severity.
* **Population Frequency & Modifier Gene Projection:**
  * Integrates gnomAD minor allele frequency (MAF) with ancestral background to model how regional modifier alleles adjust future inheritance odds.

### 1.3 Researcher-Specific Feature Suite & Tools
1. **Cohort Matrix Inspector:** Interactive heatmap showing variant distribution across $N$ generations and multiple independent family branches.
2. **Batch Simulation Console:** Run CLI-like automated jobs within the UI (e.g., test penetrance thresholds across 500 pedigrees).
3. **Statistical Export Engine:** One-click data exports to CSV, Parquet, R-compatible dataframes, and publication-ready SVG/EPS vector charts.
4. **LoRA Checkpoint Comparator:** Compare reasoning outputs between different model adapter versions ($v_1, v_2, v_3$) to inspect model consistency over time.

---

# 2. User Role 2: Medical & Genetics Student

```text
+--------------------------------------------------------------------------------------------------+
| ROLE: STUDENT / LEARNER / TRAINEE                                                                |
| Primary Motivation : Educational mastery, conceptual understanding, visual feedback, sandbox     |
| Data Modality      : Textbook pedigree scenarios, interactive puzzle modules, quiz challenges    |
| Cognitive Priority : Step-by-step biological rationale, "Why is this true?", counterfactuals    |
+--------------------------------------------------------------------------------------------------+
```

### 2.1 Task 1: Variant Pattern Identification (Student Workflow)
* **"Genomic Detective" Interactive Mystery Cases:**
  * Student is presented with an unlabelled 3-generation family tree with partial clinical symptoms.
  * Student selects candidate inheritance modes (e.g., AD, AR, XLR, XLD, Mitochondrial).
  * System reveals whether the deduction is correct and unlocks the model's step-by-step reasoning proof.
* **Rule Violation & Anti-Hallucination Sandbox:**
  * Student tests impossible patterns (e.g., father-to-son X-linked transmission).
  * UI highlights the biological impossibility with interactive annotations (e.g., *"Father transmits Y-chromosome to male offspring, not X"*).
* **Epistemic Status Training:**
  * Interactive challenges teaching students to properly distinguish `[OBSERVED]` lab data, `[INFERRED]` deductions, and `[STRICT_UNKNOWN]` untested relatives.

### 2.2 Task 2: Forward Inheritance Prediction (Student Workflow)
* **Counterfactual Lineage Slider ("What If?" Engine):**
  * Student changes an ancestor's genotype (e.g., switching Grandmother from $WT/WT$ to $Heterozygous$).
  * UI animates in real-time how the future recurrence risk for the proband's children shifts (e.g., from $0\%$ to $25\%$).
* **Interactive Punnett Square & Lineage Flow Visualizer:**
  * Generates an animated, color-coded gamete segregation diagram linking ancestral alleles down to future offspring probabilities.

### 2.3 Student-Specific Feature Suite & Tools
1. **Interactive Pedigree Puzzle Mode:** Gamified learning modules with progressive difficulty levels (Level 1: Simple Dominant $\rightarrow$ Level 5: Skewed X-Inactivation).
2. **Step-by-Step Reasoning Cards:** Expandable cards displaying each step in the biological deduction with hover-to-highlight node effects.
3. **Glossary & Ontology Tooltips:** Hovering over terms like *Compound Heterozygosity*, *Variable Expressivity*, or *LOD Score* pops up concise medical definitions and diagrams.
4. **Self-Assessment Quiz Generator:** Auto-generates multiple-choice genetics board exam practice questions based on the active pedigree.

---

# 3. User Role 3: Clinical Geneticist / Doctor (and Patient Families)

```text
+--------------------------------------------------------------------------------------------------+
| ROLE: CLINICAL GENETICIST / DOCTOR (WITH FAMILY COUNSELING EXTENSION)                            |
| Primary Motivation : Rapid clinical diagnosis, EHR documentation, patient communication, triage |
| Data Modality      : Patient lab panels, clinical notes, patient-drawn trees, EHR feeds          |
| Cognitive Priority : Clinical actionable guidance, non-deterministic risk, compassionate notes  |
+--------------------------------------------------------------------------------------------------+
```

### 3.1 Task 1: Variant Pattern Identification (Doctor Workflow)
* **Rapid Clinical Pedigree Builder & VCF Parser:**
  * Clinician draws the family tree using intuitive drag-and-drop symbols or uploads a clinical VCF / lab PDF.
  * Instant automated identification of the causal variant, ACMG pathogenicity classification, and transmission pathway.
* **Targeted Testing Triage Recommendation:**
  * System flags which untested family members are the most informative to sequence next to resolve diagnostic ambiguity.
* **Consanguinity & Carrier Screening:**
  * Automatically calculates coefficients of inbreeding and flags shared ancestral alleles in consanguineous marriages.

### 3.2 Task 2: Forward Inheritance Prediction (Doctor & Family Workflow)
* **Pre-Conception & Prenatal Recurrence Risk Calculator:**
  * Calculates exact recurrence probabilities for upcoming pregnancies (e.g., $25\%$ affected, $50\%$ carrier, $25\%$ non-carrier).
* **Penetrance-Adjusted Outcome Prognostication:**
  * Clearly separates *genotype transmission risk* (e.g., $50\%$ chance of inheriting allele) from *clinical disease manifestation risk* (e.g., $60\%$ lifetime penetrance $\rightarrow 30\%$ actual symptom risk).
* **Compassionate, Plain-Language Family Summary Generator:**
  * Auto-generates a patient family consultation leaflet at a 6th-to-8th grade reading level.
  * Reassures parents by explaining that carrying a variant does not guarantee disease and outlines gentle, non-invasive monitoring.

### 3.3 Doctor-Specific Feature Suite & Tools
1. **10-Tier Board-Certified Consultation Note Generator:** Auto-generates formal clinical genetics notes ready for physician sign-off.
2. **HL7 / FHIR R4 Direct EHR Export:** One-click integration sending structured `DiagnosticReport` resources to Epic Beaker or Cerner.
3. **Patient Family Take-Home Leaflet (PDF):** Beautifully formatted, non-technical educational handout for parents and patients.
4. **Confidentiality & Dynamic Consent Guard:** Cryptographic lock displaying patient consent status and HIPAA/GDPR audit verification.

---

# 4. Comparative Matrix: Feature Alignment Across Roles

```text
+------------------------------------+-----------------------+-----------------------+-----------------------+
| FEATURE / CAPABILITY               | RESEARCHER / SCIENTIST| STUDENT / LEARNER     | DOCTOR / FAMILIES     |
+------------------------------------+-----------------------+-----------------------+-----------------------+
| Core Input Interface               | Multi-VCF / Batch File| Interactive Puzzles   | Visual Canvas / VCF   |
| Pattern Identification View        | Statistical Segreg.   | Detective Mystery Box | ACMG Variant Ledger   |
| Forward Prediction Modality        | Monte Carlo Simulation| Counterfactual Slider | Recurrence Risk Odds  |
| Primary Output Document            | CSV / Parquet Data    | Quiz Score & Rationale| Board Note & EHR FHIR |
| Explanatory Depth                  | Raw Mathematical / LOD| Step-by-Step Pedagogy | Clinical Action Plan  |
| Family Communication Translation   | Not Applicable        | Conceptual Learning   | Plain-Language Leaflet|
| Epistemic Missing Data Focus       | Cohort Imputation     | Educational Anti-Bias | Targeted Test Triage  |
+------------------------------------+-----------------------+-----------------------+-----------------------+
```

---

# 5. Proposed Screen Layouts & User Interaction Blueprints

### 5.1 Research Screen Layout ("Genomic Cohort Laboratory")
* **Left Pane (40%):** Batch family tree tree-view selector + Multi-sample variant filter table.
* **Center Pane (40%):** Monte Carlo penetrance distribution curves + LOD score segregation graphs.
* **Right Pane (20%):** Statistical metrics panel (P-values, allele frequencies, CSV/Parquet export buttons).

### 5.2 Student Screen Layout ("Genetics Detective Sandbox")
* **Top Bar:** Puzzle Scenario selector (e.g., *"Case 14: The Mysterious Carrier Uncle"*).
* **Left Pane (50%):** Interactive pedigree canvas where nodes can be clicked to inspect symptoms or toggled for "What-If?" analysis.
* **Right Pane (50%):** 
  * Top: Multiple-choice inheritance deduction box + "Check My Hypothesis" button.
  * Bottom: Animated Step-by-step reasoning trace with clickable gamete flow diagrams.

### 5.3 Doctor & Family Screen Layout ("Clinical Genetics Suite")
* **Header:** Patient/Family ID, Consent Status, Active LoRA Adapter Version, EHR Connection Status.
* **Left Pane (45%):** Visual clinical pedigree canvas with standard ACMG symbols, shading, and direct VCF drag-and-drop.
* **Right Pane (55%):** 
  * **Tab 1:** Board-Certified 10-Tier Clinical Diagnostic Report (with "Export PDF" & "Push to Epic" buttons).
  * **Tab 2:** Patient Family Consultation Leaflet (Plain English preview with "Print Family Handout").
  * **Tab 3:** Epistemic Lineage & Next Recommended Clinical Tests.

---

# 6. Implementation Architecture & Data Flow

```text
+--------------------------------------------------------------------------------------------------+
|                                    ROLE-ADAPTIVE FRONTEND PIPELINE                               |
+--------------------------------------------------------------------------------------------------+

                                 USER SELECTS ACTIVE ROLE
                                            │
               ┌────────────────────────────┼────────────────────────────┐
               ▼                            ▼                            ▼
       [RESEARCHER MODE]              [STUDENT MODE]               [DOCTOR MODE]
       • Batch VCF Parser             • Puzzle Scenario Loader     • Single Family Canvas
       • LOD Score Calculator         • Gamete Visualizer          • ACMG / HPO Ledger
       • Penetrance Sweep Slider      • "What-If" Genotype Toggle  • FHIR / LOINC Mapper
               │                            │                            │
               └────────────────────────────┼────────────────────────────┘
                                            │
                                            ▼
                           [COMMON BACKEND REASONING ENGINE]
                           (Model weights complete and fixed)
                           • Multi-hop Inheritance Reasoning
                           • Epistemic Status Assignment
                           • Penetrance & Recurrence Probabilities
                                            │
               ┌────────────────────────────┼────────────────────────────┐
               ▼                            ▼                            ▼
       [RESEARCH OUTPUTS]             [STUDENT OUTPUTS]            [CLINICAL OUTPUTS]
       • Cohort Analytics CSV         • Step-by-Step Solved Proof  • ACMG MD Diagnostic Note
       • Penetrance Severity Curve    • Epistemic Concept Badges   • Patient Family Leaflet
       • Publication Vector Graphics  • Board Exam Quiz Feedback   • HL7 / FHIR R4 Bundle
+--------------------------------------------------------------------------------------------------+
```

---

```text
====================================================================================================
  END OF ROLE-SPECIFIC USER EXPERIENCE & FEATURE IMPLEMENTATION SPECIFICATION
====================================================================================================
```
