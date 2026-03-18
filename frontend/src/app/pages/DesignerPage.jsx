import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import AppShell from "../components/AppShell";
import ShopPreview from "../components/ShopPreview";
import AreaSelector from "../components/AreaSelector";
import LiveEditor from "../components/LiveEditor";
import AIPanel from "../components/AIPanel";
import { PLATFORMS } from "../../config/platforms";

const API = "http://localhost:3001";

const DEFAULT_DESIGN_CONFIG = {
  header: {
    backgroundColor: "#2563eb",
    textColor: "#ffffff",
    logoSize: 40,
    navigationStyle: "horizontal",
  },
  hero: {
    backgroundColor: "#1e40af",
    textColor: "#ffffff",
    backgroundImage: null,
    buttonStyle: "rounded",
  },
  products: {
    gridColumns: 3,
    cardStyle: "elevated",
    cardShadow: true,
    priceDisplay: "visible",
  },
  footer: {
    backgroundColor: "#1f2937",
    textColor: "#ffffff",
    columnLayout: 3,
  },
  sidebar: {
    backgroundColor: "#f3f4f6",
    textColor: "#1f2937",
    categoryStyle: "list",
  },
  global: {
    fontFamily: "system-ui, -apple-system, sans-serif",
    fontSize: 16,
    borderRadius: 8,
    spacing: 16,
  },
};

