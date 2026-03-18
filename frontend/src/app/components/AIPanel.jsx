import { useState } from "react";

const API = "http://localhost:3001";

export default function AIPanel({ projectId, designConfig, platform }) {
  const [loading, setLoading] = useState(false);
  const [suggestions, setSuggestions] = useState(null);
  const [analysis, setAnalysis] = useState(null);
  const [exportData, setExportData] = useState(null);
  const [activeTab, setActiveTab] = useState("suggestions");

  async function generateSuggestions() {
    setLoading(true);
    try {
      const res = await fetch(`${API}/ai/suggestions`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ projectId }),
      });

      const data = await res.json();
      if (data.ok) {
        setSuggestions(data.suggestions);
        setActiveTab("suggestions");
      }
    } catch (err) {
      console.error("Fehler beim Generieren von Vorschlägen:", err);
    } finally {
      setLoading(false);
    }
  }

  async function analyzeDesign() {
    setLoading(true);
    try {
      const res = await fetch(`${API}/ai/analyze`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ projectId, designConfig }),
      });

      const data = await res.json();
      if (data.ok) {
        setAnalysis(data.analysis);
        setActiveTab("analysis");
      }
    } catch (err) {
      console.error("Fehler bei der Analyse:", err);
    } finally {
      setLoading(false);
    }
  }

  async function generateExport() {
    setLoading(true);
    try {
      const res = await fetch(`${API}/ai/export`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ projectId, platform, designConfig }),
      });

      const data = await res.json();
      if (data.ok) {
        setExportData(data.export);
        setActiveTab("export");
      }
    } catch (err) {
      console.error("Fehler beim Export:", err);
    } finally {
      setLoading(false);
    }
  }

  function downloadExport() {
    if (!exportData) return;

    const dataStr = JSON.stringify(exportData, null, 2);
    const dataBlob = new Blob([dataStr], { type: "application/json" });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `design-export-${Date.now()}.json`;
    link.click();
  }

  return (
    <div className="ui-card p-4 space-y-4">
      <h3 className="text-lg font-semibold">🤖 KI-Assistent</h3>

      {/* Action Buttons */}
      <div className="grid grid-cols-3 gap-2">
        <button
          onClick={generateSuggestions}
          disabled={loading}
          className="px-3 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-slate-600 text-white rounded text-sm font-medium transition-colors"
          title="Generiere Design-Vorschläge"
        >
          {loading ? "⏳" : "💡"} Vorschläge
        </button>
        <button
          onClick={analyzeDesign}
          disabled={loading}
          className="px-3 py-2 bg-purple-600 hover:bg-purple-700 disabled:bg-slate-600 text-white rounded text-sm font-medium transition-colors"
          title="Analysiere das Design"
        >
          {loading ? "⏳" : "📊"} Analyse
        </button>
        <button
          onClick={generateExport}
          disabled={loading}
          className="px-3 py-2 bg-green-600 hover:bg-green-700 disabled:bg-slate-600 text-white rounded text-sm font-medium transition-colors"
          title="Exportiere das Design"
        >
          {loading ? "⏳" : "📥"} Export
        </button>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 border-b border-slate-700">
        <button
          onClick={() => setActiveTab("suggestions")}
          className={`px-3 py-2 text-sm font-medium transition-colors ${
            activeTab === "suggestions"
              ? "text-blue-400 border-b-2 border-blue-400"
              : "text-slate-400 hover:text-white"
          }`}
        >
          Vorschläge
        </button>
        <button
          onClick={() => setActiveTab("analysis")}
          className={`px-3 py-2 text-sm font-medium transition-colors ${
            activeTab === "analysis"
              ? "text-purple-400 border-b-2 border-purple-400"
              : "text-slate-400 hover:text-white"
          }`}
        >
          Analyse
        </button>
        <button
          onClick={() => setActiveTab("export")}
          className={`px-3 py-2 text-sm font-medium transition-colors ${
            activeTab === "export"
              ? "text-green-400 border-b-2 border-green-400"
              : "text-slate-400 hover:text-white"
          }`}
        >
          Export
        </button>
      </div>

      {/* Content */}
      <div className="space-y-3 max-h-96 overflow-y-auto">
        {/* Suggestions */}
        {activeTab === "suggestions" && suggestions && (
          <div className="space-y-3">
            <div>
              <h4 className="font-semibold text-sm mb-2">🎨 Farbschema</h4>
              <div className="flex gap-2 mb-2">
                <div
                  className="w-8 h-8 rounded border border-slate-600"
                  style={{ backgroundColor: suggestions.colorScheme.primary }}
                  title="Primär"
                />
                <div
                  className="w-8 h-8 rounded border border-slate-600"
                  style={{ backgroundColor: suggestions.colorScheme.secondary }}
                  title="Sekundär"
                />
                <div
                  className="w-8 h-8 rounded border border-slate-600"
                  style={{ backgroundColor: suggestions.colorScheme.accent }}
                  title="Akzent"
                />
              </div>
              <p className="text-xs text-slate-400">
                {suggestions.colorScheme.reasoning}
              </p>
            </div>

            <div>
              <h4 className="font-semibold text-sm mb-2">📝 Typographie</h4>
              <p className="text-xs text-slate-400">
                {suggestions.typography.reasoning}
              </p>
            </div>

            <div>
              <h4 className="font-semibold text-sm mb-2">💡 UX-Tipps</h4>
              <ul className="text-xs space-y-1">
                {suggestions.uxTips.map((tip, i) => (
                  <li key={i} className="text-slate-300">
                    • {tip}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-sm mb-2">📈 Conversion-Optimierung</h4>
              <ul className="text-xs space-y-1">
                {suggestions.conversionOptimizations.map((opt, i) => (
                  <li key={i} className="text-slate-300">
                    • {opt}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {/* Analysis */}
        {activeTab === "analysis" && analysis && (
          <div className="space-y-3">
            <div>
              <h4 className="font-semibold text-sm mb-2">
                Score: {analysis.score}/10 ⭐
              </h4>
              <div className="w-full bg-slate-700 rounded h-2">
                <div
                  className="bg-blue-500 h-2 rounded"
                  style={{ width: `${analysis.score * 10}%` }}
                />
              </div>
            </div>

            <div>
              <h4 className="font-semibold text-sm mb-2">Feedback</h4>
              <ul className="text-xs space-y-1">
                {analysis.feedback.map((item, i) => (
                  <li key={i} className="text-slate-300">
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-sm mb-2">Empfehlungen</h4>
              <div className="space-y-2">
                {analysis.recommendations.map((rec, i) => (
                  <div
                    key={i}
                    className="p-2 bg-slate-700 rounded text-xs border-l-2 border-blue-500"
                  >
                    <p className="font-medium text-slate-300">{rec.area}</p>
                    <p className="text-slate-400">{rec.suggestion}</p>
                    <p className="text-slate-500 text-xs mt-1">
                      Impact: {rec.impact}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Export */}
        {activeTab === "export" && exportData && (
          <div className="space-y-3">
            <div>
              <h4 className="font-semibold text-sm mb-2">
                Format: {exportData.format}
              </h4>
              <p className="text-xs text-slate-400 mb-3">
                Ihr Design ist bereit zum Export für {platform}.
              </p>

              <button
                onClick={downloadExport}
                className="w-full px-3 py-2 bg-green-600 hover:bg-green-700 text-white rounded text-sm font-medium transition-colors"
              >
                📥 JSON herunterladen
              </button>
            </div>

            {exportData.css && (
              <div>
                <h4 className="font-semibold text-sm mb-2">CSS-Code</h4>
                <pre className="bg-slate-900 p-2 rounded text-xs overflow-x-auto text-slate-300">
                  {exportData.css.substring(0, 200)}...
                </pre>
              </div>
            )}

            {exportData.liquid && (
              <div>
                <h4 className="font-semibold text-sm mb-2">Liquid-Template</h4>
                <pre className="bg-slate-900 p-2 rounded text-xs overflow-x-auto text-slate-300">
                  {exportData.liquid.substring(0, 200)}...
                </pre>
              </div>
            )}
          </div>
        )}

        {!suggestions && !analysis && !exportData && (
          <p className="text-xs text-slate-500 text-center py-4">
            Klicken Sie auf einen Button, um zu beginnen.
          </p>
        )}
      </div>
    </div>
  );
}
