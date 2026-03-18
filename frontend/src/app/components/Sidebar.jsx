import { NavLink } from "react-router-dom";

const links = [
  { to: "/app", label: "Dashboard" },
  { to: "/app/projects", label: "Projekte" },
  { to: "/app/projects/new", label: "Neues Projekt" },
];

export default function Sidebar() {
  return (
    <aside className="border-r border-white/10 bg-black/20 backdrop-blur">
      <div className="p-5">
        <div className="flex items-center gap-3">
          <div className="grid h-10 w-10 place-items-center rounded-xl bg-white/10 font-semibold">
            SD
          </div>

          <div>
            <div className="text-sm font-semibold">Shop Designer</div>
            <div className="text-xs text-white/50">Platform</div>
          </div>
        </div>

        <nav className="mt-8 space-y-2">
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                [
                  "block rounded-xl px-4 py-3 text-sm transition",
                  isActive
                    ? "bg-white/10 text-white"
                    : "text-white/70 hover:bg-white/5 hover:text-white",
                ].join(" ")
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        <div className="mt-8 rounded-2xl border border-white/10 bg-white/5 p-4">
          <div className="text-sm font-semibold">Aktueller Plan</div>
          <div className="mt-1 text-xs text-white/50">Pro</div>
          <div className="mt-3 text-xs text-white/60">
            Generierungen, Projekte und Design-Tiefe werden später hier angezeigt.
          </div>
        </div>
      </div>
    </aside>
  );
}