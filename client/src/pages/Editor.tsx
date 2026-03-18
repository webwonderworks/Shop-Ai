import { useState, useEffect } from "react";
import { useAuth } from "@/_core/hooks/useAuth";
import { trpc } from "@/lib/trpc";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ShopPreview } from "@/components/ShopPreview";
import { MauveDesignConfig, DEFAULT_MAUVE_TEMPLATE, BRAND_PROFILES } from "@shared/mauveSchema";
import { Loader2, Download } from "lucide-react";

export default function Editor({ projectId }: any) {
  const { isAuthenticated } = useAuth();
  const [designConfig, setDesignConfig] = useState<MauveDesignConfig>(
    DEFAULT_MAUVE_TEMPLATE.defaultConfig
  );
  const [isGenerating, setIsGenerating] = useState(false);

  const { data: project } = trpc.design.getProject.useQuery(
    { projectId: parseInt(projectId || "0") },
    { enabled: !!projectId && isAuthenticated }
  );

  const generateSuggestionsMutation = trpc.ai.generateDesignSuggestions.useMutation();
  const updateProjectMutation = trpc.design.updateProject.useMutation();

  useEffect(() => {
    if (project?.designConfig) {
      try {
        const config = JSON.parse(project.designConfig);
        setDesignConfig(config);
      } catch (e) {
        console.error("Failed to parse design config:", e);
      }
    }
  }, [project]);

  const handleGenerateSuggestions = async () => {
    if (!project) return;

    setIsGenerating(true);
    try {
      const suggestions = await generateSuggestionsMutation.mutateAsync({
        shopType: project.shopType as any,
        brandProfile: project.brandProfile as any,
        shopName: project.name,
      });

      setDesignConfig((prev) => ({
        ...prev,
        ...suggestions.colorPalette,
      }));
    } catch (error) {
      console.error("Failed to generate suggestions:", error);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleSaveProject = async () => {
    if (!project) return;

    try {
      await updateProjectMutation.mutateAsync({
        projectId: project.id,
        designConfig: JSON.stringify(designConfig),
        status: "in_progress",
      });
    } catch (error) {
      console.error("Failed to save project:", error);
    }
  };

  const handleExport = () => {
    const templateData = {
      ...project,
      designConfig,
      exportedAt: new Date().toISOString(),
    };

    const dataStr = JSON.stringify(templateData, null, 2);
    const dataBlob = new Blob([dataStr], { type: "application/json" });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${project?.name || "design"}-template.json`;
    link.click();
  };

  if (!isAuthenticated) {
    return <div>Anmeldung erforderlich</div>;
  }

  if (!project) {
    return <div>Projekt wird geladen...</div>;
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Preview */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Live-Vorschau</CardTitle>
                <CardDescription>
                  Sehen Sie Ihr Design in Echtzeit
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="bg-muted p-4 rounded-lg" style={{ maxHeight: "600px", overflow: "auto" }}>
                  <ShopPreview config={designConfig} shopName={project.name} />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Design Controls */}
          <div className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Design-Parameter</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Primärfarbe
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="color"
                      value={designConfig.primaryColor}
                      onChange={(e) =>
                        setDesignConfig({
                          ...designConfig,
                          primaryColor: e.target.value,
                        })
                      }
                      className="w-12 h-10 rounded cursor-pointer"
                    />
                    <input
                      type="text"
                      value={designConfig.primaryColor}
                      onChange={(e) =>
                        setDesignConfig({
                          ...designConfig,
                          primaryColor: e.target.value,
                        })
                      }
                      className="flex-1 px-2 py-1 border rounded text-sm"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    Sekundärfarbe
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="color"
                      value={designConfig.secondaryColor}
                      onChange={(e) =>
                        setDesignConfig({
                          ...designConfig,
                          secondaryColor: e.target.value,
                        })
                      }
                      className="w-12 h-10 rounded cursor-pointer"
                    />
                    <input
                      type="text"
                      value={designConfig.secondaryColor}
                      onChange={(e) =>
                        setDesignConfig({
                          ...designConfig,
                          secondaryColor: e.target.value,
                        })
                      }
                      className="flex-1 px-2 py-1 border rounded text-sm"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    Akzentfarbe
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="color"
                      value={designConfig.accentColor}
                      onChange={(e) =>
                        setDesignConfig({
                          ...designConfig,
                          accentColor: e.target.value,
                        })
                      }
                      className="w-12 h-10 rounded cursor-pointer"
                    />
                    <input
                      type="text"
                      value={designConfig.accentColor}
                      onChange={(e) =>
                        setDesignConfig({
                          ...designConfig,
                          accentColor: e.target.value,
                        })
                      }
                      className="flex-1 px-2 py-1 border rounded text-sm"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    Button-Stil
                  </label>
                  <select
                    value={designConfig.buttonStyle}
                    onChange={(e) =>
                      setDesignConfig({
                        ...designConfig,
                        buttonStyle: e.target.value as any,
                      })
                    }
                    className="w-full px-2 py-1 border rounded text-sm"
                  >
                    <option value="rounded">Abgerundet</option>
                    <option value="square">Eckig</option>
                    <option value="pill">Pille</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <Button
                    onClick={handleGenerateSuggestions}
                    disabled={isGenerating}
                    className="w-full"
                  >
                    {isGenerating ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Generiere...
                      </>
                    ) : (
                      "KI-Vorschläge generieren"
                    )}
                  </Button>
                  <Button
                    onClick={handleSaveProject}
                    variant="outline"
                    className="w-full"
                  >
                    Speichern
                  </Button>
                  <Button
                    onClick={handleExport}
                    variant="outline"
                    className="w-full gap-2"
                  >
                    <Download className="w-4 h-4" />
                    Exportieren
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
