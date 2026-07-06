import type { ComplianceControl } from "./types.js";

/**
 * Minimal excerpt of a compliance knowledge base.
 * In production this would live behind an MCP server (mcp-compliance-kb)
 * exposing the full ISO 27001 Annex A / NIS2 corpus with embeddings,
 * instead of a hardcoded array.
 */
export const CONTROLS: ComplianceControl[] = [
  {
    id: "A.5.15",
    framework: "ISO27001",
    title: "Access control",
    keywords: ["access control", "rbac", "least privilege", "authorization", "role-based"],
  },
  {
    id: "A.8.24",
    framework: "ISO27001",
    title: "Use of cryptography",
    keywords: ["encryption", "cryptography", "tls", "at rest", "in transit", "key management"],
  },
  {
    id: "A.5.29",
    framework: "ISO27001",
    title: "Information security during disruption",
    keywords: ["business continuity", "disaster recovery", "backup", "resilience", "failover"],
  },
  {
    id: "A.8.16",
    framework: "ISO27001",
    title: "Monitoring activities",
    keywords: ["logging", "audit trail", "monitoring", "siem", "alerting"],
  },
  {
    id: "NIS2.21",
    framework: "NIS2",
    title: "Incident handling",
    keywords: ["incident response", "breach notification", "incident handling", "24 hours", "csirt"],
  },
  {
    id: "NIS2.23",
    framework: "NIS2",
    title: "Supply chain security",
    keywords: ["third-party", "supplier", "vendor risk", "supply chain"],
  },
  {
    id: "A.5.10",
    framework: "ISO27001",
    title: "Acceptable use of information and other associated assets",
    keywords: ["acceptable use", "usage policy", "asset handling", "data classification"],
  },
];
