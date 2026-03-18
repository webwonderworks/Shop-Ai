export default function Step1Brand({ value, onChange, onNext }) {
  const ready = value.name.trim() && value.brand.trim();

  return (
    <div className="grid gap-6 md:grid-cols-[1.2fr_0.8fr]">
      <div className="ui-card p-6">
        <div className="mb-4">
          <h1 className="text-2xl font-semibold text-white">Brand Setup</h1>
          <p className="mt-1 text-sm text-white/60">
            Gib Shop-Name und Brand ein. Das nutzt später die KI und das Layout.
          </p>
        </div>

        <div className="grid gap-4">
          <div>
            <label className="mb-1 block text-sm text-white/70">Shop-Name</label>
            <input
              className="ui-input w-full"
              value={value.name}
              onChange={(e) => onChange({ name: e.target.value })}
              placeholder="z.B. Mauve Store"
            />
          </div>

          <div>
            <label className="mb-1 block text-sm text-white/70">Brand</label>
            <input
              className="ui-input w-full"
              value={value.brand}
              onChange={(e) => onChange({ brand: e.target.value })}
              placeholder="z.B. Mauve"
            />
          </div>
        </div>

        <div className="mt-6 flex items-center justify-between">
          <div className="text-xs text-white/50">
            {ready ? "✅ bereit" : "Bitte Name + Brand ausfüllen"}
          </div>
          <button className="ui-btn" disabled={!ready} onClick={onNext}>
            Weiter →
          </button>
        </div>
      </div>

      <div className="ui-card p-6">
        <h2 className="text-sm font-semibold text-white/80">Preview</h2>
        <div className="mt-4 space-y-3 text-sm">
          <div className="rounded-xl border border-white/10 bg-white/5 p-3">
            <div className="text-white/50 text-xs">Shop-Name</div>
            <div className="text-white">{value.name || "—"}</div>
          </div>
          <div className="rounded-xl border border-white/10 bg-white/5 p-3">
            <div className="text-white/50 text-xs">Brand</div>
            <div className="text-white">{value.brand || "—"}</div>
          </div>
          <div className="rounded-xl border border-white/10 bg-white/5 p-3">
            <div className="text-white/50 text-xs">Layout (vorläufig)</div>
            <div className="text-white">{value.layout}</div>
          </div>
        </div>

        <div className="mt-6 text-xs text-white/50">
          Tipp: Halte es kurz und klar. Das verbessert später KI-Ergebnisse.
        </div>
      </div>
    </div>
  );
}