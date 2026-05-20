// ============================================================
// SIRCA-RAG Scientific Review Ecosystem - Type Definitions
// ============================================================

export interface Paper {
  id: string;
  category: string;
  subcategory: string;
  title: string;
  year: number;
  doi: string;
  url: string;
  pdfUrl: string;
  authors: string[];
  affiliations: string[];
  country: string;
  venue: string;
  publisher: string;
  quartile: string;
  scopusIndexed: boolean;
  wosIndexed: boolean;
  paperType: string;
  mainTopic: string;
  keywords: string[];
  abstractOriginal: string;
  abstractSynthesized: string;
  objective: string;
  problemAddressed: string;
  methodology: string;
  architecture: string;
  dataset: string;
  frameworks: string[];
  embeddingType: string;
  vectorDB: string;
  usesRAG: boolean;
  usesAgents: boolean;
  usesVectorMemory: boolean;
  usesLLM: boolean;
  llmType: string;
  retrievalType: string;
  continualLearning: boolean;
  scientificAcquisition: boolean;
  mainResults: string;
  metrics: string;
  keyFindings: string;
  limitations: string;
  scientificContribution: string;
  innovationLevel: 'Alto' | 'Medio' | 'Bajo';
  evidenceLevel: string;
  citationCount: number;
  citationsPerYear: number;
  relevanceToSIRCA: string;
  biomedicalApplication: string;
  medicinalPlantApplication: string;
  clinicalPotential: string;
  researchGap: string;
  strengths: string;
  weaknesses: string;
  comparisonWithOthers: string;
  referenceAPA: string;
  referenceIEEE: string;
  bibtex: string;
  risCitation: string;
  // Scoring
  globalScore: number;
  technicalScore: number;
  biomedicalScore: number;
  innovationScore: number;
  relevanceScore: number;
}

export interface ResearchGap {
  id: string;
  title: string;
  description: string;
  category: string;
  severity: 'Crítico' | 'Alto' | 'Medio' | 'Bajo';
  relatedPapers: string[];
  sircaContribution: string;
  futureDirection: string;
  impact: number;
}

export interface TaxonomyCategory {
  id: string;
  name: string;
  nameEs: string;
  description: string;
  color: string;
  icon: string;
  paperCount: number;
  subcategories: string[];
}

export interface PRISMAData {
  identification: {
    databaseResults: number;
    otherSources: number;
    totalIdentified: number;
    duplicatesRemoved: number;
  };
  screening: {
    recordsScreened: number;
    recordsExcluded: number;
    excludedReasons: { reason: string; count: number }[];
  };
  eligibility: {
    fullTextAssessed: number;
    fullTextExcluded: number;
    excludedReasons: { reason: string; count: number }[];
  };
  inclusion: {
    studiesIncluded: number;
    qualitativeAnalysis: number;
    quantitativeAnalysis: number;
  };
}

export interface CitationNode {
  id: string;
  label: string;
  year: number;
  category: string;
  citationCount: number;
  size: number;
  color: string;
}

export interface CitationEdge {
  source: string;
  target: string;
  type: 'cites' | 'extends' | 'competes' | 'complements';
}

export interface ScoringWeights {
  relevance: number;
  technical: number;
  innovation: number;
  biomedical: number;
  impact: number;
}

export interface FilterState {
  categories: string[];
  yearRange: [number, number];
  scoreRange: [number, number];
  usesRAG: boolean | null;
  usesLLM: boolean | null;
  usesAgents: boolean | null;
  searchQuery: string;
  sortBy: string;
  sortOrder: 'asc' | 'desc';
}

export interface DashboardStats {
  totalPapers: number;
  avgScore: number;
  totalCitations: number;
  yearRange: string;
  categoriesCount: number;
  gapsIdentified: number;
  ragPapers: number;
  biomedPapers: number;
}

export type PageId = 'inicio' | 'explorador' | 'visualizaciones' | 'gaps' | 'red' | 'prisma' | 'taxonomia' | 'metodologia' | 'exportar';
