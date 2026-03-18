import { useEffect, useMemo, useState } from "react";

// ✅ API: env möglich, sonst localhost
const API = import.meta.env.VITE_API_URL || "http://localhost:3001";

export default function Step3Preview({ value, onChange, onBack, onNext }) {
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  // Optional: Health check beim Öffnen (zeigt dir sofort ob Backend läuft)
  useEffect(() => {
    let cancelled = false;

    async function check() {
      try {
        setErrorMsg("");
        const res = await fetch(`${API}/health`);
        if (!res.ok) throw new Error("Backend /health nicht erreichbar");
        await res.json();
      } catch (err) {
        console.error(err);
        if (!cancelled) {
          setErrorMsg(`Backend nicht erreichbar. Läuft es auf ${API}?`);
        }
      }
    }

    check();
    return () => {
      cancelled = true;
    };
  }, []);

  const totalProducts = useMemo(
    () => (value.products || []).length,
    [value.products]
  );

  const generateShopWithAI = async () => {
    setLoading(true);
    setErrorMsg("");

    try {
      const res = await fetch(`${API}/generate-shop`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: value.name, brand: value.brand }),
      });
      if (!res.ok) throw new Error("Backend /generate-shop Fehler");

      const data = await res.json();

      // Dein Backend liefert: { success: true, shop: {...} }
      const shop = data?.shop ?? data;

      onChange({
        name: shop?.name ?? value.name,
        brand: shop?.brand ?? value.brand,
        layout: shop?.layout ?? value.layout,
        products: shop?.products ?? value.products,
      });
    } catch (err) {
      console.error(err);
      setErrorMsg("KI-Generierung fehlgeschlagen. Prüfe Backend-Konsole.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="grid gap-6 md:grid-cols-[1.2fr_0.8fr]">
      <div className="ui-card p-6">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h1 className="text-2xl font-semibold text-white">Vorschau</h1>
            <p className="mt-1 text-sm text-white/60">
              Checke die Daten. Du kannst per KI Produkte/Struktur generieren lassen.
            </p>
          </div>

          <button className="ui-btn" disabled={loading} onClick={generateShopWithAI}>
            {loading ? "Generiere…" : "✨ KI generieren"}
          </button>
        </div>

        {errorMsg && (
          <div className="mt-4 rounded-xl border border-red-500/30 bg-red-500/10 p-3 text-sm text-red-200">
            {errorMsg}
          </div>
        )}

        <div className="mt-6 grid gap-3 md:grid-cols-3">
          <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
            <div className="text-xs text-white/50">Shop-Name</div>
            <div className="mt-1 font-semibold text-white">{value.name || "—"}</div>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
            <div className="text-xs text-white/50">Brand</div>
            <div className="mt-1 font-semibold text-white">{value.brand || "—"}</div>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
            <div className="text-xs text-white/50">Layout</div>
            <div className="mt-1 font-semibold text-white">{value.layout || "—"}</div>
          </div>
        </div>

        <div className="mt-6">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-semibold text-white/80">
              Produkte <span className="text-white/50">({totalProducts})</span>
            </h2>
          </div>

          <div className="mt-3 space-y-2">
            {(value.products || []).map((p) => (
              <div
                key={p.id}
                className="flex items-center justify-between rounded-xl border border-white/10 bg-white/5 px-4 py-3"
              >
                <div className="min-w-0">
                  <div className="truncate text-sm font-medium text-white">{p.name}</div>
                  <div className="text-xs text-white/50">ID: {p.id}</div>
                </div>
                <div className="text-sm font-semibold text-white">
                  {Number(p.price).toFixed(2)} €
                </div>
              </div>
            ))}
          </div>
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
        <h2 className="text-sm font-semibold text-white/80">Was passiert hier?</h2>
        <div className="mt-3 space-y-3 text-sm text-white/60">
          <p>
            <span className="text-white/80 font-medium">KI generieren</span> ruft dein Backend
            <code className="mx-1 rounded bg-white/10 px-1 py-0.5">/generate-shop</code>
            auf und ersetzt Layout + Produkte.
          </p>
          <p>
            Im nächsten Schritt kannst du die Daten exportieren (JSON) oder später in ein
            Template/Theme umwandeln.
          </p>

          <div className="mt-4 rounded-xl border border-white/10 bg-white/5 p-3 text-xs text-white/60">
            Tipp: Wenn du später “Zahlung” integrierst, packen wir vor Step 3 oder vor Export einen
            Paywall-Check rein (Plan/Subscription).
          </div>
        </div>
      </div>
    </div>
  );
}