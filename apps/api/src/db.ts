import { randomUUID } from "node:crypto";
import type { ComplianceDocument } from "./types.js";
import { assessRisk } from "./extraction.js";

/**
 * In-memory store for the demo. Production target: PostgreSQL via Kysely,
 * with `documents` and `compliance_frameworks` tables (see docs/adr/0001).
 */
const documents = new Map<string, ComplianceDocument>();

export function createDocument(filename: string, content: string): ComplianceDocument {
  const doc: ComplianceDocument = {
    id: randomUUID(),
    filename,
    content,
    createdAt: new Date().toISOString(),
    assessment: assessRisk(content),
    status: "draft",
  };
  documents.set(doc.id, doc);
  return doc;
}

export function listDocuments(): ComplianceDocument[] {
  return Array.from(documents.values()).sort((a, b) => b.createdAt.localeCompare(a.createdAt));
}

export function getDocument(id: string): ComplianceDocument | undefined {
  return documents.get(id);
}

export function validateDocument(id: string): ComplianceDocument | undefined {
  const doc = documents.get(id);
  if (!doc) return undefined;
  doc.status = "validated";
  return doc;
}
