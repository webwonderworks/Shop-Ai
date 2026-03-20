import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { X, Copy, Palette, Type, Layout } from "lucide-react";

interface EditableElement {
  id: string;
  type: "header" | "hero" | "productCard" | "footer" | "text" | "image" | "button" | "section";
  label: string;
  properties: {
    backgroundColor?: string;
    textColor?: string;
    borderColor?: string;
    padding?: number;
    margin?: number;
    fontSize?: number;
    fontFamily?: string;
    borderRadius?: number;
    [key: string]: any;
  };
}

interface ClickableShopPreviewProps {
  shopUrl: string;
  elements: EditableElement[];
  onElementSelect: (element: EditableElement) => void;
  onPropertyChange: (elementId: string, property: string, value: any) => void;
  selectedElementId?: string;
}

export function ClickableShopPreview({
  shopUrl,
  elements,
  onElementSelect,
  onPropertyChange,
  selectedElementId,
}: ClickableShopPreviewProps) {
  const [hoveredElementId, setHoveredElementId] = useState<string | null>(null);
  const [showPropertyPanel, setShowPropertyPanel] = useState(true);

  const selectedElement = elements.find((el) => el.id === selectedElementId);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-full">
      {/* Preview Area */}
      <div className="lg:col-span-2">
        <Card className="h-full overflow-hidden bg-white shadow-lg">
          <div className="p-6 space-y-4">
            {/* Header */}
            <div
              className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                selectedElementId === "header"
                  ? "border-blue-500 bg-blue-50"
                  : hoveredElementId === "header"
                  ? "border-blue-300 bg-blue-50"
                  : "border-gray-200 hover:border-gray-300"
              }`}
              onMouseEnter={() => setHoveredElementId("header")}
              onMouseLeave={() => setHoveredElementId(null)}
              onClick={() => {
                const headerEl = elements.find((el) => el.id === "header");
                if (headerEl) onElementSelect(headerEl);
              }}
            >
              <div className="flex items-center justify-between">
                <div className="text-sm font-medium text-gray-600">Header / Navigation</div>
                {selectedElementId === "header" && (
                  <span className="text-xs bg-blue-500 text-white px-2 py-1 rounded">
                    Ausgewählt
                  </span>
                )}
              </div>
              <div className="mt-2 h-12 bg-gray-100 rounded flex items-center px-3">
                <div className="text-xs text-gray-500">Logo | Menü | Warenkorb</div>
              </div>
            </div>

            {/* Hero Section */}
            <div
              className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                selectedElementId === "hero"
                  ? "border-blue-500 bg-blue-50"
                  : hoveredElementId === "hero"
                  ? "border-blue-300 bg-blue-50"
                  : "border-gray-200 hover:border-gray-300"
              }`}
              onMouseEnter={() => setHoveredElementId("hero")}
              onMouseLeave={() => setHoveredElementId(null)}
              onClick={() => {
                const heroEl = elements.find((el) => el.id === "hero");
                if (heroEl) onElementSelect(heroEl);
              }}
            >
              <div className="flex items-center justify-between">
                <div className="text-sm font-medium text-gray-600">Hero Banner</div>
                {selectedElementId === "hero" && (
                  <span className="text-xs bg-blue-500 text-white px-2 py-1 rounded">
                    Ausgewählt
                  </span>
                )}
              </div>
              <div className="mt-2 h-32 bg-gradient-to-r from-blue-100 to-purple-100 rounded flex items-center justify-center">
                <div className="text-center">
                  <div className="text-lg font-bold text-gray-700">Willkommen!</div>
                  <div className="text-sm text-gray-600 mt-1">Entdecken Sie unsere Produkte</div>
                </div>
              </div>
            </div>

            {/* Product Cards */}
            <div
              className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                selectedElementId === "productCard"
                  ? "border-blue-500 bg-blue-50"
                  : hoveredElementId === "productCard"
                  ? "border-blue-300 bg-blue-50"
                  : "border-gray-200 hover:border-gray-300"
              }`}
              onMouseEnter={() => setHoveredElementId("productCard")}
              onMouseLeave={() => setHoveredElementId(null)}
              onClick={() => {
                const productEl = elements.find((el) => el.id === "productCard");
                if (productEl) onElementSelect(productEl);
              }}
            >
              <div className="flex items-center justify-between">
                <div className="text-sm font-medium text-gray-600">Produkte</div>
                {selectedElementId === "productCard" && (
                  <span className="text-xs bg-blue-500 text-white px-2 py-1 rounded">
                    Ausgewählt
                  </span>
                )}
              </div>
              <div className="mt-2 grid grid-cols-3 gap-2">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="bg-gray-100 rounded h-20 flex items-center justify-center">
                    <div className="text-xs text-gray-500">Produkt {i}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Footer */}
            <div
              className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                selectedElementId === "footer"
                  ? "border-blue-500 bg-blue-50"
                  : hoveredElementId === "footer"
                  ? "border-blue-300 bg-blue-50"
                  : "border-gray-200 hover:border-gray-300"
              }`}
              onMouseEnter={() => setHoveredElementId("footer")}
              onMouseLeave={() => setHoveredElementId(null)}
              onClick={() => {
                const footerEl = elements.find((el) => el.id === "footer");
                if (footerEl) onElementSelect(footerEl);
              }}
            >
              <div className="flex items-center justify-between">
                <div className="text-sm font-medium text-gray-600">Footer</div>
                {selectedElementId === "footer" && (
                  <span className="text-xs bg-blue-500 text-white px-2 py-1 rounded">
                    Ausgewählt
                  </span>
                )}
              </div>
              <div className="mt-2 h-12 bg-gray-900 rounded flex items-center px-3">
                <div className="text-xs text-gray-400">© 2026 | Impressum | Datenschutz | Kontakt</div>
              </div>
            </div>
          </div>
        </Card>
      </div>

      {/* Property Panel */}
      {showPropertyPanel && selectedElement && (
        <div className="lg:col-span-1">
          <Card className="h-full overflow-auto p-4 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-lg">{selectedElement.label}</h3>
              <button
                onClick={() => setShowPropertyPanel(false)}
                className="p-1 hover:bg-gray-100 rounded"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Color Properties */}
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-sm font-medium">
                <Palette className="w-4 h-4" />
                Farben
              </div>

              {selectedElement.properties.backgroundColor !== undefined && (
                <div>
                  <label className="block text-xs font-medium mb-1">Hintergrundfarbe</label>
                  <div className="flex gap-2">
                    <input
                      type="color"
                      value={selectedElement.properties.backgroundColor || "#FFFFFF"}
                      onChange={(e) =>
                        onPropertyChange(selectedElement.id, "backgroundColor", e.target.value)
                      }
                      className="w-10 h-10 rounded cursor-pointer"
                    />
                    <input
                      type="text"
                      value={selectedElement.properties.backgroundColor || "#FFFFFF"}
                      onChange={(e) =>
                        onPropertyChange(selectedElement.id, "backgroundColor", e.target.value)
                      }
                      className="flex-1 px-2 py-1 border rounded text-xs"
                    />
                  </div>
                </div>
              )}

              {selectedElement.properties.textColor !== undefined && (
                <div>
                  <label className="block text-xs font-medium mb-1">Textfarbe</label>
                  <div className="flex gap-2">
                    <input
                      type="color"
                      value={selectedElement.properties.textColor || "#000000"}
                      onChange={(e) =>
                        onPropertyChange(selectedElement.id, "textColor", e.target.value)
                      }
                      className="w-10 h-10 rounded cursor-pointer"
                    />
                    <input
                      type="text"
                      value={selectedElement.properties.textColor || "#000000"}
                      onChange={(e) =>
                        onPropertyChange(selectedElement.id, "textColor", e.target.value)
                      }
                      className="flex-1 px-2 py-1 border rounded text-xs"
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Typography Properties */}
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-sm font-medium">
                <Type className="w-4 h-4" />
                Typografie
              </div>

              {selectedElement.properties.fontSize !== undefined && (
                <div>
                  <label className="block text-xs font-medium mb-1">
                    Schriftgröße: {selectedElement.properties.fontSize}px
                  </label>
                  <input
                    type="range"
                    min="12"
                    max="48"
                    value={selectedElement.properties.fontSize || 16}
                    onChange={(e) =>
                      onPropertyChange(selectedElement.id, "fontSize", parseInt(e.target.value))
                    }
                    className="w-full"
                  />
                </div>
              )}

              {selectedElement.properties.fontFamily !== undefined && (
                <div>
                  <label className="block text-xs font-medium mb-1">Schriftart</label>
                  <select
                    value={selectedElement.properties.fontFamily || "Inter"}
                    onChange={(e) =>
                      onPropertyChange(selectedElement.id, "fontFamily", e.target.value)
                    }
                    className="w-full px-2 py-1 border rounded text-xs"
                  >
                    <option>Inter</option>
                    <option>Georgia</option>
                    <option>Trebuchet MS</option>
                  </select>
                </div>
              )}
            </div>

            {/* Layout Properties */}
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-sm font-medium">
                <Layout className="w-4 h-4" />
                Layout
              </div>

              {selectedElement.properties.padding !== undefined && (
                <div>
                  <label className="block text-xs font-medium mb-1">
                    Innenabstand: {selectedElement.properties.padding}px
                  </label>
                  <input
                    type="range"
                    min="0"
                    max="32"
                    value={selectedElement.properties.padding || 16}
                    onChange={(e) =>
                      onPropertyChange(selectedElement.id, "padding", parseInt(e.target.value))
                    }
                    className="w-full"
                  />
                </div>
              )}

              {selectedElement.properties.borderRadius !== undefined && (
                <div>
                  <label className="block text-xs font-medium mb-1">
                    Eckenradius: {selectedElement.properties.borderRadius}px
                  </label>
                  <input
                    type="range"
                    min="0"
                    max="24"
                    value={selectedElement.properties.borderRadius || 8}
                    onChange={(e) =>
                      onPropertyChange(selectedElement.id, "borderRadius", parseInt(e.target.value))
                    }
                    className="w-full"
                  />
                </div>
              )}
            </div>

            <div className="pt-4 border-t space-y-2">
              <Button variant="outline" size="sm" className="w-full">
                KI-Vorschlag
              </Button>
              <Button size="sm" className="w-full">
                Speichern
              </Button>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
}
