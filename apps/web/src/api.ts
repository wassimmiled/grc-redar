export interface ControlMatch {
  controlId: string;
  framework: string;
  title: string;
  confidence: number;
  matchedTerms: string[];
}

export interface ComplianceDocument {
  id: string;
  filename: string;
  content: string;
  createdAt: string;
  status: "draft" | "validated";
  assessment: {
    overallScore: number;
    matches: ControlMatch[];
    gaps: string[];
  };
}

const BASE = "/api";

export async function fetchDocuments(): Promise<ComplianceDocument[]> {
  const res = await fetch(`${BASE}/documents`);
  return res.json();
}

export async function uploadDocument(filename: string, content: string): Promise<ComplianceDocument> {
  const res = await fetch(`${BASE}/documents`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ filename, content }),
  });
  return res.json();
}

export async function validateDocument(id: string): Promise<ComplianceDocument> {
  const res = await fetch(`${BASE}/documents/${id}/validate`, { method: "POST" });
  return res.json();
}
