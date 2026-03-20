import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/_core/hooks/useAuth";
import { trpc } from "@/lib/trpc";
import { SHOP_TYPES, BRAND_PROFILES, PLATFORMS } from "@shared/mauveSchema";
import { ChevronRight, ChevronLeft } from "lucide-react";

type WizardStep = 1 | 2 | 3 | 4 | 5 | 6;

interface WizardData {
  name: string;
  description: string;
  shopUrl: string;
  platform: "mauve" | "shopify" | "woocommerce" | "shopware";
  shopType: string;
  brandProfile: "modern" | "classic" | "medical" | "emotional";
}

export default function Wizard() {
  const { user, isAuthenticated } = useAuth();
  const [step, setStep] = useState<WizardStep>(1);
  const [formData, setFormData] = useState<WizardData>({
    name: "",
    description: "",
    shopUrl: "",
    platform: "mauve",
    shopType: "local",
    brandProfile: "modern",
  });

  const createProjectMutation = trpc.design.createProject.useMutation();

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold">Anmeldung erforderlich</h1>
        </div>
      </div>
    );
  }

  const handleNext = () => {
    if (step < 6) setStep((step + 1) as WizardStep);
  };

  const handlePrev = () => {
    if (step > 1) setStep((step - 1) as WizardStep);
  };

  const handleCreate = async () => {
    try {
      const result = await createProjectMutation.mutateAsync(formData);
      if (result.success) {
        // Redirect to project editor
        window.location.href = `/editor/${result.projectId}`;
      }
    } catch (error) {
      console.error("Failed to create project:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 py-12">
      <div className="container mx-auto max-w-2xl">
        {/* Progress Indicator */}
        <div className="mb-8">
          <div className="flex justify-between mb-4">
            {[1, 2, 3, 4, 5, 6].map((s) => (
              <div
                key={s}
                className={`flex-1 h-2 mx-1 rounded-full transition-colors ${
                  s <= step ? "bg-primary" : "bg-muted"
                }`}
              />
            ))}
          </div>
          <p className="text-sm text-muted-foreground text-center">
            Schritt {step} von 6
          </p>
        </div>

        {/* Step 1: Project Details */}
        {step === 1 && (
          <Card>
            <CardHeader>
              <CardTitle>Projektdetails</CardTitle>
              <CardDescription>
                Geben Sie einen Namen und eine Beschreibung für Ihr Design-Projekt ein.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Projektname</label>
                <input
                  type="text"
                  placeholder="z.B. Meine Apotheken-Website"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Beschreibung</label>
                <textarea
                  placeholder="Beschreiben Sie Ihr Projekt..."
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                  rows={4}
                />
              </div>
            </CardContent>
          </Card>
        )}

        {/* Step 2: Platform Selection */}
        {step === 2 && (
          <Card>
            <CardHeader>
              <CardTitle>E-Commerce Plattform</CardTitle>
              <CardDescription>
                Wählen Sie Ihre E-Commerce Plattform.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {Object.entries(PLATFORMS).map(([key, value]) => (
                <label
                  key={key}
                  className={`flex items-center p-4 border-2 rounded-lg cursor-pointer transition-colors ${
                    formData.platform === key
                      ? "border-primary bg-primary/5"
                      : "border-muted hover:border-muted-foreground"
                  }`}
                >
                  <input
                    type="radio"
                    name="platform"
                    value={key}
                    checked={formData.platform === key}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        platform: e.target.value as any,
                      })
                    }
                    className="mr-3"
                  />
                  <div>
                    <div className="font-medium">{value.label}</div>
                    <div className="text-sm text-muted-foreground">
                      {value.description}
                    </div>
                  </div>
                </label>
              ))}
            </CardContent>
          </Card>
        )}

        {/* Step 3: Shop URL */}
        {step === 3 && (
          <Card>
            <CardHeader>
              <CardTitle>Shop-URL</CardTitle>
              <CardDescription>
                Geben Sie die URL Ihres Online-Shops ein.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Shop-URL</label>
                <input
                  type="url"
                  placeholder="z.B. https://example.com"
                  value={formData.shopUrl}
                  onChange={(e) =>
                    setFormData({ ...formData, shopUrl: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                />
                <p className="text-xs text-muted-foreground mt-2">
                  Diese URL wird für die Live-Vorschau verwendet.
                </p>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Step 4: Shop Type */}
        {step === 4 && (
          <Card>
            <CardHeader>
              <CardTitle>Shop-Typ</CardTitle>
              <CardDescription>
                Wählen Sie den Typ Ihrer Apotheke.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {Object.entries(SHOP_TYPES).map(([key, value]) => (
                <label
                  key={key}
                  className={`flex items-center p-4 border-2 rounded-lg cursor-pointer transition-colors ${
                    formData.shopType === key
                      ? "border-primary bg-primary/5"
                      : "border-muted hover:border-muted-foreground"
                  }`}
                >
                  <input
                    type="radio"
                    name="shopType"
                    value={key}
                    checked={formData.shopType === key}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        shopType: e.target.value as any,
                      })
                    }
                    className="mr-3"
                  />
                  <div>
                    <div className="font-medium">{value.label}</div>
                    <div className="text-sm text-muted-foreground">
                      {value.description}
                    </div>
                  </div>
                </label>
              ))}
            </CardContent>
          </Card>
        )}

        {/* Step 5: Brand Profile */}
        {step === 5 && (
          <Card>
            <CardHeader>
              <CardTitle>Markenprofil</CardTitle>
              <CardDescription>
                Wählen Sie den Designstil für Ihre Apotheke.
              </CardDescription>
            </CardHeader>
            <CardContent className="grid grid-cols-2 gap-4">
              {Object.entries(BRAND_PROFILES).map(([key, value]) => (
                <label
                  key={key}
                  className={`p-4 border-2 rounded-lg cursor-pointer transition-colors ${
                    formData.brandProfile === key
                      ? "border-primary bg-primary/5"
                      : "border-muted hover:border-muted-foreground"
                  }`}
                >
                  <input
                    type="radio"
                    name="brandProfile"
                    value={key}
                    checked={formData.brandProfile === key}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        brandProfile: e.target.value as any,
                      })
                    }
                    className="mr-2"
                  />
                  <div className="font-medium">{value.label}</div>
                  <div className="text-xs text-muted-foreground">
                    {value.description}
                  </div>
                </label>
              ))}
            </CardContent>
          </Card>
        )}

        {/* Step 6: Review */}
        {step === 6 && (
          <Card>
            <CardHeader>
              <CardTitle>Zusammenfassung</CardTitle>
              <CardDescription>
                Überprüfen Sie Ihre Einstellungen.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-muted p-4 rounded-lg space-y-3">
                <div>
                  <div className="text-sm text-muted-foreground">Projektname</div>
                  <div className="font-medium">{formData.name}</div>
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">Beschreibung</div>
                  <div className="font-medium">{formData.description}</div>
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">Plattform</div>
                  <div className="font-medium">
                    {PLATFORMS[formData.platform as keyof typeof PLATFORMS].label}
                  </div>
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">Shop-URL</div>
                  <div className="font-medium">{formData.shopUrl}</div>
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">Shop-Typ</div>
                  <div className="font-medium">{formData.shopType}</div>
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">Markenprofil</div>
                  <div className="font-medium">
                    {
                      BRAND_PROFILES[
                        formData.brandProfile as keyof typeof BRAND_PROFILES
                      ].label
                    }
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Navigation Buttons */}
        <div className="flex justify-between mt-8">
          <Button
            variant="outline"
            onClick={handlePrev}
            disabled={step === 1}
            className="gap-2"
          >
            <ChevronLeft className="w-4 h-4" />
            Zurück
          </Button>

          {step < 6 ? (
            <Button onClick={handleNext} className="gap-2">
              Weiter
              <ChevronRight className="w-4 h-4" />
            </Button>
          ) : (
            <Button
              onClick={handleCreate}
              disabled={!formData.name.trim() || createProjectMutation.isPending}
              className="gap-2 bg-blue-600 hover:bg-blue-700"
            >
              {createProjectMutation.isPending ? (
                <>
                  <span className="inline-block animate-spin mr-2">⏳</span>
                  Erstelle...
                </>
              ) : (
                "Projekt erstellen"
              )}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
