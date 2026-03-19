const express = require("express");
const crypto = require("crypto");

const router = express.Router();

// Prisma wird vom Server übergeben
let prisma = null;

function setPrisma(prismaInstance) {
  prisma = prismaInstance;
}

// Pläne
const PLANS = {
  free: { name: "Free", projects: 1 },
  starter: { name: "Starter", projects: 3, price: 49 },
  professional: { name: "Professional", projects: Infinity, price: 149 },
  enterprise: { name: "Enterprise", projects: Infinity, price: "custom" },
};

/* --------------------------------------------------
   REGISTER
-------------------------------------------------- */
router.post("/register", async (req, res) => {
  try {
    const { email, password, name } = req.body;

    // Validierung
    if (!email || !password) {
      return res.status(400).json({
        ok: false,
        error: "Email und Passwort sind erforderlich.",
      });
    }

    if (password.length < 6) {
      return res.status(400).json({
        ok: false,
        error: "Passwort muss mindestens 6 Zeichen lang sein.",
      });
    }

    // Demo: Einfach akzeptieren (in Production: Passwort hashen + DB speichern)
    const token = crypto.randomBytes(32).toString("hex");
    const user = {
      id: crypto.randomBytes(8).toString("hex"),
      email,
      name: name || email.split("@")[0],
      plan: "starter",
      createdAt: new Date(),
    };

    res.status(201).json({
      ok: true,
      token,
      user,
    });
  } catch (err) {
    console.error("POST /auth/register Fehler:", err);
    res.status(500).json({
      ok: false,
      error: "Registrierung fehlgeschlagen.",
      details: String(err),
    });
  }
});

/* --------------------------------------------------
   LOGIN
-------------------------------------------------- */
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        ok: false,
        error: "Email und Passwort sind erforderlich.",
      });
    }

    // Demo: Einfach akzeptieren
    const token = crypto.randomBytes(32).toString("hex");
    const user = {
      id: crypto.randomBytes(8).toString("hex"),
      email,
      name: email.split("@")[0],
      plan: "professional",
      createdAt: new Date(),
    };

    res.json({
      ok: true,
      token,
      user,
    });
  } catch (err) {
    console.error("POST /auth/login Fehler:", err);
    res.status(500).json({
      ok: false,
      error: "Login fehlgeschlagen.",
      details: String(err),
    });
  }
});

/* --------------------------------------------------
   VALIDATE LICENSE
-------------------------------------------------- */
router.get("/validate-license/:code", async (req, res) => {
  try {
    const { code } = req.params;

    if (!code || !code.trim()) {
      return res.status(400).json({
        ok: false,
        error: "Lizenzcode ist erforderlich.",
      });
    }

    // Demo: Nur MAUVE-TEST-001 akzeptieren
    if (code === "MAUVE-TEST-001") {
      return res.json({
        ok: true,
        license: {
          code: "MAUVE-TEST-001",
          plan: "professional",
          planName: "Professional",
          expiresAt: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000),
        },
      });
    }

    res.status(400).json({
      ok: false,
      error: "Lizenzcode ungültig.",
    });
  } catch (err) {
    console.error("GET /auth/validate-license Fehler:", err);
    res.status(500).json({
      ok: false,
      error: "Lizenzvalidierung fehlgeschlagen.",
      details: String(err),
    });
  }
});

/* --------------------------------------------------
   REGISTER WITH LICENSE
-------------------------------------------------- */
router.post("/register-license", async (req, res) => {
  try {
    const { email, licenseCode, name } = req.body;

    if (!email || !licenseCode) {
      return res.status(400).json({
        ok: false,
        error: "Email und Lizenzcode sind erforderlich.",
      });
    }

    // Demo: Lizenzcode validieren
    if (licenseCode !== "MAUVE-TEST-001") {
      return res.status(400).json({
        ok: false,
        error: "Lizenzcode ungültig.",
      });
    }

    const token = crypto.randomBytes(32).toString("hex");
    const user = {
      id: crypto.randomBytes(8).toString("hex"),
      email,
      name: name || email.split("@")[0],
      plan: "professional",
      licenseCode,
      createdAt: new Date(),
    };

    res.status(201).json({
      ok: true,
      token,
      user,
    });
  } catch (err) {
    console.error("POST /auth/register-license Fehler:", err);
    res.status(500).json({
      ok: false,
      error: "Registrierung fehlgeschlagen.",
      details: String(err),
    });
  }
});

/* --------------------------------------------------
   GET USER INFO
-------------------------------------------------- */
router.get("/me", async (req, res) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res.status(401).json({
        ok: false,
        error: "Authentifizierung erforderlich.",
      });
    }

    // Demo: Einfach einen User zurückgeben
    const user = {
      id: crypto.randomBytes(8).toString("hex"),
      email: "demo@shopdesigner.local",
      name: "Demo User",
      plan: "professional",
      createdAt: new Date(),
    };

    res.json({
      ok: true,
      user,
    });
  } catch (err) {
    console.error("GET /auth/me Fehler:", err);
    res.status(500).json({
      ok: false,
      error: "Fehler beim Abrufen der Benutzerinformationen.",
      details: String(err),
    });
  }
});

module.exports = { router, setPrisma };
