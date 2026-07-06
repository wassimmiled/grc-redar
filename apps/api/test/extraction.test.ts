import { describe, it, expect } from "vitest";
import { assessRisk, extractControls } from "../src/extraction.js";

describe("extractControls", () => {
  it("matches relevant controls based on document content", () => {
    const text = "We enforce role-based access control and encrypt data at rest using TLS.";
    const matches = extractControls(text);

    const ids = matches.map((m) => m.controlId);
    expect(ids).toContain("A.5.15");
    expect(ids).toContain("A.8.24");
  });

  it("returns no matches for irrelevant text", () => {
    const matches = extractControls("The weather today is sunny and warm.");
    expect(matches).toHaveLength(0);
  });

  it("computes an overall risk score and lists gaps", () => {
    const assessment = assessRisk("We have an incident response process with 24 hours notification.");
    expect(assessment.overallScore).toBeGreaterThan(0);
    expect(assessment.gaps.length).toBeGreaterThan(0);
    expect(assessment.matches.some((m) => m.controlId === "NIS2.21")).toBe(true);
  });

  it("matches the acceptable use control (A.5.10) when relevant", () => {
    const matches = extractControls("Our acceptable use policy defines rules for data classification.");
    expect(matches.map((m) => m.controlId)).toContain("A.5.10");
  });

  it("handles empty input without throwing", () => {
    const assessment = assessRisk("");
    expect(assessment.overallScore).toBe(0);
    expect(assessment.matches).toHaveLength(0);
  });
});
