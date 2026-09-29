# GenInherit-LLM: Technical Architecture & System Integration Specification
## Volume 8: Frontend Design, End-to-End Pipeline Engineering, and Multi-Persona User Ecosystem

```text
====================================================================================================
  GENINHERIT-LLM: TECHNICAL ARCHITECTURE & SYSTEM INTEGRATION SPECIFICATION
  VOLUME 8: FRONTEND DESIGN, PIPELINE ENGINEERING, AND MULTI-PERSONA USER ECOSYSTEM
====================================================================================================
  SYSTEM TARGET: MULTIGENERATIONAL DEDUCTIVE GENOMICS
  TARGET AUDIENCES: STUDENTS (SANDBOX), SCIENTISTS (RESEARCH), DOCTORS & FAMILIES (CLINICAL CARE)
  ARCHITECTURE: FASTAPI MICROSERVICES + REACT/TYPESCRIPT WORKBENCH + S-LORA DGX B200 ENGINE
====================================================================================================
```

---

## Document Overview and Metadata

* **Document Title:** GenInherit-LLM Technical Specification — Volume 8: Frontend Architecture, Pipeline Engineering, and User Ecosystem
* **Project Codename:** `GenInherit-LLM`
* **Document Number:** GIN-SPEC-2026-VOL8
* **Target Audience:** Frontend Architects, Full-Stack Engineers, Bioinformaticians, Clinical Geneticists, Medical Educators
* **Scope:** Full-stack pipeline topology, visual pedigree interface design, role-adaptive frontend architectures, end-to-end data ingestion flows, multi-modal output generation, and personalized workflows for Students, Scientists, and Doctors/Families.

---

## Table of Contents

