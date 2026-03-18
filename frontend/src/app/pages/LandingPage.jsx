import { Link } from "react-router-dom";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#0b0f1a] text-white">
      <div className="mx-auto max-w-6xl px-4 py-8">
        <header className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="grid h-10 w-10 place-items-center rounded-xl bg-white/10 font-semibold">
              SD
            </div>
            <div>
              <div className="font-semibold">Shop Designer</div>
              <div className="text-xs text-white/50">AI Design Platform</div>
            </div>
          </div>

          <div className="flex gap-3">
            <Link
              to="/login"
              className="rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm hover:bg-white/10"
            >
              Login
            </Link>

            <Link to="/app" className="ui-btn">
              Plattform öffnen
            </Link>
          </div>
        </header>

        <section className="grid gap-10 py-20 md:grid-cols-2 md:items-center">
          <div>
            <div className="mb-4 inline-flex rounded-full border border-indigo-400/20 bg-indigo-500/10 px-3 py-1 text-xs text-indigo-200">
              Für Shops, Marken und Agenturen
            </div>

            <h1 className="text-5xl font-semibold leading-tight">
              Gestalte Shops schneller,
              <span className="bg-gradient-to-r from-indigo-400 to-fuchsia-400 bg-clip-text text-transparent">
                {" "}ohne klassische Agenturprozesse
              </span>
            </h1>

            <p className="mt-5 max-w-xl text-lg text-white/65">
              Shop Designer führt Nutzer durch einen strukturierten Designprozess,
              verbindet bestehende Shop-Systeme und erzeugt neue Designversionen auf Basis
              realer Shopstrukturen.
            </p>

            <div className="mt-8 flex gap-4">
              <Link to="/app" className="ui-btn">
                Jetzt starten
              </Link>

              <Link
                to="/login"
                className="rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm hover:bg-white/10"
              >
                Login
              </Link>
            </div>
          </div>

          <div className="ui-card p-6">
            <div className="text-sm text-white/55">So funktioniert’s</div>

            <div className="mt-4 space-y-4">
              {[
                "1. Projekt anlegen",
                "2. Branche & Shopsystem wählen",
                "3. Bestehenden Shop verbinden",
                "4. Designziele definieren",
                "5. Versionen generieren und anpassen",
              ].map((item) => (
                <div
                  key={item}
                  className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm"
                >
                  {item}
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}