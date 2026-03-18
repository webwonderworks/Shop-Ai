import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AppShell from "../components/AppShell";

const API = "http://localhost:3001";

export default function NewProjectPage() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    projectName: "",
    shopUrl: "",
    platform: "",
    designGoal: "",
    industry: "",
    notes: "",
  });

  const [saving, setSaving] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  function handleChange(field, value) {
    setForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  }

  async function handleCreateProject() {
    setSaving(true);
    setErrorMsg("");

    try {
      if (!form.projectName.trim()) {
        throw new Error("Bitte einen Projektnamen eingeben.");
      }

      if (!form.shopUrl.trim()) {
        throw new Error("Bitte eine Shop-URL eingeben.");
      }

      if (!form.platform.trim()) {
        throw new Error("Bitte eine Plattform auswählen.");
      }

      const res = await fetch(`${API}/projects`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          projectName: form.projectName,
          shopMode: "existing",
          shopUrl: form.shopUrl,
          platform: form.platform,
          industry: form.industry,
          analysisMode: "public",
          designGoal: form.designGoal,
          notes: form.notes,
        }),
      });

      const data = await res.json();

      if (!res.ok || !data.ok) {
        throw new Error(data.error || "Projekt konnte nicht erstellt werden.");
      }

      navigate(`/app/projects/${data.project.id}`);
    } catch (err) {
      console.error("Projekt anlegen Fehler:", err);
      setErrorMsg(err.message || "Projekt konnte nicht erstellt werden.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <AppShell title="Neues Projekt">
      <div className="mx-auto max-w-4xl">
        <div className="ui-card p-8">
          <h2 className="mb-6 text-2xl font-semibold">
            Neues Shop-Redesign Projekt
          </h2>

          <div className="space-y-6">
            <div>
              <label className="mb-2 block text-sm">Projektname *</label>
              <input
                className="ui-input w-full"
                value={form.projectName}
                onChange={(e) => handleChange("projectName", e.target.value)}
                placeholder="z. B. Klindwort Apotheke Redesign"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm">Shop URL *</label>
              <input
                className="ui-input w-full"
                value={form.shopUrl}
                onChange={(e) => handleChange("shopUrl", e.target.value)}
                placeholder="https://demo.mauve.de"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm">Plattform *</label>
              <select
                className="ui-input w-full"
                value={form.platform}
                onChange={(e) => handleChange("platform", e.target.value)}
              >
                <option value="">Plattform wählen</option>
                <option value="mauve_system3">Mauve System3</option>
                <option value="shopify">Shopify</option>
                <option value="woocommerce">WooCommerce</option>
                <option value="shopware">Shopware</option>
                <option value="custom">Custom</option>
              </select>
            </div>

            <div>
              <label className="mb-2 block text-sm">Branche</label>
              <input
                className="ui-input w-full"
                value={form.industry}
                onChange={(e) => handleChange("industry", e.target.value)}
                placeholder="z. B. Apotheke"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm">Design Ziel</label>
              <textarea
                className="ui-input w-full"
                value={form.designGoal}
                onChange={(e) => handleChange("designGoal", e.target.value)}
                placeholder="z. B. moderner, vertrauenswürdiger, bessere Produktdarstellung"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm">Notizen</label>
              <textarea
                className="ui-input w-full"
                value={form.notes}
                onChange={(e) => handleChange("notes", e.target.value)}
                placeholder="Optionale Hinweise"
              />
            </div>

            {errorMsg && (
              <div className="rounded-xl border border-red-500/30 bg-red-500/10 p-3 text-sm text-red-200">
                {errorMsg}
              </div>
            )}

            <button
              type="button"
              className="ui-btn"
              disabled={saving}
              onClick={handleCreateProject}
            >
              {saving ? "Projekt wird erstellt..." : "Projekt erstellen"}
            </button>
          </div>
        </div>
      </div>
    </AppShell>
  );
}