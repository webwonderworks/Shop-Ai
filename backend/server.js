const express = require("express");
const cors = require("cors");
require("dotenv").config();

const { PrismaClient } = require("@prisma/client");
const { PrismaBetterSqlite3 } = require("@prisma/adapter-better-sqlite3");

console.log("SERVER FILE LOADED: backend/server.js");

const adapter = new PrismaBetterSqlite3({
  url: process.env.DATABASE_URL || "file:./dev.db",
});

const prisma = new PrismaClient({ adapter });
const app = express();

app.use(cors());
app.use(express.json());

let lastGeneratedShop = null;

/* --------------------------------------------------
   ROOT
-------------------------------------------------- */
app.get("/", (req, res) => {
  res.json({
    ok: true,
    message: "Shop Designer Backend läuft",
  });
});

/* --------------------------------------------------
   HEALTH CHECK
-------------------------------------------------- */
app.get("/health", (req, res) => {
  res.json({
    ok: true,
    status: "running",
    service: "shop-designer-backend",
  });
});

/* --------------------------------------------------
   DEMO SHOP DATA
-------------------------------------------------- */
const shopData = {
  name: "Demo-Shop",
  products: [
    { id: 1, name: "Produkt A", price: 9.99 },
    { id: 2, name: "Produkt B", price: 19.99 },
  ],
  layout: "Modern",
  brand: "DemoBrand",
};

/* --------------------------------------------------
   HELPER: DEMO USER
-------------------------------------------------- */
async function getOrCreateDemoUser() {
  const user = await prisma.user.upsert({
    where: { email: "demo@shopdesigner.local" },
    update: {},
    create: {
      email: "demo@shopdesigner.local",
      name: "Demo User",
    },
  });

  return user;
}

/* --------------------------------------------------
   DB TEST
-------------------------------------------------- */
app.get("/db-test", async (req, res) => {
  try {
    const user = await getOrCreateDemoUser();

    res.json({
      ok: true,
      message: "DB Verbindung funktioniert ✅",
      user,
    });
  } catch (err) {
    console.error("GET /db-test Fehler:", err);
    res.status(500).json({
      ok: false,
      error: String(err),
    });
  }
});

/* --------------------------------------------------
   CREATE PROJECT
-------------------------------------------------- */
app.post("/projects", async (req, res) => {
  try {
    const demoUser = await getOrCreateDemoUser();

    const {
      projectName,
      shopMode,
      shopUrl,
      platform,
      industry,
      analysisMode,
      designGoal,
      notes,
      integrationData,
    } = req.body;

    if (!projectName || !projectName.trim()) {
      return res.status(400).json({
        ok: false,
        error: "Projektname ist erforderlich.",
      });
    }

    const project = await prisma.project.create({
      data: {
        name: projectName.trim(),
        brand: null,
        layout: null,
        data: {
          shopMode: shopMode || "existing",
          shopUrl: shopUrl || "",
          platform: platform || "",
          industry: industry || "",
          analysisMode: analysisMode || "public",
          designGoal: designGoal || "",
          notes: notes || "",
          integrationData: integrationData || null,
          createdFrom: "new-project-flow",
        },
        userId: demoUser.id,
      },
    });

    res.status(201).json({
      ok: true,
      project,
    });
  } catch (err) {
    console.error("POST /projects Fehler:", err);
    res.status(500).json({
      ok: false,
      error: "Projekt konnte nicht gespeichert werden.",
      details: String(err),
    });
  }
});

/* --------------------------------------------------
   LIST PROJECTS
-------------------------------------------------- */
app.get("/projects", async (req, res) => {
  try {
    const demoUser = await getOrCreateDemoUser();

    const projects = await prisma.project.findMany({
      where: {
        userId: demoUser.id,
      },
      orderBy: {
        updatedAt: "desc",
      },
    });

    res.json({
      ok: true,
      projects,
    });
  } catch (err) {
    console.error("GET /projects Fehler:", err);
    res.status(500).json({
      ok: false,
      error: "Projekte konnten nicht geladen werden.",
      details: String(err),
    });
  }
});

