export default function AreaSelector({
  config,
  platform,
  selectedArea,
  onSelectArea,
}) {
  const handleAreaClick = (areaName) => {
    onSelectArea(areaName);
  };

  const getAreaStyle = (areaName) => {
    const areaConfig = config[areaName];
    const isSelected = selectedArea === areaName;

    return {
      backgroundColor: areaConfig?.backgroundColor || "#ffffff",
      color: areaConfig?.textColor || "#000000",
      padding: `${config.global?.spacing || 16}px`,
      borderRadius: `${config.global?.borderRadius || 8}px`,
      cursor: "pointer",
      border: isSelected ? "3px solid #fbbf24" : "2px solid transparent",
      transition: "all 0.2s ease",
      position: "relative",
    };
  };

  return (
    <div
      className="w-full min-h-screen flex flex-col"
      style={{
        backgroundColor: config.global?.secondaryColor || "#f3f4f6",
        fontFamily: config.global?.fontFamily || "system-ui",
        fontSize: `${config.global?.fontSize || 16}px`,
      }}
    >
      {/* Header */}
      <div
        style={getAreaStyle("header")}
        onClick={() => handleAreaClick("header")}
        className="group relative"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div
              style={{
                width: `${config.header?.logoSize || 40}px`,
                height: `${config.header?.logoSize || 40}px`,
                backgroundColor: "rgba(255,255,255,0.2)",
                borderRadius: "4px",
              }}
            />
            <h1 className="font-bold text-xl">Shop</h1>
          </div>
          <div className="flex items-center gap-4">
            <button className="hover:opacity-70 transition">🔍</button>
            <button className="hover:opacity-70 transition">🛒</button>
          </div>
        </div>
        {selectedArea === "header" && (
          <div className="absolute top-1 right-1 bg-yellow-400 text-black text-xs px-2 py-1 rounded font-bold">
            ✏️ Bearbeiten
          </div>
        )}
      </div>

      {/* Hero Section */}
      <div
        style={getAreaStyle("hero")}
        onClick={() => handleAreaClick("hero")}
        className="group relative my-4 text-center py-12"
      >
        <h2 className="text-3xl font-bold mb-3">Willkommen</h2>
        <p className="text-lg opacity-90 mb-4">Ihre Gesundheit ist unsere Priorität</p>
        <button
          style={{
            backgroundColor: config.hero?.buttonStyle === "pill" ? "9999px" : "8px",
            borderRadius: `${config.global?.borderRadius || 8}px`,
            padding: "10px 20px",
          }}
          className="font-medium hover:opacity-90 transition"
        >
          Jetzt einkaufen
        </button>
        {selectedArea === "hero" && (
          <div className="absolute top-1 right-1 bg-yellow-400 text-black text-xs px-2 py-1 rounded font-bold">
            ✏️ Bearbeiten
          </div>
        )}
      </div>

      {/* Sidebar + Products Container */}
      <div className="flex gap-4 flex-1 px-4">
        {/* Sidebar */}
        <div
          style={getAreaStyle("sidebar")}
          onClick={() => handleAreaClick("sidebar")}
          className="group relative w-48 hidden md:block"
        >
          <h3 className="font-semibold mb-3">Kategorien</h3>
          <div className="space-y-2">
            {["Kategorie 1", "Kategorie 2", "Kategorie 3"].map((cat, i) => (
              <div key={i} className="p-2 opacity-70 hover:opacity-100 cursor-pointer">
                {cat}
              </div>
            ))}
          </div>
          {selectedArea === "sidebar" && (
            <div className="absolute top-1 right-1 bg-yellow-400 text-black text-xs px-2 py-1 rounded font-bold">
              ✏️
            </div>
          )}
        </div>

        {/* Products */}
        <div
          style={getAreaStyle("products")}
          onClick={() => handleAreaClick("products")}
          className="group relative flex-1"
        >
          <h3 className="font-semibold mb-4">Beliebte Produkte</h3>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: `repeat(${config.products?.gridColumns || 3}, 1fr)`,
              gap: "16px",
            }}
          >
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                style={{
                  backgroundColor: "white",
                  borderRadius: `${config.global?.borderRadius || 8}px`,
                  padding: "12px",
                  boxShadow:
                    config.products?.cardStyle === "elevated"
                      ? "0 4px 6px rgba(0,0,0,0.1)"
                      : "none",
                  border:
                    config.products?.cardStyle === "bordered"
                      ? `1px solid ${config.products?.backgroundColor}`
                      : "none",
                }}
              >
                <div
                  style={{
                    backgroundColor: "#e5e7eb",
                    height: "100px",
                    borderRadius: "4px",
                    marginBottom: "8px",
                  }}
                />
                <p className="font-semibold text-sm">Produkt {i}</p>
                <p className="text-xs opacity-70 mb-2">Hochwertige Qualität</p>
                <button
                  style={{
                    backgroundColor: config.products?.backgroundColor || "#2563eb",
                    color: "white",
                    borderRadius: `${config.global?.borderRadius || 8}px`,
                    padding: "6px 12px",
                    fontSize: "12px",
                  }}
                  className="w-full font-medium hover:opacity-90 transition"
                >
                  In den Warenkorb
                </button>
              </div>
            ))}
          </div>
          {selectedArea === "products" && (
            <div className="absolute top-1 right-1 bg-yellow-400 text-black text-xs px-2 py-1 rounded font-bold">
              ✏️
            </div>
          )}
        </div>
      </div>

      {/* Footer */}
      <div
        style={getAreaStyle("footer")}
        onClick={() => handleAreaClick("footer")}
        className="group relative mt-4 text-center"
      >
        <p>© 2024 Shop Designer. Alle Rechte vorbehalten.</p>
        {selectedArea === "footer" && (
          <div className="absolute top-1 right-1 bg-yellow-400 text-black text-xs px-2 py-1 rounded font-bold">
            ✏️ Bearbeiten
          </div>
        )}
      </div>
    </div>
  );
}
