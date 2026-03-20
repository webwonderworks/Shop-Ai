import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Loader2, Send, Sparkles } from "lucide-react";
import { trpc } from "@/lib/trpc";

interface EditableElement {
  id: string;
  type: string;
  label: string;
  properties: Record<string, any>;
}

interface AIDesignEditorProps {
  selectedElement: EditableElement | null;
  shopType: string;
  brandProfile: string;
  onPropertyChange: (property: string, value: any) => void;
  onApplyChanges: (changes: Record<string, any>) => void;
}

export function AIDesignEditor({
  selectedElement,
  shopType,
  brandProfile,
  onPropertyChange,
  onApplyChanges,
}: AIDesignEditorProps) {
  const [aiPrompt, setAiPrompt] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [suggestions, setSuggestions] = useState<any>(null);

  const generateSuggestionsMutation = trpc.ai.generateDesignSuggestions.useMutation();

  const handleAIRequest = async () => {
    if (!aiPrompt.trim() || !selectedElement) return;

    setIsGenerating(true);
    try {
      // Call AI to generate suggestions based on user description
      const response = await generateSuggestionsMutation.mutateAsync({
        shopType: shopType as any,
        brandProfile: brandProfile as any,
        shopName: `${selectedElement.label} - ${aiPrompt}`,
      });

      setSuggestions(response);

      // Apply the changes immediately
      if (response.colorPalette) {
        onPropertyChange("backgroundColor", response.colorPalette.primary);
        onPropertyChange("textColor", response.colorPalette.secondary);
      }

      if (response.typography) {
        onPropertyChange("fontFamily", response.typography.heading);
        onPropertyChange("fontSize", 18);
      }

      // Show success message
      setTimeout(() => {
        setSuggestions(null);
        setAiPrompt("");
      }, 2000);
    } catch (error) {
      console.error("Failed to generate AI suggestions:", error);
    } finally {
      setIsGenerating(false);
    }
  };

  if (!selectedElement) {
    return (
      <Card className="p-6 text-center text-gray-500">
        <p>Klicken Sie auf ein Element, um es zu bearbeiten</p>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      <Card className="p-4 bg-blue-50 border-blue-200">
        <div className="flex items-center gap-2 mb-3">
          <Sparkles className="w-5 h-5 text-blue-600" />
          <h3 className="font-bold text-blue-900">KI-Assistent</h3>
        </div>

        <div className="space-y-3">
          <div>
            <label className="block text-sm font-medium mb-2 text-gray-700">
              Element: <span className="text-blue-600">{selectedElement.label}</span>
            </label>
            <textarea
              value={aiPrompt}
              onChange={(e) => setAiPrompt(e.target.value)}
              placeholder="z.B. 'Mache den Header blau und größer' oder 'Ändere die Produktkarten zu grün mit mehr Abstand'"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
              rows={3}
              disabled={isGenerating}
            />
          </div>

          <Button
            onClick={handleAIRequest}
            disabled={!aiPrompt.trim() || isGenerating}
            className="w-full bg-blue-600 hover:bg-blue-700 gap-2"
          >
            {isGenerating ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                KI arbeitet...
              </>
            ) : (
              <>
                <Send className="w-4 h-4" />
                KI-Änderung anwenden
              </>
            )}
          </Button>

          {suggestions && (
            <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
              <p className="text-sm text-green-800">
                ✅ Änderungen angewendet! Die Vorschau wird aktualisiert.
              </p>
            </div>
          )}
        </div>
      </Card>

      {/* Manual Properties */}
      <Card className="p-4">
        <h4 className="font-bold mb-3">Manuelle Anpassung</h4>

        <div className="space-y-3">
          {selectedElement.properties.backgroundColor !== undefined && (
            <div>
              <label className="block text-sm font-medium mb-1">Hintergrundfarbe</label>
              <div className="flex gap-2">
                <input
                  type="color"
                  value={selectedElement.properties.backgroundColor || "#FFFFFF"}
                  onChange={(e) => onPropertyChange("backgroundColor", e.target.value)}
                  className="w-10 h-10 rounded cursor-pointer"
                />
                <input
                  type="text"
                  value={selectedElement.properties.backgroundColor || "#FFFFFF"}
                  onChange={(e) => onPropertyChange("backgroundColor", e.target.value)}
                  className="flex-1 px-2 py-1 border rounded text-sm"
                />
              </div>
            </div>
          )}

          {selectedElement.properties.fontSize !== undefined && (
            <div>
              <label className="block text-sm font-medium mb-1">
                Schriftgröße: {selectedElement.properties.fontSize}px
              </label>
              <input
                type="range"
                min="12"
                max="48"
                value={selectedElement.properties.fontSize || 16}
                onChange={(e) => onPropertyChange("fontSize", parseInt(e.target.value))}
                className="w-full"
              />
            </div>
          )}

          {selectedElement.properties.padding !== undefined && (
            <div>
              <label className="block text-sm font-medium mb-1">
                Innenabstand: {selectedElement.properties.padding}px
              </label>
              <input
                type="range"
                min="0"
                max="32"
                value={selectedElement.properties.padding || 16}
                onChange={(e) => onPropertyChange("padding", parseInt(e.target.value))}
                className="w-full"
              />
            </div>
          )}
        </div>
      </Card>
    </div>
  );
}
