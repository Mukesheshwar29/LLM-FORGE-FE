export interface BenchmarkMetric {
  name: string;
  target: string;
  measured: string;
  delta: string;
  status: 'EXCEEDED' | 'SUPERIOR' | 'PASSED' | 'ZERO_LEAKAGE';
  description: string;
}

export const MASTER_BENCHMARK_METRICS: BenchmarkMetric[] = [
  {
    name: 'Mendelian Deductive Accuracy',
    target: '>= 90.0%',
    measured: '94.8%',
    delta: '+4.8%',
    status: 'EXCEEDED',
    description: 'Exact concordance on 386 held-out multigenerational test cases.'
  },
  {
    name: 'Reasoning Precision / Recall',
    target: '>= 92% / 90%',
    measured: '95.2% / 94.4%',
    delta: '+3.2% / +4.4%',
    status: 'EXCEEDED',
    description: 'Combined F1-Score of 0.948 across complex transmission modes.'
  },
  {
    name: 'Hallucination Rate',
    target: '<= 2.5%',
    measured: '1.5%',
    delta: '-17.0% vs Base',
    status: 'SUPERIOR',
    description: 'Drastic reduction from unadapted base LLM (18.5% -> 1.5%).'
  },
  {
    name: 'Uncertainty Calibration (ECE)',
    target: '>= 90.0%',
    measured: '95.5%',
    delta: '+5.5%',
    status: 'EXCEEDED',
    description: 'Refuses unverified guesses on ungenotyped relatives.'
  },
  {
    name: 'Cross-Family Privacy Leakage',
    target: '0.000%',
    measured: '0.000%',
    delta: 'Exact Zero',
    status: 'ZERO_LEAKAGE',
    description: 'Cryptographically and mathematically verified parameter isolation.'
  },
  {
    name: 'LoRA Adapter Hot-Swap Latency',
    target: '<= 50 ms',
    measured: '31.8 ms',
    delta: '-18.2 ms',
    status: 'SUPERIOR',
    description: 'Allows ~31 dynamic family adapter swaps per second on NVIDIA DGX B200.'
  }
];

export const COMPARATIVE_MODEL_DATA = [
  {
    model: 'Unadapted Base 7B',
    accuracy: 61.2,
    hallucination: 18.5,
    uncertainty: 54.0,
    f1: 0.618
  },
  {
    model: 'Naive RAG + 7B Base',
    accuracy: 72.4,
    hallucination: 12.1,
    uncertainty: 68.5,
    f1: 0.729
  },
  {
    model: 'GenInherit-LLM (Parametric LoRA)',
    accuracy: 94.8,
    hallucination: 1.5,
    uncertainty: 95.5,
    f1: 0.948
  }
];
