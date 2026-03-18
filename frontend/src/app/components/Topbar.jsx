import { Link } from "react-router-dom";

export default function Topbar({ title }) {
  return (
    <header className="sticky top-0 z-10 border-b border-white/10 bg-[#0b0f1a]/80 backdrop-blur">
      <div className="flex items-center justify-between px-4 py-4 md:px-6">
        <div>
          <div className="text-xs text-white/50">App</div>
          <h1 className="text-xl font-semibold">{title}</h1>
        </div>

        <div className="flex items-center gap-3">
          <Link to="/app/projects/new" className="ui-btn">
            Neues Projekt
          </Link>
        </div>
      </div>
    </header>
  );
}