export default function DesignerPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [project, setProject] = useState(null);
  const [platform, setPlatform] = useState("mauve_system3");
  const [designConfig, setDesignConfig] = useState(DEFAULT_DESIGN_CONFIG);
  const [selectedArea, setSelectedArea] = useState("header");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [history, setHistory] = useState([DEFAULT_DESIGN_CONFIG]);
  const [historyIndex, setHistoryIndex] = useState(0);

  useEffect(() => {
    loadProject();
  }, [id]);

  async function loadProject() {
    try {
      const res = await fetch(`${API}/projects/${id}`);
      const data = await res.json();

      if (!res.ok || !data.ok) {
        throw new Error(data.error || "Projekt konnte nicht geladen werden.");
      }

      setProject(data.project);
      setPlatform(data.project.data.platform || "mauve_system3");

      if (data.project.versions && data.project.versions.length > 0) {
        const latestVersion = data.project.versions[0];
        setDesignConfig({
          ...DEFAULT_DESIGN_CONFIG,
          ...latestVersion.designConfig,
        });
      }
    } catch (err) {
      console.error("Projekt laden Fehler:", err);
      setErrorMsg(err.message || "Projekt konnte nicht geladen werden.");
    } finally {
      setLoading(false);
    }
  }

  function updateAreaConfig(areaName, updates) {
    const newConfig = {
      ...designConfig,
      [areaName]: {
        ...designConfig[areaName],
        ...updates,
      },
    };
    setDesignConfig(newConfig);
    addToHistory(newConfig);
  }

  function addToHistory(config) {
    const newHistory = history.slice(0, historyIndex + 1);
    newHistory.push(config);
    setHistory(newHistory);
    setHistoryIndex(newHistory.length - 1);
  }

  function undo() {
    if (historyIndex > 0) {
      setHistoryIndex(historyIndex - 1);
      setDesignConfig(history[historyIndex - 1]);
    }
  }

  function redo() {
    if (historyIndex < history.length - 1) {
      setHistoryIndex(historyIndex + 1);
      setDesignConfig(history[historyIndex + 1]);
    }
  }

  async function saveDesignVersion() {
    if (!project) return;

    setSaving(true);
    setErrorMsg("");

    try {
      const res = await fetch(`${API}/projects/${id}/design-versions`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          designConfig,
          previewData: null,
          aiAnalysis: null,
        }),
      });

      const data = await res.json();

      if (!res.ok || !data.ok) {
        throw new Error(data.error || "Design konnte nicht gespeichert werden.");
      }

      setErrorMsg("");
    } catch (err) {
      console.error("Design speichern Fehler:", err);
      setErrorMsg(err.message || "Design konnte nicht gespeichert werden.");
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return (
      <AppShell title="Designer">
        <div className="flex items-center justify-center h-96">
          <div className="text-center">
            <div className="animate-spin mb-4 text-4xl">⏳</div>
            <p>Designer wird geladen...</p>
          </div>
        </div>
      </AppShell>
    );
  }

  if (!project) {
    return (
      <AppShell title="Designer">
        <div className="ui-card p-8 text-red-400">
          <h2 className="text-xl font-semibold mb-2">Fehler</h2>
          <p>{errorMsg || "Projekt nicht gefunden."}</p>
        </div>
      </AppShell>
    );
  }

  const platformConfig = PLATFORMS[platform];
  const currentAreaConfig = designConfig[selectedArea];

  return (
    <AppShell title={`Designer - ${project.name}`}>
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 h-screen">
        {/* Left: Controls */}
        <div className="lg:col-span-1 overflow-y-auto space-y-4 pb-4">
          {/* Toolbar */}
          <div className="ui-card p-4 sticky top-0 z-10">
            <div className="flex gap-2 mb-4">
              <button
                onClick={undo}
                disabled={historyIndex === 0}
                className="flex-1 px-3 py-2 bg-slate-700 hover:bg-slate-600 disabled:bg-slate-800 text-white rounded text-sm"
                title="Rückgängig"
              >
                ↶
              </button>
              <button
                onClick={redo}
                disabled={historyIndex === history.length - 1}
                className="flex-1 px-3 py-2 bg-slate-700 hover:bg-slate-600 disabled:bg-slate-800 text-white rounded text-sm"
                title="Wiederherstellen"
              >
                ↷
              </button>
              <button
                onClick={saveDesignVersion}
                disabled={saving}
                className="flex-1 px-3 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-slate-600 text-white rounded text-sm font-medium"
              >
                {saving ? "..." : "💾"}
              </button>
            </div>

            {/* Platform Selector */}
            <div>
              <label className="block text-xs font-semibold mb-2">Plattform</label>
              <select
                value={platform}
                onChange={(e) => setPlatform(e.target.value)}
                className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded text-sm text-white"
              >
                {Object.entries(PLATFORMS).map(([key, p]) => (
                  <option key={key} value={key}>
                    {p.icon} {p.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Area Selector */}
          <div className="ui-card p-4">
            <h3 className="text-sm font-semibold mb-3">Bereiche</h3>
            <div className="space-y-2">
              {Object.entries(platformConfig.slots).map(([key, slot]) => (
                <button
                  key={key}
                  onClick={() => setSelectedArea(key)}
                  className={`w-full text-left px-3 py-2 rounded text-sm transition-colors ${
                    selectedArea === key
                      ? "bg-blue-600 text-white"
                      : "bg-slate-700 text-slate-300 hover:bg-slate-600"
                  }`}
                >
                  {slot.name}
                </button>
              ))}
            </div>
          </div>

          {/* Live Editor */}
          {selectedArea && currentAreaConfig && (
            <LiveEditor
              area={selectedArea}
              areaConfig={currentAreaConfig}
              platformConfig={platformConfig}
              onUpdate={(updates) => updateAreaConfig(selectedArea, updates)}
            />
          )}

          {/* AI Panel */}
          <AIPanel
            projectId={id}
            designConfig={designConfig}
            platform={platform}
          />

          {errorMsg && (
            <div className="ui-card p-3 bg-red-500/10 border border-red-500/30 rounded text-sm text-red-200">
              {errorMsg}
            </div>
          )}

          {/* Export Button */}
          <div className="ui-card p-4">
            <button
              onClick={() => {
                const dataStr = JSON.stringify(designConfig, null, 2);
                const dataBlob = new Blob([dataStr], { type: "application/json" });
                const url = URL.createObjectURL(dataBlob);
                const link = document.createElement("a");
                link.href = url;
                link.download = `design-${Date.now()}.json`;
                link.click();
              }}
              className="w-full px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded font-medium"
            >
              📥 Design herunterladen
            </button>
          </div>
        </div>

        {/* Right: Preview */}
        <div className="lg:col-span-3 overflow-y-auto">
          <div className="ui-card p-6 h-full">
            <h3 className="text-lg font-semibold mb-4">Live-Vorschau</h3>
            <div
              className="bg-white rounded-lg overflow-hidden border-2 border-slate-700"
              style={{
                backgroundColor: designConfig.global.secondaryColor,
                fontFamily: designConfig.global.fontFamily,
              }}
            >
              <AreaSelector
                config={designConfig}
                platform={platform}
                selectedArea={selectedArea}
                onSelectArea={setSelectedArea}
              />
            </div>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
