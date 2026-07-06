import { useEffect, useState } from "react";
import { fetchDocuments, uploadDocument, validateDocument, type ComplianceDocument } from "./api";

const SAMPLE = `Our company enforces role-based access control (RBAC) for all production systems.
Data is encrypted at rest and in transit using TLS 1.3.
We maintain a documented incident response process with breach notification within 24 hours.
Third-party vendor risk is not currently assessed as part of onboarding.`;

export default function App() {
  const [documents, setDocuments] = useState<ComplianceDocument[]>([]);
  const [filename, setFilename] = useState("security-policy.txt");
  const [content, setContent] = useState(SAMPLE);
  const [selected, setSelected] = useState<ComplianceDocument | null>(null);
  const [loading, setLoading] = useState(false);

  async function refresh() {
    const docs = await fetchDocuments();
    setDocuments(docs);
  }

  useEffect(() => {
    refresh();
  }, []);

  async function handleUpload() {
    setLoading(true);
    try {
      const doc = await uploadDocument(filename, content);
      setSelected(doc);
      await refresh();
    } finally {
      setLoading(false);
    }
  }

  async function handleValidate(id: string) {
    const doc = await validateDocument(id);
    setSelected(doc);
    await refresh();
  }

  return (
    <div className="layout">
      <h1>ComplianceRadar — demo</h1>
      <div className="card">
        <input value={filename} onChange={(e) => setFilename(e.target.value)} type="text" />
        <textarea value={content} onChange={(e) => setContent(e.target.value)} />
        <button onClick={handleUpload} disabled={loading}>
          {loading ? "Analyzing…" : "Analyser le document"}
        </button>
      </div>

      {selected && (
        <div className="card">
          <h2>{selected.filename}</h2>
          <span className={`badge ${selected.status}`}>{selected.status}</span>
          <p className="score">Score de conformité : {selected.assessment.overallScore}%</p>

          <h3>Contrôles couverts</h3>
          {selected.assessment.matches.map((m) => (
            <div key={m.controlId} className="match">
              ✔ {m.controlId} — {m.title} (confiance {Math.round(m.confidence * 100)}%)
            </div>
          ))}

          <h3>Écarts détectés</h3>
          {selected.assessment.gaps.map((g) => (
            <div key={g} className="gap">✘ {g}</div>
          ))}

          {selected.status === "draft" && (
            <button style={{ marginTop: "1rem" }} onClick={() => handleValidate(selected.id)}>
              Valider le rapport (4-eyes)
            </button>
          )}
        </div>
      )}

      <div className="card">
        <h3>Historique</h3>
        {documents.map((d) => (
          <div key={d.id} style={{ marginBottom: "0.5rem", cursor: "pointer" }} onClick={() => setSelected(d)}>
            {d.filename} — {d.assessment.overallScore}% — <span className={`badge ${d.status}`}>{d.status}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
