import React from 'react';
import { Navbar } from '../components/layout/Navbar';
import { HeroSection } from '../components/hero/HeroSection';
import { ProblemSection } from '../sections/ProblemSection';
import { AdapterArchitecture } from '../sections/AdapterArchitecture';
import { WorkflowSection } from '../sections/WorkflowSection';
import { PedigreeExplorer } from '../sections/PedigreeExplorer';
import { EvidenceSection } from '../sections/EvidenceSection';
import { WorkspaceShowcase } from '../sections/WorkspaceShowcase';
import { InheritanceSimulator } from '../sections/InheritanceSimulator';
import { IntegrationSection } from '../sections/IntegrationSection';
import { SecuritySection } from '../sections/SecuritySection';
import { ResearchSection } from '../sections/ResearchSection';
import { FinalCTASection } from '../sections/FinalCTASection';
import { Footer } from '../components/layout/Footer';

export const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-midnight text-text-primary selection:bg-cyan-electric selection:text-midnight flex flex-col font-sans">
      {/* 01: Premium Floating Navigation */}
      <Navbar />

      {/* Main Content Sections */}
      <main className="flex-grow">
        {/* 02: Immersive 3D DNA Hero Experience */}
        <HeroSection />

        {/* 03: The Problem: Genetics Is More Than a Single Variant */}
        <ProblemSection />

        {/* 04: The Core Innovation: One Foundation. Isolated Family Intelligence */}
        <AdapterArchitecture />

        {/* 05: How It Works: 5-Stage Scientific Pipeline */}
        <WorkflowSection />

        {/* 06: Interactive Pedigree Explorer Canvas */}
        <PedigreeExplorer />

        {/* 07: Evidence Integrity & Epistemic Reasoning */}
        <EvidenceSection />

        {/* 08: Three Specialized Role Workspaces (Researcher, Student, Doctor) */}
        <WorkspaceShowcase />

        {/* 09: Interactive Inheritance Simulator & Punnett Square */}
        <InheritanceSimulator />

        {/* 10: Scientific Output & HL7 FHIR R4 Clinical Integration */}
        <IntegrationSection />

        {/* 11: Privacy, Bioethics & Responsible Intelligence */}
        <SecuritySection />

        {/* 12: Research & Empirical DGX B200 Validation Dashboard */}
        <ResearchSection />

        {/* 13: Final Dramatic Call to Action */}
        <FinalCTASection />
      </main>

      {/* 14: Premium Footer & Clinical Disclaimers */}
      <Footer />
    </div>
  );
};

export default App;
