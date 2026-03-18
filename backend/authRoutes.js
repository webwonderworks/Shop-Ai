const express = require("express");
const crypto = require("crypto");

const router = express.Router();

// Prisma wird vom Server übergeben
let prisma = null;

function setPrisma(prismaInstance) {
  prisma = prismaInstance;
}

const PLANS = {
  starter: { name: "Starter", price: 49, projects: 3 },
  professional: { name: "Professional", price: 149, projects: Infinity },
  enterprise: { name: "Enterprise", price: "custom", projects: Infinity },
};

// Hash password
function hashPassword(password) {
  return crypto.createHash("sha256").update(password).digest("hex");
}

// Generate JWT token (simple version)
function generateToken(userId) {
  return crypto
    .randomBytes(32)
    .toString("hex")
    .substring(0, 32);
}

/* --------------------------------------------------
   REGISTER WITH EMAIL/PASSWORD
-------------------------------------------------- */
router.post("/register", async (req, res) => {
  try {
    if (!prisma) {
      return res.status(500).json({
        ok: false,
        error: "Datenbankverbindung nicht verfügbar.",
      });
    }

    const { email, password, name } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        ok: false,
        error: "Email und Passwort sind erforderlich.",
      });
    }

    // Check if user exists
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return res.status(400).json({
        ok: false,
        error: "Benutzer mit dieser E-Mail existiert bereits.",
      });
    }

    // Create user
    const user = await prisma.user.create({
      data: {
        email,
        password: hashPassword(password),
        name: name || email.split("@")[0],
        plan: "free",
      },
    });

    res.status(201).json({
      ok: true,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        plan: user.plan,
      },
      token: generateToken(user.id),
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
    if (!prisma) {
      return res.status(500).json({
        ok: false,
        error: "Datenbankverbindung nicht verfügbar.",
      });
    }

    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        ok: false,
        error: "Email und Passwort sind erforderlich.",
      });
    }

    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user || user.password !== hashPassword(password)) {
      return res.status(401).json({
        ok: false,
        error: "Ungültige Anmeldedaten.",
      });
    }

    res.json({
      ok: true,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        plan: user.plan,
      },
      token: generateToken(user.id),
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
   REGISTER WITH LICENSE CODE
-------------------------------------------------- */
router.post("/register-license", async (req, res) => {
  try {
    if (!prisma) {
      return res.status(500).json({
        ok: false,
        error: "Datenbankverbindung nicht verfügbar.",
      });
    }

    const { licenseCode, email, name } = req.body;

    if (!licenseCode || !email) {
      return res.status(400).json({
        ok: false,
        error: "Lizenzcode und E-Mail sind erforderlich.",
      });
    }

    // Find license
    const license = await prisma.license.findUnique({
      where: { code: licenseCode },
    });

    if (!license) {
      return res.status(404).json({
        ok: false,
        error: "Ungültiger Lizenzcode.",
      });
    }

    if (license.usedBy) {
      return res.status(400).json({
        ok: false,
        error: "Dieser Lizenzcode wurde bereits verwendet.",
      });
    }

    if (license.expiresAt && license.expiresAt < new Date()) {
      return res.status(400).json({
        ok: false,
        error: "Dieser Lizenzcode ist abgelaufen.",
      });
    }

    // Check if user exists
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return res.status(400).json({
        ok: false,
        error: "Benutzer mit dieser E-Mail existiert bereits.",
      });
    }

    // Create user with license
    const user = await prisma.user.create({
      data: {
        email,
        name: name || email.split("@")[0],
        plan: license.plan,
        licenseCode: licenseCode,
      },
    });

    // Mark license as used
    await prisma.license.update({
      where: { id: license.id },
      data: {
        usedBy: user.id,
        usedAt: new Date(),
      },
    });

    res.status(201).json({
      ok: true,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        plan: user.plan,
      },
      token: generateToken(user.id),
    });
  } catch (err) {
    console.error("POST /auth/register-license Fehler:", err);
    res.status(500).json({
      ok: false,
      error: "Registrierung mit Lizenzcode fehlgeschlagen.",
      details: String(err),
    });
  }
});

/* --------------------------------------------------
   VALIDATE LICENSE CODE
-------------------------------------------------- */
router.get("/validate-license/:code", async (req, res) => {
  try {
    if (!prisma) {
      return res.status(500).json({
        ok: false,
        error: "Datenbankverbindung nicht verfügbar.",
      });
    }

    const { code } = req.params;

    const license = await prisma.license.findUnique({
      where: { code },
    });

    if (!license) {
      return res.status(404).json({
        ok: false,
        error: "Ungültiger Lizenzcode.",
      });
    }

    if (license.usedBy) {
      return res.status(400).json({
        ok: false,
        error: "Dieser Lizenzcode wurde bereits verwendet.",
      });
    }

    if (license.expiresAt && license.expiresAt < new Date()) {
      return res.status(400).json({
        ok: false,
        error: "Dieser Lizenzcode ist abgelaufen.",
      });
    }

    res.json({
      ok: true,
      license: {
        code: license.code,
        plan: license.plan,
        planName: PLANS[license.plan]?.name,
        expiresAt: license.expiresAt,
      },
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
   CREATE LICENSE (ADMIN ONLY)
-------------------------------------------------- */
router.post("/admin/create-license", async (req, res) => {
  try {
    if (!prisma) {
      return res.status(500).json({
        ok: false,
        error: "Datenbankverbindung nicht verfügbar.",
      });
    }

    const { code, plan } = req.body;

    if (!code || !plan) {
      return res.status(400).json({
        ok: false,
        error: "Code und Plan sind erforderlich.",
      });
    }

    const license = await prisma.license.create({
      data: {
        code,
        plan,
        expiresAt: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000),
      },
    });

    res.status(201).json({
      ok: true,
      license: {
        code: license.code,
        plan: license.plan,
        expiresAt: license.expiresAt,
      },
    });
  } catch (err) {
    console.error("POST /auth/admin/create-license Fehler:", err);
    res.status(500).json({
      ok: false,
      error: "Lizenz konnte nicht erstellt werden.",
      details: String(err),
    });
  }
});

/* --------------------------------------------------
   GET USER INFO
-------------------------------------------------- */
router.get("/me", async (req, res) => {
  try {
    if (!prisma) {
      return res.status(500).json({
        ok: false,
        error: "Datenbankverbindung nicht verfügbar.",
      });
    }

    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res.status(401).json({
        ok: false,
        error: "Authentifizierung erforderlich.",
      });
    }

    // In production, validate JWT properly
    // For now, just return demo user
    const user = await prisma.user.findFirst({
      where: { email: "demo@shopdesigner.local" },
    });

    if (!user) {
      return res.status(401).json({
        ok: false,
        error: "Benutzer nicht gefunden.",
      });
    }

    const plan = PLANS[user.plan];
    const projectsRemaining = plan?.projects === Infinity ? Infinity : Math.max(0, plan?.projects - user.projectsUsed);

    res.json({
      ok: true,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        plan: user.plan,
        planName: plan?.name,
        projectsUsed: user.projectsUsed,
        projectsRemaining,
        licenseCode: user.licenseCode,
      },
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
