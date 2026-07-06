import { CONTROLS } from "./controls.js";
import type { ControlMatch, RiskAssessment } from "./types.js";

/**
 * Deterministic extraction engine used for the demo (keyword matching),
 * built behind the same interface an LLM-backed extractor would use.
 *
 * Swap point for production: replace this function body with a call to
 * the LLM Gateway (Claude API) using a few-shot prompt that maps document
 * excerpts to CONTROLS, keeping the same ControlMatch[] contract so callers
 * (routes, tests, frontend) never need to change.
 */
export function extractControls(text: string): ControlMatch[] {
  const normalized = text.toLowerCase();

  return CONTROLS.map((control) => {
    const matchedTerms = control.keywords.filter((kw) => normalized.includes(kw));
    const confidence = matchedTerms.length === 0 ? 0 : Math.min(1, matchedTerms.length / control.keywords.length + 0.3);

    return {
      controlId: control.id,
      framework: control.framework,
      title: control.title,
      confidence: Number(confidence.toFixed(2)),
      matchedTerms,
    };
  }).filter((match) => match.confidence > 0);
}

export function assessRisk(text: string): RiskAssessment {
  const matches = extractControls(text);
  const coveredIds = new Set(matches.map((m) => m.controlId));
  const gaps = CONTROLS.filter((c) => !coveredIds.has(c.id)).map((c) => `${c.id} — ${c.title}`);

  const overallScore =
    CONTROLS.length === 0
      ? 0
      : Number(((matches.reduce((sum, m) => sum + m.confidence, 0) / CONTROLS.length) * 100).toFixed(1));

  return { overallScore, matches, gaps };
}