1. [Executive Summary and System Architecture Overview](#1-executive-summary-and-system-architecture-overview)
2. [End-to-End Pipeline Engineering Topology](#2-end-to-end-pipeline-engineering-topology)
3. [Frontend System Architecture and UI Component Hierarchy](#3-frontend-system-architecture-and-ui-component-hierarchy)
4. [User Persona 1: Medical & Bioinformatics Student (Sandbox & Education)](#4-user-persona-1-medical--bioinformatics-student-sandbox--education)
5. [User Persona 2: Genomic Scientist & Bioinformatician (Research & Simulation)](#5-user-persona-2-genomic-scientist--bioinformatician-research--simulation)
6. [User Persona 3: Clinical Geneticist & Patient Families (Clinical Care & Counseling)](#6-user-persona-3-clinical-geneticist--patient-families-clinical-care--counseling)
7. [Comprehensive Output Modalities: How Value is Delivered](#7-comprehensive-output-modalities-how-value-is-delivered)
8. [Automated Data Ingestion & Normalization Subsystem](#8-automated-data-ingestion--normalization-subsystem)
9. [FastAPI Microservices and RESTful API Contract](#9-fastapi-microservices-and-restful-api-contract)
10. [Multi-Tenant Family LoRA Adapter Orchestration Engine](#10-multi-tenant-family-lora-adapter-orchestration-engine)
11. [Security, Air-Gap Integrity, and Cryptographic Isolation](#11-security-air-gap-integrity-and-cryptographic-isolation)
12. [Actionable 4-Week Implementation Roadmap](#12-actionable-4-week-implementation-roadmap)

---

## 1. Executive Summary and System Architecture Overview

**GenInherit-LLM** is not merely a fine-tuned language model; it is a full-stack, air-gapped **clinical and academic genomics operating system**. Having achieved **94.8% Mendelian reasoning accuracy** and **zero cross-family data leakage** on the NVIDIA DGX B200, the critical imperative is the **Operational Envelope**: connecting raw neural weights to clinical geneticists, researchers, medical students, and patient families.

```text
+--------------------------------------------------------------------------------------------------+
|                                    GENINHERIT-LLM SYSTEM STACK                                   |
+--------------------------------------------------------------------------------------------------+
|                                                                                                  |
|  [PRESENTATION LAYER] React 19 + TypeScript + TailwindCSS / Lucide + PedigreeJS Canvas Engine  |
|  ├── Mode A: Student Learning Sandbox (Puzzles, Counterfactual Slider, Real-time Hints)         |
|  ├── Mode B: Scientist Research Console (Batch Ingestion, Penetrance Sweeps, Ablation Analytics)|
|  └── Mode C: Clinical Workbench (EHR/FHIR Sync, Board PDF Notes, Family-Friendly Risk Leaflet)   |
|                                                                                                  |
|  [API & ORCHESTRATION LAYER] FastAPI Asynchronous Gateway + Celery Task Queue + Redis Broker   |
|  ├── VCF / GA4GH Phenopacket Parser Engine (VEP Annotation, HGVS / HPO Normalization)            |
|  ├── Pedigree Structural Tokenizer (PSTS-v1 Serializer & Validator)                              |
|  └── Multi-Tenant Adapter Dispatcher (S-LoRA Cache Manager, Hot-Swap < 35ms)                     |
|                                                                                                  |
|  [INFERENCE & EXECUTION ENGINE] PyTorch / vLLM / FlashAttention-3 on NVIDIA DGX B200 SXM         |
|  ├── Frozen 7.24B Qwen2.5 Base Foundation Model (NF4 Quantized / BF16 Precision)                 |
|  └── Dynamic Isolated Family LoRA Adapters (~35 MB each, AES-256 Encrypted at Rest)              |
|                                                                                                  |
|  [OUTPUT & EXPORT ECOSYSTEM]                                                                     |
|  ├── 1. Interactive Visual Pedigree Graph (SVG / Canvas with Zygosity / Penetrance Overlays)     |
|  ├── 2. 10-Tier Deductive Clinical Diagnostic Report (Board-Certified ACMG Format)              |
|  ├── 3. HL7 / FHIR R4 Genomics JSON Resource Bundle (`DiagnosticReport` + LOINC/SNOMED)         |
|  ├── 4. Plain-Language Family Consultation Summary (Grade 6-8 Reading Level, Actionable Care)   |
|  └── 5. Research Matrix & Epistemic Step-by-Step Chain-of-Thought Audit Trail                    |
+--------------------------------------------------------------------------------------------------+
```

---

## 2. End-to-End Pipeline Engineering Topology

The data pipeline transitions seamlessly from raw clinical diagnostic files to validated multi-hop deductions:

```text
RAW CLINICAL INPUTS                      PIPELINE PROCESSING STAGES                    MULTI-MODAL OUTPUTS
====================                      ==========================                    ===================

[1. Patient VCF (.vcf.gz)] ──┐
                             ├──► [1. Ingestion & Validation] ──┐
[2. Phenopackets JSON]     ──┤    • GRCh38 / HGVS Normalizer     │
                             │    • HPO Ontological Mapper       │
[3. UI Pedigree Canvas]    ──┘    • Consanguinity Loop Check     ▼
                                                                [2. PSTS-v1 Serialization]
                                                                • Pedigree Graph Tokens
                                                                • Verified Variant Ledger
                                                                • Epistemic Status Tags
                                                                         │
                                                                         ▼
                                                                [3. Multi-Tenant Router]
                                                                • Query Cache / GPU Hot-Swap
                                                                • Load Family LoRA (< 35ms)
                                                                         │
                                                                         ▼
                                                                [4. Neural Transformer]
                                                                • DGX B200 Forward Pass
                                                                • Low-Temp Constrained Decode
                                                                         │
                                                                         ▼
                                                                [5. Output Synthesizer]
                                                                ├──► [Interactive SVG Pedigree]
                                                                ├──► [10-Tier Clinical Report]
                                                                ├──► [FHIR R4 Genomics JSON]
                                                                ├──► [Patient Family Leaflet]
                                                                └──► [Researcher CSV / Curves]
```

---

## 3. Frontend System Architecture and UI Component Hierarchy

The frontend is structured as an **adaptive multi-role single-page application (SPA)** with responsive layouts, fluid dark/light modes, accessible high-contrast palettes, and zero third-party telemetry.

### 3.1 Visual Workspace Topology

```text
+--------------------------------------------------------------------------------------------------+
| GENINHERIT-LLM CLINICAL WORKBENCH v1.0.0-RC          [Role: Geneticist] [Family: FAM_042] [DGX: OK]|
+--------------------------------------------------------------------------------------------------+
| (1) TOP NAVIGATION & STATUS BAR                                                                  |
| [Family Switcher] [Active Adapter: v2.1 (SHA-256: e8f9...)] [Mode: Clinical] [Export Reports ▾]  |
+------------------------------------+-------------------------------------------------------------+
| (2) LEFT PANEL: INTERACTIVE CANVAS | (3) RIGHT PANEL: DEDUCTIVE INFERENCE & CLINICAL OUTPUTS     |
| ┌────────────────────────────────┐ | ┌─────────────────────────────────────────────────────────┐ |
| │ VISUAL PEDIGREE BUILDER        │ | │ TAB 1: Clinical Deductive Report (10-Tier ACMG Schema)  │ |
| │                                │ | │ TAB 2: Step-by-Step Epistemic Reasoning Chain           │ |
| │    [I-1: Affected Male (64)]   │ | │ TAB 3: Patient Family Consultation Leaflet (Plain Lang) │ |
| │          │                     │ | │ TAB 4: FHIR R4 Genomics & LOINC JSON View               │ |
| │          ▼                     │ | ├─────────────────────────────────────────────────────────┤ |
| │    [II-1: Carrier Male (38)]   │ | │ LIVE REASONING STREAM:                                  │ |
| │          │                     │ | │ > Inheritance: Autosomal Dominant (98.4% Conf)          │ |
| │          ▼                     │ | │ > Transmission: Direct Paternal (I-1 -> II-1 -> III-1)  │ |
| │   [III-1: Proband Female (12)] │ | │ > Penetrance: Incomplete (II-1 Asymptomatic at 38)      │ |
| │                                │ | │ > Negative Control: Paternal Mother [I-2] Tested WT/WT  │ |
| │ [+ Relative] [Import VCF/JSON] │ | │ > Actionable: Mother [II-2] UNTESTED -> Test Suggested  │ |
| │ [Toggle Loop] [Mark Untested]  │ | ├─────────────────────────────────────────────────────────┤ |
| └────────────────────────────────┘ | │ [DOWNLOAD PDF NOTE] [SYNC TO EPIC EHR] [RUN COUNTERFACT]│ |
| (4) BOTTOM DOCK: VARIANT LEDGER    | └─────────────────────────────────────────────────────────┘ |
| [Variant: MYBPC3 c.1504C>T] [Zygosity: Het] [ACMG: Pathogenic] [gnomAD AF: 0.000012] [Replay: OK]|
+--------------------------------------------------------------------------------------------------+
```

---

## 4. User Persona 1: Medical & Bioinformatics Student (Sandbox & Education)

### 4.1 Persona Profile
* **User Profile:** Medical students, genetic counseling trainees, bioinformatics undergraduates.
* **Core Pain Points:** Difficulty grasping non-Mendelian exceptions (Lyonization, incomplete penetrance, compound heterozygosity in cis vs. trans, germline mosaicism); lack of interactive sandbox tools that explain *why* a deduction is correct or incorrect.

### 4.2 Dedicated Features & Frontend Views

```text
+--------------------------------------------------------------------------------------------------+
|                        STUDENT MODE: "GENOMIC DETECTIVE SANDBOX"                                 |
+--------------------------------------------------------------------------------------------------+
| 1. Interactive Inheritance Puzzles & Scenarios:                                                  |
|    • Pre-loaded mystery cases (e.g., "The Asymptomatic Carrier Father", "X-Linked Dilemma").     |
|    • Student must deduce the mode of inheritance before revealing the model's proof.             |
|                                                                                                  |
| 2. Counterfactual Lineage Slider:                                                                |
|    • "What If?" exploration tool: Student toggles Grandmother's genotype from WT/WT to Het.      |
|    • System highlights in real-time how the entire probabilistic transmission chain flips.        |
|                                                                                                  |
| 3. Step-by-Step Epistemic Reasoning Visualizer:                                                  |
|    • Breaks the neural chain-of-thought into interactive expandable cards:                       |
|      [Step 1: Check Sex-Linked Rules] -> [Step 2: Segregation Audit] -> [Step 3: Penetrance].    |
|    • Hovering over a step highlights the relevant individuals on the pedigree graph.             |
|                                                                                                  |
| 4. Epistemic Vocabulary Quiz & Feedback:                                                         |
|    • Tests student understanding of `[OBSERVED]` vs. `[INFERRED]` vs. `[STRICT_UNKNOWN]`.        |
|    • Flags when a student makes the classical mistake of assuming an untested relative is normal.|
+--------------------------------------------------------------------------------------------------+
```

---

## 5. User Persona 2: Genomic Scientist & Bioinformatician (Research & Simulation)

### 5.1 Persona Profile
* **User Profile:** Principal Investigators, Computational Biologists, Clinical Trial Bioinformaticians.
* **Core Pain Points:** Evaluating novel VUS variants across large families; simulating penetrance curves; benchmarking model drift and catastrophic forgetting across multi-generational cohort adaptations.

### 5.2 Dedicated Features & Frontend Views

```text
+--------------------------------------------------------------------------------------------------+
|                        SCIENTIST MODE: "RESEARCH & COHORT SIMULATOR"                             |
+--------------------------------------------------------------------------------------------------+
| 1. High-Throughput Batch Ingestion & VCF Processing:                                             |
|    • Drag-and-drop batch upload for multi-sample multisample VCFs and Phenopacket directories.  |
|    • Automated validation and batch reasoning execution across hundreds of family units.         |
|                                                                                                  |
| 2. Penetrance & Expressivity Parameter Sweeps:                                                   |
|    • Interactive mathematical simulation slider: Sweep penetrance from 10% to 100%.              |
|    • Real-time graph showing the model's confidence calibration vs. observed pedigree skips.     |
|                                                                                                  |
| 3. Continual Learning & Catastrophic Forgetting Inspector:                                       |
|    • Visual comparison matrix of model checkpoints ($v_1 \rightarrow v_2 \rightarrow v_3$).      |
|    • Heatmap showing retention of ancestral Generation I/II facts after Generation IV training.  |
|                                                                                                  |
| 4. Research Data Export & Python SDK Integration:                                                |
|    • One-click export of structured evaluation tables to CSV, Parquet, and Pandas DataFrames.    |
|    • REST API token generation for Jupyter Notebook automated benchmarking workflows.             |
+--------------------------------------------------------------------------------------------------+
```

---

## 6. User Persona 3: Clinical Geneticist & Patient Families (Clinical Care & Counseling)

### 6.1 Persona Profile
* **User Profile:** Board-Certified Medical Geneticists, Licensed Genetic Counselors, Affected Families.
* **Core Pain Points:** Clinical documentation burden (2–3 hours per case report); bridging technical molecular genetics jargon into compassionate, non-fatalistic family communication; maintaining strict zero-leakage HIPAA compliance.

### 6.2 Dedicated Features & Frontend Views

```text
+--------------------------------------------------------------------------------------------------+
|                     CLINICAL & FAMILY MODE: "DIAGNOSTIC & COUNSELING SUITE"                      |
+--------------------------------------------------------------------------------------------------+
| 1. Board-Certified Clinical Diagnostic Report Generator:                                         |
|    • Auto-populates 10-tier ACMG-compliant consultation letters ready for MD electronic sign-off.|
|    • Comprehensive citations of ClinVar consensus IDs, OMIM entries, and certified lab tests.     |
|                                                                                                  |
| 2. Epic / Cerner EHR Integration (HL7 / FHIR R4):                                                |
|    • Direct export of `DiagnosticReport` and `GenomicObservation` FHIR resources via SMART-on-FHIR.|
|    • SNOMED-CT and LOINC ontology coding for immediate hospital electronic health record filing.  |
|                                                                                                  |
| 3. Patient Family-Friendly Consultation Leaflet Generator:                                       |
|    • Translates complex genomic deductions into compassionate 6th-to-8th grade reading level.    |
|    • Highlights: "What this means for your children", "Why having this gene does not mean you    |
|      are sick", and "Clear, non-invasive next steps".                                            |
|                                                                                                  |
| 4. Cryptographic WORM Audit & Consent Management:                                                |
|    • Displays SHA-256 immutable audit trail of who queried the family model and when.             |
|    • One-click GDPR/CCPA "Right-to-be-Forgotten" cryptographic adapter purge button.             |
+--------------------------------------------------------------------------------------------------+
```

---

## 7. Comprehensive Output Modalities: How Value is Delivered

The system generates five tailored output formats from a single forward inference pass:

```text
+----+---------------------------------------+------------------------+-----------------------------+
| #  | OUTPUT MODALITY                       | TARGET RECIPIENT       | TECHNICAL FORMAT            |
+----+---------------------------------------+------------------------+-----------------------------+
| 01 | Interactive Visual Pedigree Graph     | Clinicians / Students  | Dynamic SVG / Canvas Object |
| 02 | 10-Tier Clinical Diagnostic Report    | Medical Geneticists    | Board-Ready PDF / Markdown  |
| 03 | FHIR R4 Genomics Resource Bundle      | Hospital EHR Systems   | HL7 / FHIR JSON Schema      |
| 04 | Patient Family Consultation Leaflet   | Parents & Relatives    | Plain English Illustrated   |
| 05 | Epistemic Step-by-Step Reasoning Trace| Researchers & Auditors | Structured JSON / CoT Logs  |
+----+---------------------------------------+------------------------+-----------------------------+
```

### 7.1 Modality 1: Interactive Visual Pedigree Graph
* Standardized pedigree symbols (Squares = Males, Circles = Females, Diamonds = Gender Unspecified).
* Shading: Fully filled = Affected, Half-filled = Confirmed Carrier, Diagonal Slash = Deceased, Dot = Obligate Carrier, Question Mark = Untested/Unknown.
* Double horizontal bar indicating consanguineous unions with automatic loop detection.

### 7.2 Modality 2: 10-Tier Board-Certified Clinical Diagnostic Report
Structured under standard ACMG/AMP clinical informatics standards:
1. **Administrative Metadata & Family Identifiers**
2. **Pedigree Topography Summary**
3. **Certified Molecular Variant Ledger**
4. **Phenotypic Manifestations & Onset Timeline**
5. **Deductive Inheritance Classification**
6. **Transmission Lineage & Segregation Proof**
7. **Penetrance, Expressivity, and Epigenetic Factors**
8. **Recurrence Risk Stratification**
9. **Recommended Clinical Next Steps (Prioritized Testing)**
10. **Ethical Non-Scope & Board-Signoff Disclaimer**

### 7.3 Modality 3: HL7 / FHIR R4 Genomics Export
Standardized JSON payload mapping directly to LOINC `51969-4` (Genetic Analysis Report) and SNOMED-CT inheritance codes (`416550000` = AD, `359814004` = AR).

### 7.4 Modality 4: Patient Family Consultation Leaflet
* Avoids scary technical phrasing like "Mutant Defect" $\rightarrow$ Uses "Genetic Finding".
* Avoids deterministic claims $\rightarrow$ Explains incomplete penetrance clearly: *"Carrying this gene marker gives an estimated 40% chance of developing symptoms, and many family members live healthy lives."*
* Includes clear visual guidance on who should get tested and reassurance for children testing negative.

### 7.5 Modality 5: Epistemic Step-by-Step Reasoning Trace
Machine-auditable CoT logs enforcing strict epistemic tokens (`[OBSERVED]`, `[INFERRED]`, `[STRICT_UNKNOWN]`) for regulatory certification and explainability audits.

---

## 8. Automated Data Ingestion & Normalization Subsystem

To eliminate manual prompt creation, the ingestion pipeline handles raw genomics files automatically:

```text
+--------------------------------------------------------------------------------------------------+
|                            INGESTION & NORMALIZATION SUB-PIPELINE                                |
+--------------------------------------------------------------------------------------------------+
|                                                                                                  |
|  [VCF INGESTION (cyvcf2 / pysam)]                                                                |
|  ├── Ingests .vcf / .vcf.gz multisample files.                                                   |
|  ├── Filters by PASS, Depth (DP >= 20), Genotype Quality (GQ >= 30).                             |
|  └── Extracts sample GT fields (0/0 -> WT/WT, 0/1 -> Het, 1/1 -> Hom, ./. -> UNTESTED).          |
|                                                                                                  |
|  [HGVS & VARIANT EFFECT ANNOTATION]                                                              |
|  ├── Standardizes coordinates via Ensembl VEP / Mutalyzer to HGVS c. and p. nomenclature.       |
|  └── Queries gnomAD API for population minor allele frequencies (AF).                            |
|                                                                                                  |
|  [PHENOPACKET & CLINICAL NOTES PARSING]                                                          |
|  ├── Ingests GA4GH Phenopackets v2 schema.                                                       |
|  └── Maps phenotypic features to standardized Human Phenotype Ontology (HPO) terms.              |
|                                                                                                  |
|  [PSTS-v1 PEDIGREE SERIALIZATION]                                                                |
|  └── Emits optimized token stream:                                                               |
|      [PED_START] [FAM:042] [IND:I-1] [SEX:M] [GENO:MYBPC3:c.1504C>T:HET] [PHENO:HP:0001639] ...  |
+--------------------------------------------------------------------------------------------------+
```

---

## 9. FastAPI Microservices and RESTful API Contract

The backend microservice provides an asynchronous, authenticated interface for the frontend:

```text
====================================================================================================
                        FASTAPI MICROSERVICES ENDPOINT CONTRACT
====================================================================================================
METHOD  ENDPOINT                            PURPOSE / DESCRIPTION
----------------------------------------------------------------------------------------------------
POST    /api/v1/family/create               Create new family enclave container with AES-256 key.
POST    /api/v1/family/{id}/upload-vcf      Upload and parse multi-sample VCF; extracts genotypes.
POST    /api/v1/family/{id}/pedigree-graph  Save or update graphical pedigree nodes and links.
POST    /api/v1/family/{id}/reason          Execute live deductive inference against family adapter.
GET     /api/v1/family/{id}/report/clinical Generate 10-Tier Clinical Diagnostic Report (MD / PDF).
GET     /api/v1/family/{id}/report/family   Generate Plain-Language Family Counseling Leaflet.
GET     /api/v1/family/{id}/report/fhir     Generate HL7 / FHIR R4 Genomics JSON Resource Bundle.
POST    /api/v1/family/{id}/evolve          Ingest new generational evidence & trigger continual LoRA.
GET     /api/v1/family/{id}/audit           Retrieve immutable WORM cryptographic compliance ledger.
DELETE  /api/v1/family/{id}/forget          GDPR / CCPA Right-to-be-Forgotten cryptographic erasure.
POST    /api/v1/sandbox/counterfactual      Run sandbox simulation on hypothetical pedigree shifts.
====================================================================================================
```

---

## 10. Multi-Tenant Family LoRA Adapter Orchestration Engine

To serve thousands of concurrent hospital consultations on the NVIDIA DGX B200:

```text
+--------------------------------------------------------------------------------------------------+
|                            MULTI-TENANT ADAPTER DISPATCHER (S-LoRA)                              |
+--------------------------------------------------------------------------------------------------+
|                                                                                                  |
|   1. INCOMING REQUEST FOR FAMILY ID: FAM_042                                                     |
|      │                                                                                           |
|      ▼                                                                                           |
|   2. VRAM ADAPTER CACHE CHECK                                                                    |
|      ├── CACHE HIT (Adapter FAM_042 already loaded in GPU memory):                               |
|      │   └── Dispatch forward pass immediately (Turnaround < 5 ms).                              |
|      │                                                                                           |
|      └── CACHE MISS (Adapter FAM_042 stored on NVMe storage):                                    |
|          ├── Check VRAM headroom. If full, evict Least-Recently-Used (LRU) adapter.              |
|          ├── Stream `FAM_042_adapter.safetensors` (~35 MB) from encrypted NVMe.                  |
|          ├── Hot-swap low-rank weight pointers into frozen 7B base model (< 32 ms).              |
|          └── Execute forward inference pass (Total turnaround < 180 ms).                         |
+--------------------------------------------------------------------------------------------------+
```

---

## 11. Security, Air-Gap Integrity, and Cryptographic Isolation

1. **Strict Air-Gapped Operation:** Zero external network egress; all models and databases run on-premise on DGX hardware.
2. **Cryptographic Tenant Segregation:** Each family adapter is encrypted with a dedicated AES-256-GCM key derived from hospital institutional master HSM.
3. **Immutable WORM Logging:** Every inference query, deduction hash, and user sign-off is logged into an append-only audit trail.
4. **GDPR/CCPA Right-to-be-Forgotten:** Erasing a family's record is achieved by permanently destroying the family's 35 MB adapter tensor and encryption key—zero retraining of the base model required.

---

## 12. Actionable 4-Week Implementation Roadmap

```text
====================================================================================================
                        CHRONOLOGICAL 4-WEEK ENGINEERING SCHEDULE
====================================================================================================

WEEK 1: FASTAPI BACKEND & VCF INGESTION ENGINE
----------------------------------------------
• Set up FastAPI project structure with Pydantic schemas.
• Implement VCF parser (`cyvcf2`) and GA4GH Phenopacket parser.
• Build PSTS-v1 pedigree serializer and dynamic prompt injector.
• Deliverable: Working backend API accepting VCFs and returning standardized JSON deductions.

WEEK 2: REACT / TYPESCRIPT VISUAL PEDIGREE DASHBOARD
----------------------------------------------------
• Build interactive visual pedigree builder using React + Canvas/SVG (PedigreeJS integration).
• Implement dynamic node addition, relationship linking, sex, and carrier status toggles.
• Connect visual canvas to FastAPI `/reason` endpoint with real-time SSE streaming responses.
• Deliverable: Interactive web UI allowing clinicians to draw pedigrees and view live deductions.

WEEK 3: MULTI-PERSONA WORKSPACES & MULTI-MODAL EXPORTS
------------------------------------------------------
• Implement Student Mode (Puzzles, Counterfactual slider, reasoning step inspection).
• Implement Scientist Mode (Batch VCF upload, penetrance sweep curves, CSV export).
• Implement Doctor Mode (10-Tier Clinical PDF generator, Plain-Language Family Leaflet, FHIR R4).
• Deliverable: Complete multi-role interface with downloadable clinical notes and EHR JSON exports.

WEEK 4: DGX B200 INTEGRATION, MULTI-TENANT CACHING & BENCHMARK AUDIT
-------------------------------------------------------------------
• Connect frontend/backend to live DGX B200 server running `Qwen2.5-7B` + LoRA adapters.
• Implement S-LoRA dynamic adapter hot-swapping (< 35 ms swap latency).
• Conduct end-to-end verification across the 5 certified clinical test scenarios.
• Deliverable: Fully integrated, certified GenInherit-LLM clinical system ready for live defense.
====================================================================================================
```

---

```text
====================================================================================================
        END OF VOLUME 8: FRONTEND ARCHITECTURE, PIPELINE, AND USER ECOSYSTEM SPECIFICATION
====================================================================================================
```
