import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AppShell from "../components/AppShell";

const API = "http://localhost:3001";

export default function ProjectsPage() {
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
        setErrorMsg(err.message || "Projekte konnten nicht geladen werden.");
      } finally {
        setLoading(false);
      }
    }

    loadProjects();
  }, []);

  return (
    <AppShell title="Projekte">
      <div className="mx-auto max-w-6xl space-y-6">
        <div className="ui-card p-8">
          <div className="flex items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl font-semibold">Alle Projekte</h1>
              <p className="mt-2 text-white/60">
                Hier siehst du alle angelegten Shop-Redesign-Projekte.
              </p>
            </div>

            <Link to="/app/projects/new" className="ui-btn">
              Neues Projekt
            </Link>
          </div>
        </div>

        {loading && (
          <div className="ui-card p-6 text-white/60">
            Projekte werden geladen...
          </div>
        )}

        {errorMsg && (
          <div className="ui-card p-6 text-red-300">
            {errorMsg}
          </div>
        )}

        {!loading && !errorMsg && projects.length === 0 && (
          <div className="ui-card p-6 text-white/60">
            Noch keine Projekte vorhanden.
          </div>
        )}

        {!loading && !errorMsg && projects.length > 0 && (
          <div className="grid gap-4 md:grid-cols-2">
            {projects.map((project) => {
              const meta = project.data || {};

              return (
                <div key={project.id} className="ui-card p-6">
                  <div className="mb-4 flex items-start justify-between gap-4">
                    <div>
                      <h2 className="text-xl font-semibold text-white">
                        {project.name}
                      </h2>
                      <div className="mt-2 text-sm text-white/50">
                        {meta.platform || "—"} • {meta.industry || "—"}
                      </div>
                    </div>

                    <div className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/70">
                      Entwurf
                    </div>
                  </div>

                  <div className="space-y-2 text-sm text-white/70">
                    <div>
                      <span className="text-white/40">Shop URL:</span>{" "}
                      <span className="break-all">{meta.shopUrl || "—"}</span>
                    </div>
                    <div>
                      <span className="text-white/40">Design Ziel:</span>{" "}
                      {meta.designGoal || "—"}
                    </div>
                    <div>
                      <span className="text-white/40">Erstellt:</span>{" "}
                      {new Date(project.createdAt).toLocaleString("de-DE")}
                    </div>
                  </div>

                  <div className="mt-6 flex flex-wrap gap-3">
                    <Link to={`/app/projects/${project.id}`} className="ui-btn">
                      Öffnen
                    </Link>

                    <Link
                      to={`/app/projects/${project.id}/designer`}
                      className="rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/80 hover:bg-white/10"
                    >
                      Analyse / Redesign
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