import { MauveDesignConfig } from "@shared/mauveSchema";
import { ShoppingCart, Search, Menu } from "lucide-react";

interface ShopPreviewProps {
  config: MauveDesignConfig;
  shopName?: string;
}

export function ShopPreview({ config, shopName = "Meine Apotheke" }: ShopPreviewProps) {
  return (
    <div
      className="w-full h-full bg-white rounded-lg overflow-hidden shadow-lg"
      style={{
        backgroundColor: config.backgroundColor,
        color: config.textColor,
        fontFamily: config.fontFamily,
      }}
    >
      {/* Header */}
      <header
        style={{
          backgroundColor: config.primaryColor,
          color: "white",
          padding: `${config.spacing}px`,
        }}
        className="flex items-center justify-between"
      >
        <div className="flex items-center gap-3">
          <Menu className="w-6 h-6" />
          <h1
            style={{ fontSize: `${config.fontSizeHeading}px` }}
            className="font-bold"
          >
            {shopName}
          </h1>
        </div>
        <div className="flex items-center gap-4">
          <Search className="w-5 h-5 cursor-pointer" />
          <ShoppingCart className="w-5 h-5 cursor-pointer" />
        </div>
      </header>

      {/* Hero Section */}
      <section
        style={{
          backgroundColor: config.secondaryColor,
          padding: `${config.spacing * 2}px`,
          minHeight: "200px",
        }}
        className="flex items-center justify-center text-center"
      >
        <div>
          <h2
            style={{
              fontSize: `${config.fontSizeHeading}px`,
              color: config.primaryColor,
              marginBottom: `${config.spacing}px`,
            }}
            className="font-bold"
          >
            Willkommen in unserer Apotheke
          </h2>
          <p style={{ fontSize: `${config.fontSizeBase}px` }}>
            Ihre Gesundheit ist unsere Priorität
          </p>
        </div>
      </section>

      {/* Product Cards Grid */}
      <section style={{ padding: `${config.spacing * 2}px` }}>
        <h3
          style={{
            fontSize: `${config.fontSizeHeading * 0.7}px`,
            marginBottom: `${config.spacing}px`,
          }}
          className="font-bold"
        >
          Beliebte Produkte
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              style={{
                border: `1px solid ${config.borderColor}`,
                borderRadius: `${config.borderRadius}px`,
                padding: `${config.spacing}px`,
                backgroundColor: config.backgroundColor,
              }}
              className={`${
                config.cardStyle === "elevated" ? "shadow-md" : ""
              }`}
            >
              <div
                style={{
                  backgroundColor: config.accentColor,
                  height: "120px",
                  borderRadius: `${config.borderRadius}px`,
                  marginBottom: `${config.spacing}px`,
                }}
              />
              <h4
                style={{
                  fontSize: `${config.fontSizeBase}px`,
                  marginBottom: `${config.spacing / 2}px`,
                }}
                className="font-semibold"
              >
                Produkt {i}
              </h4>
              <p
                style={{
                  fontSize: `${config.fontSizeSmall}px`,
                  color: config.textColor,
                  marginBottom: `${config.spacing}px`,
                }}
              >
                Hochwertige Qualität
              </p>
              <button
                style={{
                  backgroundColor: config.primaryColor,
                  color: "white",
                  padding: `${config.spacing / 2}px ${config.spacing}px`,
                  borderRadius:
                    config.buttonStyle === "pill"
                      ? "9999px"
                      : `${config.borderRadius}px`,
                  fontSize: `${config.fontSizeSmall}px`,
                  border: "none",
                  cursor: "pointer",
                }}
              >
                In den Warenkorb
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Trust Elements */}
      {config.showABDABadge && (
        <section
          style={{
            backgroundColor: config.secondaryColor,
            padding: `${config.spacing}px`,
            textAlign: "center",
            fontSize: `${config.fontSizeSmall}px`,
          }}
        >
          <p>
            ✓ ABDA zertifiziert | ✓ SSL verschlüsselt | ✓ Sichere Zahlung
          </p>
        </section>
      )}

      {/* Footer */}
      <footer
        style={{
          backgroundColor: config.primaryColor,
          color: "white",
          padding: `${config.spacing}px`,
          fontSize: `${config.fontSizeSmall}px`,
          textAlign: "center",
        }}
      >
        <p>© 2024 {shopName}. Alle Rechte vorbehalten.</p>
      </footer>
    </div>
  );
}