/* --------------------------------------------------
   GET SINGLE PROJECT
-------------------------------------------------- */
app.get("/projects/:id", async (req, res) => {
  try {
    const demoUser = await getOrCreateDemoUser();
    const { id } = req.params;

    const project = await prisma.project.findFirst({
      where: {
        id,
        userId: demoUser.id,
      },
      include: {
        versions: {
          orderBy: {
            versionNumber: "desc",
          },
        },
      },
    });

    if (!project) {
      return res.status(404).json({
        ok: false,
        error: "Projekt nicht gefunden.",
      });
    }

    res.json({
      ok: true,
      project,
    });
  } catch (err) {
    console.error("GET /projects/:id Fehler:", err);
    res.status(500).json({
      ok: false,
      error: "Projekt konnte nicht geladen werden.",
      details: String(err),
    });
  }
});

/* --------------------------------------------------
   CREATE DESIGN VERSION
-------------------------------------------------- */
app.post("/projects/:id/design-versions", async (req, res) => {
  try {
    const demoUser = await getOrCreateDemoUser();
    const { id } = req.params;
    const { designConfig, previewData, aiAnalysis } = req.body;

    const project = await prisma.project.findFirst({
      where: {
        id,
        userId: demoUser.id,
      },
    });

    if (!project) {
      return res.status(404).json({
        ok: false,
        error: "Projekt nicht gefunden.",
      });
    }

    const lastVersion = await prisma.designVersion.findFirst({
      where: { projectId: id },
      orderBy: { versionNumber: "desc" },
    });

    const newVersionNumber = (lastVersion?.versionNumber || 0) + 1;

    const version = await prisma.designVersion.create({
      data: {
        projectId: id,
        versionNumber: newVersionNumber,
        designConfig: designConfig || {},
        previewData: previewData || null,
        aiAnalysis: aiAnalysis || null,
      },
    });

    res.status(201).json({
      ok: true,
      version,
    });
  } catch (err) {
    console.error("POST /projects/:id/design-versions Fehler:", err);
    res.status(500).json({
      ok: false,
      error: "Design-Version konnte nicht erstellt werden.",
      details: String(err),
    });
  }
});

/* --------------------------------------------------
   GET DESIGN VERSIONS
-------------------------------------------------- */
app.get("/projects/:id/design-versions", async (req, res) => {
  try {
    const demoUser = await getOrCreateDemoUser();
    const { id } = req.params;

    const project = await prisma.project.findFirst({
      where: {
        id,
        userId: demoUser.id,
      },
    });

    if (!project) {
      return res.status(404).json({
        ok: false,
        error: "Projekt nicht gefunden.",
      });
    }

    const versions = await prisma.designVersion.findMany({
      where: { projectId: id },
      orderBy: { versionNumber: "desc" },
    });

    res.json({
      ok: true,
      versions,
    });
  } catch (err) {
    console.error("GET /projects/:id/design-versions Fehler:", err);
    res.status(500).json({
      ok: false,
      error: "Design-Versionen konnten nicht geladen werden.",
      details: String(err),
    });
  }
});

