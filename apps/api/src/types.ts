export interface ComplianceControl {
  id: string;
  framework: "ISO27001" | "NIS2";
  title: string;
  keywords: string[];
}

export interface ControlMatch {
  controlId: string;
  framework: string;
  title: string;
  confidence: number;
  matchedTerms: string[];
}

export interface RiskAssessment {
  overallScore: number;
  matches: ControlMatch[];
  gaps: string[];
}

export interface ComplianceDocument {
  id: string;
  filename: string;
  content: string;
  createdAt: string;
  assessment: RiskAssessment;
  status: "draft" | "validated";
}
