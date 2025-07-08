import { users, type User, type InsertUser, type SiteContent, type InsertSiteContent } from "@shared/schema";

// modify the interface with any CRUD methods
// you might need

export interface IStorage {
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  getSiteContent(): Promise<SiteContent>;
  updateSiteContent(content: Partial<InsertSiteContent>): Promise<SiteContent>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private siteContent: SiteContent;
  currentId: number;

  constructor() {
    this.users = new Map();
    this.currentId = 1;
    
    // Default site content
    this.siteContent = {
      id: 1,
      title: "Guilherme & Carolina",
      subtitle: "Você é meu lugar favorito no mundo 💕",
      startDate: "2019-07-08T00:00:00Z",
      whatsappNumber: "47999471966",
      musicTitle: "Perfect",
      musicArtist: "Ed Sheeran",
      musicFile: null,
      images: [
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
      ],
      quotes: [
        "Em todos os mundos, em todas as vidas, eu te escolheria novamente.",
        "Você é a razão pela qual eu acredito no amor verdadeiro.",
        "Meu coração é seu lar, e você sempre será bem-vinda.",
        "Contigo, aprendi que o amor não tem fim, apenas recomeços.",
        "Você é minha pessoa favorita em todos os universos possíveis."
      ],
      memories: [
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
      ],
      updatedAt: new Date()
    };
  }

  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async getSiteContent(): Promise<SiteContent> {
    return this.siteContent;
  }

  async updateSiteContent(content: Partial<InsertSiteContent>): Promise<SiteContent> {
    this.siteContent = {
      ...this.siteContent,
      ...content,
      id: this.siteContent.id,
      updatedAt: new Date()
    } as SiteContent;
    return this.siteContent;
  }
}

export const storage = new MemStorage();
