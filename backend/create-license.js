const { PrismaClient } = require("@prisma/client");
const { PrismaBetterSqlite3 } = require("@prisma/adapter-better-sqlite3");

const adapter = new PrismaBetterSqlite3({
  url: process.env.DATABASE_URL || "file:./dev.db",
});

const prisma = new PrismaClient({ adapter });

async function createLicense() {
  try {
    const license = await prisma.license.create({
      data: {
        code: "MAUVE-TEST-001",
        plan: "professional",
        expiresAt: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000), // 1 Jahr
      },
    });

    console.log("✅ Lizenz erstellt:");
    console.log(`   Code: ${license.code}`);
    console.log(`   Plan: ${license.plan}`);
    console.log(`   Gültig bis: ${license.expiresAt}`);
  } catch (err) {
    console.error("❌ Fehler:", err.message);
  } finally {
    await prisma.$disconnect();
  }
}

createLicense();
