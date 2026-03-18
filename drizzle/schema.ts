import { int, mysqlEnum, mysqlTable, text, timestamp, varchar } from "drizzle-orm/mysql-core";

/**
 * Core user table backing auth flow.
 * Extend this file with additional tables as your product grows.
 * Columns use camelCase to match both database fields and generated types.
 */
export const users = mysqlTable("users", {
  /**
   * Surrogate primary key. Auto-incremented numeric value managed by the database.
   * Use this for relations between tables.
   */
  id: int("id").autoincrement().primaryKey(),
  /** Manus OAuth identifier (openId) returned from the OAuth callback. Unique per user. */
  openId: varchar("openId", { length: 64 }).notNull().unique(),
  name: text("name"),
  email: varchar("email", { length: 320 }),
  loginMethod: varchar("loginMethod", { length: 64 }),
  role: mysqlEnum("role", ["user", "admin"]).default("user").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
  lastSignedIn: timestamp("lastSignedIn").defaultNow().notNull(),
});

export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;

/**
 * Design Projects table - stores shop design projects created by users
 */
export const designProjects = mysqlTable("design_projects", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull().references(() => users.id),
  name: varchar("name", { length: 255 }).notNull(),
  description: text("description"),
  shopType: varchar("shopType", { length: 64 }).notNull(), // "local", "shipping", "specialty"
  brandProfile: varchar("brandProfile", { length: 64 }).notNull(), // "modern", "classic", "medical", "emotional"
  status: mysqlEnum("status", ["draft", "in_progress", "completed", "exported"]).default("draft"),
  designConfig: text("designConfig"), // JSON string of design parameters
  templateData: text("templateData"), // JSON string of Mauve template
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type DesignProject = typeof designProjects.$inferSelect;
export type InsertDesignProject = typeof designProjects.$inferInsert;

/**
 * Design Versions table - stores version history of designs
 */
export const designVersions = mysqlTable("design_versions", {
  id: int("id").autoincrement().primaryKey(),
  projectId: int("projectId").notNull().references(() => designProjects.id),
  versionNumber: int("versionNumber").notNull(),
  designConfig: text("designConfig").notNull(), // JSON string
  templateData: text("templateData").notNull(), // JSON string
  notes: text("notes"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type DesignVersion = typeof designVersions.$inferSelect;
export type InsertDesignVersion = typeof designVersions.$inferInsert;

/**
 * Mauve Templates table - stores predefined Mauve System3 template slots
 */
export const mauveTemplates = mysqlTable("mauve_templates", {
  id: int("id").autoincrement().primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  version: varchar("version", { length: 32 }).notNull(),
  schema: text("schema").notNull(), // JSON string of template schema
  description: text("description"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type MauveTemplate = typeof mauveTemplates.$inferSelect;
export type InsertMauveTemplate = typeof mauveTemplates.$inferInsert;