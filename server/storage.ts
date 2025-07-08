import { users, siteContent, type User, type InsertUser, type SiteContent, type InsertSiteContent } from "@shared/schema";
import { db } from "./db";
import { eq } from "drizzle-orm";

export interface IStorage {
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  getSiteContent(): Promise<SiteContent>;
  updateSiteContent(content: Partial<InsertSiteContent>): Promise<SiteContent>;
}

export class DatabaseStorage implements IStorage {
  async getUser(id: number): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user || undefined;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user || undefined;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const [user] = await db
      .insert(users)
      .values(insertUser)
      .returning();
    return user;
  }

  async getSiteContent(): Promise<SiteContent> {
    // Try to get existing content first
    const [existingContent] = await db.select().from(siteContent).limit(1);
    
    if (existingContent) {
      return existingContent;
    }

    // If no content exists, create default content
    const defaultImages = [
      {
        src: "https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
        alt: "Guilherme e Carolina - Nosso primeiro encontro",
        caption: "8 de Julho, 2019 - O dia que mudou nossas vidas"
      },
      {
        src: "https://images.unsplash.com/photo-1522673607200-164d1b6ce486?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
        alt: "Guilherme e Carolina - Dançando juntos",
        caption: "Cada dança é uma nova canção de amor"
      },
      {
        src: "https://images.unsplash.com/photo-1518568814500-bf0f8d125f46?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
        alt: "Guilherme e Carolina - Caminhando na praia",
        caption: "Passos na areia, corações unidos"
      }
    ];

    const defaultQuotes = [
      "Em todos os mundos, em todas as vidas, eu te escolheria novamente.",
      "Você é a razão pela qual eu acredito no amor verdadeiro.",
      "Meu coração é seu lar, e você sempre será bem-vinda.",
      "Contigo, aprendi que o amor não tem fim, apenas recomeços.",
      "Você é minha pessoa favorita em todos os universos possíveis."
    ];

    const defaultMemories = [
      {
        icon: "fas fa-heart",
        iconColor: "bg-red-500",
        title: "Primeiro Encontro",
        description: "8 de Julho, 2019 - O dia que mudou nossas vidas",
        date: "2019-07-08"
      },
      {
        icon: "fas fa-star",
        iconColor: "bg-yellow-500",
        title: "Primeiro \"Eu te amo\"",
        description: "Aquele momento mágico que selou nosso destino",
        date: "2019"
      },
      {
        icon: "fas fa-ring",
        iconColor: "bg-purple-500",
        title: "Momentos Especiais",
        description: "Cada dia ao seu lado é uma nova aventura",
        date: "Sempre"
      }
    ];

    const defaultContent: InsertSiteContent = {
      title: "Guilherme & Carolina",
      subtitle: "Você é meu lugar favorito no mundo 💕",
      startDate: "2019-07-08T00:00:00Z",
      whatsappNumber: "47999471966",
      musicTitle: "Perfect",
      musicArtist: "Ed Sheeran",
      musicFile: null,
      images: defaultImages,
      quotes: defaultQuotes,
      memories: defaultMemories
    };

    const [createdContent] = await db
      .insert(siteContent)
      .values(defaultContent as any)
      .returning();
    
    return createdContent;
  }

  async updateSiteContent(content: Partial<InsertSiteContent>): Promise<SiteContent> {
    // Get the first (and should be only) content record
    const [existingContent] = await db.select().from(siteContent).limit(1);
    
    if (!existingContent) {
      // If no content exists, create it with the provided updates
      const newContent: InsertSiteContent = {
        title: content.title || "Guilherme & Carolina",
        subtitle: content.subtitle || "Você é meu lugar favorito no mundo 💕",
        startDate: content.startDate || "2019-07-08T00:00:00Z",
        whatsappNumber: content.whatsappNumber || "47999471966",
        musicTitle: content.musicTitle || "Perfect",
        musicArtist: content.musicArtist || "Ed Sheeran",
        musicFile: content.musicFile || null,
        images: content.images || [],
        quotes: content.quotes || [],
        memories: content.memories || []
      };

      const [createdContent] = await db
        .insert(siteContent)
        .values(newContent as any)
        .returning();
      
      return createdContent;
    }

    // Update existing content
    const updateData: Partial<typeof siteContent.$inferInsert> = {};
    
    // Copy only the defined properties from content
    if (content.title !== undefined) updateData.title = content.title;
    if (content.subtitle !== undefined) updateData.subtitle = content.subtitle;
    if (content.startDate !== undefined) updateData.startDate = content.startDate;
    if (content.whatsappNumber !== undefined) updateData.whatsappNumber = content.whatsappNumber;
    if (content.musicTitle !== undefined) updateData.musicTitle = content.musicTitle;
    if (content.musicArtist !== undefined) updateData.musicArtist = content.musicArtist;
    if (content.musicFile !== undefined) updateData.musicFile = content.musicFile;
    if (content.images !== undefined) updateData.images = content.images as any;
    if (content.quotes !== undefined) updateData.quotes = content.quotes as any;
    if (content.memories !== undefined) updateData.memories = content.memories as any;
    
    updateData.updatedAt = new Date();

    const [updatedContent] = await db
      .update(siteContent)
      .set(updateData)
      .where(eq(siteContent.id, existingContent.id))
      .returning();
    
    return updatedContent;
  }
}

export const storage = new DatabaseStorage();
