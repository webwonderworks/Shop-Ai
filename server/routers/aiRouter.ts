import { z } from "zod";
import { protectedProcedure, router } from "../_core/trpc";
import { invokeLLM } from "../_core/llm";
import { TRPCError } from "@trpc/server";
import { BRAND_PROFILES, SHOP_TYPES } from "@shared/mauveSchema";

export const aiRouter = router({
  generateDesignSuggestions: protectedProcedure
    .input(
      z.object({
        shopType: z.enum(["local", "shipping", "specialty"]),
        brandProfile: z.enum(["modern", "classic", "medical", "emotional"]),
        shopName: z.string().optional(),
      })
    )
    .mutation(async ({ input }) => {
      try {
        const brandConfig = BRAND_PROFILES[input.brandProfile];
        const shopTypeLabel = SHOP_TYPES[input.shopType].label;

        const prompt = `Du bist ein professioneller Shop-Designer für Apotheken. Generiere Design-Vorschläge für eine ${shopTypeLabel} mit folgendem Markenprofil: ${input.brandProfile}.

Berücksichtige:
- Marke: ${brandConfig.label} (${brandConfig.description})
- Shop-Typ: ${shopTypeLabel}
- Zielgruppe: Apothekenkunden
- Compliance: ABDA, GDPR, SSL-Zertifikate

Gib strukturierte Vorschläge zurück als JSON mit:
{
  "colorPalette": {
    "primary": "#...",
    "secondary": "#...",
    "accent": "#..."
  },
  "typography": {
    "heading": "...",
    "body": "..."
  },
  "layout": {
    "headerStyle": "...",
    "productCardStyle": "..."
  },
  "recommendations": ["...", "..."]
}`;

        const response = await invokeLLM({
          messages: [
            {
              role: "system",
              content:
                "Du bist ein Experte für E-Commerce Shop-Design, spezialisiert auf Apotheken-Websites. Antworte immer mit strukturiertem JSON.",
            },
            {
              role: "user",
              content: prompt,
            },
          ],
          response_format: {
            type: "json_schema",
            json_schema: {
              name: "design_suggestions",
              strict: true,
              schema: {
                type: "object",
                properties: {
                  colorPalette: {
                    type: "object",
                    properties: {
                      primary: { type: "string" },
                      secondary: { type: "string" },
                      accent: { type: "string" },
                    },
                    required: ["primary", "secondary", "accent"],
                  },
                  typography: {
                    type: "object",
                    properties: {
                      heading: { type: "string" },
                      body: { type: "string" },
                    },
                    required: ["heading", "body"],
                  },
                  layout: {
                    type: "object",
                    properties: {
                      headerStyle: { type: "string" },
                      productCardStyle: { type: "string" },
                    },
                    required: ["headerStyle", "productCardStyle"],
                  },
                  recommendations: {
                    type: "array",
                    items: { type: "string" },
                  },
                },
                required: ["colorPalette", "typography", "layout", "recommendations"],
                additionalProperties: false,
              },
            },
          },
        });

        const content = response.choices[0]?.message.content;
        if (!content || typeof content !== "string") {
          throw new Error("No response from LLM");
        }

        const suggestions = JSON.parse(content);
        return suggestions;
      } catch (error) {
        console.error("[AI] Failed to generate design suggestions:", error);
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to generate design suggestions",
        });
      }
    }),

  analyzeUX: protectedProcedure
    .input(
      z.object({
        designConfig: z.string(),
        shopType: z.string(),
      })
    )
    .mutation(async ({ input }) => {
      try {
        const prompt = `Analysiere das folgende Shop-Design für UX- und Conversion-Optimierung:

Design-Konfiguration:
${input.designConfig}

Shop-Typ: ${input.shopType}

Gib eine Analyse mit Empfehlungen zurück als JSON:
{
  "issues": [
    { "severity": "high|medium|low", "issue": "...", "impact": "..." }
  ],
  "recommendations": [
    { "priority": "high|medium|low", "recommendation": "...", "expectedImpact": "..." }
  ],
  "score": 0-100
}`;

        const response = await invokeLLM({
          messages: [
            {
              role: "system",
              content:
                "Du bist ein UX-Analyst spezialisiert auf E-Commerce. Analysiere Designs auf Usability und Conversion-Potenzial.",
            },
            {
              role: "user",
              content: prompt,
            },
          ],
          response_format: {
            type: "json_schema",
            json_schema: {
              name: "ux_analysis",
              strict: true,
              schema: {
                type: "object",
                properties: {
                  issues: {
                    type: "array",
                    items: {
                      type: "object",
                      properties: {
                        severity: {
                          type: "string",
                          enum: ["high", "medium", "low"],
                        },
                        issue: { type: "string" },
                        impact: { type: "string" },
                      },
                      required: ["severity", "issue", "impact"],
                    },
                  },
                  recommendations: {
                    type: "array",
                    items: {
                      type: "object",
                      properties: {
                        priority: {
                          type: "string",
                          enum: ["high", "medium", "low"],
                        },
                        recommendation: { type: "string" },
                        expectedImpact: { type: "string" },
                      },
                      required: ["priority", "recommendation", "expectedImpact"],
                    },
                  },
                  score: { type: "number", minimum: 0, maximum: 100 },
                },
                required: ["issues", "recommendations", "score"],
                additionalProperties: false,
              },
            },
          },
        });

        const content = response.choices[0]?.message.content;
        if (!content || typeof content !== "string") {
          throw new Error("No response from LLM");
        }

        const analysis = JSON.parse(content);
        return analysis;
      } catch (error) {
        console.error("[AI] Failed to analyze UX:", error);
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to analyze UX",
        });
      }
    }),
});
