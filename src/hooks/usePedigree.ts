import { useState } from 'react';
import { SAMPLE_PEDIGREE, type PedigreeMember } from '../data/samplePedigree';

export function usePedigree() {
  const [selectedMember, setSelectedMember] = useState<PedigreeMember>(SAMPLE_PEDIGREE[4]); // Proband III-1
  const [viewMode, setViewMode] = useState<'genotype' | 'phenotype'>('genotype');
  const [showEvidenceOverlay, setShowEvidenceOverlay] = useState<boolean>(true);
  const [highlightPath, setHighlightPath] = useState<boolean>(false);

  const genI = SAMPLE_PEDIGREE.filter((m) => m.generation === 'I');
  const genII = SAMPLE_PEDIGREE.filter((m) => m.generation === 'II');
  const genIII = SAMPLE_PEDIGREE.filter((m) => m.generation === 'III');

  return {
    selectedMember,
    setSelectedMember,
    viewMode,
    setViewMode,
    showEvidenceOverlay,
    setShowEvidenceOverlay,
    highlightPath,
    setHighlightPath,
    genI,
    genII,
    genIII,
    allMembers: SAMPLE_PEDIGREE,
  };
}
