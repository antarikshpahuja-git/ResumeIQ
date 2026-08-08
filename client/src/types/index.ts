export interface User {
  id: string;
  email: string;
  name: string;
}

export interface AnalysisHistory {
  id: string;
  resumeName: string;
  jobTitle: string;
  atsScore: number;
  jobMatch: number;
  createdAt: string;
}

export interface UploadedFile {
  name: string;
  size: number;
  type: string;
  text: string;
}

export interface AnalysisResult {
  atsScore: number;
  jobMatch: number;
  keywordMatch: number;
  formatting: number;
  resumeHealth: number;
  overview: {
    summary: string;
    strengths: string[];
    weaknesses: string[];
    recommendations: string[];
  };
  atsBreakdown: {
    keywordMatch: { score: number; max: number; explanation: string; suggestions: string[] };
    formatting: { score: number; max: number; explanation: string; suggestions: string[] };
    skillsMatch: { score: number; max: number; explanation: string; suggestions: string[] };
    experienceRelevance: { score: number; max: number; explanation: string; suggestions: string[] };
    education: { score: number; max: number; explanation: string; suggestions: string[] };
    sectionCompleteness: { score: number; max: number; explanation: string; suggestions: string[] };
    atsReadability: { score: number; max: number; explanation: string; suggestions: string[] };
  };
  keywords: {
    matchPercentage: number;
    matched: string[];
    missing: string[];
  };
  skills: {
    matchPercentage: number;
    technical: string[];
    tools: string[];
    soft: string[];
    matched: string[];
    missing: string[];
    required: string[];
  };
  experience: {
    score: number;
    actionVerbs: number;
    quantifiableMetrics: number;
    weakBullets: Array<{ original: string; suggestion: string }>;
    recommendations: string[];
  };
  projects: {
    analysis: string;
    technologies: string[];
    suggestions: string[];
    hasLinks: boolean;
  };
  formattingDetails: {
    score: number;
    riskLevel: 'low' | 'medium' | 'high';
    goodPoints: string[];
    issues: string[];
    suggestions: string[];
  };
  grammar: {
    score: number;
    issues: Array<{ original: string; type: string; suggestion: string; severity: 'low' | 'medium' | 'high' }>;
    summary: string;
  };
  recommendations: Array<{
    priority: 'high' | 'medium' | 'low';
    problem: string;
    whyItMatters: string;
    suggestedAction: string;
  }>;
  sections: {
    name: string;
    found: boolean;
    warning?: boolean;
    description?: string;
  }[];
  extractedText: string;
}
