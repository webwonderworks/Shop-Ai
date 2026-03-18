import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import AppShell from "../components/AppShell";

const API = "http://localhost:3001";

export default function ProjectDetailPage() {
  const { id } = useParams();
  const [project, setProject] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadProject() {
      try {
        const res = await fetch(`${API}/projects/${id}`);
        const data = await res.json();

        if (!res.ok || !data.ok) {
          throw new Error(data.error || "Projekt konnte nicht geladen werden.");
        }

        setProject(data.project);
      } catch (err) {
        console.error(err);
        setError(err.message || "Projekt konnte nicht geladen werden.");
      }
    }

    loadProject();
  }, [id]);

  if (error) {
    return (
      <AppShell title="Fehler">
        <div className="p-8 text-red-400">{error}</div>
      </AppShell>
    );
  }

  if (!project) {
    return (
      <AppShell title="Projekt Übersicht">
        <div className="p-8 text-white/60">Projekt wird geladen...</div>
      </AppShell>
    );
  }

  const meta = project.data || {};

  return (
    <AppShell title="Projekt Übersicht">
      <div className="mx-auto max-w-6xl space-y-6">
        <div className="ui-card p-8">
          <h1 className="mb-4 text-3xl font-semibold">{project.name}</h1>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="ui-card p-4">
              <div className="text-sm text-white/50">Plattform</div>
              <div className="font-medium">{meta.platform || "—"}</div>
            </div>

            <div className="ui-card p-4">
              <div className="text-sm text-white/50">Shop URL</div>
              <div className="break-all font-medium">{meta.shopUrl || "—"}</div>
            </div>

            <div className="ui-card p-4">
              <div className="text-sm text-white/50">Branche</div>
              <div className="font-medium">{meta.industry || "—"}</div>
            </div>

            <div className="ui-card p-4">
              <div className="text-sm text-white/50">Design Ziel</div>
              <div className="font-medium">{meta.designGoal || "—"}</div>
            </div>
          </div>
        </div>

        <div className="ui-card p-8">
          <h2 className="mb-4 text-xl">Nächster Schritt</h2>
          <p className="mb-6 text-white/60">
            Analysiere den bestehenden Shop und starte anschließend das KI-Redesign.
          </p>

          <Link to={`/app/projects/${id}/designer`} className="ui-btn">
            Analyse starten
          </Link>
        </div>
      </div>
    </AppShell>
  );
}