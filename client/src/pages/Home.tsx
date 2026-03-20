import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Loader2, ArrowRight, Zap, Users, BarChart3, Lock, Sparkles } from "lucide-react";
import { getLoginUrl } from "@/const";
import { useLocation } from "wouter";

export default function Home() {
  const { user, loading, isAuthenticated } = useAuth();
  const [, navigate] = useLocation();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="animate-spin w-8 h-8" />
      </div>
    );
  }

  if (isAuthenticated) {
    navigate("/dashboard");
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Navigation */}
      <nav className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div className="text-2xl font-bold text-blue-600">Shop Designer</div>
          <a href={getLoginUrl()} className="text-blue-600 hover:text-blue-700 font-medium">
            Login
          </a>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            Gestalten Sie Ihren Shop mit KI
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Shop Designer Platform - Das KI-gestützte Tool für professionelle Shop-Frontend-Designs. Für Mauve System3, Shopify, WooCommerce und mehr.
          </p>
          <div className="flex gap-4 justify-center">
            <a href={getLoginUrl()} className="inline-block">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
                Kostenlos starten <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </a>
            <Button size="lg" variant="outline">
              Demo ansehen
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">Funktionen</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="p-6 border rounded-lg hover:shadow-lg transition">
              <Sparkles className="w-8 h-8 text-blue-600 mb-4" />
              <h3 className="text-xl font-bold mb-2">KI-gestützte Designs</h3>
              <p className="text-gray-600">Intelligente Design-Vorschläge basierend auf Ihrer Shop-Kategorie</p>
            </div>
            <div className="p-6 border rounded-lg hover:shadow-lg transition">
              <Zap className="w-8 h-8 text-blue-600 mb-4" />
              <h3 className="text-xl font-bold mb-2">Live-Vorschau</h3>
              <p className="text-gray-600">Sehen Sie Änderungen in Echtzeit, bevor Sie sie speichern</p>
            </div>
            <div className="p-6 border rounded-lg hover:shadow-lg transition">
              <Lock className="w-8 h-8 text-blue-600 mb-4" />
              <h3 className="text-xl font-bold mb-2">Sichere Verwaltung</h3>
              <p className="text-gray-600">Enterprise-Grade Sicherheit für Ihre Design-Daten</p>
            </div>
            <div className="p-6 border rounded-lg hover:shadow-lg transition">
              <BarChart3 className="w-8 h-8 text-blue-600 mb-4" />
              <h3 className="text-xl font-bold mb-2">Conversion-Optimierung</h3>
              <p className="text-gray-600">Datengestützte Empfehlungen zur Steigerung von Verkäufen</p>
            </div>
            <div className="p-6 border rounded-lg hover:shadow-lg transition">
              <Users className="w-8 h-8 text-blue-600 mb-4" />
              <h3 className="text-xl font-bold mb-2">Multi-Platform</h3>
              <p className="text-gray-600">Unterstützt Mauve System3, Shopify, WooCommerce und mehr</p>
            </div>
            <div className="p-6 border rounded-lg hover:shadow-lg transition">
              <ArrowRight className="w-8 h-8 text-blue-600 mb-4" />
              <h3 className="text-xl font-bold mb-2">Ein-Klick-Export</h3>
              <p className="text-gray-600">Exportieren Sie Ihre Designs direkt zu Ihrer Plattform</p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">Preise</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { name: "Starter", price: "49€", features: ["Bis zu 3 Projekte", "Basis-KI-Vorschläge", "Live-Vorschau", "Email-Support"] },
              { name: "Professional", price: "149€", features: ["Unbegrenzte Projekte", "Erweiterte KI-Analyse", "Conversion-Optimierung", "Prioritäts-Support", "API-Zugriff"], highlight: true },
              { name: "Enterprise", price: "Auf Anfrage", features: ["Alles in Professional", "Dedizierter Account Manager", "Custom Integrationen", "SLA-Garantie"] },
            ].map((plan) => (
              <div key={plan.name} className={`p-8 rounded-lg border-2 ${plan.highlight ? "border-blue-600 bg-blue-50" : "border-gray-200"}`}>
                <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                <p className="text-3xl font-bold text-blue-600 mb-6">{plan.price}</p>
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-center">
                      <span className="w-2 h-2 bg-blue-600 rounded-full mr-3"></span>
                      {feature}
                    </li>
                  ))}
                </ul>
                <Button className="w-full" variant={plan.highlight ? "default" : "outline"}>
                  Jetzt starten
                </Button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-blue-600 text-white py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Bereit, Ihren Shop zu transformieren?</h2>
          <p className="text-lg mb-8 opacity-90">Starten Sie noch heute kostenlos - keine Kreditkarte erforderlich</p>
          <a href={getLoginUrl()} className="inline-block">
            <Button size="lg" variant="secondary">
              Kostenlos registrieren <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <h4 className="text-white font-bold mb-4">Shop Designer</h4>
              <p className="text-sm">KI-gestützte Shop-Design-Plattform</p>
            </div>
            <div>
              <h4 className="text-white font-bold mb-4">Produkt</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-white">Features</a></li>
                <li><a href="#" className="hover:text-white">Preise</a></li>
                <li><a href="#" className="hover:text-white">Dokumentation</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-bold mb-4">Unternehmen</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-white">Über uns</a></li>
                <li><a href="#" className="hover:text-white">Blog</a></li>
                <li><a href="#" className="hover:text-white">Kontakt</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-bold mb-4">Rechtliches</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-white">Impressum</a></li>
                <li><a href="#" className="hover:text-white">Datenschutz</a></li>
                <li><a href="#" className="hover:text-white">AGB</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 text-center text-sm">
            <p>&copy; 2026 Shop Designer Platform. Alle Rechte vorbehalten.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