/* --------------------------------------------------
   SHOP ANALYSE (DEMO)
-------------------------------------------------- */
app.post("/analyze-shop", async (req, res) => {
  try {
    const { shopUrl, platform, projectName, designGoal } = req.body || {};

    if (!shopUrl || !shopUrl.trim()) {
      return res.status(400).json({
        ok: false,
        error: "Shop-URL ist erforderlich.",
      });
    }

    const normalizedPlatform = platform || "custom";
    const urlLower = shopUrl.toLowerCase();

    const analysis = {
      shopUrl,
      projectName: projectName || "Unbenanntes Projekt",
      platform: normalizedPlatform,
      detected: {
        navigation: true,
        productGrid: true,
        heroSection: true,
        footer: true,
        search: urlLower.includes("shop") || urlLower.includes("apo"),
        categoryNavigation: true,
        trustElements:
          normalizedPlatform === "mauve_system3" || urlLower.includes("apo"),
      },
      brandHints: {
        primaryColor:
          normalizedPlatform === "mauve_system3"
            ? "#2563eb"
            : normalizedPlatform === "shopify"
            ? "#16a34a"
            : "#4f46e5",
        style:
          normalizedPlatform === "mauve_system3"
            ? "seriös und apothekennah"
            : "modern",
        tone: urlLower.includes("apo")
          ? "vertrauenswürdig"
          : "verkaufsorientiert",
      },
      designGoal: designGoal || "",
      recommendations: [
        "Navigation vereinfachen und klarer strukturieren",
        "Produktkarten visuell stärker priorisieren",
        "Mobile Darstellung optimieren",
        "Call-to-Action-Bereiche sichtbarer machen",
      ],
      analyzedAt: new Date().toISOString(),
    };

    res.json({
      ok: true,
      analysis,
    });
  } catch (err) {
    console.error("POST /analyze-shop Fehler:", err);
    res.status(500).json({
      ok: false,
      error: "Shop konnte nicht analysiert werden.",
      details: String(err),
    });
  }
});

/* --------------------------------------------------
   KI SHOP GENERATION
-------------------------------------------------- */
app.post("/generate-shop", (req, res) => {
  try {
    const input = req.body || {};

    const platformLabel =
      input.platform === "mauve_system3"
        ? "Mauve System3"
        : input.platform || input.brand || "DemoBrand";

    const goalText = String(input.designGoal || "").toLowerCase();
    const urlText = String(input.shopUrl || "").toLowerCase();

    const isPharmacy =
      goalText.includes("apotheke") ||
      goalText.includes("apotheken") ||
      urlText.includes("apo");

    lastGeneratedShop = {
      name: input.name || "KI-Shop",
      brand: platformLabel,
      layout: isPharmacy
        ? "Vertrauenswürdig & apothekenoptimiert"
        : "Modern (KI generiert)",
      products: isPharmacy
        ? [
            { id: 1, name: "Apotheken-Produkt 1", price: 12.99 },
            { id: 2, name: "Apotheken-Produkt 2", price: 22.99 },
            { id: 3, name: "Apotheken-Produkt 3", price: 9.49 },
          ]
        : [
            { id: 1, name: "KI-Produkt 1", price: 12.99 },
            { id: 2, name: "KI-Produkt 2", price: 22.99 },
          ],
      source: {
        shopUrl: input.shopUrl || "",
        platform: input.platform || "",
        designGoal: input.designGoal || "",
      },
      generatedAt: new Date().toISOString(),
    };

    res.json({
      ok: true,
      success: true,
      shop: lastGeneratedShop,
    });
  } catch (err) {
    console.error("POST /generate-shop Fehler:", err);
    res.status(500).json({
      ok: false,
      error: "KI-Shop konnte nicht generiert werden.",
      details: String(err),
    });
  }
});

/* --------------------------------------------------
   LAST GENERATED SHOP
-------------------------------------------------- */
app.get("/last-shop", (req, res) => {
  if (!lastGeneratedShop) {
    return res.status(404).json({
      ok: false,
      error: "Noch kein Shop generiert",
    });
  }

  res.json({
    ok: true,
    shop: lastGeneratedShop,
  });
});

/* --------------------------------------------------
   DEMO HEALTH SHOP DATA
-------------------------------------------------- */
app.get("/shop-data", (req, res) => {
  res.json({
    ok: true,
    shop: shopData,
  });
});

/* --------------------------------------------------
   API 404 JSON FALLBACK
-------------------------------------------------- */
app.use((req, res) => {
  res.status(404).json({
    ok: false,
    error: `Route nicht gefunden: ${req.method} ${req.originalUrl}`,
  });
});

/* --------------------------------------------------
   GLOBAL ERROR HANDLER
-------------------------------------------------- */
app.use((err, req, res, next) => {
  console.error("Globaler Fehler:", err);
  res.status(500).json({
    ok: false,
    error: "Interner Serverfehler",
    details: String(err),
  });
});

const PORT = 3001;

app.listen(PORT, () => {
  console.log(`Backend läuft auf http://localhost:${PORT}`);
});
