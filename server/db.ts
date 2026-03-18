import { desc, eq } from "drizzle-orm";
import { drizzle } from "drizzle-orm/mysql2";
import { InsertUser, users, designProjects, mauveTemplates } from "../drizzle/schema";
import { ENV } from './_core/env';

let _db: ReturnType<typeof drizzle> | null = null;

// Lazily create the drizzle instance so local tooling can run without a DB.
export async function getDb() {
  if (!_db && process.env.DATABASE_URL) {
    try {
      _db = drizzle(process.env.DATABASE_URL);
    } catch (error) {
      console.warn("[Database] Failed to connect:", error);
      _db = null;
    }
  }
  return _db;
}

export async function upsertUser(user: InsertUser): Promise<void> {
  if (!user.openId) {
    throw new Error("User openId is required for upsert");
  }

  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot upsert user: database not available");
    return;
  }

  try {
    const values: InsertUser = {
      openId: user.openId,
    };
    const updateSet: Record<string, unknown> = {};

    const textFields = ["name", "email", "loginMethod"] as const;
    type TextField = (typeof textFields)[number];

    const assignNullable = (field: TextField) => {
      const value = user[field];
      if (value === undefined) return;
      const normalized = value ?? null;
      values[field] = normalized;
      updateSet[field] = normalized;
    };

    textFields.forEach(assignNullable);

    if (user.lastSignedIn !== undefined) {
      values.lastSignedIn = user.lastSignedIn;
      updateSet.lastSignedIn = user.lastSignedIn;
    }
    if (user.role !== undefined) {
      values.role = user.role;
      updateSet.role = user.role;
    } else if (user.openId === ENV.ownerOpenId) {
      values.role = 'admin';
      updateSet.role = 'admin';
    }

    if (!values.lastSignedIn) {
      values.lastSignedIn = new Date();
    }

    if (Object.keys(updateSet).length === 0) {
      updateSet.lastSignedIn = new Date();
    }

    await db.insert(users).values(values).onDuplicateKeyUpdate({
      set: updateSet,
    });
  } catch (error) {
    console.error("[Database] Failed to upsert user:", error);
    throw error;
  }
}

export async function getUserByOpenId(openId: string) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get user: database not available");
    return undefined;
  }

  const result = await db.select().from(users).where(eq(users.openId, openId)).limit(1);

  return result.length > 0 ? result[0] : undefined;
}

/**
 * Get all design projects for a user
 */
export async function getUserDesignProjects(userId: number) {
  const db = await getDb();
  if (!db) return [];

  const result = await db
    .select()
    .from(designProjects)
    .where(eq(designProjects.userId, userId))
    .orderBy((t) => desc(t.updatedAt));

  return result;
}

/**
 * Get a single design project by ID
 */
export async function getDesignProjectById(projectId: number) {
  const db = await getDb();
  if (!db) return undefined;

  const result = await db
    .select()
    .from(designProjects)
    .where(eq(designProjects.id, projectId))
    .limit(1);

  return result.length > 0 ? result[0] : undefined;
}

/**
 * Create a new design project
 */
export async function createDesignProject(
  userId: number,
  data: {
    name: string;
    description?: string;
    shopType: string;
    brandProfile: string;
  }
) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  const result = await db.insert(designProjects).values({
    userId,
    name: data.name,
    description: data.description,
    shopType: data.shopType,
    brandProfile: data.brandProfile,
    status: "draft",
  });

  return result;
}

/**
 * Update design project
 */
export async function updateDesignProject(
  projectId: number,
  data: Partial<{
    name: string;
    description: string;
    designConfig: string;
    templateData: string;
    status: "draft" | "in_progress" | "completed" | "exported";
  }>
) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  const result = await db
    .update(designProjects)
    .set(data)
    .where(eq(designProjects.id, projectId));

  return result;
}

/**
 * Get Mauve template by version
 */
export async function getMauveTemplate(version: string) {
  const db = await getDb();
  if (!db) return undefined;

  const result = await db
    .select()
    .from(mauveTemplates)
    .where(eq(mauveTemplates.version, version))
    .limit(1);

  return result.length > 0 ? result[0] : undefined;
}

/**
 * Get all Mauve templates
 */
export async function getAllMauveTemplates() {
  const db = await getDb();
  if (!db) return [];

  const result = await db.select().from(mauveTemplates);
  return result;
}

// TODO: add feature queries here as your schema grows.