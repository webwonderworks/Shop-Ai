import React from "react";
import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Loader2, ArrowRight, Zap, Users, BarChart3, Lock, Sparkles, Check } from "lucide-react";
import { getLoginUrl } from "@/const";
import { useLocation } from "wouter";

export default function Home() {
  const { user, loading, isAuthenticated } = useAuth();
  const [, navigate] = useLocation();

  React.useEffect(() => {
    if (!loading && isAuthenticated) {
      navigate("/dashboard");
    }
  }, [loading, isAuthenticated, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <Loader2 className="animate-spin w-8 h-8 text-blue-600" />
      </div>
    );
  }

  if (isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation - Apple Style */}
      <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-200/50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <img src="https://d2xsxph8kpxj0f.cloudfront.net/310519663448315463/NCbvv64VoYJYxkmYwC94aN/valgux-logo-PhqXi7hwVzVAvCT6R9N7Xy.webp" alt="Valgux" className="w-7 h-7" />
            <span className="text-xl font-semibold text-gray-900">Valgux</span>
          </div>
          <a href={getLoginUrl()}>
            <Button variant="ghost" className="text-gray-600 hover:text-gray-900">
              Anmelden
            </Button>
          </a>
        </div>
      </nav>

      {/* Hero Section - Minimalist */}
      <section className="max-w-6xl mx-auto px-6 py-32 text-center">
        <div className="space-y-8">
          <div className="space-y-4">
            <h1 className="text-6xl md:text-7xl font-bold text-gray-900 leading-tight">
              Gestalten Sie Ihren Shop
              <br />
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                mit KI
              </span>
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
              Valgux nutzt künstliche Intelligenz, um professionelle Shop-Designs zu erstellen. Für Mauve, Shopify, WooCommerce und mehr.
            </p>
          </div>

          <div className="flex gap-4 justify-center pt-8">
            <a href={getLoginUrl()}>
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-6 text-lg rounded-lg">
                Kostenlos starten
              </Button>
            </a>
            <Button size="lg" variant="outline" className="px-8 py-6 text-lg rounded-lg border-gray-300">
              Demo ansehen
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section - Grid */}
      <section className="bg-gray-50 py-24">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-20">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Alles, was Sie brauchen</h2>
            <p className="text-lg text-gray-600">Professionelle Shop-Designs in Minuten, nicht Tagen</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { icon: Sparkles, title: "KI-Designs", desc: "Intelligente Vorschläge basierend auf Ihrer Shop-Kategorie" },
              { icon: Zap, title: "Live-Vorschau", desc: "Sehen Sie Änderungen sofort in Echtzeit" },
              { icon: Lock, title: "Sicher", desc: "Enterprise-Grade Sicherheit für Ihre Daten" },
              { icon: BarChart3, title: "Optimiert", desc: "Datengestützte Empfehlungen für mehr Verkäufe" },
              { icon: Users, title: "Multi-Platform", desc: "Mauve, Shopify, WooCommerce und mehr" },
              { icon: ArrowRight, title: "Ein-Klick-Export", desc: "Exportieren Sie direkt zu Ihrer Plattform" },
            ].map((feature, i) => {
              const Icon = feature.icon;
              return (
                <div key={i} className="p-8 rounded-2xl bg-white hover:shadow-lg transition-shadow">
                  <Icon className="w-10 h-10 text-blue-600 mb-4" />
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{feature.title}</h3>
                  <p className="text-gray-600">{feature.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Pricing Section - Apple Style */}
      <section className="py-24">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-20">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Einfache Preise</h2>
            <p className="text-lg text-gray-600">Wählen Sie den Plan, der zu Ihnen passt</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: "Starter",
                price: "49€",
                desc: "Perfekt zum Starten",
                features: ["Bis zu 3 Projekte", "Basis-KI-Vorschläge", "Live-Vorschau", "Email-Support"],
              },
              {
                name: "Professional",
                price: "149€",
                desc: "Für wachsende Shops",
                features: ["Unbegrenzte Projekte", "Erweiterte KI-Analyse", "Conversion-Optimierung", "Prioritäts-Support", "API-Zugriff"],
                highlight: true,
              },
              {
                name: "Enterprise",
                price: "Auf Anfrage",
                desc: "Für große Unternehmen",
                features: ["Alles in Professional", "Dedizierter Account Manager", "Custom Integrationen", "SLA-Garantie"],
              },
            ].map((plan, i) => (
              <div
                key={i}
                className={`p-8 rounded-2xl transition-all ${
                  plan.highlight
                    ? "bg-blue-600 text-white shadow-xl scale-105"
                    : "bg-white border border-gray-200 hover:border-gray-300"
                }`}
              >
                <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                <p className={plan.highlight ? "text-blue-100 mb-4" : "text-gray-600 mb-4"}>{plan.desc}</p>
                <p className={`text-4xl font-bold mb-8 ${plan.highlight ? "text-white" : "text-gray-900"}`}>
                  {plan.price}
                  {!plan.price.includes("Anfrage") && <span className={plan.highlight ? "text-blue-100" : "text-gray-600"}>/Monat</span>}
                </p>
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, j) => (
                    <li key={j} className="flex items-start gap-3">
                      <Check className="w-5 h-5 flex-shrink-0 mt-0.5" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <Button
                  className="w-full py-6 text-base rounded-lg"
                  variant={plan.highlight ? "secondary" : "outline"}
                  asChild
                >
                  <a href={getLoginUrl()}>Jetzt starten</a>
                </Button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-24">
        <div className="max-w-4xl mx-auto px-6 text-center space-y-8">
          <h2 className="text-4xl font-bold">Bereit zu starten?</h2>
          <p className="text-xl opacity-90">Erstellen Sie noch heute Ihren ersten Shop-Design - kostenlos, keine Kreditkarte erforderlich</p>
          <a href={getLoginUrl()}>
            <Button size="lg" variant="secondary" className="px-8 py-6 text-lg rounded-lg">
              Kostenlos registrieren <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </a>
        </div>
      </section>

      {/* Footer - Minimal */}
      <footer className="bg-white border-t border-gray-200 py-12">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-12 mb-12">
            <div>
              <h4 className="font-semibold text-gray-900 mb-4">Valgux</h4>
              <p className="text-gray-600 text-sm">KI-gestützte Shop-Design-Plattform</p>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-4">Produkt</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li><a href="#" className="hover:text-gray-900">Features</a></li>
                <li><a href="#" className="hover:text-gray-900">Preise</a></li>
                <li><a href="#" className="hover:text-gray-900">Dokumentation</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-4">Unternehmen</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li><a href="#" className="hover:text-gray-900">Über uns</a></li>
                <li><a href="#" className="hover:text-gray-900">Blog</a></li>
                <li><a href="#" className="hover:text-gray-900">Kontakt</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-4">Rechtliches</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li><a href="#" className="hover:text-gray-900">Impressum</a></li>
                <li><a href="#" className="hover:text-gray-900">Datenschutz</a></li>
                <li><a href="#" className="hover:text-gray-900">AGB</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-200 pt-8 text-center text-sm text-gray-600">
            <p>&copy; 2026 Valgux. Alle Rechte vorbehalten.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
