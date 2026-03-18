export default function ShopPreview({ config, shopName = "Meine Apotheke" }) {
  return (
    <div
      className="w-full min-h-screen flex flex-col"
      style={{
        backgroundColor: config.secondaryColor,
        color: "#1f2937",
        fontFamily: config.fontFamily,
        fontSize: `${config.fontSize}px`,
      }}
    >
      {/* Header */}
      <header
        style={{
          backgroundColor: config.primaryColor,
          padding: `${config.spacing}px`,
        }}
        className="text-white flex items-center justify-between"
      >
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-white/20 rounded"></div>
          <h1 className="font-bold text-xl">{shopName}</h1>
        </div>
        <div className="flex items-center gap-4">
          <button className="hover:bg-white/10 p-2 rounded">🔍</button>
          <button className="hover:bg-white/10 p-2 rounded">🛒</button>
        </div>
      </header>

      {/* Hero Section */}
      <section
        style={{
          backgroundColor: config.primaryColor,
          padding: `${config.spacing * 2}px`,
        }}
        className="text-white text-center"
      >
        <h2 className="text-3xl font-bold mb-3">Willkommen in unserer Apotheke</h2>
        <p className="text-lg opacity-90">Ihre Gesundheit ist unsere Priorität</p>
      </section>

      {/* Products Section */}
      <section style={{ padding: `${config.spacing * 2}px` }}>
        <h3 className="text-2xl font-bold mb-6">Beliebte Produkte</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              style={{
                borderRadius: `${config.borderRadius}px`,
                padding: `${config.spacing}px`,
                backgroundColor: "white",
                boxShadow:
                  config.cardStyle === "elevated"
                    ? "0 4px 6px rgba(0,0,0,0.1)"
                    : "none",
                border:
                  config.cardStyle === "bordered"
                    ? `1px solid ${config.primaryColor}`
                    : "none",
              }}
            >
              <div
                style={{
                  backgroundColor: config.accentColor,
                  height: "120px",
                  borderRadius: `${config.borderRadius}px`,
                  marginBottom: `${config.spacing}px`,
                }}
              />
              <h4 className="font-semibold mb-2">Produkt {i}</h4>
              <p className="text-sm text-gray-600 mb-3">Hochwertige Qualität</p>
              <button
                style={{
                  backgroundColor: config.primaryColor,
                  borderRadius:
                    config.buttonStyle === "pill"
                      ? "9999px"
                      : `${config.borderRadius}px`,
                  padding: `${config.spacing / 2}px ${config.spacing}px`,
                }}
                className="text-white font-medium hover:opacity-90 transition-opacity"
              >
                In den Warenkorb
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Trust Section */}
      {config.showABDABadge && (
        <section
          style={{
            backgroundColor: config.primaryColor,
            padding: `${config.spacing}px`,
            color: "white",
            textAlign: "center",
          }}
        >
          <p>✓ ABDA zertifiziert | ✓ SSL verschlüsselt | ✓ Sichere Zahlung</p>
        </section>
      )}

      {/* Footer */}
      <footer
        style={{
          backgroundColor: config.primaryColor,
          padding: `${config.spacing}px`,
          color: "white",
          textAlign: "center",
          marginTop: "auto",
        }}
      >
        <p>© 2024 {shopName}. Alle Rechte vorbehalten.</p>
      </footer>
    </div>
  );
}
