import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import AppShell from "../components/AppShell";
import ShopPreview from "../components/ShopPreview";

const API = "http://localhost:3001";

const DEFAULT_DESIGN_CONFIG = {
  primaryColor: "#2563eb",
  secondaryColor: "#f3f4f6",
  accentColor: "#dc2626",
  fontFamily: "system-ui, -apple-system, sans-serif",
  fontSize: 16,
  borderRadius: 8,
  spacing: 16,
  buttonStyle: "rounded",
  cardStyle: "elevated",
  showABDABadge: true,
};

export default function DesignerPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [project, setProject] = useState(null);
  const [designConfig, setDesignConfig] = useState(DEFAULT_DESIGN_CONFIG);
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

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
            <div className="animate-spin mb-4">⏳</div>
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

  return (
    <AppShell title={`Designer - ${project.name}`}>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left: Controls */}
        <div className="lg:col-span-1 space-y-4">
          <div className="ui-card p-6">
            <h3 className="text-lg font-semibold mb-4">Design-Parameter</h3>

            {/* Step Indicator */}
            <div className="mb-6">
              <div className="flex gap-2 mb-3">
                {[1, 2, 3, 4].map((s) => (
                  <button
                    key={s}
                    onClick={() => setStep(s)}
                    className={`flex-1 py-2 rounded text-sm font-medium transition-colors ${
                      step === s
                        ? "bg-blue-600 text-white"
                        : "bg-slate-700 text-slate-300 hover:bg-slate-600"
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
              <p className="text-xs text-slate-400">Schritt {step} von 4</p>
            </div>

            {/* Step 1: Colors */}
            {step === 1 && (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm mb-2">Primärfarbe</label>
                  <div className="flex gap-2">
                    <input
                      type="color"
                      value={designConfig.primaryColor}
                      onChange={(e) =>
                        setDesignConfig({
                          ...designConfig,
                          primaryColor: e.target.value,
                        })
                      }
                      className="w-12 h-10 rounded cursor-pointer"
                    />
                    <input
                      type="text"
                      value={designConfig.primaryColor}
                      onChange={(e) =>
                        setDesignConfig({
                          ...designConfig,
                          primaryColor: e.target.value,
                        })
                      }
                      className="flex-1 px-2 py-1 bg-slate-700 border border-slate-600 rounded text-sm text-white"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm mb-2">Sekundärfarbe</label>
                  <div className="flex gap-2">
                    <input
                      type="color"
                      value={designConfig.secondaryColor}
                      onChange={(e) =>
                        setDesignConfig({
                          ...designConfig,
                          secondaryColor: e.target.value,
                        })
                      }
                      className="w-12 h-10 rounded cursor-pointer"
                    />
                    <input
                      type="text"
                      value={designConfig.secondaryColor}
                      onChange={(e) =>
                        setDesignConfig({
                          ...designConfig,
                          secondaryColor: e.target.value,
                        })
                      }
                      className="flex-1 px-2 py-1 bg-slate-700 border border-slate-600 rounded text-sm text-white"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm mb-2">Akzentfarbe</label>
                  <div className="flex gap-2">
                    <input
                      type="color"
                      value={designConfig.accentColor}
                      onChange={(e) =>
                        setDesignConfig({
                          ...designConfig,
                          accentColor: e.target.value,
                        })
                      }
                      className="w-12 h-10 rounded cursor-pointer"
                    />
                    <input
                      type="text"
                      value={designConfig.accentColor}
                      onChange={(e) =>
                        setDesignConfig({
                          ...designConfig,
                          accentColor: e.target.value,
                        })
                      }
                      className="flex-1 px-2 py-1 bg-slate-700 border border-slate-600 rounded text-sm text-white"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Step 2: Layout */}
            {step === 2 && (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm mb-2">Button-Stil</label>
                  <select
                    value={designConfig.buttonStyle}
                    onChange={(e) =>
                      setDesignConfig({
                        ...designConfig,
                        buttonStyle: e.target.value,
                      })
                    }
                    className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded text-sm text-white"
                  >
                    <option value="rounded">Abgerundet</option>
                    <option value="square">Eckig</option>
                    <option value="pill">Pille</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm mb-2">Karten-Stil</label>
                  <select
                    value={designConfig.cardStyle}
                    onChange={(e) =>
                      setDesignConfig({
                        ...designConfig,
                        cardStyle: e.target.value,
                      })
                    }
                    className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded text-sm text-white"
                  >
                    <option value="elevated">Erhaben</option>
                    <option value="flat">Flach</option>
                    <option value="bordered">Umrandet</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm mb-2">Border-Radius</label>
                  <input
                    type="range"
                    min="0"
                    max="20"
                    value={designConfig.borderRadius}
                    onChange={(e) =>
                      setDesignConfig({
                        ...designConfig,
                        borderRadius: parseInt(e.target.value),
                      })
                    }
                    className="w-full"
                  />
                  <p className="text-xs text-slate-400 mt-1">
                    {designConfig.borderRadius}px
                  </p>
                </div>
              </div>
            )}

            {/* Step 3: Typography */}
            {step === 3 && (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm mb-2">Schriftfamilie</label>
                  <select
                    value={designConfig.fontFamily}
                    onChange={(e) =>
                      setDesignConfig({
                        ...designConfig,
                        fontFamily: e.target.value,
                      })
                    }
                    className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded text-sm text-white"
                  >
                    <option value="system-ui, -apple-system, sans-serif">
                      System
                    </option>
                    <option value="Georgia, serif">Georgia (Serif)</option>
                    <option value="Courier, monospace">Courier (Mono)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm mb-2">Schriftgröße</label>
                  <input
                    type="range"
                    min="12"
                    max="20"
                    value={designConfig.fontSize}
                    onChange={(e) =>
                      setDesignConfig({
                        ...designConfig,
                        fontSize: parseInt(e.target.value),
                      })
                    }
                    className="w-full"
                  />
                  <p className="text-xs text-slate-400 mt-1">
                    {designConfig.fontSize}px
                  </p>
                </div>
              </div>
            )}

            {/* Step 4: Advanced */}
            {step === 4 && (
              <div className="space-y-4">
                <div>
                  <label className="flex items-center gap-2 text-sm cursor-pointer">
                    <input
                      type="checkbox"
                      checked={designConfig.showABDABadge}
                      onChange={(e) =>
                        setDesignConfig({
                          ...designConfig,
                          showABDABadge: e.target.checked,
                        })
                      }
                      className="w-4 h-4"
                    />
                    ABDA-Badge anzeigen
                  </label>
                </div>

                <div>
                  <label className="block text-sm mb-2">Abstände</label>
                  <input
                    type="range"
                    min="8"
                    max="32"
                    value={designConfig.spacing}
                    onChange={(e) =>
                      setDesignConfig({
                        ...designConfig,
                        spacing: parseInt(e.target.value),
                      })
                    }
                    className="w-full"
                  />
                  <p className="text-xs text-slate-400 mt-1">
                    {designConfig.spacing}px
                  </p>
                </div>
              </div>
            )}

            {errorMsg && (
              <div className="mt-4 p-3 bg-red-500/10 border border-red-500/30 rounded text-sm text-red-200">
                {errorMsg}
              </div>
            )}

            <button
              onClick={saveDesignVersion}
              disabled={saving}
              className="w-full mt-6 px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-slate-600 text-white rounded font-medium transition-colors"
            >
              {saving ? "Speichert..." : "Speichern"}
            </button>
          </div>
        </div>

        {/* Right: Preview */}
        <div className="lg:col-span-2">
          <div className="ui-card p-6">
            <h3 className="text-lg font-semibold mb-4">Live-Vorschau</h3>
            <div
              className="bg-white rounded-lg overflow-hidden"
              style={{
                backgroundColor: designConfig.secondaryColor,
                fontFamily: designConfig.fontFamily,
              }}
            >
              <ShopPreview config={designConfig} shopName={project.name} />
            </div>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
