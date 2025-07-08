import { pgTable, text, serial, integer, boolean, json, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const siteContent = pgTable("site_content", {
  id: serial("id").primaryKey(),
  title: text("title").notNull().default("Guilherme & Carolina"),
  subtitle: text("subtitle").notNull().default("Você é meu lugar favorito no mundo 💕"),
  startDate: text("start_date").notNull().default("2019-07-08T00:00:00Z"),
  whatsappNumber: text("whatsapp_number").notNull().default("47999471966"),
  musicTitle: text("music_title").notNull().default("Perfect"),
  musicArtist: text("music_artist").notNull().default("Ed Sheeran"),
  musicFile: text("music_file"),
  images: json("images").$type<Array<{src: string, alt: string, caption: string}>>().notNull().default([]),
  quotes: json("quotes").$type<string[]>().notNull().default([]),
  memories: json("memories").$type<Array<{icon: string, iconColor: string, title: string, description: string, date: string}>>().notNull().default([]),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export const insertSiteContentSchema = createInsertSchema(siteContent).omit({
  id: true,
  updatedAt: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
export type SiteContent = typeof siteContent.$inferSelect;
export type InsertSiteContent = z.infer<typeof insertSiteContentSchema>;
