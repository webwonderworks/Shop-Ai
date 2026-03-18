import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AppShell from "../components/AppShell";

const API = "http://localhost:3001";

export default function DashboardPage() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    async function loadProjects() {
      try {
        setLoading(true);
        setErrorMsg("");

        const res = await fetch(`${API}/projects`);
        const data = await res.json();

        if (!res.ok || !data.ok) {
          throw new Error(data.error || "Projekte konnten nicht geladen werden.");
        }

        setProjects(data.projects || []);
      } catch (err) {
        console.error(err);
        setErrorMsg("Dashboard konnte nicht geladen werden.");
      } finally {
        setLoading(false);
      }
    }

    loadProjects();
  }, []);

  return (
    <AppShell title="Dashboard">
      <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="ui-card p-6">
          <div className="text-sm text-white/50">Willkommen zurück</div>
          <h2 className="mt-2 text-3xl font-semibold">Deine Design-Plattform</h2>
          <p className="mt-3 max-w-2xl text-white/60">
            Hier siehst du deine Projekte und startest neue Shop-Redesigns.
          </p>
        </div>

        <div className="ui-card p-6">
          <div className="text-sm text-white/50">Übersicht</div>

          <div className="mt-4 grid grid-cols-2 gap-3">
            <div className="rounded-xl border border-white/10 bg-white/5 p-4">
              <div className="text-xs text-white/50">Projekte</div>
              <div className="mt-1 text-2xl font-semibold">{projects.length}</div>
            </div>

            <div className="rounded-xl border border-white/10 bg-white/5 p-4">
              <div className="text-xs text-white/50">Versionen</div>
              <div className="mt-1 text-2xl font-semibold">0</div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-lg font-semibold">Letzte Projekte</h3>
          <Link to="/app/projects/new" className="ui-btn">
            Neues Projekt
          </Link>
        </div>

        {loading && <div className="ui-card p-6 text-white/60">Lade Projekte...</div>}

        {errorMsg && <div className="ui-card p-6 text-red-300">{errorMsg}</div>}

        {!loading && !errorMsg && projects.length === 0 && (
          <div className="ui-card p-6 text-white/60">
            Noch keine Projekte vorhanden.
          </div>
        )}

        {!loading && !errorMsg && projects.length > 0 && (
          <div className="grid gap-4 md:grid-cols-2">
            {projects.slice(0, 4).map((project) => {
              const meta = project.data || {};

              return (
                <div key={project.id} className="ui-card p-6">
                  <h4 className="text-xl font-semibold">{project.name}</h4>
                  <div className="mt-2 text-sm text-white/50">
                    {meta.platform || "—"} • {meta.industry || "—"}
                  </div>

                  <div className="mt-4 text-sm text-white/70">
                    <div className="break-all">URL: {meta.shopUrl || "—"}</div>
                    <div className="mt-1">Ziel: {meta.designGoal || "—"}</div>
                  </div>

                  <div className="mt-6 flex gap-3">
                    <Link to={`/app/projects/${project.id}`} className="ui-btn">
                      Öffnen
                    </Link>
                    <Link
                      to={`/app/projects/${project.id}/designer`}
                      className="rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/80 hover:bg-white/10"
                    >
                      Designer
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </AppShell>
  );
}