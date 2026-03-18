import { Link } from "react-router-dom";

export default function ProjectCard({ project }) {
  return (
    <div className="ui-card p-5">
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="text-lg font-semibold">{project.name}</div>
          <div className="mt-1 text-sm text-white/55">
            {project.industry} • {project.platform}
          </div>
        </div>

        <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/70">
          {project.status}
        </span>
      </div>

      <div className="mt-4 grid gap-2 text-sm text-white/65">
        <div>Brand: {project.brand}</div>
        <div>Letzte Änderung: {project.updatedAt}</div>
      </div>

      <div className="mt-5 flex gap-3">
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
}