const layouts = [
  { key: "Modern", title: "Modern", desc: "Clean, viel Weißraum, moderne Cards." },
  { key: "Luxury", title: "Luxury", desc: "High-end Look, starke Kontraste." },
  { key: "Minimal", title: "Minimal", desc: "Sehr reduziert, Fokus auf Produkt." },
];

export default function Step2Layout({ value, onChange, onBack, onNext }) {
  return (
    <div className="grid gap-6 md:grid-cols-[1.2fr_0.8fr]">
      <div className="ui-card p-6">
        <h1 className="text-2xl font-semibold text-white">Layout wählen</h1>
        <p className="mt-1 text-sm text-white/60">
          Wähle ein Grundlayout. Du kannst es später noch anpassen.
        </p>

        <div className="mt-5 grid gap-3">
          {layouts.map((l) => {
            const active = value.layout === l.key;
            return (
              <button
                key={l.key}
                className={[
                  "text-left rounded-2xl border p-4 transition",
                  active
                    ? "border-indigo-400/50 bg-indigo-500/10"
                    : "border-white/10 bg-white/5 hover:bg-white/8",
                ].join(" ")}
                onClick={() => onChange({ layout: l.key })}
              >
                <div className="flex items-center justify-between">
                  <div className="font-semibold text-white">{l.title}</div>
                  <div
                    className={[
                      "h-2.5 w-2.5 rounded-full",
                      active ? "bg-indigo-400" : "bg-white/20",
                    ].join(" ")}
                  />
                </div>
                <div className="mt-1 text-sm text-white/60">{l.desc}</div>
              </button>
            );
          })}
        </div>

        <div className="mt-6 flex items-center justify-between">
          <button
            className="rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/80 hover:bg-white/10"
            onClick={onBack}
          >
            ← Zurück
          </button>
          <button className="ui-btn" onClick={onNext}>
            Weiter →
          </button>
        </div>
      </div>

      <div className="ui-card p-6">
        <h2 className="text-sm font-semibold text-white/80">Kurz-Check</h2>
        <div className="mt-4 space-y-3 text-sm">
          <div className="rounded-xl border border-white/10 bg-white/5 p-3">
            <div className="text-white/50 text-xs">Shop</div>
            <div className="text-white">{value.name || "—"}</div>
          </div>
          <div className="rounded-xl border border-white/10 bg-white/5 p-3">
            <div className="text-white/50 text-xs">Brand</div>
            <div className="text-white">{value.brand || "—"}</div>
          </div>
          <div className="rounded-xl border border-white/10 bg-white/5 p-3">
            <div className="text-white/50 text-xs">Layout</div>
            <div className="text-white">{value.layout}</div>
          </div>
        </div>

        <div className="mt-6 text-xs text-white/50">
          Nächster Schritt: Vorschau + KI-Generierung.
        </div>
      </div>
    </div>
  );
}